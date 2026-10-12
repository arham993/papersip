import { Link } from 'react-router-dom';
import { CLIENT_LOGOS } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, Slug, SecHead, Marquee, Stats, CtaBand } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';
import { LogoWall } from '../components/Media.jsx';

export default function Clients() {
  useSeo('Clients · Papersip Company', 'Brands that trust Papersip Company with their media budget, including DLF, M3M, Emaar India, Manipal Hospitals, Nike and PC Jeweller.');
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="y">
          <FieldScene />
          <div className="wrap">
            <Crumbs trail={[['Clients']]} />
            <Eyebrow tag="27 brands">Real estate · healthcare · education · auto · retail</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={['Brands that', 'trust us with', <>their <em className="grad">media budget.</em></>]} /></h1>
            <p className="lede">Developers, hospitals, universities, retailers and automotive brands we've planned, bought and produced campaigns for since 2010.</p>
          </div>
        </section>

        <section className="sec tight">
          <div className="wrap">
            <SecHead slug="Brands we've worked with" intro="Hover a logo to bring it to colour." style={{ marginBottom: 28 }} />
            <LogoWall logos={CLIENT_LOGOS} />
          </div>
        </section>

        <section className="sec band-m">
          <div className="wrap"><div className="sec-head"><Slug>On the list</Slug><h2>Every one started with a brief.</h2><p className="intro">Your brand could be on the next row.</p></div></div>
          <Marquee />
          <div className="wrap"><div className="note"><span className="mono">Want your brand on this list next?</span><Link className="btn" to="/contact/">Start a brief <span className="arr">→</span></Link></div></div>
        </section>

        <section className="sec">
          <div className="wrap integrated">
            <div className="copy rv">
              <Slug>Why they stay</Slug>
              <h2>Transparency, accountability, results.</h2>
              <p>Clients see where the money goes, get weekly reporting on what is working, and work with the same team from the first plan to the final report.</p>
              <div className="ctas"><Link className="btn" to="/our-work/">See the work <span className="arr">→</span></Link></div>
            </div>
            <Stats items={[[27, 'Brands on our client list.'], [2010, 'Working with brands since.', { from: 1994 }], [95, 'Successful projects.', { pct: true }], [8, 'Channels under one roof.']]} />
          </div>
        </section>
      </main>
      <CtaBand title="Want your brand on this list next?" btn="Start a brief" acc="y" ghost="Clients" />
    </>
  );
}
