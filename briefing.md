# BRIEFING PRÉ-VOL — INFINITE FLIGHT

**REV 19**
Document de simulation. Aucune valeur opérationnelle réelle.

---

## CE QUI CHANGE DEPUIS LA REV 18

| # | Objet | Nature |
|---|---|---|
| 1 | **§0.1 · Identification et équipement** — les neuf champs de « Plus d'options » remontent en tête du §0, chacun avec une valeur à taper. Plus aucun « laisser vide » dans le dossier. | ajout, priorité |
| 2 | Les quatre boutons **Constructeur** (Équipement OACI, Transpondeur, PBN, Article 18) documentés | ajout |
| 3 | `Altitude (Pieds)` du tableau de dégagement **déclaré ignoré** — il entrait en conflit avec le FL de croisière | correctif bloquant |
| 4 | Cartouches du §A.4 **éclatés en une valeur par cellule** ; six libellés déclarés sortent de la zone « non lue » où ils étaient enterrés | correctif bloquant |
| 5 | `ZFW` renommé `Poids zéro carburant`, libellé du registre | correctif bloquant |
| 6 | Contrôle §A.5 reformulé : il ne promet plus une reprise impossible pour les libellés hors registre | correctif |
| 7 | Comptage refait — **34 cellules** au temps 1, méthode d'estimation pour chacune | correctif |
| 8 | Libellés du formulaire mis à jour : « Planifier les escaliers », « Nom de l'expéditeur » | mise à jour |
| 9 | `Compte alternatif` : doublon de formulaire déclaré assumé | clarification |

---

## RÈGLE DE NON-RÉPÉTITION

⚠ Une rubrique n'existe dans ce dossier que si SimBrief ne la produit pas **ET** si le MCDU ne la remplit pas **ET** si l'avion ne la contrôle pas lui-même.

**Absent d'ici, parce que l'OFP le porte mieux :** masses et postes carburant détaillés, distances, ETE, SID/STAR/route, profil vertical, élévations, METAR et TAF des trois terrains, vents et températures en route, écart ISA, NOTAM, longueurs de piste, TORA/TODA, MORA par segment, carburant prévu à chaque waypoint, step climbs, V1/VR/V2, flex, facteur limitant, stop margin.

**Absent d'ici, parce que l'avion le vérifie désormais :** volets en configuration décollage, spoilers armés, panneaux ceintures, cran d'autobrake, configuration décollage complète. Le mémo T.O de l'E/WD les tient tous les cinq, en direct (§7).

**Présent, parce que rien ne le produit :** l'état réel du FMS d'IF, les seuils de décision carburant, le briefing panne, les minima chartés, le schedule volets, les critères de stabilisation, les distances d'annonce, le déroutement à la main, les procédures propres au simulateur, et le contrat de lecture de la feuille.

⚠ Le §0 est l'exception assumée : il précède SimBrief, donc il ne peut rien répéter.

---

## CONVENTIONS

| Marqueur | Sens |
|---|---|
| `[OFP]` | plan de vol SimBrief |
| `[FORM]` | lu sur le formulaire de dispatch SimBrief |
| `[NAV]` | cartes et base de données |
| `[SIM]` | lu à l'écran par Milan |
| `[RDR]` | lu sur un suivi de trafic réel (horaires, immat, type, porte) |
| `[CALC]` | calculé, méthode indiquée |
| `[MANQUE]` | non fourni |

⚠ Une valeur sans source ne sort pas. Un chiffre orphelin est un chiffre inventé.

⚠ limite, seuil ou piège · ⇒ contrôle croisé · n/a sans objet, décidé et assumé

---
---

# PARTIE A · PROTOCOLE

## A.1 · RÔLES

Milan annonce le vol et observe le simulateur. Je remplis SimBrief, je lis l'OFP, je rends court.
Ce qui est observé en sim prime sur ce que je déduis, toujours.

---

## A.2 · L'ÉCHANGE, EN DEUX TEMPS

**TEMPS 1 — AVANT SIMBRIEF**
Milan annonce le vol. Une phrase, une capture d'un suivi de trafic `[RDR]`, ou les deux.
Je réponds par la FEUILLE SIMBRIEF (§0) : chaque champ du formulaire avec sa valeur, dans l'ordre de la page. Il tape, il génère.
Sortie dans le fil par défaut ; en fichier `.md` quand la feuille doit être chargée par la checklist en ligne — et alors le §A.5 s'applique intégralement.
La feuille se termine par les cinq cartouches du §A.4, **remplis d'estimations** : la checklist les réclame dès le temps 1 et n'accepte pas de cellule vide.

⚠ **DEUX CHOSES QUE MILAN SEUL PEUT DONNER** : le type exact volé dans IF, et sa masse à vide dans IF. Elles ne se déduisent pas, elles ne s'estiment pas, et je ne les relève pas moi-même.

**Si l'une des deux manque à l'annonce du vol, ma réponse s'ouvre par cette alerte, avant la feuille :**

```
⚠ ALERTE — IL MANQUE :
   · le type exact volé
   · la masse à vide IF de ce type
Sans ça, le ZFW n'est pas forçable et les vitesses seront calculées
pour une masse qui n'est pas celle du vol.
```

⇒ L'alerte sort en tête, jamais en bas de page ni noyée dans un paragraphe. Une seule des deux manque : l'alerte ne liste que celle-là.
⇒ Je sors quand même la feuille derrière, avec le ZFW et la chaîne des masses en `[MANQUE]`. Une feuille incomplète et signalée vaut mieux qu'une feuille complète et fausse.

**TEMPS 2 — APRÈS SIMBRIEF**
Milan colle l'OFP, ou sa capture. Je sors le briefing en six blocs (§A.4), cartouches en tête.

**ENSUITE, À LA DEMANDE**
Ce qu'il lit à l'écran du simulateur, et tout écart entre le sim et ce dossier.

Non demandé, sauf s'il change : le build, le serveur (Expert par défaut), le compte SimBrief.

⚠ Je ne peux pas lire son compte SimBrief. La feuille du temps 1 est une proposition à taper, pas une saisie que j'effectue.

---

## A.3 · RÈGLES ANTI-MÉLANGE

1. Toute valeur porte sa source.
2. Ne rien redemander de ce que l'OFP porte. Si je m'apprête à poser une question dont la réponse est sur le plan de vol, c'est que je ne l'ai pas lu.
3. Ne jamais affirmer ce que Milan a fait. Import lancé, page ouverte, saisie tentée : lui seul le sait.
4. Lire, pas extrapoler. D'une capture, ne tirer que ce qui est écrit dessus. Image ambiguë ⇒ demander la lecture, et ne pas conclure à une erreur de sa part sur un extrait partiel.
5. Un écran ne se diagnostique pas sans son état. Au sol ou en vol ? Route construite ? Croisière saisie ? ADIRS aligné ? Champs vides, 999:59 et 0.0 NM sont normaux sans route ni profil ; PFD et ND noirs sont normaux sans alignement.
6. Aucun report d'un vol à l'autre. Tout se régénère.
7. Contradictions signalées, pas arbitrées. Les deux à l'écran, l'écart nommé, Milan tranche.
8. **Ne jamais rendre une feuille avec des cases à remplir — sans exception, et « laisser vide » n'en est pas une.** Un champ que SimBrief remplit seul sort avec la valeur que SimBrief applique, écrite en clair, pour être comparée. Les 34 cellules des cartouches sortent estimées au temps 1, marquées `[CALC]` ou `[NAV]`, et se font écraser au temps 2.
9. **Le type volé et sa masse à vide dans IF viennent de Milan.** Je ne les déduis pas d'un type voisin, je ne les estime pas, je ne les invente pas. S'ils manquent, je le signale par l'alerte du §A.2 en tête de réponse — le silence sur un manque est la faute, pas le manque lui-même.
10. Un libellé ne s'ajoute à un cartouche qu'une fois inscrit au registre du parseur. Dans cet ordre, jamais l'inverse : un libellé écrit mais non déclaré ne fait pas remonter sa valeur, et rien ne le signale (§A.5).
11. **Un libellé déclaré au registre ne se range jamais dans un bloc annoncé comme non lu.** Soit il est lu et il est dans un cartouche, soit il n'est pas au registre. Il n'y a pas de troisième cas.

⚠ Un changement de piste, de masse ou de niveau refait les vitesses, la flex et le profil. Je le dis en sortie, je ne corrige pas en silence.

---

## A.4 · FORMAT DE SORTIE

**TEMPS 1** : la feuille SimBrief, dans l'ordre du formulaire, en trois colonnes — champ, ce qui se tape, valeur attendue. Rien d'autre : pas de météo, pas de commentaire de vol. Elle se termine par les cinq cartouches ci-dessous, **34 cellules remplies d'estimations**, chacune avec sa source rangée en prose sous le tableau.

**TEMPS 2** : le briefing, six blocs, un écran chacun. La PARTIE B ne sort pas, sauf demande.

