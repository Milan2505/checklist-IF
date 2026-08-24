/* ============================================================
   ETAT, STOCKAGE ET SAUVEGARDE
   Definit KEY / DOC_KEY / SHEET_KEY, state, store, load(), save(),
   flush() et id(). Utilise toast() (ui.js) au moment de l'appel.
============================================================ */
/* ============================================================
   ETAT ET STOCKAGE
   Progression et valeurs dans une cle, briefing dans une autre :
   un dossier volumineux ne peut plus faire perdre le vol en cours.
   Repli automatique : hote -> localStorage -> memoire de session.
============================================================ */
const KEY = 'if-checklist-v1';
const DOC_KEY = 'if-checklist-doc-v1';
const SHEET_KEY = 'if-checklist-sheet-v1';

let state = { done:{}, values:{}, auto:{}, open:0,
              doc:null, rev:null,          /* dossier de reference */
              sheet:null, sheetRev:null, sheetCallsign:null }; /* feuille du vol */
let allOpen = false, memoryOnly = false, docDirty = false, sheetDirty = false;

const store = (function(){
  const host = (window.storage && typeof window.storage.get === 'function') ? window.storage : null;
  let useHost = !!host;
  function ls(){ try{ return window.localStorage; }catch(e){ return null; } }
  return {
    async get(k){
      if(useHost){
        try{ const r = await host.get(k); return (r && r.value != null) ? r.value : null; }
        catch(e){ useHost = false; }
      }
      const s = ls(); return s ? s.getItem(k) : null;
    },
    async set(k,v){
      if(useHost){
        try{ await host.set(k,v); return; }
        catch(e){ useHost = false; }
      }
      const s = ls();
      if(!s) throw new Error('stockage indisponible');
      s.setItem(k,v);
    },
    async remove(k){
      if(useHost){ try{ await host.set(k,''); return; }catch(e){ useHost = false; } }
      const s = ls(); if(s) s.removeItem(k);
    }
  };
})();

/* on n'adopte que ce qui a le bon type : un stockage abime ne casse pas la page */
function adopt(o){
  if(!o || typeof o !== 'object') return;
  if(o.done   && typeof o.done   === 'object') state.done   = Object.assign({}, o.done);
  if(o.values && typeof o.values === 'object') state.values = Object.assign({}, o.values);
  if(o.auto   && typeof o.auto   === 'object') state.auto   = Object.assign({}, o.auto);
  if(typeof o.open === 'number') state.open = o.open;
  if(typeof o.rev  === 'string') state.rev  = o.rev;
  if(typeof o.sheetRev === 'string') state.sheetRev = o.sheetRev;
  if(typeof o.sheetCallsign === 'string') state.sheetCallsign = o.sheetCallsign;
  /* ancienne version : le briefing vivait dans la meme cle */
  if(typeof o.doc === 'string' && o.doc){ state.doc = o.doc; docDirty = true; }
  if(typeof o.sheet === 'string' && o.sheet){ state.sheet = o.sheet; sheetDirty = true; }
}

async function load(){
  try{
    const raw = await store.get(KEY);
    if(raw) adopt(JSON.parse(raw));
  }catch(e){ /* premiere ouverture, ou stockage indisponible */ }
  try{
    const doc = await store.get(DOC_KEY);
    if(doc) state.doc = doc;
    const sheet = await store.get(SHEET_KEY);
    if(sheet) state.sheet = sheet;
  }catch(e){ /* le bouton Charger reste la */ }
}

let saveTimer = null;
function save(){ clearTimeout(saveTimer); saveTimer = setTimeout(flush, 250); }

async function flush(){
  clearTimeout(saveTimer); saveTimer = null;
  try{
    await store.set(KEY, JSON.stringify({
      done:state.done, values:state.values, auto:state.auto, open:state.open,
      rev:state.rev, sheetRev:state.sheetRev, sheetCallsign:state.sheetCallsign
    }));
  }catch(e){
    if(!memoryOnly){ memoryOnly = true; toast("Progression gardée pour cette session seulement"); }
    return;
  }
  if(docDirty){
    docDirty = false;
    try{
      if(state.doc) await store.set(DOC_KEY, state.doc);
      else await store.remove(DOC_KEY);
    }catch(e){
      /* dossier trop lourd pour le stockage : on le garde en memoire,
         la progression, elle, vient d'etre ecrite */
      try{ await store.remove(DOC_KEY); }catch(e2){}
      toast("Dossier gardé pour cette session seulement");
    }
  }
  if(sheetDirty){
    sheetDirty = false;
    try{
      if(state.sheet) await store.set(SHEET_KEY, state.sheet);
      else await store.remove(SHEET_KEY);
    }catch(e){
      try{ await store.remove(SHEET_KEY); }catch(e2){}
      toast("Feuille gardée pour cette session seulement");
    }
  }
}

/* une case cochee juste avant de fermer l'onglet ne se perd pas */
function flushNow(){ if(saveTimer) flush(); }
window.addEventListener('pagehide', flushNow);
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState === 'hidden') flushNow(); });

const id = (p,i)=> p+'-'+i;
