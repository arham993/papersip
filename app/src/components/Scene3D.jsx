import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../data.js';
import { thumb } from './ui.jsx';

// Decide once whether this device should run live 3D at all.
let verdict = null;
export function can3D() {
  if (verdict !== null) return verdict;
  if (typeof window === 'undefined') return false;
  const c = navigator.connection;
  if (c && (c.saveData || /(^|-)2g/.test(c.effectiveType || ''))) return (verdict = false);
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return (verdict = false);
  // cheap capability check; the real WebGL context is created only when a scene starts
  verdict = typeof window.WebGLRenderingContext !== 'undefined';
  return verdict;
}

// Three.js (~140 KB gzipped) is fetched only once, the first time a scene scrolls near view.
let modP = null;
function loadThree() {
  if (!modP) {
    const fonts = document.fonts?.load ? Promise.all([document.fonts.load('900 60px "Big Shoulders Display"'), document.fonts.load('500 14px "IBM Plex Mono"')]).catch(() => {}) : Promise.resolve();
    modP = Promise.all([import('../three/scenes.js'), Promise.race([fonts, new Promise((r) => setTimeout(r, 1500))])]).then(([m]) => m);
  }
  return modP;
}
const idle = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 150));

// 3D is decoration: wait until the visitor interacts (or, on desktop, ~1.5 s after load)
// so first paint and first input are never competing with Three.js start-up.
let warmP = null;
function warm() {
  if (warmP) return warmP;
  warmP = new Promise((res) => {
    const evs = ['pointerdown', 'pointermove', 'touchstart', 'keydown', 'wheel', 'scroll'];
    const fire = () => { evs.forEach((e) => removeEventListener(e, fire, true)); res(); };
    evs.forEach((e) => addEventListener(e, fire, { capture: true, passive: true }));
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const later = () => setTimeout(fire, 1500);
      if (document.readyState === 'complete') later(); else addEventListener('load', later, { once: true });
    }
  });
  return warmP;
}

// Mounts a scene on a canvas when it nears the viewport; disposes it on unmount.
export function use3D(mount, deps = []) {
  const ref = useRef(null);
  const api = useRef(null);
  const [state, setState] = useState('idle'); // idle | live | off
  useEffect(() => {
    const c = ref.current; if (!c) return undefined;
    if (!can3D()) { setState('off'); return undefined; }
    let dead = false, inst = null;
    const go = () => loadThree().then((m) => {
      if (dead) return;
      inst = mount(m, c); api.current = inst;
      if (inst) requestAnimationFrame(() => requestAnimationFrame(() => { if (!dead) setState('live'); }));
      else setState('off');
    }).catch(() => { if (!dead) setState('off'); });
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); warm().then(() => { if (!dead) idle(go); }); } }, { rootMargin: '300px' });
    io.observe(c);
    return () => { dead = true; io.disconnect(); if (inst) inst.dispose(); api.current = null; setState('idle'); };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, state, api];
}

/* ---------- home hero: all eight models ---------- */
export function HeroScene() {
  const [ref, state] = use3D((m, c) => m.mountHero(c));
  return (
    <>
      <canvas id="hero3d" ref={ref} className={'c3d' + (state === 'live' ? ' live' : '')} aria-hidden="true" />
      {state === 'off' && (
        <div className="hero-still" aria-hidden="true">
          {['tv', 'ooh', 'radio', 'print', 'digital', 'signage'].map((k) => <img key={k} src={thumb(k, true)} alt="" width="520" height="430" />)}
        </div>
      )}
    </>
  );
}

/* ---------- home channel turntable ---------- */
export function StageScene({ active }) {
  const [ref, state, api] = use3D((m, c) => m.mountStage(c, active));
  useEffect(() => { if (api.current) api.current.setActive(active); }, [active, state]); // eslint-disable-line react-hooks/exhaustive-deps
  const s = SERVICES[active];
  return (
    <>
      <img className="poster" src={thumb(s.k)} alt="" width="1040" height="860" style={state === 'live' ? { opacity: 0 } : undefined} />
      <canvas id="stage3d" ref={ref} className={'c3d' + (state === 'live' ? ' live' : '')} aria-label={`3D model: ${s.name}. Drag to turn.`} />
    </>
  );
}

/* ---------- service hero: one model on a turntable ---------- */
export function SoloScene({ k, name }) {
  const [ref, state] = use3D((m, c) => m.mountSolo(c, k), [k]);
  return (
    <>
      <img className="poster" src={thumb(k)} srcSet={`${thumb(k, true)} 520w, ${thumb(k, 'md')} 780w, ${thumb(k)} 1040w`} sizes="(max-width: 860px) 92vw, 46vw" alt="" width="1040" height="860" fetchpriority="high" style={state === 'live' ? { opacity: 0 } : undefined} />
      <canvas ref={ref} className={'c3d' + (state === 'live' ? ' live' : '')} aria-label={`3D model for ${name}. Drag to turn.`} />
    </>
  );
}

/* ---------- services page: carousel of all eight ---------- */
export function RingScene({ onFront }) {
  const navigate = useNavigate();
  const [front, setFront] = useState(0);
  const [ref, state] = use3D((m, c) => m.mountRing(c, {
    onFront: (i) => { setFront(i); onFront && onFront(i); },
    onPick: (i) => navigate(`/services/${SERVICES[i].slug}/`),
  }));
  return (
    <>
      <img className="poster" src={thumb(SERVICES[front].k)} alt="" width="1040" height="860" style={state === 'live' ? { opacity: 0 } : undefined} />
      <canvas ref={ref} className={'c3d' + (state === 'live' ? ' live' : '')} aria-label="Rotating set of all eight services. Click a model to open it." />
    </>
  );
}

/* ---------- page heroes: drifting paper (and a paper plane on contact) ---------- */
export function FieldScene({ mode = 'sheets' }) {
  const [ref, state] = use3D((m, c) => m.mountField(c, mode), [mode]);
  return <canvas ref={ref} className={'bg3d c3d' + (state === 'live' ? ' live' : '')} aria-hidden="true" />;
}
