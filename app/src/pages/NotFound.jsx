import { Link } from 'react-router-dom';
import { SERVICES } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Lines, Eyebrow, SvcCard } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';

function Seo() { useSeo('Page not found · Papersip Company', 'This page is not on air.'); return null; }

export default function NotFound({ noSeo }) {
  return (
    <main id="main" data-acc="m">
      {!noSeo && <Seo />}
      <section className="phero">
        <FieldScene />
        <div className="wrap">
          <Eyebrow tag="Off air">Error 404</Eyebrow>
          <h1 style={{ marginTop: 22 }}><Lines lines={['This page', <em className="grad">isn't on air.</em>]} /></h1>
          <p className="lede">The link may be old or mistyped. Head back home, or pick a service below.</p>
          <div className="ctas" style={{ marginTop: 30 }}><Link className="btn btn-m" to="/">Back to home <span className="arr">→</span></Link><Link className="btn" to="/contact/">Contact us</Link></div>
        </div>
      </section>
      <section className="sec tight"><div className="wrap"><div className="svc-grid">{SERVICES.map((s) => <SvcCard key={s.k} s={s} />)}</div></div></section>
    </main>
  );
}
