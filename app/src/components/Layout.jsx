import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SERVICES, CONTACT } from '../data.js';
import { Reg, asset } from './ui.jsx';

/* ---------------- lightbox (shared) ---------------- */
const LightboxCtx = createContext(() => {});
export const useLightbox = () => useContext(LightboxCtx);

function Lightbox({ state, close }) {
  const [idx, setIdx] = useState(0);
  const closeRef = useRef(null);
  const open = !!state;
  useEffect(() => { if (state) { setIdx(state.index); setTimeout(() => closeRef.current?.focus(), 30); } }, [state]);
  useEffect(() => {
    if (!open) return;
    const n = state.items.length;
    const key = (e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + n) % n); if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % n); };
    addEventListener('keydown', key); document.documentElement.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', key); document.documentElement.style.overflow = ''; };
  }, [open, state, close]);
  const items = state?.items || [];
  const n = items.length;
  return (
    <div className={'lightbox' + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Campaign image" aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('stagebox')) close(); }}>
      <div className="bar"><span className="mono">{state ? `${state.label} · ${idx + 1} / ${n}` : ''}</span><button type="button" ref={closeRef} onClick={close}>Close ✕</button></div>
      <div className="stagebox">{open && items[idx] && <img src={items[idx]} alt={`${state.label} campaign`} />}</div>
      <div className="navs">
        <button type="button" aria-label="Previous image" onClick={() => setIdx((i) => (i - 1 + n) % n)}>← Prev</button>
        <button type="button" aria-label="Next image" onClick={() => setIdx((i) => (i + 1) % n)}>Next →</button>
      </div>
    </div>
  );
}

