# CONSIGNES CLAUDE CODE · ONGLET « FMS AIRBUS »

Ajout d'interface, sans nouvelle REV : `briefing.md`, le parseur, le registre et `FIELDS` ne changent pas.

Objet : un nouvel onglet **FMS Airbus**, le tutoriel du MCDU famille A320 en 92 captures. Il est organisé en 11 bandeaux déroulants, fermés par défaut, avec une étape par capture et son texte.

## 1 · Fichiers fournis, à copier tels quels

| Fourni | Destination |
|---|---|
| `img/fms-airbus/fms-airbus-01.jpg` à `fms-airbus-92.jpg` | `img/fms-airbus/`, originaux 2576 × 1184, ne pas recompresser |
| `js/data/fms_airbus.js` | `js/data/fms_airbus.js` |
| `js/fmsairbus.js` | `js/fmsairbus.js` |

## 2 · Modifications

**`index.html`**
- Dans la barre `.tools`, juste après le bouton `btnFms`, ajouter :
  `<button type="button" class="btn ghost" id="btnFmsAirbus" aria-expanded="false" aria-controls="fmsAirbusSheet">FMS Airbus</button>`
- Après la section `#fmsSheet`, ajouter :

```html
<!-- Tutoriel MCDU famille A320 en captures : statique, jamais lu par le parseur. -->
<section class="sheet" id="fmsAirbusSheet" hidden>
  <h2>FMS Airbus</h2>
  <p class="hint fa-intro">MCDU famille A320 d'Infinite Flight, étape par étape. Exemple RPMD vers RPLL. Tutoriel communautaire en captures [TIERS]. Toucher une capture pour l'ouvrir en grand.</p>
  <div id="fmsAirbusBody"></div>
</section>
```

- Scripts : ajouter `js/data/fms_airbus.js` juste après `js/data/fields.js`, puis `js/fmsairbus.js` juste après `js/rev.js`, avant `js/ui.js`.
- Jeton de cache : passer de `?v=44` à `?v=45` sur la feuille de style et sur **tous** les scripts.

**`js/dom.js`** : ajouter `btnFmsAirbus`, `fmsAirbusSheet` et `fmsAirbusBody` dans `el`.

**`js/ui.js`** : ajouter une entrée à `ONGLETS`, après celle d'A380-800 FMS :
`{ btn:el.btnFmsAirbus, panneau:el.fmsAirbusSheet, ouvert:fmsAirbusOuvert },`
Mettre à jour la liste « Depend de » de l'en-tête.

**`css/style.css`** : ajouter à la suite du bloc « onglet A380-800 FMS » :

```css
/* ---------- onglet FMS Airbus ---------- */
.fa-intro{padding:12px 14px 4px}
.fa-bloc{border-top:1px solid var(--line)}
.fa-bloc summary{cursor:pointer;display:flex;align-items:center;gap:10px;padding:13px 14px;
  font-family:var(--display);font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.fa-bloc summary:hover,.fa-bloc[open] summary{color:var(--txt)}
.fa-bloc summary:focus-visible{outline:2px solid var(--cyan);outline-offset:-2px}
.fa-bloc-n{font-family:var(--mono);font-size:11px;color:var(--cyan);border:1px solid #1c4453;border-radius:999px;padding:1px 7px}
.fa-bloc-c{margin-left:auto;font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;text-transform:none}
.fa-etapes{list-style:none;margin:0;padding:0 14px 8px}
.fa-etape{display:grid;grid-template-columns:auto 1fr;gap:6px 10px;padding:12px 0;border-top:1px dashed var(--line)}
.fa-etape:first-child{border-top:0}
.fa-num{font-family:var(--mono);font-size:11px;color:var(--amber);padding-top:2px}
.fa-txt{margin:0;font-size:14px;line-height:1.5}
.fa-img{grid-column:1/-1;display:block}
.fa-img img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:8px;background:#000}
```

## 3 · Contrôles

1. L'onglet s'ouvre et affiche 11 bandeaux fermés. Il n'y a aucune erreur console.
2. Tous les bandeaux ouverts contiennent 92 étapes et 92 images. Aucune image ne renvoie de 404 : `document.querySelectorAll('.fa-img img')` donne 92 éléments, tous avec `naturalWidth > 0`.
3. Un clic sur une capture l'ouvre en pleine résolution dans un nouvel onglet.
4. La séquence d'onglets ne laisse qu'un seul onglet actif à chaque clic. Le dossier REV 35 est reconnu, sans bandeau. Le reste de la page est identique.
5. Les fichiers modifiés sont en LF et ne contiennent aucun tiret long.

Commit `Onglet FMS Airbus : tutoriel MCDU en 92 captures, 11 bandeaux`, puis push sur `main`. Ajouter une section au rapport, au format des précédentes.
