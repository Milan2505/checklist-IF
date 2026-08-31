/* ============================================================
   LECTURE · VALIDATION D'UNE CELLULE
   Une cellule qui contient autre chose qu'une valeur est un rejet,
   jamais une matiere premiere. Depend de : parser/labels.js (digits).
============================================================ */
/* ------------------------------------------------------------
   3 · VALIDATE — remplace refine(), pickValue() disparait
   Regle non negociable : aucun /^\d+/ ni /[^\d]/g sur une cellule.
   Ce racle-tout a produit LW = 6446077.8 en collant trois nombres
   d'une meme cellule. Une cellule qui contient autre chose qu'une
   valeur est un rejet, pas une matiere premiere.
------------------------------------------------------------ */
const UNITE = /(kg|ft|kt|nm|min|°c|°)$/i;
/* MANQUE est le marqueur de non-fourni du dossier (§Conventions), pas une
   valeur : sans cette ligne il passait pour un code valide et « MANQUE »
   s'affichait dans la case ILS comme s'il s'agissait d'une frequence. */
const VIDE  = /^(auto|n\/a|na|none|laisser vide|vide|manque|\[manque\]|—|-)$/i;
/* REV 20 · nouveau marqueur [WIP], et §A.3 regle 12 : « ce qui est montre par le
   studio n'est pas ce qui vole ». Le dossier est explicite — une valeur [WIP]
   « n'entre dans aucun calcul, ne remplit aucune cellule de cartouche et ne
   franchit pas le §8 ». Elle n'est donc PAS nettoyee comme un marqueur de
   source : elle disqualifie la cellule entiere, et le refus se dit au bandeau.
   Une case vide et signalee vaut mieux qu'un chiffre dormant qui se vole. */
const WIP = /\[\s*WIP\s*\]/i;
/* REV 21 · [WIP], [MANQUE] et [RÉEL] ne sont pas dans MARQUEUR_SOURCE : le
   parseur ne les retire pas d'une cellule. Les deux premiers ont leur reponse
   au-dessus — l'un disqualifie, l'autre vaut « non fourni ». Le troisieme, et
   tout marqueur qu'une revision future ajoutera, arrivait ici sans traitement :
   accepte tel quel dans un champ texte, ou cassant un nombre avec le motif
   « cellule non atomique », qui ne dit pas ce qui s'est passe.
   La convention « ces marqueurs ne s'ecrivent que dans la PARTIE B » etait donc
   la seule barriere, et elle etait redactionnelle. Elle est ici, nommee. */
const MARQUEUR_INCONNU = /\[[^\]]*\]/;

function validate(e, raw){
  const v = (raw || '').trim();
  if(WIP.test(v)) return { ok:false, reason:'valeur [WIP] — annoncée par le studio, jamais vérifiée à l\'écran' };
  if(!v || VIDE.test(v)) return { ok:false, reason:'non fourni' };
  const mk = v.match(MARQUEUR_INCONNU);
  if(mk) return { ok:false, reason:'marqueur dans la valeur : « '+mk[0]+' » — hors des six marqueurs retirés à la lecture (§Conventions)' };
  const max = e.max || 60;
  if(v.length > max) return { ok:false, reason:'trop long ('+v.length+' car., max '+max+')' };

  /* ------------------------------------------------------------
     REV 28 · CAP — UN CODE A TROIS CHIFFRES, PAS UN NOMBRE
     `capdep` et `degcap` etaient declares 'int'. Un 'int' passe par
     parseFloat, qui mange le zero initial : « 043 » ressortait « 43 », et
     la page affichait autre chose que ce que la feuille portait. Aucune
     feuille ne l'avait montre avant U21703 — la premiere a porter un cap
     sous 100.
     Un cap ne sert a AUCUN calcul dans cette page : il se lit, il ne se
     compte pas. Il se valide donc comme un code et se rend sur trois
     chiffres, toujours.
     Genre declare, et non deux `xf` poses sur les deux entrees : le
     prochain champ de cap heritera du comportement sans qu'on y pense.
     UNITE est retire comme pour un 'int' : une feuille qui ecrit « 224° »
     etait acceptee hier, elle doit l'etre encore.
  ------------------------------------------------------------ */
  if(e.kind === 'cap'){
    const s = digits(v).replace(UNITE, '');
    if(!/^\d{1,3}$/.test(s))
      return { ok:false, reason:'cap attendu, trois chiffres au plus : « '+v+' »' };
    const n = parseInt(s, 10);
    if(n > 360) return { ok:false, reason:'cap hors plage : '+n+' — 360 au maximum' };
    return { ok:true, value:String(n).padStart(3, '0') };
  }

  if(e.kind === 'int' || e.kind === 'dec'){
    const s = digits(v).replace(UNITE, '');
    const motif = e.kind === 'int' ? /^\d+$/ : /^\d+([.,]\d+)?$/;
    if(!motif.test(s)) return { ok:false, reason:'cellule non atomique : « '+v+' »' };
    let n = parseFloat(s.replace(',', '.'));
    if(!isFinite(n)) return { ok:false, reason:'nombre illisible : « '+v+' »' };
    if(e.kind === 'dec' && n > 1000) n = Math.round(n/100)/10;      /* kg -> t */
    if(e.xf) n = e.xf(n);
    return { ok:true, value:String(n) };
  }
  if(e.kind === 'code'){
    if(!/^[A-Z0-9+.\-\/]{1,12}$/i.test(v))
      return { ok:false, reason:'code attendu, reçu « '+v+' »' };
    return { ok:true, value:v };
  }
  return { ok:true, value:v };                                      /* text */
}
