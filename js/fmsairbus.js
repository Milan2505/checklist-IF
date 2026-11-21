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