### BLOC 0 · CARTOUCHES

⚠ **Libellés figés, format figé.** Voir §A.5. Deux colonnes, `Champ | Valeur`, valeur nue, sans unité, **une seule valeur par cellule**.

**① Identité — 3 cellules**

| Champ | Valeur |
|---|---|
| Callsign | |
| Compagnie | |
| Type | |

**② Pistes et dégagement — 6 cellules**

| Champ | Valeur |
|---|---|
| Piste départ | |
| Cap départ | |
| Piste arrivée | |
| Dégagement | |
| Cap dégagement | |
| Distance dégagement | |

**③ Vitesses et trajectoire — 14 cellules**

| Champ | Valeur |
|---|---|
| V1 | |
| VR | |
| V2 | |
| Flex | |
| Volets | |
| Réduction | |
| Accélération | |
| Transition | |
| ILS | |
| DA | |
| Vref | |
| Vapp | |
| Inbound | |
| Point inbound | |

**④ Carburant — 5 cellules**

| Champ | Valeur |
|---|---|
| BLOC | |
| BINGO | |
| MIN DIV | |
| EXTRA | |
| FUEL FACTOR | |

**⑤ Masses — 6 cellules**

| Champ | Valeur |
|---|---|
| Masse à vide IF | |
| Charge utile | |
| Poids zéro carburant | |
| Trip | |
| TOW | |
| LW | |

**Repères non lus** — hors registre, pour l'œil seulement, une valeur par ligne quand même :

| Repère | Valeur |
|---|---|
| Route | |
| Date | |
| Immatriculation | |
| Altitude initiale | |
| Autobrake départ | |
| Autobrake arrivée | |
| MANQUE | |

⚠ Ce bloc ne contient **aucun libellé du registre** (§A.3 règle 11). `Autobrake` y reste tant que le parseur ne le connaît pas ; il monte au cartouche ② le jour où la page sait le lire, pas avant.

⇒ Origine de chaque ligne **au temps 2** : V1, VR, V2, Flex et Volets du Runway Analysis `[OFP]` ; Réduction, Accélération et Transition posées à la main (§4) ; ILS, DA, Inbound et Point inbound des cartes `[NAV]` et de la STAR retenue (§6.6) ; Vref et Vapp calculées sur le LW `[CALC]` (§6.2) ; BLOC, EXTRA et FUEL FACTOR de l'OFP `[OFP]` ; BINGO et MIN DIV calculés (§3) ; les six masses de la page de garde `[OFP]`, sauf la masse à vide IF qui vient de Milan `[SIM]` ; les six lignes du cartouche ② de l'OFP et des cartes ; Autobrake décidé au briefing (§4).

**AU TEMPS 1 — comment j'estime les 34**

| Champ | Méthode d'estimation avant l'OFP |
|---|---|
| Callsign | indicatif réel de la ligne `[RDR]`, à défaut OACI + numéro |
| Compagnie | code OACI trois lettres de l'exploitant `[RDR]` |
| Type | donné par Milan `[SIM]`, jamais déduit |
| Piste départ | piste attendue au vent du METAR départ `[NAV]` |
| Cap départ | cap magnétique de cette piste `[NAV]` |
| Piste arrivée | piste attendue au vent prévu à l'ETA `[NAV]` |
| Dégagement | terrain retenu au §0 `[NAV]` |
| Cap dégagement | relèvement depuis l'arrivée `[CALC]` |
| Distance dégagement | orthodromie depuis l'arrivée `[CALC]` |
| V1 · VR · V2 | table du type à la TOW attendue du §0, CONF de départ retenue `[CALC]` |
| Flex | piste et masse du §0, plafond de flex du type `[CALC]` |
| Volets | configuration standard du type sur la longueur de piste attendue `[CALC]` |
| Réduction | élévation terrain + 1 500 ft, arrondi à la centaine supérieure `[CALC]` |
| Accélération | élévation terrain + 3 000 ft, arrondi à la centaine supérieure `[CALC]` |
| Transition | TA publiée du terrain de départ `[NAV]` |
| ILS | fréquence de la piste d'arrivée attendue `[NAV]` |
| DA | élévation terrain + 200 ft en CAT I, sauf minimum charté plus haut `[NAV]` |
| Vref | LW attendu par la table du type au §6.2 `[CALC]` |
| Vapp | Vref + 5, sans correction vent tant que le TAF n'est pas lu `[CALC]` |
| Inbound | distance d'interception standard, à défaut 10 NM du seuil `[CALC]` |
| Point inbound | FAF de l'approche attendue, nommé si la carte le donne `[NAV]` |
| BLOC | taxi + trip + contingence + dégagement + réserve finale `[CALC]` |
| BINGO · MIN DIV | §3, sur les postes estimés `[CALC]` |
| EXTRA · FUEL FACTOR | 0 et P00, sauf motif écrit `[CALC]` |
| Masse à vide IF | donnée par Milan, ou registre du §9 `[SIM]` |
| Charge utile | pax × 100 kg + fret, valeurs du §0 `[CALC]` |
| Poids zéro carburant | masse à vide IF + charge utile `[CALC]` |
| Trip | consommation horaire du type × ETE estimé `[CALC]` |
| TOW | ZFW + bloc − taxi `[CALC]` |
| LW | TOW − trip `[CALC]` |
| Autobrake départ | MAX, sauf motif écrit `[CALC]` |
| Autobrake arrivée | cran selon longueur de piste et état de surface `[CALC]` |

⚠ Aucune de ces 34 n'est une valeur de dispatch. Elles existent pour que la checklist s'affiche complète et pour donner un ordre de grandeur à comparer.
⇒ Au temps 2, elles se réécrivent sur l'OFP et le MCDU, et tout écart supérieur à un cran se nomme en sortie (§A.3 règle 7).

### BLOC 1 · MCDU APRÈS IMPORT
Ce que l'import a rempli et qu'il faut relire, ce qui reste à taper à la main, ce qui ne marchera pas.

### BLOC 2 · SEUILS CARBURANT
MIN DIV · BINGO · réserve finale, et la conduite à tenir en dessous. Le détail des postes est sur l'OFP.

### BLOC 3 · DÉCOLLAGE & PANNE
Avant V1 : interruption. Après V1 : EOSID ou cap piste jusqu'à [alt], retour ou dégagement. Réduction et accélération, à tenir à la main. Cran d'autobrake retenu.

### BLOC 4 · ARRIVÉE, CONFIGURATION & DÉROUTEMENT
Minima contre météo prévue · schedule volets du type avec la vitesse de sélection de chaque cran (§6.1) · Vref à la masse d'arrivée, Vapp corrigée du vent, conduite de l'arrondi (§6.2, §6.3) · distances d'annonce (§6.6) · dégagement, cap et distance directs.

⚠ Ce bloc sort avec ses chiffres. La masse d'atterrissage se prend sur le LW de l'OFP.

### BLOC 5 · VIGILANCE & VERDICT
Deux ou trois points propres à CE vol. Puis une ligne : GO, ou NO-GO motivé.

⚠ **Ce qui bloque un départ, et rien d'autre :** masse hors MTOW ou MLW · vitesses calculées pour une autre piste que celle attribuée · dégagement inutilisable · bloc inférieur à la somme des postes.
Tout le reste se note au bloc 5 et se vole.

---

## A.5 · CONTRAT DE LECTURE MACHINE

La feuille du vol n'est pas seulement lue par Milan : elle est chargée par la checklist en ligne, qui en extrait les valeurs et les pousse dans ses cases. Le format est donc une interface, pas une mise en page. Ce qui suit n'est pas un style, c'est un contrat.

**Ce qui est lu**

| Forme du tableau | Colonne lue |
|---|---|
| deux colonnes, quel que soit l'en-tête | colonne 2 |
| trois colonnes dont l'en-tête porte « À taper » | colonne 2 |
| toute autre forme | rien, tableau ignoré |

⚠ La troisième colonne n'est jamais lue. Une valeur qui n'existe que dans « Valeur attendue » n'atteint pas la checklist.

**Les six règles d'écriture d'une valeur**

1. **Valeur nue.** `6250`, pas `6 250 kg`, pas `6250 kg (bloc)`. Ni unité, ni espace de milliers, ni commentaire.
2. **Une cellule, une valeur.** Une cellule qui contient deux nombres est rejetée en entier. `64460` et non `64 460 kg — MLW 77 800, marge 13 340`. Les marges vont en prose, sous le tableau.
3. **Un libellé, une ligne, une fois.** Un même libellé dans deux tableaux crée un conflit silencieux.
4. **Libellés au caractère près.** Ceux du §A.4. Pas d'unité accolée, pas de reformulation, pas de ligne intercalée.
   ⚠ **Point ouvert.** Les libellés du §0 portent une parenthèse de traduction — `Passagers (Passengers)`, `Poids zéro carburant (ZFW, KG)`. Le registre, lui, déclare `Passagers` et `Poids zéro carburant` nus, mais `Altitude (Pieds)` avec sa parenthèse. Ces deux formes ne peuvent pas être justes en même temps. À trancher au prochain `window.debugBriefing()` : soit le parseur tronque à la parenthèse et le registre se met au format nu partout, soit il exige la forme complète et le registre recopie le §0 caractère pour caractère. Tant que ce n'est pas tranché, les valeurs des cartouches font foi — elles, portent le libellé nu.
