/* ============================================================
   ONGLET A380-800 FMS · REV 33
   Affiche page_A380-800_FMS.md en lecture, quel que soit le type du vol.
   Depend de : state.js, dom.js, render.js (esc), refs.js (md2html).
============================================================ */
/* ------------------------------------------------------------
   REV 33 · L'ONGLET EST VISIBLE EN PERMANENCE
   Il n'etait affiche que quand `Type` valait A388 ; il l'est desormais
   pour tous les types, et meme sans feuille chargee. Aucune cle au registre.

   Le fichier n'est PAS lu par le parseur. Il ne passe ni par applyDoc ni
   par extractValues : il ne remplit aucune case, ne leve aucun bandeau et
   ne touche ni au badge, ni au dossier, ni a la feuille. Il est demande au
   serveur au premier affichage, puis garde en memoire pour la session.
------------------------------------------------------------ */
const FMS_FICHIER = './page_A380-800_FMS.md';
let fmsTexte = null;

function fmsActif(){ return true; }

/* appele a chaque changement de valeur (refreshValues) */
function paintFms(){
  const on = fmsActif();
  el.btnFms.hidden = !on;
  if(!on) fermerOnglet(el.btnFms);
}

/* a l'ouverture de l'onglet (ui.js) : la page est demandee une seule fois.
   L'ouverture, la fermeture et la surbrillance passent par ONGLETS, comme
   pour Valeurs du vol : aucun etat propre a cet onglet. */
async function fmsOuvert(){
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
