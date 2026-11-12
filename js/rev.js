/* ============================================================
   ONGLET DERNIERE REV
   Le briefing publie a cote de la page (briefing.md), a copier ou a
   telecharger en .md. Rien a publier a la main : le fichier est relu au
   serveur a chaque ouverture de l'onglet, donc pousser un nouveau
   briefing.md sur main suffit pour que l'onglet montre la nouvelle REV.
   Depend de : dom.js, render.js (esc), refs.js (md2html), ui.js (toast).
============================================================ */
/* ------------------------------------------------------------
   Le fichier n'est PAS lu par le parseur : il ne passe ni par applyDoc
   ni par extractValues, ne touche ni au badge, ni au dossier charge, ni
   a la feuille. C'est la version publiee, pas celle qu'on a chargee :
   les deux peuvent differer, et c'est voulu.
------------------------------------------------------------ */
const REV_FICHIER = './briefing.md';
let revTexte = null;

/* meme lecture que applyDoc : le premier « REV nn » du document */
function revNumero(txt){
  const m = txt.match(/REV\s*(\d+)/i);
  return m ? m[1] : null;
}

function revNomFichier(){
  const n = revTexte ? revNumero(revTexte) : null;
  return n ? 'briefing_prevol_IF_REV'+n+'.md' : 'briefing.md';
}

/* a l'ouverture de l'onglet (ui.js) : toujours redemande, jamais le cache */
async function revOuvert(){
  el.revInfo.textContent = 'Chargement de briefing.md…';
  el.revCopy.disabled = el.revDl.disabled = true;
  try{
    const r = await fetch(REV_FICHIER, {cache:'no-store'});
    if(!r.ok) throw new Error('HTTP '+r.status);
    revTexte = await r.text();
  }catch(e){
    revTexte = null;
    el.revTitle.textContent = 'Dernière REV';
    el.revInfo.textContent = 'briefing.md introuvable à côté de la page. Il se lit quand la page est servie en ligne.';
    el.revBody.innerHTML = '';
    return;
  }
  const n = revNumero(revTexte);
  el.revTitle.textContent = n ? 'Briefing · REV '+n : 'Briefing';
  const lignes = revTexte.split('\n').length;
  el.revInfo.innerHTML = '<b>'+esc(revNomFichier())+'</b> · '+lignes+' lignes · '+
    Math.round(revTexte.length/1024)+' ko';
  el.revBody.innerHTML = md2html(revTexte);
  el.revCopy.disabled = el.revDl.disabled = false;
}

/* navigator.clipboard n'existe qu'en https ou localhost : repli sur une
   zone de texte temporaire, sinon on le dit */
async function revCopier(){
  if(revTexte === null) return;
  try{
    await navigator.clipboard.writeText(revTexte);
    toast('REV copiée dans le presse-papiers');
    return;
  }catch(e){}
  const ta = document.createElement('textarea');
  ta.value = revTexte;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try{ ok = document.execCommand('copy'); }catch(e){}
  ta.remove();
  toast(ok ? 'REV copiée dans le presse-papiers' : 'Copie refusée par le navigateur : utiliser Télécharger');
}

function revTelecharger(){
  if(revTexte === null) return;
  const url = URL.createObjectURL(new Blob([revTexte], {type:'text/markdown;charset=utf-8'}));
  const a = document.createElement('a');
  a.href = url; a.download = revNomFichier();
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=> URL.revokeObjectURL(url), 1000);
  toast(revNomFichier()+' téléchargé');
}

el.revCopy.addEventListener('click', revCopier);
el.revDl.addEventListener('click', revTelecharger);