/* ---------------- header + menus ---------------- */
function Header({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  const inServices = pathname.startsWith('/services');
  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap">
        <Link className="logo" to="/" aria-label="Papersip Company home"><Reg />Papersip <small>Est. 2010</small></Link>
        <nav className="nav" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about/">About</NavLink>
          <div className={'dd' + (inServices ? ' cur' : '')}>
            <NavLink to="/services/" end>Services <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></NavLink>
            <div className="mega">
              {SERVICES.map((s) => (
                <NavLink key={s.k} to={`/services/${s.slug}/`} data-acc={s.acc}>
                  <span className="sw">{String(s.i + 1).padStart(2, '0')}</span><b>{s.name}</b><span className="d">{s.line}</span>
                </NavLink>
              ))}
              <Link className="all" to="/services/"><b>All services</b><span className="d">Eight disciplines, one team →</span></Link>
            </div>
          </div>
          <NavLink to="/clients/">Clients</NavLink>
          <NavLink to="/our-work/">Our Work</NavLink>
          <NavLink to="/contact/">Contact</NavLink>
        </nav>
        <div className="hdr-cta">
          <Link className="btn btn-m btn-sm" to="/contact/">Get a quote <span className="arr">→</span></Link>
          <button className="burger" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mnav" onClick={() => setMenuOpen(!menuOpen)}><i /></button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ open }) {
  const items = [['/', 'Home'], ['/about/', 'About'], ['/services/', 'Services'], ['/clients/', 'Clients'], ['/our-work/', 'Our Work'], ['/contact/', 'Contact']];
  return (
    <div className="mnav" id="mnav" aria-hidden={!open} inert={open ? undefined : ''}>
      <nav className="big" aria-label="Mobile">
        {items.map(([to, label], i) => <NavLink key={to} to={to} end={to === '/' || to === '/services/'}><small>{String(i + 1).padStart(2, '0')}</small>{label}</NavLink>)}
      </nav>
      <div className="svcs">{SERVICES.map((s) => <Link key={s.k} to={`/services/${s.slug}/`} data-acc={s.acc}><i />{s.name}</Link>)}</div>
      <div className="meta mono"><span>{CONTACT.email}</span><span>{CONTACT.phone}</span><span>{CONTACT.addressShort}</span></div>
      <Link className="btn btn-m" to="/contact/">Get a quote <span className="arr">→</span></Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" to="/"><Reg />Papersip</Link>
            <p className="about" style={{ marginTop: 14 }}>A brand-focused marketing media consultancy with a strong team of innovative and strategic thinkers, in business since 2010.</p>
            <p style={{ marginTop: 16 }}><span className="cmyk" aria-hidden="true"><i /><i /><i /><i /></span></p>
          </div>
          <div><p className="fh">Company</p><ul>
            <li><Link to="/">Home</Link></li><li><Link to="/about/">About us</Link></li><li><Link to="/services/">Services</Link></li>
            <li><Link to="/clients/">Clients</Link></li><li><Link to="/our-work/">Our work</Link></li><li><Link to="/contact/">Contact us</Link></li>
          </ul></div>
          <div><p className="fh">Services</p><ul>{SERVICES.map((s) => <li key={s.k}><Link to={`/services/${s.slug}/`}>{s.name}</Link></li>)}</ul></div>
          <div><p className="fh">Get in touch</p><ul>
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></li>
            <li>{CONTACT.address}</li><li>{CONTACT.hours}</li>
          </ul></div>
        </div>
        <div className="wordmark">
          <img
            src={asset('brand/papersip-wordmark.webp')}
            srcSet={`${asset('brand/papersip-wordmark-960.webp')} 960w, ${asset('brand/papersip-wordmark.webp')} 1884w`}
            sizes="(max-width: 1320px) 92vw, 1224px"
            width="1884" height="401" loading="lazy" decoding="async"
            alt="Papersip: radio, TV, outdoor and digital advertising"
          />
        </div>
        <div className="foot-bot mono"><span>© 2026 Papersip Company. All rights reserved.</span><span>Faridabad · Delhi NCR</span></div>
      </div>
    </footer>
  );
}

/* ---------------- page enhancements (run after each route renders) ---------------- */
function useEnhancements(pathname) {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    const $$ = (s) => [...document.querySelectorAll(s)];

    // reveal on scroll (only for elements below the fold, so first paint is complete)
    if (!reduce) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
      // read every position first, then write, so layout is computed once
      const els = $$('.rv'), limit = innerHeight * 0.92;
      const below = els.map((el) => el.getBoundingClientRect().top > limit);
      els.forEach((el, i) => { if (below[i]) { el.classList.add('pre'); el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); } });
      cleanups.push(() => io.disconnect());
    }
    // count up
    if (!reduce) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        const n = en.target, end = +n.dataset.count, start = n.dataset.from ? +n.dataset.from : 0, t = performance.now();
        const step = (now) => { const p = Math.min(1, (now - t) / 1400), e = 1 - Math.pow(1 - p, 4); n.textContent = Math.round(start + (end - start) * e); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }), { threshold: 0.6 });
      $$('[data-count]').forEach((n) => io.observe(n));
      cleanups.push(() => io.disconnect());
    }
    // tilt cards
    if (!reduce && matchMedia('(hover: hover)').matches) {
      $$('.tilt').forEach((card) => {
        const move = (e) => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; card.classList.add('hot'); card.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`); card.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`); };
        const leave = () => { card.classList.remove('hot'); card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); };
        card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave);
        cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
      });
    }
    // drift parallax
    const drifts = $$('[data-speed]');
    if (drifts.length && !reduce && innerWidth > 620) {
      let raf = 0;
      const run = () => { raf = 0; const vh = innerHeight; drifts.forEach((d) => { const r = d.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; d.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * parseFloat(d.dataset.speed)).toFixed(1)}px,0)`; }); };
      const on = () => { if (!raf) raf = requestAnimationFrame(run); };
      addEventListener('scroll', on, { passive: true }); run();
      cleanups.push(() => { removeEventListener('scroll', on); cancelAnimationFrame(raf); });
    }
    // broadcast timecode (PAL 25fps), throttled to 25 updates a second
    const tcs = $$('[data-tc]');
    if (tcs.length && !reduce) {
      const t0 = performance.now(); let id = 0;
      const p = (n) => String(n).padStart(2, '0');
      const fmt = (ms) => { const f = Math.floor(ms / 40); return `${p(Math.floor(f / 90000))}:${p(Math.floor(f / 1500) % 60)}:${p(Math.floor(f / 25) % 60)}:${p(f % 25)}`; };
      id = setInterval(() => { if (document.hidden) return; const d = performance.now() - t0; tcs.forEach((el) => { el.textContent = fmt(el.dataset.tc === 'loop' ? d % 30000 : d); }); }, 40);
      cleanups.push(() => clearInterval(id));
    }
    return () => cleanups.forEach((f) => f());
  }, [pathname]);
}

/* ---------------- layout ---------------- */
export default function Layout() {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lb, setLb] = useState(null);
  const [navCount, setNavCount] = useState(0);
  const first = useRef(true);
  const openLb = useCallback((items, index, label) => setLb({ items, index, label }), []);
  const closeLb = useCallback(() => setLb(null), []);

  // route change: close menu, scroll, play the colour sweep
  useEffect(() => {
    setMenuOpen(false);
    if (first.current) { first.current = false; return; }
    setNavCount((n) => n + 1);
    if (hash) { const t = document.getElementById(hash.slice(1)); if (t) { t.scrollIntoView(); return; } }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const k = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [menuOpen]);

  useEnhancements(pathname);

  return (
    <LightboxCtx.Provider value={openLb}>
      <a className="skip" href="#main">Skip to content</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileNav open={menuOpen} />
      <div key={pathname} className={navCount ? 'page-in' : undefined}>
        <Outlet />
      </div>
      <Footer />
      <Lightbox state={lb} close={closeLb} />
      <div className={'wipe' + (navCount ? ' go' : '')} key={'w' + navCount} aria-hidden="true"><i /><i /><i /><i /></div>
    </LightboxCtx.Provider>
  );
}
