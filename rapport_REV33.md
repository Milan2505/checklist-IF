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

- `page_A380-800_FMS.md` ajouté à la racine, tel que fourni.
- `js/fms.js` (nouveau) : condition `normType(state.values.type) === 'A388'`, une égalité, aucune clé. `normType` est celui du bloc A21N : casse, tirets et espaces ne comptent pas (`a388`, `A-388` ouvrent l'onglet, `A380` et `A388F` non).
- `index.html` : bouton « A380-800 FMS » dans la barre (caché par défaut) et panneau `#fmsSheet`. `js/dom.js` : trois nœuds. `js/render.js` : `refreshValues()` appelle `paintFms()`. `js/main.js` : `paintFms()` au démarrage.
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

Remarque hors périmètre : à 420 px de large, le bloc des portes déborde à droite. Le défaut existe déjà à la REV 32 (capture comparée), il n'a pas été touché.

**Non poussé.** Deux contrôles de B.12 ne passent pas à la lettre, et le renvoi du §6.7 reste à trancher par Milan.
