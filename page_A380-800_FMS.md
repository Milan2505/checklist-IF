# PAGE A380-800 · SAISIE FMS

Page dédiée à l'A380-800 d'Infinite Flight (26.5), à joindre à la feuille SimBrief du temps 1 quand le type volé est l'A388. Construite à partir de 23 captures du FMS 1 (vol test LFBO vers LFPO, N388SB, 29/10/2026). Ce n'est pas une REV du dossier : la page vit à côté.

Ordre de la page : celui dans lequel on remplit le FMS, onglet par onglet. Chaque feuille A380 sortira avec une valeur chiffrée en face de chaque champ à saisir, à la place de la colonne Méthode.

## 0. Repères de lecture

| Repère | Signification |
|---|---|
| Case orange | Saisie obligatoire, le FMS ne la calcule pas |
| Valeur cyan encadrée | Valeur saisie ou importée, modifiable |
| Tirets | Champ vide, calculé plus tard ou optionnel |
| T | Masses et carburant en tonnes, une décimale |
| TMPY | Plan temporaire, à valider par TMPY F-PLN |

Les masses se tapent en tonnes au FMS, pas en kilos comme dans SimBrief. Exemple : 324 900 kg se tape 324.9.

## 1. Ce que SIMBRIEF REQUEST a rempli sur le vol test

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

Non rempli par l'import : ALTN (NONE), ZFWCG, BLOCK, PAX NBR, toute la page T.O sauf les V, la page APPR sauf VAPP, la page GA.

## 2. ACTIVE/INIT

| Champ | Méthode |
|---|---|
| ALTN | Dégagement de l'OFP (code OACI) |
| ALTN RTE | Laisser NONE sauf route de dégagement fournie |
| CRZ FL | Niveau initial de l'OFP |
| CRZ TEMP | Température au niveau initial, OFP |
| CI | Cost index de l'OFP |
| TROPO | Valeur importée, sinon 36090 |
| TRIP WIND | Composante moyenne de l'OFP, HD ou TL suivi de 3 chiffres |

## 3. ACTIVE/FUEL&LOAD

| Champ | Méthode |
|---|---|
| ZFW | ZFW de l'OFP en tonnes, contrôlé contre GW moins FOB au SD |
| ZFWCG | Centrage sans carburant en %MAC, case orange |
| BLOCK | Carburant bloc de l'OFP en tonnes, case orange |
| PAX NBR | Passagers de l'OFP, case orange |
| TAXI | Carburant roulage de l'OFP en tonnes |
| RTE RSV | Réserve de route de l'OFP, en tonnes ou en % |
| FINAL | Réserve finale de l'OFP en tonnes |
| JTSN GW | Laisser vide |

## 4. F-PLN / DEPARTURE

| Champ | Méthode |
|---|---|
| RWY | Piste de départ (liste : longueur et ILS affichés) |
| SID | Procédure de départ de l'OFP |
| TRANS | Transition de l'OFP, sinon NONE |
| EOSID | Lu seulement, NONE au vol test |

Valider par TMPY F-PLN une fois les trois champs choisis.

## 5. PERF · T.O

| Champ | Méthode |
|---|---|
| T.O SHIFT | 0, sauf départ d'intersection (distance en mètres) |
| Poussée | TOGA, FLEX ou DERATED selon le module Takeoff Performance |
| FLEX | Température flexible du module, 2 chiffres (case orange quand FLEX est coché) |
| FLAPS | Cran 1, 2 ou 3 du module Takeoff Performance |
| THS FOR | Centrage au décollage en %MAC, case orange |
| PACKS | ON, ou OFF/APU si le module le demande |
| ANTI-ICE | OFF, ENG ONLY si OAT inférieure ou égale à 10 °C avec humidité visible |
| THR RED | Élévation départ + 1 500 ft, arrondie à la centaine |
| ACCEL | Élévation départ + 3 000 ft, arrondie à la centaine |
| TRANS | Altitude de transition du terrain de départ |
| EO ACCEL | Même valeur qu'ACCEL |

## 6. PERF · CLB

| Champ | Méthode |
|---|---|
| CI | Repris de l'INIT |
| DERATED CLB | NONE (choix de 01 à 05 disponibles) |
| PRESEL SPD | Laisser vide |
| CLB SPD LIM | 250 / 10000, valeur par défaut |

## 7. PERF · CRZ

| Champ | Méthode |
|---|---|
| CI | Repris de l'INIT |
| PRESEL MACH / SPD | Laisser vide |
| STEP ALTS | Paliers de l'OFP s'il y en a |

## 8. PERF · DES

| Champ | Méthode |
|---|---|
| DES CABIN RATE | -350, valeur par défaut |
| Mode | MANAGED ECON |
| TRANS | Niveau de transition de l'arrivée (FL060 importé au vol test) |

## 9. PERF · APPR

| Champ | Méthode |
|---|---|
| MAG WIND | Vent METAR de destination, converti en magnétique |
| OAT | Température METAR de destination |
| QNH | QNH METAR de destination |
| BARO | Altitude de décision de l'approche (ILS CAT I) |
| RADIO | Laisser vide sauf CAT II ou III |
| CONF | FULL, CONF3 seulement sur choix |
| VAPP | Contrôler la valeur importée contre le module Landing Performance |

## 10. PERF · GA

| Champ | Méthode |
|---|---|
| THR RED | Élévation destination + 1 500 ft, arrondie à la centaine |
| ACCEL | Élévation destination + 3 000 ft, arrondie à la centaine |
| TRANS | Altitude de transition de la destination |
| EO ACCEL | Même valeur qu'ACCEL |

## 11. Menus sans saisie avant vol

Relevés pour référence, rien à y remplir avant le départ.

| Menu | Contenu |
|---|---|
| FMS 1 | FMS 1, ATCCOM, SURV, FCU BKUP |
| POSITION | MONITOR, REPORT, NAVAIDS, IRS, GPS |
| SEC INDEX | SEC 1, SEC 2, SEC 3 |
| DATA | STATUS, WAYPOINT, NAVAID, ROUTE, AIRPORT, PRINTER |
| CLOSEST AIRPORTS | DIST, BRG, UTC, EFOB, EFF WIND par terrain, plus un terrain libre |
| PERF | Bouton POS MONITOR en pied de page |

## 12. Point relevé au vol test

ZFW importé à 324.9 t, alors que le SD affichait GW 344.3 t et FOB 27.8 t, soit 316.5 t sans carburant côté simulateur. Écart d'environ 8.4 t, du même type que l'écart A318 d'août (profil d'airframe SimBrief contre masse IF). Pour la masse à vide A388, un relevé à l'écran Poids et centrage (tous postes à 0) réglerait la question.
