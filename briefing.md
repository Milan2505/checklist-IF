# BRIEFING PRÉ-VOL — INFINITE FLIGHT

**REV 33**
Document de simulation. Aucune valeur opérationnelle réelle.

---

## CE QUI CHANGE DEPUIS LA REV 32

**Objet de la révision : le dossier ne porte plus de procédure de mise en route.** Depuis les versions 26.4 et 26.5, Infinite Flight tient les procédures par des checklists assistées propres à chaque appareil. Le dossier garde ce qu'IF ne fait pas : les valeurs à taper dans SimBrief et au FMS.

| # | Objet | Nature |
|---|---|---|
| 1 | Retrait du §7.0 (cadre générique), du §7.0.A (bloc A321neo) et du §7.0 bis (menu MISC) | retrait |
| 2 | §7 · AVANT MISE EN ROUTE réduit au contrôle de masse au poste ; ROULAGE et APRÈS ATTERRISSAGE réduits à ce qui alimente le dossier | retrait |
| 3 | Nouveau §7.A · saisie FMS de l'A380-800 (`A388`), page dédiée `page_A380-800_FMS.md` | ajout |
| 4 | §8 : retrait des points ouverts et des vérifications liés au §7.0 et au §7.0.A ; ajout du point A388 | mise à jour |
| 5 | §9 : retrait du relevé SYSTÈMES ; ligne A388 au registre des masses à vide | mise à jour |
| 6 | Dans tout le dossier, « la checklist » ou « la checklist en ligne » désigne désormais la page en ligne, qui n'affiche plus que les valeurs de la feuille | précision |

⚠ **Ce que cette révision ne fait pas.** Elle ne touche ni au §0, ni aux six cartouches, ni au §A.4, ni au §A.5. Les 49 cellules sont inchangées.

## RÈGLE DE NON-RÉPÉTITION

⚠ Une rubrique n'existe dans ce dossier que si SimBrief ne la produit pas **ET** si le MCDU ne la remplit pas **ET** si l'avion ne la contrôle pas lui-même.

**Absent d'ici, parce que l'OFP le porte mieux :** masses et postes carburant détaillés, distances, ETE, SID/STAR/route, profil vertical, élévations, METAR et TAF des trois terrains, vents et températures en route, écart ISA, NOTAM, longueurs de piste, TORA/TODA, MORA par segment, carburant prévu à chaque waypoint, step climbs, V1/VR/V2, flex, facteur limitant, stop margin.

**Absent d'ici, parce que l'avion le vérifie désormais :** volets en configuration décollage, spoilers armés, panneaux ceintures, cran d'autobrake, configuration décollage complète. Le mémo T.O de l'E/WD les tient tous les cinq, en direct (§7).

**Présent, parce que rien ne le produit :** l'état réel du FMS d'IF, les seuils de décision carburant, le briefing panne, les minima chartés, le schedule volets, les critères de stabilisation, les distances d'annonce, le déroutement à la main, les procédures propres au simulateur, les vitesses d'approche et le plancher de finale avec le rang de leur source (§5.1), et le contrat de lecture de la feuille.

⚠ Le §0 est l'exception assumée : il précède SimBrief, donc il ne peut rien répéter.
⚠ **Les profils montée, croisière et descente du cartouche ⑥ ne contredisent pas cette règle** : l'OFP les porte, mais la checklist ne lit pas l'OFP. Au temps 2, ils se recopient de l'OFP sans se recalculer, comme V1, VR et V2.

⚠ **Les procédures ne vivent plus ici.** Mise sous tension, démarrage, avant décollage et arrêt sont tenus par les checklists assistées d'Infinite Flight, propres à chaque appareil. Le dossier ne les recopie pas.

---

## CONVENTIONS

| Marqueur | Sens |
|---|---|
| `[OFP]` | plan de vol SimBrief |
| `[FORM]` | lu sur le formulaire de dispatch SimBrief |
| `[NAV]` | cartes et base de données |
| `[SIM]` | lu à l'écran par Milan |
| `[RDR]` | lu sur un suivi de trafic réel (horaires, immat, type, porte) |
| `[WIP]` | montré ou annoncé par le studio, jamais vérifié à l'écran |
| `[CALC]` | calculé, méthode indiquée |
| `[MANQUE]` | non fourni |
| `[RÉEL]` | procédure ou valeur de l'Airbus A320/A321 réel, hors simulateur |
| `[DOC]` | document constructeur ou autorité pour le type exact : manuel de vol, QRH, fiche de certification, rapport d'évaluation opérationnelle, AIP |
| `[TIERS]` | documentation d'un add-on de simulation, outil tiers, communauté |

⚠ Une valeur sans source ne sort pas. Un chiffre orphelin est un chiffre inventé.
⚠ **Une valeur `[WIP]` n'entre dans aucun calcul, ne remplit aucune cellule de cartouche et ne franchit pas le §8.** Elle décrit ce qui est annoncé, pas ce qui vole.
⚠ **Une valeur `[RÉEL]` décrit l'avion réel, pas Infinite Flight.** Elle donne un ordre d'opérations et un ordre de grandeur ; elle ne prédit aucun affichage et n'entre dans aucun calcul de la feuille. Elle ne s'écrit que dans la PARTIE B.
⚠ **Une valeur `[DOC]` peut remplir une cellule**, écrite nue, quand aucune source `[SIM]` ni `[OFP]` n'existe pour ce vol (§5.1). Elle diffère de `[RÉEL]` sur un point : elle vise le type exact volé, pas la famille A320.
⚠ **Une valeur `[TIERS]` ne fixe jamais une vitesse seule.** Elle remplit une cellule seulement à défaut des rangs 1 à 4 du §5.1, toujours nommée en prose, et ne fait jamais descendre `Vref`, `Vapp` ni `Plancher finale` sous une valeur d'un autre rang.

⚠ **Six marqueurs sur onze sont retirés à la lecture** : `[OFP]` `[FORM]` `[NAV]` `[SIM]` `[RDR]` `[CALC]`. Les cinq autres ne le sont pas, et chacun a sa réponse : `[WIP]` disqualifie la cellule entière, `[MANQUE]` se lit « non fourni », `[RÉEL]`, `[DOC]` et `[TIERS]`, comme tout marqueur qu'une révision ajouterait, **font rejeter la cellule avec un motif qui les nomme**. `[RÉEL]` ne s'écrit que dans la PARTIE B ; `[DOC]` et `[TIERS]` s'écrivent en prose, sous le tableau, jamais en cellule. Cette règle n'est pas seulement rédactionnelle : elle est tenue par le parseur (§A.5).
⚠ **Le motif existe, son affichage n'est pas garanti.** Le bandeau ne montre le refus que si la clé est requise, que c'est le premier refus sur cette clé, qu'elle n'a pas été résolue ailleurs, et qu'au moins un cartouche a été lu. Un refus peut donc être juste et muet : ne jamais écrire une feuille en comptant sur le bandeau pour rattraper une erreur de format.

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
La feuille se termine par les six cartouches du §A.4, **remplis d'estimations** : la checklist les réclame dès le temps 1 et n'accepte pas de cellule vide.

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
8. **Ne jamais rendre une feuille avec des cases à remplir — sans exception, et « laisser vide » n'en est pas une.** Un champ que SimBrief remplit seul sort avec la valeur que SimBrief applique, écrite en clair, pour être comparée. Les 49 cellules des cartouches sortent estimées au temps 1, marquées `[CALC]` ou `[NAV]`, et se font écraser au temps 2.
   ⇒ Une donnée qui **ne peut pas être estimée** — et, pour une porte, seulement après que le terminal a été cherché lui aussi (§A.4) — sort en `NIL`, valeur nue, motif en prose (§A.5 règle 7). Une case en `NIL` n'est pas une case à remplir : elle est remplie, et ce qu'elle dit est vrai.
9. **Le type volé et sa masse à vide dans IF viennent de Milan.** Je ne les déduis pas d'un type voisin, je ne les estime pas, je ne les invente pas. S'ils manquent, je le signale par l'alerte du §A.2 en tête de réponse — le silence sur un manque est la faute, pas le manque lui-même.
10. Un libellé ne s'ajoute à un cartouche qu'une fois inscrit **au registre du parseur ET à la liste des champs de la page**. Dans cet ordre, jamais l'inverse : un libellé écrit mais non déclaré ne fait pas remonter sa valeur, et rien ne le signale (§A.5).
   ⚠ **Une inscription à moitié ne vaut rien.** Une clé déclarée au registre mais absente de la liste des champs est bien lue dans la feuille, puis jetée : aucune case ne la reçoit, aucun bandeau ne le dit, et seul un contrôle de démarrage la signale en console. C'est le même défaut silencieux que la règle prétend empêcher, une marche plus bas. La règle ne disait « registre » qu'au singulier jusqu'à la REV 23.
11. **Un libellé déclaré au registre ne se range jamais dans un bloc annoncé comme non lu.** Soit il est lu et il est dans un cartouche, soit il n'est pas au registre. Il n'y a pas de troisième cas.
12. **Ce qui est montré par le studio n'est pas ce qui vole.** Une capture WIP, un post ou un changelog se marque `[WIP]` et reste dans une section dormante jusqu'à la vérification à l'écran. Un correctif de changelog ne retire pas une ligne du dossier : seule une observation le fait.
    ⇒ Corollaire posé en REV 24 : **du matériel studio abondant n'est pas du matériel studio dirigé.** Deux captures d'un live peuvent ouvrir cinq sujets neufs sans fermer un seul point ouvert du dossier — c'est exactement ce qui s'est produit le 29/08/2026. Ce qu'on voit ne se choisit pas ; ce qu'on en tire, si.
13. **Toute vitesse sort avec le rang de sa source (§5.1), nommé en prose sous le cartouche.** Avant de descendre d'un rang, je cherche : recherche web multiple, sources primaires d'abord, fiche de certification et rapport d'évaluation opérationnelle du type. Un outil tiers ne fixe jamais une vitesse seul : il corrobore ou départage, et ne fait jamais baisser un plancher.
    ⇒ Origine, REV 32 : le 23/10/2026, une vitesse d'approche lue sur un outil tiers a amené le CRJX à une amorce de décrochage vers 600 ft (§6.2).

⚠ Un changement de piste, de masse ou de niveau refait les vitesses, la flex et le profil. Je le dis en sortie, je ne corrige pas en silence.

---

## A.4 · FORMAT DE SORTIE

**TEMPS 1** : la feuille SimBrief, dans l'ordre du formulaire, en trois colonnes — champ, ce qui se tape, valeur attendue. Rien d'autre : pas de météo, pas de commentaire de vol. Elle se termine par les six cartouches ci-dessous, **49 cellules remplies d’estimations**, chacune avec sa source rangée en prose sous le tableau.

⚠ **La feuille reprend la numérotation du §0 du dossier, section par section.** `§0.1 Informations sur le vol`, `§0.2 Informations sur l'avion — partie visible`, `§0.2 bis` pour les neuf champs repliés, puis `§0.3` à `§0.10`. Aucune feuille ne renumérote, n'ajoute une section, ni ne remonte un bloc en tête sous prétexte de priorité : le titre « identification et équipement — priorité » est supprimé depuis la REV 22 et ne revient pas.
⇒ Motif : la feuille se tape en descendant le formulaire à l'écran. Une numérotation qui ne suit pas celle du dossier n'est pas rejetée par la page — elle fait sauter des cases à l'œil, ce qui est exactement le défaut que l'ordre gelé du §0 ferme.
⚠ **Le gabarit vierge est un dérivé du dossier, jamais une source.** Il se refait à chaque révision qui touche le §0, le §A.4 ou le §A.5, il porte le numéro de cette révision, et il n'énonce aucune règle qui ne soit pas déjà ici. Un gabarit qui contredit le dossier est périmé, pas concurrent.

**TEMPS 2** : le briefing, six blocs, un écran chacun. La PARTIE B ne sort pas, sauf demande.

### BLOC 0 · CARTOUCHES

⚠ **Libellés figés, format figé.** Voir §A.5. Deux colonnes, `Champ | Valeur`, valeur nue, sans unité, **une seule valeur par cellule**.

