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
/* Le blanc qui precede l'unite part avec elle : « 250 kg » comme « 250kg ». */
const UNITE = /[\s\u00A0\u202F]*(kg|ft|kt|nm|min|°c|°)$/i;
/* ------------------------------------------------------------
   REV 30 · L'ATOMICITE SE TESTE AVANT D'ECRASER LES BLANCS
   digits() ne retire pas « l'espace de milliers » : il retire TOUS les
   blancs, ou qu'ils soient. Il etait applique AVANT le seul test
   d'atomicite, qui ne voyait donc jamais le blanc qui separait deux
   nombres : « 1 100 1 050 » ressortait « 11001050 », accepte, sans motif
   et sans bandeau. C'est la panne fondatrice decrite en tete de ce
   fichier, dans sa forme « separateur blanc » — et le refus promis par la
   regle 2 du §A.5 n'existait pas pour ce cas.
   Aggravant : cleanCell() retire marqueurs et asterisques EN PREMIER,
   donc il pouvait creer l'adjacence — « 64 460 [CALC] 77 800 ».
   La cellule doit desormais ressembler a UN SEUL nombre avant que le
   moindre blanc ne soit retire : soit une suite de chiffres sans blanc,
   soit un groupement de milliers regulier — 1 a 3 chiffres, puis des
   groupes de 3 exactement, un seul blanc entre chacun. Ce qui passait
   hier passe encore (« 6 250 », « 250 kg », « 62260 ») ; ce qui soudait
   deux nombres est refuse, sous le motif de la cellule non atomique.
   ⚠ Reste indecidable, et c'est assume : « 1 100 800 » est un groupement
   de milliers valide autant que deux nombres. Un groupement correct est
   lu comme le nombre qu'il ecrit.
------------------------------------------------------------ */
const UN_NOMBRE  = /^(?:\d+|\d{1,3}(?:[\s\u00A0\u202F]\d{3})+)$/;
const UN_DECIMAL = /^(?:\d+|\d{1,3}(?:[\s\u00A0\u202F]\d{3})+)(?:[.,]\d+)?$/;
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
/* REV 30 · le filet n'exigeait le crochet FERMANT — « [RÉEL » tronque, ou
   « (RÉEL) » entre parentheses, traversait un champ 'text' et s'affichait tel
   quel dans la case. Le crochet fermant est desormais optionnel, et une
   parenthese dont le contenu ressemble a un marqueur — deux a douze majuscules,
   accents compris — est attrapee elle aussi. La parenthese n'est prise que dans
   cette forme : une valeur qui porterait un commentaire en minuscules reste
   refusee par son genre, pas par ce filet. */
const MARQUEUR_INCONNU = /\[[^\]]*\]?|\(\s*[A-Z\u00C0-\u00DE]{2,12}\s*\)/;

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
    const s = v.replace(UNITE, '');
    if(!/^\d{1,3}$/.test(s))
      return { ok:false, reason:'cap attendu, trois chiffres au plus : « '+v+' »' };
    const n = parseInt(s, 10);
    if(n > 360) return { ok:false, reason:'cap hors plage : '+n+' — 360 au maximum' };
    return { ok:true, value:String(n).padStart(3, '0') };
  }

  if(e.kind === 'int' || e.kind === 'dec'){
    /* REV 30 · l'atomicite se teste sur la cellule AVANT que digits() n'ecrase
       les blancs — voir UN_NOMBRE en tete de fichier. digits() ne sert plus
       qu'a retirer le groupement de milliers d'un nombre deja reconnu. */
    const s = v.replace(UNITE, '');
    const motif = e.kind === 'int' ? UN_NOMBRE : UN_DECIMAL;
    if(!motif.test(s)) return { ok:false, reason:'cellule non atomique : « '+v+' »' };
    let n = parseFloat(digits(s).replace(',', '.'));
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
