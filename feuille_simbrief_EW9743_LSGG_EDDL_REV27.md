# FEUILLE SIMBRIEF — TEMPS 1

**EW9743 · LSGG → EDDL · A320-214 · D-ABNN · 31/08/2026**
Document de simulation. Aucune valeur opérationnelle réelle.

Dossier de référence : REV 27. Cinq cartouches, 39 cellules. Les cellules porte suivent les trois niveaux du §A.4 : porte relevée, sinon terminal préfixé `T`, sinon `NIL`.

---

## §0.1 · IDENTIFICATION ET ÉQUIPEMENT — PRIORITÉ

| Champ | À taper | Valeur attendue |
|---|---|---|
| Facteur carburant (Fuel Factor) | P00 | écart réel mesuré au §9 |
| Inscription (Registration) | D-ABNN | immatriculation réelle du vol |
| Numéro Fin (Fin Number) | BNN | cosmétique |
| SELCAL | ABDE | cosmétique |
| Code Mode-S (Mode-S Code) | 3C6547 | bloc allemand 3C, adresse réelle non connue |
| Équipement de l'OACI (ICAO Equipment) | SDFGHRWY | chaîne appliquée par SimBrief |
| Transpondeur (Transponder) | LB1 | chaîne appliquée par SimBrief |
| Capacité PBN (PBN Capability) | A1B1C1D1L1O1S1 | chaîne appliquée par SimBrief |
| Informations supplémentaires sur le FPL — Article 18 | DAT/V RMK/SIMBRIEF | chaîne appliquée par SimBrief |

## §0.2 · INFORMATIONS SUR LE VOL

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compagnie aérienne (Airline) | EWG | Eurowings |
| Numéro du vol (Flight Number) | 9743 | — |
| Partir (Depart) | LSGG | Genève Cointrin, élévation 1411 ft |
| Arriver (Arrive) | EDDL | Düsseldorf, élévation 147 ft, 304 NM orthodromie |
| Alterner (Alternate) | EDDK | Cologne/Bonn, 148° / 29 NM depuis EDDL |
| Heure de départ (EOBT) | 31 Aug 2026 - 07:20 | 09:20 locale CEST |

## §0.3 · INFORMATIONS SUR L'AVION — PARTIE VISIBLE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Type d'aéronef (Aircraft) | A320 | A320-214, CFM56-5B |
| Variante ou cellule (Airframe) | A320 générique | CFM56-5B4 |
| Profil d'ascension (Climb) | AUTO | 250/300/M.78 |
| Profil de croisière (Cruise) | AUTO | M.78 |
| Profil de descente (Descent) | AUTO | M.78/300/250 |
| Indicatif d'appel ATC (ATC Callsign) | EWG7M | indicatif radio réel du vol |

## §0.4 · SÉLECTIONS

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

## §0.5 · ENTRÉES FACULTATIVES

| Champ | À taper | Valeur attendue |
|---|---|---|
| Bloc horaire prévu (Sched Block Time) | 1:15 | 47 min de vol + 28 min de roulage |
| Départ Runway (Depart Rwy) | AUTO | 22 |
| Arrivée Runway (Arrival Rwy) | AUTO | 23L |
| Altitude (Pieds) | 35000 | niveau impair, route au nord |
| Passagers (Passengers) | 153 | 180 sièges ×0,85 |
| Fret (Freight, KG) | 0 | aucun fret retenu |
| Charge utile (Payload, KG) | 15300 | 153 ×100 kg |
| Poids zéro carburant (ZFW, KG) | 57400 | 42100 + 15300 |

## §0.6 · PLANIFICATION DU CARBURANT

| Champ | À taper | Valeur attendue |
|---|---|---|
| Carburant de secours (Contingency) | Auto | 135 |
| Carburant de réserve (Reserve) | Auto | 1100 |
| Carburant pour taxis (Taxi Fuel) | AUTO | 240 |
| Bloc carburant (FOB) | AUTO | 5100 |
| Carburant d'arrivée (FOD) | AUTO | 2160 |
| Carburant MEL (MEL Fuel) | 0 | — |
| Carburant ATC (ATC Fuel) | 0 | — |
| Carburant WXX (WXX Fuel) | 0 | — |
| EXTRA | 0 | aucun motif retenu |
| Transport de pétrole (Tankering) | 0 | — |

