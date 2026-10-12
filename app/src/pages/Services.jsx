import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, SecHead, Steps, Streams, Ticker, SvcCard, CtaBand, Icon, pad2 } from '../components/ui.jsx';
import { RingScene } from '../components/Scene3D.jsx';

const BENEFITS = [
  ['m', 'globe', '360° solutions', 'Multiple services under one roof give your brand a broader presence and a larger audience.'],
  ['c', 'star', 'Expertise', 'Our core team has years of experience in planning, buying and execution, which shows in every media plan.'],
  ['y', 'eye', 'Visibility & delivery', "Media plans built around your brand's image and message, so you stand out from competitors and draw traffic."],
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
                <Eyebrow tag="8 channels">One team running them together</Eyebrow>
                <h1 style={{ marginTop: 22 }}><Lines lines={['Eight', 'disciplines.', <em className="grad">One team.</em>]} /></h1>
                <p className="lede">TV, radio, print, outdoor and digital advertising, visibility signage, media buying and strategy, planned together so every touchpoint tells the same story.</p>
                <div className="ctas"><Link className="btn btn-m" to="/contact/">Get a proposal <span className="arr">→</span></Link><a className="btn" href="#all">Browse services</a></div>
              </div>
              <div className="solo" data-acc="y">
                <RingScene onFront={setFront} />
                <div className="tag mono"><span>{pad2(front + 1)} / 08</span><span className="live">Drag · click to open</span></div>
                <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12, pointerEvents: 'none' }}>
                  <h3 style={{ fontSize: 'clamp(30px,3.6vw,48px)' }}>{s.name}</h3>
                  <Link className="btn btn-sm" to={`/services/${s.slug}/`} style={{ pointerEvents: 'auto', background: 'var(--paper)', borderColor: 'var(--paper)' }}>Open <span className="arr">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Ticker hidden />

        <section className="sec" id="all">
          <div className="wrap">
            <SecHead slug="All services" title="Pick a channel, or let us mix them." intro="Every service runs on the same three-stage process and the same team, so channels work together instead of competing for budget." />
            <div className="svc-grid">{SERVICES.map((x) => <SvcCard key={x.k} s={x} />)}</div>
          </div>
        </section>

        <section className="sec band-v">
          <div className="wrap">
            <SecHead slug="Advertising streams" title="One brand. Multiple touchpoints." intro="The reach of TV, the intimacy of radio, the trust of print, and the precision of OOH and digital." />
            <Streams />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SecHead slug="Why Papersip" title="Benefits of hiring Papersip." />
            <div className="benefits">
              {BENEFITS.map(([acc, ic, h, p]) => <div className="benefit rv" data-acc={acc} key={h}><span className="ic"><Icon name={ic} /></span><h3>{h}</h3><p>{p}</p></div>)}
            </div>
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <SecHead slug="How we run it" title="Same three stages on every channel." />
            <Steps />
          </div>
        </section>
      </main>
      <CtaBand title="Not sure which channels fit?" btn="Ask for a media plan" acc="c" ghost="Services" sub="Tell us the goal and budget. We will propose the mix." />
    </>
  );
}