**① Identité — 3 cellules**

| Champ | Valeur |
|---|---|
| Callsign | |
| Compagnie | |
| Type | |

**② Pistes, portes, autobrake et dégagement — 10 cellules**

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

**③ Vitesses et trajectoire — 15 cellules**

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

**⑥ Vitesses en vol · 10 cellules** *(REV 32)*

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

⇒ **Ce que dit chaque ligne.** `Montée initiale` : vitesse tenue du décollage à l'altitude d'accélération. `Montée basse` : vitesse de montée sous le FL100. `Montée IAS` et `Montée Mach` : vitesse indiquée au-dessus du FL100, puis Mach de transition. `Croisière Mach` : Mach de croisière. `Descente Mach` et `Descente IAS` : Mach de début de descente, puis vitesse indiquée jusqu'au FL100. `Approche lisse` : vitesse minimale en lisse avant le premier cran. `Vitesse FAF` : vitesse tenue à l'interception du plan. `Plancher finale` : vitesse sous laquelle la finale n'est plus stabilisée, remise de gaz.
⇒ Les vitesses de décollage et d'atterrissage déjà portées ne se répètent pas ici : `V1`, `VR`, `V2`, `Vref` et `Vapp` restent au cartouche ③.
⚠ **Les trois Mach s'écrivent sur deux décimales avec le point en tête** : `.78`, jamais `0.78`, jamais `M.78`, jamais `78`.

**Repères non lus** — hors registre, pour l'œil seulement, une valeur par ligne quand même :

| Repère | Valeur |
|---|---|
| Route | |
| Date | |
| Immatriculation | |
| MANQUE | |

⚠ Ce bloc ne contient **aucun libellé du registre** (§A.3 règle 11). La REV 26 en a sorti trois lignes : le parseur sait désormais lire `Autobrake départ`, `Autobrake arrivée` et `Altitude initiale`, elles sont donc montées aux cartouches ② et ③. C’était la sortie annoncée depuis la REV 23 — « il monte au cartouche ② le jour où la page sait le lire, pas avant ». Les quatre qui restent ne sont toujours lues par rien.

⇒ Origine de chaque ligne **au temps 2** : V1, VR, V2, Flex et Volets du Runway Analysis `[OFP]` ; Réduction, Accélération et Transition posées à la main (§4) ; ILS, DA, Inbound et Point inbound des cartes `[NAV]` et de la STAR retenue (§6.6) ; Vref et Vapp calculées sur le LW `[CALC]` (§6.2) ; BLOC, EXTRA et FUEL FACTOR de l'OFP `[OFP]` ; BINGO et MIN DIV calculés (§3) ; les six masses de la page de garde `[OFP]`, sauf la masse à vide IF qui vient de Milan `[SIM]` ; les six lignes de pistes et de dégagement du cartouche ② de l'OFP et des cartes ; **les deux portes du cartouche ② restent `[RDR]` — poste, à défaut terminal préfixé `T`, à défaut `NIL`** — l’OFP n’en porte aucune des trois formes, et aucune ne devient `[OFP]` au temps 2 ; les deux crans d’autobrake et l’altitude initiale décidés au briefing (§4), désormais au cartouche ; **au cartouche ⑥, les six vitesses de montée, croisière et descente des profils retenus par l'OFP `[OFP]`, la montée initiale sur la V2 de l'OFP `[CALC]`, l'approche lisse, la vitesse au FAF et le plancher sur le LW de l'OFP `[CALC]`, chacune avec son rang de source (§5.1).**

**AU TEMPS 1 — comment j’estime les 49**

| Champ | Méthode d'estimation avant l'OFP |
|---|---|
| Callsign | indicatif réel de la ligne `[RDR]`, à défaut OACI + numéro |
| Compagnie | code OACI trois lettres de l'exploitant `[RDR]` |
| Type | donné par Milan `[SIM]`, jamais déduit |
| Piste départ | piste attendue au vent du METAR départ `[NAV]` |
| Cap départ | cap magnétique de cette piste `[NAV]` |
| Porte départ | poste relevé sur le traceur de trafic `[RDR]` ; à défaut le terminal relevé, préfixé T ; à défaut `NIL` |
| Piste arrivée | piste attendue au vent prévu à l'ETA `[NAV]` |
| Porte arrivée | poste relevé sur le traceur de trafic `[RDR]` ; à défaut le terminal relevé, préfixé T ; à défaut `NIL` |
| Dégagement | terrain retenu au §0 `[NAV]` |
| Cap dégagement | relèvement depuis l'arrivée `[CALC]` |
| Distance dégagement | orthodromie depuis l'arrivée `[CALC]` |
| V1 · VR · V2 | table du type à la TOW attendue du §0, CONF de départ retenue `[CALC]` |
| Flex | piste et masse du §0, plafond de flex du type `[CALC]` |
| Volets | configuration standard du type sur la longueur de piste attendue `[CALC]` |
| Altitude initiale | première altitude de la SID, à défaut élévation terrain + 3 000 ft `[NAV]` |
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
| Montée initiale | V2 estimée + 10 `[CALC]` |
| Montée basse | 250, sauf restriction de SID plus basse `[NAV]` |
| Montée IAS · Montée Mach | registre des profils du §5.1 pour le type ; type absent, règle générique du §5.1 |
| Croisière Mach | registre des profils du §5.1 ; doit égaler la valeur attendue du profil de croisière au §0.2 |
| Descente Mach · Descente IAS | registre des profils du §5.1 pour le type ; type absent, règle générique du §5.1 |
| Approche lisse | méthode du type au §5.1, sur le LW attendu `[CALC]` |
| Vitesse FAF | 180, ou la VFE du cran sorti à l'interception moins 10 si elle est plus basse (§5.1) `[CALC]` |
| Plancher finale | Vapp − 5, relevé au plancher observé du type au §5.1 s'il est plus haut `[CALC]` |

⚠ **Une porte ne s’estime pas — et un terminal pas davantage.** Aucune méthode de calcul n’existe pour l’un ni pour l’autre : ce sont des données observées, ou rien. Pas de déduction depuis la compagnie, ni depuis l’habitude d’une ligne, ni depuis un autre vol du même exploitant — même au même terrain, le même jour.
⚠ **TROIS NIVEAUX, dans cet ordre de préférence, dans la MÊME cellule.** Les bases de statut servent très souvent le terminal alors qu’elles ne servent pas encore le poste, et un terminal connu vaut mieux qu’une cellule qui dit « rien ».

| Ce qui est relevé | Ce que porte la cellule | Exemples |
|---|---|---|
| le poste | la porte, telle quelle | `A49` · `B27` · `50-5` |
| le terminal seul, poste non publié | le terminal **préfixé `T`** | `T2` · `TA` · `TIBZ` |
| ni l’un ni l’autre | `NIL` | |

⇒ **Aucune clé `Terminal départ` ni `Terminal arrivée` n’est créée.** Le cartouche ② resterait à dix cellules douze fois sur dix : le terminal n’existe que par défaut de la porte, il vit donc dans la cellule de la porte. Deux cellules vides la plupart du temps, c’est le défaut qu’on ferme, pas qu’on déplace.
⇒ Un terminal est une donnée **relevée** : la page l’affiche en valeur pleine, comme un poste, et non dans l’habillage grisé réservé à `NIL`.
⚠ **Une porte réelle et une place de parking dans Infinite Flight sont deux choses différentes.** La porte est une référence de réalisme, pas une contrainte de spawn : elle n'est **pas** un point de vérification du §8, et un stand différent au parking n'est pas un écart à relever.

⚠ Aucune de ces 49 n’est une valeur de dispatch. Elles existent pour que la checklist s'affiche complète et pour donner un ordre de grandeur à comparer.
⇒ Au temps 2, elles se réécrivent sur l'OFP et le MCDU, et tout écart supérieur à un cran se nomme en sortie (§A.3 règle 7).
⚠ **Exception au paragraphe précédent : `Plancher finale`, `Vapp` et `Vref`.** Elles sont des valeurs à voler, pas seulement à comparer. Elles ne descendent jamais sous un plancher observé dans IF (§5.1), quelle que soit la valeur de l'OFP ou d'un outil.

### BLOC 1 · MCDU APRÈS IMPORT
Ce que l'import a rempli et qu'il faut relire, ce qui reste à taper à la main, ce qui ne marchera pas.

### BLOC 2 · SEUILS CARBURANT
MIN DIV · BINGO · réserve finale, et la conduite à tenir en dessous. Le détail des postes est sur l'OFP.

### BLOC 3 · DÉCOLLAGE & PANNE
Avant V1 : interruption. Après V1 : EOSID ou cap piste jusqu'à [alt], retour ou dégagement. Réduction et accélération, à tenir à la main. Cran d'autobrake retenu.

### BLOC 4 · ARRIVÉE, CONFIGURATION & DÉROUTEMENT
Minima contre météo prévue · schedule volets du type avec la vitesse de sélection de chaque cran (§6.1) · Vref à la masse d'arrivée, Vapp corrigée du vent, conduite de l'arrondi (§6.2, §6.3) · approche lisse, vitesse au FAF et plancher de finale du cartouche ⑥, avec leur rang de source (§5.1) · distances d'annonce (§6.6) · dégagement, cap et distance directs.

⚠ Ce bloc sort avec ses chiffres. La masse d'atterrissage se prend sur le LW de l'OFP.

### BLOC 5 · VIGILANCE & VERDICT
Deux ou trois points propres à CE vol. Puis une ligne : GO, ou NO-GO motivé.

⚠ **Ce qui bloque un départ, et rien d'autre :** masse hors MTOW ou MLW · vitesses calculées pour une autre piste que celle attribuée · dégagement inutilisable · bloc inférieur à la somme des postes · **table Vref absente pour le type volé** (§6.2).
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

**Les sept règles d'écriture d'une valeur**

1. **Valeur nue.** `6250`, pas `6 250 kg`, pas `6250 kg (bloc)`. Ni unité, ni espace de milliers, ni commentaire.
   ⚠ **Ce que le parseur tolère, et qui n'est pas une licence.** Sur une cellule numérique, il retire **tous les blancs** puis l'unité finale avant de valider : `6 250` et `250 kg` sont acceptés et ressortent `6250` et `250`. La règle n'en est pas assouplie — elle est écrite ici pour que le dossier dise ce que le code fait, plutôt que de promettre un refus qui n'arrive pas. Une feuille qui s'appuie sur cette tolérance est hors contrat, et rien ne le signalera.
   ⚠ **Ce n'est pas « l'espace de milliers » qui est retiré, c'est tout blanc — et c'est fait avant le test d'atomicité.** Deux nombres séparés par un blanc seul ne sont donc pas refusés : ils sont **soudés et acceptés**. `1 100 1 050` ressort `11001050`, sans motif et sans bandeau. `cleanCell` retirant marqueurs et astérisques en premier, il peut lui-même créer l'adjacence : `64 460 [CALC] 77 800` devient `64 460 77 800`, donc `6446077800`. Seule `Altitude initiale` s'en protège, par son `max:5`, et sous un motif qui ne nomme pas la cause.
   ⇒ Ce qui se refuse réellement avec motif : une cellule où survit autre chose qu'un chiffre — lettre, tiret, ponctuation, commentaire entre parenthèses — une décimale sur un champ entier, un marqueur hors des six retirés à la lecture, un dépassement de longueur maximale.
   ⇒ Point ouvert du §8 jusqu'au correctif : tester l'atomicité **avant** d'écraser les blancs, ou ne retirer un blanc qu'entre deux chiffres d'un même nombre.
   ⇒ **Les sept clés numériques du cartouche ⑥ portent un `max:3`** dès leur inscription (consignes Claude Code REV 32) : une vitesse soudée à une autre dépasse trois chiffres et part en refus, comme `Altitude initiale`.

