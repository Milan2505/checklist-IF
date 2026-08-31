# FEUILLE SIMBRIEF — TEMPS 1

**GABARIT VIERGE**
Document de simulation. Aucune valeur opérationnelle réelle.

Dossier de référence : REV 27. Cinq cartouches, 39 cellules. Les cellules porte suivent les trois niveaux du §A.4 : porte relevée, sinon terminal préfixé `T`, sinon `NIL`.

Les cases déjà remplies sont les réglages permanents, identiques d'un vol à l'autre. Les cases vides se remplissent au vol. Aucune ne se laisse vide à la livraison : la méthode d'estimation de chacune est au §A.4 du dossier.

---

## §0.1 · IDENTIFICATION ET ÉQUIPEMENT — PRIORITÉ

| Champ | À taper | Valeur attendue |
|---|---|---|
| Facteur carburant (Fuel Factor) | P00 | écart réel mesuré au §9 |
| Inscription (Registration) | | |
| Numéro Fin (Fin Number) | | cosmétique |
| SELCAL | | cosmétique |
| Code Mode-S (Mode-S Code) | | |
| Équipement de l'OACI (ICAO Equipment) | SDFGHRWY | chaîne appliquée par SimBrief |
| Transpondeur (Transponder) | LB1 | chaîne appliquée par SimBrief |
| Capacité PBN (PBN Capability) | A1B1C1D1L1O1S1 | chaîne appliquée par SimBrief |
| Informations supplémentaires sur le FPL — Article 18 | DAT/V RMK/SIMBRIEF | chaîne appliquée par SimBrief |

## §0.2 · INFORMATIONS SUR LE VOL

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compagnie aérienne (Airline) | | |
| Numéro du vol (Flight Number) | | — |
| Partir (Depart) | | |
| Arriver (Arrive) | | |
| Alterner (Alternate) | | |
| Heure de départ (EOBT) | | |

## §0.3 · INFORMATIONS SUR L'AVION — PARTIE VISIBLE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Type d'aéronef (Aircraft) | | |
| Variante ou cellule (Airframe) | | |
| Profil d'ascension (Climb) | AUTO | |
| Profil de croisière (Cruise) | AUTO | |
| Profil de descente (Descent) | AUTO | |
| Indicatif d'appel ATC (ATC Callsign) | | — |

## §0.4 · SÉLECTIONS

| Champ | À taper | Valeur attendue |
|---|---|---|
| Disposition OFP (Layout) | LIDO | — |
| Cycle AIRAC | | |
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
| Bloc horaire prévu (Sched Block Time) | | |
| Départ Runway (Depart Rwy) | AUTO | |
| Arrivée Runway (Arrival Rwy) | AUTO | |
| Altitude (Pieds) | | |
| Passagers (Passengers) | | |
| Fret (Freight, KG) | | |
| Charge utile (Payload, KG) | | |
| Poids zéro carburant (ZFW, KG) | | |

## §0.6 · PLANIFICATION DU CARBURANT

| Champ | À taper | Valeur attendue |
|---|---|---|
| Carburant de secours (Contingency) | Auto | |
| Carburant de réserve (Reserve) | Auto | |
| Carburant pour taxis (Taxi Fuel) | AUTO | |
| Bloc carburant (FOB) | AUTO | |
| Carburant d'arrivée (FOD) | AUTO | |
| Carburant MEL (MEL Fuel) | 0 | — |
| Carburant ATC (ATC Fuel) | 0 | — |
| Carburant WXX (WXX Fuel) | 0 | — |
| EXTRA | 0 | |
| Transport de pétrole (Tankering) | 0 | — |

## §0.7 · ENTRÉES DE TEXTE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | — |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | — |
| Nom du premier officier (First Officer) | Random | — |
| Nom de l'expéditeur (Dispatcher Name) | Random | — |
| Remarques du répartiteur | | quatre lignes séparées |

## §0.8 · ITINÉRAIRE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | | |

## §0.9 · AÉROPORTS ALTERNATIFS

**Critères de recherche**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compte alternatif (Alternates) | 1 | — |
| Distance maximale (NM) | 400 | — |
| Plafond minimum (Pieds) | 600 | — |
| Visibilité minimale (Meters) | 3000 | — |
| Piste minimale (Feet) | 7000 | |
| Évitez les aéroports (Avoid ICAOs) | vide | — |
| Avoid TS/FG | Avoid TS/FG | — |

