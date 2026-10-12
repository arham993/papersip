/* =========================================================
   Papersip Company — paper-craft 3D media set (Three.js r128)
   Mounts automatically on:
     #hero3d                    home hero, all eight models floating
     #stage3d                   home channel turntable (.ch[data-i] rows)
     canvas[data-model="tv"]    single model on a turntable (service pages)
     canvas[data-mode="ring"]   carousel of all eight (services page)
     canvas[data-mode="sheets"] drifting paper sheets (page heroes)
     canvas[data-mode="plane"]  paper plane + sheets (contact)
     img[data-thumb="tv"]       rendered still of a model (cards)
   ========================================================= */
(function(){
"use strict";
if(!window.THREE){ document.documentElement.classList.add('no3d'); return; }
var T=THREE;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var FD='"Big Shoulders Display","Arial Narrow",Impact,sans-serif';
var FM='"IBM Plex Mono",Menlo,monospace';
var ROOT=(document.documentElement.getAttribute('data-root')||'./');

var KEYS=['tv','radio','print','ooh','digital','signage','plan','strat'];
var SLUG={tv:'tv-advertising',radio:'radio-advertising',print:'print-advertising',ooh:'ooh-advertising',digital:'digital-advertising',signage:'visibility-signage',plan:'media-buying-planning',strat:'strategy'};
var NAME={tv:'TV Advertising',radio:'Radio Advertising',print:'Print Advertising',ooh:'OOH Advertising',digital:'Digital Advertising',signage:'Visibility Signage',plan:'Media Buying & Planning',strat:'Strategy'};

/* ---------- materials ---------- */
function mat(c,o){ o=o||{}; return new T.MeshStandardMaterial({color:c,roughness:o.r!=null?o.r:.85,metalness:0,flatShading:true,side:o.ds?T.DoubleSide:T.FrontSide}); }
var MAT={
  paper:mat(0xF7F6F1), paperDS:mat(0xF7F6F1,{ds:true}), shade:mat(0xD7DAE1), ink:mat(0x1B1F35,{r:.6}),
  m:mat(0xFF1F8E), c:mat(0x00B8FF), y:mat(0xFFD60A), v:mat(0x7B3CFF),
  mDS:mat(0xFF1F8E,{ds:true}), cDS:mat(0x00B8FF,{ds:true}), yDS:mat(0xFFD60A,{ds:true}), vDS:mat(0x7B3CFF,{ds:true})
};
var EDGE=new T.LineBasicMaterial({color:0x151931,transparent:true,opacity:.5});
function part(g,geo,m,p,r,noEdge){
  var mesh=new T.Mesh(geo,m); if(p) mesh.position.set(p[0],p[1],p[2]); if(r) mesh.rotation.set(r[0],r[1],r[2]);
  g.add(mesh); if(!noEdge) mesh.add(new T.LineSegments(new T.EdgesGeometry(geo,24),EDGE));
  return mesh;
}
function canvasTex(w,h,draw){ var c=document.createElement('canvas'); c.width=w; c.height=h; var x=c.getContext('2d'); draw(x,w,h); var t=new T.CanvasTexture(c); t.anisotropy=4; return t; }
function basic(t){ return new T.MeshBasicMaterial({map:t}); }
function fitFont(x,weight,size,fam,text,max){ x.font=weight+' '+size+'px '+fam; var w=x.measureText(text).width; if(w>max){ size=Math.floor(size*max/w); x.font=weight+' '+size+'px '+fam; } return size; }

/* ---------- textures ---------- */
var TEX=null;
function makeTextures(){
  if(TEX) return; TEX={};
  TEX.bars=canvasTex(512,384,function(x,w,h){
    var top=['#C0C0C0','#C0C000','#00C0C0','#00C000','#C000C0','#C00000','#0000C0'],bw=w/7;
    top.forEach(function(c,i){ x.fillStyle=c; x.fillRect(i*bw,0,bw+1,h*.67); });
    var mid=['#0000C0','#131313','#C000C0','#131313','#00C0C0','#131313','#C0C0C0'];
    mid.forEach(function(c,i){ x.fillStyle=c; x.fillRect(i*bw,h*.67,bw+1,h*.08); });
    var low=[['#00214C',1.25],['#FFFFFF',1.25],['#32006A',1.25],['#131313',2],['#262626',1]],sx=0,tot=6.75;
    low.forEach(function(l){ x.fillStyle=l[0]; var ww=w*l[1]/tot; x.fillRect(sx,h*.75,ww+1,h*.25); sx+=ww; });
    x.fillStyle='rgba(0,0,0,.14)'; for(var y=0;y<h;y+=3) x.fillRect(0,y,w,1);
  });
  TEX.board=canvasTex(1024,512,function(x,w,h){
    x.fillStyle='#FF1F8E'; x.fillRect(0,0,w,h);
    x.fillStyle='rgba(255,255,255,.08)'; for(var i=0;i<14;i++) x.fillRect(i*w/14,0,2,h);
    var bs=Math.min(fitFont(x,'900',190,FD,'YOUR BRAND,',w-110),fitFont(x,'900',190,FD,'40 FT WIDE.',w-110));
    x.font='900 '+bs+'px '+FD; x.textBaseline='alphabetic';
    x.fillStyle='#fff'; x.fillText('YOUR BRAND,',56,220);
    x.fillStyle='#FFD60A'; x.fillText('40 FT',56,410);
    x.fillStyle='#fff'; x.fillText(' WIDE.',56+x.measureText('40 FT').width,410);
    x.font='500 26px '+FM; x.fillStyle='rgba(255,255,255,.85)'; x.fillText('PAPERSIP · OOH',60,470);
  });
  TEX.paper=canvasTex(512,660,function(x,w,h){
    x.fillStyle='#F7F6F1'; x.fillRect(0,0,w,h); x.fillStyle='#16192B';
    fitFont(x,'900',58,FD,'THE MORNING EDITION',w-52); x.textAlign='center'; x.fillText('THE MORNING EDITION',w/2,74);
    x.fillRect(24,92,w-48,4); x.fillRect(24,100,w-48,1.5);
    x.font='500 14px '+FM; x.textAlign='left'; x.fillText('VOL. XVI',26,124); x.textAlign='right'; x.fillText('DELHI NCR',w-26,124);
    x.fillRect(24,134,w-48,1.5);
    x.textAlign='left'; fitFont(x,'900',54,FD,'FROM GROUND ZERO',w-52); x.fillText('BRANDS BUILT',26,196); x.fillText('FROM GROUND ZERO',26,248);
    x.save(); x.beginPath(); x.rect(26,272,260,200); x.clip(); x.fillStyle='#fff'; x.fillRect(26,272,260,200);
    for(var yy=272;yy<472;yy+=9) for(var xx=26;xx<286;xx+=9){ var rr=1+3.2*Math.abs(Math.sin(xx*.021+yy*.013)); x.fillStyle=((xx+yy)%18<9)?'#FF1F8E':'#00B8FF'; x.beginPath(); x.arc(xx,yy,rr,0,7); x.fill(); }
    x.restore(); x.strokeStyle='#16192B'; x.lineWidth=2; x.strokeRect(26,272,260,200);
    x.fillStyle='rgba(22,25,43,.35)';
    for(var l=0;l<16;l++) x.fillRect(304,276+l*12.4,(l%4===3?120:180),5);
    for(var c=0;c<3;c++) for(var l2=0;l2<11;l2++) x.fillRect(26+c*160,494+l2*14,(l2%5===4?90:140),5);
  });
  TEX.phone=canvasTex(360,720,function(x,w,h){
    x.fillStyle='#F4F5F8'; x.fillRect(0,0,w,h);
    x.fillStyle='#11152A'; x.font='600 22px sans-serif'; x.fillText('9:41',28,40);
    function card(y,hh,ad){
      x.fillStyle='#fff'; x.fillRect(18,y,w-36,hh); x.strokeStyle='#D8DCE4'; x.lineWidth=2; x.strokeRect(18,y,w-36,hh);
      x.fillStyle=ad?'#FF1F8E':'#CBD1DB'; x.fillRect(30,y+48,w-60,hh-110);
      x.fillStyle='#11152A'; x.beginPath(); x.arc(44,y+26,12,0,7); x.fill(); x.fillStyle='#8A92A6'; x.fillRect(64,y+18,120,8); x.fillRect(64,y+30,70,6);
      if(ad){ x.fillStyle='#8A92A6'; x.font='500 14px '+FM; x.fillText('SPONSORED',w-130,y+30);
        x.fillStyle='#00B8FF'; x.fillRect(30,y+hh-50,w-60,34); x.fillStyle='#fff'; x.font='700 18px sans-serif'; x.fillText('Get a quote',w/2-50,y+hh-27);
        x.fillStyle='#fff'; fitFont(x,'900',64,FD,'ON AIR.',w-100); x.fillText('ON AIR.',48,y+140); }
      else { x.fillStyle='#8A92A6'; x.fillRect(30,y+hh-50,w-120,8); x.fillRect(30,y+hh-34,w-170,8); }
    }
    card(66,330,true); card(412,280,false);
  });
  TEX.dial=canvasTex(256,96,function(x,w,h){
    x.fillStyle='#FFD60A'; x.fillRect(0,0,w,h); x.fillStyle='#1B1F35';
    for(var i=0;i<=40;i++){ var xx=12+i*(w-24)/40; x.fillRect(xx,h-30,1.5,i%5===0?20:10); }
    x.font='600 16px '+FM; ['88','96','104'].forEach(function(n,i){ x.fillText(n,14+i*100,26); });
    x.fillStyle='#FF1F8E'; x.fillRect(150,6,4,h-10);
  });
}
function boxFront(t){ var face=new T.MeshStandardMaterial({map:t,roughness:.8}); return [MAT.paper,MAT.paper,MAT.paper,MAT.paper,face,MAT.paper]; }

/* ---------- model builders ---------- */
function buildTV(){
  var g=new T.Group();
  part(g,new T.BoxGeometry(2.1,1.55,1.3),MAT.y);
  part(g,new T.BoxGeometry(1.42,1.16,.06),MAT.ink,[-.28,0,.66]);
  part(g,new T.PlaneGeometry(1.28,1.02),basic(TEX.bars),[-.28,0,.695],null,true);
  part(g,new T.CylinderGeometry(.11,.11,.08,24),MAT.m,[.72,.36,.68],[Math.PI/2,0,0]);
  part(g,new T.CylinderGeometry(.11,.11,.08,24),MAT.c,[.72,.04,.68],[Math.PI/2,0,0]);
  for(var i=0;i<4;i++) part(g,new T.BoxGeometry(.34,.035,.02),MAT.ink,[.72,-.26-i*.1,.66]);
  [[-.8,.4],[.8,.4],[-.8,-.4],[.8,-.4]].forEach(function(p){ part(g,new T.CylinderGeometry(.04,.03,.42,8),MAT.shade,[p[0],-.98,p[1]],[p[1]*.35,0,-p[0]*.18]); });
  part(g,new T.SphereGeometry(.2,16,8,0,Math.PI*2,0,Math.PI/2),MAT.shade,[0,.775,0]);
  [-1,1].forEach(function(s){ part(g,new T.CylinderGeometry(.018,.018,1.2,6),MAT.ink,[s*.3,1.3,0],[0,0,-s*.5]); part(g,new T.SphereGeometry(.07,12,8),MAT.m,[s*.59,1.83,0]); });
  return g;
}
function buildRadio(){
  var g=new T.Group();
  part(g,new T.BoxGeometry(2.5,1.25,.62),MAT.c);
  [-.78,.78].forEach(function(x,i){
    part(g,new T.CylinderGeometry(.44,.44,.06,32),MAT.ink,[x,-.12,.32],[Math.PI/2,0,0]);
    part(g,new T.CylinderGeometry(.33,.26,.1,32),MAT.paper,[x,-.12,.35],[Math.PI/2,0,0]);
    part(g,new T.CylinderGeometry(.1,.1,.06,20),i?MAT.y:MAT.m,[x,-.12,.42],[Math.PI/2,0,0]);
  });
  var d=new T.Mesh(new T.BoxGeometry(.62,.26,.05),[MAT.y,MAT.y,MAT.y,MAT.y,new T.MeshStandardMaterial({map:TEX.dial,roughness:.7}),MAT.y]); d.position.set(0,.3,.32); g.add(d); d.add(new T.LineSegments(new T.EdgesGeometry(d.geometry),EDGE));
  [[-.9,MAT.m],[-.62,MAT.v],[.62,MAT.y],[.9,MAT.m]].forEach(function(b){ part(g,new T.BoxGeometry(.2,.08,.2),b[1],[b[0],.665,0]); });
  part(g,new T.TorusGeometry(.72,.05,8,28,Math.PI),MAT.ink,[0,.62,0]);
  part(g,new T.CylinderGeometry(.016,.016,1.3,6),MAT.ink,[1.02,1.18,-.18],[0,0,-.42]);
  part(g,new T.SphereGeometry(.045,10,8),MAT.m,[1.3,1.78,-.18]);
  return g;
}
function buildPrint(){
  var g=new T.Group();
  for(var i=0;i<3;i++) part(g,new T.BoxGeometry(1.6,2.06,.025),MAT.paper,[i*.07,-i*.06,-i*.05],[0,0,-.06+i*.06]);
  var top=new T.Mesh(new T.BoxGeometry(1.6,2.06,.025),boxFront(TEX.paper)); top.position.set(-.06,.05,.04); top.rotation.z=-.1; g.add(top); top.add(new T.LineSegments(new T.EdgesGeometry(top.geometry),EDGE));
  var roll=new T.Group(); roll.position.set(.9,-.75,.45); roll.rotation.set(.2,.3,.95); g.add(roll);
  part(roll,new T.CylinderGeometry(.17,.17,1.7,20),MAT.paper);
  part(roll,new T.TorusGeometry(.175,.03,6,24),MAT.m,[0,.2,0],[Math.PI/2,0,0]);
  part(roll,new T.TorusGeometry(.175,.03,6,24),MAT.m,[0,-.3,0],[Math.PI/2,0,0]);
  return g;
}
function buildOOH(){
  var g=new T.Group();
  part(g,new T.BoxGeometry(3,1.52,.12),MAT.v,[0,.5,0]);
  part(g,new T.PlaneGeometry(2.86,1.4),basic(TEX.board),[0,.5,.062],null,true);
  part(g,new T.CylinderGeometry(.11,.14,1.9,12),MAT.shade,[0,-1.2,-.05]);
  part(g,new T.BoxGeometry(3,.04,.34),MAT.shade,[0,-.3,.2]);
  for(var i=0;i<12;i++) part(g,new T.BoxGeometry(.012,.22,.012),MAT.shade,[-1.45+i*.264,-.18,.36],null,true);
  [-1,0,1].forEach(function(x){ part(g,new T.BoxGeometry(.03,.03,.36),MAT.ink,[x,1.3,.18]); part(g,new T.BoxGeometry(.2,.08,.1),MAT.y,[x,1.28,.38],[.5,0,0]); });
  return g;
}
function buildDigital(){
  var g=new T.Group();
  part(g,new T.BoxGeometry(1.04,2.06,.1),MAT.v);
  part(g,new T.PlaneGeometry(.94,1.92),basic(TEX.phone),[0,0,.051],null,true);
  part(g,new T.CylinderGeometry(.14,.14,.06,24),MAT.m,[.5,1.02,.1],[Math.PI/2,0,0]);
  var c1=part(g,new T.BoxGeometry(.9,.56,.03),MAT.paper,[1.05,.45,.35],[0,-.4,.08]);
  part(c1,new T.BoxGeometry(.3,.3,.02),MAT.c,[-.22,0,.02],null,true);
  part(c1,new T.BoxGeometry(.34,.05,.02),MAT.shade,[.16,.08,.02],null,true);
  part(c1,new T.BoxGeometry(.24,.05,.02),MAT.shade,[.11,-.04,.02],null,true);
  var c2=part(g,new T.BoxGeometry(.7,.44,.03),MAT.paper,[-1,-.45,.3],[0,.45,-.1]);
  part(c2,new T.BoxGeometry(.5,.12,.02),MAT.y,[0,.06,.02],null,true);
  part(c2,new T.BoxGeometry(.36,.05,.02),MAT.shade,[-.07,-.1,.02],null,true);
  return g;
}
function arrowGeo(len){ var s=new T.Shape(),h=.34,t=.28; s.moveTo(0,-h/2); s.lineTo(len-t,-h/2); s.lineTo(len,0); s.lineTo(len-t,h/2); s.lineTo(0,h/2); s.lineTo(0,-h/2); var geo=new T.ExtrudeGeometry(s,{depth:.07,bevelEnabled:false}); geo.translate(.07,0,-.035); return geo; }
function buildSignage(){
  var g=new T.Group();
  part(g,new T.CylinderGeometry(.065,.065,3.1,12),MAT.shade);
  part(g,new T.CylinderGeometry(.38,.44,.12,24),MAT.v,[0,-1.55,0]);
  part(g,new T.SphereGeometry(.1,14,10),MAT.m,[0,1.6,0]);
  [[1.1,MAT.c,0,1.35],[.62,MAT.m,Math.PI+.35,1.15],[.14,MAT.y,-.55,1.3]].forEach(function(a){ var sg=new T.Group(); sg.position.y=a[0]; sg.rotation.y=a[2]; g.add(sg); part(sg,arrowGeo(a[3]),a[1]); });
  part(g,new T.BoxGeometry(.9,.6,.04),MAT.paper,[0,-.55,.08]);
  part(g,new T.BoxGeometry(.5,.07,.01),MAT.ink,[0,-.42,.105],null,true);
  part(g,new T.BoxGeometry(.66,.05,.01),MAT.shade,[0,-.58,.105],null,true);
  part(g,new T.BoxGeometry(.4,.05,.01),MAT.shade,[0,-.7,.105],null,true);
  return g;
}
function buildPlan(){
  var g=new T.Group();
  part(g,new T.BoxGeometry(2.5,.1,1.5),MAT.shade,[0,-.05,0]);
  for(var i=0;i<6;i++) part(g,new T.BoxGeometry(2.3,.005,.01),MAT.ink,[0,.005,-.6+i*.24],null,true);
  var hs=[.55,.85,.7,1.2,1.05,1.7],pts=[];
  hs.forEach(function(h,i){ var x=-1+i*.4; part(g,new T.BoxGeometry(.26,h,.26),[MAT.y,MAT.c,MAT.v,MAT.y,MAT.c,MAT.m][i],[x,h/2,0]); pts.push(new T.Vector3(x,h+.22,0)); });
  part(g,new T.TubeGeometry(new T.CatmullRomCurve3(pts),60,.028,8,false),MAT.c,null,null,true);
  pts.forEach(function(p){ part(g,new T.SphereGeometry(.06,12,8),MAT.y,[p.x,p.y,p.z],null,true); });
  return g;
}
function buildStrat(){
  var g=new T.Group();
  [[1.05,MAT.c],[.84,MAT.paper],[.63,MAT.m],[.42,MAT.paper],[.2,MAT.y]].forEach(function(r,i){ part(g,new T.CylinderGeometry(r[0],r[0],.1,48),r[1],[0,0,i*.012],[Math.PI/2,0,0]); });
  [-1,1].forEach(function(s){ part(g,new T.CylinderGeometry(.045,.045,2.2,8),MAT.shade,[s*.55,-.55,-.35],[.3,0,s*.2]); });
  var ar=new T.Group(); ar.position.set(.04,.05,.1); ar.rotation.set(-.55,.6,0); g.add(ar);
  part(ar,new T.CylinderGeometry(.03,.03,1.5,8),MAT.ink,[0,0,.75],[Math.PI/2,0,0]);
  part(ar,new T.BoxGeometry(.02,.24,.34),MAT.v,[0,.1,1.38]);
  part(ar,new T.BoxGeometry(.24,.02,.34),MAT.v,[.1,0,1.38]);
  return g;
}
var BUILD={tv:buildTV,radio:buildRadio,print:buildPrint,ooh:buildOOH,digital:buildDigital,signage:buildSignage,plan:buildPlan,strat:buildStrat};
function fit(inner,size){
  var box=new T.Box3().setFromObject(inner),c=box.getCenter(new T.Vector3()),s=box.getSize(new T.Vector3());
  inner.position.sub(c); var k=size/Math.max(s.x,s.y,s.z);
  var sc=new T.Group(); sc.scale.setScalar(k); sc.add(inner);
  var o=new T.Group(); o.add(sc); o.userData.h=s.y*k; return o;
}
function lights(scene){
  scene.add(new T.HemisphereLight(0xffffff,0x7d86a3,.95));
  var d=new T.DirectionalLight(0xffffff,.85); d.position.set(4,6,6); scene.add(d);
  var f=new T.DirectionalLight(0xbfe6ff,.28); f.position.set(-6,1,3); scene.add(f);
}
function makeRenderer(canvas,opts){
  try{ var r=new T.WebGLRenderer(Object.assign({canvas:canvas,antialias:true,alpha:true,powerPreference:'high-performance'},opts||{})); r.setClearColor(0x000000,0); r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); return r; }
  catch(e){ return null; }
}
function spring(o,target,dt){ o.v+=(target-o.s)*140*dt; o.v*=Math.exp(-15*dt); o.s+=o.v*dt; }
function onVisible(el,cb){ var io=new IntersectionObserver(function(e){ cb(e[0].isIntersecting); }); io.observe(el); }
function looper(frame){ var raf=0,on=true,last=performance.now(); function f(now){ raf=0; var dt=Math.min(.05,(now-last)/1000); last=now; var keep=frame(dt,now); if(on && keep!==false) kick(); } function kick(){ if(!raf) raf=requestAnimationFrame(f); } return {kick:kick,set:function(v){ on=v; if(v){ last=performance.now(); kick(); } }}; }

var mx=0,my=0;
addEventListener('pointermove',function(e){ mx=e.clientX/innerWidth*2-1; my=e.clientY/innerHeight*2-1; },{passive:true});

/* paper sheet field, shared by several scenes */
function sheetField(scene,cam,n,spread){
  var geo=new T.PlaneGeometry(.42,.56),list=[],mats=[MAT.paperDS,MAT.mDS,MAT.paperDS,MAT.cDS,MAT.yDS,MAT.vDS];
  for(var i=0;i<n;i++){ var m=new T.Mesh(geo,mats[i%6]); m.add(new T.LineSegments(new T.EdgesGeometry(geo),EDGE)); scene.add(m);
    list.push({m:m,x:Math.random(),y:Math.random(),z:-1-Math.random()*(spread||5),sp:.12+Math.random()*.2,rx:Math.random()*6,ry:Math.random()*6,vr:(Math.random()-.5)*1.2,s:.8+Math.random()*.7}); }
  return function(dt,lift){
    list.forEach(function(s){
      if(!reduce){ s.y-=s.sp*dt*.08; if(s.y<-.1){ s.y=1.1; s.x=Math.random(); } s.rx+=s.vr*dt; s.ry+=s.vr*.7*dt; }
      var d=cam.position.z-s.z,hh=Math.tan(T.MathUtils.degToRad(cam.fov/2))*d,ww=hh*cam.aspect;
      s.m.position.set((s.x*2-1)*ww,(s.y*2-1)*hh+(lift||0),s.z); s.m.rotation.set(s.rx,s.ry,0); s.m.scale.setScalar(s.s);
    });
  };
}
function sizeTo(r,cam,canvas){ var w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h) return false; r.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); return true; }