5. **Aucune valeur chiffrée en prose à côté d'un libellé déclaré.** Écrire `MIN DIV = 1 100 + 1 050 = 2 150 kg · réserve finale = 1 100 kg` a fait lire 1100. La méthode s'écrit sans reprendre le libellé suivi d'un nombre : « le seuil de déroutement additionne le dégagement et la réserve finale, puis ajoute 5 % ».
6. **La prose porte la méthode et les sources, le tableau porte la valeur.** Jamais l'inverse, jamais les deux.

**Contrôle avant envoi** — quatre lignes, à passer sur toute feuille destinée au fichier :

- [ ] Les 34 cellules des cinq cartouches sont remplies, valeurs nues.
- [ ] Aucune cellule ne contient d'unité, d'espace de milliers, ni de second nombre.
- [ ] Aucun libellé déclaré n'apparaît en prose suivi d'un chiffre.
- [ ] **Aucun libellé du registre ne figure hors cartouche**, et aucun champ du §0 portant un libellé du registre n'est laissé sans valeur en colonne « À taper ».

⚠ La quatrième ligne a changé de sens en REV 19. La REV 18 promettait de reprendre en deux colonnes « tout champ utile laissé en AUTO » — impossible à tenir : contingence, réserve, taxi et FOD n'ont pas de libellé au registre, aucune reprise ne les fera lire. Leur valeur attendue reste en colonne 3 du §0, pour l'œil, et le bloc carburant réellement lu est le cartouche ④.

⚠ Une valeur fausse lue en silence est pire qu'une case vide. Une case vide se voit ; une valeur fausse se vole.

**Vocabulaire déclaré** — un libellé absent de cette liste n'atteint pas la checklist, même écrit dans un tableau parfait.

| Libellé à écrire | Ce qu'il alimente | Où il vit |
|---|---|---|
| Callsign · Compagnie · Type | identité — Compagnie porte le code OACI à trois lettres, jamais le nom commercial | cartouche ① |
| Piste départ · Cap départ · Piste arrivée | pistes | cartouche ② |
| Dégagement · Cap dégagement · Distance dégagement | déroutement | cartouche ② |
| V1 · VR · V2 · Flex · Volets | décollage | cartouche ③ |
| Réduction · Accélération · Transition | trois altitudes à la main | cartouche ③ |
| ILS · DA · Vref · Vapp · Inbound · Point inbound | arrivée | cartouche ③ |
| BLOC · BINGO · MIN DIV · EXTRA · FUEL FACTOR | carburant | cartouche ④ |
| Masse à vide IF · Charge utile · Poids zéro carburant · Trip · TOW · LW | masses | cartouche ⑤ |
| Selected Route | route ATC | §0 Itinéraire |
| Bloc horaire prévu · Cycle AIRAC · Passagers · Fret · Identifiant du pilote · Altitude (Pieds) | formulaire, colonne « à taper » | §0 |

**Libellés déclarés ignorés** — écrits dans la feuille, volontairement non résolus :

| Libellé | Pourquoi |
|---|---|
| Itinéraire (Route) | c'est la route du dégagement, pas celle du vol |
| Altitude (Pieds) — ligne du dégagement | c'est l'élévation du terrain de dégagement, pas le FL de croisière |

⚠ **Correctif bloquant de la REV 19.** `Altitude (Pieds)` était porté deux fois : au FL de croisière dans les Entrées facultatives, et à l'élévation du dégagement dans les Aéroports alternatifs. La règle « la dernière l'emporte » faisait donc remonter l'élévation du terrain à la place du niveau de croisière — silencieusement. La ligne du dégagement est désormais **ignorée**, et un libellé ignoré l'emporte sur toute autre résolution.

**En attente d'inscription au registre** — écrits dans le dossier, pas encore lus par la page :

| Libellé | Ce qu'il alimenterait |
|---|---|
| Autobrake départ · Autobrake arrivée | crans retenus |
| Immatriculation | identité appareil |
| Altitude initiale | première altitude après décollage |

⚠ Un même libellé porté deux fois avec la même valeur est une redondance assumée entre formulaire et cartouche. Porté deux fois avec deux valeurs différentes, c'est une erreur : la dernière l'emporte, et rien ne dit laquelle était juste.

⇒ Les pistes attendues passent aussi par les remarques du répartiteur, au format `DEP RWY EXPECTED nn` et `ARR RWY EXPECTED nn` : c'est la seule valeur du §0 qui atteint la checklist sans passer par un tableau.

---
---

# PARTIE B · DOSSIER

Référence. On y va chercher, on ne la lit pas d'un bout à l'autre.

---

## 0 · FEUILLE SIMBRIEF

Ordre, libellés et valeurs par défaut relevés sur `dispatch.simbrief.com`, affichage français `[FORM]`. Le libellé anglais suit entre parenthèses.

**Ordre des sections de la page** : Informations sur le vol → Informations sur l'avion (dont Plus d'options) → Sélections → Entrées facultatives → Planification du carburant → Entrées de texte → Itinéraire → Aéroports alternatifs → Scénario ETOPS → Météo historique → Paramètres de débogage.

⚠ **RÈGLE DE REMPLISSAGE.** Aucune ligne ne sort sans valeur. Ni « AUTO » seul, ni « laisser vide ».
- **À TAPER** — ce qui va dans la case, littéralement. C'est **la colonne lue par la checklist** (§A.5).
- **VALEUR ATTENDUE** — mon chiffre, pour comparer ce que SimBrief a calculé à ce que j'annonçais. Elle ne se saisit pas et **n'est pas lue par la page**.

⇒ Tout écart notable entre les deux colonnes se relève au §9 : c'est ma méthode qui se corrige, pas SimBrief.

---

### §0.1 · IDENTIFICATION ET ÉQUIPEMENT — PRIORITÉ

**Repliés derrière « Plus d'options », dans Informations sur l'avion.** Le bouton bascule en « Moins d'options » une fois déplié. Ces neuf champs sortent en tête parce qu'ils étaient les derniers du dossier livrés sans valeur.

| Champ | À taper | Valeur attendue |
|---|---|---|
| Facteur carburant (Fuel Factor) | P00 | écart réel mesuré au §9 |
| Inscription (Registration) | immatriculation réelle du vol | immat `[RDR]` |
| Numéro Fin (Fin Number) | trois derniers caractères de l'immatriculation | cosmétique |
| SELCAL | quatre lettres, deux paires, ordre croissant dans chaque paire | cosmétique |
| Code Mode-S (Mode-S Code) | six caractères hexadécimaux | code réel de l'immat si connu, sinon cohérent avec le préfixe pays |
| Équipement de l'OACI (ICAO Equipment) | SDFGHRWY | chaîne appliquée par SimBrief |
| Transpondeur (Transponder) | LB1 | chaîne appliquée par SimBrief |
| Capacité PBN (PBN Capability) | A1B1C1D1L1O1S1 | chaîne appliquée par SimBrief |
| Informations supplémentaires sur le FPL — Article 18 | DAT/V RMK/SIMBRIEF | chaîne appliquée par SimBrief |

⚠ **Les quatre dernières lignes changent de traitement en REV 19.** Le texte gris dans ces cases n'est pas un exemple : c'est la chaîne que SimBrief applique si la case reste vide. La REV 18 disait « laisser vide », ce qui rendait la valeur invisible et incomparable. Elle se **tape désormais explicitement**, à l'identique — même résultat sur le plan de vol, mais la valeur est écrite, donc vérifiable.

⚠ **Les quatre premières lignes du bloc gris sont des exemples, pas des valeurs.** `N999SB`, `999`, `ABCD` et `ZZZZZZ` sont des amorces de démonstration : les laisser produit un plan de vol au nom d'un appareil qui n'existe pas. Elles se remplissent depuis l'immatriculation réelle.

**Règles de dérivation** :
- **Numéro Fin** — les trois derniers caractères de l'immatriculation, sans tiret.
- **SELCAL** — quatre lettres prises entre A et S, **sans I, N ni O** ; deux paires, chaque paire en ordre alphabétique croissant, aucune lettre répétée. Se construit sur les lettres disponibles de l'immatriculation, complété si besoin.
- **Code Mode-S** — l'adresse OACI 24 bits de l'appareil, six caractères hexadécimaux. Connue : elle se tape. Inconnue : une valeur cohérente avec le bloc du pays d'immatriculation, marquée `[CALC]` et jamais présentée comme réelle.

