# PAGE A380-800 · SAISIE FMS

Page dédiée à l'A380-800 d'Infinite Flight (26.5), à joindre à la feuille SimBrief du temps 1 quand le type volé est l'A388. Construite à partir de 26 captures du FMS 1 (vol test LFBO vers LFPO, N388SB, 29/10/2026). Ce n'est pas une REV du dossier : la page vit à côté.

Ordre de la page : celui dans lequel on remplit le FMS, onglet par onglet. Les valeurs du vol en cours sont dans la section « SAISIE FMS A388 » de la feuille ; cette page donne la méthode, champ par champ.

## 0. Repères de lecture

| Repère | Signification |
|---|---|
| Case orange | Saisie obligatoire, le FMS ne la calcule pas |
| Valeur cyan encadrée | Valeur saisie ou importée, modifiable |
| Tirets | Champ vide, calculé plus tard ou optionnel |
| Bouton grisé | Présent à l'écran, inactif |
| T | Masses et carburant en tonnes, une décimale |
| FORMAT ERROR | Saisie refusée : effacer par CLR INFO, puis retaper une seule valeur dans la bonne case |
| TMPY | Plan ou réglage temporaire, à valider |

Les masses se tapent en tonnes au FMS, pas en kilos comme dans SimBrief. Exemple : 324 900 kg se tape 324.9.

## 1. Accès aux pages

Deux chemins mènent aux mêmes pages : les onglets tactiles de l'écran, ou le clavier KCCU.

**Bascule MFD / KCCU** : bouton en haut au centre de l'écran, il fait apparaître le clavier physique sous l'écran.

| Rangée KCCU | Touches |
|---|---|
| Haut | ESC · DIR · PERF · INIT · NAV AID · MAIL BOX · flèches |
| Milieu | CLR INFO · F-PLN · DEST · SEC INDEX · SERV · ATC COM · ND |
| Bas | clavier QWERTY |

**Pied de la page F-PLN** : INIT · F-PLN INFO · DIR TO · DEST · flèches de défilement · MSG LIST.

**Pied des pages PERF et FUEL&LOAD** : RETURN · POS MONITOR (PERF seulement) · MSG LIST.

## 2. Ce que SIMBRIEF REQUEST a rempli sur le vol test

Lu à l'écran après import, sur un seul vol. À reconfirmer au prochain vol avant d'en faire une règle.

| Page | Champ | Valeur lue |
|---|---|---|
| ACTIVE/INIT | FLT NBR | N388SB |
| ACTIVE/INIT | FROM / TO | LFBO / LFPO |
| ACTIVE/INIT | CRZ FL | FL280 |
| ACTIVE/INIT | CRZ TEMP | -34 |
| ACTIVE/INIT | CI | 118 |
| ACTIVE/INIT | TROPO | 36090 |
| ACTIVE/INIT | TRIP WIND | HD000 |
| FUEL&LOAD | ZFW | 324.9 |
| PERF T.O | V1 / VR / V2 | 132 / 144 / 148 |
| PERF DES | TRANS | FL060 |
| PERF APPR | VAPP | 155 |
| F-PLN | Route et contraintes | AMB 280/FL240, CAD FL130, SOTIP 250/FL120, ODILO FL100 |

Non rempli par l'import : ALTN (NONE), CPNY RTE et ALTN RTE (NONE), ZFWCG, BLOCK, PAX NBR, toute la page T.O sauf les V, la page APPR sauf VAPP, la page GA.

## 3. ACTIVE/INIT

**Première action : appuyer sur SIMBRIEF REQUEST**, puis relire ce que l'import a rempli.

| Champ | Méthode |
|---|---|
| FLT NBR | Importé, à contrôler contre l'indicatif de la feuille |
| FROM / TO | Importés |
| ALTN | Dégagement de l'OFP (code OACI) |
| CPNY RTE | NONE, la route du jour étant chargée par SIMBRIEF REQUEST ; nom de route compagnie si RTE SEL en propose une liste |
| ALTN RTE | Route réelle la plus déposée entre destination et dégagement (analyse des routes IFR FlightAware), via ALTN RTE SEL ; à défaut, route de dégagement de l'OFP |
| CRZ FL | Niveau initial de l'OFP |
| CRZ TEMP | Température au niveau initial, OFP |
| CI | Cost index de l'OFP |
| TROPO | Valeur importée, sinon 36090 |
| TRIP WIND | Composante moyenne de l'OFP, HD ou TL suivi de 3 chiffres |

Boutons de la page :

