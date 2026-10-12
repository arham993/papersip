/* Papersip Company — shared page behaviour */
(function(){
"use strict";
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){ return (r||document).querySelector(s); };
var $$=function(s,r){ return [].slice.call((r||document).querySelectorAll(s)); };
var root=document.documentElement;

/* ---------- header ---------- */
var hdr=$('#hdr');
function onScrollHdr(){ if(hdr) hdr.classList.toggle('scrolled',window.scrollY>8); }
addEventListener('scroll',onScrollHdr,{passive:true}); onScrollHdr();

/* ---------- mobile menu ---------- */
var burger=$('#burger'),mnav=$('#mnav');
function setMenu(open){
  root.classList.toggle('menu-open',open);
  if(burger){ burger.setAttribute('aria-expanded',open?'true':'false'); burger.setAttribute('aria-label',open?'Close menu':'Open menu'); }
  if(mnav){ mnav.setAttribute('aria-hidden',open?'false':'true'); if(open){ var f=$('a',mnav); if(f) setTimeout(function(){ f.focus(); },250); } }
  if(lenis){ open?lenis.stop():lenis.start(); }
}
if(burger) burger.addEventListener('click',function(){ setMenu(!root.classList.contains('menu-open')); });
addEventListener('keydown',function(e){ if(e.key==='Escape' && root.classList.contains('menu-open')){ setMenu(false); if(burger) burger.focus(); } });

/* ---------- smooth scroll ---------- */
var lenis=null;
if(window.Lenis && !reduce){
  try{ lenis=new Lenis({lerp:.085,smoothWheel:true}); (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(performance.now()); }catch(e){ lenis=null; }
}
function scrollToEl(t){ if(lenis) lenis.scrollTo(t,{offset:-84,duration:1.3}); else t.scrollIntoView({behavior:reduce?'auto':'smooth'}); }
if(location.hash.length>1){ var hEl=document.getElementById(location.hash.slice(1)); if(hEl) setTimeout(function(){ scrollToEl(hEl); },120); }

/* ---------- links: in-page anchors + page wipe ---------- */
var wipe=document.createElement('div'); wipe.className='wipe'; wipe.setAttribute('aria-hidden','true'); wipe.innerHTML='<i></i><i></i><i></i><i></i>';
document.body.appendChild(wipe);
if(!reduce && sessionStorageGet('ps-wipe')){ wipe.classList.add('out'); setTimeout(function(){ wipe.classList.remove('out'); },900); }
sessionStorageSet('ps-wipe','');
function sessionStorageGet(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } }
function sessionStorageSet(k,v){ try{ sessionStorage.setItem(k,v); }catch(e){} }
addEventListener('pageshow',function(e){ if(e.persisted){ wipe.classList.remove('in','out'); } });
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href]'); if(!a) return;
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download')) return;
  var href=a.getAttribute('href');
  if(href.charAt(0)==='#'){
    if(href.length<2) return; var t=document.getElementById(href.slice(1)); if(!t) return;
    e.preventDefault(); setMenu(false); scrollToEl(t); history.replaceState(null,'',href); return;
  }
  var u; try{ u=new URL(a.href,location.href); }catch(_){ return; }
  if(u.origin!==location.origin||!/^https?:$/.test(u.protocol)) return;
  if(u.pathname===location.pathname && u.hash){ var t2=document.getElementById(u.hash.slice(1)); if(t2){ e.preventDefault(); setMenu(false); scrollToEl(t2); return; } }
  if(reduce) return;
  e.preventDefault(); setMenu(false);
  sessionStorageSet('ps-wipe','1');
  wipe.classList.remove('out'); wipe.classList.add('in');
  setTimeout(function(){ location.href=a.href; },520);
});

/* ---------- reveal on scroll ---------- */
if(!reduce && 'IntersectionObserver' in window){
  var rio=new IntersectionObserver(function(ents){ ents.forEach(function(en){ if(en.isIntersecting){ en.target.classList.remove('pre'); rio.unobserve(en.target); } }); },{rootMargin:'0px 0px -8% 0px'});
  $$('.rv').forEach(function(el,i){ var r=el.getBoundingClientRect(); if(r.top>innerHeight*.92){ el.classList.add('pre'); el.style.transitionDelay=((i%4)*70)+'ms'; rio.observe(el); } });
}