**Les quatre boutons « Constructeur »** — présents à droite d'Équipement de l'OACI, Transpondeur, Capacité PBN et Article 18. Ils ouvrent un assistant à cases à cocher qui compose la chaîne à partir des équipements réellement embarqués.

⇒ Quand s'en servir : jamais par défaut. Uniquement si un vol exige une capacité que la chaîne standard ne déclare pas — RNP AR, CPDLC en zone océanique, MNPS. Sinon la chaîne standard passe partout, et l'assistant ne fait qu'introduire du risque de saisie.
⚠ Une chaîne modifiée par l'assistant se recopie dans le dossier au §9, sinon elle est perdue au vol suivant.

⚠ Aucun de ces neuf champs n'entre dans un calcul de masse, de carburant ou de vitesse. Ils s'impriment sur le plan de vol OACI. Une erreur ici n'empêche rien de voler — mais une case laissée à sa valeur de démonstration est une case oubliée, pas une case neutre.

---

### §0.2 · INFORMATIONS SUR LE VOL (Flight Info)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compagnie aérienne (Airline) | OACI 3 lettres | compagnie nommée |
| Numéro du vol (Flight Number) | numéro réel de la ligne | — |
| Partir (Depart) | OACI départ | — |
| Arriver (Arrive) | OACI arrivée | distance orthodromique |
| Alterner (Alternate) | OACI du dégagement | terrain nommé + cap et distance depuis l'arrivée |
| Heure de départ (EOBT) | `JJ Mmm AAAA - HH:MM` | heure UTC retenue |

⇒ Partir et Arriver sont encadrés en rouge tant qu'ils sont vides : état normal d'un formulaire neuf.
⇒ La flèche entre les deux inverse le sens du vol. L'icône ⟳ à côté de l'EOBT remet l'heure courante.
⇒ Le dégagement se nomme, jamais AUTO : c'est le terrain à briefer, et il doit tenir la météo de l'ETA, pas seulement les critères de distance.

### §0.3 · INFORMATIONS SUR L'AVION (Aircraft Info) — partie visible

| Champ | À taper | Valeur attendue |
|---|---|---|
| Type d'aéronef (Aircraft) | code type OACI | variante exacte volée dans IF |
| Variante ou cellule (Airframe) | le générique du type | motorisation attendue |
| Profil d'ascension (Climb) | AUTO | profil retenu, à relire sur l'OFP |
| Profil de croisière (Cruise) | AUTO | Mach de croisière attendu du type |
| Profil de descente (Descent) | AUTO | profil retenu, à relire sur l'OFP |
| Indicatif d'appel ATC (ATC Callsign) | celui qui sera tapé dans IF | — |

⚠ Le type doit exister dans IF, et dans la même variante. Un A330-300 planifié pour un -200 volé fausse masses, moteurs et vitesses.
⇒ « 0 Airframes Available » en rouge est normal tant qu'aucun type n'est choisi : la liste se peuple après sélection.
⇒ Le sélecteur `Sort: Registration` ordonne la liste des cellules ; le bouton **Éditeur de cellule** ouvre l'éditeur d'airframe — on n'y touche pas.
⇒ Les neuf champs du §0.1 se déplient sous cette section.

### §0.4 · SÉLECTIONS (Selections) — réglages permanents

| Champ | À taper | Valeur attendue |
|---|---|---|
| Disposition OFP (Layout) | LIDO | — |
| Cycle AIRAC | le cycle courant | fenêtre de validité |
| Unités (Units) | Kilograms | — |
| Cartes de vol (Flight Maps) | Detailed | — |
| Taxi Sortie / Entrée (Taxi Time) | 20 / 8 | départ / arrivée, en minutes |
| Règles de vol (Flight Rules) | IFR | — |
| Type de vol (Type of Flight) | Scheduled | — |
| Compte alternatif (Alternates) | 1 | — |
| Journal de navigation détaillé | ON | — |
| Planification ETOPS | ON | — |
| Planifier les escaliers (Stepclimbs) | ON | — |
| Analyse de la piste (Runway Analysis) | ON | — |
| Inclure les NOTAM | ON | — |
| NOTAM FIR | ON | — |

⇒ **AIRAC actuel** remet le cycle en cours si la liste a dérivé. **Save Defaults** fige toute la section d'un vol à l'autre.
⇒ Le libellé de la troisième bascule s'affiche « Planifier les escaliers » selon la largeur de la fenêtre ; c'est le même réglage que « Planifier les montées d'escalier ».
⚠ Ces six interrupteurs sont ce qui autorise ce dossier à être aussi court. Éteindre l'un d'eux rouvre un trou que rien ne comble.
⚠ Quand le cycle SimBrief prend de l'avance sur la base d'IF, un waypoint récent peut être refusé à l'import (§2.2 ①).

### §0.5 · ENTRÉES FACULTATIVES (Optional Entries)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Bloc horaire prévu (Sched Block Time) | `h : mm` | ETE estimé + 28 min de roulage, arrondi à 5 min |
| Départ Runway (Depart Rwy) | AUTO | piste attendue au vent du METAR départ |
| Arrivée Runway (Arrival Rwy) | AUTO | piste attendue au vent prévu à l'ETA |
| Altitude (Pieds) | le FL retenu, chiffré | conforme à la règle semi-circulaire |
| Passagers (Passengers) | chiffre | capacité du type × 0,85, arrondi |
| Fret (Freight, KG) | chiffre, 0 si rien | fret retenu |
| Charge utile (Payload, KG) | chiffre | pax × 100 kg + fret |
| Poids zéro carburant (ZFW, KG) | chiffre forcé | masse à vide IF du type (§9) + charge utile |

⇒ **Le ZFW est le champ qui compte le plus.** Il se force à la masse que l'avion aura RÉELLEMENT dans IF. C'est le seul moyen d'obtenir vitesses et flex calculées pour la masse volée.
⚠ Masse à vide du type absente du §9 : je la demande à Milan par l'alerte du §A.2, et le champ sort en `[MANQUE]` tant qu'elle n'est pas donnée. Une estimation sur un type voisin s'est écartée de 4 900 kg.
⇒ Le champ Fret affiche `NONE` par défaut : taper 0 revient au même, mais la case est alors traitée.
⚠ Notice « freight + custom payload » : normale, rien à corriger.
⇒ **Pistes en AUTO** : AUTO choisit selon le vent réel, exactement comme IF. Ma piste attendue sort en face pour être comparée, pas tapée — et se retrouve au cartouche ② pour la checklist.
⚠ `Altitude (Pieds)` est ici le **FL de croisière**. Le champ homonyme du dégagement est déclaré ignoré (§A.5).

### §0.6 · PLANIFICATION DU CARBURANT (Fuel Planning)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Carburant de secours (Contingency) | Auto | 5 % du trip fuel |
| Carburant de réserve (Reserve) | Auto | 30 min d'attente à 1500 ft au-dessus du dégagement |
| Carburant pour taxis (Taxi Fuel) | AUTO | 20 min au débit roulage du type |
| Bloc carburant (FOB) | AUTO | = bloc calculé |
| Carburant d'arrivée (FOD) | AUTO | bloc − trip − taxi |
| Carburant MEL (MEL Fuel) | 0 | — |
| Carburant ATC (ATC Fuel) | 0 | — |
| Carburant WXX (WXX Fuel) | 0 | — |
| EXTRA | 0, ou un chiffre avec motif écrit | le motif |
| Transport de pétrole (Tankering) | 0 | — |

⇒ Le sélecteur à gauche du champ EXTRA reste sur `EXTRA`. Toutes les unités restent en KG.
⇒ EXTRA non nul seulement avec un motif écrit ; le motif remonte dans les remarques du répartiteur.
⚠ Contingence, réserve, taxi et FOD n'ont **pas de libellé au registre** : leur valeur attendue reste en colonne 3, pour l'œil. Le seul carburant lu par la checklist est le cartouche ④ (§A.5).

### §0.7 · ENTRÉES DE TEXTE (Text Entries)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | — |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | — |
| Nom du premier officier (First Officer) | Random | — |
| Nom de l'expéditeur (Dispatcher Name) | Random | — |
| Remarques du répartiteur | une ligne par remarque | piste attendue · seuil BINGO · dégagement · motif de l'EXTRA |

⇒ Les remarques remontent sur l'OFP : c'est le seul endroit où mes seuils s'impriment à côté des chiffres SimBrief.
⇒ Format retenu pour les pistes, lisible par la page : `DEP RWY EXPECTED nn` et `ARR RWY EXPECTED nn`.
⇒ Le quatrième champ s'affiche « Nom de l'expéditeur » ou « Nom du distributeur » selon la traduction servie : c'est le même champ Dispatcher Name.

### §0.8 · ITINÉRAIRE (Route)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | la route en format ATC, sans les terrains | route complète SID → airways → STAR |

