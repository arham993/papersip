// Paper-craft 3D media set. Loaded on demand (dynamic import) after the page is visible.
// Every mount* returns an object with dispose() so React can clean up on route change.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, LineSegments, LineBasicMaterial, EdgesGeometry,
  MeshLambertMaterial, MeshBasicMaterial, CanvasTexture, BoxGeometry, PlaneGeometry, CylinderGeometry,
  SphereGeometry, TorusGeometry, TubeGeometry, ExtrudeGeometry, Shape, CatmullRomCurve3, Vector3, Vector2,
  Box3, HemisphereLight, DirectionalLight, DoubleSide, FrontSide, MathUtils, Raycaster, BufferGeometry, BufferAttribute,
} from 'three';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = typeof innerWidth !== 'undefined' && innerWidth < 760;
const FD = '"Big Shoulders Display","Arial Narrow",Impact,sans-serif';
const FM = '"IBM Plex Mono",Menlo,monospace';
export const KEYS = ['tv', 'radio', 'print', 'ooh', 'digital', 'signage', 'plan', 'strat'];

/* ---------- materials ---------- */
const mat = (c, o = {}) => new MeshLambertMaterial({ color: c, side: o.ds ? DoubleSide : FrontSide });
const MAT = {
  paper: mat(0xf7f6f1), paperDS: mat(0xf7f6f1, { ds: true }), shade: mat(0xd7dae1), ink: mat(0x1b1f35),
  m: mat(0xff1f8e), c: mat(0x00b8ff), y: mat(0xffd60a), v: mat(0x7b3cff),
  mDS: mat(0xff1f8e, { ds: true }), cDS: mat(0x00b8ff, { ds: true }), yDS: mat(0xffd60a, { ds: true }), vDS: mat(0x7b3cff, { ds: true }),
};
const EDGE = new LineBasicMaterial({ color: 0x151931, transparent: true, opacity: 0.5 });
function part(g, geo, m, p, r, noEdge) {
  const mesh = new Mesh(geo, m);
  if (p) mesh.position.set(p[0], p[1], p[2]);
  if (r) mesh.rotation.set(r[0], r[1], r[2]);
  g.add(mesh);
  if (!noEdge) mesh.add(new LineSegments(new EdgesGeometry(geo, 24), EDGE));
  return mesh;
}
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new CanvasTexture(c); t.anisotropy = 4; return t; }
const basic = (t) => new MeshBasicMaterial({ map: t });
function fitFont(x, weight, size, fam, text, max) { x.font = `${weight} ${size}px ${fam}`; const w = x.measureText(text).width; if (w > max) { size = Math.floor((size * max) / w); x.font = `${weight} ${size}px ${fam}`; } return size; }

