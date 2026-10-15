import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, SecHead, Streams, Ticker, SvcCard, CtaBand, Icon, pad2 } from '../components/ui.jsx';
import { RingScene } from '../components/Scene3D.jsx';

const BENEFITS = [
  ['m', 'globe', '360° Solutions', 'As we provide 360° solutions under one roof, we are capable of giving your brand a more expansive presence and reaching a much wider audience.'],
  ['c', 'star', 'Expertise', 'Our core team has years of experience in their respective fields: planning, buying and execution.'],
  ['y', 'eye', 'Brand Visibility & Delivery', 'We work to create media plans that are consistent with your brand image and message.'],
];

export default function Services() {
  useSeo('Services · Papersip Company', 'TV, radio, print, OOH and digital advertising, visibility signage, media buying & planning and strategy from Papersip Company.');
  const [front, setFront] = useState(0);
  const s = SERVICES[front];
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="m">
          <div className="wrap">
            <Crumbs trail={[['Services']]} />
            <div className="phero-grid">
              <div>
                <Eyebrow tag="Services">Eight disciplines</Eyebrow>
                <h1 style={{ marginTop: 22 }}><Lines lines={['Eight disciplines.', <><em className="grad">One team</em> running</>, 'them together.']} /></h1>
                <p className="lede">We craft advertising solutions designed to elevate your brand across every medium.</p>
                <div className="ctas"><Link className="btn btn-m" to="/contact/">Get a proposal <span className="arr">→</span></Link><a className="btn" href="#all">Browse services</a></div>
              </div>
              <div className="solo" data-acc="y">
                <RingScene onFront={setFront} />
                <div className="tag mono"><span>{pad2(front + 1)} / 08</span><span className="live">Drag · click to open</span></div>
                <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12, pointerEvents: 'none' }}>
                  <h3 style={{ fontSize: 'clamp(30px,3.6vw,48px)' }}>{s.name}</h3>
                  <Link className="btn btn-sm btn-light" to={`/services/${s.slug}/`} style={{ pointerEvents: 'auto' }}>Open <span className="arr">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Ticker hidden />

        <section className="sec alt" id="all">
          <div className="wrap">
            <SecHead slug="All services" title="One team, eight ways to reach your audience." />
            <div className="svc-grid">{SERVICES.map((x) => <SvcCard key={x.k} s={x} />)}</div>
          </div>
        </section>

        <section className="sec band-v">
          <div className="wrap">
            <SecHead slug="Advertising Streams" title="One brand. Multiple touchpoints. Greater impact." intro="From radio and TV to print, OOH and digital, we take your brand message where your audience is and make it matter." />
            <Streams />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SecHead slug="Benefits" title="Benefits to hire PaperSip Company." />
            <div className="benefits">
              {BENEFITS.map(([acc, ic, h, p]) => <div className="benefit rv" data-acc={acc} key={h}><span className="ic"><Icon name={ic} /></span><h3>{h}</h3><p>{p}</p></div>)}
            </div>
          </div>
        </section>

      </main>
      <CtaBand title="Ready to craft your brand story from ground zero?" acc="c" ghost="" />
    </>
  );
}
