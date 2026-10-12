import { Link } from 'react-router-dom';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, Slug, SecHead, Steps, Stats, CtaBand, Reg } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';

const PILLARS = [
  ['Mission', 'In partnership, in profit', 'Develop and apply talent for the benefit of our clients, in partnership, and in profit.'],
  ['Vision', 'Shape the industry', 'To be the market leader in driving innovation and shaping the industry.'],
  ['Philosophy', 'Limitless together', 'People coming together to work, limitless in ideation, implementation and collaboration.'],
  ['Care', 'Genuine care', 'We stay true to our values and partner with responsible companies.'],
];
const DESKS = [['Media Strategy', 'Planning and media buying'], ['Creative Direction', 'TV, print and radio'], ['Digital', 'Digital and performance'], ['Client Partnerships', 'Account and delivery']];

export default function About() {
  useSeo('About · Papersip Company', 'Papersip Company is a brand-focused marketing media consultancy in Faridabad, in business since 2010. Our mission, vision, values and team.');
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="c">
          <FieldScene />
          <div className="wrap">
            <Crumbs trail={[['About']]} />
            <Eyebrow tag="Since 2010">Brand-focused media consultancy</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={['We do the', <em className="grad">ground work</em>, 'first.']} /></h1>
            <p className="lede">Papersip is a brand-focused marketing media consultancy with a strong team of innovative and strategic thinkers who believe in doing the ground work first.</p>
            <div className="ctas"><Link className="btn btn-m" to="/contact/">Work with us <span className="arr">→</span></Link><Link className="btn" to="/services/">Our services</Link></div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap story">
            <p className="big-q rv">Creativity has a role to play. <em>Strategy</em> is the garnishing effect.</p>
            <div className="copy rv">
              <p><strong>Papersip was built to provide and run Radio, Outdoor, Digital, TV and Print advertising,</strong> along with wayfinding signage systems, retail solutions, wall art and murals, and creative design. All from ground zero.</p>
              <p>Eight disciplines sit under one roof and are run by one team, so your TV spot, your hoardings and your digital campaign are planned together instead of in silos.</p>
              <p>We stay true to our values and partner with responsible companies. Every client gets genuine care, and every plan starts with the same ground work: who the audience is, and what the budget needs to do.</p>
            </div>
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <Stats four items={[[2010, 'The year we started planning and buying media.', { from: 1994 }], [99, 'Advertising skills across the team.', { pct: true }], [95, 'Successful projects delivered.', { pct: true }], [8, 'Disciplines under one roof.']]} />
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <SecHead slug="What drives us" title="Mission, vision and the way we work." />
            <div className="pillars">
              {PILLARS.map(([k, h, p]) => <div className="pillar rv" key={k}><p className="mono">{k}</p><h3>{h}</h3><p>{p}</p></div>)}
            </div>
            <div className="values rv" aria-label="Our values" style={{ marginTop: 'clamp(56px,8vw,96px)' }}>
              <span>Transparency</span><Reg /><span>Accountability</span><Reg /><span>Creative excellence</span><Reg /><span>Results-driven</span>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap mission">
            <div className="rv">
              <Slug>The team</Slug>
              <blockquote style={{ marginTop: 18 }}>People coming together to work, limitless in ideation, implementation, and collaboration.</blockquote>
              <p className="vision">Four desks share every brief, from the first media plan to the last report.</p>
            </div>
            <div className="rv">
              <p className="slug mono" style={{ marginBottom: 8 }}>Four desks, one team</p>
              <div className="desks">{DESKS.map(([b, s]) => <div className="desk" key={b}><b>{b}</b><span>{s}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <SecHead slug="How a campaign runs" title="Ground work first. Then the noise." intro="Every campaign, on every channel, moves through the same three stages." />
            <Steps />
          </div>
        </section>
      </main>
      <CtaBand title="Let’s build your brand story together." acc="v" ghost="Since 2010" />
    </>
  );
}