/* ---------- textures ---------- */
let TEX = null;
function makeTextures() {
  if (TEX) return;
  TEX = {};
  TEX.bars = canvasTex(512, 384, (x, w, h) => {
    const bw = w / 7;
    ['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'].forEach((c, i) => { x.fillStyle = c; x.fillRect(i * bw, 0, bw + 1, h * 0.67); });
    ['#0000C0', '#131313', '#C000C0', '#131313', '#00C0C0', '#131313', '#C0C0C0'].forEach((c, i) => { x.fillStyle = c; x.fillRect(i * bw, h * 0.67, bw + 1, h * 0.08); });
    let sx = 0; [['#00214C', 1.25], ['#FFFFFF', 1.25], ['#32006A', 1.25], ['#131313', 2], ['#262626', 1]].forEach(([c, f]) => { x.fillStyle = c; const ww = (w * f) / 6.75; x.fillRect(sx, h * 0.75, ww + 1, h * 0.25); sx += ww; });
    x.fillStyle = 'rgba(0,0,0,.14)'; for (let y = 0; y < h; y += 3) x.fillRect(0, y, w, 1);
  });
  TEX.board = canvasTex(1024, 512, (x, w, h) => {
    x.fillStyle = '#FF1F8E'; x.fillRect(0, 0, w, h);
    x.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 14; i++) x.fillRect((i * w) / 14, 0, 2, h);
    const bs = Math.min(fitFont(x, '900', 190, FD, 'YOUR BRAND,', w - 110), fitFont(x, '900', 190, FD, '40 FT WIDE.', w - 110));
    x.font = `900 ${bs}px ${FD}`; x.textBaseline = 'alphabetic';
    x.fillStyle = '#fff'; x.fillText('YOUR BRAND,', 56, 220);
    x.fillStyle = '#FFD60A'; x.fillText('40 FT', 56, 410);
    x.fillStyle = '#fff'; x.fillText(' WIDE.', 56 + x.measureText('40 FT').width, 410);
    x.font = `500 26px ${FM}`; x.fillStyle = 'rgba(255,255,255,.85)'; x.fillText('PAPERSIP · OOH', 60, 470);
  });
  TEX.paper = canvasTex(512, 660, (x, w) => {
    x.fillStyle = '#F7F6F1'; x.fillRect(0, 0, w, 660); x.fillStyle = '#16192B';
    fitFont(x, '900', 58, FD, 'THE MORNING EDITION', w - 52); x.textAlign = 'center'; x.fillText('THE MORNING EDITION', w / 2, 74);
    x.fillRect(24, 92, w - 48, 4); x.fillRect(24, 100, w - 48, 1.5);
    x.font = `500 14px ${FM}`; x.textAlign = 'left'; x.fillText('VOL. XVI', 26, 124); x.textAlign = 'right'; x.fillText('DELHI NCR', w - 26, 124);
    x.fillRect(24, 134, w - 48, 1.5);
    x.textAlign = 'left'; fitFont(x, '900', 54, FD, 'FROM GROUND ZERO', w - 52); x.fillText('BRANDS BUILT', 26, 196); x.fillText('FROM GROUND ZERO', 26, 248);
    x.save(); x.beginPath(); x.rect(26, 272, 260, 200); x.clip(); x.fillStyle = '#fff'; x.fillRect(26, 272, 260, 200);
    for (let yy = 272; yy < 472; yy += 9) for (let xx = 26; xx < 286; xx += 9) { const rr = 1 + 3.2 * Math.abs(Math.sin(xx * 0.021 + yy * 0.013)); x.fillStyle = (xx + yy) % 18 < 9 ? '#FF1F8E' : '#00B8FF'; x.beginPath(); x.arc(xx, yy, rr, 0, 7); x.fill(); }
    x.restore(); x.strokeStyle = '#16192B'; x.lineWidth = 2; x.strokeRect(26, 272, 260, 200);
    x.fillStyle = 'rgba(22,25,43,.35)';
    for (let l = 0; l < 16; l++) x.fillRect(304, 276 + l * 12.4, l % 4 === 3 ? 120 : 180, 5);
    for (let c = 0; c < 3; c++) for (let l2 = 0; l2 < 11; l2++) x.fillRect(26 + c * 160, 494 + l2 * 14, l2 % 5 === 4 ? 90 : 140, 5);
  });
  TEX.phone = canvasTex(360, 720, (x, w, h) => {
    x.fillStyle = '#F4F5F8'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#11152A'; x.font = '600 22px sans-serif'; x.fillText('9:41', 28, 40);
    const card = (y, hh, ad) => {
      x.fillStyle = '#fff'; x.fillRect(18, y, w - 36, hh); x.strokeStyle = '#D8DCE4'; x.lineWidth = 2; x.strokeRect(18, y, w - 36, hh);
      x.fillStyle = ad ? '#FF1F8E' : '#CBD1DB'; x.fillRect(30, y + 48, w - 60, hh - 110);
      x.fillStyle = '#11152A'; x.beginPath(); x.arc(44, y + 26, 12, 0, 7); x.fill(); x.fillStyle = '#8A92A6'; x.fillRect(64, y + 18, 120, 8); x.fillRect(64, y + 30, 70, 6);
      if (ad) {
        x.fillStyle = '#8A92A6'; x.font = `500 14px ${FM}`; x.fillText('SPONSORED', w - 130, y + 30);
        x.fillStyle = '#00B8FF'; x.fillRect(30, y + hh - 50, w - 60, 34); x.fillStyle = '#fff'; x.font = '700 18px sans-serif'; x.fillText('Get a quote', w / 2 - 50, y + hh - 27);
        x.fillStyle = '#fff'; fitFont(x, '900', 64, FD, 'ON AIR.', w - 100); x.fillText('ON AIR.', 48, y + 140);
      } else { x.fillStyle = '#8A92A6'; x.fillRect(30, y + hh - 50, w - 120, 8); x.fillRect(30, y + hh - 34, w - 170, 8); }
    };
    card(66, 330, true); card(412, 280, false);
  });
  TEX.dial = canvasTex(256, 96, (x, w, h) => {
    x.fillStyle = '#FFD60A'; x.fillRect(0, 0, w, h); x.fillStyle = '#1B1F35';
    for (let i = 0; i <= 40; i++) { const xx = 12 + (i * (w - 24)) / 40; x.fillRect(xx, h - 30, 1.5, i % 5 === 0 ? 20 : 10); }
    x.font = `600 16px ${FM}`; ['88', '96', '104'].forEach((n, i) => x.fillText(n, 14 + i * 100, 26));
    x.fillStyle = '#FF1F8E'; x.fillRect(150, 6, 4, h - 10);
  });
}
const boxFront = (t) => { const face = new MeshLambertMaterial({ map: t }); return [MAT.paper, MAT.paper, MAT.paper, MAT.paper, face, MAT.paper]; };

