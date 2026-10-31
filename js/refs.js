/* ============================================================
   RENVOIS § ET RENDU MARKDOWN
   Disponibilite des renvois, rendu markdown minimal.
   Depend de : state.js, briefing.js, render.js (esc).
============================================================ */
/* ------------------------------------------------------------
   REV 33 · LA LISTE DES RENVOIS NE SORT PLUS DE LA CHECKLIST
   Elle se calculait sur les lignes de data/phases.js, retire avec la
   checklist. Elle ne sert plus a aucune pastille : elle sert a RECONNAITRE
   LE DOSSIER (countRefs, seuil RENVOIS_DOSSIER dans briefing.js) et au
   message de chargement. Elle est donc figee ici, dans l'ordre ou la
   checklist les citait a la REV 32, moins les trois sections que la REV 33
   retire du dossier : 7.0, 7.0.A et 7.0 bis. 32 renvois, le seuil est a 20.
------------------------------------------------------------ */
const ALL_REFS = ['7','6','0.1','0.2','0.2 bis','0.3','0.4','0.5','A.5','0.6',
                  '0.7','0.8','0.9','0.10','A.4','8','6.2','1','3','2.1',
                  '2.2','2.3','4','6.6','A.2','6.1','5','6.4','6.7','6.3',
                  '6.5','9'];

/* un renvoi est lisible s'il figure dans l'un des deux documents charges */
function hasRef(ref){
  return findHead(idxDoc(), ref) >= 0 || findHead(idxSheet(), ref) >= 0;
}
function availableRefs(){
  const ok = [];
  ALL_REFS.forEach(r=>{ if(hasRef(r)) ok.push(r); });
  return ok;
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