2. **Une cellule, une valeur.** `64460`, et non `64 460 kg — MLW 77 800, marge 13 340`. Les marges vont en prose, sous le tableau.
   ⚠ **Cette règle est tenue par celui qui écrit, pas par le parseur.** Une cellule à deux nombres n'est rejetée que si quelque chose d'autre qu'un chiffre y survit — c'est le cas de l'exemple ci-dessus, à cause des lettres et du tiret. Deux nombres nus séparés par un blanc passent, soudés (règle 1). Le refus promis par les révisions 19 à 29 n'existe pas pour ce cas-là.
3. **Un libellé, une ligne, une fois.** Un même libellé dans deux tableaux crée un conflit silencieux.
4. **Libellés au caractère près.** Ceux du §A.4. Pas d'unité accolée, pas de reformulation, pas de ligne intercalée.
   ⚠ **POINT OUVERT — le seul défaut du dossier capable de faire lire une valeur fausse sans rien afficher.** Les libellés du §0 portent une parenthèse de traduction — `Passagers (Passengers)`, `Poids zéro carburant (ZFW, KG)`. Le registre, lui, déclare `Passagers` et `Poids zéro carburant` nus, mais `Altitude (Pieds)` avec sa parenthèse. Ces deux formes ne peuvent pas être justes en même temps. À trancher au prochain `window.debugBriefing()` : soit le parseur tronque à la parenthèse et le registre se met au format nu partout, soit il exige la forme complète et le registre recopie le §0 caractère pour caractère. Tant que ce n'est pas tranché, les valeurs des cartouches font foi — elles, portent le libellé nu.
   ⇒ Ce point est inscrit au §8 depuis la REV 20. Il ne se règle pas par déduction : une seule lecture de `window.debugBriefing()` le ferme définitivement.
5. **Aucune valeur chiffrée en prose à côté d'un libellé déclaré.** Écrire `MIN DIV = 1 100 + 1 050 = 2 150 kg · réserve finale = 1 100 kg` a fait lire 1100. La méthode s'écrit sans reprendre le libellé suivi d'un nombre : « le seuil de déroutement additionne le dégagement et la réserve finale, puis ajoute 5 % ».
   ⇒ Vaut pour les dix libellés du cartouche ⑥ : la prose écrit « le Mach de croisière vient du profil de l'OFP », jamais le libellé suivi de sa valeur.
6. **La prose porte la méthode et les sources, le tableau porte la valeur.** Jamais l'inverse, jamais les deux.
7. **Une valeur qui ne peut pas être estimée s'écrit `NIL`, jamais `[MANQUE]`.** `NIL` est une valeur nue : elle passe la lecture, elle s'affiche, et elle dit exactement une chose — la donnée n'a pas été observée. `[MANQUE]` dans une cellule lue la rend illisible : il ne fait pas partie des six marqueurs retirés à la lecture, et la cinquième ligne du contrôle ci-dessous la rejette. Le motif du `NIL` va **en prose, sous le tableau**, avec sa mention `[MANQUE]` si elle est utile.
   ⇒ **Règle générale, pas une exception aux portes.** Elle vaut pour toute cellule dont la valeur ne peut pas être estimée : le prochain champ non estimable rencontrera le même mur, et la réponse est déjà écrite.
   ⇒ Elle referme le conflit avec la **règle 8 du §A.3** — « ne jamais rendre une feuille avec une case à remplir ». Une case en `NIL` n'est pas une case à remplir : elle est remplie, et ce qu'elle dit est vrai.

**Contrôle avant envoi** — six lignes, à passer sur toute feuille destinée au fichier :

- [ ] Les 49 cellules des six cartouches sont remplies, valeurs nues.
- [ ] Aucune cellule ne contient d'unité, d'espace de milliers, ni de second nombre.
- [ ] Aucun libellé déclaré n'apparaît en prose suivi d'un chiffre.
- [ ] **Aucun libellé du registre ne figure hors cartouche**, et aucun champ du §0 portant un libellé du registre n'est laissé sans valeur en colonne « À taper ».
- [ ] **Aucune cellule ne porte de marqueur autre que les six retirés à la lecture** — `[OFP]` `[FORM]` `[NAV]` `[SIM]` `[RDR]` `[CALC]`. `[WIP]` disqualifie, `[MANQUE]` seul vaut « non fourni », tout le reste est rejeté en étant nommé (§Conventions). *Ligne ajoutée en REV 21, en même temps que le contrôle correspondant dans le parseur.*
- [ ] **Chaque vitesse des cartouches ③ et ⑥ a son rang de source nommé en prose (§5.1)**, et ni `Vapp` ni `Plancher finale` n'est sous un plancher observé du type. *Ligne ajoutée en REV 32.*

⚠ La quatrième ligne a changé de sens en REV 19. La REV 18 promettait de reprendre en deux colonnes « tout champ utile laissé en AUTO » — impossible à tenir : contingence, réserve, taxi et FOD n'ont pas de libellé au registre, aucune reprise ne les fera lire. Leur valeur attendue reste en colonne 3 du §0, pour l'œil, et le bloc carburant réellement lu est le cartouche ④.

⚠ Une valeur fausse lue en silence est pire qu'une case vide. Une case vide se voit ; une valeur fausse se vole.

**Vocabulaire déclaré** — un libellé absent de cette liste n'atteint pas la checklist, même écrit dans un tableau parfait.

| Libellé à écrire | Ce qu'il alimente | Où il vit |
|---|---|---|
| Callsign · Compagnie · Type | identité — Compagnie porte le code OACI à trois lettres, jamais le nom commercial | cartouche ① |
| Piste départ · Cap départ · Porte départ · Piste arrivée · Porte arrivée | pistes et portes | cartouche ② |
| Autobrake départ · Autobrake arrivée | crans retenus | cartouche ② |
| Dégagement · Cap dégagement · Distance dégagement | déroutement | cartouche ② |
| V1 · VR · V2 · Flex · Volets | décollage | cartouche ③ |
| Altitude initiale · Réduction · Accélération · Transition | quatre altitudes à la main | cartouche ③ |
| ILS · DA · Vref · Vapp · Inbound · Point inbound | arrivée | cartouche ③ |
| BLOC · BINGO · MIN DIV · EXTRA · FUEL FACTOR | carburant | cartouche ④ |
| Masse à vide IF · Charge utile · Poids zéro carburant · Trip · TOW · LW | masses | cartouche ⑤ |
| Montée initiale · Montée basse · Montée IAS · Montée Mach | montée | cartouche ⑥ |
| Croisière Mach · Descente Mach · Descente IAS | croisière et descente | cartouche ⑥ |
| Approche lisse · Vitesse FAF · Plancher finale | approche et finale | cartouche ⑥ |
| Selected Route | route ATC | §0 Itinéraire |
| Bloc horaire prévu · Cycle AIRAC · Passagers · Fret · Identifiant du pilote · Altitude (Pieds) | formulaire, colonne « à taper » | §0 |

⚠ **Les dix libellés du cartouche ⑥ ne sont lus qu'une fois inscrits au registre et à la liste des champs** (§A.3 règle 10). Avant l'application des consignes Claude Code REV 32, une feuille qui les porte ne fait rien remonter, et rien ne le dit.

**Genre des 49 clés** — ce que le parseur fait de la valeur, une fois le libellé résolu. Cette table décrit le code, pas la procédure : elle est ici pour que le dossier cesse de promettre ce que le code ne fait pas.

| Genre | n | Ce qui sort | Clés |
|---|---|---|---|
| `cap` | 2 | rendu sur trois chiffres, refusé au-delà de 360 — `7` devient `007`, `043` reste `043`. Borne non tenue sur le chemin prose, voir ci-dessous | Cap départ · Cap dégagement |
| `code` | 14 | tel quel, aucune réécriture | Callsign · Compagnie · Type · Piste départ · Piste arrivée · Porte départ · Porte arrivée · Dégagement · Volets · ILS · Point inbound · Montée Mach · Croisière Mach · Descente Mach |
| `text` | 4 | tel quel, aucune réécriture | Autobrake départ · Autobrake arrivée · Flex · FUEL FACTOR |
| numérique | 29 | l'espace de milliers et l'unité finale sont retirés avant validation (règle 1), aucune conversion d'unité | V1 · VR · V2 · Altitude initiale · Réduction · Accélération · Transition · DA · Vref · Vapp · Inbound · Distance dégagement · BLOC · BINGO · MIN DIV · EXTRA · Masse à vide IF · Charge utile · Poids zéro carburant · Trip · TOW · LW · Montée initiale · Montée basse · Montée IAS · Descente IAS · Approche lisse · Vitesse FAF · Plancher finale |

⚠ **Les comptes font foi, la répartition est reconstruite.** `11 / 4 / 2 / 22` venait de la revue des clés menée en REV 28, sur le code. L'affectation de chaque libellé à son genre, elle, a été reconstituée à partir de ce que la cellule porte — elle n'a pas été lue dans `js/data/fields.js`. Trois lignes sont des choix de reconstitution assumés et sont les premières à vérifier : `Flex`, qui peut porter une température comme une mention, `ILS`, qui porte une fréquence à décimale, et `Point inbound`, qui porte un repère nommé ou un DME.
⇒ **REV 32 : les dix clés du cartouche ⑥ sont, elles, déclarées par les consignes Claude Code avec leur genre**, trois en `code`, sept en numérique. Leur genre sera donc lu, pas reconstitué. Les comptes passent à `14 / 4 / 2 / 29`.
⇒ Une ligne fausse se corrige ici, en place. Si un compte ne tombe plus après correction, c'est la répartition qui est fausse — jamais le compte.
⚠ **Les trois Mach sont en `code` et non en numérique** : un champ numérique entier refuse la décimale (règle 1). `.78` traverse le genre `code` tel quel, et le format est tenu par un motif à la validation (consignes REV 32).
⚠ **Aucune des 49 cellules de cartouche ne sort convertie.** Ni tonnes, ni arrondi, ni reformatage : `TOW` et `LW` s'affichent en kilos, comme la feuille les écrit. La table Vref du §6.2 reste en tonnes parce qu'elle est lue par un humain, pas par la page.
⚠ **Une clé convertit, et elle n'est pas dans les 49 : `Altitude (Pieds)`, au §0.** Elle est rendue en niveau de vol — `35000` s'affiche `350`, `33000` s'affiche `330`, relevé sur les deux feuilles du dépôt. La feuille continue de porter le niveau en pieds, chiffré, comme le §0.4 le demande : c'est l'affichage qui traduit, pas la saisie. Tant que ce comportement n'est pas tranché comme voulu ou non, la phrase ci-dessus ne s'étend pas à lui.
⚠ **La borne 360 du cap ne protège que la cellule, pas la case.** `validate()` refuse bien un cap au-delà de 360 ; puis le balayage de la prose réécrit la clé, **parce qu'elle vient d'être refusée** — sa condition est « la clé est vide », et un refus laisse la clé vide. Le motif de prose capture trois chiffres sans borne et sans rendu sur trois chiffres, et la case une fois remplie n'est plus signalée comme non résolue. Conséquence pour qui écrit : **un cap faux dans la cellule et repris en prose s'affiche depuis la prose, sans un mot.** La prose ne doit jamais porter un cap qui contredit la cellule.
⇒ Point ouvert du §8 jusqu'au correctif : le balayage de prose doit distinguer une clé **absente** d'une clé **refusée**, et ne jamais réécrire la seconde.
⇒ `NIL` et un terminal préfixé `T` traversent tous les genres : ce sont des valeurs nues, pas des cas particuliers du parseur.

**Marqueurs — ce que le retrait attrape vraiment**

⚠ Les six marqueurs retirés à la lecture ne le sont **qu'en majuscules et crochets collés**. `[ofp]` n'est pas reconnu : la cellule part en refus, nommé — donc pas silencieux, mais refusé quand même. Les marqueurs s'écrivent en majuscules, sans espace dans les crochets.
⚠ Le filet des marqueurs inconnus **exige le crochet fermant**. `[RÉEL` sans fermeture, ou `(RÉEL)` entre parenthèses, traverse un champ `text` et s'affiche tel quel dans la case.
⚠ **Un marqueur collé à un libellé empêche la résolution, sans rien afficher.** `Cap départ [NAV]` en colonne 1 n'est pas nettoyé : la clé n'est pas reconnue, la valeur n'atteint aucune case, et rien ne le dit. Les marqueurs vivent en colonne 2 ou en prose, jamais sur le libellé.
⇒ Point ouvert du §8 jusqu'au correctif : insensibilité à la casse et aux espaces sur les six, fermeture non exigée sur le filet des inconnus, nettoyage du libellé avant résolution.

