import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DECK_OOH, DECK_RETAIL, DECK_PRINT, DECK_TV, DECK_DIGITAL, DECK_RADIO, OOH_FORMATS, DECK_VALUES } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, CtaBand, SecHead } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';
import { Gallery, TvCards, AudioCards } from '../components/Media.jsx';

/* Content follows the "A glimpse to the work" section of the Papersip Communication credentials deck. */
const SECTIONS = [
  { k: 'ooh', label: 'OOH', title: 'OOH campaigns', sub: 'Billboards, unipoles, gantries, backlit signs, underpasses and airports.', acc: 'v', n: DECK_OOH.length },
  { k: 'retail', label: 'Retail', title: 'Retail branding', sub: 'Store fronts, façades and interiors, branded PAN India.', acc: 'm', n: DECK_RETAIL.length },
  { k: 'tv', label: 'TV', title: 'Electronic media · TV', sub: 'On-air placements on national news.', acc: 'y', n: DECK_TV.length },
  { k: 'radio', label: 'Radio', title: 'Electronic media · Radio', sub: 'FM spots we’ve produced and placed.', acc: 'c', n: DECK_RADIO.length },
  { k: 'print', label: 'Print', title: 'Print campaigns', sub: 'Newspaper releases for real-estate launches.', acc: 'y', n: DECK_PRINT.length },
  { k: 'digital', label: 'Digital', title: 'Digital campaigns', sub: 'In-stream ads for Delta Electronics during live ICC Cricket World Cup 2023 matches.', acc: 'c', n: DECK_DIGITAL.length },
];
const IMAGES = { ooh: DECK_OOH, retail: DECK_RETAIL, print: DECK_PRINT };

export default function Work() {
  useSeo('Our Work · Papersip Company', 'A glimpse of the work: OOH, retail branding, TV, radio, print and digital campaigns by Papersip Company, executed PAN India.');
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
            <Eyebrow tag="Portfolio">OOH · Retail · TV · Radio · Print · Digital</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={['A glimpse', <>of the <em className="grad">work.</em></>]} /></h1>
            <p className="lede">Between us we’ve been part of more than 200 successful campaigns, activations and promotions — planned, organised and executed PAN India.</p>
          </div>
        </section>
        <div className="wrap" style={{ paddingBottom: 'clamp(40px,6vw,80px)' }}>
          <div className="filters" role="toolbar" aria-label="Filter work by medium">
            <button type="button" aria-pressed={filter === 'all'} onClick={() => pick('all')}>All <small>{total}</small></button>
            {live.map((s) => <button type="button" key={s.k} aria-pressed={filter === s.k} onClick={() => pick(s.k)}>{s.label} <small>{s.n}</small></button>)}
          </div>
          {live.map((s) => (
            <section className="work-sec" id={s.k} key={s.k} data-acc={s.acc} hidden={!(filter === 'all' || filter === s.k)}>
              <div className="work-head"><h2><i aria-hidden="true" />{s.title}</h2><p>{s.sub}</p></div>
              {IMAGES[s.k] && <Gallery images={IMAGES[s.k]} label={s.label} fit={s.k === 'print' ? 'contain' : undefined} onEmpty={() => setEmpty((e) => ({ ...e, [s.k]: true }))} />}
              {s.k === 'tv' && <TvCards videos={DECK_TV} tag="TV" />}
              {s.k === 'digital' && <TvCards videos={DECK_DIGITAL} tag="Digital" />}
              {s.k === 'radio' && <AudioCards spots={DECK_RADIO} />}
            </section>
          ))}
        </div>

        <section className="sec alt" hidden={filter !== 'all'}>
          <div className="wrap">
            <SecHead slug="Outdoor media options" title="That way it’s easier to reach." intro="Outdoor’s variety makes it easier to reach any target group — at home, on the commute, at work and out with family." />
            <div className="formats">
              {OOH_FORMATS.map(([h, items], i) => (
                <div className="fmt rv" key={h}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{h}</h3>
                  <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" hidden={filter !== 'all'}>
          <div className="wrap">
            <SecHead slug="To promote and to protect" title="We make advertising talk." intro="This is how we value our clients and their brands." />
            <ul className="deck-values">
              {DECK_VALUES.map(([h, t]) => <li className="rv" key={h}><b>{h}</b><span>{t}</span></li>)}
            </ul>
          </div>
        </section>
      </main>
      <CtaBand title="Want your brand on this list next?" acc="m" ghost="" />
    </>
  );
}