⇒ Six raccourcis externes sur la barre de section : FlightAware, SkyVector, RouteFinder, GRD, EDI-GLA, Eurocontrol. La route obtenue se colle dans `Selected Route`.
⚠ Je fournis la route au temps 1, avec au moins un repli. Si elle est refusée à la génération, SimBrief a raison sur sa propre base et je reprends sur ce qu'il a retenu.
⇒ Depuis le build 18266, un changement de SID ou de STAR décidé après coup ne demande plus de regénérer l'OFP : il se fait au MCDU (§2.1). La route SimBrief reste la référence carburant, mais elle n'est plus une contrainte de navigation.

### §0.9 · AÉROPORTS ALTERNATIFS (Alternate Airports)

**Critères de recherche** — permanents :

| Champ | À taper | Valeur attendue |
|---|---|---|
| Compte alternatif (Alternates) | 1 | — |
| Distance maximale (NM) | 400 | — |
| Plafond minimum (Pieds) | 600 | — |
| Visibilité minimale (Meters) | 3000 | — |
| Piste minimale (Feet) | 7000 | 9000 pour un long-courrier lourd |
| Évitez les aéroports (Avoid ICAOs) | vide | — |
| Avoid TS/FG | `Avoid TS/FG` | écarte les terrains annoncés en orage ou brouillard |

⚠ `Compte alternatif` apparaît **deux fois** dans le formulaire : ici et en Sélections. C'est le même réglage miroir, pas un conflit — le libellé n'est pas au registre, rien ne le lit. Les deux lignes portent la même valeur, et c'est voulu.

**Dégagement n° 1** :

| Champ | À taper | Valeur attendue |
|---|---|---|
| Aéroport (Airport) | l'OACI retenu | terrain nommé |
| Piste (Runway) | N/A | piste attendue au vent |
| Altitude (Pieds) | AUTO | élévation du terrain |
| Itinéraire (Route) | DCT | cap et distance depuis l'arrivée |

⚠ Les deux dernières lignes portent des libellés **déclarés ignorés** (§A.5). Elles s'écrivent pour la lecture humaine et ne remontent rien. Le cap et la distance du dégagement vivent au cartouche ②, sous `Cap dégagement` et `Distance dégagement`.
⇒ Le bouton **Trouver** analyse la route du dégagement. « Veuillez analyser un itinéraire alternatif. » est le texte d'attente, pas une erreur.

**Les deux autres dégagements** :

| Champ | À taper | Valeur attendue |
|---|---|---|
| Décoller (Takeoff altn) | NONE | terrain nommé si la météo départ est sous les minima de retour |
| En route (Enroute altn) | NONE | terrain nommé sur survol maritime ou désertique |

**Bas de section — terrains en route** :

| Champ | À taper | Valeur attendue |
|---|---|---|
| Gares en route (Enroute Stations) | Disabled | — |
| Aéroports sélectionnés (Selected Airports) | vide | terrains dont la météo mérite d'être imprimée |

⇒ Ce bloc ne choisit aucun dégagement : il ajoute des METAR et TAF au bloc météo de l'OFP.

### §0.10 · SCÉNARIO ETOPS (ETOPS Scenario)

Actif seulement sur survol maritime ou désertique. Sinon : n/a, ne pas y toucher.

| Champ | À taper | Valeur attendue |
|---|---|---|
| Threshold | 60 min | — |
| Scenario | Auto | — |
| Exclude Airports | vide | — |
| Entry · Exit | AUTO · AUTO | points d'entrée et de sortie de zone |
| Altn 1 à 6 | NONE | terrains attendus sur l'arc |

⇒ Puis **Calculate** : les six Altn se remplissent seuls.

### §0.11 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

n/a, décidé et assumé.

⚠ Une fois l'OFP généré, c'est lui qui fait foi. Si SimBrief a retenu autre chose que ce que j'ai proposé — piste, FL, dégagement, masse — je reprends le briefing sur ses valeurs.

---

## 1 · CE QUE PORTE L'OFP

La carte anti-répétition. Rien de ce qui suit ne se redemande, ne se recopie, ni ne se recalcule.

- **Page de garde** — callsign, compagnie, n° de vol, type, immat, terrains, dégagement, EOBT, FL, cost index, distance, ETE.
- **Bloc masses** — payload, OEW, ZFW, TOW, LW, limites structurales et marges.
- **Bloc carburant** — taxi, trip, contingence, dégagement, réserve finale, extra, total bloc.
- **Navlog détaillé** — waypoints, airways, distances, temps, vent et température par segment, MORA, carburant prévu à chaque point.
- **Runway analysis** — piste retenue, composantes de vent, V1/VR/V2, flex, facteur limitant, stop margin, longueurs disponibles.
- **Bloc météo** — METAR et TAF des trois terrains, vents en altitude.
- **NOTAM** — départ, arrivée, dégagement, FIR.
- **Step climbs** — si le vol en comporte.

**CE QUE L'OFP NE PORTE PAS**
- l'état du FMS d'IF (§2)
- les seuils MIN DIV et BINGO (§3)
- les MSA à 25 NM et les minima d'approche, qui sont sur les cartes
- le briefing panne au décollage (§4)
- le schedule volets et les VFE du type (§6.1)
- les distances d'annonce en arrivée (§6.6)
- les limites de vent de travers du type
- la masse à vide réelle du type dans IF — elle vient de Milan (§9)
- l'état d'usure de l'appareil en Live et sa puissance de freinage (§7)
- tout ce qui est propre au simulateur : fréquences IF, absence de Clearance Delivery, unicom

⚠ Deux contrôles à faire sur la route malgré tout : aucun waypoint dupliqué, et FL conforme à la règle semi-circulaire.

---

## 2 · FMS / MCDU

État au build 18266 (26.3 beta), relevé le 19/08/2026.

⚠ La 26.4 est annoncée comme apportant un FMS fonctionnel. Au premier vol sur 26.4, cette section est à reprendre entièrement.
⚠ Le cycle 26.3 bouge vite : entre deux builds, une ligne du §2.3 peut devenir fausse sans prévenir. Toute ligne de cette section se vérifie à l'écran avant d'être invoquée en vol.

### 2.1 · L'IMPORT FAIT LE TRAVAIL

Un vol SimBrief généré avec Analyse de la piste renseigne directement, à l'import :
FROM/TO · FLT NBR · CI · ZFW · BLOCK · CRZ FL · TO RUNWAY · FLAPS/THS · FLEX TO TEMP · V1/VR/V2 · et la page APPR (destination, piste, ILS et fréquence, élévation, TRANS LVL, VAPP, LDG CONF).

On relit, on ne retape pas.

⇒ L'import s'ouvre désormais dans une vue de briefing déroulante : la relecture se fait là, avant validation, plutôt que page par page dans le MCDU.

**LA ROUTE SE MODIFIE DANS LE MCDU**

Nouveau au build 18266 : **LAT REV, DEPARTURE et ARRIVAL**. La procédure choisie s'applique à l'INSERT et la route se met à jour.

⇒ Conséquence pratique : une piste changée par l'ATC ou par le vent ne demande plus de regénérer SimBrief. La SID se refait au MCDU, la STAR aussi.
⚠ Ce que ça ne refait pas : les vitesses, la flex et le carburant. Une piste de départ changée reste un recalcul complet (§2.2 ②), la route seule ne suffit pas.
⚠ À vérifier à l'usage : ce que devient une contrainte d'altitude saisie à la main quand la procédure est réinsérée. Relire les contraintes après chaque INSERT.

**RESTE À LA MAIN, DANS L'ORDRE :**

1. **ALTN sur INIT 1/2** — l'import ne l'apporte pas, le champ reste à tirets et un NOT ALLOWED ambre s'affiche. Un appui LSK à scratchpad vide restaure la valeur SimBrief.
2. **Contraintes d'altitude**, waypoint par waypoint, via VERT REV. Format `5000` ou `FL350`, CLR retire.
   ⚠ Le code couleur ne dit pas ce qui vient de toi : des niveaux apparaissent en magenta sans qu'aucune contrainte n'ait été saisie. Ouvrir VERT REV et regarder si ALT CSTR est renseigné.
3. **Contraintes de vitesse** : inexistantes dans le MCDU. À tenir au sélecteur AP et à noter ici.

⚠ Le FMS accepte un profil vertical absurde sans un mot. La relecture des contraintes est le seul filet.

### 2.2 · LES TROIS CONTRÔLES QUI COMPTENT

**① LA ROUTE EXISTE**
DIST MCDU ≈ DIST OFP, écart ≤ 10 NM ou 2 %.
⚠ 0.0 NM après un import censé avoir chargé la route = route NON construite.
⚠ Une procédure réinsérée au MCDU change la distance : recomparer après, l'écart avec l'OFP n'a plus la même signification.