/* ---------- models ---------- */
function buildTV() {
  const g = new Group();
  part(g, new BoxGeometry(2.1, 1.55, 1.3), MAT.y);
  part(g, new BoxGeometry(1.42, 1.16, 0.06), MAT.ink, [-0.28, 0, 0.66]);
  part(g, new PlaneGeometry(1.28, 1.02), basic(TEX.bars), [-0.28, 0, 0.695], null, true);
  part(g, new CylinderGeometry(0.11, 0.11, 0.08, 24), MAT.m, [0.72, 0.36, 0.68], [Math.PI / 2, 0, 0]);
  part(g, new CylinderGeometry(0.11, 0.11, 0.08, 24), MAT.c, [0.72, 0.04, 0.68], [Math.PI / 2, 0, 0]);
  for (let i = 0; i < 4; i++) part(g, new BoxGeometry(0.34, 0.035, 0.02), MAT.ink, [0.72, -0.26 - i * 0.1, 0.66]);
  [[-0.8, 0.4], [0.8, 0.4], [-0.8, -0.4], [0.8, -0.4]].forEach((p) => part(g, new CylinderGeometry(0.04, 0.03, 0.42, 8), MAT.shade, [p[0], -0.98, p[1]], [p[1] * 0.35, 0, -p[0] * 0.18]));
  part(g, new SphereGeometry(0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), MAT.shade, [0, 0.775, 0]);
  [-1, 1].forEach((s) => { part(g, new CylinderGeometry(0.018, 0.018, 1.2, 6), MAT.ink, [s * 0.3, 1.3, 0], [0, 0, -s * 0.5]); part(g, new SphereGeometry(0.07, 12, 8), MAT.m, [s * 0.59, 1.83, 0]); });
  return g;
}
function buildRadio() {
  const g = new Group();
  part(g, new BoxGeometry(2.5, 1.25, 0.62), MAT.c);
  [-0.78, 0.78].forEach((x, i) => {
    part(g, new CylinderGeometry(0.44, 0.44, 0.06, 32), MAT.ink, [x, -0.12, 0.32], [Math.PI / 2, 0, 0]);
    part(g, new CylinderGeometry(0.33, 0.26, 0.1, 32), MAT.paper, [x, -0.12, 0.35], [Math.PI / 2, 0, 0]);
    part(g, new CylinderGeometry(0.1, 0.1, 0.06, 20), i ? MAT.y : MAT.m, [x, -0.12, 0.42], [Math.PI / 2, 0, 0]);
  });
  const d = new Mesh(new BoxGeometry(0.62, 0.26, 0.05), [MAT.y, MAT.y, MAT.y, MAT.y, new MeshLambertMaterial({ map: TEX.dial }), MAT.y]);
  d.position.set(0, 0.3, 0.32); g.add(d); d.add(new LineSegments(new EdgesGeometry(d.geometry), EDGE));
  [[-0.9, MAT.m], [-0.62, MAT.v], [0.62, MAT.y], [0.9, MAT.m]].forEach((b) => part(g, new BoxGeometry(0.2, 0.08, 0.2), b[1], [b[0], 0.665, 0]));
  part(g, new TorusGeometry(0.72, 0.05, 8, 28, Math.PI), MAT.ink, [0, 0.62, 0]);
  part(g, new CylinderGeometry(0.016, 0.016, 1.3, 6), MAT.ink, [1.02, 1.18, -0.18], [0, 0, -0.42]);
  part(g, new SphereGeometry(0.045, 10, 8), MAT.m, [1.3, 1.78, -0.18]);
  return g;
}
function buildPrint() {
  const g = new Group();
  for (let i = 0; i < 3; i++) part(g, new BoxGeometry(1.6, 2.06, 0.025), MAT.paper, [i * 0.07, -i * 0.06, -i * 0.05], [0, 0, -0.06 + i * 0.06]);
  const top = new Mesh(new BoxGeometry(1.6, 2.06, 0.025), boxFront(TEX.paper)); top.position.set(-0.06, 0.05, 0.04); top.rotation.z = -0.1; g.add(top); top.add(new LineSegments(new EdgesGeometry(top.geometry), EDGE));
  const roll = new Group(); roll.position.set(0.9, -0.75, 0.45); roll.rotation.set(0.2, 0.3, 0.95); g.add(roll);
  part(roll, new CylinderGeometry(0.17, 0.17, 1.7, 20), MAT.paper);
  part(roll, new TorusGeometry(0.175, 0.03, 6, 24), MAT.m, [0, 0.2, 0], [Math.PI / 2, 0, 0]);
  part(roll, new TorusGeometry(0.175, 0.03, 6, 24), MAT.m, [0, -0.3, 0], [Math.PI / 2, 0, 0]);
  return g;
}
function buildOOH() {
  const g = new Group();
  part(g, new BoxGeometry(3, 1.52, 0.12), MAT.v, [0, 0.5, 0]);
  part(g, new PlaneGeometry(2.86, 1.4), basic(TEX.board), [0, 0.5, 0.062], null, true);
  part(g, new CylinderGeometry(0.11, 0.14, 1.9, 12), MAT.shade, [0, -1.2, -0.05]);
  part(g, new BoxGeometry(3, 0.04, 0.34), MAT.shade, [0, -0.3, 0.2]);
  for (let i = 0; i < 12; i++) part(g, new BoxGeometry(0.012, 0.22, 0.012), MAT.shade, [-1.45 + i * 0.264, -0.18, 0.36], null, true);
  [-1, 0, 1].forEach((x) => { part(g, new BoxGeometry(0.03, 0.03, 0.36), MAT.ink, [x, 1.3, 0.18]); part(g, new BoxGeometry(0.2, 0.08, 0.1), MAT.y, [x, 1.28, 0.38], [0.5, 0, 0]); });
  return g;
}
function buildDigital() {
  const g = new Group();
  part(g, new BoxGeometry(1.04, 2.06, 0.1), MAT.v);
  part(g, new PlaneGeometry(0.94, 1.92), basic(TEX.phone), [0, 0, 0.051], null, true);
  part(g, new CylinderGeometry(0.14, 0.14, 0.06, 24), MAT.m, [0.5, 1.02, 0.1], [Math.PI / 2, 0, 0]);
  const c1 = part(g, new BoxGeometry(0.9, 0.56, 0.03), MAT.paper, [1.05, 0.45, 0.35], [0, -0.4, 0.08]);
  part(c1, new BoxGeometry(0.3, 0.3, 0.02), MAT.c, [-0.22, 0, 0.02], null, true);
  part(c1, new BoxGeometry(0.34, 0.05, 0.02), MAT.shade, [0.16, 0.08, 0.02], null, true);
  part(c1, new BoxGeometry(0.24, 0.05, 0.02), MAT.shade, [0.11, -0.04, 0.02], null, true);
  const c2 = part(g, new BoxGeometry(0.7, 0.44, 0.03), MAT.paper, [-1, -0.45, 0.3], [0, 0.45, -0.1]);
  part(c2, new BoxGeometry(0.5, 0.12, 0.02), MAT.y, [0, 0.06, 0.02], null, true);
  part(c2, new BoxGeometry(0.36, 0.05, 0.02), MAT.shade, [-0.07, -0.1, 0.02], null, true);
  return g;
}
function arrowGeo(len) {
  const s = new Shape(), h = 0.34, t = 0.28;
  s.moveTo(0, -h / 2); s.lineTo(len - t, -h / 2); s.lineTo(len, 0); s.lineTo(len - t, h / 2); s.lineTo(0, h / 2); s.lineTo(0, -h / 2);
  const geo = new ExtrudeGeometry(s, { depth: 0.07, bevelEnabled: false }); geo.translate(0.07, 0, -0.035); return geo;
}
function buildSignage() {
  const g = new Group();
  part(g, new CylinderGeometry(0.065, 0.065, 3.1, 12), MAT.shade);
  part(g, new CylinderGeometry(0.38, 0.44, 0.12, 24), MAT.v, [0, -1.55, 0]);
  part(g, new SphereGeometry(0.1, 14, 10), MAT.m, [0, 1.6, 0]);
  [[1.1, MAT.c, 0, 1.35], [0.62, MAT.m, Math.PI + 0.35, 1.15], [0.14, MAT.y, -0.55, 1.3]].forEach((a) => { const sg = new Group(); sg.position.y = a[0]; sg.rotation.y = a[2]; g.add(sg); part(sg, arrowGeo(a[3]), a[1]); });
  part(g, new BoxGeometry(0.9, 0.6, 0.04), MAT.paper, [0, -0.55, 0.08]);
  part(g, new BoxGeometry(0.5, 0.07, 0.01), MAT.ink, [0, -0.42, 0.105], null, true);
  part(g, new BoxGeometry(0.66, 0.05, 0.01), MAT.shade, [0, -0.58, 0.105], null, true);
  part(g, new BoxGeometry(0.4, 0.05, 0.01), MAT.shade, [0, -0.7, 0.105], null, true);
  return g;
}
function buildPlan() {
  const g = new Group();
  part(g, new BoxGeometry(2.5, 0.1, 1.5), MAT.shade, [0, -0.05, 0]);
  for (let i = 0; i < 6; i++) part(g, new BoxGeometry(2.3, 0.005, 0.01), MAT.ink, [0, 0.005, -0.6 + i * 0.24], null, true);
  const pts = [];
  [0.55, 0.85, 0.7, 1.2, 1.05, 1.7].forEach((h, i) => { const x = -1 + i * 0.4; part(g, new BoxGeometry(0.26, h, 0.26), [MAT.y, MAT.c, MAT.v, MAT.y, MAT.c, MAT.m][i], [x, h / 2, 0]); pts.push(new Vector3(x, h + 0.22, 0)); });
  part(g, new TubeGeometry(new CatmullRomCurve3(pts), 60, 0.028, 8, false), MAT.c, null, null, true);
  pts.forEach((p) => part(g, new SphereGeometry(0.06, 12, 8), MAT.y, [p.x, p.y, p.z], null, true));
  return g;
}
function buildStrat() {
  const g = new Group();
  [[1.05, MAT.c], [0.84, MAT.paper], [0.63, MAT.m], [0.42, MAT.paper], [0.2, MAT.y]].forEach((r, i) => part(g, new CylinderGeometry(r[0], r[0], 0.1, 48), r[1], [0, 0, i * 0.012], [Math.PI / 2, 0, 0]));
  [-1, 1].forEach((s) => part(g, new CylinderGeometry(0.045, 0.045, 2.2, 8), MAT.shade, [s * 0.55, -0.55, -0.35], [0.3, 0, s * 0.2]));
  const ar = new Group(); ar.position.set(0.04, 0.05, 0.1); ar.rotation.set(-0.55, 0.6, 0); g.add(ar);
  part(ar, new CylinderGeometry(0.03, 0.03, 1.5, 8), MAT.ink, [0, 0, 0.75], [Math.PI / 2, 0, 0]);
  part(ar, new BoxGeometry(0.02, 0.24, 0.34), MAT.v, [0, 0.1, 1.38]);
  part(ar, new BoxGeometry(0.24, 0.02, 0.34), MAT.v, [0.1, 0, 1.38]);
  return g;
}
const BUILD = { tv: buildTV, radio: buildRadio, print: buildPrint, ooh: buildOOH, digital: buildDigital, signage: buildSignage, plan: buildPlan, strat: buildStrat };
function fit(inner, size) {
  const box = new Box3().setFromObject(inner), c = box.getCenter(new Vector3()), s = box.getSize(new Vector3());
  inner.position.sub(c); const k = size / Math.max(s.x, s.y, s.z);
  const sc = new Group(); sc.scale.setScalar(k); sc.add(inner);
  const o = new Group(); o.add(sc); o.userData.h = s.y * k; return o;
}
const modelSize = (k, base) => (k === 'ooh' ? base * 1.17 : k === 'signage' ? base * 1.07 : base);