/* =================== HERO (home) =================== */
function hero(hc){
  var hr=makeRenderer(hc); if(!hr){ document.documentElement.classList.add('no3d'); return; }
  var hero=hc.parentElement;
  var hs=new T.Scene(),cam=new T.PerspectiveCamera(34,1,.1,100); cam.position.set(0,0,12); lights(hs);
  var root=new T.Group(); hs.add(root);
  var LAYOUT={tv:[-.28,.42,.4,1.05],ooh:[.46,.7,-.9,1.35],radio:[.62,.02,.3,1],print:[-.62,-.38,.2,.95],digital:[.06,-.6,.7,.95],signage:[.95,-.72,-1.4,1.05],plan:[-.5,.98,-1.6,.95],strat:[1.02,.52,-2.6,1.05]};
  var items=KEYS.map(function(k,i){ var o=fit(BUILD[k](),1); root.add(o); o.scale.setScalar(.0001); return {o:o,n:LAYOUT[k],s:0,v:0,delay:.25+i*.11,ph:i*1.7,home:new T.Vector3(),size:1,spin:0}; });
  var sheets=sheetField(hs,cam,16);
  function layout(){
    if(!sizeTo(hr,cam,hc)) return;
    var halfH=Math.tan(T.MathUtils.degToRad(cam.fov/2))*cam.position.z,halfW=halfH*cam.aspect,wide=cam.aspect>1.15;
    var cx=wide?halfW*.5:0,cy=wide?.15:0,rw=wide?halfW*.42:halfW*.78,rh=wide?halfH*.74:halfH*.72,unit=Math.min(rw*1.15,rh);
    items.forEach(function(it){ it.home.set(cx+it.n[0]*rw,cy+it.n[1]*rh,it.n[2]*unit*.9); it.size=unit*(wide?.5:.56)*it.n[3]; });
    L.kick();
  }
  hc.addEventListener('pointerdown',function(){ items.forEach(function(it,i){ it.spin+=2.2+i*.1; }); });
  var rx=0,ry=0,t=0;
  var L=looper(function(dt){
    t+=dt;
    var p=Math.max(0,Math.min(1,window.scrollY/Math.max(1,hero.offsetHeight)));
    rx+=((reduce?0:my*.12)-rx)*.05; ry+=((reduce?0:mx*.22)-ry)*.05;
    root.rotation.set(rx+p*.25,ry+p*.7,0); root.position.y=p*2.2;
    items.forEach(function(it){
      if(reduce) it.s=1; else spring(it,t>it.delay?1:0,dt);
      it.spin*=Math.exp(-2.4*dt);
      var o=it.o,bob=reduce?0:Math.sin(t*.8+it.ph)*.09;
      o.position.set(it.home.x,it.home.y+bob,it.home.z);
      o.scale.setScalar(Math.max(.0001,it.size*it.s));
      o.rotation.set(-.08+(reduce?0:Math.sin(t*.4+it.ph)*.06),-.42+(reduce?0:Math.sin(t*.5+it.ph)*.28)+(1-Math.min(1,it.s))*-2.4+it.spin,(reduce?0:Math.sin(t*.35+it.ph)*.04));
    });
    sheets(dt,p*1.5);
    cam.position.x=reduce?0:mx*.35; cam.lookAt(0,0,0);
    hr.render(hs,cam);
    return !reduce;
  });
  new ResizeObserver(layout).observe(hc); layout();
  onVisible(hc,L.set);
  if(reduce) addEventListener('scroll',L.kick,{passive:true});
}

