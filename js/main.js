/* ============================================================
   DEMARRAGE
   Charge le briefing publie a cote de la page, puis monte l'interface.
   Doit etre le dernier script charge.
============================================================ */
/* ============================================================
   DEMARRAGE
============================================================ */
/* le briefing publie a cote de la page se charge seul, sans rien toucher */
async function tryFetch(nom){
  try{
    const r = await fetch(nom, {cache:'no-store'});
    if(!r.ok) return null;
    const txt = await r.text();
    return /BRIEFING/i.test(txt) ? txt : null;
  }catch(e){ return null; }   /* page ouverte hors serveur : le bouton reste la */
}
async function autoLoad(){
  /* Noms canoniques, sans numero de revision : la revision se lit DANS le
     document (le badge l'affiche), pas dans le nom du fichier. Un seul nom
     stable evite de sonder une dizaine de variantes a chaque ouverture. */
  if(!state.doc){
    const t = await tryFetch('./briefing.md');
    if(t) announceDoc(applyDoc(t));
  }
  if(!state.sheet){
    const t = await tryFetch('./feuille.md');
    if(t) announceDoc(applyDoc(t));
  }
}

(async function(){
  await load();
  paintBadge();
  buildNodes();
  buildValues();
  syncOpenBtn();
  render();
  paintPorts();
  validateSheet();          /* la feuille restaurée du stockage se revalide */
  await autoLoad();
})();
