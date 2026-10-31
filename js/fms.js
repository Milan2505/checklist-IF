/* ============================================================
   ONGLET A380-800 FMS · REV 33
   En tete, les valeurs FMS de la feuille chargee ; dessous, repliee,
   page_A380-800_FMS.md en lecture. Visible quel que soit le type du vol.
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
  paintFmsVol();
}

/* ------------------------------------------------------------
   EN TETE · CE QU'ON TAPE POUR CE VOL
   La feuille du vol porte une section « ## SAISIE FMS A388 » : un tableau
   Page FMS | Champ | Saisie, puis de la prose. Elle est lue ICI, dans le
   texte brut de la feuille, et nulle part ailleurs : ni registre, ni
   FIELDS, ni validation, ni bandeau. Le parseur des cartouches ignore deja
   ce tableau a trois colonnes, sans rien signaler.
------------------------------------------------------------ */
const FMS_SECTION = '## SAISIE FMS A388';
let fmsSource;                      /* feuille deja rendue : on ne relit pas a chaque frappe */

function saisieFms(txt){
  if(!txt) return null;
  const lignes = txt.split('\n').map(l=> l.replace(/\r$/,''));
  const debut = lignes.findIndex(l=> l.indexOf(FMS_SECTION) === 0);
  if(debut < 0) return null;
  let fin = lignes.length;
  for(let k = debut+1; k < lignes.length; k++){
    if(/^#{1,2}\s/.test(lignes[k])){ fin = k; break; }
  }
  const corps = lignes.slice(debut+1, fin);
  const cells = r => r.trim().replace(/^\||\|$/g,'').split('|').map(c=> c.trim());
  const t = corps.findIndex(l=> /^\s*\|/.test(l));
  if(t < 0) return null;
  const rows = [];
  let k = t + 2;                    /* en-tete, puis ligne de separation */
  while(k < corps.length && /^\s*\|/.test(corps[k])){
    const c = cells(corps[k]);
    if(c.length >= 3) rows.push({ page:c[0], champ:c[1], saisie:c[2] });
    k++;
  }
  const apres = corps.slice(k).filter(l=> !/^\s*---+\s*$/.test(l)).join('\n').trim();
  return rows.length ? { rows:rows, apres:apres } : null;
}

/* Trois styles, lus dans la cellule Saisie de CE tableau seulement :
   « contrôle : X » se compare sans se retaper, « vide » se laisse vide,
   tout le reste se tape et reste en evidence. */
const FMS_CONTROLE = /^contrôle\s*:\s*/;
function saisieDd(v){
  if(FMS_CONTROLE.test(v))
    return '<dd class="ctl"><span class="fms-tag">contrôle</span>'+esc(v.replace(FMS_CONTROLE,''))+'</dd>';
  if(v === 'vide') return '<dd class="vide">laisser vide</dd>';
  return '<dd>'+esc(v)+'</dd>';
}

/* REV 34 · nombre de lignes attendu, lu dans la phrase du §15 de la page de
   methode (« 79 lignes »), jamais ecrit ici. Page pas encore chargee, ou
   phrase introuvable : null, et aucun ecart n'est signale faute de reference. */
function fmsAttendu(){
  if(!fmsTexte) return null;
  const l = fmsTexte.split('\n');
  const d = l.findIndex(x=> /^##\s+15\./.test(x));
  if(d < 0) return null;
  for(let k = d+1; k < l.length && !/^#{1,2}\s/.test(l[k]); k++){
    const m = l[k].match(/(\d+)\s+lignes/);
    if(m) return +m[1];
  }
  return null;
}

function compteFms(n){
  const att = fmsAttendu();
  return '<div class="fms-compte">'+n+' ligne'+(n > 1 ? 's' : '')+
    (att !== null && n !== att ? ' <span class="fms-ecart">attendu : '+att+' (gabarit §15)</span>' : '')+
    '</div>';
}

function paintFmsVol(){
  if(fmsSource === state.sheet) return;
  fmsSource = state.sheet;
  const s = saisieFms(state.sheet);
  if(!s){
    el.fmsVol.innerHTML = '<div class="empty-state">Aucune valeur FMS dans la feuille chargée.</div>';
    return;
  }
  /* groupe par page FMS, dans l'ordre ou le tableau les donne */
  const pages = [], parPage = {};
  s.rows.forEach(r=>{
    if(!parPage[r.page]){ parPage[r.page] = []; pages.push(r.page); }
    parPage[r.page].push(r);
  });
  el.fmsVol.innerHTML =
    '<div class="fms-vol-t">À taper pour ce vol</div>'+
    compteFms(s.rows.length)+
    pages.map(p=>
      '<div class="fms-page"><div class="fms-page-t">'+esc(p)+'</div><dl class="fms-lignes">'+
      parPage[p].map(r=> '<dt>'+esc(r.champ)+'</dt>'+saisieDd(r.saisie)).join('')+
      '</dl></div>').join('')+
    (s.apres ? '<div class="md fms-note">'+md2html(s.apres)+'</div>' : '');
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
    fmsSource = undefined; paintFmsVol();   /* le compte attendu est maintenant connu */
  }catch(e){
    /* page ouverte hors serveur, ou fichier absent : le dire, ne rien inventer */
    el.fmsBody.innerHTML = '<div class="empty-state">Fichier '+esc(FMS_FICHIER.slice(2))+
      ' introuvable à côté de la page. Il se lit quand la page est servie en ligne.</div>';
  }
}
