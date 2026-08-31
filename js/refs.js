/* ============================================================
   RENVOIS § ET LECTEUR DE SECTION
   Disponibilite des renvois, extraction d'une section du markdown,
   rendu markdown minimal, ouverture et fermeture du tiroir.
   Depend de : data/phases.js, state.js, dom.js, briefing.js, render.js (esc).
============================================================ */
/* tous les renvois cites par la checklist, sans doublon */
const ALL_REFS = Array.from(new Set(
  PHASES.reduce((a,p)=> a.concat(p.items.map(it=>it.r).filter(Boolean)), [])
));

/* un renvoi est lisible s'il figure dans l'un des deux documents charges */
function hasRef(ref){
  return findHead(idxDoc(), ref) >= 0 || findHead(idxSheet(), ref) >= 0;
}
function availableRefs(){
  const ok = [];
  ALL_REFS.forEach(r=>{ if(hasRef(r)) ok.push(r); });
  return ok;
}
function loaded(){ return !!(state.doc || state.sheet); }

/* chaque pastille § annonce si sa section figure dans ce qui est charge :
   c'est le retour visible qui manquait au chargement */
function markRefs(){
  const ok = availableRefs();
  resetSections();                   /* le texte déplié suit le document, pas l'inverse */
  el.phases.querySelectorAll('.ref').forEach(b=>{
    if(!loaded()){ b.classList.remove('ok','miss'); b.removeAttribute('title'); return; }
    const has = ok.indexOf(b.dataset.ref) >= 0;
    b.classList.toggle('ok', has);
    b.classList.toggle('miss', !has);
    b.title = has ? 'Section présente dans les documents chargés'
                  : 'Absente des documents chargés';
  });
}

/* extrait une section du markdown a partir de son numero (0, 2.3, 6.6, A.4).
   La feuille du vol passe avant le dossier : quand les deux portent la meme
   section (§0, §A.4), c'est celle du vol du jour qui sert, chiffres compris. */
function section(ref){
  const sources = [idxSheet(), idxDoc()];
  for(let s = 0; s < sources.length; s++){
    const idx = sources[s];
    const start = findHead(idx, ref);
    if(start < 0) continue;
    const h = idx.heads[start];
    let end = idx.lines.length;
    for(let k = start+1; k < idx.heads.length; k++){
      if(idx.heads[k].lvl <= h.lvl){ end = idx.heads[k].i; break; }
    }
    return { title:h.txt, body:idx.lines.slice(h.i+1, end).join('\n').trim() };
  }
  return null;
}

