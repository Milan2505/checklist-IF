/* ============================================================
   ONGLET A380-800 FMS · REV 33
   Affiche page_A380-800_FMS.md en lecture, quand le Type du vol est A388.
   Depend de : state.js, dom.js, render.js (esc, normType), refs.js (md2html).
============================================================ */
/* ------------------------------------------------------------
   LA CONDITION, A UN SEUL ENDROIT
   Meme mecanisme que l'ancien bloc A21N : la valeur resolue de `Type` au
   cartouche ①, normalisee, comparee par EGALITE a un seul code. Aucune cle
   au registre, aucune autre source : Type non resolu = onglet absent.

   Le fichier n'est PAS lu par le parseur. Il ne passe ni par applyDoc ni
   par extractValues : il ne remplit aucune case, ne leve aucun bandeau et
   ne touche ni au badge, ni au dossier, ni a la feuille. Il est demande au
   serveur au premier affichage, puis garde en memoire pour la session.
------------------------------------------------------------ */
const FMS_TYPE = 'A388';
const FMS_FICHIER = './page_A380-800_FMS.md';
let fmsTexte = null;

function fmsActif(){ return normType(state.values.type) === FMS_TYPE; }

/* appele a chaque changement de valeur (refreshValues) : l'onglet suit le Type */
function paintFms(){
  const on = fmsActif();
  el.btnFms.hidden = !on;
  if(!on && !el.fmsSheet.hidden) fmsFermer();
}

function fmsFermer(){
  el.fmsSheet.hidden = true;
  el.btnFms.classList.remove('on');
  el.btnFms.setAttribute('aria-expanded','false');
}

async function fmsOuvrir(){
  el.fmsSheet.hidden = false;
  el.btnFms.classList.add('on');
  el.btnFms.setAttribute('aria-expanded','true');
  if(fmsTexte !== null) return;
  el.fmsBody.innerHTML = '<div class="empty-state">Chargement de la page A380-800…</div>';
  try{
    const r = await fetch(FMS_FICHIER, {cache:'no-store'});
    if(!r.ok) throw new Error('HTTP '+r.status);
    fmsTexte = await r.text();
    el.fmsBody.innerHTML = md2html(fmsTexte);
  }catch(e){
    /* page ouverte hors serveur, ou fichier absent : le dire, ne rien inventer */
    el.fmsBody.innerHTML = '<div class="empty-state">Fichier '+esc(FMS_FICHIER.slice(2))+
      ' introuvable à côté de la page. Il se lit quand la page est servie en ligne.</div>';
  }
}

el.btnFms.addEventListener('click', ()=>{
  if(el.fmsSheet.hidden) fmsOuvrir(); else fmsFermer();
});
