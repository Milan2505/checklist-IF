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
  /* ⚠ LIBELLE D'AFFICHAGE, PAS LIBELLE DE CELLULE. La parenthese vit dans le DOM
     et nulle part ailleurs. Recopiee comme libelle de ligne dans une feuille, elle
     rejoue le point ouvert de la regle 4 du §A.5 : le parseur la resoudrait par
     troncature a la parenthese — donc par le chemin que le dossier n'a justement
     pas tranche. Le libelle a ecrire dans un fichier reste « Compagnie aérienne ». */
  ['airline','Compagnie aérienne (code OACI)','1 · Informations sur le vol'],
  ['fltnum','Numéro du vol','1 · Informations sur le vol'],
  ['route','Partir → Arriver','1 · Informations sur le vol'],
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

  /* ---------- cartouches du §A.4 : lus par la page, pas tapes dans le formulaire ---------- */
  /* Les deux pistes restent en AUTO cote SimBrief (§0.5) : elles ne se tapent
     pas, elles se comparent — leur place est au cartouche ②. */
  /* REV 26 · les deux crans d'autobrake ont quitte les « repères non lus » :
     ils sont declares au registre du parseur, donc ils remontent, donc leur
     place est dans un cartouche (§A.3 regle 11). Ils encadrent leur phase —
     depart apres la porte de depart, arrivee apres celle d'arrivee. */
  ['piste','Piste départ','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['capdep','Cap départ','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['portedep','Porte départ','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['autobrkdep','Autobrake départ','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['arrpiste','Piste arrivée','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['portearr','Porte arrivée','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['autobrkarr','Autobrake arrivée','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['degag','Dégagement','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['degcap','Cap dégagement','Cartouche ② · pistes, portes, autobrake et dégagement'],
  ['degdist','Distance dégagement NM','Cartouche ② · pistes, portes, autobrake et dégagement'],

  ['v1','V1','Cartouche ③ · vitesses et trajectoire'],
  ['vr','VR','Cartouche ③ · vitesses et trajectoire'],
  ['v2','V2','Cartouche ③ · vitesses et trajectoire'],
  ['flex','Flex','Cartouche ③ · vitesses et trajectoire'],
  ['volets','Volets','Cartouche ③ · vitesses et trajectoire'],
  ['altinit','Altitude initiale ft','Cartouche ③ · vitesses et trajectoire'],
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
  ['tow','TOW kg','Cartouche ⑤ · masses'],
  ['lw','LW kg','Cartouche ⑤ · masses'],
];