**Un dossier ne remplit aucune case**

⚠ L'extraction n'est **jamais** appelée sur `briefing.md` : seule une feuille de vol alimente la checklist. Le dossier peut donc contenir un libellé du registre suivi d'un nombre sans qu'aucune case bouge — la règle 5 reste une règle de feuille, et les tables de méthode du §A.4 ne sont pas un danger de lecture.
⇒ C'est ce qui corrige le récit du correctif `max:12` posé en REV 25. Le correctif est juste et fait son travail : sans lui, trois lignes du dossier résolvent sur la clé `Type`. Mais le gagnant de « la dernière l'emporte » serait le libellé du §0 `Type d'aéronef (Aircraft)`, pas la ligne de la table « AU TEMPS 1 » — et sur un dossier, aucun des deux ne remplit quoi que ce soit.

**Libellés déclarés ignorés** — écrits dans la feuille, volontairement non résolus :

| Libellé | Pourquoi |
|---|---|
| Itinéraire (Route) | c'est la route du dégagement, pas celle du vol |
| Altitude (Pieds) — ligne du dégagement | c'est l'élévation du terrain de dégagement, pas le FL de croisière |

⚠ **Correctif bloquant de la REV 19, toujours en vigueur.** `Altitude (Pieds)` était porté deux fois : au FL de croisière dans les Entrées facultatives, et à l'élévation du dégagement dans les Aéroports alternatifs. La règle « la dernière l'emporte » faisait donc remonter l'élévation du terrain à la place du niveau de croisière — silencieusement. La ligne du dégagement est **ignorée**, et un libellé ignoré l'emporte sur toute autre résolution.

**En attente d'inscription au registre** — écrits dans le dossier, pas encore lus par la page :

| Libellé | Ce qu'il alimenterait |
|---|---|
| Immatriculation | identité appareil |

⚠ Un même libellé porté deux fois avec la même valeur est une redondance assumée entre formulaire et cartouche. Porté deux fois avec deux valeurs différentes, c'est une erreur : la dernière l'emporte, et rien ne dit laquelle était juste.

⇒ Les pistes attendues passent aussi par les remarques du répartiteur, au format `DEP RWY EXPECTED nn` et `ARR RWY EXPECTED nn` : c'est la seule valeur du §0 qui atteint la checklist sans passer par un tableau.

---
---

# PARTIE B · DOSSIER

Référence. On y va chercher, on ne la lit pas d'un bout à l'autre.

---

## 0 · FEUILLE SIMBRIEF

Ordre, libellés et valeurs par défaut relevés sur `dispatch.simbrief.com`, affichage français `[FORM]`. Le libellé anglais suit entre parenthèses.

⚠ **ORDRE GELÉ — 74 champs, relevés sur capture le 24/08/2026.** Le §0 se lit dans l'ordre de l'écran, section par section et champ par champ, **sans exception**. Une feuille de temps 1 se remplit en descendant la page : tout écart entre l'ordre du dossier et l'ordre de la page fait sauter des cases. **Ce tableau fait foi, pas la mémoire.**

| § | Section de la page | n | Champs, dans l'ordre de l'écran |
|---|---|---|---|
| §0.1 | Informations sur le vol | 6 | Compagnie aérienne · Numéro du vol · Partir · Arriver · Alterner · Heure de départ (EOBT) |
| §0.2 | Informations sur l'avion — partie visible | 6 | Type d'aéronef · Variante ou cellule · Profil d'ascension · Profil de croisière · Profil de descente · Indicatif d'appel ATC — *puis le bouton* Plus d'options / Moins d'options |
| §0.2 bis | Informations sur l'avion — sous « Plus d'options » | 9 | Facteur carburant · Inscription · Numéro Fin · SELCAL · Code Mode-S · Équipement de l'OACI · Transpondeur · Capacité PBN · Informations supplémentaires sur le FPL (Article 18) |
| §0.3 | Sélections | 14 | *colonne gauche* Disposition OFP · Cycle AIRAC · Unités · Cartes de vol · Taxi Sortie / Entrée · Règles de vol · Type de vol · Compte alternatif — *puis interrupteurs* Journal de navigation détaillé · Planification ETOPS · Planifier les escaliers · Analyse de la piste · Inclure les NOTAM · NOTAM FIR |
| §0.4 | Entrées facultatives | 8 | Bloc horaire prévu · Départ Runway · Arrivée Runway · Altitude (Pieds) · Passagers · Fret · Charge utile · Poids zéro carburant |
| §0.5 | Planification du carburant | 10 | Carburant de secours · Carburant de réserve · Carburant pour taxis · Bloc carburant · Carburant d'arrivée · Carburant MEL · Carburant ATC · Carburant WXX · EXTRA · Transport de pétrole |
| §0.6 | Entrées de texte | 5 | Identifiant du pilote · Nom du capitaine · Nom du premier officier · Nom du distributeur · Remarques du répartiteur |
| §0.7 | Itinéraire | 1 | Selected Route |
| §0.8 | Aéroports alternatifs | 15 | *critères* Compte alternatif · Distance maximale · Plafond minimum · Visibilité minimale · Piste minimale · Évitez les aéroports · Avoid TS/FG — *dégagement 1* Aéroport · Piste · Altitude (Pieds) · Itinéraire — *puis* Décoller · En route — *bas de section* Gares en route · Aéroports sélectionnés |
| §0.9 | Scénario ETOPS | n/a | inchangé — actif seulement sur survol maritime ou désertique |
| §0.10 | Météo historique · Paramètres de débogage | n/a | inchangé — n/a, décidé et assumé |

**RÈGLE DE LECTURE D'UNE SECTION À PLUSIEURS COLONNES** — c'est l'ambiguïté qui a permis la dérive. Elle se tranche ici, définitivement :

1. Une section se lit **bloc de gauche d'abord**, ligne par ligne, de gauche à droite ; **puis** la colonne d'interrupteurs de droite, de haut en bas.
2. **Un champ replié derrière un bouton se lit à la position du bouton**, jamais ailleurs.
3. Une largeur de fenêtre différente peut réarranger l'affichage : **le tableau ci-dessus l'emporte sur ce qu'un écran plus étroit montre ce jour-là.** Seul un changement réel de SimBrief ouvre une révision.

⚠ **RÈGLE DE REMPLISSAGE.** Aucune ligne ne sort sans valeur. Ni « AUTO » seul, ni « laisser vide ».
- **À TAPER** — ce qui va dans la case, littéralement. C'est **la colonne lue par la checklist** (§A.5).
- **VALEUR ATTENDUE** — mon chiffre, pour comparer ce que SimBrief a calculé à ce que j'annonçais. Elle ne se saisit pas et **n'est pas lue par la page**.

⇒ Tout écart notable entre les deux colonnes se relève au §9 : c'est ma méthode qui se corrige, pas SimBrief.

---

### §0.1 · INFORMATIONS SUR LE VOL (Flight Info)

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

### §0.2 · INFORMATIONS SUR L'AVION (Aircraft Info) — partie visible

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
⇒ Le sélecteur `Sort: Registration` ordonne la liste des cellules ; le bouton **Éditeur de cellule** ouvre l'éditeur d'airframe — il affiche « Éditeur de cellule ouvert » une fois l'éditeur déplié. On n'y touche toujours pas.
⇒ **Sous l'Indicatif d'appel ATC vient le bouton « Plus d'options »**, qui bascule en « Moins d'options » une fois déplié. Ce qu'il déplie est le §0.2 bis, juste en dessous — et nulle part ailleurs.

### §0.2 bis · INFORMATIONS SUR L'AVION — SOUS « PLUS D'OPTIONS »

**Neuf champs, repliés derrière le bouton « Plus d'options », à l'intérieur d'Informations sur l'avion, sous l'Indicatif d'appel ATC.** Ils se lisent et se remplissent là, à la position du bouton.

⚠ **Ces neuf champs figuraient en tête du §0 jusqu'à la REV 21**, sous le titre « identification et équipement — priorité », au motif qu'ils étaient les derniers du dossier livrés sans valeur. Ils en portent tous une depuis la REV 19 : le motif a expiré, et un ordre qui ne suit pas l'écran fait sauter des cases. Ils sont revenus à leur place réelle.

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

⚠ **Les quatre dernières lignes.** Le texte gris dans ces cases n'est pas un exemple : c'est la chaîne que SimBrief applique si la case reste vide. Elle se **tape explicitement**, à l'identique — même résultat sur le plan de vol, mais la valeur est écrite, donc vérifiable.

⚠ **Les quatre premières lignes du bloc gris sont des exemples, pas des valeurs.** `N999SB`, `999`, `ABCD` et `ZZZZZZ` sont des amorces de démonstration : les laisser produit un plan de vol au nom d'un appareil qui n'existe pas. Elles se remplissent depuis l'immatriculation réelle.

**Règles de dérivation** :
- **Numéro Fin** — les trois derniers caractères de l'immatriculation, sans tiret.
- **SELCAL** — quatre lettres prises entre A et S, **sans I, N ni O** ; deux paires, chaque paire en ordre alphabétique croissant, aucune lettre répétée. Se construit sur les lettres disponibles de l'immatriculation, complété si besoin.
- **Code Mode-S** — l'adresse OACI 24 bits de l'appareil, six caractères hexadécimaux. Connue : elle se tape. Inconnue : une valeur cohérente avec le bloc du pays d'immatriculation, marquée `[CALC]` et jamais présentée comme réelle.

**Les quatre boutons « Constructeur »** — présents à droite d'Équipement de l'OACI, Transpondeur, Capacité PBN et Article 18. Ils ouvrent un assistant à cases à cocher qui compose la chaîne à partir des équipements réellement embarqués.

⇒ Quand s'en servir : jamais par défaut. Uniquement si un vol exige une capacité que la chaîne standard ne déclare pas — RNP AR, CPDLC en zone océanique, MNPS. Sinon la chaîne standard passe partout, et l'assistant ne fait qu'introduire du risque de saisie.
⚠ Une chaîne modifiée par l'assistant se recopie dans le dossier au §9, sinon elle est perdue au vol suivant.

⚠ Aucun de ces neuf champs n'entre dans un calcul de masse, de carburant ou de vitesse. Ils s'impriment sur le plan de vol OACI. Une erreur ici n'empêche rien de voler — mais une case laissée à sa valeur de démonstration est une case oubliée, pas une case neutre.

### §0.3 · SÉLECTIONS (Selections) — réglages permanents

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
⇒ Le cycle s'affiche avec sa fenêtre de validité, sur le modèle relevé le 24/08/2026 : `AIRAC 2608 — 06Aug26 to 02Sep26`. C'est un exemple de format, pas une valeur permanente — le cycle courant se relit à chaque vol.
⇒ Le libellé de la troisième bascule s'affiche « Planifier les escaliers » selon la largeur de la fenêtre ; c'est le même réglage que « Planifier les montées d'escalier ».
⚠ Ces six interrupteurs sont ce qui autorise ce dossier à être aussi court. Éteindre l'un d'eux rouvre un trou que rien ne comble.
⚠ Quand le cycle SimBrief prend de l'avance sur la base d'IF, un waypoint récent peut être refusé à l'import (§2.2 ①).

### §0.4 · ENTRÉES FACULTATIVES (Optional Entries)

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
⚠ **Les trois derniers champs sortent d'usine en `NONE`, `AUTO` et `AUTO`** — Fret, Charge utile, Poids zéro carburant, relevés le 24/08/2026. La règle ne bouge pas : **les trois se forcent.** Un AUTO laissé en place fait calculer les vitesses sur une masse que l'avion n'aura pas.
⇒ Le champ Fret affiche `NONE` par défaut : taper 0 revient au même, mais la case est alors traitée.
⚠ Notice « freight + custom payload » : normale, rien à corriger.
⇒ **Pistes en AUTO** : AUTO choisit selon le vent réel, exactement comme IF. Ma piste attendue sort en face pour être comparée, pas tapée — et se retrouve au cartouche ② pour la checklist.
⚠ `Altitude (Pieds)` est ici le **FL de croisière**. Le champ homonyme du dégagement est déclaré ignoré (§A.5).

