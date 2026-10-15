import { CLIENT_LOGOS } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, SecHead, CtaBand } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';
import { LogoWall } from '../components/Media.jsx';

// Copy from papersipcompany.com/clients/
export default function Clients() {
  useSeo('Clients · Papersip Company', "Brands that trust Papersip Company with their media budget, from regional retailers to national brands.");
  return (
    <>
      <main id="main">
        <section className="phero" data-acc="y">
          <FieldScene />
          <div className="wrap">
            <Crumbs trail={[['Clients']]} />
            <Eyebrow tag="Our clients">Since 2010</Eyebrow>
            <h1 style={{ marginTop: 22 }}><Lines lines={['Brands that trust us', <>with their <em className="grad">media budget.</em></>]} /></h1>
            <p className="lede">From regional retailers to national brands — here’s a sample of who we’ve planned and placed campaigns for.</p>
          </div>
        </section>

        <section className="sec tight alt">
          <div className="wrap">
            <SecHead slug="Our clients" title="Brands we’ve worked with." style={{ marginBottom: 28 }} />
            <LogoWall logos={CLIENT_LOGOS} />
          </div>
        </section>
      </main>
      <CtaBand title="Want your brand on this list next?" acc="y" ghost="" />
    </>
  );
}