/* ---------- plumbing ---------- */
function lights(scene) {
  scene.add(new HemisphereLight(0xffffff, 0x7d86a3, 0.95));
  const d = new DirectionalLight(0xffffff, 0.85); d.position.set(4, 6, 6); scene.add(d);
  const f = new DirectionalLight(0xbfe6ff, 0.28); f.position.set(-6, 1, 3); scene.add(f);
}
function makeRenderer(canvas, opts = {}) {
  try {
    const r = new WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance', ...opts });
    r.setClearColor(0x000000, 0);
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    return r;
  } catch (e) { return null; }
}
function spring(o, target, dt) { o.v += (target - o.s) * 140 * dt; o.v *= Math.exp(-15 * dt); o.s += o.v * dt; }
function sizeTo(r, cam, canvas) { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return false; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); return true; }

const pointer = { x: 0, y: 0 };
if (typeof window !== 'undefined') addEventListener('pointermove', (e) => { pointer.x = (e.clientX / innerWidth) * 2 - 1; pointer.y = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });

// One animation loop per scene; pauses off-screen and in background tabs.
function runtime(canvas, renderer, frame, layout) {
  let raf = 0, on = false, last = performance.now(), dead = false;
  const tick = (now) => {
    raf = 0; if (dead) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const keep = frame(dt);
    if (on && !document.hidden && keep !== false) kick();
  };
  const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(tick); };
  const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) { last = performance.now(); kick(); } });
  io.observe(canvas);
  const ro = new ResizeObserver(() => { layout(); kick(); }); ro.observe(canvas);
  const vis = () => { if (!document.hidden) { last = performance.now(); kick(); } };
  document.addEventListener('visibilitychange', vis);
  layout();
  return {
    kick,
    isOn: () => on,
    dispose(scene) {
      dead = true; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', vis);
      if (scene) scene.traverse((o) => { if (o.geometry && o.geometry.dispose) o.geometry.dispose(); });
      renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* noop */ }
    },
  };
}
function dragSpin(canvas, st, kick) {
  let dragging = false, lx = 0;
  const down = (e) => { dragging = true; st.drag = true; st.moved = 0; lx = e.clientX; try { canvas.setPointerCapture(e.pointerId); } catch (_) { /* noop */ } kick(); };
  const move = (e) => { if (!dragging) return; const dx = e.clientX - lx; lx = e.clientX; st.a += dx * 0.012; st.v = dx * 0.6; st.moved += Math.abs(dx); kick(); };
  const up = () => { dragging = false; st.drag = false; };
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  return () => { canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); };
}
function sheetField(scene, cam, n, spread = 5) {
  const geo = new PlaneGeometry(0.42, 0.56), list = [], mats = [MAT.paperDS, MAT.mDS, MAT.paperDS, MAT.cDS, MAT.yDS, MAT.vDS];
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const m = new Mesh(geo, mats[i % 6]); m.add(new LineSegments(new EdgesGeometry(geo), EDGE)); scene.add(m);
    list.push({ m, x: rnd(), y: rnd(), z: -1 - rnd() * spread, sp: 0.12 + rnd() * 0.2, rx: rnd() * 6, ry: rnd() * 6, vr: (rnd() - 0.5) * 1.2, s: 0.8 + rnd() * 0.7 });
  }
  return (dt, lift = 0) => {
    list.forEach((s) => {
      if (!reduce) { s.y -= s.sp * dt * 0.08; if (s.y < -0.1) { s.y = 1.1; s.x = rnd(); } s.rx += s.vr * dt; s.ry += s.vr * 0.7 * dt; }
      const d = cam.position.z - s.z, hh = Math.tan(MathUtils.degToRad(cam.fov / 2)) * d, ww = hh * cam.aspect;
      s.m.position.set((s.x * 2 - 1) * ww, (s.y * 2 - 1) * hh + lift, s.z); s.m.rotation.set(s.rx, s.ry, 0); s.m.scale.setScalar(s.s);
    });
  };
}
function turntable(parent, FLOOR, ringMat = MAT.m) {
  part(parent, new CylinderGeometry(2.1, 2.1, 0.14, 64), MAT.paper, [0, FLOOR - 0.07, 0]);
  part(parent, new CylinderGeometry(2.16, 2.16, 0.06, 64), ringMat, [0, FLOOR - 0.17, 0]);
  for (let k = 0; k < 48; k++) { const a = (k / 48) * Math.PI * 2, len = k % 6 === 0 ? 0.22 : 0.1; part(parent, new BoxGeometry(0.012, 0.004, len), k % 12 === 0 ? MAT.m : MAT.ink, [Math.sin(a) * (2.1 - len / 2 - 0.04), FLOOR + 0.003, Math.cos(a) * (2.1 - len / 2 - 0.04)], [0, a, 0], true); }
}
const ready = () => { makeTextures(); };

