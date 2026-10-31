# RAPPORT · REV 33

Consignes appliquées : `consignes_claude_code_REV33.md` du 31/10/2026. Celles du 29/10/2026 (`consignes_claude_code_retrait_checklist.md`) sont remplacées et n'ont pas été appliquées.

Décision de Milan prise en cours de tâche (31/10/2026) : les phases « Feuille SimBrief » et « OFP & cartouches » partent avec le reste de la checklist ; une seule exception, un bloc fixe « Chaînes d'équipement (§0.2 bis) » au panneau Valeurs (voir A.2).

## A.1 · Inventaire, avant toute modification

État de référence : commit `70041f1` (REV 32).

### Fichiers

| Fichier | Colonne | Motif |
|---|---|---|
| `js/data/phases.js` | CHECKLIST | `PHASES` (13 phases, 147 lignes à cocher) et `BLOCS_TYPE` (blocs `7.0.A` et `6.7`). Deux choses en sortaient pourtant côté SIMBRIEF : la liste des renvois § (`ALL_REFS`, voir `js/refs.js`), qui sert à reconnaître le dossier, et le mécanisme d'égalité sur `Type` |
| `js/progress.js` | CHECKLIST | Profil de vol SVG, compteur d'en-tête, barre et pourcentage du pied |
| `js/parser/registre.js` | SIMBRIEF | Registre, `REQUIRED`, contrôle de démarrage |
| `js/parser/labels.js` | SIMBRIEF | `MARQUEUR_SOURCE`, normalisation des libellés |
| `js/parser/validate.js`, `js/parser/tables.js`, `js/parser/extract.js` | SIMBRIEF | Lecture des cellules, `window.debugBriefing()` |
| `js/data/fields.js` | SIMBRIEF | `FIELDS`, 64 champs |
| `js/briefing.js` | SIMBRIEF | Chargement, dossier ou feuille, badge. Un seul appel côté checklist : `markRefs()` |
| `js/ports.js` | SIMBRIEF | Blocs aéroport et panneau d'identité |
| `js/alert.js` | SIMBRIEF | Bandeau, remplissage des cases |
| `js/values.js` | SIMBRIEF | Panneau Valeurs du vol |
| `index.html` | MIXTE | Voir blocs ci-dessous |
| `js/render.js` | MIXTE | `esc`, `estNil`, `normType`, `refreshValues` servent au panneau et aux portes ; tout le reste rend les phases |
| `js/refs.js` | MIXTE | `ALL_REFS`, `availableRefs`, `hasRef`, `loaded` servent à reconnaître le dossier et au message de chargement ; `md2html` sert à afficher un markdown ; le dépliage de section sous une ligne est de la checklist |
| `js/state.js` | MIXTE | `state.done`, `state.open`, `allOpen` et l'identifiant de ligne `id()` sont de la checklist ; valeurs, dossier et feuille sont SIMBRIEF |
| `js/dom.js` | MIXTE | Nœuds des phases, du profil, du compteur et du pied à côté des nœuds du panneau et des portes |
| `js/ui.js` | MIXTE | « Tout déplier » est de la checklist ; « Nouveau vol » efface les valeurs et décoche les cases ; `toast()` sert à tout |
| `js/main.js` | MIXTE | Démarrage : `render()` et `syncOpenBtn()` à côté du chargement |
| `css/style.css` | MIXTE | Règles des phases, du profil et du pied à côté de celles du panneau |
| `briefing.md`, archives REV, feuilles, gabarit | hors code | Traités à la partie B |
| `.github/`, `.vscode/`, `.cspell-mots.txt`, `.markdownlint.yaml`, `.nojekyll` | hors colonnes | Outillage, non touché |

### Blocs d'affichage de `index.html`

