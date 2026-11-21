/* ============================================================
   DONNEES · ONGLET FMS AIRBUS
   Tutoriel en captures du MCDU famille A320 d'Infinite Flight.
   Un objet par bandeau, une etape par capture, dans l'ordre du
   tutoriel. Images dans img/fms-airbus/. Lu par js/fmsairbus.js,
   jamais par le parseur : aucune cle au registre ni dans FIELDS.
============================================================ */
const FMS_AIRBUS = [
 {
  "titre": "Page INIT",
  "etapes": [
   [
    "fms-airbus-01.jpg",
    "Ouvrir le MCDU : la page MCDU MENU s'affiche (FMGC, ATSU, AIDS, CFDS). Ne pas toucher à ces quatre entrées : appuyer sur la touche INIT du clavier."
   ],
   [
    "fms-airbus-02.jpg",
    "Page INIT 1/2 : remplir les champs entre crochets bleus avec les touches latérales. FROM/TO au format OACI/OACI, FLT NBR avec l'indicatif, COST INDEX de 0 à 999, CRZ FL/TEMP au format FL###/(-/+)##."
   ],
   [
    "fms-airbus-03.jpg",
    "Reste à trouver le COST INDEX et la CRZ FL/TEMP dans SimBrief."
   ],
   [
    "fms-airbus-04.jpg",
    "Dans SimBrief, onglet Flight Plan Summary : Altitude, Cruise, Distance, Wind, Wind Comp, ISA Dev."
   ],
   [
    "fms-airbus-05.jpg",
    "COST INDEX : le chiffre de la case Cruise de SimBrief (ici CI 5). Taper 5."
   ],
   [
    "fms-airbus-06.jpg",
    "CRZ FL : l'altitude initiale de la case Altitude, écrite en FL### (34 000 ft donne FL340)."
   ],
   [
    "fms-airbus-07.jpg",
    "CRZ TEMP : ouvrir l'onglet Briefing Preview de SimBrief."
   ],
   [
    "fms-airbus-08.jpg",
    "Dans le navlog, chercher le point T O C (Top of Climb)."
   ],
   [
    "fms-airbus-09.jpg",
    "Sur la ligne du TOC, la valeur surlignée est la température extérieure (OAT)."
   ],
   [
    "fms-airbus-10.jpg",
    "M38 veut dire moins 38."
   ],
   [
    "fms-airbus-11.jpg",
    "Valeur finale de CRZ FL/TEMP : FL340/-38."
   ],
   [
    "fms-airbus-12.jpg",
    "La valeur tapée apparaît d'abord au scratchpad en bas de l'écran, puis se pose avec la touche latérale du champ."
   ],
   [
    "fms-airbus-13.jpg",
    "Page INIT complète : RPMD/RPLL, CEB115, COST INDEX 5, FL340/-38."
   ],
   [
    "fms-airbus-14.jpg",
    "INIT rempli : passer à la page PERF avec la touche PERF."
   ]
  ]
 },
 {
  "titre": "Page PERF : vitesses de décollage",
  "etapes": [
   [
    "fms-airbus-15.jpg",
    "Page TAKEOFF PERF 1/4 : V1, VR et V2 se saisissent ici, entre 30 et 300 kt."
   ],
   [
    "fms-airbus-16.jpg",
    "Les valeurs se trouvent dans SimBrief."
   ],
   [
    "fms-airbus-17.jpg",
    "Ouvrir l'onglet Runway Analysis de SimBrief."
   ],
   [
    "fms-airbus-18.jpg",
    "Deux jeux de vitesses sont surlignés : TAKEOFF DATA, pour la piste planifiée, et le tableau DRY RWY, une ligne par piste. Prendre la ligne de la piste de départ."
   ],
   [
    "fms-airbus-19.jpg",
    "Exemple retenu : volets 1, V1 145, VR 152, V2 155."
   ],
   [
    "fms-airbus-20.jpg",
    "Vitesses saisies sur la page TAKEOFF PERF. Étape suivante : la page F-PLN."
   ],
   [
    "fms-airbus-21.jpg",
    "Appuyer sur la touche F-PLN."
   ]
  ]
 },
 {
  "titre": "F-PLN : piste de départ et SID",
  "etapes": [
   [
    "fms-airbus-22.jpg",
    "Page F-PLN : seuls le départ RPMD et l'arrivée RPLL sont présents (520 NM)."
   ],
   [
    "fms-airbus-23.jpg",
    "Choisir la SID déposée par SimBrief : touche latérale à côté de l'OACI de départ, puis DEPARTURES."
   ],
   [
    "fms-airbus-24.jpg",
    "Page DEPARTURE FROM RPMD : pistes disponibles avec leur course, leur longueur et leur ILS."
   ],
   [
    "fms-airbus-25.jpg",
    "Sélectionner la piste de départ (ici 05)."
   ],
   [
    "fms-airbus-26.jpg",
    "La liste SIDS AVAILABLE s'affiche (NO SID, ANKI1A, ANKI1B). Faire défiler avec les flèches."
   ],
   [
    "fms-airbus-27.jpg",
    "Page suivante de la liste : DAPE1A, DAPE1B, DEWI1A."
   ],
   [
    "fms-airbus-28.jpg",
    "Trouver la SID de SimBrief (ici JOFE3R), la sélectionner, puis INSERT*."
   ],
   [
    "fms-airbus-29.jpg",
    "La SID JOFE3R est dans le plan. Reste à saisir les points et les airways, par la touche latérale à côté de l'OACI."
   ]
  ]
 },
 {
  "titre": "F-PLN : méthode 1, point par point",
  "etapes": [
   [
    "fms-airbus-30.jpg",
    "Deux méthodes pour saisir les branches. Méthode 1 : taper les points un par un (ici JOFE au scratchpad)."
   ],
   [
    "fms-airbus-31.jpg",
    "Le point JOFER est inséré après la SID."
   ],
   [
    "fms-airbus-32.jpg",
    "Suivre le navlog de SimBrief point par point : GONIL, puis BALIN au scratchpad."
   ],
   [
    "fms-airbus-33.jpg",
    "Les points surlignés du navlog (GONIL, BALIN, YAYIN) se tapent dans l'ordre."
   ]
  ]
 },
 {
  "titre": "F-PLN : méthode 2, par airways",
  "etapes": [
   [
    "fms-airbus-34.jpg",
    "Méthode 2, plus rapide : saisir les airways depuis un point."
   ],
   [
    "fms-airbus-35.jpg",
    "Route SimBrief (Selected Route) : JOFE3R JOFER W8 MCT W6A ROX B473 LAIYA LAIY7R."
   ],
   [
    "fms-airbus-36.jpg",
    "Les mots de 2 à 4 caractères en rouge sont les airways : W8, W6A, B473."
   ],
   [
    "fms-airbus-37.jpg",
    "Commencer par l'airway W8."
   ],
   [
    "fms-airbus-38.jpg",
    "JOFER est le point d'entrée de l'airway."
   ],
   [
    "fms-airbus-39.jpg",
    "Sélectionner JOFER dans le plan (la destination doit déjà être renseignée)."
   ],
   [
    "fms-airbus-40.jpg",
    "Page LAT REV FROM JOFER : appuyer sur AIRWAYS>."
   ],
   [
    "fms-airbus-41.jpg",
    "Page AIRWAYS FROM JOFER : taper W8 côté VIA."
   ],
   [
    "fms-airbus-42.jpg",
    "Puis le point suivant de la route côté TO (ici MCT)."
   ],
   [
    "fms-airbus-43.jpg",
    "Le MCDU ajoute seul les points de l'airway..."
   ],
   [
    "fms-airbus-44.jpg",
    "...jusqu'au point de sortie MCT : BALIN, YAYIN, BOHOL, DAHOY, MCT."
   ],
   [
    "fms-airbus-45.jpg",
    "Certaines airways ne sont pas enregistrées dans le jeu."
   ],
   [
    "fms-airbus-46.jpg",
    "Surtout en Afrique et en Amérique du Sud."
   ],
   [
    "fms-airbus-47.jpg",
    "Dans ce cas, revenir à la méthode 1, point par point."
   ]
  ]
 },
 {
  "titre": "F-PLN : point en coordonnées et fin de route",
  "etapes": [
   [
    "fms-airbus-48.jpg",
    "Un point qui ne se saisit pas par son nom, comme le TOC, se tape en coordonnées."
   ],
   [
    "fms-airbus-49.jpg",
    "Coordonnées lues dans le navlog (N0934.4 E12422.7), saisies au format 0911N..."
   ],
   [
    "fms-airbus-50.jpg",
    "...puis 0911N/12434 en entier. Le tutoriel précise que le point saisi ici n'est pas celui du navlog."
   ],
   [
    "fms-airbus-51.jpg",
    "Continuer jusqu'au dernier point avant la STAR (ici DAHOY)."
   ]
  ]
 },
 {
  "titre": "F-PLN : arrivée",
  "etapes": [
   [
    "fms-airbus-52.jpg",
    "Sélectionner RPLL, puis l'approche voulue (ici l'ILS 24)."
   ],
   [
    "fms-airbus-53.jpg",
    "Approche I24 : choisir la transition (VIA) voulue, ici aucune."
   ],
   [
    "fms-airbus-54.jpg",
    "STAR : celle de SimBrief (ici COND3P), puis INSERT*."
   ]
  ]
 },
 {
  "titre": "F-PLN : altitudes et contrôle final",
  "etapes": [
   [
    "fms-airbus-55.jpg",
    "Altitudes : touche latérale droite du point qui demande un changement d'altitude (TOC, TOD ou autre)."
   ],
   [
    "fms-airbus-56.jpg",
    "Page VERT REV : taper l'altitude puis appuyer sur ALT CSTR. Format 5000 ou FL350."
   ],
   [
    "fms-airbus-57.jpg",
    "La contrainte apparaît en magenta (FL340 sur le point 0911N/1243)."
   ],
   [
    "fms-airbus-58.jpg",
    "Contrôle final : le plan est complet, jusqu'à la STAR COND3P (539 NM)."
   ]
  ]
 },
 {
  "titre": "Contrôle du plan au ND",
  "etapes": [
   [
    "fms-airbus-59.jpg",
    "Pour plus de réalisme, vérifier le plan sur le ND."
   ],
   [
    "fms-airbus-60.jpg",
    "Sélecteur de mode (ROSE, NAV, ARC, PLAN) et sélecteur de distance (10 à 320)."
   ],
   [
    "fms-airbus-61.jpg",
    "Pour voir la STAR ou d'autres points, faire défiler la page F-PLN avec les flèches."
   ]
  ]
 },
 {
  "titre": "Attente (hold)",
  "etapes": [
   [
    "fms-airbus-62.jpg",
    "Section attentes."
   ],
   [
    "fms-airbus-63.jpg",
    "Pour faire une attente sur un point, par exemple sur une arrivée chargée..."
   ],
   [
    "fms-airbus-64.jpg",
    "...voici la méthode au FMS."
   ],
   [
    "fms-airbus-65.jpg",
    "Identifier sur le ND le point où placer l'attente."
   ],
   [
    "fms-airbus-66.jpg",
    "Ici le point suivant, NOKSO (197°, 19 NM)."
   ],
   [
    "fms-airbus-67.jpg",
    "Ouvrir le MCDU et appuyer sur F-PLN."
   ],
   [
    "fms-airbus-68.jpg",
    "Page F-PLN : NOKSO est dans la liste."
   ],
   [
    "fms-airbus-69.jpg",
    "Sélectionner NOKSO avec la touche latérale gauche."
   ],
   [
    "fms-airbus-70.jpg",
    "Page LAT REV FROM NOKSO : choisir <HOLD."
   ],
   [
    "fms-airbus-71.jpg",
    "Page HOLD AT NOKSO : INB CRS 198, TURN R, TIME/DIST 1.5."
   ],
   [
    "fms-airbus-72.jpg",
    "INB CRS : cap d'entrée en attente. TURN : sens des virages, gauche ou droite. TIME/DIST : durée ou longueur de la branche d'attente."
   ],
   [
    "fms-airbus-73.jpg",
    "Appuyer sur INSERT* : l'attente est créée."
   ],
   [
    "fms-airbus-74.jpg",
    "L'indicateur HOLD AT apparaît sous le point choisi (HOLD R)."
   ],
   [
    "fms-airbus-75.jpg",
    "Pour annuler : IMM EXIT*. L'attente se retire au prochain passage sur le point."
   ],
   [
    "fms-airbus-76.jpg",
    "L'attente dessinée au ND autour de NOKSO."
   ]
  ]
 },
 {
  "titre": "Interception ILS",
  "etapes": [
   [
    "fms-airbus-77.jpg",
    "Section interception ILS."
   ],
   [
    "fms-airbus-78.jpg",
    "Saisir et intercepter l'ILS au FMS."
   ],
   [
    "fms-airbus-79.jpg",
    "D'abord, relever la fréquence ILS de la piste d'arrivée..."
   ],
   [
    "fms-airbus-80.jpg",
    "...dans l'onglet Runway Analysis de SimBrief."
   ],
   [
    "fms-airbus-81.jpg",
    "Le rapport de piste (Takeoff and Landing Report) de l'OFP."
   ],
   [
    "fms-airbus-82.jpg",
    "Section ACARS RUNWAYS : une fréquence ILS par piste équipée (06 : 109.10, 24 : 109.90)."
   ],
   [
    "fms-airbus-83.jpg",
    "Pour intercepter le localizer de la 24, retenir sa fréquence."
   ],
   [
    "fms-airbus-84.jpg",
    "Fréquence retenue : ILS 109.90."
   ],
   [
    "fms-airbus-85.jpg",
    "Vers 10 NM de l'aéroport, saisir la fréquence au FMS."
   ],
   [
    "fms-airbus-86.jpg",
    "Pas plus tôt : le récepteur peut accrocher le localizer d'un autre aéroport et donner une fausse alerte glide ou loc."
   ],
   [
    "fms-airbus-87.jpg",
    "Ouvrir le MCDU et choisir RAD NAV."
   ],
   [
    "fms-airbus-88.jpg",
    "Touche RAD NAV."
   ],
   [
    "fms-airbus-89.jpg",
    "Page RADIO NAV : taper la fréquence (109.90) dans VOR1/ILS."
   ],
   [
    "fms-airbus-90.jpg",
    "VOR1/ILS affiche IMA/109.90, CRS 242, et ILS1 STATUS passe à LOC/GS."
   ],
   [
    "fms-airbus-91.jpg",
    "La course 242 correspond à l'axe de la piste : l'ILS est réglé."
   ],
   [
    "fms-airbus-92.jpg",
    "Fin du tutoriel."
   ]
  ]
 }
];
