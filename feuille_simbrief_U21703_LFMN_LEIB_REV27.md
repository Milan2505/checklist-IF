# FEUILLE SIMBRIEF — TEMPS 1

**U21703 · LFMN → LEIB · A320-214 · OE-ICM · 31/08/2026**
Document de simulation. Aucune valeur opérationnelle réelle.

Dossier de référence : REV 27. Cinq cartouches, 39 cellules, ordre du §0 de la REV 26.

---

## §0.1 · INFORMATIONS SUR LE VOL

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compagnie aérienne (Airline) | EJU | easyJet Europe |
| Numéro du vol (Flight Number) | 1703 | — |
| Partir (Depart) | LFMN | Nice Côte d'Azur, élévation 12 ft |
| Arriver (Arrive) | LEIB | Ibiza, élévation 24 ft, 390 NM orthodromie |
| Alterner (Alternate) | LEPA | Palma de Majorque, 056° / 75 NM depuis LEIB |
| Heure de départ (EOBT) | 31 Aug 2026 - 17:25 | 19:25 locale CEST |

## §0.2 · INFORMATIONS SUR L'AVION — PARTIE VISIBLE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Type d'aéronef (Aircraft) | A320 | A320-214 à winglets, CFM56-5B |
| Variante ou cellule (Airframe) | A320 générique | CFM56-5B4 |
| Profil d'ascension (Climb) | AUTO | 250/300/M.78 |
| Profil de croisière (Cruise) | AUTO | M.78 |
| Profil de descente (Descent) | AUTO | M.78/300/250 |
| Indicatif d'appel ATC (ATC Callsign) | EJU1703 | indicatif radio réel du vol |

## §0.2 bis · INFORMATIONS SUR L'AVION — SOUS « PLUS D'OPTIONS »

| Champ | À taper | Valeur attendue |
|---|---|---|
| Facteur carburant (Fuel Factor) | P00 | écart réel mesuré au §9 |
| Inscription (Registration) | OE-ICM | immatriculation réelle du vol |
| Numéro Fin (Fin Number) | ICM | cosmétique |
| SELCAL | CEIM | cosmétique |
| Code Mode-S (Mode-S Code) | 440452 | adresse réelle relevée, bloc autrichien |
| Équipement de l'OACI (ICAO Equipment) | SDFGHRWY | chaîne appliquée par SimBrief |
| Transpondeur (Transponder) | LB1 | chaîne appliquée par SimBrief |
| Capacité PBN (PBN Capability) | A1B1C1D1L1O1S1 | chaîne appliquée par SimBrief |
| Informations supplémentaires sur le FPL — Article 18 | DAT/V RMK/SIMBRIEF | chaîne appliquée par SimBrief |

## §0.3 · SÉLECTIONS

| Champ | À taper | Valeur attendue |
|---|---|---|
| Disposition OFP (Layout) | LIDO | — |
| Cycle AIRAC | 2608 | 06Aug26 to 02Sep26 |
| Unités (Units) | Kilograms | — |
| Cartes de vol (Flight Maps) | Detailed | — |
| Taxi Sortie / Entrée (Taxi Time) | 20 / 8 | minutes |
| Règles de vol (Flight Rules) | IFR | — |
| Type de vol (Type of Flight) | Scheduled | — |
| Compte alternatif (Alternates) | 1 | — |
| Journal de navigation détaillé | ON | — |
| Planification ETOPS | ON | — |
| Planifier les escaliers (Stepclimbs) | ON | — |
| Analyse de la piste (Runway Analysis) | ON | — |
| Inclure les NOTAM | ON | — |
| NOTAM FIR | ON | — |

## §0.4 · ENTRÉES FACULTATIVES

| Champ | À taper | Valeur attendue |
|---|---|---|
| Bloc horaire prévu (Sched Block Time) | 1:35 | 67 min de vol + 28 min de roulage |
| Départ Runway (Depart Rwy) | AUTO | 04R |
| Arrivée Runway (Arrival Rwy) | AUTO | 06 |
| Altitude (Pieds) | 33000 | niveau relevé sur le plan réel du vol |
| Passagers (Passengers) | 158 | 186 sièges ×0,85 |
| Fret (Freight, KG) | 0 | aucun fret retenu |
| Charge utile (Payload, KG) | 15800 | 158 ×100 kg |
| Poids zéro carburant (ZFW, KG) | 57900 | 42100 + 15800 |

## §0.5 · PLANIFICATION DU CARBURANT

