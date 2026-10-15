import { Link } from 'react-router-dom';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, Slug, SecHead, Stats, CtaBand } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';

// Copy from papersipcompany.com/about/
const PILLARS = [
  ['Our mission', 'Develop and apply talent for the benefit of our clients — in partnership, and in profit.'],
  ['Our vision', 'To be the market leader in driving innovation and shaping the industry.'],
  ['Our philosophy', 'People coming together to work — limitless in ideation, implementation, and collaboration.'],
  ['Genuine care', 'We stay true to our values and partner with responsible companies.'],
];
const DESKS = [['Media Strategy', 'Planning & media buying'], ['Creative Direction', 'TV, print & radio creative'], ['Digital', 'Digital & performance'], ['Client Partnerships', 'Account & delivery']];

export default function About() {
  useSeo('About · Papersip Company', "We're a brand-focused marketing media consultancy: a strong team of innovative and strategic thinkers who believe in doing the ground work first.");
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="c">
          <FieldScene />
          <div className="wrap">
            <Crumbs trail={[['About']]} />
            <Eyebrow tag="Our story">In business since 2010</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={["We're a brand-focused", <>marketing <em className="grad">media</em></>, 'consultancy.']} /></h1>
            <p className="lede">A strong team of innovative and strategic thinkers who believe in doing the ground work first — genuine in our approach, and invested in the outcome of every project.</p>
            <div className="ctas"><Link className="btn btn-m" to="/contact/">Get a quote <span className="arr">→</span></Link><Link className="btn" to="/services/">Our services</Link></div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap story">
            <div className="rv"><Slug>Our story</Slug><p className="big-q" style={{ marginTop: 18 }}>We are more effective at making <em>different.</em></p></div>
            <div className="copy rv">
              <p>Advertising is the most popular mode of communication there is.</p>
              <p>But with audiences becoming smarter and more aware, the challenge only grows.</p>
              <p><strong>Creativity has a role to play — strategy is the garnishing effect.</strong></p>
            </div>
          </div>
        </section>

        <section className="sec tight alt">
          <div className="wrap">
            <Stats four items={[[2010, 'Founded', { from: 1994 }], [99, 'Advertising skills', { pct: true }], [95, 'Successful projects', { pct: true }], [8, 'Disciplines under one roof']]} />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SecHead slug="What we stand for" title="Four commitments that shape every plan we write." />
            <div className="pillars">
              {PILLARS.map(([h, p]) => <div className="pillar rv" key={h}><h3>{h}</h3><p>{p}</p></div>)}
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="wrap">
            <SecHead slug="Leadership" title="A small team that stays close to every account." />
            <div className="desks desks-4">{DESKS.map(([b, s]) => <div className="desk rv" key={b}><b>{b}</b><span>{s}</span></div>)}</div>
          </div>
        </section>
      </main>
      <CtaBand title="Want to see how we’d plan your next campaign?" btn="Talk to us" acc="v" ghost="" />
    </>
  );
}