**Dégagement n° 1**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Aéroport (Airport) | | |
| Piste (Runway) | N/A | |
| Altitude (Pieds) | AUTO | |
| Itinéraire (Route) | DCT | |

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

n/a hors survol maritime ou désertique.

## §0.11 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

n/a, décidé et assumé.

---

# CARTOUCHES

**① Identité**

| Champ | Valeur |
|---|---|
| Callsign | |
| Compagnie | |
| Type | |

**② Pistes, portes, autobrake et dégagement**

| Champ | Valeur |
|---|---|
| Piste départ | |
| Cap départ | |
| Porte départ | |
| Autobrake départ | |
| Piste arrivée | |
| Porte arrivée | |
| Autobrake arrivée | |
| Dégagement | |
| Cap dégagement | |
| Distance dégagement | |

**③ Vitesses et trajectoire**

| Champ | Valeur |
|---|---|
| V1 | |
| VR | |
| V2 | |
| Flex | |
| Volets | |
| Altitude initiale | |
| Réduction | |
| Accélération | |
| Transition | |
| ILS | |
| DA | |
| Vref | |
| Vapp | |
| Inbound | |
| Point inbound | |

**④ Carburant**

| Champ | Valeur |
|---|---|
| BLOC | |
| BINGO | |
| MIN DIV | |
| EXTRA | |
| FUEL FACTOR | |

**⑤ Masses**

| Champ | Valeur |
|---|---|
| Masse à vide IF | |
| Charge utile | |
| Poids zéro carburant | |
| Trip | |
| TOW | |
| LW | |

**Repères non lus**

| Repère | Valeur |
|---|---|
| Route | |
| Date | |
| Immatriculation | |
| MANQUE | |

---

# SOURCES ET MÉTHODE

Un paragraphe par famille, à écrire au vol : identité, pistes, portes, dégagement, décollage, arrivée, carburant, masses, repères non lus, route, remarques du répartiteur. La prose porte la méthode et les sources, le tableau porte la valeur — jamais l'inverse, jamais les deux.

**Contrôle avant envoi** — cinq lignes, à passer avant que la feuille parte en fichier :

- [ ] Les 39 cellules des cinq cartouches sont remplies, valeurs nues.
- [ ] Aucune cellule ne contient d'unité, d'espace de milliers, ni de second nombre.
- [ ] Aucun libellé déclaré n'apparaît en prose suivi d'un chiffre.
- [ ] Aucun libellé du registre ne figure hors cartouche, et aucun champ du §0 portant un libellé du registre n'est laissé sans valeur en colonne « À taper ».
- [ ] Aucune cellule lue ne porte de marqueur hors des six retirés à la lecture.

---

# NOTES DU GABARIT

**Altitude initiale et autobrakes** — ces trois repères sont désormais lus. L'altitude initiale est au cartouche ③ avec les autres altitudes, les deux crans d'autobrake au cartouche ②. Ils ne se saisissent plus à la main. Attention à ne jamais confondre `Altitude initiale`, qui est celle du départ, avec `Altitude (Pieds)` du §0.5, qui porte le niveau de croisière : ce sont deux clés distinctes.

**Les deux portes — trois niveaux** — porte relevée en premier ; à défaut, le terminal relevé, préfixé `T` (`T2`, `TA`, `TIBZ`) ; à défaut des deux, `NIL`. Ordre de consultation, valable pour toute feuille : airportinfo.live d'abord, qui sert les deux portes ; Airportia en recoupement ; AirNav RadarBox si le vol n'y figure pas ; le tableau des départs du terrain en dernier recours. Ni la porte ni le terminal ne se déduisent : ils sont relevés, ou la cellule descend d'un niveau. Une porte non publiée alors que le terminal l'est donne le terminal préfixé `T` ; `NIL` ne reste que si les deux manquent. La porte disparaît des tableaux dès que le vol a décollé — demandée avant, elle est là.

**Quel dossier fait foi** — ce gabarit suit ce que la checklist en ligne lit aujourd'hui : 39 cellules, cartouche ② à dix, cartouche ③ à quinze. Le fichier `briefing_prevol_IF_REV23.md` transmis hors dépôt en définit 34 et ne connaît ni les portes ni la règle `NIL`. Les deux ne décrivent pas le même dossier. Tant que ce n'est pas tranché, c'est la page qui commande, parce que c'est elle qui refuse une feuille.