/* ---------- timecode (PAL 25fps) ---------- */
var tcs=$$('[data-tc]');
if(tcs.length){
  var t0=performance.now();
  var fmt=function(ms){ var f=Math.floor(ms/40),p=function(n){ return String(n).padStart(2,'0'); }; return p(Math.floor(f/90000))+':'+p(Math.floor(f/1500)%60)+':'+p(Math.floor(f/25)%60)+':'+p(f%25); };
  (function tick(){ var d=performance.now()-t0; tcs.forEach(function(el){ el.textContent=fmt(el.dataset.tc==='loop'?d%30000:d); }); if(!reduce) requestAnimationFrame(tick); })();
}

/* ---------- radio bars ---------- */
$$('.wave').forEach(function(w){ for(var i=0;i<28;i++){ var b=document.createElement('i'); b.style.animationDelay=(-Math.random()*1.1).toFixed(2)+'s'; b.style.animationDuration=(.6+Math.random()*.9).toFixed(2)+'s'; w.appendChild(b); } });

/* ---------- tilt cards ---------- */
if(!reduce) $$('.tilt').forEach(function(card){
  card.addEventListener('pointermove',function(e){ if(e.pointerType==='touch') return; var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; card.classList.add('hot'); card.style.setProperty('--ry',(x*14).toFixed(2)+'deg'); card.style.setProperty('--rx',(-y*12).toFixed(2)+'deg'); });
  card.addEventListener('pointerleave',function(){ card.classList.remove('hot'); card.style.setProperty('--ry','0deg'); card.style.setProperty('--rx','0deg'); });
});

/* ---------- drift parallax ---------- */
var drifts=$$('[data-speed]');
function drift(){ var vh=innerHeight; drifts.forEach(function(d){ var r=d.getBoundingClientRect(); if(r.bottom<-200||r.top>vh+200) return; d.style.transform='translate3d(0,'+((r.top+r.height/2-vh/2)*parseFloat(d.dataset.speed)).toFixed(1)+'px,0)'; }); }
if(drifts.length && !reduce && innerWidth>620){ addEventListener('scroll',function(){ requestAnimationFrame(drift); },{passive:true}); drift(); }

/* ---------- count up ---------- */
if(!reduce && 'IntersectionObserver' in window){
  var cio=new IntersectionObserver(function(ents){ ents.forEach(function(en){
    if(!en.isIntersecting) return; cio.unobserve(en.target);
    var n=en.target,end=+n.dataset.count,start=n.dataset.from?+n.dataset.from:0,t=performance.now(),dur=1400;
    (function step(now){ var p=Math.min(1,(now-t)/dur),e=1-Math.pow(1-p,4); n.textContent=Math.round(start+(end-start)*e); if(p<1) requestAnimationFrame(step); })(t);
  }); },{threshold:.6});
  $$('[data-count]').forEach(function(n){ cio.observe(n); });
}

/* ---------- copy helpers ---------- */
function flash(btn,label){ if(!btn.dataset.label) btn.dataset.label=btn.innerHTML; btn.innerHTML=label; btn.classList.add('ok'); clearTimeout(btn._t); btn._t=setTimeout(function(){ btn.innerHTML=btn.dataset.label; btn.classList.remove('ok'); },1600); }
function copyText(text,btn,ok,fallbackEl){
  var fail=function(){ if(fallbackEl){ fallbackEl.focus(); if(fallbackEl.select) fallbackEl.select(); else { var rg=document.createRange(); rg.selectNodeContents(fallbackEl); var s=getSelection(); s.removeAllRanges(); s.addRange(rg); } } flash(btn,'Selected · Ctrl+C'); };
  try{ navigator.clipboard.writeText(text).then(function(){ flash(btn,ok); },fail); }catch(e){ fail(); }
}
$$('.copy-btn').forEach(function(b){ b.addEventListener('click',function(){ copyText(b.dataset.copy,b,'Copied',b.previousElementSibling); }); });

