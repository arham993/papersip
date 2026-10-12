import { Link } from 'react-router-dom';
import { PROCESS, CLIENTS, TICKER, CONTACT } from '../data.js';

export const asset = (p) => import.meta.env.BASE_URL + p;
export const thumb = (k, size) => asset(`thumbs/${k}${size === 'md' ? '-md' : size ? '-sm' : ''}.webp`);
export const pad2 = (n) => String(n).padStart(2, '0');

export function Reg() {
  return <svg className="reg" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="5.5" /><path d="M10 0v20M0 10h20" /></svg>;
}

const ICON = {
  reach: <><circle cx="12" cy="12" r="2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  camera: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  repeat: <><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" /><path d="M18 3v4h-4M6 21v-4h4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  wave: <path d="M3 12h1M7 8v8M11 5v14M15 8v8M19 10v4" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  pen: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></>,
  news: <><rect x="3" y="4" width="15" height="16" rx="1" /><path d="M18 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4" /></>,
  book: <><path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a2 2 0 0 0-2 1 2 2 0 0 0-2-1H4z" /><path d="M12 5v15" /></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" /></>,
  pin: <><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  board: <><rect x="3" y="4" width="18" height="10" rx="1" /><path d="M12 14v7M8 21h8" /></>,
  bus: <><rect x="4" y="3" width="16" height="15" rx="3" /><path d="M4 11h16M8 18v3M16 18v3" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 14.5A5 5 0 0 1 21 19" /></>,
  tools: <><path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2 2 0 0 1-3-3z" /><path d="M14.5 6.5L17 4l3 3-2.5 2.5" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  persona: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  report: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 15l3-3 3 2 4-5" /></>,
  signpost: <path d="M12 3v18M12 6h7l2 2-2 2h-7M12 12H5l-2 2 2 2h7" />,
  store: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6z" /><path d="M10 20v-5h4v5" /></>,
  brush: <><path d="M18 3l3 3-9 9-3-3z" /><path d="M9 12c-3 0-5 2-5 5 0 1-1 2-2 2 2 2 7 2 9-1 1-1.5 1-3.5-2-6z" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4M9 12h7M9 16h5" /></>,
  loop: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></>,
  sliders: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
  mix: <><rect x="3" y="3" width="8" height="8" rx="1" /><circle cx="17" cy="7" r="4" /><path d="M3 21l4-7 4 7zM13 13h8v8h-8z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
};
export function Icon({ name }) { return <svg viewBox="0 0 24 24" aria-hidden="true">{ICON[name]}</svg>; }

export function Slug({ children, style }) { return <p className="slug mono" style={style}><Reg />{children}</p>; }

