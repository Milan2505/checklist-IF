/* ============================================================
   LECTURE · TABLEAUX, CARTOUCHES ET PROSE
   Reperage des tableaux et de leur section, lecture des lignes,
   completude des cinq cartouches du §A.4, rattrapage en prose.
   Depend de : parser/registre.js, parser/labels.js, parser/validate.js.
============================================================ */
/* ------------------------------------------------------------
   2 · LECTURE DES TABLEAUX
   Une valeur ne vient QUE d'une ligne de tableau dont la forme est
   declaree. Prose, titre, liste, tableau d'une autre forme : ignores.
------------------------------------------------------------ */
const SEPARATEUR = /^\s*\|[\s\-:|]+$/;
function cellsOf(l){ return l.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim()); }

/* Chaque tableau retient le titre de section qui le precede — titre markdown,
   ou ligne en gras isolee du genre "**Dégagement n° 1**", qui est la seule
   chose qui separe le bloc du degagement du reste des Aeroports alternatifs.
   Sans ce contexte, "Altitude (Pieds)" ne peut pas etre departage (§A.5). */
function tables(lines){
  const out = [];
  let inCode = false, section = '';
  for(let i = 0; i < lines.length; i++){
    if(/^```/.test(lines[i])){ inCode = !inCode; continue; }
    if(inCode) continue;
    const h = lines[i].match(/^#{1,6}\s+(.*)$/);
    if(h){ section = normLabel(h[1].replace(/^§\s*/,'')); continue; }
    const g = lines[i].match(/^\s*\*\*(.+?)\*\*\s*:?\s*$/);
    if(g){ section += ' ' + normLabel(g[1]); continue; }
    if(!/^\s*\|/.test(lines[i])) continue;
    if(!SEPARATEUR.test(lines[i+1] || '')) continue;
    let end = i + 2;
    while(end < lines.length && /^\s*\|/.test(lines[end]) && !SEPARATEUR.test(lines[end])) end++;
    out.push({ headCells:cellsOf(lines[i]), from:i + 2, to:end, section:section });
    i = end - 1;
  }
  return out;
}

/* quelle colonne porte la valeur, ou null si la forme n'est pas reconnue */
function valueColumn(headCells){
  if(headCells.length === 2) return 1;
  if(headCells.length === 3 && normLabel(headCells[1]).indexOf('a taper') >= 0) return 1;
  return null;
}

function readValues(lines){
  const rows = [], found = [], tabs = tables(lines);
  tabs.forEach(t=>{
    const col = valueColumn(t.headCells);
    for(let i = t.from; i < t.to; i++){
      const cells = cellsOf(lines[i]);
      const label = cells[0] || '';
      if(col === null){
        rows.push({ line:i+1, label:label, ok:false, shape:true,
                    reason:'tableau ignoré ('+t.headCells.length+' colonnes)' });
        continue;
      }
      /* Un libelle explicitement ignore l'emporte sur toute resolution. Sans cela,
         "Itinéraire (Route)" du tableau de degagement se resout en 'route' par sa
         moitie anglaise et, avec la regle "la derniere gagne", ecrase le vrai
         LFML → EDDM par un DCT. Meme mecanique pour "Altitude (Pieds)", qui vaut
         FL de croisiere aux Entrees facultatives et elevation de terrain chez les
         Aeroports alternatifs — d'ou l'ignore contextuel (REV 19). */
      if(estIgnore(label, t.section)){
        rows.push({ line:i+1, label:label, ok:false, reason:'ignoré volontairement' });
        continue;
      }
      const e = regFor(label);
      if(!e){
        rows.push({ line:i+1, label:label, ok:false, unknown:true, reason:'libellé non reconnu' });
        continue;
      }
      const raw = cleanCell(cells[col] || '');
      const r = validate(e, raw);
      rows.push({ line:i+1, label:label, key:e.key, raw:raw, value:r.value, ok:r.ok, reason:r.reason,
                  forme:formeLibelle(label) });
      if(r.ok) found.push({ key:e.key, value:r.value, line:i+1 });
    }
  });
  /* Meme cle plusieurs fois : la derniere ligne gagne. Mais un doublon
     identique est une redondance assumee entre le formulaire et le cartouche,
     pas un defaut — seul un doublon DIVERGENT merite un avertissement. */
  const vals = {}, vue = {};
  found.forEach(f=>{
    const p = vue[f.key];
    if(p){
      if(p.value === f.value)
        console.info('Briefing : « '+f.key+' » répété lignes '+p.line+' et '+f.line+
                     ' — même valeur ('+f.value+'), redondance assumée');
      else
        console.warn('Briefing : « '+f.key+' » diverge — ligne '+p.line+' donne « '+p.value+
                     ' », ligne '+f.line+' donne « '+f.value+' » — la dernière gagne');
    }
    vue[f.key] = { line:f.line, value:f.value };
    vals[f.key] = f.value;
  });
  return { vals:vals, rows:rows, tabs:tabs };
}

/* ------------------------------------------------------------
   4 · CARTOUCHES — completude des 34 cellules (REV 19 §A.4)
   La REV 18 n'avait qu'un cartouche, donc un seul tableau : on validait
   "le premier tableau de la section Cartouche". La REV 19 en a CINQ — ①
   identite, ② pistes, ③ vitesses, ④ carburant, ⑤ masses — et une feuille
   les titre comme elle veut. Chercher un tableau nomme ne tient plus.
   Desormais la completude se mesure sur TOUT le document : une cellule
   requise est resolue, refusee, ou absente, ou qu'elle soit ecrite.
------------------------------------------------------------ */
/* Un tableau est "zone de cartouche" s'il est a DEUX colonnes — le §A.4 impose
   `Champ | Valeur` — et s'il porte au moins deux libelles requis. Les deux
   conditions comptent : les tableaux du §0 sont a trois colonnes et portent
   eux aussi des libelles requis (Type et Indicatif d'appel dans Informations
   sur l'avion), mais leurs autres lignes — Variante, les trois Profils — sont
   des reglages sans libelle au registre. Les compter en "non reconnus" levait
   un bandeau d'anomalie sur une feuille pourtant conforme. */
function zonesCartouche(lines, read){
  return read.tabs.filter(t=>{
    if(t.headCells.length !== 2) return false;
    let n = 0;
    for(let i = t.from; i < t.to; i++){
      const label = cellsOf(lines[i])[0] || '';
      if(estIgnore(label, t.section)) continue;
      const e = regFor(label);
      if(e && e.required) n++;
    }
    return n >= 2;
  });
}

function readCartouche(lines, read){
  const zones = zonesCartouche(lines, read);
  const dansZone = i => zones.some(z => i >= z.from && i < z.to);

  const bad = [], unknown = [], rejected = [], unresolved = [], vus = {}, refuse = {};
  read.rows.forEach(r=>{
    const nom = cleanCell(r.label) || ('ligne '+r.line);
    /* forme du tableau et libelles inconnus : seulement dans les cartouches,
       sinon le §0 entier remonterait au bandeau a chaque chargement */
    if(r.shape){ if(dansZone(r.line-1)) bad.push(nom); return; }
    if(r.unknown){ if(dansZone(r.line-1)) unknown.push(nom); return; }
    if(!r.key) return;                                   /* ignore volontairement */
    if(r.ok){ vus[r.key] = 1; return; }
    /* AUTO ou cellule vide n'est pas un refus : la ligne n'a rien tenté.
       Une cellule ecrite mais illisible, si — et elle se nomme une seule fois. */
    if(r.reason === 'non fourni') return;
    const e = REG_BY_LABEL.get(normLabel(r.label)) || regFor(r.label);
    if(!(e && e.required)) return;                       /* hors 34 : voir refus */
    if(refuse[r.key]) return;
    refuse[r.key] = 1;
    rejected.push(nom+' — '+r.reason);
  });

  const manques = REQUIRED.filter(e=>!vus[e.key] && !refuse[e.key]);
  manques.forEach(e=> unresolved.push(e.key));
  Object.keys(refuse).forEach(k=> unresolved.push(k));

  /* aucun cartouche reconnu ET aucune des 34 lue : le fichier n'en porte pas */
  if(!zones.length && !Object.keys(vus).length) return null;

  return { bad:bad, unknown:unknown, rejected:rejected, missing:manques.map(e=>e.display),
           zones:zones, unresolved:unresolved, total:REQUIRED.length,
           resolues:REQUIRED.filter(e=>vus[e.key]).length };
}

/* ------------------------------------------------------------
   6 · PROSE — reduite au strict residuel
   MIN DIV, BINGO, bloc et LW en sont sortis : ils viennent desormais
   de tableaux declares. Leurs regex etaient gourmandes ([^\n]*), donc
   elles remontaient jusqu'a la DERNIERE clause "= N kg" de la ligne —
   "réserve finale = 1 100 kg" — au lieu de leur propre valeur.
   Ne restent que des motifs ancres, sans quantificateur ouvert.
   N'ecrit jamais par-dessus une cle deja lue en tableau.
------------------------------------------------------------ */
function scanProse(txt, out){
  let m;
  /* "258° / 42 NM depuis LEBL" — cap et distance du degagement */
  m = txt.match(/(\d{1,3})\s*°\s*\/\s*(\d{1,4})\s*NM/);
  if(m){ if(!out.degcap) out.degcap = m[1]; if(!out.degdist) out.degdist = m[2]; }
  /* pistes attendues, telles qu'elles figurent dans les remarks de l'OFP */
  m = txt.match(/DEP\s*RWY\s*EXPECTED\s*(\d{2}[LRC]?)/i);
  if(m && !out.piste) out.piste = m[1];
  m = txt.match(/ARR\s*RWY\s*EXPECTED\s*(\d{2}[LRC]?)/i);
  if(m && !out.arrpiste) out.arrpiste = m[1];
}