### §0.5 · PLANIFICATION DU CARBURANT (Fuel Planning)

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

### §0.6 · ENTRÉES DE TEXTE (Text Entries)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Identifiant du pilote (Pilot ID) | 1312837 | — |
| Nom du capitaine (Captain Name) | MILAN ELIAYAN | — |
| Nom du premier officier (First Officer) | Random | — |
| Nom du distributeur (Dispatcher Name) | Random | — |
| Remarques du répartiteur | une ligne par remarque | piste attendue · seuil BINGO · dégagement · motif de l'EXTRA |

⇒ Les remarques remontent sur l'OFP : c'est le seul endroit où mes seuils s'impriment à côté des chiffres SimBrief.
⇒ Format retenu pour les pistes, lisible par la page : `DEP RWY EXPECTED nn` et `ARR RWY EXPECTED nn`.
⇒ **Le quatrième champ porte deux traductions pour le même champ Dispatcher Name** : « Nom du distributeur », servi sur la capture du 24/08/2026 et retenu ici, et « Nom de l'expéditeur ». Les deux coexistent selon la traduction servie — c'est la même case.

### §0.7 · ITINÉRAIRE (Route)

| Champ | À taper | Valeur attendue |
|---|---|---|
| Selected Route | la route en format ATC, sans les terrains | route complète SID → airways → STAR |

⚠ **Position déclarée, non recontrôlée le 24/08/2026** `[FORM]`. Sa place entre Entrées de texte et Aéroports alternatifs vient de la déclaration existante, pas des captures de ce jour-là. Elle se revérifie à la prochaine capture qui descend la page en entier.
⇒ Six raccourcis externes sur la barre de section : FlightAware, SkyVector, RouteFinder, GRD, EDI-GLA, Eurocontrol. La route obtenue se colle dans `Selected Route`.
⚠ Je fournis la route au temps 1, avec au moins un repli. Si elle est refusée à la génération, SimBrief a raison sur sa propre base et je reprends sur ce qu'il a retenu.
⇒ Depuis le build 18266, un changement de SID ou de STAR décidé après coup ne demande plus de regénérer l'OFP : il se fait au MCDU (§2.1). La route SimBrief reste la référence carburant, mais elle n'est plus une contrainte de navigation.

### §0.8 · AÉROPORTS ALTERNATIFS (Alternate Airports)

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
⇒ Le bouton de ces critères s'affiche **« Trouver des »**, libellé tronqué par la largeur de la fenêtre. Noté ici pour ne pas le chercher sous un autre nom.

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

### §0.9 · SCÉNARIO ETOPS (ETOPS Scenario)

Actif seulement sur survol maritime ou désertique. Sinon : n/a, ne pas y toucher.

| Champ | À taper | Valeur attendue |
|---|---|---|
| Threshold | 60 min | — |
| Scenario | Auto | — |
| Exclude Airports | vide | — |
| Entry · Exit | AUTO · AUTO | points d'entrée et de sortie de zone |
| Altn 1 à 6 | NONE | terrains attendus sur l'arc |

⇒ Puis **Calculate** : les six Altn se remplissent seuls.

### §0.10 · MÉTÉO HISTORIQUE · PARAMÈTRES DE DÉBOGAGE

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
- l'approche lisse, la vitesse au FAF et le plancher de finale (§5.1)
- les distances d'annonce en arrivée (§6.6)
- les limites de vent de travers du type
- la masse à vide réelle du type dans IF — elle vient de Milan (§9)
- l'état d'usure de l'appareil en Live et sa puissance de freinage (§7)
- tout ce qui est propre au simulateur : fréquences IF, absence de Clearance Delivery, unicom

⚠ Deux contrôles à faire sur la route malgré tout : aucun waypoint dupliqué, et FL conforme à la règle semi-circulaire.

---

## 2 · FMS / MCDU

⚠ **Cette section décrit le MCDU de la famille A320.** L'A380-800 a un FMS différent, à écrans tactiles et onglets : sa saisie est au §7.A.

État relevé à l'écran le 19/08/2026 sur le **build 18266** (26.3 beta). Le **build 18308** (21/08/2026) a publié des correctifs qui touchent cette section : ils sont rangés en « à revérifier », pas appliqués.

⚠ **La 26.4 est sortie le 24/09/2026.** Un premier vol A21N a été tenu sous cette version. La reprise complète de cette section attend des relevés du MCDU à l'écran, pas encore fournis : d'ici là, chaque ligne ci-dessous reste celle du build 18266 et se vérifie avant d'être invoquée.
⚠ **Le MCDU en 2D annoncé pendant la beta a été retiré avant la sortie** `[WIP]`, d'après la note éditoriale de l'article de sortie. Seul le MCDU du cockpit 3D existe.
⚠ Le cycle 26.3 bouge vite : entre deux builds, une ligne du §2.3 peut devenir fausse sans prévenir. Toute ligne de cette section se vérifie à l'écran avant d'être invoquée en vol.

### 2.1 · L'IMPORT FAIT LE TRAVAIL

Un vol SimBrief généré avec Analyse de la piste renseigne directement, à l'import :
FROM/TO · FLT NBR · CI · ZFW · BLOCK · CRZ FL · TO RUNWAY · FLAPS/THS · FLEX TO TEMP · V1/VR/V2 · et la page APPR (destination, piste, ILS et fréquence, élévation, TRANS LVL, VAPP, LDG CONF).

On relit, on ne retape pas.

⇒ L'import s'ouvre désormais dans une vue de briefing déroulante : la relecture se fait là, avant validation, plutôt que page par page dans le MCDU.
⇒ **Depuis la 26.4, V1, VR et V2 importées s'affichent au HUD et sur le PFD**, et peuvent aussi se saisir à la main `[WIP]`, d'après le changelog et l'article de sortie. Elles donnent une troisième source à comparer au cartouche ③, à côté de l'OFP et du MCDU. Passe à `[SIM]` dès qu'une capture du HUD les montre.

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
- **SEC F-PLN** — PAGE NOT YET AVAILABLE. Non cité par les builds 18266 ni 18308 : supposé toujours absent, à reconfirmer à l'écran.
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
- **TEMPÉRATURES D'HUILE MOTEUR** — négatives au spawn quelle que soit la température extérieure (−18 et −15 °C relevés à SAT +34 °C sur A330-900neo). Affichage seul, sans conséquence connue.

**À REVÉRIFIER — annoncé corrigé par un changelog, pas encore recontrôlé à l'écran**

| Ligne | Build qui l'annonce corrigée |
|---|---|
| arrondi du FOB à l'ECAM | 18266 |
| ILS, course et glide en ROSE VOR et ROSE LS | 18266 |
| fiabilité de l'accord RADIO NAV et libellé de la station ou piste la plus proche | 18266 |
| mémo d'alignement ADIRS | 18266 |
| températures de freins à l'initialisation | 18266 |
| **indication d'ailerons à l'ECAM Airbus** | 18308 |
| **cap FCU A320 quand NAV est armé** | 18308 |
| **saut de manette à l'engagement du mode SPD** | 18308 |

⇒ Ces lignes ne se retirent du dossier qu'après vérification en vol, jamais sur la foi du changelog (§A.3 règle 12).

**DISPONIBLE ET UTILE**
RAD NAV accorde seul l'ILS d'ARRIVÉE dès l'import.
⚠ Une course qui ne colle pas à la piste de décollage est normale : c'est celle de l'arrivée.
DIR TO · **BRG/DIST sur PROG, qui accepte désormais les points hors route : fixes, navaids, aéroports, pistes et coordonnées** · NEARBY AIRPORTS sur DATA INDEX.
⇒ C'est avec ces trois-là que se gère un déroutement, faute de SEC F-PLN. Le BRG/DIST étendu les rend enfin utilisables sur un terrain qui n'est pas sur la route : relèvement et distance en direct vers le dégagement, sans rien casser du plan actif.
⇒ **La page racine `MCDU MENU` porte quatre entrées** : `<FMGC`, `<ATSU`, `<AIDS`, `<CFDS`, avec un `HELP HINTS` commutable. Le FMGC n'est donc pas la page d'ouverture : il se sélectionne. `[WIP]`, relevé sur capture studio du 29/08/2026 — sur un poste A320 famille dont le type exact n'est pas identifié.
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
⚠ Un vol conduit avec l'accélération temporelle (menu MISC, TIME) ne produit aucun relevé exploitable : les points du navlog défilent sans que la consommation soit vécue. Le §9 se remplit sur un vol en temps réel, ou pas du tout.

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
⇒ Les blancs de ce tableau se remplissent au cartouche ⑥ de la feuille, pas ici (§5.1).
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

### 5.1 · VITESSES PAR PHASE ET RANG DES SOURCES *(REV 32)*

Ce qui alimente le cartouche ⑥, et ce qui décide entre deux sources quand elles ne disent pas la même vitesse, y compris pour `V1`, `VR`, `V2`, `Vref` et `Vapp` du cartouche ③.

**HIÉRARCHIE DES SOURCES D'UNE VITESSE**

| Rang | Source | Marqueur | Remplit une cellule ? |
|---|---|---|---|
| 1 | observé dans IF sur le type volé : MCDU, placard, PFD, décrochage, relevé AIDS | `[SIM]` | oui, et prime sur tout le reste |
| 2 | OFP SimBrief du vol : analyse de piste, profils montée, croisière et descente retenus | `[OFP]` | oui |
| 3 | document constructeur ou autorité pour le type exact : manuel de vol, QRH, fiche de certification, rapport d'évaluation opérationnelle, AIP pour les restrictions | `[DOC]` | oui, écrit nu, document nommé en prose |
| 4 | calcul du dossier sur une table des rangs 1 à 3 | `[CALC]` | oui, méthode en prose |
| 5 | documentation d'un add-on de simulation, outil tiers, communauté | `[TIERS]` | à défaut des rangs 1 à 4 seulement, nommé en prose, jamais pour faire baisser `Vref`, `Vapp` ni `Plancher finale` |
| 6 | Airbus A320/A321 réel hors type volé | `[RÉEL]` | non, inchangé |

⇒ **Deux rangs en désaccord : le rang le plus haut l'emporte, et un écart de plus de 5 kt se nomme en sortie** (§A.3 règle 7).
⇒ **Avant de descendre d'un rang, je cherche** : les tables constructeur sont rarement publiques, mais la fiche de certification et le rapport d'évaluation opérationnelle le sont, et ils bornent la Vref par la catégorie d'approche. Une valeur de rang 5 dit en prose qu'aucune source de rang 3 n'a été trouvée.
⚠ **Un plancher observé dans IF prime sur toute table.** Si un type a décroché ou fait sonner l'alarme à une vitesse donnée, `Plancher finale` vaut au moins cette vitesse + 10 kt, et `Vapp` au moins `Plancher finale` + 5, tant qu'un point n'a pas été refait dans une configuration et une masse relevées.
⚠ **Le modèle de vol d'IF n'est pas l'avion réel.** Une Vref juste sur le papier peut ne pas tenir dans le simulateur. C'est ce que le rang 1 couvre, et c'est pourquoi il passe devant le rang 3.

**MÉTHODE PAR CELLULE**

| Cellule | Temps 1 | Temps 2 |
|---|---|---|
| Montée initiale | V2 estimée + 10, jusqu'à l'altitude d'accélération `[CALC]` | V2 de l'OFP + 10 `[CALC]` |
| Montée basse | 250, sauf restriction de SID plus basse `[NAV]` | idem, sur la SID retenue |
| Montée IAS · Montée Mach | registre ci-dessous | profil de montée retenu par l'OFP `[OFP]` |
| Croisière Mach | registre ci-dessous, égal à la valeur attendue du §0.2 | profil de croisière de l'OFP `[OFP]`, croisée avec le CRZ SPEED du MCDU |
| Descente Mach · Descente IAS | registre ci-dessous | profil de descente retenu par l'OFP `[OFP]` |
| Approche lisse | méthode du type, sur le LW attendu `[CALC]` | même méthode, sur le LW de l'OFP |
| Vitesse FAF | 180, ou la VFE du cran sorti à l'interception moins 10 si elle est plus basse `[CALC]` | idem ; une instruction ATC prime |
| Plancher finale | Vapp − 5 (§6.4), relevé au plancher observé du type s'il est plus haut | idem, sur la Vapp retenue |

