/* ============================================================
   DONNEES · CHAMPS DU PANNEAU « VALEURS DU VOL »
   Definit FIELDS. Aucune dependance.
   Lu par : values.js (construction du panneau), alert.js (remplissage),
   parser/registre.js (controle de demarrage), ui.js (remise a zero).
============================================================ */
/* ============================================================
   CONTENU — tire du BRIEFING PRE-VOL INFINITE FLIGHT, REV 20
   t : ligne de checklist · d : detail · r : renvoi · w : point de vigilance
   wip : ligne dormante, tiree d'une capture du studio et jamais verifiee a
   l'ecran (REV 20, §A.3 regle 12). Elle s'affiche, elle ne conclut rien.
   {{cle}} : valeur du vol, saisie dans le panneau Valeurs
============================================================ */
/* [cle, libelle, groupe] — depuis la REV 19 : le panneau suit d'abord l'ORDRE DE LA PAGE
   SimBrief (§0.2 Vol → §0.3 Avion → §0.1 Plus d'options → §0.4 Sélections →
   §0.5 Facultatives → §0.6 Carburant → §0.7 Texte → §0.8 Itinéraire →
   §0.9 Alternatifs). Ce qui se tape dans le formulaire passe donc en premier,
   dans l'ordre ou on le tape ; les cartouches du §A.4 viennent derriere.
   Les libelles sont ceux du formulaire francais, pas des abreviations. */
const FIELDS = [
  /* ---------- ce qui se tape dans SimBrief, dans l'ordre de la page ---------- */
  ['airline','Compagnie aérienne (code OACI)','1 · Informations sur le vol'],
  ['fltnum','Numéro du vol','1 · Informations sur le vol'],
  ['route','Partir → Arriver','1 · Informations sur le vol'],
  ['degag','Alterner','1 · Informations sur le vol'],
  ['eobt','Heure de départ (EOBT)','1 · Informations sur le vol'],

  ['type','Type d\'aéronef','2 · Informations sur l\'avion'],
  ['callsign','Indicatif d\'appel ATC','2 · Informations sur l\'avion'],

  /* §0.1 — les neuf de « Plus d'options ». Les quatre chaines d'equipement
     (SDFGHRWY, LB1, PBN, Article 18) sont invariantes : elles sont ecrites en
     clair dans la ligne de checklist, pas ici. */
  ['fuelfactor','Facteur carburant','3 · Plus d\'options'],
  ['immat','Inscription','3 · Plus d\'options'],
  ['finnum','Numéro Fin','3 · Plus d\'options'],
  ['selcal','SELCAL','3 · Plus d\'options'],
  ['modes','Code Mode-S','3 · Plus d\'options'],

  ['airac','Cycle AIRAC','4 · Sélections'],
  ['taxitime','Taxi Sortie / Entrée','4 · Sélections'],

  ['blocktime','Bloc horaire prévu','5 · Entrées facultatives'],
  ['fl','Altitude (Pieds) — FL','5 · Entrées facultatives'],
  ['pax','Passagers','5 · Entrées facultatives'],
  ['fret','Fret kg','5 · Entrées facultatives'],
  ['payload','Charge utile kg','5 · Entrées facultatives'],
  ['zfw','Poids zéro carburant kg','5 · Entrées facultatives'],

  ['extra','EXTRA kg','6 · Planification du carburant'],

  ['pilotid','Identifiant du pilote','7 · Entrées de texte'],

  ['rte','Selected Route','8 · Itinéraire'],

  ['degcap','Cap dégagement','9 · Aéroports alternatifs'],
  ['degdist','Distance dégagement NM','9 · Aéroports alternatifs'],

  /* ---------- cartouches du §A.4 : lus par la page, pas tapes dans le formulaire ---------- */
  /* Les deux pistes restent en AUTO cote SimBrief (§0.5) : elles ne se tapent
     pas, elles se comparent — leur place est au cartouche ②. */
  ['piste','Piste départ','Cartouche ② · pistes et portes'],
  ['capdep','Cap départ','Cartouche ② · pistes et portes'],
  ['portedep','Porte départ','Cartouche ② · pistes et portes'],
  ['arrpiste','Piste arrivée','Cartouche ② · pistes et portes'],
  ['portearr','Porte arrivée','Cartouche ② · pistes et portes'],

  ['v1','V1','Cartouche ③ · vitesses et trajectoire'],
  ['vr','VR','Cartouche ③ · vitesses et trajectoire'],
  ['v2','V2','Cartouche ③ · vitesses et trajectoire'],
  ['flex','Flex','Cartouche ③ · vitesses et trajectoire'],
  ['volets','Volets','Cartouche ③ · vitesses et trajectoire'],
  ['thrred','Réduction ft','Cartouche ③ · vitesses et trajectoire'],
  ['accel','Accélération ft','Cartouche ③ · vitesses et trajectoire'],
  ['trans','Transition ft','Cartouche ③ · vitesses et trajectoire'],
  ['ils','ILS','Cartouche ③ · vitesses et trajectoire'],
  ['da','DA ft','Cartouche ③ · vitesses et trajectoire'],
  ['vref','Vref kt','Cartouche ③ · vitesses et trajectoire'],
  ['vapp','Vapp kt','Cartouche ③ · vitesses et trajectoire'],
  ['inbound','Inbound NM','Cartouche ③ · vitesses et trajectoire'],
  ['inbwpt','Point inbound','Cartouche ③ · vitesses et trajectoire'],

  ['bloc','BLOC kg','Cartouche ④ · carburant'],
  ['bingo','BINGO kg','Cartouche ④ · carburant'],
  ['mindiv','MIN DIV kg','Cartouche ④ · carburant'],

  ['oew','Masse à vide IF kg','Cartouche ⑤ · masses'],
  ['trip','Trip kg','Cartouche ⑤ · masses'],
  ['tow','TOW t','Cartouche ⑤ · masses'],
  ['lw','LW t','Cartouche ⑤ · masses'],

  /* Repères non lus (§A.4) : hors registre, saisis a la main, jamais extraits. */
  ['autobrkdep','Autobrake départ','Repères non lus'],
  ['autobrkarr','Autobrake arrivée','Repères non lus'],
  ['altinit','Altitude initiale ft','Repères non lus']
];
