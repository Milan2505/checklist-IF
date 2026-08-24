/* ============================================================
   LECTURE · 1 · REGISTRE DES CHAMPS LISIBLES
   Definit REGISTRE, IGNORE, IGNORE_EN_SECTION, REG_BY_LABEL, REQUIRED,
   et les deux controles de demarrage. Depend de : data/fields.js.
============================================================ */
/* ------------------------------------------------------------
   1 · REGISTRE DES CHAMPS LISIBLES
   Une entree par champ, une seule source de verite. Remplace LABELS
   et CARTOUCHE, qui divergeaient : un champ declare dans l'un et pas
   dans l'autre restait vide sans que rien ne le signale.

   key       cle de FIELDS
   labels    libelles acceptes, EGALITE STRICTE apres normLabel()
   kind      'int' | 'dec' | 'code' | 'text'
   required  vrai pour les 34 cellules des cinq cartouches (REV 19 §A.4)
   max       longueur maximale de la cellule (defaut 60)
   display   libelle affiche dans le bandeau
   xf        transformation optionnelle du nombre valide
------------------------------------------------------------ */
const REGISTRE = [
  /* ---- cartouche ① · identite — 3 ---- */
  { key:'callsign', labels:['callsign','atc callsign','indicatif d\'appel atc'], kind:'code', required:true, display:'Callsign' },
  { key:'airline',  labels:['airline','compagnie aerienne','compagnie'], kind:'code', required:true, display:'Compagnie' },
  { key:'type',     labels:['appareil','aircraft','type d\'aeronef','type'], kind:'text', required:true, display:'Type' },

  /* ---- cartouche ② · pistes et degagement — 6 ---- */
  { key:'piste',    labels:['depart rwy','depart runway','piste depart','piste dep.'], kind:'code', required:true, display:'Piste départ' },
  { key:'capdep',   labels:['cap depart'], kind:'int', required:true, display:'Cap départ' },
  { key:'arrpiste', labels:['arrival rwy','arrivee runway','piste arrivee','piste arr.'], kind:'code', required:true, display:'Piste arrivée' },
  { key:'degag',    labels:['alternate','alterner','degagement','airport','aeroport'], kind:'code', required:true, display:'Dégagement' },
  { key:'degcap',   labels:['cap degagement'], kind:'int', required:true, display:'Cap dégagement' },
  { key:'degdist',  labels:['distance degagement'], kind:'int', required:true, display:'Distance dégagement' },

  /* ---- cartouche ③ · vitesses et trajectoire — 14 ---- */
  { key:'v1',       labels:['v1'], kind:'int', required:true, display:'V1' },
  { key:'vr',       labels:['vr'], kind:'int', required:true, display:'VR' },
  { key:'v2',       labels:['v2'], kind:'int', required:true, display:'V2' },
  { key:'flex',     labels:['flex','flex temp'], kind:'code', required:true, display:'Flex' },
  { key:'volets',   labels:['volets','volets depart','flaps'], kind:'code', required:true, display:'Volets' },
  { key:'thrred',   labels:['reduction','thrust reduction'], kind:'int', required:true, display:'Réduction' },
  { key:'accel',    labels:['acceleration'], kind:'int', required:true, display:'Accélération' },
  { key:'trans',    labels:['transition','altitude de transition'], kind:'int', required:true, display:'Transition' },
  { key:'ils',      labels:['ils'], kind:'code', required:true, display:'ILS' },
  { key:'da',       labels:['da','decision altitude'], kind:'int', required:true, display:'DA' },
  { key:'vref',     labels:['vref'], kind:'int', required:true, display:'Vref' },
  { key:'vapp',     labels:['vapp'], kind:'int', required:true, display:'Vapp' },
  { key:'inbound',  labels:['inbound','distance inbound'], kind:'int', required:true, display:'Inbound' },
  /* "FAF 25R", "IAF STAR 26L" : un nom de point porte des espaces, donc 'text'
     et non 'code' — sinon les deux feuilles reelles seraient rejetees. */
  { key:'inbwpt',   labels:['point inbound','announce inbound'], kind:'text', max:24, required:true, display:'Point inbound' },

  /* ---- cartouche ④ · carburant — 5 ---- */
  { key:'bloc',     labels:['bloc'], kind:'int', required:true, display:'BLOC' },
  { key:'bingo',    labels:['bingo'], kind:'int', required:true, display:'BINGO' },
  { key:'mindiv',   labels:['min div'], kind:'int', required:true, display:'MIN DIV' },
  { key:'extra',    labels:['extra'], kind:'int', required:true, display:'EXTRA' },
  { key:'fuelfactor',labels:['fuel factor','facteur carburant'], kind:'code', required:true, display:'FUEL FACTOR' },

  /* ---- cartouche ⑤ · masses — 6 ---- */
  { key:'oew',      labels:['masse a vide if'], kind:'int', required:true, display:'Masse à vide IF' },
  { key:'payload',  labels:['payload','charge utile'], kind:'int', required:true, display:'Charge utile' },
  /* REV 19 a renomme ZFW en « Poids zéro carburant » : les deux formes restent
     acceptees, le §0.5 ecrit encore « Poids zéro carburant (ZFW, KG) ». */
  { key:'zfw',      labels:['zfw','poids zero carburant'], kind:'int', required:true, display:'Poids zéro carburant' },
  { key:'trip',     labels:['trip'], kind:'int', required:true, display:'Trip' },
  { key:'tow',      labels:['tow'], kind:'dec', required:true, display:'TOW' },
  { key:'lw',       labels:['lw','landing weight'], kind:'dec', required:true, display:'LW' },

  /* ---- hors cartouche : formulaire, colonne « à taper » (§A.5) ---- */
  { key:'fltnum',   labels:['flight number','numero du vol'], kind:'int',  display:'N° de vol' },
  /* 'route' n'est PAS un libelle lisible : le mot designe deux choses dans les
     fichiers (le trajet, et l'itineraire du degagement). Partir → Arriver se
     reconstruit systematiquement depuis _dep + _arr, qui sont sans ambiguite. */
  { key:'_dep',     labels:['partir','depart'], kind:'text', max:40, display:'Départ' },
  { key:'_arr',     labels:['arriver','arrive'], kind:'text', max:40, display:'Arrivée' },
  { key:'eobt',     labels:['departure time','eobt','heure de depart'], kind:'text', display:'EOBT UTC' },
  { key:'pilotid',  labels:['pilot id','identifiant du pilote'], kind:'int', display:'Pilot ID' },
  { key:'airac',    labels:['airac cycle','cycle airac'], kind:'int', display:'Cycle AIRAC' },
  { key:'pax',      labels:['passengers','passagers'], kind:'int', display:'Passagers' },
  { key:'fret',     labels:['freight','fret'], kind:'int', display:'Fret' },
  { key:'blocktime',labels:['sched block time','bloc horaire prevu'], kind:'text', max:20, display:'Bloc prévu' },
  { key:'taxitime', labels:['taxi time','taxi time (min)','taxi sortie / entree'], kind:'text', max:20, display:'Taxi' },
  { key:'fl',       labels:['altitude','altitude (feet)','altitude (pieds)'], kind:'int', display:'Croisière FL',
    xf:n => n > 1000 ? Math.round(n/100) : n },                    /* 35000 ft -> FL350 */
  { key:'rte',      labels:['selected route'], kind:'text', max:400, display:'Selected Route' },

  /* ---- §0.1 · identification et equipement ----
     Le §A.5 ne declare toujours pas ces quatre libelles a la REV 20, et c'est
     l'ordre voulu : la regle 10 veut que le parseur passe EN PREMIER — « un
     libellé ne s'ajoute a un cartouche qu'une fois inscrit au registre du
     parseur, dans cet ordre, jamais l'inverse ». Ils sont inscrits ici pour que
     le §0.1 d'une feuille remplisse ses cases ; c'est au vocabulaire du §A.5 de
     les rattraper, pas a ce registre de les attendre.
     Aucun n'entre dans un calcul : une erreur y est cosmetique.
     ⚠ 'immatriculation' reste IGNORE et n'est PAS un libelle de `immat` : ce
     mot-la vit dans les « Repères non lus », et la regle 11 interdit qu'un
     libelle declare figure dans un bloc annonce comme non lu. Seuls les
     libelles du formulaire — Inscription / Registration — sont lus. */
  { key:'immat',    labels:['inscription','registration'], kind:'code', display:'Inscription' },
  { key:'finnum',   labels:['numero fin','fin number'], kind:'code', display:'Numéro Fin' },
  { key:'selcal',   labels:['selcal'], kind:'code', display:'SELCAL' },
  { key:'modes',    labels:['code mode-s','mode-s code','mode-s'], kind:'code', display:'Code Mode-S' }
];

