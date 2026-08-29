/* ============================================================
   DONNEES · CONTENU DE LA CHECKLIST
   Definit PHASES : les phases de vol et leurs lignes.
   Aucune dependance. Lu par : render.js, progress.js, refs.js.
============================================================ */

/* ------------------------------------------------------------
   BLOCS CONDITIONNES — UNE SEULE SOURCE DE VERITE
   Un item qui porte `bloc:'X'` n'existe dans le deroule que si le bloc X
   est actif. Hors condition il n'est ni affiche, ni compte : ni au total
   de sa phase, ni a la progression generale.

   `types` porte les codes qui activent le bloc, et RIEN d'autre ne les
   porte : le jour ou un second bloc specifique arrive, il s'ajoute A CETTE
   TABLE — il ne se greffe pas sur une condition ecrite ailleurs.

   Une liste `types` VIDE est une section dormante au sens strict : aucun
   type ne l'active, elle attend d'etre reveillee par une observation. Le
   §6.7 est dans ce cas — le mode n'existe dans aucun build connu. C'est le
   meme mecanisme que le bloc de type, pas un second.

   Type non resolu = aucun bloc actif. Un type inconnu n'active jamais un
   bloc specifique, et la trace le dit (voir blocTrace() dans render.js).
------------------------------------------------------------ */
const BLOCS_TYPE = [
  { bloc:'7.0.A', nom:'A321neo · mise en route', types:['A21N'] },
  { bloc:'6.7',   nom:'approche automatique',    types:[] }
];
const PHASES = [
  { n:"Feuille SimBrief", s:"Le formulaire, dans l'ordre de la page", items:[
    {t:"Aircraft Health consulté avant de générer l'OFP", d:"Condition, risque de panne, puissance de freinage. Un appareil usé change la distance d'atterrissage, donc la piste, donc le dégagement. Tout relevé antérieur au 21/08/2026 est périmé : jusqu'au build 18308 l'usure des freins était comptée en vol ET à l'arrêt, les appareils affichaient une dégradation qu'ils n'avaient pas méritée.", r:"7", w:1},
    {t:"Trous du type volé regardés avant de choisir l'appareil", d:"VFE, table Vref et limite de tail strike : relevées sur A318/A319/A320, manquantes sur A321 et A330-900neo. Un vol sur ces deux types part avec une Vref calculée sur une pente non vérifiée et sans marge d'assiette connue — c'est un point d'arrêt, pas une réserve.", r:"6", w:1},

    /* §0.1 — Informations sur le vol */
    {t:"1 · Informations sur le vol", d:"Compagnie aérienne en OACI trois lettres, Numéro du vol, Partir · Arriver, Heure de départ en UTC. {{airline}} {{fltnum}} · {{route}} · {{eobt}}.", r:"0.1"},
    {t:"Alterner : le dégagement nommé", d:"Jamais AUTO — c'est le terrain à briefer, il doit tenir la météo de l'ETA, pas seulement les critères de distance. {{degag}} · {{degcap}}° · {{degdist}} NM.", r:"0.1", w:1},

    /* §0.2 — Informations sur l'avion */
    {t:"2 · Informations sur l'avion", d:"Type d'aéronef dans la variante exacte volée dans IF, Variante ou cellule au générique du type, Indicatif d'appel ATC identique à celui tapé dans IF. Les trois profils restent en AUTO. {{type}} · {{callsign}}.", r:"0.2", w:1},

    /* §0.2 bis — les neuf de Plus d'options, repliés sous l'Indicatif d'appel ATC */
    {t:"3 · « Plus d'options » déplié, les neuf champs remplis", d:"Facteur carburant {{fuelfactor}} · Inscription {{immat}} · Numéro Fin {{finnum}} · SELCAL {{selcal}} · Code Mode-S {{modes}}. Le bouton bascule en « Moins d'options » une fois déplié.", r:"0.2 bis", w:1},
    {t:"Les quatre chaînes d'équipement tapées en clair", d:"Équipement de l'OACI SDFGHRWY · Transpondeur LB1 · Capacité PBN A1B1C1D1L1O1S1 · Article 18 DAT/V RMK/SIMBRIEF. Le texte gris n'est pas un exemple : c'est ce que SimBrief appliquerait. On le tape à l'identique pour que la valeur soit écrite, donc vérifiable.", r:"0.2 bis", w:1},
    {t:"Aucune case laissée à sa valeur de démonstration", d:"N999SB, 999, ABCD et ZZZZZZ sont des amorces. Les garder produit un plan de vol au nom d'un appareil qui n'existe pas. Numéro Fin = trois derniers de l'immat ; SELCAL = quatre lettres entre A et S sans I, N ni O, deux paires croissantes.", r:"0.2 bis", w:1},
    {t:"Boutons « Constructeur » laissés tranquilles", d:"Ils composent la chaîne à partir des équipements cochés. Jamais par défaut : seulement si le vol exige une capacité que la chaîne standard ne déclare pas — RNP AR, CPDLC océanique, MNPS. Une chaîne modifiée se recopie au §9, sinon elle est perdue.", r:"0.2 bis"},

    /* §0.3 — Sélections */
    {t:"4 · Sélections vérifiées", d:"LIDO · Kilograms · Detailed · Taxi Sortie/Entrée 20/8 · IFR · Scheduled · Compte alternatif 1. Taxi retenu {{taxitime}}.", r:"0.3"},
    {t:"Les six interrupteurs sur ON", d:"Journal de navigation détaillé, Planification ETOPS, Planifier les escaliers, Analyse de la piste, Inclure les NOTAM, NOTAM FIR. En éteindre un rouvre un trou que rien ne comble.", r:"0.3", w:1},
    {t:"Fenêtre AIRAC vérifiée", d:"Un cycle en avance sur la base d'IF fait refuser un waypoint à l'import. Cycle {{airac}}.", r:"0.3"},

    /* §0.4 — Entrées facultatives */
    {t:"5 · Entrées facultatives chiffrées", d:"Bloc horaire prévu {{blocktime}} · Altitude (Pieds) {{fl}} en FL · Passagers {{pax}} · Fret {{fret}} · Charge utile {{payload}}. Aucune case en AUTO.", r:"0.4"},
    {t:"Poids zéro carburant forcé", d:"Masse à vide IF du type {{oew}} + charge utile. Laisser AUTO, c'est planifier un avion qui n'existe pas — et les vitesses comme la flex sortiraient pour une autre masse. {{zfw}}.", r:"0.4", w:1},
    {t:"Les deux pistes laissées en AUTO", d:"AUTO choisit au vent réel, exactement comme IF. La piste attendue ne se tape pas : elle se compare, et elle vit au cartouche ②. Attendues : {{piste}} au départ, {{arrpiste}} à l'arrivée.", r:"0.4"},

    /* §0.5 — Carburant */
    {t:"6 · Planification du carburant réglée", d:"Contingency, Reserve, Taxi, FOB et FOD en Auto. MEL, ATC, WXX et Tankering à 0. Sélecteur sur EXTRA, unités en KG. EXTRA {{extra}}, non nul seulement avec un motif écrit.", r:"0.5"},
    {t:"Les quatre postes en AUTO ne remontent pas", d:"Contingence, réserve, taxi et FOD n'ont pas de libellé au registre : leur valeur attendue reste en colonne 3, pour l'œil. Le seul carburant lu par cette page est le cartouche ④.", r:"A.5", w:1},

    /* §0.6 — Entrées de texte */
    {t:"7 · Entrées de texte remplies", d:"Identifiant du pilote {{pilotid}} · Nom du capitaine · Premier officier et Nom du distributeur en Random. Dans les remarques : piste attendue, seuil BINGO {{bingo}}, dégagement {{degag}}, motif de l'EXTRA.", r:"0.6"},

    /* §0.7 — Itinéraire */
    {t:"8 · Route collée dans Selected Route", d:"Format ATC, sans les terrains. Depuis le build 18266, un changement de SID ou de STAR décidé après coup se fait au MCDU (§2.1) sans regénérer l'OFP. {{rte}}.", r:"0.7"},

    /* §0.8 — Alternatifs */
    {t:"9 · Aéroports alternatifs réglés", d:"Critères 400 NM / 600 ft / 3000 m / 7000 ft — 9000 pour un long-courrier lourd. Dégagement n° 1 en DCT. Décoller et En route à NONE sauf si le vol l'exige.", r:"0.8"},
    {t:"Les deux lignes ignorées du dégagement", d:"« Altitude (Pieds) » y est l'élévation du terrain de dégagement, pas le FL de croisière, et « Itinéraire (Route) » est la route du dégagement, pas celle du vol. Les deux sont déclarées ignorées : elles s'écrivent, elles ne remontent rien.", r:"A.5", w:1},
    {t:"ETOPS traité", d:"n/a sur vol continental. Sinon Threshold 60 min, Scenario Auto, puis Calculate — les six Altn se remplissent seuls.", r:"0.9"},

    {t:"OFP généré", d:"À partir de là c'est l'OFP qui fait foi, y compris s'il a retenu autre chose que ce qui était proposé — piste, FL, dégagement, masse.", r:"0.10", w:1}
  ]},

  { n:"OFP & cartouches", s:"Les 36 cellules, puis les seuils carburant", items:[
    {t:"① Identité", d:"{{callsign}} · {{airline}} · {{type}}. La compagnie porte le code OACI à trois lettres, jamais le nom commercial.", r:"A.4"},
    {t:"② Pistes, portes et dégagement", d:"Piste départ {{piste}} cap {{capdep}}° porte {{portedep}} · Piste arrivée {{arrpiste}} porte {{portearr}} · Dégagement {{degag}} cap {{degcap}}° à {{degdist}} NM. Une porte ne s'estime pas : elle se lit sur le traceur de trafic, ou elle sort en NIL.", r:"A.4"},
    {t:"③ Vitesses et trajectoire", d:"V1/VR/V2 {{v1}}/{{vr}}/{{v2}} · Flex {{flex}} · Volets {{volets}} · Réduction {{thrred}} · Accélération {{accel}} · Transition {{trans}} · ILS {{ils}} · DA {{da}} · Vref {{vref}} · Vapp {{vapp}} · Inbound {{inbwpt}} à {{inbound}} NM.", r:"A.4"},
    {t:"④ Carburant", d:"BLOC {{bloc}} · BINGO {{bingo}} · MIN DIV {{mindiv}} · EXTRA {{extra}} · FUEL FACTOR {{fuelfactor}}.", r:"A.4"},
    {t:"⑤ Masses", d:"Masse à vide IF {{oew}} · Charge utile {{payload}} · Poids zéro carburant {{zfw}} · Trip {{trip}} · TOW {{tow}} · LW {{lw}} t.", r:"A.4"},
    {t:"Les 36 cellules renseignées, aucune vide", d:"Une case vide sans motif affiché est un défaut de format de la feuille, pas de la page. Le bandeau d'anomalie nomme celles qui n'ont pas été résolues.", r:"A.5", w:1},
    {t:"Masses dans les limites", d:"TOW {{tow}} sous MTOW, LW {{lw}} t sous MLW. Hors limite = NO-GO, sans discussion.", r:"8", w:1},
    {t:"Bloc supérieur à la somme des postes", d:"Sinon NO-GO.", r:"8", w:1},
    {t:"Table Vref disponible et confirmée pour le type volé", d:"A318/A319/A320 : table complète. A321 : pente d'environ 1 kt par tonne, estimée et non confirmée. A330-900neo : aucune table, aucune pente. Sans elle, la Vapp du briefing n'a pas de base — cinquième point bloquant depuis la REV 20.", r:"6.2", w:1},
    {t:"Route contrôlée", d:"Aucun waypoint dupliqué, FL conforme à la règle semi-circulaire. SimBrief ne signale ni l'un ni l'autre.", r:"1", w:1},
    {t:"MIN DIV calculé", d:"Dégagement + réserve finale = {{mindiv}}.", r:"3"},
    {t:"BINGO calculé", d:"MIN DIV + 5 % = {{bingo}}. En dessous, la décision de dérouter se prend, elle ne se discute plus.", r:"3"},
    {t:"Points de contrôle carburant choisis", d:"Deux ou trois waypoints du navlog, à comparer à la jauge en vol.", r:"3"},
    {t:"Météo des trois terrains lue", d:"METAR et TAF départ, arrivée, dégagement. Minima d'arrivée contre la météo prévue à l'ETA.", r:"6"},
    {t:"NOTAM lus", d:"Départ, arrivée, dégagement, FIR.", r:"1"},
    {t:"OFP de moins de 2 h", d:"Au-delà, la météo et les vents ne valent plus.", r:"8"}
  ]},

  { n:"Import & MCDU", s:"Les trois contrôles qui décident si le vol est préparé", items:[
    {t:"Import SimBrief lancé, vue de briefing relue", d:"FROM/TO, FLT NBR, CI, ZFW, BLOCK, CRZ FL, piste, FLAPS/THS, FLEX, V1/VR/V2 et la page APPR arrivent seuls. L'import s'ouvre dans une vue de briefing déroulante : la relecture se fait là, avant validation. On relit, on ne retape pas.", r:"2.1"},
    {t:"① Distance MCDU ≈ distance OFP", d:"Écart toléré 10 NM ou 2 %. 0.0 NM après import = route NON construite : rien d'autre ne se paramètre avant correction.", r:"2.2", w:1},
    {t:"② Vitesses cohérentes et pour la bonne piste", d:"V1 ≤ VR ≤ V2. V1 = VR est normal ; seul V1 > VR est une erreur.", r:"2.2", w:1},
    {t:"Masse réelle contrôlée", d:"GW en FUEL PRED comparée à l'ETOW : le ZFW s'importe faux (2,1 t constatées sur A318). Marge au MTOW à vérifier sur la masse réelle.", r:"2.3", w:1},
    {t:"③ Croisière saisie", d:"CRZ FL/TEMP au format FL350/-54 sur INIT 1/2 ou PERF CRUISE. L'altitude sélectionnée au pilote automatique bouge avec : la revérifier.", r:"2.2", w:1},
    {t:"ALTN saisi à la main sur INIT 1/2", d:"L'import ne l'apporte pas. Appui LSK à scratchpad vide pour restaurer la valeur SimBrief.", r:"2.1"},
    {t:"Procédure changée au MCDU si besoin", d:"LAT REV puis DEPARTURE ou ARRIVAL (nouveau au build 18266) : la procédure choisie s'applique à l'INSERT, la route se met à jour. Ne refait ni les vitesses, ni la flex, ni le carburant.", r:"2.1", w:1},
    {t:"Contraintes d'altitude saisies et relues", d:"Via VERT REV. Le magenta sur la F-PLN ne prouve rien : seul ALT CSTR renseigné confirme une contrainte. À relire après chaque INSERT, une procédure réinsérée pouvant les affecter.", r:"2.1", w:1},
    {t:"Contraintes de vitesse notées à part", d:"Elles n'existent pas dans le MCDU. À tenir au sélecteur du pilote automatique.", r:"2.1"},
    {t:"Page APPR relue", d:"Piste {{arrpiste}}, ILS {{ils}}, fréquence, TRANS LVL (affiché sans préfixe FL), VAPP, LDG CONF.", r:"2.1"},
    {t:"Écart Vapp arbitré", d:"Vapp du MCDU observée 11 kt sous SimBrief. Écart supérieur à 5 kt : c'est la valeur SimBrief qui se tient au sélecteur.", r:"2.3", w:1},
    {t:"Lignes « à revérifier » du §2.3 non tenues pour acquises", d:"Huit lignes annoncées corrigées par un changelog — cinq au build 18266, trois au 18308 (ailerons à l'ECAM, cap FCU A320 sous NAV armé, saut de manette en mode SPD) — et aucune recontrôlée à l'écran. Un correctif de changelog ne retire pas une ligne du dossier : seule une observation le fait.", r:"2.3", w:1},
    {t:"Scratchpad vide, aucun message ambre", d:"Dernier contrôle avant repoussage.", r:"2.2"}
  ]},

  { n:"Briefing départ", s:"Ce que rien ne déclenchera tout seul", items:[
    {t:"Trois altitudes notées", d:"Réduction {{thrred}} ft · Accélération {{accel}} ft · Transition {{trans}} ft. Absentes du MCDU : elles se tiennent à la main.", r:"4", w:1},
    {t:"Briefing panne énoncé", d:"Avant V1 : interruption, idle, freinage max, inverseurs, spoilers, immobilisation, annonce. Après V1 : assiette V2, symétrie, EOSID ou cap piste, altitude de sécurité, retour ou dégagement.", r:"4"},
    {t:"Cas cisaillement dit", d:"TOGA, assiette de sauvegarde, configuration conservée. Cisaillement signalé : flex interdite.", r:"4", w:1},
    {t:"Crans d'autobrake décidés", d:"Départ {{autobrkdep}} — MAX est l'attente du mémo T.O ; un autre cran est un choix, pas un oubli, il se dit au briefing. Arrivée {{autobrkarr}}, selon longueur de piste et état de surface.", r:"4"},
    {t:"Limites de vent du type connues", d:"Travers et arrière maximum, réduits sur piste mouillée ou contaminée. L'OFP ne les porte pas.", r:"4"},
    {t:"Point d'ANNOUNCE INBOUND préparé", d:"{{inbwpt}} à {{inbound}} NM du seuil, cumulé à l'envers depuis la ligne de la piste.", r:"6.6"},
    {t:"GO prononcé", d:"Ou NO-GO motivé sur l'un des cinq points bloquants : masse hors limites, vitesses pour une autre piste, dégagement inutilisable, bloc insuffisant, table Vref absente ou non confirmée pour le type.", r:"8"}
  ]},

  { n:"Avant mise en route", s:"Poste préparé, avion pas encore vivant", items:[
    {t:"Alimentation puis ADIRS aligné, en premier", d:"Batterie, puis externe ou APU, puis ADIRS — l'alignement tourne pendant le briefing et le chargement. Sans lui, PFD et ND restent noirs (drapeaux ATT/ALT/SPD/VS/HDG, GPS PRIMARY LOST) : normal, pas une panne. Décollage impossible sans PFD, ça ne se rattrape pas au roulage.", r:"7", w:1},
    {t:"Séquence de mise en route, si le type en impose une", d:"§7.0 : dix phases du cold & dark au lâcher des freins, sur les quatre panneaux du menu Systems de l'A321neo. L'ORDRE vient de l'Airbus réel et tient ; chaque bouton, lui, sort d'une capture du studio et n'a jamais été vérifié à l'écran. Moteur 2 avant moteur 1, packs coupés pendant le démarrage, APU coupé seulement une fois GEN 1 et GEN 2 en ligne. n/a et traité sur tout appareil qui n'impose pas de séquence.", r:"7.0", wip:1},
    {t:"ATIS écouté", d:"Piste en service, QNH, information en cours.", r:"7"},
    {t:"Feux de position, puis beacon avant démarrage", d:"", r:"7"},
    {t:"Altimètres au QNH", d:"Contrôle : élévation affichée à ± 75 ft.", r:"7"},
    {t:"Transpondeur sur STBY", d:"Il passe sur ALT à l'alignement, pas avant.", r:"7"},
    {t:"Panneaux ceintures et no-smoking allumés", d:"Item du mémo T.O (SEAT BELTS).", r:"7"},
    {t:"Volets {{volets}}, trim réglé, spoilers armés, autobrake {{autobrkdep}}", d:"IF ne fournit pas de centrage : le trim se prend dans la table du type, le champ THS reste à tirets. Le cran d'autobrake se sélectionne avant l'alignement : le mémo T.O ne passe pas au vert tant qu'il n'est pas mis.", r:"7", w:1},
    {t:"Briefing décollage énoncé", d:"", r:"7"}
  ]},

  { n:"Roulage", s:"Du repoussage au point d'arrêt", items:[
    {t:"Pushback et taxi obtenus au Ground", d:"IF n'a pas de Clearance Delivery. Le squawk est attribué automatiquement : ne pas le demander.", r:"7", w:1},
    {t:"Carte sol suivie en continu", d:"", r:"7"},
    {t:"QNH confirmé, piste confirmée à l'ATIS", d:"", r:"7"},
    {t:"Piste en service = piste prévue", d:"Sinon les quatre vitesses et la flex sont à REFAIRE, pas à ajuster. Refaire la SID au MCDU (§2.1) ne les refait pas.", r:"7", w:1},
    {t:"Finale regardée à l'œil avant d'aligner", d:"Depuis le build 18308, les alertes de conflit de piste sont SUPPRIMÉES dès qu'on est calé sur une Tower ou une Ground active : l'ATC est censé assurer la séparation. Sous ATC, il n'y a donc plus aucun filet automatique à l'entrée de piste — le contrôle visuel redevient la seule protection. Hors contrôle, l'alerte subsiste : elle se traite, elle ne se ferme pas.", r:"7", w:1},
    {t:"Durée de roulage comparée au taxi fuel", d:"", r:"7"},
    {t:"Mémo T.O tout vert avant alignement", d:"AUTO BRK, SEAT BELTS, CABIN, SPLRS, FLAPS, T.O CONFIG — six lignes vertes, pas une liste à recocher à la main. Puis transpondeur ALT, landing lights, strobes, A/THR armé, vitesses affichées, approche finale regardée.", r:"7", w:1}
  ]},

  { n:"Décollage & montée", s:"Jusqu'au niveau de croisière", items:[
    {t:"A/THR armé avant lâcher frein", d:"", r:"4"},
    {t:"Poussée stabilisée avant 80 kt", d:"", r:"4"},
    {t:"Rotation à VR {{vr}}, 3°/s", d:"", r:"4"},
    {t:"Train rentré à Vz positive", d:"", r:"4"},
    {t:"Réduction de poussée à {{thrred}} ft", d:"À commander à la main : rien ne la déclenchera.", r:"4", w:1},
    {t:"Volets rentrés à l'accélération", d:"Schedule lu à l'envers : F speed, puis S speed, puis green dot. Les VFE s'appliquent aussi à la rentrée.", r:"6.1", w:1},
    {t:"250 kt tenus sous 10 000 ft", d:"", r:"5"},
    {t:"Profil de montée tenu", d:"1800–2200 fpm sous 10 000, puis dégressif. Transition IAS → Mach vers FL260–280.", r:"5"},
    {t:"Vz de fin de montée surveillée", d:"Sous 300 fpm, le niveau est trop élevé pour la masse : demander plus bas.", r:"5", w:1},
    {t:"RVSM entre FL290 et FL410", d:"Écart entre altimètres inférieur à 200 ft.", r:"5"}
  ]},

  { n:"Croisière", s:"Surveillance, pas pilotage", items:[
    {t:"Croisière {{fl}} établie et confirmée au MCDU", d:"", r:"2.2"},
    {t:"Marge de buffet respectée", d:"Voler au moins 2000 ft sous le FL maximum.", r:"5", w:1},
    {t:"Carburant relevé au 1ᵉʳ point de contrôle", d:"Jauge contre colonne du navlog. Ne pas se fier à FUEL PRED, qui extrapole le débit courant.", r:"3", w:1},
    {t:"Carburant relevé au 2ᵉ point de contrôle", d:"Écart défavorable de plus de 3 % du bloc : ZFW et CI, vent réel, niveau, Mach LRC, puis déroutement.", r:"3"},
    {t:"GS et ETA suivis", d:"Un écart qui grandit à chaque point est une tendance : elle se traite là où on la voit.", r:"5"},
    {t:"Direct to en vectoring reconnu comme instruction", d:"Avec ATC, un « direct to waypoint » peut désormais être donné en vectoring : il se lit comme une instruction, et se saisit en DIR TO.", r:"7"},
    {t:"Step climb traité s'il y en a un", d:"Tout step change le CRZ FL : reprendre le contrôle ③.", r:"5"},
    {t:"OAT réelle comparée au navlog", d:"Un écart notable fausse le TOD.", r:"5"},
    {t:"Météo destination prise au plus tard 1 h avant le TOD", d:"Dégagement toujours utilisable, sinon on en change maintenant.", r:"5"}
  ]},

  { n:"Préparation arrivée & descente", s:"Tout se calcule avant de descendre", items:[
    {t:"Distances cumulées à l'envers depuis la piste", d:"La colonne de la F-PLN donne la longueur du tronçon menant au point, pas la distance restante.", r:"6.6", w:1},
    {t:"Point d'ANNOUNCE INBOUND retenu", d:"{{inbwpt}} à {{inbound}} NM. Environ 25 NM du seuil avec ATC, 10 NM sur Unicom. Secours : l'IAF plus un tronçon.", r:"6.6"},
    {t:"TOD manuel calculé", d:"(milliers de ft à perdre) × 3, + 10 NM pour décélérer, ± 1 NM par 10 kt de vent. À comparer au TOD du MCDU une fois établi en croisière, écart max 15 NM.", r:"5"},
    {t:"Minima chartés notés", d:"DA {{da}} ft, DH, RVR mini, FAF et course. Ils sont sur les cartes, pas dans le MCDU.", r:"6"},
    {t:"Météo à l'ETA au-dessus des minima", d:"Sinon dégagement, décidé maintenant.", r:"6", w:1},
    {t:"Vref calculée à la masse d'arrivée", d:"LW {{lw}} t → Vref {{vref}} kt, conf FULL. La masse se lit sur le LW de l'OFP, pas sur le ZFW ni l'ETOW.", r:"6.2"},
    {t:"Vapp arrêtée", d:"{{vapp}} kt. Vref + 5 au minimum, + 1/3 de la composante de face, + l'incrément de rafale, plafond Vref + 15.", r:"6.2"},
    {t:"Descente conduite", d:"1500–2000 fpm, 250 kt sous 10 000, aérofreins jusqu'à 50 %. Ne jamais combiner aérofreins et train pour rattraper un profil : demander une attente.", r:"5", w:1},
    {t:"Carburant contrôlé au-dessus du BINGO", d:"{{bingo}}. En dessous, on déroute.", r:"3", w:1},
    {t:"ANNOUNCE INBOUND fait au point prévu", d:"Type d'approche et piste annoncés. Trop tôt encombre la fréquence, trop tard fait découvrir l'avion à un trafic déjà en vent arrière.", r:"6.6"}
  ]},

  { n:"Approche & configuration", s:"Le schedule volets, cran par cran", items:[
    {t:"Schedule volets du type sorti", d:"Les vitesses ci-dessous sont celles de l'A318/A319/A320. L'A321 et l'A330-900neo ne partagent ni l'aile ni les crans : leurs VFE se relèvent au ruban, cran par cran, et ne se déduisent pas de la famille.", r:"6.1", w:1},
    {t:"Décélération vers green dot, avion lisse", d:"", r:"6.1"},
    {t:"Conf 1 sélectionnée vers 205 kt", d:"VFE 230 kt sur A318/A319/A320. On sélectionne à la vitesse de sélection, jamais à la VFE.", r:"6.1", w:1},
    {t:"Conf 2 à S speed, vers 190 kt", d:"VFE 200 kt.", r:"6.1"},
    {t:"Conf 3 et train ensemble, vers 175 kt", d:"VFE 185 kt. Un point sous le plan ou vers 2000 ft.", r:"6.1"},
    {t:"FULL une fois établi, vers 160 kt", d:"VFE 177 kt. Sortir FULL tôt fait traîner l'avion et brûle le carburant qu'on compte.", r:"6.1", w:1},
    {t:"Tower contacté, ou annonce sur Unicom si aucun ATC", d:"Avec ATC, l'inbound se cale sur le check-in approche, ~25 NM du seuil. Sans ATC sur 122.800 : intentions, position, piste, aéroport nommé, à l'écoute avant d'émettre.", r:"6.6"},
    {t:"Stabilisation contrôlée à 1000 ft IMC / 500 ft VMC", d:"Configuration finale, Vapp +10/−5, dans l'axe et sur le plan, moins de 1000 fpm, poussée stabilisée. Un seul critère non tenu : remise de gaz.", r:"6.4", w:1}
  ]},

  { n:"Arrondi & atterrissage", s:"Ce qui se pilote est l'assiette", items:[
    {t:"50 ft — Vapp tenue, plan tenu, axe tenu", d:"", r:"6.3"},
    {t:"30 ft — arrondi commencé, assiette vers 5°", d:"Il n'y a pas de vitesse cible dans l'arrondi. Chercher un chiffre au badin produit un arrondi haut ou un toucher dur.", r:"6.3", w:1},
    {t:"20 ft — gaz réduits à idle", d:"", r:"6.3"},
    {t:"Toucher train principal, assiette maintenue", d:"Assiette au maximum 7,5° : la limite de tail strike est à 11,7° train comprimé sur A320. Sur A321 et A330-900neo elle n'est pas relevée — fuselage plus long, marge réduite : la lire dans la fiche du type avant le premier atterrissage. Ne pas reposer le train avant brutalement.", r:"6.3", w:1},
    {t:"Toucher dans la zone visée", d:"1000 ft après le seuil, ± 300. Au-delà de 2000 ft : remise de gaz obligatoire.", r:"6.5", w:1},
    {t:"Spoilers vérifiés, sortie manuelle si besoin", d:"", r:"6.5"},
    {t:"Inverseurs, autobrake {{autobrkarr}}, puis freinage manuel en fin de course", d:"Puissance de freinage dégradée relevée à l'Aircraft Health : un cran d'autobrake de plus, distance disponible vérifiée deux fois — une piste courte avec des freins usés est un motif de dégagement, pas un défi. Le relevé doit être postérieur au 21/08/2026, sinon il ne veut rien dire.", r:"6.5", w:1},
    {t:"Piste dégagée annoncée après dégagement complet", d:"", r:"6.5"}
  ]},

  { n:"Parking & après-vol", s:"Le vol ne se termine pas au frein de parc", items:[
    {t:"Ground contacté, taxi jusqu'au poste", d:"", r:"7"},
    {t:"Frein de parc, feux de position seuls", d:"", r:"7"},
    {t:"Aircraft Health relu si le freinage a paru différent", d:"Complète le contrôle fait avant de générer l'OFP.", r:"7"},
    {t:"AIDS FLIGHT REPORT relevé", d:"FOB, GW, temps moteur, temps de vol. Il remplace le relevé à la jauge.", r:"9"},
    {t:"AIDS LANDING REPORT relevé", d:"Vitesse au toucher, Vz, G max, écart d'axe. Seule mesure objective de la tenue d'approche.", r:"9"},
    {t:"Ligne ajoutée au tableau des relevés de toucher", d:"GW, TD IAS, Vz, G, axe — la plage de décélération d'arrondi est en observation.", r:"6.3"},
    {t:"Systèmes du type notés si une séquence a été suivie", d:"Commande introuvable, bouton sans effet observable, page SD qui n'a pas réagi. Chaque ligne remplie fait passer une ligne du §7.0 de [WIP] à [SIM], ou la supprime. Test gratuit au parking : couper un GEN et regarder si la page ELEC bascule.", r:"9", wip:1},
    {t:"Écarts SimBrief relevés", d:"Les six lignes laissées en AUTO : pistes, contingence, réserve, taxi, FOB, FOD.", r:"9"},
    {t:"Carburant, ETE et TOD prévus contre réels", d:"Trois vols alimentent le Fuel Factor : si IF brûle systématiquement plus, P00 devient Pxx.", r:"9"},
    {t:"Comportement FMS inattendu noté", d:"Et la ligne du dossier à corriger.", r:"9"},
    {t:"Rubrique en doublon avec l'OFP notée", d:"Elle saute à la révision suivante.", r:"9"},
    {t:"window.debugBriefing() lu une fois la feuille chargée", d:"Console du navigateur : la colonne « forme » dit quelle écriture du libellé a réellement résolu chaque ligne — complète, ou tronquée à la parenthèse. C'est la seule chose qui ferme le point ouvert du §A.5, et le seul défaut du dossier capable de faire lire une valeur fausse sans rien afficher. Il ne se règle pas par déduction.", r:"A.5", w:1}
  ]}
];