/* =================== HERO (home) =================== */
export function mountHero(canvas) {
  ready();
  const r = makeRenderer(canvas); if (!r) return null;
  const host = canvas.parentElement;
  const scene = new Scene(), cam = new PerspectiveCamera(34, 1, 0.1, 100); cam.position.set(0, 0, 12); lights(scene);
  const root = new Group(); scene.add(root);
  const L = { tv: [-0.28, 0.42, 0.4, 1.05], ooh: [0.46, 0.7, -0.9, 1.35], radio: [0.62, 0.02, 0.3, 1], print: [-0.62, -0.38, 0.2, 0.95], digital: [0.06, -0.6, 0.7, 0.95], signage: [0.95, -0.72, -1.4, 1.05], plan: [-0.5, 0.98, -1.6, 0.95], strat: [1.02, 0.52, -2.6, 1.05] };
  // models are built one per frame so start-up never freezes the page
  const items = KEYS.map((k, i) => ({ k, o: null, n: L[k], s: 0, v: 0, delay: 0, ph: i * 1.7, home: new Vector3(), size: 1, spin: 0 }));
  let built = 0, t = 0;
  const buildNext = () => { if (built >= items.length) return; const it = items[built++]; it.o = fit(BUILD[it.k](), 1); it.o.scale.setScalar(0.0001); it.delay = t + 0.05; root.add(it.o); };
  const sheets = sheetField(scene, cam, small ? 8 : 14);
  const layout = () => {
    if (!sizeTo(r, cam, canvas)) return;
    const halfH = Math.tan(MathUtils.degToRad(cam.fov / 2)) * cam.position.z, halfW = halfH * cam.aspect, wide = cam.aspect > 1.15;
    const cx = wide ? halfW * 0.5 : 0, cy = wide ? 0.15 : 0, rw = wide ? halfW * 0.42 : halfW * 0.78, rh = wide ? halfH * 0.74 : halfH * 0.72, unit = Math.min(rw * 1.15, rh);
    items.forEach((it) => { it.home.set(cx + it.n[0] * rw, cy + it.n[1] * rh, it.n[2] * unit * 0.9); it.size = unit * (wide ? 0.5 : 0.56) * it.n[3]; });
  };
  const click = () => items.forEach((it, i) => { it.spin += 2.2 + i * 0.1; });
  canvas.addEventListener('pointerdown', click);
  let rx = 0, ry = 0;
  const rt = runtime(canvas, r, (dt) => {
    t += dt; buildNext();
    const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, host.offsetHeight)));
    rx += ((reduce ? 0 : pointer.y * 0.12) - rx) * 0.05; ry += ((reduce ? 0 : pointer.x * 0.22) - ry) * 0.05;
    root.rotation.set(rx + p * 0.25, ry + p * 0.7, 0); root.position.y = p * 2.2;
    items.forEach((it) => {
      if (!it.o) return;
      if (reduce) it.s = 1; else spring(it, t > it.delay ? 1 : 0, dt);
      it.spin *= Math.exp(-2.4 * dt);
      const bob = reduce ? 0 : Math.sin(t * 0.8 + it.ph) * 0.09;
      it.o.position.set(it.home.x, it.home.y + bob, it.home.z);
      it.o.scale.setScalar(Math.max(0.0001, it.size * it.s));
      it.o.rotation.set(-0.08 + (reduce ? 0 : Math.sin(t * 0.4 + it.ph) * 0.06), -0.42 + (reduce ? 0 : Math.sin(t * 0.5 + it.ph) * 0.28) + (1 - Math.min(1, it.s)) * -2.4 + it.spin, reduce ? 0 : Math.sin(t * 0.35 + it.ph) * 0.04);
    });
    sheets(dt, p * 1.5);
    cam.position.x = reduce ? 0 : pointer.x * 0.35; cam.lookAt(0, 0, 0);
    r.render(scene, cam);
    return !reduce || built < items.length;
  }, layout);
  const onScroll = () => { if (reduce) rt.kick(); };
  addEventListener('scroll', onScroll, { passive: true });
  return { dispose() { canvas.removeEventListener('pointerdown', click); removeEventListener('scroll', onScroll); rt.dispose(scene); } };
}