/* Libelles vus mais volontairement ignores : ils ne remontent ni en valeur,
   ni en "libellé non reconnu". Trois familles :
   — en-tetes et intitules de colonnes qui trainent en premiere cellule ;
   — les « repères non lus » du §A.4, en attente d'inscription au registre :
     immatriculation, altitude initiale, autobrake, route, date, MANQUE.
     Ils restent DEHORS du registre tant que la REV les y laisse : la regle 11
     interdit qu'un libelle declare figure dans un bloc annonce comme non lu ;
   — les champs du formulaire qui n'ont pas de case et dont le libelle
     pourrait se resoudre par accident. */
const IGNORE = ['poste','champ','marqueur','config','annonce','repere','libelle',
                'itineraire','immatriculation','altitude initiale',
                'autobrake','autobrake depart','autobrake arrivee',
                'route','date','manque','piste','runway','compte alternatif',
                /* §A.5 : Compagnie porte le code OACI, « jamais le nom
                   commercial » — le libelle existe donc dans les vieilles
                   feuilles, mais il n'alimente rien. */
                'nom commercial'];

/* ------------------------------------------------------------
   IGNORE CONTEXTUEL — REV 19, correctif bloquant
   « Altitude (Pieds) » est porte DEUX fois par le formulaire : le FL de
   croisiere aux Entrees facultatives, et l'elevation du terrain de degagement
   aux Aeroports alternatifs. Le libelle est identique au caractere pres, donc
   seule la SECTION peut les separer. Sans ca, « la derniere l'emporte » faisait
   remonter l'elevation du degagement a la place du niveau de croisiere, en
   silence — exactement le cas que la REV 19 signale.
------------------------------------------------------------ */
/* « degagement n° 1 » et non le mot degagement seul : un cartouche qui parle de
   degagement ne doit pas, pour autant, perdre ses autres lignes. */
