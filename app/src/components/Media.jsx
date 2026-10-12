import { useEffect, useRef, useState } from 'react';
import { useLightbox } from './Layout.jsx';
import { Wave, pad2 } from './ui.jsx';
import { CONTACT } from '../data.js';

const PLAY = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>;

// Image that reports load failure, including failures that happened before hydration.
function SafeImg({ onFail, ...props }) {
  const ref = useRef(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0 && i.src) onFail(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <img ref={ref} onError={onFail} {...props} />;
}

/* Campaign images. Tiles that fail to load disappear; if all fail, onEmpty fires. */
export function Gallery({ images, label, limit, strip, onEmpty }) {
  const open = useLightbox();
  const [failed, setFailed] = useState(() => new Set());
  const list = (limit ? images.slice(0, limit) : images).filter((u) => !failed.has(u));
  useEffect(() => { if (list.length === 0 && onEmpty) onEmpty(); }, [list.length]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!list.length) return null;
  return (
    <div className={strip ? 'strip gal' : 'gal'}>
      {list.map((u, i) => (
        <a key={u} href={u} onClick={(e) => { e.preventDefault(); open(list, i, label); }}>
          <SafeImg src={u} alt={`${label} campaign by Papersip`} loading="lazy" decoding="async" onFail={() => setFailed((s) => new Set(s).add(u))} />
        </a>
      ))}
    </div>
  );
}

/* TV commercials: nothing is downloaded until someone presses play. */
export function TvCards({ videos }) {
  return (
    <div className="tv-grid">
      {videos.map((v, i) => <TvCard key={v} src={v} n={i + 1} />)}
    </div>
  );
}
function TvCard({ src, n }) {
  const [on, setOn] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div className="tv-card">
      <span className="lbl"><b>●</b> TVC {pad2(n)}</span>
      {!on && (
        <button type="button" className="facade" onClick={() => setOn(true)} aria-label={`Play TV commercial ${n}`}>
          <span className="bars" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map((i) => <i key={i} />)}</span>
          <span className="play">{PLAY}</span>
        </button>
      )}
      {on && !err && <video src={src} controls autoPlay playsInline onError={() => setErr(true)} />}
      {err && <p className="err">This video could not load. Ask us for the reel on {CONTACT.phone}.</p>}
    </div>
  );
}

/* Radio spots: SoundCloud player loads only on click (each player is ~1 MB). */
export function RadioCards({ ids }) {
  return <div className="radio-grid">{ids.map((t, i) => <RadioCard key={t} id={t} n={i + 1} />)}</div>;
}
function RadioCard({ id, n }) {
  const [on, setOn] = useState(false);
  const src = `https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F${id}&color=%23ff1f8e&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
  return (
    <div className="rcard">
      <div className="top"><b>Spot {pad2(n)}</b><span className="mono">FM · Radio</span></div>
      {on
        ? <iframe title={`Radio spot ${n}`} allow="autoplay" src={src} />
        : <button type="button" className="facade" onClick={() => setOn(true)} aria-label={`Play radio spot ${n}`}><span className="play">{PLAY}</span><Wave n={22} /></button>}
    </div>
  );
}

/* Google map: loads on click. */
export function MapFacade({ query }) {
  const [on, setOn] = useState(false);
  const q = encodeURIComponent(query);
  return (
    <div className="map">
      {on
        ? <iframe title="Map of the Papersip studio in Green Field, Faridabad" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${q}&output=embed`} />
        : <button type="button" className="facade" onClick={() => setOn(true)}><span className="pin"><i /></span><span>Show map</span></button>}
    </div>
  );
}

/* Client logos. A logo that fails to load becomes a coloured name tile. */
export function LogoWall({ logos }) {
  return <div className="logo-wall">{logos.map(([n, u]) => <LogoTile key={n} name={n} src={u} />)}</div>;
}
function LogoTile({ name, src }) {
  const [bad, setBad] = useState(false);
  return (
    <div className={'lw rv' + (bad ? ' txt' : '')}>
      {bad ? <span className="fallback">{name}</span> : <SafeImg src={src} alt={name} loading="lazy" decoding="async" onFail={() => setBad(true)} />}
      <span className="nm">{name}</span>
    </div>
  );
}