| Champ | À taper | Valeur attendue |
|---|---|---|
| Carburant de secours (Contingency) | Auto | 160 |
| Carburant de réserve (Reserve) | Auto | 1100 |
| Carburant pour taxis (Taxi Fuel) | AUTO | 240 |
| Bloc carburant (FOB) | AUTO | 6000 |
| Carburant d'arrivée (FOD) | AUTO | 2560 |
| Carburant MEL (MEL Fuel) | 0 | — |
| Carburant ATC (ATC Fuel) | 0 | — |
| Carburant WXX (WXX Fuel) | 0 | — |
| EXTRA | 0 | aucun motif retenu |
| Transport de pétrole (Tankering) | 0 | — |

## §0.6 · ENTRÉES DE TEXTE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | — |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | — |
| Nom du premier officier (First Officer) | Random | — |
| Nom de l'expéditeur (Dispatcher Name) | Random | — |
| Remarques du répartiteur | DEP RWY EXPECTED 04R / ARR RWY EXPECTED 06 / DIV THRESHOLD 2520 KG / ALTN LEPA | quatre lignes séparées |

## §0.7 · ITINÉRAIRE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | RUBAS7A RUBAS DCT BALEN DCT SORAS N850 POS | route réelle déposée sur cette ligne |

## §0.8 · AÉROPORTS ALTERNATIFS

**Critères de recherche**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compte alternatif (Alternates) | 1 | — |
| Distance maximale (NM) | 400 | — |
| Plafond minimum (Pieds) | 600 | — |
| Visibilité minimale (Meters) | 3000 | — |
| Piste minimale (Feet) | 7000 | — |
| Évitez les aéroports (Avoid ICAOs) | vide | — |
| Avoid TS/FG | Avoid TS/FG | — |

**Dégagement n° 1**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Aéroport (Airport) | LEPA | Palma de Majorque |
| Piste (Runway) | N/A | 24L |
| Altitude (Pieds) | AUTO | 27 |
| Itinéraire (Route) | DCT | 056° / 75 NM |

**Les deux autres dégagements**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Décoller (Takeoff altn) | NONE | — |
| En route (Enroute altn) | NONE | — |

**Bas de section**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Gares en route (Enroute Stations) | Disabled | — |
| Aéroports sélectionnés (Selected Airports) | vide | — |

## §0.9 · SCÉNARIO ETOPS

n/a — traversée maritime courte, section non touchée.

## §0.10 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

n/a, décidé et assumé.

---

# CARTOUCHES

**① Identité**

| Champ | Valeur |
|---|---|
| Callsign | EJU1703 |
| Compagnie | EJU |
| Type | A320 |

**② Pistes, portes, autobrake et dégagement**

| Champ | Valeur |
|---|---|
| Piste départ | 04R |
| Cap départ | 043 |
| Porte départ | T2 |
| Autobrake départ | MAX |
| Piste arrivée | 06 |
| Porte arrivée | TIBZ |
| Autobrake arrivée | LOW |
| Dégagement | LEPA |
| Cap dégagement | 056 |
| Distance dégagement | 75 |

**③ Vitesses et trajectoire**

| Champ | Valeur |
|---|---|
| V1 | 145 |
| VR | 147 |
| V2 | 150 |
| Flex | 55 |
| Volets | 1+F |
| Altitude initiale | 5000 |
| Réduction | 1600 |
| Accélération | 3100 |
| Transition | 5000 |
| ILS | 111.10 |
| DA | 259 |
| Vref | 134 |
| Vapp | 139 |
| Inbound | 25 |
| Point inbound | NIL |

**④ Carburant**

| Champ | Valeur |
|---|---|
| BLOC | 6000 |
| BINGO | 2520 |
| MIN DIV | 2400 |
| EXTRA | 0 |
| FUEL FACTOR | P00 |

**⑤ Masses**

| Champ | Valeur |
|---|---|
| Masse à vide IF | 42100 |
| Charge utile | 15800 |
| Poids zéro carburant | 57900 |
| Trip | 3200 |
| TOW | 63660 |
| LW | 60460 |

**Repères non lus**

| Repère | Valeur |
|---|---|
| Route | LFMN-LEIB |
| Date | 31AUG2026 |
| Immatriculation | OE-ICM |
| MANQUE | Postes |

---

# SOURCES ET MÉTHODE

**Identité** — l'indicatif radio, l'immatriculation et l'adresse Mode-S sont ceux du vol réel, relevés sur les bases de suivi `[RDR]`. L'appareil est un A320-214 à winglets ; le simulateur ne propose que la cellule lisse, ce qui abaisse légèrement la finesse en croisière et ne change aucune des vitesses de cette feuille. La masse à vide est celle relevée à l'écran Poids et centrage, tous postes à zéro : 42 100 kg, MTOW 78 000, MLW 66 500 `[SIM]`.