| Bouton | Rôle |
|---|---|
| SIMBRIEF REQUEST | Importe le plan SimBrief |
| SIMBRIEF BRIEFING | Ouvre l'OFP |
| ACFT STATUS | État de l'appareil |
| RTE SEL · ALTN RTE SEL | Choix d'une route compagnie |
| CPNY WIND REQUEST | Demande des vents compagnie |
| WIND | Grisé au vol test |
| IRS · DEPARTURE · NAVAIDS · FUEL&LOAD · T.O PERF | Raccourcis vers les pages correspondantes |
| RTE SUMMARY | Résumé de la route |
| CPNY T.O REQUEST | Demande des performances de décollage compagnie ; effet non vérifié, grisé sur la page T.O |

## 4. ACTIVE/FUEL&LOAD

En tête, lus seulement : GW, CG, FOB.

| Champ | Méthode |
|---|---|
| ZFW | GW moins FOB lus au SD une fois l'avion chargé dans IF, en tonnes ; remplace le ZFW importé |
| ZFWCG | Centrage sans carburant en %MAC, case orange |
| BLOCK | Carburant bloc de la feuille en tonnes, case orange ; doit égaler le FOB chargé dans IF |
| PAX NBR | Passagers de la feuille, case orange |
| TAXI | Carburant roulage en tonnes |
| RTE RSV | Réserve de route (secours) en tonnes ; la case en % se remplit seule |
| ALTN | Carburant de dégagement en tonnes, une seule valeur ; la case de temps reste vide |
| FINAL | Réserve finale en tonnes, une seule valeur ; la case de temps reste vide |
| JTSN GW | Laisser vide |
| MIN FUEL AT DEST | Dégagement plus réserve finale, en tonnes (MIN DIV du cartouche ④) |

⚠ Une case, une valeur : ne jamais taper deux valeurs séparées par une barre. Le clavier KCCU n'a pas de deux-points, les temps ne se tapent pas. Toucher la case visée avant de taper : la saisie part dans la case surlignée (relevé du 31/10 : ALTN tapé dans JTSN GW, FORMAT ERROR).

Lus seulement, calculés par le FMS : TRIP, TOW, LW, UTC et EFOB à destination et au dégagement, EXTRA. Le bouton FUEL PLANNING est grisé au vol test.

## 5. F-PLN / DEPARTURE

| Champ | Méthode |
|---|---|
| RWY | Piste de départ ; la liste affiche longueur en mètres et ILS |
| SID | Procédure de départ de l'OFP, liste déroulante |
| TRANS | Transition de l'OFP, sinon NONE |
| EOSID | Lu seulement, NONE au vol test |

Le cadre SELECTED DEPARTURE affiche aussi la fréquence ILS de la piste choisie. Valider par TMPY F-PLN une fois les trois champs choisis.

Page ARRIVAL (STAR, approche) : pas encore relevée.

## 6. PERF · T.O

| Champ | Méthode |
|---|---|
| RWY | Lu seulement |
| V1 / VR / V2 | Importés ; contrôler contre le module Takeoff Performance |
| T.O SHIFT | 0, sauf départ d'intersection (distance en mètres) |
| Poussée | TOGA, FLEX ou DERATED selon le module Takeoff Performance |
| FLEX | Température flexible, 2 chiffres ; la case orange apparaît quand FLEX est coché |
| FLAPS | 1, 2 ou 3 (seuls choix de la liste) |
| THS FOR | Centrage au décollage en %MAC, case orange |
| PACKS | ON ou OFF/APU (seuls choix de la liste) |
| ANTI-ICE | OFF, ENG ONLY ou ENG + WING ; ENG ONLY si OAT inférieure ou égale à 10 °C avec humidité visible |
| THR RED | Élévation départ + 1 500 ft, arrondie à la centaine |
| ACCEL | Élévation départ + 3 000 ft, arrondie à la centaine |
| TRANS | Altitude de transition du terrain de départ |
| EO ACCEL | Même valeur qu'ACCEL |

Lus seulement : F, S et O (vitesses de rentrée des volets, à tirets au sol). Bouton NOISE grisé.

⚠ Changer TOGA, FLEX ou DERATED fait apparaître TMPY dans le bandeau de la page. Le geste qui valide ce TMPY n'est pas visible sur les captures.

## 7. PERF · CLB

| Champ | Méthode |
|---|---|
| CI | Repris de l'INIT |
| DERATED CLB | NONE (choix de 01 à 05 disponibles) |
| PRESEL SPD | Laisser vide |
| TRANS | Altitude de transition du départ, même valeur qu'en T.O |

Lus seulement : CLB SPD LIM 250 KT / 10000 FT, PRED TO, bouton SPD CSTR.

## 8. PERF · CRZ

