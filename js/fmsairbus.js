/* ============================================================
   ONGLET FMS AIRBUS
   Tutoriel MCDU famille A320 en captures : un bandeau deroulant
   par grande etape, une capture et son texte par etape.
   Construit une seule fois, a la premiere ouverture de l'onglet.
   Jamais lu par le parseur : ne touche ni au badge, ni au dossier,
   ni a la feuille, ni aux cases.
   Depend de : data/fms_airbus.js, dom.js, render.js (esc).
============================================================ */
const FA_DOSSIER = 'img/fms-airbus/';
let faConstruit = false;

function fmsAirbusOuvert(){
  if(faConstruit) return;
  faConstruit = true;
  let n = 0;
  el.fmsAirbusBody.innerHTML = FMS_AIRBUS.map((b, i)=>{
    const etapes = b.etapes.map(([img, texte])=>{
      n++;
      const src = FA_DOSSIER + img;
      return '<li class="fa-etape">'+
        '<div class="fa-num">'+n+'</div>'+
        '<p class="fa-txt">'+esc(texte)+'</p>'+
        /* clic : la capture en pleine resolution dans un nouvel onglet */
        '<a class="fa-img" href="'+src+'" target="_blank" rel="noopener">'+
        '<img src="'+src+'" alt="Étape '+n+' : '+esc(texte)+'" loading="lazy" decoding="async"></a>'+
        '</li>';
    }).join('');
    return '<details class="fa-bloc">'+
      '<summary><span class="fa-bloc-n">'+(i+1)+'</span>'+esc(b.titre)+
      '<span class="fa-bloc-c">'+b.etapes.length+' étape'+(b.etapes.length > 1 ? 's' : '')+'</span></summary>'+
      '<ol class="fa-etapes">'+etapes+'</ol></details>';
  }).join('');
}

/* ------------------------------------------------------------
   REV 37 · VALEURS FMS DE LA FEUILLE, FAMILLE A320
   Section « ## SAISIE FMS <type> » d'un type A318 a A21N, lue dans le
   texte brut de la feuille par saisieFms (fms.js), comme l'A388 :
   ni registre, ni FIELDS, ni bandeau. Compte attendu lu dans le §2.5
   du dossier charge (« 39 lignes »), jamais ecrit ici.
------------------------------------------------------------ */
const FA_SECTION = /^## SAISIE FMS (A318|A319|A320|A321|A19N|A20N|A21N)\b/;
let faSource, faDoc;

function faAttendu(){
  if(!state.doc) return null;
  const l = state.doc.split('\n');
  const d = l.findIndex(x=> /^###\s+2\.5\b/.test(x));
  if(d < 0) return null;
  for(let k = d+1; k < l.length && !/^#{1,3}\s/.test(l[k]); k++){
    const m = l[k].match(/(\d+)\s+lignes/);
    if(m) return +m[1];
  }
  return null;
}

function paintFmsAirbusVol(){
  if(faSource === state.sheet && faDoc === state.doc) return;
  faSource = state.sheet; faDoc = state.doc;
  const s = saisieFms(state.sheet, FA_SECTION);
  el.fmsAirbusVol.innerHTML = s
    ? htmlSaisie(s, faAttendu(), 'gabarit §2.5 du dossier')
    : '<div class="empty-state">Aucune valeur FMS Airbus dans la feuille chargée.</div>';
}
