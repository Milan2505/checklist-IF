/* ============================================================
   RENDU DE LA CHECKLIST
   Pastilles de valeurs ({{cle}}), construction des phases, cochage,
   depliage et defilement. Depend de : data/phases.js, state.js, dom.js.
   Appelle paintProgress() (progress.js), markRefs() et openRef() (refs.js).
============================================================ */
/* ============================================================
   RENDU
============================================================ */
function esc(s){
  return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* {{cle}} devient une pastille reperable, mise a jour sans reconstruire la liste */
const PLACEHOLDER = /\{\{(\w+)\}\}/g;
function valSpan(k){
  const v = (state.values[k]||'').trim();
  return '<span class="val'+(v?'':' empty')+'" data-k="'+esc(k)+'">'+esc(v||'___')+'</span>';
}
function inject(txt){
  let out = '', last = 0, m;
  PLACEHOLDER.lastIndex = 0;
  while((m = PLACEHOLDER.exec(txt))){
    out += esc(txt.slice(last, m.index)) + valSpan(m[1]);
    last = PLACEHOLDER.lastIndex;
  }
  return out + esc(txt.slice(last));
}
function refreshValues(){
  el.phases.querySelectorAll('.val[data-k]').forEach(node=>{
    const v = (state.values[node.dataset.k]||'').trim();
    node.textContent = v || '___';
    node.classList.toggle('empty', !v);
  });
}

const secs = [];   /* une section par phase, dans l'ordre */

function render(){
  const frag = document.createDocumentFragment();
  secs.length = 0;

  PHASES.forEach((ph,pi)=>{
    const sec = document.createElement('section');
    sec.className = 'phase';
    sec.dataset.p = pi;

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'ph-head';
    head.id = 'ph-head-'+pi;
    head.setAttribute('aria-controls', 'ph-body-'+pi);
    head.innerHTML =
      '<span class="ph-idx">'+String(pi+1).padStart(2,'0')+'</span>'+
      '<span class="ph-title">'+esc(ph.n)+
        (ph.s ? '<span class="ph-sub">'+esc(ph.s)+'</span>' : '')+
      '</span>'+
      '<span class="ph-count"></span>'+
      '<span class="chev" aria-hidden="true"></span>';
    sec.appendChild(head);

    const barw = document.createElement('div');
    barw.className = 'ph-bar';
    barw.innerHTML = '<div class="bar"><span></span></div>';
    sec.appendChild(barw);

    const body = document.createElement('div');
    body.className = 'ph-body';
    body.id = 'ph-body-'+pi;
    body.setAttribute('role','group');
    body.setAttribute('aria-labelledby','ph-head-'+pi);

    ph.items.forEach((it,ii)=>{
      const on = !!state.done[id(pi,ii)];
      const row = document.createElement('div');
      row.className = 'item' + (on?' done':'') + (it.w?' warn':'') + (it.wip?' wip':'');
      row.dataset.p = pi; row.dataset.i = ii;
      row.setAttribute('role','checkbox');
      row.setAttribute('aria-checked', on?'true':'false');
      row.tabIndex = 0;
      row.innerHTML =
        '<span class="box" aria-hidden="true"></span>'+
        '<span class="it-txt"><span class="it-t">'+inject(it.t)+
          (it.wip ? '<span class="it-wip">WIP</span>' : '')+'</span>'+
          (it.d ? '<span class="it-d">'+inject(it.d)+'</span>' : '')+
        '</span>'+
        (it.r ? '<button type="button" class="ref" data-ref="'+esc(it.r)+'"'+
                ' aria-label="Ouvrir la section '+esc(it.r)+' du briefing">§'+esc(it.r)+'</button>' : '');
      body.appendChild(row);
    });

    sec.appendChild(body);
    frag.appendChild(sec);
    secs.push(sec);
  });

  el.phases.innerHTML = '';
  el.phases.appendChild(frag);
  applyOpen();
  PHASES.forEach((_,pi)=> paintPhase(pi));
  paintProgress();
  markRefs();
}

/* un seul ecouteur pour toute la liste : rien a rebrancher a chaque redessin */
el.phases.addEventListener('click', e=>{
  const ref = e.target.closest('.ref');
  if(ref){ openRef(ref.dataset.ref); return; }
  const head = e.target.closest('.ph-head');
  if(head){ onHead(+head.parentElement.dataset.p); return; }
  const row = e.target.closest('.item');
  if(row) toggleRow(row);
});
el.phases.addEventListener('keydown', e=>{
  if(e.key !== ' ' && e.key !== 'Enter') return;
  const row = e.target.classList && e.target.classList.contains('item') ? e.target : null;
  if(row){ e.preventDefault(); toggleRow(row); }
});

/* cocher ne reconstruit plus la page : defilement, focus et sections
   depliees restent ou le pilote les a laisses */
function toggleRow(row){
  const pi = +row.dataset.p, key = id(pi, +row.dataset.i);
  if(state.done[key]) delete state.done[key]; else state.done[key] = true;
  const on = !!state.done[key];
  row.classList.toggle('done', on);
  row.setAttribute('aria-checked', on?'true':'false');
  paintPhase(pi);
  paintProgress();
  save();
}

function doneCount(pi){
  let d = 0;
  PHASES[pi].items.forEach((_,ii)=>{ if(state.done[id(pi,ii)]) d++; });
  return d;
}

function paintPhase(pi){
  const sec = secs[pi]; if(!sec) return;
  const total = PHASES[pi].items.length, done = doneCount(pi);
  sec.querySelector('.ph-count').textContent = done+'/'+total;
  sec.querySelector('.ph-bar .bar span').style.width = (total ? done/total*100 : 0)+'%';
  sec.classList.toggle('complete', total > 0 && done === total);
}

function applyOpen(){
  secs.forEach((sec,pi)=>{
    const open = allOpen || state.open === pi;
    sec.classList.toggle('open', open);
    sec.classList.toggle('active', state.open === pi);
    sec.querySelector('.ph-head').setAttribute('aria-expanded', open ? 'true':'false');
  });
}

function onHead(pi){
  if(allOpen){                       /* tout est deplie : on ne referme que celle-ci */
    const sec = secs[pi];
    const open = !sec.classList.contains('open');
    sec.classList.toggle('open', open);
    sec.querySelector('.ph-head').setAttribute('aria-expanded', open ? 'true':'false');
    return;
  }
  state.open = (state.open === pi ? -1 : pi);
  applyOpen();
  paintProgress();
  save();
  if(state.open === pi) scrollPhase(pi);
}

function openPhase(pi){
  allOpen = false; syncOpenBtn();
  state.open = pi;
  applyOpen(); paintProgress(); save(); scrollPhase(pi);
}

function scrollPhase(pi){
  if(pi < 0) return;
  requestAnimationFrame(()=>{
    const sec = secs[pi]; if(!sec) return;
    const marge = (el.header ? el.header.offsetHeight : 130) + 12;
    const y = sec.getBoundingClientRect().top + window.scrollY - marge;
    window.scrollTo({top:Math.max(0,y), behavior:'smooth'});
  });
}
