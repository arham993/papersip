import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVICES, FAQ, CONTACT } from '../data.js';
import { useSeo } from '../components/Seo.jsx';
import { Crumbs, Lines, Eyebrow, Slug, Faq } from '../components/ui.jsx';
import { FieldScene } from '../components/Scene3D.jsx';
import { MapFacade } from '../components/Media.jsx';

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  const copy = () => {
    const done = () => { setOk(true); setTimeout(() => setOk(false), 1500); };
    try { navigator.clipboard.writeText(text).then(done, done); } catch (e) { done(); }
  };
  return <button className={'copy-btn' + (ok ? ' ok' : '')} type="button" onClick={copy} aria-label={`Copy ${text}`}>{ok ? 'Copied' : 'Copy'}</button>;
}

const BUDGETS = ['Under ₹5 lakh', '₹5 – 25 lakh', '₹25 lakh – 1 crore', 'Above ₹1 crore', 'Not sure yet'];
const TIMES = ['This month', 'In the next 1–3 months', 'Later this year', 'Just exploring'];
const GOALS = ['Launch a new project or product', 'Build brand awareness', 'Drive enquiries and sales', 'Store or site visibility'];

function Brief() {
  const { search } = useLocation();
  const [sel, setSel] = useState(['tv', 'ooh']);
  const [f, setF] = useState({ name: '', co: '', phone: '', mkt: '', budget: BUDGETS[1], time: TIMES[1], goal: GOALS[0], notes: '' });
  const [copied, setCopied] = useState(false);
  const outRef = useRef(null);
  useEffect(() => { const k = new URLSearchParams(search).get('service'); if (k && SERVICES.some((s) => s.k === k)) setSel([k]); }, [search]);
  const set = (k) => (e) => setF((o) => ({ ...o, [k]: e.target.value }));
  const toggle = (k) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const text = useMemo(() => {
    const names = SERVICES.filter((s) => sel.includes(s.k)).map((s) => s.short);
    const ch = names.length ? (names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0]) : '[pick at least one channel]';
    const nm = f.name.trim() || '[your name]';
    return `Hi Papersip team,\n\nI'm ${nm} from ${f.co.trim() || '[your brand]'}. We'd like a quote for ${ch} in ${f.mkt.trim() || '[market or city]'}.\n\n`
      + `Goal: ${f.goal}\nBudget: ${f.budget}\nGo live: ${f.time}\n${f.phone.trim() ? `Phone: ${f.phone.trim()}\n` : ''}${f.notes.trim() ? `\n${f.notes.trim()}\n` : ''}\nThanks,\n${nm}`;
  }, [sel, f]);
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Quote request: ${f.co.trim() || 'new campaign'}`)}&body=${encodeURIComponent(text)}`;
  const wa = `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    const fail = () => { outRef.current?.focus(); outRef.current?.select(); };
    try { navigator.clipboard.writeText(text).then(done, fail); } catch (e) { fail(); }
  };

  return (
    <form className="brief rv" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="brief-top"><b>Build your brief</b><span className="mono">Takes a minute</span></div>
      <fieldset>
        <legend>Channels you're considering</legend>
        <div className="chips">
          {SERVICES.map((s) => (
            <label className="chip" htmlFor={`c-${s.k}`} data-acc={s.acc} key={s.k}>
              <input type="checkbox" id={`c-${s.k}`} checked={sel.includes(s.k)} onChange={() => toggle(s.k)} /><span>{s.short}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="fields">
        <label className="field" htmlFor="f-name"><span className="lbl">Your name</span><input id="f-name" autoComplete="name" placeholder="Aditi Sharma" value={f.name} onChange={set('name')} /></label>
        <label className="field" htmlFor="f-co"><span className="lbl">Company or brand</span><input id="f-co" autoComplete="organization" placeholder="Your brand" value={f.co} onChange={set('co')} /></label>
        <label className="field" htmlFor="f-phone"><span className="lbl">Phone</span><input id="f-phone" type="tel" autoComplete="tel" placeholder="+91" value={f.phone} onChange={set('phone')} /></label>
        <label className="field" htmlFor="f-mkt"><span className="lbl">Market or city</span><input id="f-mkt" placeholder="Delhi NCR" value={f.mkt} onChange={set('mkt')} /></label>
        <label className="field" htmlFor="f-budget"><span className="lbl">Budget range</span><select id="f-budget" value={f.budget} onChange={set('budget')}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></label>
        <label className="field" htmlFor="f-time"><span className="lbl">When to go live</span><select id="f-time" value={f.time} onChange={set('time')}>{TIMES.map((b) => <option key={b}>{b}</option>)}</select></label>
        <label className="field full" htmlFor="f-goal"><span className="lbl">Main goal</span><select id="f-goal" value={f.goal} onChange={set('goal')}>{GOALS.map((b) => <option key={b}>{b}</option>)}</select></label>
        <label className="field full" htmlFor="f-notes"><span className="lbl">Anything else</span><textarea id="f-notes" placeholder="Launch dates, sites you like, past campaigns…" value={f.notes} onChange={set('notes')} /></label>
        <label className="field full" htmlFor="f-out"><span className="lbl">Your brief, ready to send</span><textarea className="out" id="f-out" readOnly value={text} ref={outRef} /></label>
      </div>
      <div className="brief-actions">
        <a className="btn btn-m" href={mail}>Send by email <span className="arr">→</span></a>
        <a className="btn btn-wa" href={wa} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
        <button className="btn" type="button" onClick={copy}>{copied ? 'Copied to clipboard' : 'Copy brief'}</button>
        <p className="hint">Email opens your mail app with the brief filled in. WhatsApp opens a chat with {CONTACT.phone}.</p>
      </div>
    </form>
  );
}

export default function Contact() {
  useSeo('Contact · Papersip Company', `Get a quote from Papersip Company. Email ${CONTACT.email}, call ${CONTACT.phone}, or visit ${CONTACT.addressShort}.`);
  const q = encodeURIComponent(CONTACT.address);
  return (
    <main id="main">
      <section className="phero" data-acc="y">
        <FieldScene mode="plane" />
        <div className="wrap">
          <Crumbs trail={[['Contact']]} />
          <Eyebrow tag="Open">Mon – Sat · 9:30am – 6:30pm</Eyebrow>
          <h1 style={{ marginTop: 22 }}><Lines lines={['Get a quote', 'for your next', <em className="grad">campaign.</em>]} /></h1>
          <p className="lede">Tell us about your brand and your goal, and we'll come back with a plan.</p>
        </div>
      </section>

      <section className="sec tight alt" id="brief-sec">
        <div className="wrap contact">
          <div className="rv">
            <Slug>Reach us directly</Slug>
            <div className="reach" style={{ marginTop: 18 }}>
              <div><span className="k mono">Email</span><a className="v" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><CopyBtn text={CONTACT.email} /></div>
              <div><span className="k mono">Phone</span><a className="v" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a><CopyBtn text={CONTACT.phone} /></div>
              <div><span className="k mono">Studio</span><span className="v">{CONTACT.address}</span><CopyBtn text={CONTACT.address} /></div>
            </div>
            <div className="hours"><span><i />Monday – Saturday</span><span>9:30am – 6:30pm</span></div>
            <MapFacade query={CONTACT.address} />
            <p style={{ marginTop: 12 }}><a className="link-arr" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">Open in Google Maps <span>↗</span></a></p>
          </div>
          <Brief />
        </div>
      </section>

      <section className="sec">
        <div className="wrap why">
          <div className="copy rv"><Slug>Common questions</Slug><h2>Before you reach out.</h2><p>Quick answers to what most clients ask first. Anything else, just call.</p></div>
          <Faq items={FAQ} />
        </div>
      </section>
    </main>
  );
}