/* =================== turntable helpers =================== */
function turntable(parent,FLOOR,ringMat){
  part(parent,new T.CylinderGeometry(2.1,2.1,.14,64),MAT.paper,[0,FLOOR-.07,0]);
  part(parent,new T.CylinderGeometry(2.16,2.16,.06,64),ringMat||MAT.m,[0,FLOOR-.17,0]);
  for(var k=0;k<48;k++){ var a=k/48*Math.PI*2,len=k%6===0?.22:.1; part(parent,new T.BoxGeometry(.012,.004,len),k%12===0?MAT.m:MAT.ink,[Math.sin(a)*(2.1-len/2-.04),FLOOR+.003,Math.cos(a)*(2.1-len/2-.04)],[0,a,0],true); }
}
function dragSpin(canvas,state,kick){
  var dragging=false,lx=0;
  canvas.addEventListener('pointerdown',function(e){ dragging=true; lx=e.clientX; state.drag=true; try{ canvas.setPointerCapture(e.pointerId); }catch(_){} kick(); });
  canvas.addEventListener('pointermove',function(e){ if(!dragging) return; var dx=e.clientX-lx; lx=e.clientX; state.a+=dx*.012; state.v=dx*.6; state.moved=(state.moved||0)+Math.abs(dx); kick(); });
  function end(){ dragging=false; state.drag=false; }
  canvas.addEventListener('pointerup',end); canvas.addEventListener('pointercancel',end);
}