**Portes** — le poste n'est publié ni au départ ni à l'arrivée pour ce vol, mais les deux terminaux le sont : terminal 2 à Nice, terminal unique à Ibiza `[RDR]`. Les cellules descendent donc d'un niveau et portent le terminal préfixé `T`, pas `NIL`. Pourquoi le poste manque : à Nice le tableau des départs sert bien les portes, mais ce vol en est déjà sorti — il a décollé, et la porte s'efface au départ ; à Ibiza les arrivées ne publient pas de porte du tout, seulement le tapis à bagages. Ordre de consultation, valable pour toute feuille : airportinfo.live d'abord, qui sert les deux portes ; Airportia en recoupement ; AirNav RadarBox si le vol n'y figure pas ; le tableau des départs du terrain en dernier recours. Ni la porte ni le terminal ne se déduisent : ils sont relevés, ou la cellule descend d'un niveau. Une porte non publiée alors que le terminal l'est donne le terminal préfixé `T` ; `NIL` ne reste que si les deux manquent. La porte disparaît des tableaux dès que le vol a décollé — demandée avant, elle est là.

**Pistes** — Nice a deux pistes parallèles, orientées 043/223 `[NAV]`. La configuration usuelle du terrain fait atterrir sur la 04L et décoller de la 04R ; c'est ce qui est attendu, pas ce qui est imposé. Ibiza n'a qu'une piste, 06/24, et l'ILS n'existe que dans le sens 06 `[NAV]`. La brise de mer de fin de journée place le vent dans l'axe favorable au 06.

**Dégagement** — Palma est le terrain de dégagement naturel d'Ibiza : même archipel, piste longue, terrain ouvert la nuit. Le relèvement et la distance sont calculés depuis LEIB `[CALC]`. La proximité est un avantage de carburant et une faiblesse météo, les deux terrains partageant souvent la même masse d'air.

**Décollage** — vitesses prises à la masse attendue en configuration 1+F, sur la piste de 2570 m au niveau de la mer `[CALC]`. La piste est plus courte qu'à Genève et la masse plus élevée : la poussée réduite ne devrait pas atteindre le plafond du type, et l'Analyse de la piste tranchera. Réduction et accélération suivent la règle du §4, élévation plus 1500 et plus 3000, arrondies à la centaine supérieure — le terrain étant au niveau de la mer, elles sont pratiquement des hauteurs. L'altitude initiale est celle des départs de Nice, à confirmer sur la SID retenue `[NAV]`.

**Arrivée** — la fréquence est celle du localizer 06 d'Ibiza, axe 062° `[NAV]`. Le minimum de décision n'est pas pris à la règle générale des 200 ft : la carte publie un minimum plus haut pour la catégorie de l'A320, et c'est lui qui prime. La Vref sort de la table A320 du §6.2 à la masse d'atterrissage attendue, la Vapp est prise au plancher Vref plus 5 tant que le vent n'est pas connu `[CALC]`. Le point d'approche finale du 06 n'est pas nommé dans ce que j'ai sous la main : la cellule sort en `NIL` et se remplit sur la carte au temps 2.

**Carburant** — le bloc additionne le roulage, l'étape, la contingence, le dégagement et la réserve finale `[CALC]`. Le seuil de déroutement additionne le dégagement et la réserve finale, puis ajoute 5 %. L'étape est calculée sur une consommation d'environ 2 900 kg par heure bloc, adaptée à une étape de 390 NM montée à FL330.

**Masses** — la chaîne part de la masse à vide relevée dans le simulateur, ajoute la charge utile à 100 kg par passager, puis le bloc moins le roulage, puis retranche l'étape `[CALC]`. La masse au décollage laisse plus de 14 tonnes sous la MTOW et la masse à l'atterrissage 6 tonnes sous la MLW : aucune des deux barrières du §8 n'est approchée.

**Route et niveau** — la chaîne et le niveau sont ceux réellement déposés sur cette ligne, relevés sur la base de suivi `[RDR]`. Le départ se fait par la RUBAS7A, puis la traversée du golfe du Lion vers les Baléares. Si SimBrief refuse la chaîne à la génération, il a raison sur sa propre base et le briefing se reprend sur ce qu'il a retenu.

**Remarques du répartiteur** — le seuil de déroutement y est écrit sans son libellé de cartouche, pour ne pas créer la lecture parasite décrite au §A.5.

**Contrôle avant envoi** — les 39 cellules des cinq cartouches sont remplies en valeurs nues, sans unité ni espace de milliers ni second nombre ; aucun libellé du registre n'apparaît en prose suivi d'un chiffre ; aucun champ du §0 portant un libellé du registre n'est laissé sans valeur ; aucune cellule ne porte de marqueur.
