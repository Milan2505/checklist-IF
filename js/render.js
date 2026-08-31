/* ============================================================
   RENDU DE LA CHECKLIST
   Pastilles de valeurs ({{cle}}), construction des phases, cochage,
   depliage et defilement. Depend de : data/phases.js, state.js, dom.js.
   Appelle paintProgress() (progress.js), markRefs() et toggleRef() (refs.js).
============================================================ */
/* ============================================================
   RENDU
============================================================ */
function esc(s){
  return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* ------------------------------------------------------------
   NIL — UNE DONNEE QUI N'A JAMAIS EXISTE N'EST PAS UN RELEVE
   §A.5 regle 7 : ce qui ne peut pas etre estime s'ecrit `NIL`, valeur nue.
   Elle est REMPLIE — elle ne se confond donc jamais avec une case vide, qui
   dit qu'on n'a pas rempli — mais elle ne doit pas se lire comme un chiffre
   releve. Le mot reste ecrit tel quel : SEUL son habillage change, et la
   difference doit se voir sans lire. Casse indifferente.
   Une seule definition : le panneau Valeurs, les pastilles de la checklist et
   le panneau d'identite marquent EXACTEMENT la meme chose.
------------------------------------------------------------ */
function estNil(v){ return /^nil$/i.test(String(v == null ? '' : v).trim()); }

/* {{cle}} devient une pastille reperable, mise a jour sans reconstruire la liste */
const PLACEHOLDER = /\{\{(\w+)\}\}/g;
function valSpan(k){
  const v = (state.values[k]||'').trim();
  return '<span class="val'+(v?'':' empty')+(estNil(v)?' nil':'')+'" data-k="'+esc(k)+'">'+
         esc(v||'___')+'</span>';
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
    node.classList.toggle('nil', estNil(v));
  });
  /* Le Type vient de changer de camp : le deroule n'est plus le meme.
     C'est le SEUL endroit ou l'affichage d'un bloc se decide, et il ne se
     decide que sur la signature ci-dessous — pas sur la frappe. */
  if(blocSignature() !== blocSig) render();
  paintPorts();                    /* les blocs aéroport suivent les mêmes valeurs */
}

/* ------------------------------------------------------------
   BLOCS CONDITIONNES — LA DECISION, A UN SEUL ENDROIT
   Une seule question : la valeur resolue de `Type` au cartouche ①,
   normalisee, comparee aux codes portes par BLOCS_TYPE (data/phases.js).
   Aucun code type n'est ecrit ailleurs dans la page : un second bloc
   specifique s'ajoute a CETTE table, il ne se greffe pas ici.
------------------------------------------------------------ */
function normType(v){
  return String(v == null ? '' : v).toUpperCase().replace(/[^A-Z0-9]/g,'');
}
function blocActif(bloc){
  const b = BLOCS_TYPE.filter(x=> x.bloc === bloc)[0];
  if(!b) return false;                       /* bloc inconnu : jamais affiche */
  const t = normType(state.values.type);
  if(!t) return false;                       /* Type non resolu : aucun bloc specifique */
  return b.types.some(c=> normType(c) === t);
}
function itemVisible(it){ return !it.bloc || blocActif(it.bloc); }
function totalCount(pi){
  let n = 0;
  PHASES[pi].items.forEach(it=>{ if(itemVisible(it)) n++; });
  return n;
}
function phaseVisible(pi){ return totalCount(pi) > 0; }
function visiblePhases(){
  const out = [];
  PHASES.forEach((_,pi)=>{ if(phaseVisible(pi)) out.push(pi); });
  return out;
}
/* la frappe dans « Type » ne redessine pas la page a chaque lettre :
   seul le passage d'un bloc d'un etat a l'autre le fait */
function blocSignature(){
  return BLOCS_TYPE.filter(b=> blocActif(b.bloc)).map(b=> b.bloc).join('|') +
         (normType(state.values.type) ? '' : ' · type non résolu');
}
let blocSig = null;

/* Un bloc qui ne s'affiche pas doit DIRE pourquoi : une section qui
   disparait en silence est le defaut le plus couteux de la chaine. */
function blocTrace(){
  const t = (state.values.type || '').trim();
  const lignes = BLOCS_TYPE.map(b=>{
    const on = blocActif(b.bloc);
    return {
      bloc: b.bloc,
      nom: b.nom,
      active_par: b.types.length ? b.types.join(' · ') : '— (section dormante)',
      affiche: on ? 'oui' : 'non',
      motif: on ? 'Type = '+t
           : !normType(t) ? 'Type non résolu — un type inconnu n\'active jamais un bloc spécifique'
           : !b.types.length ? 'aucun code ne l\'active : la section attend une observation'
           : 'Type = '+t+', attendu '+b.types.join(' ou '),
      lignes: PHASES.reduce((n,ph)=> n + ph.items.filter(it=> it.bloc === b.bloc).length, 0)
    };
  });
  console.log('%cBlocs conditionnés · Type lu au cartouche ① : '+(t || '— non résolu'),
              'font-weight:bold;color:#9D8CFF');
  console.table(lignes);
  return lignes;
}
window.debugBlocs = blocTrace;

const secs = [];   /* une section par phase ; une phase masquee laisse un trou */