/* =================== STAGE (home channels) =================== */
function stage(sc){
  var sr=makeRenderer(sc); if(!sr) return;
  var ss=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,100); cam.position.set(0,1.1,10.5); lights(ss);
  var turn=new T.Group(); ss.add(turn); var FLOOR=-1.7; turntable(turn,FLOOR);
  var items=KEYS.map(function(k,i){ var o=fit(BUILD[k](),k==='ooh'?3.4:(k==='signage'?3.1:2.9)); o.position.y=FLOOR+o.userData.h/2+.02; turn.add(o); o.visible=i===0; return {o:o,s:i===0?1:0,v:0,spin:0}; });
  var st={a:0,v:reduce?0:.25,drag:false},active=0,on=false;
  var nEl=document.getElementById('chNum'),nmEl=document.getElementById('chName'),go=document.getElementById('chGo');
  var rows=[].slice.call(document.querySelectorAll('.ch[data-i]'));
  function setActive(i){
    if(i===active) return; active=i; items[i].o.visible=true; items[i].spin=reduce?0:-2.2;
    rows.forEach(function(b,j){ b.classList.toggle('on',j===i); });
    if(nEl) nEl.textContent='CH '+String(i+1).padStart(2,'0')+' / 08';
    if(nmEl) nmEl.textContent=NAME[KEYS[i]];
    if(go) go.href=ROOT+'services/'+SLUG[KEYS[i]]+'/';
    L.kick();
  }
  rows.forEach(function(b,i){ b.addEventListener('mouseenter',function(){ setActive(i); }); b.addEventListener('focus',function(){ setActive(i); }); });
  var rowIO=new IntersectionObserver(function(ents){ ents.forEach(function(en){ if(en.isIntersecting) setActive(+en.target.dataset.i); }); },{rootMargin:'-48% 0px -48% 0px'});
  rows.forEach(function(b){ rowIO.observe(b); });
  function layout(){ if(!sizeTo(sr,cam,sc)) return; cam.position.z=cam.aspect<1.1?12.5:10.5; cam.updateProjectionMatrix(); L.kick(); }
  var L=looper(function(dt){
    var busy=false;
    if(!st.drag){ st.v+=((reduce?0:.25)-st.v)*Math.min(1,dt*1.5); st.a+=st.v*dt; }
    turn.rotation.y=st.a;
    items.forEach(function(it,j){
      var tgt=j===active?1:0; if(reduce){ it.s=tgt; it.v=0; } else spring(it,tgt,dt);
      it.spin*=Math.exp(-3.2*dt);
      if(Math.abs(it.s-tgt)>.001||Math.abs(it.v)>.001||Math.abs(it.spin)>.001) busy=true;
      it.o.visible=it.s>.002||j===active;
      it.o.scale.setScalar(Math.max(.0001,it.s));
      it.o.rotation.y=it.spin+(1-Math.min(1,Math.max(0,it.s)))*(j===active?-1:1.4);
    });
    cam.position.x+=((on&&!reduce?mx*.4:0)-cam.position.x)*.05; cam.lookAt(0,-.7,0);
    sr.render(ss,cam);
    return !reduce||busy||st.drag;
  });
  dragSpin(sc,st,L.kick);
  new ResizeObserver(layout).observe(sc); layout();
  onVisible(sc,function(v){ on=v; L.set(v); });
}