**REGISTRE DES PROFILS PAR TYPE** — au temps 1 seulement ; au temps 2, l'OFP les remplace.

| Type | Basse | Montée IAS | Montée Mach | Croisière Mach | Descente Mach | Descente IAS | Source |
|---|---|---|---|---|---|---|---|
| A318 · A319 · A320 · A321 · A21N | 250 | 300 | .78 | .78 | .78 | 300 | `[CALC]` profil standard Airbus ; CRZ SPEED observé .76 contre .78 planifié (§2.3) `[SIM]` |
| CRJX | 250 | 290 | .74 | .74 | .74 | 290 | `[TIERS]` profil type 250/290/.74 du manuel Aerosoft CRJ ; profil rapide possible 250/320/.80. Aucune source `[DOC]` trouvée |
| autres types | 250 | 290 | Mach de croisière − .02 | valeur attendue du §0.2 | Mach de croisière | 290 | `[CALC]` règle générique ; la ligne du type se crée au temps 2 sur l'OFP |

**APPROCHE LISSE PAR TYPE**

| Type | Méthode | Source |
|---|---|---|
| A318 à A21N | green dot ≈ 2 × LW en tonnes + 85 kt sous le FL200, ou green dot lu au PFD s'il s'affiche | `[CALC]` règle d'usage ; la lecture au PFD passe en `[SIM]` |
| CRJX | Vref volets 45 + 50 : vitesse minimale de manœuvre volets 0 | `[TIERS]` QRH Aerosoft CRJ 900/1000, écart constant de 50 kt entre les deux colonnes sur toutes les masses de la table |
| autres types | Vref + 50 `[CALC]` | à remplacer au premier vol par une lecture au PFD |

⚠ **Origine de cette section : vol ANE1279 du 23/10/2026, CRJX.** La vitesse d'approche, 128 kt, et la vitesse d'arrondi, 124 kt, venaient d'un outil tiers en ligne. Amorce de décrochage vers 600 ft, rattrapée à pleine poussée. Détails et plancher posé au §6.2.

---

## 6 · ARRIVÉE

Ce que le MCDU remplit seul (piste, ILS, fréquence, élévation, TRANS LVL, LDG CONF) ne se recopie pas ici.

⚠ **CE QUI MANQUE ENCORE, PAR TYPE — à lire avant de choisir l'appareil du vol**

| Type | VFE §6.1 | Vref §6.2 | Tail strike §6.3 |
|---|---|---|---|
| A318 / A319 / A320 | relevées | table complète | 11,7° |
| A321 | `[MANQUE]` | pente estimée, non confirmée | `[MANQUE]` |
| A330-900neo | `[MANQUE]` | `[MANQUE]` | `[MANQUE]` |
| A321neo (`A21N`) | relevées | un point, pente à établir | `[MANQUE]` |
| CRJ-1000 (`CRJX`) | volets 45 `[DOC]`, autres crans `[TIERS]`, désaccord sur volets 20 | borne `[DOC]`, table `[TIERS]`, plancher `[SIM]` posé | `[MANQUE]` |

⇒ Ces sept trous datent de trois révisions. Ils se comblent en une session : les VFE se lisent au badin cran par cran, la limite d'assiette se lit dans la fiche du type, la pente Vref sort de deux vols à des masses différentes.
⚠ Un vol sur A321 ou A330-900neo part donc avec une Vref calculée sur une pente non vérifiée et sans marge d'assiette connue. C'est un point d'arrêt du §8, pas une réserve de bloc 5.
⚠ **Même statut pour le CRJX** : pas de point Vref relevé dans IF en configuration connue. Le plancher du §6.2 permet de le voler sans attendre ; la table reste à confirmer.

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

**AIRBUS A321neo (`A21N`)** : limites `[SIM]`, lues sur le placard LIMIT SPD (IAS) du cockpit le 24/09/2026. Vitesses de sélection `[CALC]`, prises 10 à 20 kt sous chaque limite.

| Config | VFE, limite | Sélection normale | Repère |
|---|---|---|---|
| 1 | 243 kt | ~215 kt | à green dot |
| 1+F | 225 kt | ~205 kt | si sortie en approche |
| 2 | 215 kt | ~190 kt | à S speed |
| 3 | 195 kt | ~180 kt | avec le train |
| FULL | 186 kt | ~165 kt | puis décélération sur Vapp |

**Train A21N** `[SIM]` : sortie ≤ 250 kt / M .60 · rentrée ≤ 220 kt / M .54 · sorti ≤ 280 kt / M .67.
⇒ Chaque cran de l'A21N est plus haut que celui de l'A320, de 13 kt en conf 1 à 9 kt en FULL. Le §6.1 A320 ne se lit jamais pour lui.
⇒ Limites générales de l'avion réel `[RÉEL]` : VMO 350 kt, MMO .82. La croisière normale se vole à .78, qui est une cible et non un plafond.

**CRJ-1000 (`CRJX`)** *(REV 32)* : vitesses de sélection `[CALC]`, prises 10 à 20 kt sous chaque limite.

| Volets | VFE, limite | Source de la limite | Sélection normale | Repère |
|---|---|---|---|---|
| 1 | 230 kt | `[TIERS]` manuel Aerosoft CRJ ; outil en ligne du 23/10/2026 : 230 | ~210 kt | premier cran en approche |
| 8 | 230 kt | `[TIERS]` les deux mêmes sources | ~200 kt | cran de décollage normal |
| 20 | **230 ou 220 kt** | `[TIERS]` désaccord : Aerosoft 230, outil en ligne 220 | ~190 kt, sous la plus basse | à l'interception, vitesse FAF |
| 30 | 185 kt | `[TIERS]` les deux mêmes sources | ~170 kt | avec le train |
| 45 | 170 kt | `[DOC]` rapport d'évaluation opérationnelle Transports Canada, série CRJ, table des VFE | ~150 kt | puis décélération sur Vapp |

⚠ **Contradiction signalée, pas arbitrée (§A.3 règle 7)** : la VFE volets 20 se tient à la plus basse des deux, 220 kt, jusqu'à une lecture au placard ou au ruban dans IF.
⇒ Volets 45 est la configuration normale d'atterrissage du CRJ1000 `[DOC]`, rapport EASA de l'Operational Evaluation Board sur la série CRJ.
⇒ Limites train : `[MANQUE]`, à lire au placard du cockpit.

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

**A321** — pente d'environ 1 kt par tonne, **non confirmée**. À recouper avec la Vapp du MCDU au premier vol sur le type, avant de s'en servir pour un briefing d'arrivée.

| LW | Vref conf FULL |
|---|---|
| 60 t | 129 kt |
| 65 t | 134 kt |
| 70 t | 139 kt |
| 75 t | 144 kt |

**A321neo (`A21N`)** : **un seul point, pente non établie.** Ne se déduit pas de la table A321 ci-dessus, même si elle en est proche.

| LW | Vapp du MCDU | Source |
|---|---|---|
| 74,0 t | 150 kt | Vapp `[SIM]`, 24/09/2026, HV6867 EHAM vers LGAV · LW `[CALC]` |

⇒ La masse d'atterrissage est reconstituée : masse lue au parking après le vol, plus le carburant du roulage retour. Elle n'a pas été lue en courte finale.
⇒ À cette masse, la table A321 donnait 148 kt en Vref + 5 : l'écart est de 2 kt, sous le seuil de 5 kt du §2.3. La Vapp du MCDU a été volée telle quelle.
⇒ **Deuxième point à prendre sur un vol dont la masse d'atterrissage s'écarte d'au moins 8 t de celle-ci.** Deux points donnent la pente, et ferment le point bloquant du §8 pour ce type.

**A330-900neo** — `[MANQUE]`. Aucune table, aucune pente : la première Vapp du MCDU sur le type sert de point de départ, et deux vols à des masses différentes donnent la pente.

**CRJ-1000 (`CRJX`)** *(REV 32)* : volets 45. Trois sources de rang différent, et un plancher observé qui prime sur les trois.

| Rang | Ce que dit la source | Source |
|---|---|---|
| 1 | **amorce de décrochage à 128 kt vers 600 ft**, le 23/10/2026, vol ANE1279 LEMD vers LSGG ; volets et masse à cet instant non relevés `[MANQUE]` | `[SIM]` |
| 3 | catégorie d'approche C avec volets 45 : la Vref à la masse maximale d'atterrissage, 36 968 kg, ne dépasse pas 140 kt | `[DOC]` rapports d'évaluation opérationnelle EASA et Transports Canada, série CRJ |
| 5 | table de Vref volets 45 : 116 kt à 22 680 kg, 120 kt à 24 040 kg, puis environ 1 kt par 450 kg ; vers 31 t, entre 130 et 136 kt selon la ligne retenue | `[TIERS]` QRH Aerosoft CRJ 900/1000 |
| 5 | 128 kt en approche finale et 124 kt à l'arrondi, pour 54 % de charge | `[TIERS]` outil en ligne. **Écarté** : il a mené à l'événement de rang 1 |

**Ce qui se vole dans IF jusqu'au premier point relevé :**

| Cellule | Valeur | Motif |
|---|---|---|
| `Plancher finale` | 138 | décrochage observé + 10 kt `[SIM]` |
| `Vapp` | au moins 143 | plancher + 5, quelle que soit la masse |
| `Vref` | table `[TIERS]` sur le LW, sans descendre sous 138 | la table seule n'a pas de rang suffisant pour baisser un plancher |

⇒ **Ce qui ferme le point** : une finale à 143 kt, volets 45 et train sortis confirmés, masse lue au PFD ou à l'écran Poids et centrage. Puis, sur un vol suivant, une approche réduite par paliers de 3 kt jusqu'à l'avertissement, en altitude, loin du sol. Les deux lectures donnent la vraie marge du modèle IF.
⚠ **Le rang 3 et le rang 1 ne se contredisent pas** : la catégorie C borne l'avion réel, le décrochage décrit le modèle IF. C'est le second qui se vole.

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
⚠ **Un plancher observé (§5.1) l'emporte sur cette formule** : la Vapp ne descend jamais sous le plancher du type + 5.

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
- ⚠ **Limite de tail strike : 11,7° sur A320 train comprimé, moins sur A321 — fuselage plus long, marge réduite.** Ne pas dépasser 7,5° en arrondi sur A320 ; relever la limite du type avant le premier atterrissage sur A321 ou sur A330-900neo (§6, tableau des trous).
- Assiette figée après le toucher : ne pas reposer le train avant brutalement.
- ⚠ **Moteurs à l'arrière (CRJX)** *(REV 32)* : réduire les gaz cabre l'avion, les remettre le fait piquer. Ne pas réduire à 50 ft ni plus haut : le CRJ cabre et perd sa vitesse au-dessus de la piste `[TIERS]`, manuel Aerosoft CRJ. **Une vitesse d'arrondi donnée par un outil n'est pas une consigne** : la règle du premier tiret vaut pour tous les types.

**Toucher visé** : 1000 ft après le seuil, ± 300. ⇒ à recouper avec le 1K MARK du LANDING REPORT.

---

### 6.4 · STABILISATION

à 1000 ft IMC / 500 ft VMC :
configuration finale · Vapp +10 / −5 · dans l'axe et sur le plan · < 1000 fpm · poussée stabilisée.

⚠ Un seul critère non tenu : remise de gaz. Sans discussion.
⇒ La borne basse « Vapp − 5 » est la cellule `Plancher finale` du cartouche ⑥, relevée au plancher observé du type quand il est plus haut (§5.1).

---

### 6.5 · ATTERRISSAGE ET REMISE DE GAZ