/* =================== STAGE (home channels) =================== */
export function mountStage(canvas, initial = 0) {
  ready();
  const r = makeRenderer(canvas); if (!r) return null;
  const scene = new Scene(), cam = new PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 1.1, 10.5); lights(scene);
  const turn = new Group(); scene.add(turn); const FLOOR = -1.7; turntable(turn, FLOOR);
  const items = KEYS.map((k, i) => ({ k, o: null, s: i === initial ? 1 : 0, v: 0, spin: 0 }));
  const ensure = (it) => { if (!it.o) { it.o = fit(BUILD[it.k](), modelSize(it.k, 2.9)); it.o.position.y = FLOOR + it.o.userData.h / 2 + 0.02; turn.add(it.o); } return it.o; };
  ensure(items[initial]);
  const st = { a: 0, v: reduce ? 0 : 0.25, drag: false, moved: 0 };
  let active = initial;
  const layout = () => { if (!sizeTo(r, cam, canvas)) return; cam.position.z = cam.aspect < 1.1 ? 12.5 : 10.5; cam.updateProjectionMatrix(); };
  const rt = runtime(canvas, r, (dt) => {
    let busy = false;
    if (!st.drag) { st.v += ((reduce ? 0 : 0.25) - st.v) * Math.min(1, dt * 1.5); st.a += st.v * dt; }
    turn.rotation.y = st.a;
    items.forEach((it, j) => {
      if (!it.o) return;
      const tgt = j === active ? 1 : 0;
      if (reduce) { it.s = tgt; it.v = 0; } else spring(it, tgt, dt);
      it.spin *= Math.exp(-3.2 * dt);
      if (Math.abs(it.s - tgt) > 0.001 || Math.abs(it.v) > 0.001 || Math.abs(it.spin) > 0.001) busy = true;
      it.o.visible = it.s > 0.002 || j === active;
      it.o.scale.setScalar(Math.max(0.0001, it.s));
      it.o.rotation.y = it.spin + (1 - Math.min(1, Math.max(0, it.s))) * (j === active ? -1 : 1.4);
    });
    cam.position.x += ((rt.isOn() && !reduce ? pointer.x * 0.4 : 0) - cam.position.x) * 0.05; cam.lookAt(0, -0.7, 0);
    r.render(scene, cam);
    return !reduce || busy || st.drag;
  }, layout);
  const undrag = dragSpin(canvas, st, rt.kick);
  return {
    setActive(i) { if (i === active) return; active = i; ensure(items[i]).visible = true; items[i].spin = reduce ? 0 : -2.2; rt.kick(); },
    dispose() { undrag(); rt.dispose(scene); },
  };
}