/* =================== SOLO (service hero) =================== */
function solo(c,key){
  var r=makeRenderer(c); if(!r) return;
  var s=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,100); cam.position.set(0,1.3,10.5); lights(s);
  var turn=new T.Group(); s.add(turn); var FLOOR=-1.75; turntable(turn,FLOOR,MAT.ink);
  var o=fit(BUILD[key](),key==='ooh'?3.5:(key==='signage'?3.2:3)); o.position.y=FLOOR+o.userData.h/2+.02; turn.add(o);
  var st={a:-.5,v:reduce?0:.3,drag:false},it={s:reduce?1:0,v:0},t=0,on=false;
  function layout(){ if(!sizeTo(r,cam,c)) return; cam.position.z=cam.aspect<1?12.6:10.8; cam.updateProjectionMatrix(); L.kick(); }
  var L=looper(function(dt){
    t+=dt;
    if(!st.drag){ st.v+=((reduce?0:.3)-st.v)*Math.min(1,dt*1.5); st.a+=st.v*dt; }
    turn.rotation.y=st.a;
    if(!reduce) spring(it,t>.15?1:0,dt);
    o.scale.setScalar(Math.max(.0001,it.s)); o.rotation.y=(1-Math.min(1,it.s))*-2;
    o.position.y=FLOOR+o.userData.h/2+.02+(reduce?0:Math.sin(t*1.2)*.05+.05);
    cam.position.x+=((on&&!reduce?mx*.5:0)-cam.position.x)*.05;
    cam.position.y+=((on&&!reduce?1.3-my*.4:1.3)-cam.position.y)*.05;
    cam.lookAt(0,-.6,0);
    r.render(s,cam);
    return !reduce||st.drag;
  });
  dragSpin(c,st,L.kick);
  new ResizeObserver(layout).observe(c); layout();
  onVisible(c,function(v){ on=v; L.set(v); });
}

