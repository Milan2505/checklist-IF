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