## §0.7 · ENTRÉES DE TEXTE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | — |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | — |
| Nom du premier officier (First Officer) | Random | — |
| Nom de l'expéditeur (Dispatcher Name) | Random | — |
| Remarques du répartiteur | DEP RWY EXPECTED 22 / ARR RWY EXPECTED 23L / DIV THRESHOLD 2100 KG / ALTN EDDK | quatre lignes séparées |

## §0.8 · ITINÉRAIRE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | LUL DCT DIK DCT NVO | route nord par la Lorraine, le Luxembourg et Nörvenich |

## §0.9 · AÉROPORTS ALTERNATIFS

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
| Aéroport (Airport) | EDDK | Cologne/Bonn |
| Piste (Runway) | N/A | 14L |
| Altitude (Pieds) | AUTO | 302 |
| Itinéraire (Route) | DCT | 148° / 29 NM |

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

## §0.10 · SCÉNARIO ETOPS

n/a — vol continental, section non touchée.

## §0.11 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

n/a, décidé et assumé.

---

# CARTOUCHES

**① Identité**

| Champ | Valeur |
|---|---|
| Callsign | EWG7M |
| Compagnie | EWG |
| Type | A320 |

**② Pistes, portes, autobrake et dégagement**

| Champ | Valeur |
|---|---|
| Piste départ | 22 |
| Cap départ | 224 |
| Porte départ | A1 |
| Autobrake départ | MAX |
| Piste arrivée | 23L |
| Porte arrivée | A49 |
| Autobrake arrivée | LOW |
| Dégagement | EDDK |
| Cap dégagement | 148 |
| Distance dégagement | 29 |

**③ Vitesses et trajectoire**

| Champ | Valeur |
|---|---|
| V1 | 143 |
| VR | 146 |
| V2 | 149 |
| Flex | 60 |
| Volets | 1+F |
| Altitude initiale | 6000 |
| Réduction | 3000 |
| Accélération | 4500 |
| Transition | 7000 |
| ILS | 109.90 |
| DA | 347 |
| Vref | 133 |
| Vapp | 138 |
| Inbound | 25 |
| Point inbound | D11.6 |

**④ Carburant**

| Champ | Valeur |
|---|---|
| BLOC | 5100 |
| BINGO | 2100 |
| MIN DIV | 2000 |
| EXTRA | 0 |
| FUEL FACTOR | P00 |

**⑤ Masses**

| Champ | Valeur |
|---|---|
| Masse à vide IF | 42100 |
| Charge utile | 15300 |
| Poids zéro carburant | 57400 |
| Trip | 2700 |
| TOW | 62260 |
| LW | 59560 |

**Repères non lus**

| Repère | Valeur |
|---|---|
| Route | LSGG-EDDL |
| Date | 31AUG2026 |
| Immatriculation | D-ABNN |
| MANQUE | aucun |

---

# SOURCES ET MÉTHODE

**Identité** — l'indicatif radio et le code exploitant sont ceux du vol réel, relevés sur le traceur de trafic `[RDR]`. Le type est celui que Milan a au sélecteur `[SIM]`, avec la masse à vide relevée à l'écran Poids et centrage, tous postes à zéro : 42 100 kg, MTOW 78 000, MLW 66 500.

**Pistes** — Genève n'a qu'une piste, orientée 044/224, élévation 1411 ft `[NAV]`. Le sens 22 est le sens préférentiel du terrain et le dernier vent observé est faible et variable ; c'est celui qui est attendu, pas celui qui est imposé. À Düsseldorf le doublet 05/23 sert dans le sens sud-ouest la plus grande partie de l'année, et le 23L est la piste principale du terrain `[NAV]`.

