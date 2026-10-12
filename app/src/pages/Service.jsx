import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SERVICES, BYK, BYSLUG, WORK_IMAGES, TV_VID, RADIO, FAQ } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Slug, SecHead, Steps, SvcCard, CtaBand, Icon, Faq, pad2 } from '../components/ui.jsx';
import { SoloScene } from '../components/Scene3D.jsx';
import { Gallery, TvCards, RadioCards } from '../components/Media.jsx';
import NotFound from './NotFound.jsx';

const LABEL = { ooh: 'OOH', print: 'Print', signage: 'Signage' };

function WorkStrip({ s }) {
  const [empty, setEmpty] = useState(false);
  const w = s.work;
  if (!w || empty) return null;
  let title, link, body;
  if (WORK_IMAGES[w]) {
    title = `${LABEL[w]} campaigns we've run.`; link = `See all ${LABEL[w].toLowerCase()} work`;
    body = <Gallery images={WORK_IMAGES[w]} label={LABEL[w]} limit={8} strip onEmpty={() => setEmpty(true)} />;
  } else if (w === 'tv') {
    title = "TV commercials we've run."; link = 'See all work'; body = <TvCards videos={TV_VID} />;
  } else {
    title = 'Have a listen.'; link = 'All radio spots'; body = <RadioCards ids={RADIO.slice(0, 4)} />;
  }
  return (
    <section className="sec tight">
      <div className="wrap">
        <div className="strip-head rv"><div><Slug>From our work</Slug><h2 style={{ marginTop: 14 }}>{title}</h2></div><Link className="btn" to={`/our-work/#${w}`}>{link} <span className="arr">→</span></Link></div>
        {body}
      </div>
    </section>
  );
}

export default function Service() {
  const { slug } = useParams();
  const s = BYSLUG[slug];
  useSeo(s ? `${s.name} · Papersip Company` : 'Page not found · Papersip Company', s ? `${s.name} by Papersip Company: ${s.line} ${s.intro}` : 'This page is not on air.');
  if (!s) return <NotFound noSeo />;
  const prev = SERVICES[(s.i + 7) % 8], next = SERVICES[(s.i + 1) % 8];
  const quote = `/contact/?service=${s.k}`;
  return (
    <div data-acc={s.acc}>
      <main id="main">
        <section className="phero">
          <div className="wrap">
            <Crumbs trail={[['Services', '/services/'], [s.name]]} />
            <div className="phero-grid">
              <div>
                <p className="eyebrow mono"><span className="onair">CH {pad2(s.i + 1)} / 08</span> {s.line}</p>
                <h1 style={{ marginTop: 22 }}><Lines lines={s.h1} /></h1>
                <p className="lede">{s.intro}</p>
                <div className="ctas"><Link className="btn btn-acc" to={quote}>Get a proposal <span className="arr">→</span></Link><a className="btn" href="#why">How we run it</a></div>
              </div>
              <div className="solo">
                <SoloScene k={s.k} name={s.name} />
                <div className="tag mono"><span>{s.short}</span><span className="live">Drag to turn</span></div>
                <span className="big" aria-hidden="true">{pad2(s.i + 1)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="why">
          <div className="wrap why">
            <div className="copy rv">
              <Slug>Why this channel</Slug>
              <h2>{s.h2}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
              <div className="ctas"><Link className="btn btn-acc" to={quote}>Plan my {s.short.toLowerCase()} campaign <span className="arr">→</span></Link></div>
            </div>
            <div className="feats">
              {s.feats.map(([ic, t, d]) => <div className="feat rv" key={t}><span className="ic"><Icon name={ic} /></span><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <SecHead slug="How we run it" title="Same three-stage process, tuned to this channel." />
            <Steps />
          </div>
        </section>

        <WorkStrip s={s} />

        {s.faq && (
          <section className="sec tight">
            <div className="wrap why">
              <div className="copy rv"><Slug>Common questions</Slug><h2>Before you book a hoarding.</h2></div>
              <Faq items={FAQ} />
            </div>
          </section>
        )}

        <section className="sec tight">
          <div className="wrap">
            <div className="strip-head rv">
              <div><Slug>More services</Slug><h2 style={{ marginTop: 14 }}>Often paired with this channel.</h2></div>
              <div className="ctas"><Link className="btn btn-sm" to={`/services/${prev.slug}/`}>← {prev.short}</Link><Link className="btn btn-sm" to={`/services/${next.slug}/`}>{next.short} →</Link></div>
            </div>
            <div className="svc-grid">{s.rel.map((k) => <SvcCard key={k} s={BYK[k]} />)}</div>
          </div>
        </section>
      </main>
      <CtaBand title={`Ready to run ${s.name.toLowerCase()}?`} btn="Get a proposal" to={quote} acc={s.acc} ghost={s.short} />
    </div>
  );
}