| Lignes (REV 32) | Bloc | Colonne |
|---|---|---|
| 27 | Compteur d'en-tête `hdrCount` | CHECKLIST |
| 29-35 | Profil de vol SVG | CHECKLIST |
| 41 | Bouton « Charger le briefing » | SIMBRIEF |
| 42 | Bouton « Valeurs du vol » | SIMBRIEF |
| 43 | Bouton « Tout déplier » | CHECKLIST |
| 44 | Bouton « Nouveau vol » | MIXTE (valeurs et cases) |
| 48-71 | Blocs aéroport et panneau d'identité | SIMBRIEF |
| 73 | Bandeau d'anomalie | SIMBRIEF |
| 75-79 | Panneau Valeurs du vol | SIMBRIEF (la phrase d'aide de la ligne 78 parle des lignes de la checklist) |
| 81 | Conteneur des phases `#phases` | CHECKLIST |
| 83-95 | Légende des couleurs | MIXTE (fait, piège, renvoi, WIP : lignes de checklist ; valeur saisie, NIL, terminal : cases) |
| 97-105 | Légende des sources SIM, WIP, RÉEL, MANQUE | CHECKLIST (marqueurs des lignes de séquence) |
| 108-114 | Pied : phase en cours, barre, pourcentage | CHECKLIST |
| 117 | Toast | SIMBRIEF |
| 128, 132 | Scripts `phases.js` et `progress.js` | CHECKLIST |

### Clés du registre

Aucune clé n'est propre à la checklist. Les 49 clés `required` sont les cellules des six cartouches, les autres sont des champs du formulaire SimBrief (§0) ; toutes ont leur case dans `FIELDS`. `route` existe dans `FIELDS` sans entrée au registre : elle est reconstruite depuis `_dep` et `_arr`.

**Les dix clés du cartouche ⑥ (REV 32) : oui, présentes au registre et dans `FIELDS`** (`clbinit`, `clbbas`, `clbias`, `clbmach`, `crzmach`, `desmach`, `desias`, `applisse`, `vfaf`, `vplancher`).

### Mesure de référence, avant modification

Exécutée dans Chrome headless sur la page réelle (runner greffé dans une copie d'`index.html`, retirée ensuite).

| Contrôle | REV 32, avant |
|---|---|
| Erreurs console au démarrage | aucune |
| `FIELDS` / `REQUIRED` / `ALL_REFS` | 64 / 49 / 35 |
| `briefing.md` | dossier reconnu, REV 32, 35 renvois sur 35, aucun bandeau |
| `feuille_simbrief_U21703_LFMN_LEIB_REV27.md` | feuille, 54 valeurs, 39/49 cellules, bandeau « Cartouche incomplet » sur les dix cellules du ⑥ (feuille REV 27, antérieure au ⑥) |
| `feuille_simbrief_EW9743_LSGG_EDDL_REV27.md` | idem, 54 valeurs, 39/49 |
| `gabarit_feuille_simbrief_REV32.md` | refusé, bandeau « Gabarit vierge » |
| Phases affichées / cases à cocher | 13 / 147 |
| Panneau Valeurs | 64 cases, 13 groupes |

## A.2 · Retrait de la checklist (commit `34e3c19`)

### Fichiers supprimés

- `js/data/phases.js` (322 lignes)
- `js/progress.js` (64 lignes)

### Blocs retirés dans les fichiers MIXTE (lignes avant retrait, REV 32)

| Fichier | Lignes | Bloc |
|---|---|---|
| `index.html` | 27 | compteur d'en-tête `hdrCount` |
| `index.html` | 29-35 | profil de vol SVG |
| `index.html` | 43 | bouton « Tout déplier » |
| `index.html` | 81 | conteneur `#phases` |
| `index.html` | 84-86, 88 | légende : fait, limite ou piège, renvoi au dossier, WIP (gardés : valeur saisie, NIL, terminal) |
| `index.html` | 97-105 | légende des sources SIM, WIP, RÉEL, MANQUE |
| `index.html` | 108-114 | pied : phase en cours, barre, pourcentage |
| `index.html` | 128, 132 | scripts `phases.js` et `progress.js` |
| `js/render.js` | 26-41, 46-53, 56-62 et 66-308 | pastilles `{{cle}}`, signature des blocs conditionnés, `blocTrace` et `window.debugBlocs`, `render()`, cochage, compteurs de phase, dépliage, défilement. Gardés : `esc`, `estNil`, `normType`, `refreshValues` |
| `js/refs.js` | 7-10 | calcul de `ALL_REFS` sur `PHASES`, remplacé par une liste figée (voir ci-dessous) |
| `js/refs.js` | 21, 23-55, 113-185 | `loaded`, `markRefs`, `section`, dépliage d'une section sous sa ligne, Échap. Gardés : `hasRef`, `availableRefs`, `md2html` |
| `js/state.js` | 16, 19, 52, 55, 84, 120 | `state.done`, `state.open`, `allOpen`, identifiant de ligne `id()` ; le stockage local n'écrit plus ni `done` ni `open` |
| `js/dom.js` | 10-20, 25 | nœuds des phases, du profil, du compteur, du pied et du bouton « Tout déplier » |
| `js/ui.js` | 9-18 | « Tout déplier » |
| `js/ui.js` | 21-31 | « Nouveau vol » ne décoche plus rien : il efface les valeurs, comme avant |
| `js/main.js` | 36-38 | `syncOpenBtn()` et `render()` au démarrage |
| `js/briefing.js` | 153 | appel à `markRefs()` |
| `js/ports.js` | 36-37 | commentaire qui renvoyait à `valSpan`, raccourci |

**`ALL_REFS` figé dans `js/refs.js`.** La reconnaissance du dossier compte les renvois § (`countRefs`, seuil `RENVOIS_DOSSIER = 20`). Cette liste se calculait sur les lignes de la checklist : supprimer `phases.js` sans la reprendre aurait fait lire `briefing.md` comme une feuille. Elle est reprise telle quelle, moins `7.0`, `7.0.A` et `7.0 bis` que la partie B retire : 32 renvois au lieu de 35.

**Jeton de cache passé de `?v=32` à `?v=33`** sur la feuille de style et les scripts, selon la règle écrite dans `index.html` : sans lui, un navigateur qui a déjà ouvert la page servirait l'ancien `render.js` avec le nouvel `index.html`.

### Bloc ajouté sur décision de Milan

« Chaînes d'équipement (§0.2 bis) », texte fixe en lecture seule, sans condition de type : **`index.html`, lignes 71-80** (commentaire 71-73, bloc 74-80), dans le panneau Valeurs, après la grille `#valGrid`. Quatre champs `readonly` : SDFGHRWY, LB1, A1B1C1D1L1O1S1, DAT/V RMK/SIMBRIEF. Leurs identifiants (`eq-…`) ne commencent pas par `f-` : ni le remplissage, ni « Nouveau vol », ni le stockage ne les touchent. Aucune clé au registre ni dans `FIELDS`.

### Clés retirées du registre et de `FIELDS`

Aucune. Aucune clé ne servait qu'à la checklist (voir A.1).

## A.3 · Onglet A380-800 (commit `eac87e6`)

⚠ **État actuel : l'onglet est visible en permanence**, quel que soit le type et même sans feuille chargée (commit `56ee405`, décision de Milan du 31/10/2026). `fmsActif()` renvoie toujours vrai. La condition A388 décrite ci-dessous et les contrôles A.3.5 plus bas sont ceux du commit `eac87e6` ; ils ne s'appliquent plus. Depuis la correction du bug d'onglets (dernière section), son ouverture et sa fermeture passent par le mécanisme commun `ONGLETS` de `js/ui.js`.

- `page_A380-800_FMS.md` ajouté à la racine, tel que fourni.
- `js/fms.js` (nouveau) : condition `normType(state.values.type) === 'A388'`, une égalité, aucune clé, retirée depuis (voir ci-dessus). `normType` est celui du bloc A21N : casse, tirets et espaces ne comptaient pas (`a388`, `A-388` ouvraient l'onglet, `A380` et `A388F` non).
- `index.html` : bouton « A380-800 FMS » dans la barre et panneau `#fmsSheet`. `js/dom.js` : trois nœuds. `js/render.js` : `refreshValues()` appelle `paintFms()`. `js/main.js` : `paintFms()` au démarrage.
- Le fichier est demandé au serveur à la première ouverture et rendu par `md2html` (le rendu qui servait aux sections du dossier). Il ne passe ni par `applyDoc` ni par `extractValues`. Ouverte depuis le disque sans serveur, la page affiche « introuvable » au lieu de deviner.

## Partie B · `briefing.md`, REV 32 vers REV 33

Archive : `briefing_prevol_IF_REV32.md` existait déjà et était identique octet pour octet à `briefing.md` (`cmp`). Gardé tel quel.

Toutes les étapes B.1 à B.11 sont appliquées, dans l'ordre. Une ancre ne correspondait pas au fichier :

- **B.2** demande de remplacer jusqu'à « la ligne `---` qui précède `## RÈGLE DE NON-RÉPÉTITION` ». Il n'y a pas de `---` à cet endroit dans la REV 32 : le changelog est suivi d'une ligne vide, puis du titre. Remplacé jusqu'au titre exclu, ligne vide gardée.

B.9 : les 12 retraits et ajouts ont tous trouvé leur ancre (12 substitutions comptées). B.10.3 : le bloc SYSTÈMES est retiré de son titre à la ligne « Ces trois réponses créent la ligne du registre » incluse. `briefing.md` passe de 1742 à 1494 lignes.

## Laissé en place, par doute ou par consigne

| Quoi | Où | Pourquoi |
|---|---|---|
| Phrase d'aide « Ces valeurs s'affichent dans les lignes de la checklist là où elles servent… » | `index.html`, panneau Valeurs | Elle décrit des lignes qui n'existent plus, mais Milan a demandé de ne rien modifier d'autre dans le panneau Valeurs |
| Règles CSS des phases, du profil, du pied, des pastilles `.ref` et `.it-tag` | `css/style.css` | Sans cible désormais, donc sans effet visible. Ni retirées ni modifiées : la consigne ne porte pas sur le style |
| `<meta name="description">` « … départ, croisière, arrivée et après-vol » et titre « CHECKLIST VOL » | `index.html` | Le titre reste juste (B.2 point 6) ; la description est à reprendre si Milan le souhaite |
| Nom des clés de stockage `if-checklist-v1`, `-doc-v1`, `-sheet-v1` | `js/state.js` | Les renommer ferait perdre les valeurs déjà enregistrées |
| §6.7 : « sur le modèle du §7.0, dormant en REV 20 puis rempli en REV 21 » | `briefing.md` ligne 1235 | Renvoi vers une section retirée. Absent de la partie B, donc inchangé (règle 2) |
| §8 : « … la lecture `GW − FOB` et le contenu de la checklist embarquée » | `briefing.md` ligne 1408 | Le paragraphe n'est pas dans la liste B.9.5 (« Garder tous les autres »). Il parle encore de la checklist embarquée comme d'un point à fermer |
| §8 POINTS OUVERTS : « Mémo `IR IN ALIGN` dans le build (§7 · ADIRS) » | `briefing.md` ligne 1396 | Non listé en B.9.3, et le §7 ADIRS existe toujours |

## Contrôles

Tous exécutés dans Chrome headless sur la page réelle (runner greffé dans une copie d'`index.html`, supprimée ensuite), pas déduits.

| Contrôle | Résultat |
|---|---|
| A.2.5 · la page charge `briefing.md`, sans bandeau | **passé** : dossier reconnu, 32 renvois sur 32, aucun bandeau, aucune erreur console ni erreur de page |
| A.2.5 · cellules des cartouches comme avant | **passé** : sur les deux feuilles REV 27, 54 valeurs et 39/49 cellules, avant comme après. Le bandeau « Cartouche incomplet » sur les dix cellules du ⑥ est identique avant et après : ces feuilles sont antérieures au cartouche ⑥. Gabarit toujours refusé |
| Panneau Valeurs | **passé** : 64 cases et 13 groupes identiques, plus le bloc des quatre chaînes d'équipement. Aucune phase, aucune case à cocher (0, contre 147 avant) |
| « Nouveau vol », panneau d'identité, stockage | **passé** : les valeurs s'effacent, le panneau s'ouvre, le stockage n'écrit plus `done` ni `open` |
| A.3.5 · `Type` = `A388` | **passé** : saisi à la main ou lu par le parseur dans une feuille, l'onglet apparaît. Ouvert, il affiche la page (14 titres, 12 tableaux) sans changer le dossier, la feuille, le badge, le bandeau ni les valeurs |
| A.3.5 · tout autre type | **passé** : A320, A380, A388F, type vide ou « Nouveau vol » : l'onglet disparaît, et se referme s'il était ouvert |
| B.12.1 · `grep -n "7\.0"` | **non conforme à la lettre**. Trois résultats : lignes 14 et 17, le changelog prescrit par B.2, qui nomme les sections retirées ; ligne 1235, le renvoi du §6.7 « sur le modèle du §7.0 » (voir tableau ci-dessus). Ce dernier est un vrai renvoi vers une section qui n'existe plus |
| B.12.2 · `grep -n "§7.A"` | **partiel** : trouve le renvoi du §2 (ligne 752), le changelog (16) et le point ouvert du §8 (1405), mais pas le titre : le titre prescrit par B.8 s'écrit `### 7.A · …`, sans §, comme tous les titres du dossier. Il est bien présent ligne 1351 |
| B.12.3 · la page charge la REV 33 | **passé** : sortie identique à la REV 32, sauf le libellé REV. §0, §A.4 et §A.5 identiques octet pour octet à la REV 32 (256, 197 et 129 lignes) |
| B.12.4 · LF | **passé** : aucun retour chariot dans `briefing.md`. Index git en LF pour tous les fichiers des trois commits |
| Règle 7 · tiret long | **passé** : aucun tiret long dans les lignes ajoutées par ces consignes |

~~Remarque hors périmètre : à 420 px de large, le bloc des portes déborde à droite.~~ **Rectifié le 31/10/2026 : ce débordement n'existe pas.** Chrome headless impose une largeur minimale de 500 px : à `--window-size=420` la page est mise en page sur 500 px, puis la capture est coupée à 420. Mesure faite : `scrollWidth` égal à `clientWidth`, aucun élément au-delà du bord.

**Non poussé à ce stade.** Deux contrôles de B.12 ne passent pas à la lettre, et le renvoi du §6.7 reste à trancher par Milan. Voir la section suivante.

## Quatrième commit · corrections en place, décisions de Milan du 31/10/2026

Aucune nouvelle REV : `briefing.md` reste en REV 33.

1. **§6.7** : « … pas pour être suivie — sur le modèle du §7.0, dormant en REV 20 puis rempli en REV 21. » devient « … pas pour être suivie. »
2. **§8** : le paragraphe qui mentionnait encore la checklist embarquée était bien celui qui commence par « ⚠ **Trois des quatre points ajoutés en REV 24 se ferment sans voler** ». Remplacé en entier par « ⚠ **Deux points du tableau se ferment sans voler** : une mise sous tension au parking suffit pour le mémo ADIRS et pour la lecture GW − FOB. »
3. **Phrase d'aide du panneau Valeurs** : « Ces valeurs sont celles à taper dans SimBrief et au FMS : elles sont lues dans la feuille de vol chargée, et une case corrigée à la main le reste pour tout le vol. » Rien d'autre ne change dans le panneau.
4. **CSS** : sélecteurs retirés de `css/style.css`, chacun vérifié absent d'`index.html` et de tous les scripts (recherche par nom de classe, puis contrôle à la main des noms ambigus : `done`, `ok`, `open`, `warn` n'apparaissent dans le code que comme attribut, propriété ou classe d'un autre élément) :
   - en-tête : `.count`, `.count b`
   - profil : `.profile`, `.profile svg`, `.pf-track`, `.pf-done`, `.node`, `.node circle`, `.node .ring`, `.node.done .ring`, `.node.active .ring`, `.node .num`, `.node.done .num`, `.node.active .num`, `.pf-label`
   - barres : `.bar`, `.bar span`
   - phases : `.phase`, `.phase.active`, `.ph-head`, `.ph-head:focus-visible`, `.ph-idx`, `.phase.complete .ph-idx`, `.ph-title`, `.ph-sub`, `.phase.complete .ph-title`, `.ph-count`, `.chev`, `.phase.open .chev`, `.ph-bar`, `.ph-body`, `.phase.open .ph-body`
   - lignes : `.item`, `.item:last-child`, `.item:nth-last-child(2)`, `.item:focus-visible`, `.box`, `.item.warn .box`, `.item.done .box`, `.item.done .box::after`, `.it-txt`, `.it-t`, `.item.warn .it-t::before`, `.it-wip`, `.item.wip .box`, `.item.done .it-wip`, `.it-ord`, `.item.done .it-ord`, `.item.sub`, `.item.sub .it-ord`, `.item.sub .it-t`, `.it-tag`, `.it-tag.t-wip`, `.it-tag.t-manque`, `.it-tag.t-reel`, `.it-tag.t-sim`, `.item.done .it-tag`, `.item.done .it-t`, `.it-d`, `.item.done .it-d`
   - pastilles : `.val`, `.val.empty`, `.val.nil`, `.ref`, `.ref:hover`, `.ref:focus-visible`, `.ref.ok`, `.ref.miss`, `.ref.miss:hover`, `.ref[aria-expanded="true"]`
   - section dépliée : `.sec`, `.sec-t`
   - pied : `.foot`, `.foot-in`, `.foot .lbl`, `.foot .bar`, `.foot .pct`
   - légende : `.legend-src`, `.legend-src .it-tag`

   Gardés parce qu'encore utilisés : `.md` et `.empty-state` (onglet A380), `.legend`, `.lg-nil`, `.lg-term`, `.ports.open`, `.btn.on`. En-tête de la feuille de style mis à jour. Après retrait, une nouvelle recherche ne trouve plus aucun sélecteur de classe sans usage. Les variables de couleur (`--green`, `--magenta`, `--violet`) et le `padding-bottom` du corps, prévu pour le pied, restent : ce ne sont pas des sélecteurs.
5. **Meta description** : « Valeurs de saisie SimBrief et FMS pour Infinite Flight, lues dans la feuille de vol. »
6. **Jeton de cache** : laissé à `?v=33`.

### Contrôles du quatrième commit

| Contrôle | Résultat |
|---|---|
| `grep -n "7\.0" briefing.md` | **passé** : deux résultats, lignes 14 et 17, le changelog REV 33 prescrit en B.2, qui nomme les sections retirées. Plus aucun renvoi vers une section supprimée |
| `grep -n "7\.A" briefing.md` | **passé** : titre (ligne 1351), renvoi du §2 (752), plus le changelog (16) et le point ouvert du §8 (1405) |
| Page rechargée en Chrome headless | **passé** : dossier REV 33 reconnu, 32 renvois sur 32, aucun bandeau, aucune erreur. Onglet A380 visible pour `A388` (saisi ou lu dans une feuille), absent pour A320, A380, A388F et type vide. Sortie identique à celle du troisième commit. Capture vérifiée : rendu intact |
| LF | **passé** : aucun retour chariot dans les fichiers modifiés |
| Tiret long dans le texte ajouté | **passé** : aucun |

### Occurrences restantes de « checklist » (`grep -i`), non corrigées

Aucune n'est couverte par les points 3 à 5.

| Fichier:ligne | Texte |
|---|---|
| `index.html:9` | `<title>CHECKLIST VOL — Infinite Flight</title>` |
| `index.html:24` | `<div class="brand">Checklist vol</div>` |
| `css/style.css:2` | `CHECKLIST VOL — feuille de style unique` (commentaire) |
| `js/refs.js:7` | `REV 33 · LA LISTE DES RENVOIS NE SORT PLUS DE LA CHECKLIST` (commentaire) |
| `js/refs.js:9` | `checklist. Elle ne sert plus a aucune pastille : …` (commentaire) |
| `js/refs.js:12` | `checklist les citait a la REV 32, …` (commentaire) |
| `js/render.js:6` | `REV 33 · la checklist de vol est retiree : …` (commentaire) |
| `js/state.js:12-14` | clés de stockage `if-checklist-v1`, `if-checklist-doc-v1`, `if-checklist-sheet-v1` |
| `js/values.js:42` | `/* saisie : on rafraichit les pastilles, on ne reconstruit pas la checklist */` |
| `js/data/fields.js:9` | `t : ligne de checklist · d : detail · r : renvoi · w : point de vigilance` (commentaire) |
| `js/data/fields.js:37` | `clair dans la ligne de checklist, pas ici. */` (commentaire) |

Tous les contrôles passent : les quatre commits sont poussés.

## Bug d'onglets · Valeurs du vol et A380-800 FMS surlignés ensemble

**Constat en ligne (Milan)** : après un passage par « A380-800 FMS », un clic sur un autre onglet ne changeait pas de page, ou changeait la page sans retirer la surbrillance d'A380-800 FMS. Capture : « Valeurs du vol » et « A380-800 FMS » surlignés en même temps, contenu Valeurs du vol affiché.

**Cause.** Les deux boutons étaient deux bascules indépendantes, chacune avec son propre état : `js/values.js` ouvrait ou fermait `#valuesSheet`, `js/fms.js` ouvrait ou fermait `#fmsSheet`, et aucun ne fermait l'autre. D'où deux défauts :
- les deux panneaux pouvaient être ouverts et surlignés ensemble ; « Valeurs du vol », placé au-dessus, cachait alors le panneau A380 qu'on venait de demander, poussé plus bas hors de vue ;
- un clic sur un bouton déjà ouvert le refermait : le clic n'affichait rien.

**Reproduction en Chrome headless, code d'avant la correction.** Page réelle, dossier REV 33 chargé, aucun bandeau. « Surlignés » = boutons portant la classe `on` ; « vu en premier » = premier panneau ouvert dans l'ordre de la page.

| Clic | Surlignés | Panneaux ouverts | Vu en premier |
|---|---|---|---|
| départ | aucun | aucun | aucun |
| 1 · Valeurs du vol | Valeurs du vol | Valeurs du vol | Valeurs du vol |
| 2 · A380-800 FMS | **Valeurs du vol + A380-800 FMS** | **les deux** | **Valeurs du vol** (le défaut de la capture) |
| 3 · Valeurs du vol | A380-800 FMS | A380-800 FMS | A380-800 FMS (le clic sur Valeurs a **fermé** Valeurs) |
| 4 · A380-800 FMS | aucun | aucun | **aucun** (le clic a fermé l'onglet demandé) |
| 5 · Charger le briefing | aucun | aucun | aucun ; sélecteur de fichier ouvert |
| 6 · A380-800 FMS | A380-800 FMS | A380-800 FMS | A380-800 FMS |
| 7 · Nouveau vol (confirmé) | A380-800 FMS | A380-800 FMS | A380-800 FMS ; valeurs effacées |

**Correction.** Un seul mécanisme pour les deux onglets, `ONGLETS` dans `js/ui.js` : un clic sur un onglet ferme tous les autres et ouvre le sien, toujours. L'onglet A380 n'a plus d'état propre : son ouverture, sa fermeture et sa surbrillance passent par ce mécanisme, comme Valeurs du vol. Ce qui reste propre à chaque onglet se limite à ce qu'il fait à l'ouverture : focus sur la première case (`valuesOuvert`, `js/values.js`), chargement unique de la page FMS (`fmsOuvert`, `js/fms.js`). « Charger le briefing » et « Nouveau vol » sont des actions sans panneau : inchangés.

⚠ **Un changement de comportement en découle** : un second clic sur l'onglet déjà ouvert ne le referme plus. C'était la seconde cause du bug (clic 4 ci-dessus) ; la garder aurait laissé un clic sur un onglet ne rien afficher, contre la consigne « un clic sur n'importe quel onglet affiche toujours son contenu ». Conséquence : une fois un onglet ouvert, l'un des deux panneaux reste toujours affiché.

**Même séquence après correction.**

| Clic | Surlignés | Panneaux ouverts |
|---|---|---|
| 1 · Valeurs du vol | Valeurs du vol | Valeurs du vol |
| 2 · A380-800 FMS | A380-800 FMS | A380-800 FMS |
| 3 · Valeurs du vol | Valeurs du vol | Valeurs du vol |
| 4 · A380-800 FMS | A380-800 FMS | A380-800 FMS |
| 5 · Charger le briefing | A380-800 FMS | A380-800 FMS ; sélecteur de fichier ouvert |
| 6 · A380-800 FMS | A380-800 FMS | A380-800 FMS |
| 7 · Nouveau vol (confirmé) | A380-800 FMS | A380-800 FMS ; valeurs effacées |

Puis six allers-retours A380-800 FMS / Valeurs du vol : à chaque clic un seul onglet surligné, et le bon contenu (12 tableaux FMS, ou 64 cases). Un second clic sur Valeurs du vol ouvert le laisse ouvert, focus sur la première case. Aucune erreur.

**Autres changements du même commit.** Jeton de cache passé à `?v=35` (18 références). `briefing.md` §7.A, corrections en place sans nouvelle REV : le paragraphe « CONDITION D'ENTRÉE » devient « La page en ligne affiche l'onglet A380-800 FMS en permanence ; son contenu ne s'applique qu'aux vols sur A388. », et « affichée par la page en ligne quand `Type` vaut `A388` » devient « affichée par la page en ligne dans l'onglet A380-800 FMS ».

## Onglet A380-800 FMS · valeurs du vol chargé en tête

Corrections en place, pas de nouvelle REV. Jeton de cache passé à `?v=36` (18 références).

**Ce qui change.** En tête de l'onglet, sous le titre « À taper pour ce vol », le tableau de la section `## SAISIE FMS A388` de la feuille chargée, groupé par page FMS dans l'ordre du tableau, la saisie en gros à droite. Dessous, tout le texte qui suit le tableau jusqu'à la fin de la section : sur la feuille QFA7 ce sont deux paragraphes, « Centrage : … » et « **Chargement dans IF.** … », affichés tous les deux. Sans feuille, ou sans cette section : « Aucune valeur FMS dans la feuille chargée. » La page de méthode passe dessous, repliée par défaut sous « Méthode, champ par champ » (élément `details` natif, dépliable au clic et au clavier).

**Où.** `js/fms.js` : `saisieFms()` lit la section dans le texte brut de la feuille, `paintFmsVol()` l'affiche ; appelée par `paintFms()`, donc à chaque chargement de feuille et au démarrage, sans relire la feuille à chaque frappe. `index.html` : bloc `#fmsVol` et `details.fms-methode` dans `#fmsSheet`. `js/dom.js` : nœud `fmsVol`. `css/style.css` : règles `.fms-*`.

**Le parseur n'y touche pas.** Aucune clé au registre ni dans `FIELDS`, aucune validation. Le parseur des cartouches ignorait déjà ce tableau avant la modification (« tableau ignoré (3 colonnes) », sans bandeau) : mesuré sur la feuille QFA7 avant et après, lecture identique.

**`page_A380-800_FMS.md` §12** : dernière phrase remplacée par « Masse à vide IF relevée le 31/10/2026 : 276 630 kg. Le ZFW se force désormais sur cette valeur. »

### Contrôles

| Contrôle | Résultat |
|---|---|
| Feuille `feuille_QFA7_YSSY-KDFW_REV33.md` chargée | **passé** : 28 lignes, de « INIT · ALTN · KIAH » à « GA · TRANS / EO ACCEL · 18000 / 3700 », identiques une à une au tableau de la feuille ; huit pages dans l'ordre INIT, FUEL&LOAD, DEPARTURE, T.O, CLB, DES, APPR, GA ; les deux paragraphes affichés ; méthode repliée |
| Sans feuille | **passé** : « Aucune valeur FMS dans la feuille chargée. », méthode repliée puis dépliée au clic |
| Feuille sans la section (U21703) | **passé** : même message |
| Cartouches et bandeaux | **passé** : QFA7 lue à l'identique avant et après (49/49, 64 valeurs, aucun bandeau) ; suite complète sur le dossier et les feuilles du dépôt identique au commit précédent ; dossier REV 33 reconnu, aucun bandeau, aucune erreur |
| Rendu | capture à 500 px : valeurs lisibles, aucun débordement mesuré |
| LF, tiret long | **passé** |

La feuille QFA7 a servi de test depuis `Downloads` ; elle n'est pas ajoutée au dépôt.

## Consignes « onglet A380-800 FMS » du 31/10/2026 · nouvelle page de méthode

Les points 3 et 4 de ces consignes (valeurs du vol en tête, méthode repliée, aucune lecture par le parseur) étaient déjà en place depuis le commit `94d484f` ; le mécanisme d'onglets du commit `ed63eb2` n'est pas touché, le jeton reste à `?v=36` (aucun script ni style modifié). `briefing.md` n'est pas modifié.

**Seul changement : `page_A380-800_FMS.md` remplacé par la version fournie**, copiée telle quelle (`cmp` identique au fichier fourni, LF). 225 lignes : accès aux pages et clavier KCCU, boutons de l'INIT, MIN FUEL AT DEST, TRANS en CLB et APPR, masses relevées au §13, points ouverts au §14. Elle remplace la phrase du §12 modifiée au commit précédent, qui n'existe plus sous cette forme.

### Contrôles

| Contrôle | Résultat |
|---|---|
| 1 · Nouvelle feuille QFA7 chargée | **passé** : 33 lignes, de « INIT · Première action · appuyer sur SIMBRIEF REQUEST » à « GA · TRANS / EO ACCEL · 18000 / 3700 », identiques une à une au tableau de la feuille ; puis les deux paragraphes. Feuille lue à 49/49, 64 valeurs, aucun bandeau |
| 2 · Sans feuille | **passé** : « Aucune valeur FMS dans la feuille chargée. » |
| 3 · Méthode | **passé** : repliée à l'ouverture, dépliée au clic ; nouvelle page rendue (16 titres, 15 tableaux) |
| 4 · Page rechargée | **passé** : dossier REV 33 reconnu, aucun bandeau, cartouches identiques au commit précédent, séquence de clics du bug d'onglets refaite : un seul onglet actif à chaque clic |
| LF | **passé** |
