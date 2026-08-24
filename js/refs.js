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

let lastFocus = null;
function openRef(ref){
  if(!loaded()){
    el.drTitle.textContent = '§'+ref;
    el.drBody.innerHTML = '<div class="empty-state">Le briefing n\'est pas chargé. Touchez « Charger le briefing » en haut et choisissez le fichier .md du dossier : le texte exact de chaque renvoi s\'ouvrira ici.</div>';
  }else{
    const s = section(ref);
    if(!s){
      el.drTitle.textContent = '§'+ref;
      const ok = availableRefs();
      const liste = ok.length ? ok.map(r=>'§'+r).join(' · ') : 'aucun';
      const chargés = [state.rev ? 'dossier '+state.rev : null,
                       state.sheetRev ? 'feuille '+state.sheetRev : null].filter(Boolean).join(' + ');
      el.drBody.innerHTML =
        '<div class="empty-state">'+
        '<p>La section <strong>§'+esc(ref)+'</strong> ne figure pas dans ce qui est chargé ('+esc(chargés)+').</p>'+
        '<p>Renvois réellement disponibles : '+esc(liste)+' — soit <strong>'+ok.length+' sur '+ALL_REFS.length+'</strong>.</p>'+
        '<p>Il manque le dossier complet, ou la section porte un autre titre.</p>'+
        '</div>';
    }else{
      el.drTitle.textContent = s.title;
      el.drBody.innerHTML = md2html(s.body);
    }
  }
  lastFocus = document.activeElement;
  el.drawer.classList.add('open');
  el.drawer.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  el.drBody.parentElement.scrollTop = 0;
  el.drClose.focus({preventScroll:true});
}

function closeRef(){
  if(!el.drawer.classList.contains('open')) return;
  el.drawer.classList.remove('open');
  el.drawer.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  lastFocus = null;
}

el.drClose.addEventListener('click', closeRef);
el.drawer.addEventListener('click', e=>{ if(e.target === el.drawer) closeRef(); });
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeRef(); });

/* le clavier reste dans le lecteur tant qu'il est ouvert */
el.drawer.addEventListener('keydown', e=>{
  if(e.key !== 'Tab') return;
  const f = Array.prototype.filter.call(
    el.drawer.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'),
    x => x.offsetParent !== null
  );
  if(!f.length) return;
  const first = f[0], last = f[f.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});