| Champ | Méthode |
|---|---|
| CI | Repris de l'INIT |
| PRESEL MACH / SPD | Laisser vide |
| STEP ALTS | Paliers de l'OFP s'il y en a |

Lus seulement : PRED TO T/D, heure et carburant à destination. Bouton CMS grisé.

## 9. PERF · DES

| Champ | Méthode |
|---|---|
| CI | Repris de l'INIT |
| DES CABIN RATE | -350, valeur par défaut |
| Mode | MANAGED ECON |
| TRANS | Niveau de transition de l'arrivée |

Lus seulement : PRED TO, VERT DEV, heure et carburant à destination, bouton SPD CSTR.

## 10. PERF · APPR

| Champ | Méthode |
|---|---|
| MAG WIND | Vent de destination, direction magnétique puis force |
| OAT | Température de destination |
| QNH | QNH de destination |
| BARO | Altitude de décision de l'approche (ILS CAT I) |
| RADIO | Laisser vide sauf CAT II ou III |
| CONF | FULL, CONF3 seulement sur choix |
| VAPP | Contrôler la valeur importée contre le module Landing Performance |
| TRANS | Repris de la page DES |

Lus seulement : APPR (approche choisie), LW, HD et CROSS (composantes de vent), O, S, F, VREF, VLS, VERT DEV.

## 11. PERF · GA

| Champ | Méthode |
|---|---|
| THR RED | Élévation destination + 1 500 ft, arrondie à la centaine |
| ACCEL | Élévation destination + 3 000 ft, arrondie à la centaine |
| TRANS | Altitude de transition de la destination |
| EO ACCEL | Même valeur qu'ACCEL |

## 12. Menus sans saisie avant vol

Relevés pour référence, rien à y remplir avant le départ.

| Menu | Contenu |
|---|---|
| FMS 1 | FMS 1, ATCCOM, SURV, FCU BKUP |
| POSITION | MONITOR, REPORT, NAVAIDS, IRS, GPS |
| SEC INDEX | SEC 1, SEC 2, SEC 3 |
| DATA | STATUS, WAYPOINT, NAVAID, ROUTE, AIRPORT, PRINTER ; contenu des pages pas encore relevé |
| CLOSEST AIRPORTS | DIST, BRG, UTC, EFOB, EFF WIND par terrain, plus un terrain libre |

## 13. Masses relevées

Masse à vide IF relevée le 31/10/2026 à l'écran Poids et centrage, tous postes à zéro : **276 630 kg**, MTOW 575 000 kg, MLW 395 000 kg. Le ZFW se force sur cette valeur plus la charge utile.

Au vol test, le ZFW importé était de 324.9 t, alors que le SD affichait GW 344.3 t et FOB 27.8 t, soit 316.5 t sans carburant. L'écart venait du ZFW importé de SimBrief : la charge réellement embarquée était d'environ 39.9 t.

Écran Poids et centrage : carburant en cinq jauges (Tail Tank, Tank 1 à 4), passagers, soute en trois compartiments (Front, Aft, Rear Cargo).

## 14. Points ouverts

| Point | Ce qui le ferme |
|---|---|
| Geste de validation du TMPY sur PERF après changement de poussée | Capture de la page T.O juste après le geste |
| Effet de CPNY T.O REQUEST | Capture de la page T.O après appui |
| Page ARRIVAL | Captures de la page et de ses listes |
| Contenu des pages DATA | Captures de STATUS et AIRPORT |
| Contenu des listes RTE SEL et ALTN RTE SEL | Capture de chaque liste ouverte |
| Capacité carburant totale | Capture de l'écran Poids et centrage au plein ; la barre du bas indique environ 250 t (27 784 kg pour 11 %), arrondi |

## 15. Gabarit de la section SAISIE FMS A388

Liste de référence pour toute feuille A388 : 79 lignes, dans cet ordre, sans en retirer ni en ajouter (§A.6 du dossier). La colonne de droite dit ce qu'on écrit dans la cellule Saisie de la feuille.