/* =================== RING (services page) =================== */
function ring(c){
  var r=makeRenderer(c); if(!r) return;
  var s=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100); cam.position.set(0,2.2,11.5); lights(s);
  var wheel=new T.Group(); s.add(wheel);
  var R=3.1,items=KEYS.map(function(k,i){ var o=fit(BUILD[k](),k==='ooh'?2.1:1.75),a=i/KEYS.length*Math.PI*2; o.position.set(Math.sin(a)*R,0,Math.cos(a)*R); o.userData.key=k; wheel.add(o); return {o:o,a:a,k:k}; });
  part(wheel,new T.TorusGeometry(R,.025,6,96),MAT.ink,[0,-1.2,0],[Math.PI/2,0,0],true);
  var st={a:0,v:reduce?0:-.22,drag:false},on=false,front=-1,t=0;
  var nameEl=document.getElementById('ringName'),linkEl=document.getElementById('ringGo'),idxEl=document.getElementById('ringIdx');
  var ray=new T.Raycaster(),ptr=new T.Vector2();
  c.addEventListener('pointerdown',function(){ st.moved=0; });
  c.addEventListener('click',function(e){
    if((st.moved||0)>6) return;
    var b=c.getBoundingClientRect(); ptr.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);
    ray.setFromCamera(ptr,cam); var hit=ray.intersectObjects(wheel.children,true)[0];
    if(hit){ var p=hit.object; while(p && !p.userData.key) p=p.parent; if(p){ location.href=ROOT+'services/'+SLUG[p.userData.key]+'/'; } }
  });
  function layout(){ if(!sizeTo(r,cam,c)) return; cam.position.z=cam.aspect<1.25?(cam.aspect<.9?17.5:15.5):12.5; cam.updateProjectionMatrix(); L.kick(); }
  var L=looper(function(dt){
    t+=dt;
    if(!st.drag){ st.v+=((reduce?0:-.22)-st.v)*Math.min(1,dt*1.5); st.a+=st.v*dt; }
    wheel.rotation.y=st.a;
    var best=-1,bz=-1e9;
    items.forEach(function(it,i){
      var wa=it.a+st.a,z=Math.cos(wa); if(z>bz){ bz=z; best=i; }
      it.o.rotation.y=-st.a+(reduce?0:Math.sin(t+i)*.15);
      var sc=.72+.4*Math.max(0,z); it.o.scale.setScalar(sc);
      it.o.position.y=(reduce?0:Math.sin(t*1.1+i*.8)*.12)+(z>.92?.25:0);
    });
    if(best!==front){ front=best; var k=KEYS[best]; if(nameEl) nameEl.textContent=NAME[k]; if(linkEl) linkEl.href=ROOT+'services/'+SLUG[k]+'/'; if(idxEl) idxEl.textContent=String(best+1).padStart(2,'0')+' / 08'; }
    cam.position.x+=((on&&!reduce?mx*.6:0)-cam.position.x)*.05; cam.lookAt(0,.1,0);
    r.render(s,cam);
    return !reduce||st.drag;
  });
  dragSpin(c,st,L.kick);
  new ResizeObserver(layout).observe(c); layout();
  onVisible(c,function(v){ on=v; L.set(v); });
}