export function Crumbs({ trail }) {
  return (
    <nav className="crumbs mono" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {trail.map(([label, to]) => (
        <span key={label} style={{ display: 'contents' }}>
          <span className="sep">/</span>
          {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
        </span>
      ))}
    </nav>
  );
}

// Big headline split into masked lines that rise in on load
export function Lines({ lines }) {
  return lines.map((l, j) => <span className="ln" key={j}><span style={{ '--d': j }}>{l}</span></span>);
}

export function Eyebrow({ tag, children }) {
  return <p className="eyebrow mono"><span className="onair">{tag}</span> {children}</p>;
}

export function CtaBand({ title, btn = 'Get a quote', to = '/contact/', acc = 'm', ghost = 'Papersip', sub }) {
  return (
    <section className="cta-band" data-acc={acc}>
      <span className="ghost" aria-hidden="true">{ghost}</span>
      <div className="wrap">
        <div><h2>{title}</h2>{sub && <p className="lede" style={{ color: 'inherit', opacity: 0.85, marginTop: 18 }}>{sub}</p>}</div>
        <div className="ctas"><Link className="btn btn-solid" to={to}>{btn} <span className="arr">→</span></Link><a className="btn" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></div>
      </div>
    </section>
  );
}

export function SvcCard({ s }) {
  return (
    <Link className="svc-card rv" to={`/services/${s.slug}/`} data-acc={s.acc}>
      <div className="thumb"><span className="no mono">{pad2(s.i + 1)} / 08</span><img src={thumb(s.k, true)} alt="" width="520" height="430" loading="lazy" decoding="async" /></div>
      <div className="body"><h3>{s.name}</h3><p>{s.line}</p><span className="go">Learn more <span>→</span></span></div>
    </Link>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {PROCESS.map(([t, d], i) => <div className="step rv" key={t}><span className="big" aria-hidden="true">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}
    </div>
  );
}

export function SecHead({ slug, title, intro, style }) {
  return <div className="sec-head rv" style={style}><Slug>{slug}</Slug>{title && <h2>{title}</h2>}{intro && <p className="intro">{intro}</p>}</div>;
}

export function Ticker({ hidden }) {
  return (
    <div className="ticker" aria-label={hidden ? undefined : 'Channels we run'} aria-hidden={hidden || undefined}>
      <div className="ticker-track">
        {[0, 1].map((r) => TICKER.map((w) => <span className="ticker-item" key={r + w} aria-hidden={r ? true : undefined}><i />{w}</span>))}
      </div>
    </div>
  );
}

// deterministic pseudo-random bars (same on server and client)
export function Wave({ n = 28 }) {
  return <div className="wave" aria-hidden="true">{Array.from({ length: n }, (_, i) => { const a = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1, b = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1; return <i key={i} style={{ animationDelay: `-${(a * 1.1).toFixed(2)}s`, animationDuration: `${(0.6 + b * 0.9).toFixed(2)}s` }} />; })}</div>;
}

export function Streams() {
  const seven = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div className="streams">
      <div className="drift" data-speed="0.03"><Link className="tilt" to="/services/tv-advertising/">
        <div className="vis v-tv" aria-hidden="true"><div className="rec"><span><b>●</b> REC</span><span data-tc="loop">00:00:30:00</span></div><div className="bars">{seven.map((i) => <span key={i} />)}</div><div className="mid">{seven.map((i) => <span key={i} />)}</div><div className="low">{[0, 1, 2, 3, 4].map((i) => <span key={i} />)}</div></div>
        <div className="txt"><p className="kicker mono">The reach of TV</p><h3>Television</h3><p>Sight, sound and motion in the living room. Commercials built to earn trust, then placed where your buyers watch.</p></div></Link></div>
      <div className="drift" data-speed="-0.02"><Link className="tilt" to="/services/radio-advertising/">
        <div className="vis v-radio" aria-hidden="true"><div className="dial"><div className="nums">{['88', '92', '96', '100', '104', '108'].map((n) => <span key={n}>{n}</span>)}</div><div className="needle" /></div><Wave /><div className="band"><span>FM</span><span>MHz</span></div></div>
        <div className="txt"><p className="kicker mono">The intimacy of radio</p><h3>Radio</h3><p>One voice talking to one listener, often on the drive home. Audio stays in memory long after visuals fade.</p></div></Link></div>
      <div className="drift" data-speed="0.04"><Link className="tilt" to="/services/print-advertising/">
        <div className="vis v-print" aria-hidden="true"><div className="mast">The Morning Edition</div><div className="date"><span>Vol. XVI</span><span>Delhi NCR</span><span>₹5</span></div><div className="body"><div className="photo" /><div className="cols"><b>Brands built from ground zero</b>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} />)}</div></div></div>
        <div className="txt"><p className="kicker mono">The trust of print</p><h3>Print</h3><p>A written confirmation to your consumer. Something they can hold, read twice and keep on the table.</p></div></Link></div>
      <div className="drift" data-speed="-0.03"><Link className="tilt" to="/services/ooh-advertising/">
        <div className="vis v-ooh" aria-hidden="true"><div className="dim"><span>40 × 20 FT</span></div><div className="board">Seen daily<small>on the whole route</small></div><div className="pole" /><div className="phone"><div><span className="tag">SPONSORED</span><span className="img" /><span className="cta" /></div></div></div>
        <div className="txt"><p className="kicker mono">The precision of OOH & digital</p><h3>Outdoor + Digital</h3><p>Hoardings cover a whole route many times a day. Digital narrows it to the prospects most likely to buy.</p></div></Link></div>
    </div>
  );
}

export function Marquee() {
  const a = CLIENTS.slice(0, 14), b = CLIENTS.slice(14);
  return (
    <>
      <div className="marq" aria-hidden="true">{[...a, ...a].map((n, i) => <span key={i}>{n}</span>)}</div>
      <div className="marq rev" aria-hidden="true">{[...b, ...b].map((n, i) => <span key={i}>{n}</span>)}</div>
      <p className="sr">Clients include {CLIENTS.join(', ')}.</p>
    </>
  );
}

export function Stats({ items, four }) {
  return (
    <div className={'stats' + (four ? ' four' : '')}>
      {items.map(([n, label, opts = {}]) => (
        <div className="stat rv" key={label}>
          {opts.pct
            ? <span className="n"><span data-count={n}>{n}</span><sup>%</sup></span>
            : <span className="n" data-count={n} data-from={opts.from}>{n}</span>}
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq rv">
      {items.map(([q, a]) => <details key={q}><summary>{q}<i aria-hidden="true" /></summary><p className="ans">{a}</p></details>)}
    </div>
  );
}