| Page FMS | Champ | Contenu de la cellule Saisie |
|---|---|---|
| INIT | Première action | texte fixe : appuyer sur SIMBRIEF REQUEST |
| INIT | FLT NBR | contrôle : indicatif ATC de la feuille |
| INIT | FROM | contrôle : OACI départ |
| INIT | TO | contrôle : OACI arrivée |
| INIT | ALTN | dégagement de la feuille |
| INIT | CPNY RTE | contrôle : NONE, sauf nom de route proposé par RTE SEL |
| INIT | ALTN RTE | route réelle la plus déposée destination vers dégagement (FlightAware) ; à défaut, celle de l'OFP |
| INIT | CRZ FL | niveau initial |
| INIT | CRZ TEMP | température au niveau initial |
| INIT | CI | contrôle : cost index de l'OFP |
| INIT | TROPO | contrôle : valeur importée, sinon 36090 |
| INIT | TRIP WIND | composante moyenne, HD ou TL suivi de 3 chiffres |
| FUEL&LOAD | ZFW | GW moins FOB lus au SD après chargement ; la feuille donne la valeur attendue en prose |
| FUEL&LOAD | ZFWCG | %MAC |
| FUEL&LOAD | BLOCK | BLOC du cartouche ④ en tonnes |
| FUEL&LOAD | TAXI | carburant roulage en tonnes |
| FUEL&LOAD | PAX NBR | passagers de la feuille |
| FUEL&LOAD | CI | contrôle : même valeur qu'en INIT |
| FUEL&LOAD | RTE RSV | carburant de secours en tonnes |
| FUEL&LOAD | RTE RSV % | contrôle : pourcentage calculé |
| FUEL&LOAD | JTSN GW | vide |
| FUEL&LOAD | ALTN | carburant de dégagement en tonnes, une seule valeur |
| FUEL&LOAD | FINAL | réserve finale en tonnes, une seule valeur |
| FUEL&LOAD | MIN FUEL AT DEST | MIN DIV du cartouche ④ en tonnes |
| FUEL&LOAD | TRIP | contrôle : Trip du cartouche ⑤ |
| FUEL&LOAD | TOW | contrôle : TOW du cartouche ⑤ |
| FUEL&LOAD | LW | contrôle : LW du cartouche ⑤ |
| FUEL&LOAD | EXTRA | contrôle : EXTRA du cartouche ④ |
| DEPARTURE | RWY | piste départ |
| DEPARTURE | SID | SID de l'OFP |
| DEPARTURE | TRANS | transition de l'OFP, sinon NONE |
| DEPARTURE | EOSID | contrôle : valeur affichée |
| DEPARTURE | Validation | texte fixe : TMPY F-PLN |
| ARRIVAL | APPR | approche de la feuille (page non relevée) |
| ARRIVAL | STAR | STAR de l'OFP (page non relevée) |
| T.O | CRZ FL (haut de page PERF) | contrôle : même valeur qu'en INIT |
| T.O | T.O SHIFT | 0 sauf intersection |
| T.O | V1 | contrôle : V1 du cartouche ③ |
| T.O | VR | contrôle : VR du cartouche ③ |
| T.O | V2 | contrôle : V2 du cartouche ③ |
| T.O | Poussée | TOGA, FLEX ou DERATED |
| T.O | Température FLEX | Flex du cartouche ③ |
| T.O | FLAPS | Volets du cartouche ③ |
| T.O | THS FOR | %MAC |
| T.O | PACKS | ON ou OFF/APU |
| T.O | ANTI-ICE | OFF, ENG ONLY ou ENG + WING |
| T.O | THR RED | Réduction du cartouche ③ |
| T.O | ACCEL | Accélération du cartouche ③ |
| T.O | TRANS | Transition du cartouche ③ |
| T.O | EO ACCEL | même valeur qu'ACCEL |
| CLB | CI | contrôle : même valeur qu'en INIT |
| CLB | DERATED CLB | NONE sauf demande |
| CLB | PRESEL SPD | vide |
| CLB | CLB SPD LIM | contrôle : 250 / 10000 |
| CLB | TRANS | même valeur qu'en T.O |
| CLB | PRED TO | vide |
| CRZ | CI | contrôle : même valeur qu'en INIT |
| CRZ | PRESEL MACH | vide |
| CRZ | PRESEL SPD | vide |
| CRZ | STEP ALTS | paliers de l'OFP |
| DES | CI | contrôle : même valeur qu'en INIT |
| DES | DES CABIN RATE | -350 |
| DES | Mode | MANAGED ECON |
| DES | MACH | vide |
| DES | SPD | vide |
| DES | PRED TO | vide |
| DES | TRANS | niveau de transition de l'arrivée |
| APPR | MAG WIND | vent de destination, direction magnétique / force |
| APPR | OAT | température de destination |
| APPR | QNH | QNH de destination |
| APPR | BARO | DA du cartouche ③ |
| APPR | RADIO | vide sauf CAT II ou III |
| APPR | CONF | FULL sauf choix CONF3 |
| APPR | VAPP | contrôle : Vapp du cartouche ③ |
| APPR | TRANS | contrôle : même valeur qu'en DES |
| GA | THR RED | élévation destination + 1 500 ft |
| GA | ACCEL | élévation destination + 3 000 ft |
| GA | TRANS | altitude de transition de la destination |
| GA | EO ACCEL | même valeur qu'ACCEL |