function render(){
  const frag = document.createDocumentFragment();
  secs.length = 0;
  blocSig = blocSignature();       /* ce rendu-ci reflete cette signature */
  blocTrace();
  buildNodes();                    /* le profil suit les phases reellement affichees */
  let ord = 0;

  PHASES.forEach((ph,pi)=>{
    secs[pi] = null;
    if(!phaseVisible(pi)) return;  /* phase entierement conditionnee, hors condition */
    ord++;

    const sec = document.createElement('section');
    sec.className = 'phase';
    sec.dataset.p = pi;

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'ph-head';
    head.id = 'ph-head-'+pi;
    head.setAttribute('aria-controls', 'ph-body-'+pi);
    head.innerHTML =
      '<span class="ph-idx">'+String(ord).padStart(2,'0')+'</span>'+
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

    /* L'INDICE `ii` RESTE CELUI DU TABLEAU COMPLET, jamais celui de
       l'affichage : la cle de progression d'une ligne ne bouge pas selon
       qu'un bloc est actif ou non. */
    ph.items.forEach((it,ii)=>{
      if(!itemVisible(it)) return;
      const on = !!state.done[id(pi,ii)];
      const row = document.createElement('div');
      row.className = 'item' + (on?' done':'') + (it.w?' warn':'') +
                      (it.wip?' wip':'') + (it.hd?' sub':'');
      row.dataset.p = pi; row.dataset.i = ii;
      row.setAttribute('role','checkbox');
      row.setAttribute('aria-checked', on?'true':'false');
      row.tabIndex = 0;
      row.innerHTML =
        '<span class="box" aria-hidden="true"></span>'+
        '<span class="it-txt"><span class="it-t">'+
          (it.o ? '<span class="it-ord">'+esc(it.o)+'</span>' : '')+
          inject(it.t)+
          (it.wip ? '<span class="it-wip">WIP</span>' : '')+
          srcTags(it.src)+'</span>'+
          (it.d ? '<span class="it-d">'+inject(it.d)+'</span>' : '')+
        '</span>'+
        (it.r ? '<button type="button" class="ref" data-ref="'+esc(it.r)+'"'+
                ' aria-expanded="false" id="ref-'+pi+'-'+ii+'" aria-controls="sec-'+pi+'-'+ii+'"'+
                ' aria-label="Déplier la section '+esc(it.r)+' du briefing">§'+esc(it.r)+'</button>' : '');
      body.appendChild(row);

      /* Le texte de la section se déroule ICI, sous sa ligne, et non par-dessus
         la page : on lit l'étape et son renvoi d'un seul regard. Le panneau naît
         vide — refs.js le remplit au premier dépliage (toggleRef). */
      if(it.r){
        const sec = document.createElement('div');
        sec.className = 'sec md';
        sec.id = 'sec-'+pi+'-'+ii;
        sec.setAttribute('role','region');
        sec.setAttribute('aria-labelledby','ref-'+pi+'-'+ii);
        sec.hidden = true;
        body.appendChild(sec);
      }
    });

    sec.appendChild(body);
    frag.appendChild(sec);
    secs[pi] = sec;
  });

  el.phases.innerHTML = '';
  el.phases.appendChild(frag);
  applyOpen();
  PHASES.forEach((_,pi)=> paintPhase(pi));
  paintProgress();
  markRefs();
}

/* Marqueur de source, en clair sur la ligne : une ligne empruntee a
   l'Airbus reel ou jamais vue a l'ecran ne se confond pas avec une ligne
   relevee dans le simulateur. Meme vocabulaire que le §A.5. */
const SRC_CLASS = { 'WIP':'t-wip', 'MANQUE':'t-manque', 'RÉEL':'t-reel', 'SIM':'t-sim' };
function srcTags(src){
  if(!src || !src.length) return '';
  return src.map(s=>'<span class="it-tag '+(SRC_CLASS[s]||'')+'">'+esc(s)+'</span>').join('');
}

/* un seul ecouteur pour toute la liste : rien a rebrancher a chaque redessin */
el.phases.addEventListener('click', e=>{
  const ref = e.target.closest('.ref');
  if(ref){ toggleRef(ref); return; }
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

/* une ligne hors condition n'est ni affichee, ni comptee : ni au total de
   sa phase, ni a la progression generale */
function doneCount(pi){
  let d = 0;
  PHASES[pi].items.forEach((it,ii)=>{ if(itemVisible(it) && state.done[id(pi,ii)]) d++; });
  return d;
}

function paintPhase(pi){
  const sec = secs[pi]; if(!sec) return;
  const total = totalCount(pi), done = doneCount(pi);
  sec.querySelector('.ph-count').textContent = done+'/'+total;
  sec.querySelector('.ph-bar .bar span').style.width = (total ? done/total*100 : 0)+'%';
  sec.classList.toggle('complete', total > 0 && done === total);
}

function applyOpen(){
  secs.forEach((sec,pi)=>{
    if(!sec) return;                 /* phase hors condition : rien a ouvrir */
    const open = allOpen || state.open === pi;
    sec.classList.toggle('open', open);
    sec.classList.toggle('active', state.open === pi);
    sec.querySelector('.ph-head').setAttribute('aria-expanded', open ? 'true':'false');
  });
}

function onHead(pi){
  if(allOpen){                       /* tout est deplie : on ne referme que celle-ci */
    const sec = secs[pi]; if(!sec) return;
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