/* =================== SOLO (service hero) =================== */
export function mountSolo(canvas, key) {
  ready();
  const r = makeRenderer(canvas); if (!r || !BUILD[key]) return null;
  const scene = new Scene(), cam = new PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 1.3, 10.5); lights(scene);
  const turn = new Group(); scene.add(turn); const FLOOR = -1.75; turntable(turn, FLOOR, MAT.ink);
  const o = fit(BUILD[key](), modelSize(key, 3)); o.position.y = FLOOR + o.userData.h / 2 + 0.02; turn.add(o);
  const st = { a: -0.5, v: reduce ? 0 : 0.3, drag: false, moved: 0 }, it = { s: reduce ? 1 : 0, v: 0 };
  let t = 0;
  const layout = () => { if (!sizeTo(r, cam, canvas)) return; cam.position.z = cam.aspect < 1 ? 12.6 : 10.8; cam.updateProjectionMatrix(); };
  const rt = runtime(canvas, r, (dt) => {
    t += dt;
    if (!st.drag) { st.v += ((reduce ? 0 : 0.3) - st.v) * Math.min(1, dt * 1.5); st.a += st.v * dt; }
    turn.rotation.y = st.a;
    if (!reduce) spring(it, t > 0.05 ? 1 : 0, dt);
    o.scale.setScalar(Math.max(0.0001, it.s)); o.rotation.y = (1 - Math.min(1, it.s)) * -2;
    o.position.y = FLOOR + o.userData.h / 2 + 0.02 + (reduce ? 0 : Math.sin(t * 1.2) * 0.05 + 0.05);
    const on = rt.isOn() && !reduce;
    cam.position.x += ((on ? pointer.x * 0.5 : 0) - cam.position.x) * 0.05;
    cam.position.y += ((on ? 1.3 - pointer.y * 0.4 : 1.3) - cam.position.y) * 0.05;
    cam.lookAt(0, -0.6, 0);
    r.render(scene, cam);
    return !reduce || st.drag;
  }, layout);
  const undrag = dragSpin(canvas, st, rt.kick);
  return { dispose() { undrag(); rt.dispose(scene); } };
}

/* =================== RING (services page) =================== */
export function mountRing(canvas, { onFront, onPick } = {}) {
  ready();
  const r = makeRenderer(canvas); if (!r) return null;
  const scene = new Scene(), cam = new PerspectiveCamera(32, 1, 0.1, 100); cam.position.set(0, 2.2, 12.5); lights(scene);
  const wheel = new Group(); scene.add(wheel);
  const R = 3.1;
  const items = KEYS.map((k, i) => ({ k, o: null, a: (i / KEYS.length) * Math.PI * 2 }));
  let built = 0;
  const buildNext = () => { if (built >= items.length) return; const it = items[built]; it.o = fit(BUILD[it.k](), modelSize(it.k, 1.8)); it.o.position.set(Math.sin(it.a) * R, 0, Math.cos(it.a) * R); it.o.userData.idx = built; wheel.add(it.o); built++; };
  part(wheel, new TorusGeometry(R, 0.025, 6, 96), MAT.ink, [0, -1.2, 0], [Math.PI / 2, 0, 0], true);
  const st = { a: 0, v: reduce ? 0 : -0.22, drag: false, moved: 0 };
  let front = -1, t = 0;
  const ray = new Raycaster(), ptr = new Vector2();
  const click = (e) => {
    if (st.moved > 6) return;
    const b = canvas.getBoundingClientRect(); ptr.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
    ray.setFromCamera(ptr, cam); const hit = ray.intersectObjects(wheel.children, true)[0];
    if (hit) { let p = hit.object; while (p && p.userData.idx === undefined) p = p.parent; if (p && onPick) onPick(p.userData.idx); }
  };
  canvas.addEventListener('click', click);
  const layout = () => { if (!sizeTo(r, cam, canvas)) return; cam.position.z = cam.aspect < 1.25 ? (cam.aspect < 0.9 ? 17.5 : 15.5) : 12.5; cam.updateProjectionMatrix(); };
  const rt = runtime(canvas, r, (dt) => {
    t += dt; buildNext();
    if (!st.drag) { st.v += ((reduce ? 0 : -0.22) - st.v) * Math.min(1, dt * 1.5); st.a += st.v * dt; }
    wheel.rotation.y = st.a;
    let best = -1, bz = -1e9;
    items.forEach((it, i) => {
      if (!it.o) return;
      const z = Math.cos(it.a + st.a); if (z > bz) { bz = z; best = i; }
      it.o.rotation.y = -st.a + (reduce ? 0 : Math.sin(t + i) * 0.15);
      it.o.scale.setScalar(0.72 + 0.4 * Math.max(0, z));
      it.o.position.y = (reduce ? 0 : Math.sin(t * 1.1 + i * 0.8) * 0.12) + (z > 0.92 ? 0.25 : 0);
    });
    if (best !== front) { front = best; if (onFront) onFront(best); }
    cam.position.x += ((rt.isOn() && !reduce ? pointer.x * 0.6 : 0) - cam.position.x) * 0.05; cam.lookAt(0, 0.1, 0);
    r.render(scene, cam);
    return !reduce || st.drag || built < items.length;
  }, layout);
  const undrag = dragSpin(canvas, st, rt.kick);
  return { dispose() { canvas.removeEventListener('click', click); undrag(); rt.dispose(scene); } };
}