/* ---------- brief builder (contact) ---------- */
var brief=$('#brief');
if(brief){
  var params=new URLSearchParams(location.search),pre=params.get('service');
  if(pre){ $$('input[type=checkbox]',brief).forEach(function(i){ i.checked=(i.dataset.key===pre); }); }
  var out=$('#f-out'),mail=$('#mailBrief'),wa=$('#waBrief');
  var val=function(id,fb){ var v=$('#'+id).value.trim(); return v||fb; };
  var build=function(){
    var sel=$$('input[type=checkbox]:checked',brief).map(function(i){ return i.value; });
    var ch=sel.length?(sel.length>1?sel.slice(0,-1).join(', ')+' and '+sel[sel.length-1]:sel[0]):'[pick at least one channel]';
    var notes=val('f-notes','');
    var txt='Hi Papersip team,\n\n'+"I'm "+val('f-name','[your name]')+' from '+val('f-co','[your brand]')+". We'd like a quote for "+ch+' in '+val('f-mkt','[market or city]')+'.\n\n'+
      'Goal: '+$('#f-goal').value+'\nBudget: '+$('#f-budget').value+'\nGo live: '+$('#f-time').value+'\n'+
      (val('f-phone','')?'Phone: '+val('f-phone','')+'\n':'')+(notes?'\n'+notes+'\n':'')+'\nThanks,\n'+val('f-name','[your name]');
    out.value=txt;
    mail.href='mailto:madan@papersipcompany.com?subject='+encodeURIComponent('Quote request: '+val('f-co','new campaign'))+'&body='+encodeURIComponent(txt);
    if(wa) wa.href='https://wa.me/919958797259?text='+encodeURIComponent(txt);
  };
  brief.addEventListener('input',build); brief.addEventListener('change',build);
  brief.addEventListener('submit',function(e){ e.preventDefault(); });
  build();
  $('#copyBrief').addEventListener('click',function(){ copyText(out.value,this,'Copied to clipboard',out); });
}

/* ---------- work filters ---------- */
var filters=$('#filters');
if(filters){
  var btns=$$('button',filters),secs=$$('.work-sec');
  var apply=function(k){ btns.forEach(function(b){ b.setAttribute('aria-pressed',b.dataset.f===k?'true':'false'); }); secs.forEach(function(s){ s.hidden=!(k==='all'||s.dataset.cat===k); }); };
  btns.forEach(function(b){ b.addEventListener('click',function(){ apply(b.dataset.f); var first=secs.filter(function(s){ return !s.hidden; })[0]; if(first && b.dataset.f!=='all') scrollToEl(first); if(b.dataset.f!=='all') history.replaceState(null,'','#'+b.dataset.f); else history.replaceState(null,'',location.pathname); }); });
  var h=location.hash.slice(1); if(h && btns.some(function(b){ return b.dataset.f===h; })) apply(h);
}

/* ---------- broken media: hide gracefully ---------- */
function dropTile(el){
  var tile=el.closest('[data-tile]')||el,box=tile.parentElement; tile.remove();
  if(box && !box.querySelector('[data-tile]')){ var sec=box.closest('section'); if(sec){ var cat=sec.getAttribute('data-cat'); sec.remove(); if(cat){ var fb=$('#filters [data-f="'+cat+'"]'); if(fb) fb.remove(); } } }
}
$$('img[data-hide-on-error]').forEach(function(img){ var kill=function(){ dropTile(img); }; if(img.complete && img.naturalWidth===0 && img.src) kill(); else img.addEventListener('error',kill); });
$$('img[data-fallback]').forEach(function(img){ var fb=function(){ var tile=img.closest('.lw'); if(!tile) return; tile.classList.add('txt'); img.outerHTML='<span class="fallback">'+img.alt+'</span>'; }; if(img.complete && img.naturalWidth===0 && img.src) fb(); else img.addEventListener('error',fb); });
$$('video[data-hide-on-error]').forEach(function(v){ var done=false,kill=function(){ if(done) return; done=true; dropTile(v); }; v.addEventListener('error',kill,true); var src=$('source',v); if(src) src.addEventListener('error',kill); if(v.networkState===3) kill(); });

/* ---------- lightbox ---------- */
var lb=$('#lightbox');
if(lb){
  var img=$('img',lb),cap=$('#lbCap'),items=[],idx=0,lastFocus=null;
  var collect=function(){ items=$$('.gal a').filter(function(a){ return a.offsetParent!==null; }); };
  var show=function(i){ idx=(i+items.length)%items.length; var a=items[idx]; img.src=a.href; img.alt=a.dataset.alt||''; cap.textContent=(a.dataset.cat||'')+' · '+(idx+1)+' / '+items.length; };
  var open=function(a){ collect(); lastFocus=a; show(items.indexOf(a)); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); if(lenis) lenis.stop(); $('#lbClose').focus(); };
  var close=function(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); if(lenis) lenis.start(); if(lastFocus) lastFocus.focus(); };
  document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('.gal a'); if(!a) return; e.preventDefault(); e.stopPropagation(); open(a); },true);
  $('#lbClose').addEventListener('click',close);
  $('#lbPrev').addEventListener('click',function(){ show(idx-1); });
  $('#lbNext').addEventListener('click',function(){ show(idx+1); });
  lb.addEventListener('click',function(e){ if(e.target===lb||e.target.classList.contains('stagebox')) close(); });
  addEventListener('keydown',function(e){ if(!lb.classList.contains('open')) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') show(idx-1); if(e.key==='ArrowRight') show(idx+1); });
}
})();