Après le toucher : spoilers vérifiés, inverseurs, autobrake, freinage manuel en fin de course. Dégagement complet avant d'annoncer piste dégagée.

⚠ **Puissance de freinage dégradée relevée à l'Aircraft Health (§7) : le cran d'autobrake se monte d'un cran et la distance disponible se regarde deux fois.** Une piste courte avec des freins usés est un motif de dégagement, pas un défi.
⚠ **Les relevés d'usure antérieurs au 21/08/2026 sont périmés** — voir §7, Aircraft Health.

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

### 6.7 · APPROCHE AUTOMATIQUE — SECTION DORMANTE

⚠ **RIEN ICI NE S'APPLIQUE AUJOURD'HUI.** Le mode n'a été vu que sur une capture studio du 29/08/2026, sur un poste A320 famille dont le type n'est pas identifié. Il n'existe pas dans le build de Milan. La section est écrite pour être réveillée, pas pour être suivie.

⚠ Numérotée **6.7** et non 6.4 : la stabilisation occupe déjà le 6.4. Le §6 va désormais jusqu'à 6.7.

**CE QUI A ÉTÉ LU SUR LA CAPTURE** `[WIP]`

Bandeau FMA : `SPEED` · `G/S` · `LOC` · `CAT3 DUAL` · `AP1+2` · `1FD2` · `A/THR`.
Deux boutons `AP ON` distincts sur la planche autopilote, là où le build actuel n'en porte qu'un.
Paramètres au moment de l'image : 1 024 ft AGL · 144 kt · volets FULL · train sorti · aérofreins armés · N1 52 % · THS 20 %.

**CE QUE LE FMA DOIT DIRE, LE JOUR OÙ IL SERA LU EN SESSION**

| Case | Attendu | Ce que ça veut dire |
|---|---|---|
| `LOC` puis `G/S` | en vert | axe et plan capturés, dans cet ordre |
| `CAT3 DUAL` | affiché | double chaîne annoncée **par l'avion** — pas par la piste, pas par la météo |
| `AP1+2` | affiché | les deux pilotes automatiques engagés. Un seul AP ne donne pas la CAT III |
| `A/THR` | actif | sans lui, pas d'atterrissage automatique |

⚠ **Une capacité annoncée n'est pas une autorisation.** Le simulateur ne modélise ni les minima chartés de la piste, ni l'état des équipements sol. `CAT3 DUAL` affiché dans une visibilité de 200 m reste une manœuvre non couverte par une carte : le §6.4 et les minima du §6 continuent de s'appliquer tels quels.

**EFFET SUR LE CARTOUCHE ③ — TRANCHÉ D'AVANCE**

La cellule de décision d'atterrissage du cartouche ③ reste obligatoire et garde sa méthode du §A.4. Une approche automatique ne change pas cette cellule.
⇒ Motif : la CAT III réelle n'a pas de hauteur de décision mais une hauteur d'alerte, qu'aucune valeur observable du simulateur ne produit. Basculer la cellule sur une grandeur inexistante ferait lire un chiffre inventé à la checklist (§A.5).
⚠ Aucune cellule de cartouche ne change tant que cette section dort. C'est la seule chose que cette révision garantit sur ce sujet.

**CE QUI RÉVEILLE LA SECTION**

| Point | Comment il se ferme |
|---|---|
| Le mode existe dans le build de Milan | un vol : le FMA affiche `CAT3 DUAL` ou il ne l'affiche pas |
| Deux AP engageables séparément | deux boutons sur la planche, ou un seul |
| Comportement à l'arrondi automatique | un atterrissage, relevé au LANDING REPORT (§9) |
| Comportement en cas de perte d'un AP en finale | à provoquer une fois, hors trafic |

⇒ Tant que la première ligne n'est pas fermée, les trois autres n'ont pas de sens.
---

## 7 · PROPRE AU SIMULATEUR

### ALIGNEMENT ADIRS — BLOQUANT, EN PREMIER

Sans alignement, **PFD et ND restent noirs** : drapeaux rouges ATT, ALT, SPD, VS et HDG, les deux ND en HDG MAP NOT AVAIL avec GPS PRIMARY LOST. L'E/WD et le SD, eux, fonctionnent — ils ne dépendent pas des centrales inertielles.

⇒ Ce n'est pas un bug, c'est la procédure. Une capture studio annonce désormais un mémo `IR IN ALIGN 2 MN` à l'E/WD (voir plus bas) ; tant qu'il n'a pas été vu en session, la règle reste celle de la REV 21 — aucun message ne dit que l'alignement manque, l'écran est simplement vide.
⚠ Un décollage est impossible sans PFD. Ce point ne se rattrape pas au roulage.

**CE QUI A CHANGÉ EN REV 24.** La REV 21 écrivait que rien ne rappelle l'alignement manquant et que l'écran est simplement vide. Une capture studio du 29/08/2026 montre un mémo `IR IN ALIGN 2 MN` à l'E/WD, avec le temps restant.
⇒ Si ce mémo est bien dans le build, l'alignement se surveille au décompte et non à l'œil, et la ligne « mémo d'alignement ADIRS » du §2.3 tient sa confirmation.
⚠ `[WIP]` : matière studio, sur un appareil non identifié. **La phrase de la REV 21 reste vraie jusqu'à ce que le mémo soit vu en session** — c'est elle qui décrit ce que Milan a observé, et une image ne remplace pas une observation (§A.3 règle 12). La ligne du §2.3 ne sort donc pas du tableau « à revérifier ».

### ÉTAT DE L'APPAREIL (Live)

Panneau **Aircraft Health** : condition, risque de panne, heures restantes estimées, puissance de freinage.

⇒ À regarder AVANT de générer l'OFP : un appareil usé change la distance d'atterrissage, donc le choix de piste, donc le dégagement.
⚠ **Tout relevé d'usure antérieur au 21/08/2026 est périmé.** Jusqu'au build 18308, l'usure des freins était comptée en vol et à l'arrêt : les appareils affichaient une dégradation qu'ils n'avaient pas méritée. Les seuils du §6.5 se reconstruisent sur des relevés postérieurs à ce build.
⚠ Puissance de freinage dégradée : voir §6.5. Risque de panne élevé sur une longue étape : le noter au bloc 5, ou changer d'appareil.
⚠ Les pannes en Live sont désormais possibles en vol. Le briefing panne du §4 cesse d'être théorique.

### CONTRÔLE AVANT REPOUSSAGE

**CONTRÔLE DE MASSE AU POSTE**
`GW` en bas de page SD − `FOB` à l'E/WD = masse sans carburant réelle, à comparer à l'EZFW de l'OFP.
⇒ C'est le contrôle qui manquait : l'écart de masse du §2.3 se voyait après le vol, il se voit maintenant avant le repoussage.
⚠ Écart supérieur à une tonne : les vitesses de l'OFP ont été calculées sur une autre masse. Reprendre §2.2 ②, et vérifier la marge au MTOW sur la masse lue, pas sur celle du plan.
⚠ `[WIP]` sur les valeurs de la capture (`GW 79600` pour `FOB 3920`), `[SIM]` dès que la lecture est faite une fois dans le build. La méthode, elle, ne dépend d'aucune capture : les deux champs existent sur tous les Airbus d'IF.

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
- **Mémos `IR IN ALIGN`, `EXT PWR` et `DOORS OPEN`** au sol : états normaux eux aussi. Ils décrivent la situation, ils ne la reprochent pas — et ils tombent d'eux-mêmes quand la situation change. `[WIP]`, relevés sur capture studio du 29/08/2026.

### ROULAGE

Durée comparée au taxi fuel de l'OFP · carte sol suivie en continu · QNH confirmé · piste confirmée à l'ATIS
⚠ Piste en service ≠ piste prévue : vitesses et flex à recalculer, pas à ajuster. La SID, elle, se refait au MCDU (§2.1).
⚠ **Alertes de conflit de piste — leur portée a changé au build 18308.** Elles sont **supprimées dès qu'on est calé sur une Tower ou une Ground active** : l'ATC est censé assurer la séparation, l'alerte ne se déclenche plus. Elle ne subsiste donc que hors contrôle.
⇒ Conséquence : sous ATC, aucun filet automatique à l'entrée de piste. La vérification visuelle de la finale avant d'aligner redevient la seule protection. Hors ATC, l'alerte se traite, elle ne se ferme pas.

### FRÉQUENCES ET ATC

⚠ IF n'a pas de position Clearance Delivery. Séquence : ATIS → Ground → Tower → Departure/Center → Approach → Tower → Ground. Le squawk est attribué automatiquement.
Sans ATC : Unicom 122.800 — intentions, position, piste, aéroport nommé. Écouter avant d'émettre (§6.6).
⇒ Avec ATC, un « direct to waypoint » peut désormais être donné en vectoring : il se lit comme une instruction, et se saisit en DIR TO.
Détresse : 7500 capture · 7600 radio · 7700 général

### APRÈS ATTERRISSAGE

Carburant restant relevé · AIDS FLIGHT REPORT et LANDING REPORT relevés (§9) · Aircraft Health relu si le freinage a paru différent

---

### 7.A · A380-800 (`A388`) · SAISIE FMS

⚠ **CONDITION D'ENTRÉE : la cellule `Type` du cartouche ① vaut `A388`.** Pour tout autre type, cette section est inerte.

La saisie complète, onglet par onglet, vit dans `page_A380-800_FMS.md`, affichée par la page en ligne quand `Type` vaut `A388`. Elle n'est pas lue par le parseur et n'ajoute aucune clé au registre. Relevée sur 23 captures du FMS 1, vol test LFBO vers LFPO, N388SB, 29/10/2026 `[SIM]`.

**Ce qui distingue ce FMS du MCDU A320 (§2)**

| Point | A380-800 |
|---|---|
| Interface | écrans tactiles, onglets ACTIVE · POSITION · SEC INDEX · DATA, menus déroulants |
| Unité des masses | tonnes, une décimale. 324 900 kg se tape 324.9 |
| Saisie obligatoire | cases orange : ZFWCG, BLOCK, PAX NBR, THS FOR, température FLEX quand FLEX est coché |
| PERF | six onglets T.O, CLB, CRZ, DES, APPR, GA. THR RED, ACCEL et TRANS existent et se saisissent, contrairement au MCDU A320 |
| Plan secondaire | SEC 1 à 3 présents au menu SEC INDEX, fonctionnement non vérifié |

**Ce que SIMBRIEF REQUEST a rempli sur le vol test** `[SIM]`, un seul vol, à reconfirmer : FLT NBR, FROM et TO, CRZ FL, CRZ TEMP, CI, TROPO, TRIP WIND, ZFW, V1, VR, V2, TRANS d'arrivée, VAPP, route et contraintes. Restés vides : ALTN, ZFWCG, BLOCK, PAX NBR, page T.O hors V1 VR V2, page APPR hors VAPP, page GA.

⚠ **Écart de masse au vol test** : ZFW importé 324.9 t, GW 344.3 t et FOB 27.8 t lus au SD, soit 316.5 t sans carburant côté simulateur. Écart d'environ 8.4 t. Même défaut que l'A318 au §2.3. La masse à vide IF du type, relevée à l'écran Poids et centrage tous postes à zéro, le ferme (§9).

⇒ Les valeurs d'une feuille A388 se calculent comme au §A.4 ; seules leur unité et leur place dans le FMS changent.

## 8 · GO / NO-GO

**BLOQUANT** — cinq points, pas un de plus :
- masse hors MTOW ou MLW
- vitesses calculées pour une autre piste que celle attribuée
- dégagement inutilisable à l'ETA
- bloc inférieur à la somme des postes
- **table Vref absente ou non confirmée pour le type volé** (§6.2) — sans elle, la Vapp du briefing n'a pas de base

⚠ **Le cartouche ⑥ n'ajoute aucun point bloquant** (REV 32). Une vitesse de montée ou de croisière approximative se corrige en vol. Ce qui peut faire décrocher, `Vapp` et `Plancher finale`, est déjà tenu par le cinquième point ci-dessus et par la règle de plancher du §5.1 : un type dont la table n'est pas confirmée se vole avec un plancher observé, pas avec une valeur d'outil.

