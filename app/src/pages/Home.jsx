import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, OOH_IMG, SIGN_IMG, PRINT_IMG } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Lines, Eyebrow, SecHead, Slug, Streams, Marquee, Stats, CtaBand, pad2 } from '../components/ui.jsx';
import MediaPartners from '../components/MediaPartners.jsx';
import { HeroScene, StageScene } from '../components/Scene3D.jsx';
import { Gallery } from '../components/Media.jsx';

function Channels() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  // the row crossing the middle of the screen becomes the active channel
  useEffect(() => {
    const rows = [...listRef.current.querySelectorAll('.ch')];
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) setActive(+en.target.dataset.i); }), { rootMargin: '-48% 0px -48% 0px' });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);
  const s = SERVICES[active];
  return (
    <div className="channels">
      <ul className="ch-list" ref={listRef}>
        {SERVICES.map((x) => (
          <li key={x.k}>
            <Link className={'ch' + (x.i === active ? ' on' : '')} data-i={x.i} to={`/services/${x.slug}/`} onMouseEnter={() => setActive(x.i)} onFocus={() => setActive(x.i)}>
              <span className="num mono">{pad2(x.i + 1)}</span><h3>{x.name}</h3><p>{x.line}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="stage">
        <StageScene active={active} />
        <div className="stage-top mono"><span>CH {pad2(active + 1)} / 08</span><span className="live">Drag to turn</span></div>
        <div className="stage-bot"><h3>{s.name}</h3><Link className="btn btn-sm btn-light" to={`/services/${s.slug}/`}>Open <span className="arr">→</span></Link></div>
      </div>
    </div>
  );
}

export default function Home() {
  useSeo('Papersip Company · One-stop advertising agency', 'Papersip Company runs TV, radio, print, OOH and digital advertising, visibility signage, media buying and strategy from one team in Faridabad. In business since 2010.');
  const [workEmpty, setWorkEmpty] = useState(false);
  return (
    <>
      <main id="main">
        <section className="hero" id="top">
          <HeroScene />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="eyebrow mono">In business since 2010</p>
              <h1><Lines lines={['Expertly crafting', <>your <em className="grad">brand</em> story.</>]} /></h1>
              <p className="lede">A venture built to provide and execute Radio, Outdoor, Digital, TV, and Print advertising, wayfinding signage systems, retail solutions, wall art/murals, and creative design — all from ground zero.</p>
              <div className="ctas"><Link className="btn btn-m" to="/contact/">Get a quote <span className="arr">→</span></Link><Link className="btn" to="/our-work/">See our work</Link></div>
            </div>
          </div>
        </section>
        <MediaPartners />

        <section className="sec" id="channels">
          <div className="wrap">
            <SecHead slug="Our channels" title="Every channel your customers tune into." intro="Hover a channel to see how we run it." />
            <Channels />
          </div>
        </section>

        <section className="sec band-v" id="streams">
          <div className="wrap">
            <SecHead slug="Advertising Streams" title="One brand. Multiple touchpoints. Greater impact." intro="From radio and TV to print, OOH and digital, we take your brand message where your audience is and make it matter." />
            <Streams />
          </div>
        </section>

        <section className="sec alt" id="what">
          <div className="wrap integrated">
            <div className="copy rv">
              <Slug>What we do</Slug>
              <h2>Transforming brands through integrated advertising.</h2>
              <p>We craft advertising solutions designed to elevate your brand across every medium. Whether it’s the reach of TV, the intimacy of radio, the trust of print, or the precision of digital and out-of-home, we make sure your message lands with the right audience.</p>
              <p>Our approach starts with understanding your goals and ends with campaigns that inspire action. With Papersip Company, you get more than just advertising — you get a partner dedicated to your success.</p>
              <ul className="value-list">{['Transparency', 'Accountability', 'Creative Excellence', 'Results-Driven Approach'].map((v) => <li key={v}>{v}</li>)}</ul>
              <div className="ctas"><Link className="btn" to="/about/">About Papersip <span className="arr">→</span></Link></div>
            </div>
            <Stats items={[[2010, 'Founded', { from: 1994 }], [99, 'Advertising skills', { pct: true }], [95, 'Successful projects', { pct: true }], [8, 'Disciplines under one roof']]} />
          </div>
        </section>

        <section className="sec band-m" id="clients">
          <div className="wrap"><div className="sec-head"><Slug>Clients</Slug><h2>Brands that trust us with their media budget.</h2></div></div>
          <Marquee single />
          <div className="wrap"><div className="note"><span /><Link className="btn" to="/clients/">See all clients <span className="arr">→</span></Link></div></div>
        </section>

        {!workEmpty && (
          <section className="sec alt" id="work">
            <div className="wrap">
              <div className="strip-head rv"><div><Slug>Our work</Slug><h2 style={{ marginTop: 14 }}>Our works.</h2></div><Link className="btn" to="/our-work/">See all work <span className="arr">→</span></Link></div>
              <Gallery images={[OOH_IMG[0], SIGN_IMG[14], PRINT_IMG[0], OOH_IMG[11], SIGN_IMG[3], OOH_IMG[2]]} label="Campaign" strip onEmpty={() => setWorkEmpty(true)} />
            </div>
          </section>
        )}
      </main>
      <CtaBand title="Ready to craft your brand story from ground zero?" ghost="" />
    </>
  );
}