**② LES VITESSES SONT CELLES DE LA PISTE ATTRIBUÉE**
V1 ≤ VR ≤ V2. V1 = VR est normal si la piste n'est pas limitante ; seul V1 > VR est une erreur.
⇒ masse, piste, volets et vent du calcul = ceux du vol.
⚠ La masse du vol n'est pas celle de l'OFP (§2.3). Comparer la GW affichée en FUEL PRED à l'ETOW, et noter l'écart plutôt que recalculer.
⚠ Piste changée au roulage : les quatre valeurs et la flex sont à refaire, pas à ajuster. Refaire la SID au MCDU ne les refait pas.

**③ LA CROISIÈRE EST SAISIE ET L'AP SUIT**
CRZ FL/TEMP se saisit sur INIT 1/2 ou sur PERF CRUISE 2/4, format `FL350/-54`.
⚠ La saisie déplace aussi l'altitude sélectionnée au pilote automatique : la revérifier après.

Puis, avant repoussage : scratchpad vide, aucun message ambre, mémo T.O tout vert (§7).

### 2.3 · CE QUI NE MARCHE PAS

- **MASSES IMPORTÉES** — non fidèles. Le bloc carburant passe juste, le ZFW non. Observé sur l'A318 : GW 59,3 t avec 8,2 t à bord, soit un ZFW de 51,1 t contre 49,0 t à l'OFP, sans message.
  ⇒ On décolle plus lourd que la masse ayant servi au calcul des vitesses. Vérifier la marge au MTOW sur la masse RÉELLE.
- **SEC F-PLN** — PAGE NOT YET AVAILABLE. Non cité par le build 18266 : supposé toujours absent, à reconfirmer à l'écran.
- **OPT / REC MAX (PROG)** — à tirets même en croisière.
- **VNAV EN MONTÉE** — inexistant. TOD vide et 999:59 tant qu'on monte.
- **THR RED / ACCEL ALT / ALT DE TRANSITION** — absents du MCDU. Ces trois altitudes se tiennent à la main.
- **VAPP** — calculée, non modifiable. Observée 11 kt sous la valeur SimBrief à masse égale.
  ⇒ Écart > 5 kt : la valeur SimBrief fait foi et se tient au sélecteur.
- **FUEL PRED** — PREDICTION BASIS: PRESENT FUEL FLOW. Les relevés se prennent sur la jauge (§3).
  ⚠ Même défaut sur l'autonomie affichée en bas d'écran : au parking, elle extrapole un débit qui n'a aucun sens. Elle ne devient lisible qu'une fois les deux moteurs stabilisés.
- **ATC COMM** — lecture seule.
- **TRANS LVL** — affiché sans préfixe FL. Recouper avec la carte.
- **CRZ SPEED** — observée à .76 contre .77/.78 planifiés. Écart normal.
- **CRZ sur PROG** — refusée au sol. Retentable en montée.
- **TEMPÉRATURES D'HUILE MOTEUR** — négatives au spawn quelle que soit la température extérieure (−18 et −15 °C relevés à SAT +34 °C sur A330-900neo). Affichage seul, sans conséquence connue. Les températures de freins, elles, sont désormais cohérentes.

**À REVÉRIFIER — corrigé au build 18266, pas encore recontrôlé à l'écran**
- arrondi du FOB à l'ECAM
- ILS, course et glide en ROSE VOR et ROSE LS
- fiabilité de l'accord RADIO NAV et libellé de la station ou piste la plus proche
- mémo d'alignement ADIRS
⇒ Ces quatre lignes ne se retirent du dossier qu'après vérification en vol, pas sur la foi du changelog.

**DISPONIBLE ET UTILE**
RAD NAV accorde seul l'ILS d'ARRIVÉE dès l'import.
⚠ Une course qui ne colle pas à la piste de décollage est normale : c'est celle de l'arrivée.
DIR TO · **BRG/DIST sur PROG, qui accepte désormais les points hors route : fixes, navaids, aéroports, pistes et coordonnées** · NEARBY AIRPORTS sur DATA INDEX.
⇒ C'est avec ces trois-là que se gère un déroutement, faute de SEC F-PLN. Le BRG/DIST étendu les rend enfin utilisables sur un terrain qui n'est pas sur la route : relèvement et distance en direct vers le dégagement, sans rien casser du plan actif.
**AIDS FLIGHT REPORT et AIDS LANDING REPORT** — au MCDU MENU, à relever après le vol (§9).

---

## 3 · SEUILS CARBURANT

```
MIN DIV = dégagement + réserve finale
BINGO   = MIN DIV + 5 %
```

→ sous le BINGO, la décision de dérouter se prend, elle ne se discute plus.
→ RÉSERVE FINALE = urgence carburant.

⚠ Ces deux seuils sortent chiffrés au cartouche ④ du §A.4, jamais recalculés en prose à côté de leur libellé (§A.5 règle 5).

**Annonces** : MINIMUM FUEL (atterrissage prévu sous la réserve finale en cas de nouveau retard) · MAYDAY FUEL (réserve finale entamée ou le sera).

**SUIVI EN VOL**
Relevés sur la jauge, comparés à la colonne carburant du navlog aux deux ou trois points retenus au bloc 2.

⚠ Écart défavorable > 3 % du bloc :
1. vérifier ZFW et CI dans le MCDU
2. vent réel contre vent prévu
3. optimiser le niveau
4. réduire au Mach LRC
5. envisager le déroutement

Un écart qui grandit à chaque point est une tendance : elle se traite au point où on la voit.

⚠ Ne pas se fier à FUEL PRED pour ça (§2.3).

---

## 4 · DÉCOLLAGE & PANNE

**À TENIR À LA MAIN**
Réduction de poussée ____ ft · Accélération ____ ft · Altitude de transition ____ ft
⚠ Absentes du MCDU : rien ne les déclenchera.
⇒ Valeurs par défaut, tenues dès le temps 1 : réduction = élévation + 1 500 ft, accélération = élévation + 3 000 ft, arrondies à la centaine supérieure. La transition se lit sur la carte du terrain de départ — elle n'a rien à voir avec celle de l'arrivée.

**AUTOBRAKE** — cran retenu au décollage : ____
⇒ MAX au décollage, c'est ce que le mémo T.O attend. Un autre cran est un choix, pas un oubli : il se dit au briefing.
⚠ Le cran se sélectionne avant l'alignement. Le mémo T.O ne passe pas au vert tant qu'il n'est pas mis.