const SECTION_ALTERNATE = /alternatif|alternate|degagement n/;
const IGNORE_EN_SECTION = [
  { labels:['altitude','altitude (pieds)','altitude (feet)'], section:SECTION_ALTERNATE }
];

/* index libelle -> entree. Une collision est une faute de declaration : on
   refuse de demarrer plutot que de resoudre au hasard. */
const REG_BY_LABEL = new Map();
REGISTRE.forEach(e=>{
  e.labels.forEach(l=>{
    if(REG_BY_LABEL.has(l))
      throw new Error('REGISTRE : libellé en double « '+l+' » — '+REG_BY_LABEL.get(l).key+' contre '+e.key);
    REG_BY_LABEL.set(l, e);
  });
});
const REQUIRED = REGISTRE.filter(e=>e.required);

/* controle de demarrage : une cle du registre absente de FIELDS ne remplirait
   jamais rien, en silence. C'est exactement l'oubli qui a coute BINGO et MIN DIV. */
(function(){
  const connues = FIELDS.map(f=>f[0]);
  REGISTRE.forEach(e=>{
    if(e.key.charAt(0) === '_') return;                 /* cles internes */
    if(connues.indexOf(e.key) < 0)
      console.error('REGISTRE : la clé « '+e.key+' » n\'existe pas dans FIELDS — ce champ ne sera jamais rempli.');
  });
})();