/* =================== SHEETS / PLANE (page heroes) =================== */
function planeGeo(){
  var v=new Float32Array([
    0,0,1.1,  -.75,0,-.6,  0,0,-.45,   // left wing
    0,0,1.1,  0,0,-.45,  .75,0,-.6,    // right wing
    0,0,1.1,  0,0,-.45,  0,-.28,-.5   // keel
  ]);
  var g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(v,3)); g.computeVertexNormals(); return g;
}
function field(c,mode){
  var r=makeRenderer(c); if(!r) return;
  var s=new T.Scene(),cam=new T.PerspectiveCamera(34,1,.1,100); cam.position.set(0,0,12); lights(s);
  var sheets=sheetField(s,cam,mode==='plane'?10:16,6);
  var plane=null,trail=[];
  if(mode==='plane'){
    plane=new T.Group(); var pg=planeGeo(); var pm=new T.Mesh(pg,MAT.mDS); pm.add(new T.LineSegments(new T.EdgesGeometry(pg),EDGE)); plane.add(pm); plane.scale.setScalar(.8); s.add(plane);
    var tg=new T.SphereGeometry(.05,8,6); for(var i=0;i<26;i++){ var d=new T.Mesh(tg,[MAT.m,MAT.c,MAT.y,MAT.v][i%4]); s.add(d); trail.push(d); }
  }
  var hist=[],t=0,on=false;
  function layout(){ if(sizeTo(r,cam,c)) L.kick(); }
  var L=looper(function(dt){
    t+=dt;
    var p=Math.max(0,Math.min(1,window.scrollY/Math.max(1,c.parentElement.offsetHeight)));
    sheets(dt,p*2);
    if(plane){
      var halfH=Math.tan(T.MathUtils.degToRad(cam.fov/2))*cam.position.z,halfW=halfH*cam.aspect,wide=cam.aspect>1.1;
      var cx=wide?halfW*.62:halfW*.5,ax=wide?halfW*.24:halfW*.32,ay=wide?halfH*.42:halfH*.25;
      var tt=reduce?1.2:t*.55;
      var pos=new T.Vector3(cx+Math.sin(tt)*ax,Math.sin(tt*2)*ay*.6+(wide?.2:halfH*.68),Math.cos(tt)*.9);
      var nxt=new T.Vector3(cx+Math.sin(tt+.05)*ax,Math.sin((tt+.05)*2)*ay*.6+(wide?.2:halfH*.68),Math.cos(tt+.05)*.9);
      plane.position.copy(pos); plane.lookAt(nxt); plane.rotateZ(-Math.cos(tt)*.6);
      hist.unshift(pos.clone()); if(hist.length>trail.length*3) hist.pop();
      trail.forEach(function(d,i){ var h=hist[Math.min(hist.length-1,i*3)]; if(h){ d.position.copy(h); d.scale.setScalar(1-i/trail.length); d.visible=!reduce; } });
    }
    cam.position.x=reduce?0:mx*.4; cam.position.y=reduce?0:-my*.25; cam.lookAt(0,0,0);
    r.render(s,cam);
    return !reduce;
  });
  new ResizeObserver(layout).observe(c); layout();
  onVisible(c,function(v){ on=v; L.set(v); });
}