**SÉQUENCE**
1. A/THR armé avant lâcher frein
2. Poussée stabilisée avant 80 kt
3. Rotation à VR, 3°/s
4. Train rentré à Vz positive
5. Volets rentrés selon le schedule à l'altitude d'accélération (§6.1, lu à l'envers)
6. 250 kt sous 10 000 ft

**BRIEFING PANNE**, énoncé avant d'entrer en piste
- **AVANT V1** → interruption : idle, freinage max, inverseurs, spoilers, immobilisation, annonce.
- **APRÈS V1** → poursuite : assiette V2 (ou V2+10 si déjà au-dessus), symétrie, EOSID ____ ou cap piste jusqu'à ____ ft, altitude de sécurité ____ ft, retour piste ___ ou dégagement au décollage ____.
- **CISAILLEMENT** → TOGA, assiette de sauvegarde, configuration conservée.
  ⚠ Cisaillement signalé : flex interdite, TOGA.

**LIMITES DU TYPE**, non portées par l'OFP
Travers max ___ kt · arrière max ___ kt (piste sèche ; réduire si mouillée ou contaminée)

---

## 5 · EN VOL

**MONTÉE**
```
0 → 10 000    : 250 kt, 1800–2200 fpm
10 000 → FL180: ___ kt, 1500–1800
FL180 → FL260 : ___ kt, 1200–1500
FL260 → FL280 : transition IAS → Mach
FL280 → FL___ : Mach ____, 800–1000
```
⚠ VS < 300 fpm en montée finale : niveau trop élevé pour la masse, demander plus bas.
RVSM FL290–FL410 : écart entre altimètres ≤ 200 ft.

**CROISIÈRE**
⚠ Voler ≥ 2000 ft sous le FL maximum (marge de buffet).
Les step climbs planifiés sont sur l'OFP. Tout step change le CRZ FL : reprendre §2.2 ③.
OAT réelle contre OAT du navlog : un écart notable fausse le TOD.

**À CHAQUE WAYPOINT MAJEUR**
Carburant contre navlog (§3) · GS · ETA · météo destination au plus tard 1 h avant le TOD · dégagement toujours utilisable.

**DESCENTE — TOD MANUEL**
```
(altitude à perdre en milliers de ft) × 3
+ 10 NM pour décélérer et configurer
+ 1 NM par 10 kt de vent arrière
− 1 NM par 10 kt de vent de face
+ marge par contrainte intermédiaire
```
⇒ à comparer au TOD du MCDU une fois établi en croisière, écart max 15 NM.

Taux 1500–2000 fpm · 250 kt sous 10 000 ft · aérofreins jusqu'à 50 %
⚠ Ne pas combiner aérofreins et train pour rattraper un profil : demander un circuit d'attente.

**DÉPRESSURISATION** — descente vers FL100, ou le MORA du secteur s'il est plus haut.
**PANNE MOTEUR EN CROISIÈRE** — driftdown FL___ contre le MORA du segment. Terrain retenu ____

---

## 6 · ARRIVÉE

Ce que le MCDU remplit seul (piste, ILS, fréquence, élévation, TRANS LVL, LDG CONF) ne se recopie pas ici.

**MINIMA — cartes**
DA / MDA ____ ft · DH ____ ft · RVR mini ____ m
FAF ____ ft à ____ NM · course ___°
⇒ météo prévue à l'ETA au-dessus des minima, sinon dégagement.

---

### 6.1 · SCHEDULE VOLETS

La **VFE** est une limite structurale : la dépasser abîme. La **vitesse de sélection** est celle à laquelle le cran se sort en pratique. On sélectionne au second chiffre, jamais au premier.

**AIRBUS A318 / A319 / A320** `[NAV]`

| Config | VFE — limite | Sélection normale | Repère |
|---|---|---|---|
| Lisse | — | — | décélérer vers green dot |
| 1 (slats) | 230 kt | ~205 kt | à green dot |
| 1+F | 215 kt | ~200 kt | si sortie en approche |
| 2 | 200 kt | ~190 kt | à S speed |
| 3 | 185 kt | ~175 kt | avec le train |
| FULL | 177 kt | ~160 kt | puis décélération sur Vapp |

**Train** : sortie ≤ 250 kt · rentrée ≤ 220 kt · sorti ≤ 280 kt / M .67

⚠ **L'A321 ne partage pas ces VFE.** Aile plus chargée, crans différents : sa ligne se remplit au premier vol sur le type, VFE relevées à l'écran, et ne se déduit pas de la famille.
⚠ **L'A330-900neo non plus.** Aile, crans et masses sans rapport avec la famille A320.

**AUTRES TYPES** — à remplir au premier vol sur le type, puis gardé.

| Type | Conf 1 | Conf 2 | Conf 3 | FULL | Train |
|---|---|---|---|---|---|
| A321 | ___ kt | ___ kt | ___ kt | ___ kt | ___ kt |
| A330-900neo | ___ kt | ___ kt | ___ kt | ___ kt | ___ kt |
| ____ | ___ kt | ___ kt | ___ kt | ___ kt | ___ kt |

⚠ **Ordre en approche** : conf 3 et train ensemble, un point sous le plan ou vers 2000 ft. FULL une fois établi.
⚠ **Volets 1 en montée** : les VFE s'appliquent aussi à la rentrée.

---

### 6.2 · VREF ET VAPP

**VREF** `[CALC]` — conf FULL, par type. La formule A320 ne se transpose pas : à masse égale, un A321 se pose plus vite.

**A320** — `Vref ≈ masse d'atterrissage en tonnes + 73`, valable entre 50 et 73 t, précision ±3 kt.

| LW | Vref conf FULL |
|---|---|
| 55 t | 128 kt |
| 60 t | 133 kt |
| 64,5 t (MLW) | 138 kt |
| 70 t | 143 kt |

**A321** — pente d'environ 1 kt par tonne, à confirmer au premier vol contre la Vapp du MCDU.

| LW | Vref conf FULL |
|---|---|
| 60 t | 129 kt |
| 65 t | 134 kt |
| 70 t | 139 kt |
| 75 t | 144 kt |

**A330-900neo** — `[MANQUE]`. Aucune table, aucune pente : la première Vapp du MCDU sur le type sert de point de départ, et deux vols à des masses différentes donnent la pente.

**AUTRES TYPES** — à remplir au premier vol, puis gardé.

| Type | LW | Vref |
|---|---|---|
| ____ | ____ | ____ |

⇒ La masse d'atterrissage se lit sur le LW de l'OFP. Pas sur le ZFW, pas sur l'ETOW.
⇒ Au temps 1, l'OFP n'existe pas : la table se lit sur le LW attendu du cartouche ⑤.

**VAPP** `[CALC]`
```
Vapp = Vref + correction vent
minimum : Vref + 5
vent de face : + 1/3 de la composante
rafales : + l'incrément de rafale
plafond : Vref + 15
```

⚠ La Vapp du MCDU n'est pas modifiable et a été observée 11 kt sous la valeur SimBrief à masse égale. **Écart > 5 kt : la valeur SimBrief se tient au sélecteur.**
⚠ Vapp > Vref + 15 kt en courte finale : remise de gaz.

---

### 6.3 · ARRONDI

Il n'y a **pas de vitesse cible dans l'arrondi**. Chercher un chiffre au badin sous 50 ft produit soit un arrondi haut, soit un toucher dur.

```
50 ft   Vapp tenue, plan tenu, axe tenu
30 ft   début d'arrondi, assiette ~5°
20 ft   réduction des gaz à idle
0 ft    toucher train principal, assiette maintenue
```

- Ce qui se pilote là est **l'assiette**, pas la vitesse.
- La décélération de l'arrondi est une observation, pas une consigne : TD IAS 128 kt relevé au LANDING REPORT à GW 60,2 t sur A320.
- ⚠ **Limite de tail strike : 11,7° sur A320 train comprimé, moins sur A321 — fuselage plus long, marge réduite.** Ne pas dépasser 7,5° en arrondi sur A320 ; relever la limite du type avant le premier atterrissage sur A321 ou sur A330-900neo.
- Assiette figée après le toucher : ne pas reposer le train avant brutalement.

**Toucher visé** : 1000 ft après le seuil, ± 300. ⇒ à recouper avec le 1K MARK du LANDING REPORT.

---

### 6.4 · STABILISATION

à 1000 ft IMC / 500 ft VMC :
configuration finale · Vapp +10 / −5 · dans l'axe et sur le plan · < 1000 fpm · poussée stabilisée.

⚠ Un seul critère non tenu : remise de gaz. Sans discussion.

---

### 6.5 · ATTERRISSAGE ET REMISE DE GAZ

Après le toucher : spoilers vérifiés, inverseurs, autobrake, freinage manuel en fin de course. Dégagement complet avant d'annoncer piste dégagée.

⚠ **Puissance de freinage dégradée relevée à l'Aircraft Health (§7) : le cran d'autobrake se monte d'un cran et la distance disponible se regarde deux fois.** Une piste courte avec des freins usés est un motif de dégagement, pas un défi.

⚠ **REMISE DE GAZ OBLIGATOIRE** : non stabilisé · toucher au-delà de 2000 ft · piste non dégagée · Vapp > Vref + 15 kt en courte · doute sur le vent ou l'axe.

**REMISE DE GAZ**
TOGA · assiette ~15° · un cran de volets rentré (FULL → 3) · train à Vz positive · trajectoire publiée ou instruction ATC.
⚠ Après deux approches manquées, la troisième suppose un carburant au-dessus du BINGO. Sinon, déroutement.

**DÉROUTEMENT**
Pas de plan secondaire (§2.3). Cap direct ___° sur ___ NM, puis route reconstruite avec DIR TO. NEARBY AIRPORTS si le terrain retenu ne convient plus.
⇒ BRG/DIST sur PROG donne le relèvement et la distance vers le terrain de dégagement en direct, même hors route, sans toucher au plan actif (§2.3).

---

### 6.6 · ANNONCES D'ARRIVÉE — À QUELLE DISTANCE

**Méthode** — les distances se cumulent à l'envers depuis le seuil, tronçon par tronçon : finale, intercepteur, base, vent arrière ou transition, IAF. La distance se construit sur la STAR du jour.

| Annonce | Avec ATC | Sans ATC (Unicom) |
|---|---|---|
| ANNOUNCE INBOUND for landing | ~25 NM du seuil | 10 NM du seuil |
| Position et intentions | à chaque changement de tronçon | toutes les 2–3 min et à chaque virage |
| Finale annoncée | sur instruction | à l'établissement en finale |

⇒ Avec ATC, l'inbound se cale sur le check-in approche.
⇒ Repère de secours quand la STAR ne se cumule pas proprement : **IAF + un tronçon**.
⚠ Les lignes `Inbound` et `Point inbound` du cartouche ③ sortent d'ici.

---

## 7 · PROPRE AU SIMULATEUR

### ALIGNEMENT ADIRS — BLOQUANT, EN PREMIER

Sans alignement, **PFD et ND restent noirs** : drapeaux rouges ATT, ALT, SPD, VS et HDG, les deux ND en HDG MAP NOT AVAIL avec GPS PRIMARY LOST. L'E/WD et le SD, eux, fonctionnent — ils ne dépendent pas des centrales inertielles.

⇒ Ce n'est pas un bug, c'est la procédure. Rien ne le rappelle : aucun message ne dit que l'alignement manque, l'écran est simplement vide.
⇒ Ordre retenu : alimentation (batterie, puis externe ou APU) → **ADIRS** → le reste de la mise en route. L'alignement tourne pendant le briefing et le chargement.
⚠ Un décollage est impossible sans PFD. Ce point ne se rattrape pas au roulage.

### ÉTAT DE L'APPAREIL (Live)

Panneau **Aircraft Health** : condition, risque de panne, heures restantes estimées, puissance de freinage.

⇒ À regarder AVANT de générer l'OFP : un appareil usé change la distance d'atterrissage, donc le choix de piste, donc le dégagement.
⚠ Puissance de freinage dégradée : voir §6.5. Risque de panne élevé sur une longue étape : le noter au bloc 5, ou changer d'appareil.
⚠ Les pannes en Live sont désormais possibles en vol. Le briefing panne du §4 cesse d'être théorique.

### AVANT MISE EN ROUTE

Feux de position · beacon avant démarrage
Altimètres au QNH ⇒ élévation ± 75 ft
Transpondeur STBY au sol, ALT à l'alignement
Panneaux ceintures et no-smoking allumés — c'est un item du mémo T.O
Volets ___ · trim ____ (IF ne fournit pas de centrage, le champ THS reste à tirets) · spoilers armés · autobrake au cran retenu (§4)
Briefing décollage énoncé

### LE MÉMO T.O REMPLACE LA VÉRIFICATION MANUELLE

L'E/WD affiche un mémo de décollage dynamique, six lignes :

| Item | Cible attendue |
|---|---|
| AUTO BRK | MAX |
| SEAT BELTS | ON |
| CABIN | READY |
| SPLRS | ARM |
| FLAPS | T.O |
| T.O CONFIG | TEST |

Un item satisfait passe au vert ; ce qui reste à faire s'affiche en cyan derrière les pointillés.

⇒ **La vérification, c'est le mémo tout vert.** Pas une liste recopiée dans ce dossier : l'avion le fait mieux et en direct.
⚠ Un item qui refuse de passer au vert désigne exactement ce qui manque. C'est un diagnostic, pas une contrariété.

### COMPORTEMENTS À NE PAS PRENDRE POUR DES PANNES

- **Les pages du SD s'appellent seules** selon l'action en cours : APU au démarrage APU, ENGINE au démarrage moteur, WHEEL au mouvement des volets, puis retour à DOOR/OXY, page par défaut au sol. Rien à faire, c'est le comportement Airbus.
- **NORM BRK en ambre et ALTN BRK en vert** tant que le moteur 1 est arrêté : le circuit vert n'est pas pressurisé, le freinage passe sur le jaune. Cela redevient normal moteur 1 tournant.
- **Températures d'huile négatives au spawn** malgré une SAT positive (§2.3). Affichage seul.
- **Autonomie aberrante au parking** : extrapolation du débit courant, sans valeur tant que les moteurs ne sont pas stabilisés.
- **Mémos ambre SPEED BRK, NW STRG DISC, TCAS STBY, PARK BRK** au sol : états normaux, pas des alarmes.

### ROULAGE

Durée comparée au taxi fuel de l'OFP · carte sol suivie en continu · QNH confirmé · piste confirmée à l'ATIS
⚠ Piste en service ≠ piste prévue : vitesses et flex à recalculer, pas à ajuster. La SID, elle, se refait au MCDU (§2.1).
⚠ **Alertes de conflit de piste** : entrer sur une piste active avec du trafic entrant, ou s'approcher d'une piste occupée, déclenche désormais un avertissement. Il se traite, il ne se ferme pas.
Avant décollage : mémo T.O tout vert, transpondeur ALT, landing lights, strobes, A/THR armé, vitesses affichées, approche finale regardée.

### FRÉQUENCES ET ATC

⚠ IF n'a pas de position Clearance Delivery. Séquence : ATIS → Ground → Tower → Departure/Center → Approach → Tower → Ground. Le squawk est attribué automatiquement.
Sans ATC : Unicom 122.800 — intentions, position, piste, aéroport nommé. Écouter avant d'émettre (§6.6).
⇒ Avec ATC, un « direct to waypoint » peut désormais être donné en vectoring : il se lit comme une instruction, et se saisit en DIR TO.
Détresse : 7500 capture · 7600 radio · 7700 général

### APRÈS ATTERRISSAGE

Frein de parc · feux de position seuls · carburant restant relevé · AIDS FLIGHT REPORT et LANDING REPORT relevés (§9) · Aircraft Health relu si le freinage a paru différent

---

## 8 · GO / NO-GO

**BLOQUANT** — quatre points, pas un de plus :
- masse hors MTOW ou MLW
- vitesses calculées pour une autre piste que celle attribuée
- dégagement inutilisable à l'ETA
- bloc inférieur à la somme des postes

**À VÉRIFIER, non bloquant** :
OFP de moins de 2 h · MIN DIV et BINGO calculés · distance MCDU = distance OFP · briefing panne fait · schedule volets sorti pour le type · **34 cellules des cartouches renseignées** · **neuf champs du §0.1 renseignés, aucun laissé à sa valeur de démonstration** · type et masse à vide donnés par Milan, aucune alerte du §A.2 restée sans réponse · **ADIRS aligné, PFD et ND vivants** · **mémo T.O tout vert** · Aircraft Health regardé · build inchangé depuis la dernière observation du FMS · contrôle §A.5 passé si la feuille part en fichier

⇒ Le mémo T.O couvre à lui seul volets, spoilers, ceintures, cabine, autobrake et configuration décollage. Ces six lignes ne se revérifient pas à la main : elles sont vertes, ou elles ne le sont pas.

⚠ Une case n/a est traitée. Une case vide est oubliée.

⚠ **Recette de la feuille chargée** : toutes les valeurs résolues, aucun bandeau d'anomalie, aucune case marquée non résolue. Une seule case vide sans motif affiché est un défaut de format de la feuille, pas de la page (§9).

---

## 9 · APRÈS VOL

**MASSES À VIDE — REGISTRE DE CE QUE MILAN A DONNÉ**

Ce tableau n'est pas une liste de relevés à faire : c'est la mémoire des valeurs déjà fournies, pour ne pas les redemander deux fois.

| Type | Masse à vide IF | Source | MTOW / MLW |
|---|---|---|---|
| A318 | ≈ 39 500 kg | `[CALC]`, une valeur donnée (SimBrief : 37 416) | ____ |
| A320 | 42 100 kg | `[SIM]`, donné par Milan | 78 000 / 66 500 |
| A321 | 43 600 kg | `[SIM]`, donné par Milan | 93 800 / 77 800 |
| A330 (type exact non précisé) | 129 811 kg | `[SIM]`, donné par Milan | 242 000 / 185 000 |
| ____ | ____ | ____ | ____ |

⇒ c'est cette valeur qui sert à forcer le ZFW au temps 1 (§0.5). Type déjà présent ici : je l'utilise sans rien redemander. Type absent : alerte du §A.2.
⚠ Ne jamais déduire la masse à vide d'un type de celle d'un type voisin : l'écart constaté sur l'A321 était de 4 900 kg, soit 4,9 t d'erreur sur le ZFW, donc sur les vitesses et la flex.

**IDENTIFICATION ET ÉQUIPEMENT — REGISTRE**

| Immatriculation | Fin | SELCAL | Mode-S | Chaîne équipement modifiée ? |
|---|---|---|---|---|
| ____ | ____ | ____ | ____ | ____ |

⇒ Une chaîne composée avec un bouton **Constructeur** se recopie ici, sinon elle est refaite de zéro au vol suivant.

**ÉCARTS SIMBRIEF — la colonne « valeur attendue » du §0**
Champ où ma valeur attendue s'est écartée ____ · écart ____ · méthode à corriger ____
⇒ pistes, contingence, réserve, taxi, FOB et FOD sont les six lignes à relever en priorité.

**ÉCARTS EN VOL**
Carburant prévu / réel ____ / ____
⇒ trois vols alimentent le Fuel Factor du §0.1.
ETE prévu / réel ____ / ____ · TOD prévu / réel ____ / ____
Cause de l'écart principal ____

**AIDS — RELEVÉ D'ATTERRISSAGE**
TD IAS / GS ____ / ____ · Vz au toucher ____ fpm · G max ____ · écart d'axe ____ m · 1K MARK ____ · ground roll ____

**FMS**
Comportement inattendu observé ____ · valeur affichée jugée fausse ____ · ligne du §2.3 à corriger ____
Ligne de la liste « à revérifier » confirmée corrigée ____ ⇒ elle sort du dossier à la révision suivante.

**LECTURE DE LA FEUILLE PAR LA CHECKLIST**
Champ resté vide ou faux à l'écran ____ · cellule d'origine ____ · règle du §A.5 en cause ____
⇒ toute case mal lue est un défaut de format de ma part avant d'être un défaut de la page.

**Rubrique du dossier qui a fait doublon avec l'OFP, le MCDU ou le mémo T.O ce vol** : ____
⇒ elle saute à la révision suivante.

---

**FIN · REV 19 · Simulation uniquement**