/* rendu markdown minimal, suffisant pour ce dossier */
function md2html(src){
  const out = [], lines = src.split('\n');
  let i = 0, inCode = false, code = [];
  const inline = s => esc(s)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/⚠/g,'<span class="w">⚠</span>');
  const BLOCK = /^(#{1,4}\s|\s*[-*]\s|\s*\d+[.)]\s|\s*\||```)/;

  while(i < lines.length){
    const l = lines[i];
    if(/^```/.test(l)){
      if(inCode){ out.push('<pre>'+esc(code.join('\n'))+'</pre>'); code = []; inCode = false; }
      else inCode = true;
      i++; continue;
    }
    if(inCode){ code.push(l); i++; continue; }

    if(/^\s*\|/.test(l) && /^\s*\|/.test(lines[i+1]||'') && /-{2,}/.test(lines[i+1]||'')){
      const cells = r => r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
      const head = cells(l); i += 2;
      const rows = [];
      while(i < lines.length && /^\s*\|/.test(lines[i])){ rows.push(cells(lines[i])); i++; }
      out.push('<table><thead><tr>'+head.map(c=>'<th>'+inline(c)+'</th>').join('')+'</tr></thead><tbody>'+
        rows.map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>');
      continue;
    }

    const hm = l.match(/^(#{1,4})\s+(.*)$/);
    if(hm){ out.push('<h3>'+inline(hm[2])+'</h3>'); i++; continue; }

    if(/^\s*[-*]\s+/.test(l)){
      const items = [];
      while(i < lines.length && /^\s*[-*]\s+/.test(lines[i])){ items.push(lines[i].replace(/^\s*[-*]\s+/,'')); i++; }
      out.push('<ul>'+items.map(t=>'<li>'+inline(t)+'</li>').join('')+'</ul>');
      continue;
    }
    if(/^\s*\d+[.)]\s+/.test(l)){
      const items = [];
      while(i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])){ items.push(lines[i].replace(/^\s*\d+[.)]\s+/,'')); i++; }
      out.push('<ol>'+items.map(t=>'<li>'+inline(t)+'</li>').join('')+'</ol>');
      continue;
    }

    if(/^\s*---+\s*$/.test(l)){ i++; continue; }
    if(l.trim() === ''){ i++; continue; }

    const para = [];
    while(i < lines.length && lines[i].trim() !== '' && !BLOCK.test(lines[i])){ para.push(lines[i]); i++; }
    out.push('<p>'+inline(para.join(' '))+'</p>');
  }
  if(inCode && code.length) out.push('<pre>'+esc(code.join('\n'))+'</pre>');
  return out.join('');
}

/* ------------------------------------------------------------
   DEPLIAGE EN PLACE — REV 26
   La section ne s'ouvre plus par-dessus la page : elle se deroule SOUS
   la ligne qui la cite. Le tiroir modal a disparu, et avec lui le piege
   qu'il portait — il masquait la checklist, donc il coupait le lien
   entre l'etape et son texte au moment precis ou on le cherchait.

   Le panneau est cree vide par render.js, juste apres sa ligne. Il se
   remplit au premier depliage, et se vide des que les documents charges
   changent (markRefs) : un texte de section ne survit pas au dossier qui
   l'a produit.
------------------------------------------------------------ */
function contenuSection(ref){
  if(!loaded()){
    return '<div class="empty-state">Le briefing n\'est pas chargé. Touchez « Charger le briefing » '+
           'en haut et choisissez le fichier .md du dossier : le texte exact de chaque renvoi se dépliera ici.</div>';
  }
  const s = section(ref);
  if(s) return '<h4 class="sec-t">'+esc(s.title)+'</h4>'+md2html(s.body);

  const ok = availableRefs();
  const liste = ok.length ? ok.map(r=>'§'+r).join(' · ') : 'aucun';
  const chargés = [state.rev ? 'dossier '+state.rev : null,
                   state.sheetRev ? 'feuille '+state.sheetRev : null].filter(Boolean).join(' + ');
  return '<div class="empty-state">'+
         '<p>La section <strong>§'+esc(ref)+'</strong> ne figure pas dans ce qui est chargé ('+esc(chargés)+').</p>'+
         '<p>Renvois réellement disponibles : '+esc(liste)+' — soit <strong>'+ok.length+' sur '+ALL_REFS.length+'</strong>.</p>'+
         '<p>Il manque le dossier complet, ou la section porte un autre titre.</p>'+
         '</div>';
}

/* le panneau d'une ligne est son voisin immediat : aucun index a tenir */
function panneauDe(btn){
  const row = btn.closest('.item');
  const p = row && row.nextElementSibling;
  return (p && p.classList.contains('sec')) ? p : null;
}

function toggleRef(btn){
  const p = panneauDe(btn); if(!p) return;
  const ouvert = !p.hidden;
  if(ouvert){
    p.hidden = true;
    btn.setAttribute('aria-expanded','false');
    return;
  }
  if(!p.dataset.rempli){                       /* rendu une fois, pas a chaque clic */
    p.innerHTML = contenuSection(btn.dataset.ref);
    p.dataset.rempli = '1';
  }
  p.hidden = false;
  btn.setAttribute('aria-expanded','true');
}

/* Un dossier qui change rend tous les textes deja deplies caducs : on les
   vide et on les referme, plutot que de laisser lire la section d'hier. */
function resetSections(){
  el.phases.querySelectorAll('.sec').forEach(p=>{
    p.hidden = true;
    p.innerHTML = '';
    delete p.dataset.rempli;
  });
  el.phases.querySelectorAll('.ref[aria-expanded]').forEach(b=> b.setAttribute('aria-expanded','false'));
}

/* Échap referme ce qui est ouvert, sans toucher aux phases dépliées */
document.addEventListener('keydown', e=>{
  if(e.key !== 'Escape') return;
  const ouverts = el.phases.querySelectorAll('.sec:not([hidden])');
  if(!ouverts.length) return;
  ouverts.forEach(p=>{ p.hidden = true; });
  el.phases.querySelectorAll('.ref[aria-expanded="true"]').forEach(b=> b.setAttribute('aria-expanded','false'));
});