/* =================== THUMBNAILS =================== */
function thumbs(imgs){
  var W=520,H=430,cv=document.createElement('canvas'); cv.width=W; cv.height=H;
  var r=makeRenderer(cv,{preserveDrawingBuffer:true}); if(!r) return;
  r.setPixelRatio(1); r.setSize(W,H,false);
  var s=new T.Scene(),cam=new T.PerspectiveCamera(30,W/H,.1,100); cam.position.set(0,1.6,10); cam.lookAt(0,-.15,0); lights(s);
  var cache={};
  imgs.forEach(function(img){
    var k=img.getAttribute('data-thumb'); if(!BUILD[k]) return;
    if(!cache[k]){
      var o=fit(BUILD[k](),k==='ooh'?3.3:(k==='signage'?3.1:2.9)); o.rotation.set(.05,-.55,0); s.add(o);
      r.render(s,cam); cache[k]=cv.toDataURL('image/png'); s.remove(o);
    }
    img.src=cache[k]; img.removeAttribute('data-thumb');
  });
  r.dispose(); try{ r.forceContextLoss(); }catch(e){}
}

/* =================== boot =================== */
function start(){
  makeTextures();
  var th=[].slice.call(document.querySelectorAll('img[data-thumb]')); if(th.length) thumbs(th);
  var h=document.getElementById('hero3d'); if(h) hero(h);
  var st=document.getElementById('stage3d'); if(st) stage(st);
  [].slice.call(document.querySelectorAll('canvas[data-model]')).forEach(function(c){ solo(c,c.getAttribute('data-model')); });
  [].slice.call(document.querySelectorAll('canvas[data-mode]')).forEach(function(c){ var m=c.getAttribute('data-mode'); if(m==='ring') ring(c); else field(c,m); });
}
var fontsReady=(document.fonts&&document.fonts.load)?Promise.all([document.fonts.load('900 60px "Big Shoulders Display"'),document.fonts.load('500 14px "IBM Plex Mono"')]):Promise.resolve();
Promise.race([fontsReady,new Promise(function(r){ setTimeout(r,1800); })]).then(start,start);
})();