/* =================== SHEETS / PLANE (page heroes) =================== */
function planeGeo() {
  const v = new Float32Array([0, 0, 1.1, -0.75, 0, -0.6, 0, 0, -0.45, 0, 0, 1.1, 0, 0, -0.45, 0.75, 0, -0.6, 0, 0, 1.1, 0, 0, -0.45, 0, -0.28, -0.5]);
  const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(v, 3)); g.computeVertexNormals(); return g;
}
export function mountField(canvas, mode = 'sheets') {
  ready();
  const r = makeRenderer(canvas); if (!r) return null;
  const host = canvas.parentElement;
  const scene = new Scene(), cam = new PerspectiveCamera(34, 1, 0.1, 100); cam.position.set(0, 0, 12); lights(scene);
  const sheets = sheetField(scene, cam, (mode === 'plane' ? 10 : 16) - (small ? 6 : 0), 6);
  let plane = null; const trail = [], hist = [];
  if (mode === 'plane') {
    plane = new Group(); const pg = planeGeo(); const pm = new Mesh(pg, MAT.mDS); pm.add(new LineSegments(new EdgesGeometry(pg), EDGE)); plane.add(pm); plane.scale.setScalar(0.8); scene.add(plane);
    const tg = new SphereGeometry(0.05, 8, 6); for (let i = 0; i < 26; i++) { const d = new Mesh(tg, [MAT.m, MAT.c, MAT.y, MAT.v][i % 4]); scene.add(d); trail.push(d); }
  }
  let t = 0;
  const layout = () => { sizeTo(r, cam, canvas); };
  const rt = runtime(canvas, r, (dt) => {
    t += dt;
    const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, host.offsetHeight)));
    sheets(dt, p * 2);
    if (plane) {
      const halfH = Math.tan(MathUtils.degToRad(cam.fov / 2)) * cam.position.z, halfW = halfH * cam.aspect, wide = cam.aspect > 1.1;
      const cx = wide ? halfW * 0.62 : halfW * 0.5, ax = wide ? halfW * 0.24 : halfW * 0.32, ay = wide ? halfH * 0.42 : halfH * 0.25, oy = wide ? 0.2 : halfH * 0.68;
      const tt = reduce ? 1.2 : t * 0.55;
      const at = (q) => new Vector3(cx + Math.sin(q) * ax, Math.sin(q * 2) * ay * 0.6 + oy, Math.cos(q) * 0.9);
      const pos = at(tt);
      plane.position.copy(pos); plane.lookAt(at(tt + 0.05)); plane.rotateZ(-Math.cos(tt) * 0.6);
      hist.unshift(pos); if (hist.length > trail.length * 3) hist.pop();
      trail.forEach((d, i) => { const h = hist[Math.min(hist.length - 1, i * 3)]; if (h) { d.position.copy(h); d.scale.setScalar(1 - i / trail.length); d.visible = !reduce; } });
    }
    cam.position.x = reduce ? 0 : pointer.x * 0.4; cam.position.y = reduce ? 0 : -pointer.y * 0.25; cam.lookAt(0, 0, 0);
    r.render(scene, cam);
    return !reduce;
  }, layout);
  return { dispose() { rt.dispose(scene); } };
}

/* =================== STILLS (used by the build to make card images) =================== */
export function renderStills(W = 1040, H = 860) {
  ready();
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const r = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
  r.setClearColor(0, 0); r.setPixelRatio(1); r.setSize(W, H, false);
  const scene = new Scene(), cam = new PerspectiveCamera(30, W / H, 0.1, 100); cam.position.set(0, 1.6, 10); cam.lookAt(0, -0.15, 0); lights(scene);
  const out = {};
  KEYS.forEach((k) => { const o = fit(BUILD[k](), modelSize(k, 2.9)); o.rotation.set(0.05, -0.55, 0); scene.add(o); r.render(scene, cam); out[k] = cv.toDataURL('image/png'); scene.remove(o); });
  r.dispose();
  return out;
}