**Portes** — relevées sur les bases de statut de vol `[RDR]`. Le poste de départ est le A1, en terminal 1 à Genève ; le poste d'arrivée est le A49, en terminal A à Düsseldorf. Les deux viennent de la fiche du vol du jour et l'arrivée est recoupée par une seconde base. Ordre de consultation, valable pour toute feuille : airportinfo.live d'abord, qui sert les deux portes ; Airportia en recoupement ; AirNav RadarBox si le vol n'y figure pas ; le tableau des départs du terrain en dernier recours. Ni la porte ni le terminal ne se déduisent : ils sont relevés, ou la cellule descend d'un niveau. Une porte non publiée alors que le terminal l'est donne le terminal préfixé `T` ; `NIL` ne reste que si les deux manquent. La porte disparaît des tableaux dès que le vol a décollé — demandée avant, elle est là.

**Dégagement** — Cologne est le terrain de dégagement usuel de Düsseldorf. Le relèvement et la distance sont calculés depuis EDDL `[CALC]`. Sa proximité est un avantage de carburant et une faiblesse météo : les deux terrains partagent souvent la même masse d'air, et c'est le point à revoir au temps 2 sur le TAF.

**Décollage** — vitesses prises à la masse attendue en configuration 1+F, sur une piste de 3900 m à 1411 ft `[CALC]`. La masse est très basse devant la MTOW et la piste est longue : la poussée réduite devrait sortir au plafond du type, et l'Analyse de la piste dira lequel. Réduction et accélération suivent la règle du §4, élévation plus 1500 et plus 3000, arrondies à la centaine supérieure. L'altitude de transition de Genève est fixe, 7000 ft quel que soit le QNH `[NAV]`.

**Arrivée** — la fréquence est celle du localizer 23L de Düsseldorf `[NAV]`. Le minimum de décision est pris à 200 ft au-dessus du terrain en CAT I, à recouper sur la carte du jour. La Vref sort de la table A320 du §6.2 à la masse d'atterrissage attendue, la Vapp est prise au plancher Vref plus 5 tant que le vent n'est pas connu `[CALC]`. Le point d'approche finale du 23L est le repère DME de la balise du terrain sur l'axe, à 11,6 NM `[NAV]` — la carte du jour le confirme au temps 2.

**Carburant** — le bloc additionne le roulage, l'étape, la contingence, le dégagement et la réserve finale `[CALC]`. Le seuil de déroutement additionne le dégagement et la réserve finale, puis ajoute 5 %. L'étape est calculée sur une consommation d'environ 3 300 kg par heure bloc, valeur adaptée à une étape de 300 NM où la montée pèse plus que la croisière ; une consommation de croisière pure sous-estimerait de plusieurs centaines de kilos.

**Masses** — la chaîne part de la masse à vide relevée dans le simulateur, ajoute la charge utile à 100 kg par passager, puis le bloc moins le roulage, puis retranche l'étape `[CALC]`. La masse au décollage laisse près de 16 tonnes sous la MTOW et la masse à l'atterrissage près de 7 tonnes sous la MLW : aucune des deux barrières du §8 n'est approchée.

**Repères non lus** — l'altitude initiale est celle des départs de Genève, à confirmer sur la SID retenue `[NAV]`. Le cran de freinage au décollage suit la règle du §4 `[CALC]`. Au décollage le cran retenu à l'arrivée tient à la longueur utile du 23L, environ 2700 m sur piste sèche, largement suffisante pour l'A320 à cette masse `[CALC]`. Ces trois repères sont désormais lus par la page : l'altitude initiale au cartouche ③, les deux crans d'autobrake au cartouche ②. Ils ne se saisissent plus à la main.

**Route** — la chaîne proposée passe par la Lorraine, le Luxembourg et Nörvenich. C'est un repli lisible, pas une route validée : si SimBrief la refuse à la génération, il a raison sur sa propre base et le briefing se reprend sur ce qu'il a retenu.

**Remarques du répartiteur** — le seuil de déroutement y est écrit sans son libellé de cartouche, pour ne pas créer la lecture parasite décrite au §A.5.

**Contrôle avant envoi** — les 39 cellules des cinq cartouches sont remplies en valeurs nues, sans unité ni espace de milliers ni second nombre ; aucun libellé du registre n'apparaît en prose suivi d'un chiffre ; aucun champ du §0 portant un libellé du registre n'est laissé sans valeur ; aucune cellule ne porte de marqueur.
