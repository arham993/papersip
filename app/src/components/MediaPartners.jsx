import { useEffect, useRef, useState } from 'react';
import { MEDIA_PARTNERS } from '../data.js';
import { Slug } from './ui.jsx';

function PartnerLogo({ p }) {
  const [bad, setBad] = useState(!p.src);
  const ref = useRef(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && !i.naturalWidth && i.src) setBad(true); }, []);
  return (
    <span className={'mp-card' + (p.dark ? ' dark' : '') + (bad ? ' txt' : '')}>
      {bad
        ? <span className="mp-name">{p.name}</span>
        : <img ref={ref} src={p.src} alt={p.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setBad(true)} />}
    </span>
  );
}

// One scrolling row; the list is repeated so the loop is seamless.
function Row({ items, reverse }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="mp-row">
      <div className="mp-viewport">
        <div className={'mp-track' + (reverse ? ' rev' : '')} style={{ '--n': items.length }}>
          {loop.map((p, i) => <PartnerLogo key={i} p={p} />)}
        </div>
      </div>
    </div>
  );
}

export default function MediaPartners() {
  const r = MEDIA_PARTNERS.radio, t = MEDIA_PARTNERS.tv, mixed = [];
  for (let i = 0; i < Math.max(r.length, t.length); i++) { if (t[i]) mixed.push(t[i]); if (r[i]) mixed.push(r[i]); }
  const all = mixed.map((p) => p.name).join(', ');
  return (
    <section className="media-partners" aria-labelledby="mp-title">
      <div className="wrap mp-head">
        <Slug>Our media partners</Slug>
        <h2 id="mp-title">On air with India's top networks.</h2>
      </div>
      <div aria-hidden="true">
        <Row items={mixed} />
      </div>
      <p className="sr">Media partners: {all}.</p>
    </section>
  );
}
