# FEUILLE SIMBRIEF · TEMPS 1

**GABARIT VIERGE**
Document de simulation. Aucune valeur opérationnelle réelle.

Dossier de référence : REV 37. Six cartouches, 49 cellules. Les cellules porte suivent les trois niveaux du §A.4 : porte relevée, sinon terminal préfixé `T`, sinon `NIL`.

Les cases déjà remplies sont les réglages permanents, identiques d'un vol à l'autre. Les cases vides se remplissent au vol. Aucune ne se laisse vide à la livraison : la méthode d'estimation de chacune est au §A.4 du dossier.

⚠ Ce gabarit est un **dérivé du dossier**, jamais une source. La numérotation ci-dessous est celle du §0 de la REV 37, section par section. S'il contredit le dossier, c'est lui qui est périmé.

---

## §0.1 · INFORMATIONS SUR LE VOL

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compagnie aérienne (Airline) | | |
| Numéro du vol (Flight Number) | | n/a |
| Partir (Depart) | | |
| Arriver (Arrive) | | |
| Alterner (Alternate) | | |
| Heure de départ (EOBT) | | |

## §0.2 · INFORMATIONS SUR L'AVION : PARTIE VISIBLE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Type d'aéronef (Aircraft) | | |
| Variante ou cellule (Airframe) | | |
| Profil d'ascension (Climb) | AUTO | |
| Profil de croisière (Cruise) | AUTO | |
| Profil de descente (Descent) | AUTO | |
| Indicatif d'appel ATC (ATC Callsign) | | n/a |

## §0.2 bis · INFORMATIONS SUR L'AVION : SOUS « PLUS D'OPTIONS »

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
| Informations supplémentaires sur le FPL : Article 18 | DAT/V RMK/SIMBRIEF | chaîne appliquée par SimBrief |

## §0.3 · SÉLECTIONS

| Champ | À taper | Valeur attendue |
|---|---|---|
| Disposition OFP (Layout) | LIDO | n/a |
| Cycle AIRAC | | |
| Unités (Units) | Kilograms | n/a |
| Cartes de vol (Flight Maps) | Detailed | n/a |
| Taxi Sortie / Entrée (Taxi Time) | 20 / 8 | minutes |
| Règles de vol (Flight Rules) | IFR | n/a |
| Type de vol (Type of Flight) | Scheduled | n/a |
| Compte alternatif (Alternates) | 1 | n/a |
| Journal de navigation détaillé | ON | n/a |
| Planification ETOPS | ON | n/a |
| Planifier les escaliers (Stepclimbs) | ON | n/a |
| Analyse de la piste (Runway Analysis) | ON | n/a |
| Inclure les NOTAM | ON | n/a |
| NOTAM FIR | ON | n/a |

## §0.4 · ENTRÉES FACULTATIVES

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

## §0.5 · PLANIFICATION DU CARBURANT

| Champ | À taper | Valeur attendue |
|---|---|---|
| Carburant de secours (Contingency) | Auto | |
| Carburant de réserve (Reserve) | Auto | |
| Carburant pour taxis (Taxi Fuel) | AUTO | |
| Bloc carburant (FOB) | AUTO | |
| Carburant d'arrivée (FOD) | AUTO | |
| Carburant MEL (MEL Fuel) | 0 | n/a |
| Carburant ATC (ATC Fuel) | 0 | n/a |
| Carburant WXX (WXX Fuel) | 0 | n/a |
| EXTRA | 0 | |
| Transport de pétrole (Tankering) | 0 | n/a |

## §0.6 · ENTRÉES DE TEXTE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | n/a |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | n/a |
| Nom du premier officier (First Officer) | Random | n/a |
| Nom du distributeur (Dispatcher Name) | Random | n/a |
| Remarques du répartiteur | | quatre lignes séparées |

## §0.7 · ITINÉRAIRE

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | vide | orthodromie nnn NM · route estimée nnn NM (orthodromie × 1,20) |

## §0.8 · AÉROPORTS ALTERNATIFS

**Critères de recherche**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compte alternatif (Alternates) | 1 | n/a |
| Distance maximale (NM) | 400 | n/a |
| Plafond minimum (Pieds) | 600 | n/a |
| Visibilité minimale (Meters) | 3000 | n/a |
| Piste minimale (Feet) | 7000 | |
| Évitez les aéroports (Avoid ICAOs) | vide | n/a |
| Avoid TS/FG | Avoid TS/FG | n/a |

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
| Décoller (Takeoff altn) | NONE | n/a |
| En route (Enroute altn) | NONE | n/a |

**Bas de section**

| Champ | À taper | Valeur attendue |
|---|---|---|
| Gares en route (Enroute Stations) | Disabled | n/a |
| Aéroports sélectionnés (Selected Airports) | vide | n/a |

## §0.9 · SCÉNARIO ETOPS

n/a hors survol maritime ou désertique.

## §0.10 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

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

### ⑥ Vitesses en vol · 10 cellules

| Champ | Valeur |
|---|---|
| Montée initiale | |
| Montée basse | |
| Montée IAS | |
| Montée Mach | |
| Croisière Mach | |
| Descente Mach | |
| Descente IAS | |
| Approche lisse | |
| Vitesse FAF | |
| Plancher finale | |

