import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OOH_IMG, SIGN_IMG, PRINT_IMG, TV_VID, RADIO } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, CtaBand } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';
import { Gallery, TvCards, RadioCards } from '../components/Media.jsx';

const SECTIONS = [
  { k: 'ooh', label: 'OOH', title: 'OOH campaigns', acc: 'v', n: OOH_IMG.length },
  { k: 'radio', label: 'Radio', title: 'Radio campaigns', acc: 'c', n: RADIO.length },
  { k: 'tv', label: 'TV', title: 'TV campaigns', acc: 'y', n: TV_VID.length },
  { k: 'signage', label: 'Signage', title: 'Visibility signages', acc: 'm', n: SIGN_IMG.length },
  { k: 'print', label: 'Print', title: 'Print campaigns', acc: 'y', n: PRINT_IMG.length },
];
const IMAGES = { ooh: OOH_IMG, signage: SIGN_IMG, print: PRINT_IMG };

export default function Work() {
  useSeo('Our Work · Papersip Company', 'OOH, TV, radio, visibility signage and print campaigns by Papersip Company.');
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [empty, setEmpty] = useState({});
  useEffect(() => { const h = hash.slice(1); setFilter(SECTIONS.some((s) => s.k === h) ? h : 'all'); }, [hash]);
  const live = SECTIONS.filter((s) => !empty[s.k]);
  const total = live.reduce((a, s) => a + s.n, 0);
  const pick = (k) => {
    setFilter(k);
    navigate({ hash: k === 'all' ? '' : k }, { replace: true, preventScrollReset: true });
    if (k !== 'all') requestAnimationFrame(() => document.getElementById(k)?.scrollIntoView({ behavior: 'smooth' }));
  };
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="v">
          <FieldScene />
          <div className="wrap">
            <Crumbs trail={[['Our Work']]} />
            <Eyebrow tag="Portfolio">OOH · Radio · TV · Signage · Print</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={[<>Our <em className="grad">works</em></>]} /></h1>
            <p className="lede">OOH, radio, TV, visibility signage and print campaigns we’ve planned and placed.</p>
          </div>
        </section>
        <div className="wrap" style={{ paddingBottom: 'clamp(40px,6vw,80px)' }}>
          <div className="filters" role="toolbar" aria-label="Filter work by medium">
            <button type="button" aria-pressed={filter === 'all'} onClick={() => pick('all')}>All <small>{total}</small></button>
            {live.map((s) => <button type="button" key={s.k} aria-pressed={filter === s.k} onClick={() => pick(s.k)}>{s.label} <small>{s.n}</small></button>)}
          </div>
          {live.map((s) => (
            <section className="work-sec" id={s.k} key={s.k} data-acc={s.acc} hidden={!(filter === 'all' || filter === s.k)}>
              <div className="work-head"><h2><i aria-hidden="true" />{s.title}</h2></div>
              {IMAGES[s.k] && <Gallery images={IMAGES[s.k]} label={s.label} onEmpty={() => setEmpty((e) => ({ ...e, [s.k]: true }))} />}
              {s.k === 'tv' && <TvCards videos={TV_VID} />}
              {s.k === 'radio' && <RadioCards ids={RADIO} />}
            </section>
          ))}
        </div>
      </main>
      <CtaBand title="Want your brand on this list next?" acc="m" ghost="" />
    </>
  );
}