**À VÉRIFIER, non bloquant** :
OFP de moins de 2 h · MIN DIV et BINGO calculés · distance MCDU = distance OFP · briefing panne fait · schedule volets sorti pour le type · **49 cellules des six cartouches renseignées** · **rang de source nommé pour chaque vitesse, aucune `Vapp` ni `Plancher finale` sous un plancher observé** · **neuf champs du §0.2 bis renseignés, aucun laissé à sa valeur de démonstration** · type et masse à vide donnés par Milan, aucune alerte du §A.2 restée sans réponse · **ADIRS aligné, PFD et ND vivants** · **mémo T.O tout vert** · **`GW − FOB` comparé à l'EZFW** · Aircraft Health regardé, relevé postérieur au 21/08 · build inchangé depuis la dernière observation du FMS · contrôle §A.5 passé si la feuille part en fichier

**POINTS OUVERTS — se ferment par une observation, jamais par déduction** :

| Point | Comment il se ferme | Depuis |
|---|---|---|
| Parenthèse de traduction des libellés (§A.5 règle 4) | un `window.debugBriefing()` sur la prochaine feuille chargée | REV 19 |
| VFE A321 classique et A330-900neo (§6.1). **A21N fermé le 24/09/2026**, placard du cockpit. **CRJX : volets 20 en désaccord entre deux sources tierces** | une descente, cran par cran, au ruban | REV 15 |
| Vref A321 confirmée, A330-900neo à créer, **A21N : un point sur deux**, **CRJX : aucun point en configuration relevée** (§6.2) | deux vols à des masses différentes. Pour l'A21N, un seul vol de plus, à une masse d'atterrissage écartée d'au moins 8 t. Pour le CRJX, une finale à la Vapp plancher, volets 45 et masse relevés | REV 17 |
| Limite de tail strike A321, A330-900neo et CRJX (§6.3) | fiche du type | REV 17 |
| Huit lignes « à revérifier » du §2.3 | une observation à l'écran chacune | REV 18 / REV 20 |
| **Mémo `IR IN ALIGN` dans le build** (§7 · ADIRS) | une mise sous tension, ADIRS non aligné, regarder l'E/WD | REV 24 |
| **Contrôle `GW − FOB` au poste** (§7) | une lecture au parking, comparée à l'EZFW de l'OFP | REV 24 |
| **Approche automatique CAT3 DUAL** (§6.7) | un vol : le FMA l'affiche ou il ne l'affiche pas | REV 24 |
| **Genre des 49 clés du §A.5 — répartition des 39 premières reconstruite, non lue** | une lecture de `js/data/fields.js`, clé par clé. Sans voler, sans capture. La même lecture ferme le point de la parenthèse de traduction | REV 29 |
| **Atomicité — deux nombres séparés par un blanc sont soudés et acceptés** (§A.5 règle 1) | correctif de code : tester l'atomicité avant d'écraser les blancs. **Défaut silencieux** : aucune feuille n'est protégée en attendant, sauf `Altitude initiale` et, après les consignes REV 32, les sept vitesses numériques du cartouche ⑥ | REV 30 |
| **Borne du cap contournée par la prose** (§A.5 genre `cap`) | correctif de code : le balayage de prose ne réécrit jamais une clé que la validation a refusée. **Défaut silencieux** | REV 30 |
| **Marqueurs — casse, crochet fermant, marqueur sur libellé** (§A.5) | correctif de code, trois retouches d'expression régulière. Le troisième cas est silencieux | REV 30 |
| **`Altitude (Pieds)` rendue en niveau de vol** (§A.5) | décision, pas observation : ce rendu est voulu ou il ne l'est pas. S'il l'est, il s'écrit comme tel ; sinon il se retire | REV 30 |
| **Cartouche ⑥ lu par la page** (§A.4, §A.5) | les consignes Claude Code REV 32 appliquées, puis une feuille chargée : dix cases remplies, aucun refus, `.78` accepté tel quel | REV 32 |
| **A388 : champs remplis par l'import et masse à vide IF** (§7.A) | un deuxième vol A388 après import, et une lecture de l'écran Poids et centrage tous postes à zéro | REV 33 |

⚠ **Le §6.7 ne bloque rien non plus.** Une approche automatique qui n'existe pas dans le build ne bloque aucun départ : elle ne se briefe pas, voilà tout.
⚠ **Deux points du tableau se ferment sans voler** : une mise sous tension au parking suffit pour le mémo ADIRS et pour la lecture GW − FOB.

⚠ Le premier de cette liste est le seul capable de faire **lire une valeur fausse sans rien afficher**. Les autres se voient ; celui-là se vole.

⇒ Le mémo T.O couvre à lui seul volets, spoilers, ceintures, cabine, autobrake et configuration décollage. Ces six lignes ne se revérifient pas à la main : elles sont vertes, ou elles ne le sont pas.

⚠ Une case n/a est traitée. Une case vide est oubliée.

⚠ **Recette de la feuille chargée** : toutes les valeurs résolues, aucun bandeau d'anomalie, aucune case marquée non résolue. Une seule case vide sans motif affiché est un défaut de format de la feuille, pas de la page (§9).

---

## 9 · APRÈS VOL

⚠ **Un vol conduit en accélération temporelle (menu MISC, TIME) ne remplit pas cette section.** Ni carburant, ni ETE, ni TOD, ni Fuel Factor. Le noter avant de partir : c'est un vol qui ne compte pas pour le dossier.

**MASSES À VIDE — REGISTRE DE CE QUE MILAN A DONNÉ**

Ce tableau n'est pas une liste de relevés à faire : c'est la mémoire des valeurs déjà fournies, pour ne pas les redemander deux fois.

| Type | Masse à vide IF | Source | MTOW / MLW |
|---|---|---|---|
| A318 | ≈ 39 500 kg | `[CALC]`, une valeur donnée (SimBrief : 37 416) | ____ |
| A320 | 42 100 kg | `[SIM]`, donné par Milan | 78 000 / 66 500 |
| A321 | 43 600 kg | `[SIM]`, donné par Milan | 93 800 / 77 800 |
| A330 (type exact non précisé) | 129 811 kg | `[SIM]`, donné par Milan | 242 000 / 185 000 |
| A330 (seconde variante) | 129 811 kg | `[SIM]`, donné par Milan | 251 000 / 185 000 |
| A319 | 39 600 kg | `[SIM]`, donné par Milan le 31/08/2026 | 75 500 / 62 500 |
| A321neo (`A21N`) | 50 100 kg | `[SIM]`, donné par Milan le 24/09/2026 | 101 000 / 79 200 |
| A350-900 | 140 011 kg | `[SIM]`, donné par Milan le 06/09/2026, cellule ET-ATR | 280 000 / 207 000 |
| BCS3 (A220-300) | 37 154 kg | `[SIM]`, donné par Milan le 14/09/2026 | 70 900 / 60 600 |
| C208 Caravan | 2 109 kg | `[SIM]`, donné par Milan le 12/09/2026, livrée TI-BDL | 3 969 / 3 856 |
| CRJ-1000 (`CRJX`) | 21 069 kg | `[SIM]`, écran Poids et centrage tous postes à zéro, 23/10/2026 | 41 640 / 36 968 |
| A380-800 (`A388`) | `[MANQUE]` | à relever à l'écran Poids et centrage, tous postes à zéro. Indice : GW − FOB au vol test 316.5 t avec charge à 23 % | ____ |
| ____ | ____ | ____ | ____ |

⇒ Les limites du CRJX lues dans IF sont exactement celles du CRJ1000 réel `[TIERS]`, manuel Aerosoft CRJ : le type du sélecteur est donc bien le -1000.

**MASSE PAR PASSAGER DANS IF** `[SIM]` : 76,5 kg sur A21N (138 passagers pour 10 557 kg), environ 77 kg sur A350-900 (441 pour 33 910 kg).
⇒ SimBrief compte 100 kg par passager, bagages compris. Pour qu'IF porte la même charge utile que la feuille, l'écart se charge en fret : nombre de passagers × 23,5 kg sur A21N.

**CAPACITÉ CARBURANT A21N** `[SIM]` : 31 202 kg au plein, dont 6 037 kg dans chaque aile, 6 437 kg au centre et 12 691 kg en AUX. MTOW de 101 t et réservoir AUX correspondent aux valeurs de l'A321XLR réel `[RÉEL]` : IF donne cette enveloppe à toutes les livrées, LR ou non. Un bloc de moins de 12 074 kg tient dans les ailes seules.

**CONSOMMATION RELEVÉE PAR TYPE** : A21N, environ 1,9 t/h en moyenne montée comprise `[CALC]`, sur un seul vol (HV6867, 24/09/2026 : environ 5 450 kg de vol pour un temps affiché de 03:09). L'estimation de la feuille, 2,4 t/h, était trop forte d'environ 20 %. À recouper sur deux autres vols avant d'en faire une règle.

⇒ c'est cette valeur qui sert à forcer le ZFW au temps 1 (§0.4). Type déjà présent ici : je l'utilise sans rien redemander. Type absent : alerte du §A.2.
⚠ Ne jamais déduire la masse à vide d'un type de celle d'un type voisin : l'écart constaté sur l'A321 était de 4 900 kg, soit 4,9 t d'erreur sur le ZFW, donc sur les vitesses et la flex.
⚠ Deux variantes d'A330 partagent la même masse à vide pour des MTOW différents : le MTOW ne suffit donc pas à identifier la variante volée, et la ligne se choisit sur ce que Milan annonce.

**IDENTIFICATION ET ÉQUIPEMENT — REGISTRE**

| Immatriculation | Fin | SELCAL | Mode-S | Chaîne équipement modifiée ? |
|---|---|---|---|---|
| PH-YHF | YHF | FHCP | 4869BD | non |
| EC-MOX | MOX | CEMP | 345385 | non |
| ____ | ____ | ____ | ____ | ____ |

⇒ Une chaîne composée avec un bouton **Constructeur** se recopie ici, sinon elle est refaite de zéro au vol suivant.

**ÉCARTS SIMBRIEF — la colonne « valeur attendue » du §0**
Champ où ma valeur attendue s'est écartée ____ · écart ____ · méthode à corriger ____
⇒ pistes, contingence, réserve, taxi, FOB et FOD sont les six lignes à relever en priorité.


**ÉCART DE MASSE — RELEVÉ AU POSTE**
`GW` lu ____ · `FOB` lu ____ · masse sans carburant obtenue ____ · EZFW de l'OFP ____ · écart ____
⇒ Trois relevés suffisent à dire si l'écart du §2.3 est constant ou proportionnel à la masse. C'est la différence entre un décalage qu'on compense et un défaut qu'on subit.
**ÉCARTS EN VOL**
Carburant prévu / réel ____ / ____
⇒ trois vols alimentent le Fuel Factor du §0.2 bis.
ETE prévu / réel ____ / ____ · TOD prévu / réel ____ / ____
Cause de l'écart principal ____

**VITESSES — RELEVÉ EN VOL** *(REV 32)*
Vitesse de montée et Mach tenus ____ / ____ · Mach de croisière tenu ____ · masse lue en courte finale ____ · volets et train à 1 000 ft ____ · Vapp tenue ____ · avertissement de décrochage ou alarme vu ? à quelle vitesse ____
⇒ Une ligne remplie avec configuration et masse fait passer la Vref du type d'un rang 5 ou 3 à un rang 1 (§5.1), et ferme le point ouvert du §8 pour ce type.

**AIDS — RELEVÉ D'ATTERRISSAGE**
TD IAS / GS ____ / ____ · Vz au toucher ____ fpm · G max ____ · écart d'axe ____ m · 1K MARK ____ · ground roll ____
⇒ Un atterrissage automatique, le jour où le §6.7 se réveille, se relève ici comme un autre — et se compare à un manuel à masse comparable.

**FMS**
Comportement inattendu observé ____ · valeur affichée jugée fausse ____ · ligne du §2.3 à corriger ____
Ligne de la liste « à revérifier » confirmée corrigée ____ ⇒ elle sort du dossier à la révision suivante.

**FIN · REV 33 · Simulation uniquement**