**Repères non lus**

| Repère | Valeur |
|---|---|
| Route | |
| Date | |
| Immatriculation | |
| MANQUE | |

---

## SAISIE FMS <type> (§7.A)

⚠ Section présente seulement pour un vol `A388` (§A.6). Vol famille A320 : supprimer cette section et garder la suivante. Tout autre type : supprimer les deux. Une valeur par cellule, au format de saisie du FMS (tonnes à une décimale) ; `contrôle : <valeur>` pour ce qui est importé ou calculé ; `vide` pour ce qui reste vide. Les 79 lignes ci-dessous sont celles du gabarit §15 de `page_A380-800_FMS.md`, dans cet ordre.

| Page FMS | Champ | Saisie |
|---|---|---|
| INIT | Première action | |
| INIT | FLT NBR | |
| INIT | FROM | |
| INIT | TO | |
| INIT | ALTN | |
| INIT | CPNY RTE | |
| INIT | ALTN RTE | |
| INIT | CRZ FL | |
| INIT | CRZ TEMP | |
| INIT | CI | |
| INIT | TROPO | |
| INIT | TRIP WIND | |
| FUEL&LOAD | ZFW | |
| FUEL&LOAD | ZFWCG | |
| FUEL&LOAD | BLOCK | |
| FUEL&LOAD | TAXI | |
| FUEL&LOAD | PAX NBR | |
| FUEL&LOAD | CI | |
| FUEL&LOAD | RTE RSV | |
| FUEL&LOAD | RTE RSV % | |
| FUEL&LOAD | JTSN GW | |
| FUEL&LOAD | ALTN | |
| FUEL&LOAD | FINAL | |
| FUEL&LOAD | MIN FUEL AT DEST | |
| FUEL&LOAD | TRIP | |
| FUEL&LOAD | TOW | |
| FUEL&LOAD | LW | |
| FUEL&LOAD | EXTRA | |
| DEPARTURE | RWY | |
| DEPARTURE | SID | |
| DEPARTURE | TRANS | |
| DEPARTURE | EOSID | |
| DEPARTURE | Validation | |
| ARRIVAL | APPR | |
| ARRIVAL | STAR | |
| T.O | CRZ FL (haut de page PERF) | |
| T.O | T.O SHIFT | |
| T.O | V1 | |
| T.O | VR | |
| T.O | V2 | |
| T.O | Poussée | |
| T.O | Température FLEX | |
| T.O | FLAPS | |
| T.O | THS FOR | |
| T.O | PACKS | |
| T.O | ANTI-ICE | |
| T.O | THR RED | |
| T.O | ACCEL | |
| T.O | TRANS | |
| T.O | EO ACCEL | |
| CLB | CI | |
| CLB | DERATED CLB | |
| CLB | PRESEL SPD | |
| CLB | CLB SPD LIM | |
| CLB | TRANS | |
| CLB | PRED TO | |
| CRZ | CI | |
| CRZ | PRESEL MACH | |
| CRZ | PRESEL SPD | |
| CRZ | STEP ALTS | |
| DES | CI | |
| DES | DES CABIN RATE | |
| DES | Mode | |
| DES | MACH | |
| DES | SPD | |
| DES | PRED TO | |
| DES | TRANS | |
| APPR | MAG WIND | |
| APPR | OAT | |
| APPR | QNH | |
| APPR | BARO | |
| APPR | RADIO | |
| APPR | CONF | |
| APPR | VAPP | |
| APPR | TRANS | |
| GA | THR RED | |
| GA | ACCEL | |
| GA | TRANS | |
| GA | EO ACCEL | |

Paragraphe des valeurs à confirmer à l'écran, avec leur marqueur de source.

**Chargement dans IF.** Passagers à environ 77 kg chacun dans IF : fret à ajouter en soute pour retrouver la charge utile de SimBrief.


---

## SAISIE FMS <type> (§2.5)

⚠ Section présente seulement pour un vol `A318` `A319` `A320` `A321` `A19N` `A20N` ou `A21N` (§A.6). Pour tout autre type, supprimer cette section. Une valeur par cellule ; tonnes à une décimale ; `contrôle : <valeur>` pour ce qui est importé ; `vide` pour ce qui reste vide. Les 39 lignes ci-dessous sont celles du gabarit §2.5 du dossier, dans cet ordre.

| Page FMS | Champ | Saisie |
|---|---|---|
| INIT | Première action | |
| INIT | FROM | |
| INIT | TO | |
| INIT | FLT NBR | |
| INIT | ALTN | |
| INIT | COST INDEX | |
| INIT | CRZ FL | |
| INIT | CRZ TEMP | |
| INIT 2/2 | ZFW | |
| INIT 2/2 | BLOCK | |
| PERF TAKE OFF | RWY | |
| PERF TAKE OFF | V1 | |
| PERF TAKE OFF | VR | |
| PERF TAKE OFF | V2 | |
| PERF TAKE OFF | FLAPS/THS | |
| PERF TAKE OFF | FLEX TO TEMP | |
| DEPARTURE | RWY | |
| DEPARTURE | SID | |
| DEPARTURE | TRANS | |
| DEPARTURE | Validation | |
| AIRWAYS | Route | |
| F-PLN | Points hors airway | |
| F-PLN | Points en coordonnées | |
| ARRIVAL | APPR | |
| ARRIVAL | VIA | |
| ARRIVAL | STAR | |
| ARRIVAL | Validation | |
| VERT REV | ALT CSTR | |
| F-PLN | DIST | |
| PERF APPR | ILS | |
| PERF APPR | TRANS LVL | |
| PERF APPR | VAPP | |
| PERF APPR | LDG CONF | |
| HOLD | Point | |
| HOLD | INB CRS | |
| HOLD | TURN | |
| HOLD | TIME/DIST | |
| RAD NAV | VOR1/ILS | |
| RAD NAV | CRS | |

Valeurs à confirmer à l'écran :

**Chargement dans IF.** Passagers à environ 77 kg chacun dans IF : fret à ajouter en soute pour retrouver la charge utile de SimBrief.

---

# SOURCES ET MÉTHODE

Un paragraphe par famille, à écrire au vol : identité, pistes, portes, dégagement, décollage, arrivée, carburant, masses, repères non lus, route, remarques du répartiteur. La prose porte la méthode et les sources, le tableau porte la valeur : jamais l'inverse, jamais les deux.

**Contrôle avant envoi** : sept lignes, à passer avant que la feuille parte en fichier :

- [ ] Les 49 cellules des six cartouches sont remplies, valeurs nues.
- [ ] Aucune cellule ne contient d'unité, d'espace de milliers, ni de second nombre.
- [ ] Aucun libellé déclaré n'apparaît en prose suivi d'un chiffre.
- [ ] **Aucun libellé du registre ne figure hors cartouche**, et aucun champ du §0 portant un libellé du registre n'est laissé sans valeur en colonne « À taper ».
- [ ] **Aucune cellule ne porte de marqueur autre que les six retirés à la lecture** : `[OFP]` `[FORM]` `[NAV]` `[SIM]` `[RDR]` `[CALC]`. `[WIP]` disqualifie, `[MANQUE]` seul vaut « non fourni », `[DOC]` et `[TIERS]` vivent en prose, tout le reste est rejeté en étant nommé (§Conventions). *Ligne ajoutée en REV 21, en même temps que le contrôle correspondant dans le parseur.*
- [ ] **Chaque vitesse des cartouches ③ et ⑥ a son rang de source nommé en prose (§5.1)**, et ni `Vapp` ni `Plancher finale` n'est sous un plancher observé du type. *Ligne ajoutée en REV 32.*
- [ ] **Section SAISIE FMS : 79 lignes pour l'A388, 39 pour la famille A320**, aucune cellule de temps, aucune valeur avec une barre (§A.6). *Ligne ajoutée en REV 34.*

---

# NOTES DU GABARIT

**Numérotation** : celle du §0 du dossier, section par section : `§0.1` Informations sur le vol, `§0.2` avion partie visible, `§0.2 bis` les neuf champs repliés derrière « Plus d'options », puis `§0.3` à `§0.10`. Aucune feuille ne renumérote et aucune ne remonte les neuf champs en tête : le titre « identification et équipement : priorité » est supprimé depuis la REV 22.

**Altitude initiale et autobrakes** : ces trois repères sont lus depuis la REV 26. L'altitude initiale est au cartouche ③ avec les autres altitudes, les deux crans d'autobrake au cartouche ②. Ils ne se saisissent plus à la main. Ne jamais confondre `Altitude initiale`, qui est celle du départ, avec `Altitude (Pieds)` du §0.4, qui porte le niveau de croisière : ce sont deux clés distinctes.

**Les deux portes : trois niveaux** : porte relevée en premier ; à défaut, le terminal relevé, préfixé `T` (`T2`, `TA`, `TIBZ`) ; à défaut des deux, `NIL`. Ordre de consultation : airportinfo.live d'abord, qui sert les deux portes ; Airportia en recoupement ; AirNav RadarBox si le vol n'y figure pas ; le tableau des départs du terrain en dernier recours. Ni la porte ni le terminal ne se déduisent : ils sont relevés, ou la cellule descend d'un niveau. La porte disparaît des tableaux dès que le vol a décollé : demandée avant, elle est là.

**Ce que le parseur fait des valeurs** : genre par genre, la table est au §A.5 du dossier. Quatre conséquences pour qui remplit une feuille :

- un cap s'écrit sur trois chiffres (`043`, pas `43`) ; un cap refusé laisse la case vide, la prose ne la remplit pas ;
- aucune masse ne s'écrit en tonnes ;
- **jamais deux nombres dans une cellule** : la cellule est refusée, la case reste vide ;
- les marqueurs s'écrivent en majuscules, crochets fermés, en colonne 2 ou en prose, jamais sur un libellé.

**Selected Route** : `vide` depuis la REV 35, SimBrief génère la route ; la valeur attendue porte l'orthodromie et la route estimée à l'orthodromie × 1,20 (§0.7).
