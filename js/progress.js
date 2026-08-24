/* ============================================================
   PROFIL DE VOL ET COMPTEURS
   Noeuds SVG de l'entete, barre du pied de page, pourcentage.
   Depend de : data/phases.js, state.js, dom.js, render.js (doneCount).
============================================================ */
/* --- profil de vol + compteurs --- */
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs){
  const e = document.createElementNS(SVGNS, tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function buildNodes(){
  const L = el.pfPath.getTotalLength(), n = PHASES.length;
  el.pfNodes.textContent = '';
  PHASES.forEach((ph,i)=>{
    const p = el.pfPath.getPointAtLength(n > 1 ? L*(i/(n-1)) : L/2);
    const g = svgEl('g', {'class':'node', 'data-p':i});
    g.appendChild(svgEl('circle', {'class':'ring', cx:p.x, cy:p.y, r:6}));
    const t = svgEl('text', {'class':'num', x:p.x, y:p.y+0.5});
    t.textContent = i+1;
    g.appendChild(t);
    g.addEventListener('click', ()=> openPhase(i));
    el.pfNodes.appendChild(g);
  });
  el.pfNodes.appendChild(svgEl('text', {'class':'pf-label', id:'pfLabel', x:500, y:34}));
}

function paintProgress(){
  let all = 0, ok = 0, lastComplete = -1;
  PHASES.forEach((ph,pi)=>{
    const d = doneCount(pi);
    all += ph.items.length; ok += d;
    if(d === ph.items.length) lastComplete = pi;
  });
  const pct = all ? ok/all : 0, pctInt = Math.round(pct*100);

  el.hdrCount.innerHTML = '<b>'+ok+'</b>/'+all;
  el.footBar.style.width = (pct*100)+'%';
  el.footPct.textContent = pctInt+'%';
  if(el.footWrap) el.footWrap.setAttribute('aria-valuenow', pctInt);

  const cur = state.open >= 0 ? state.open : Math.min(lastComplete+1, PHASES.length-1);
  el.footPhase.textContent = PHASES[cur] ? PHASES[cur].n : 'Vol';

  const L = el.pfPath.getTotalLength();
  el.pfDone.style.strokeDasharray = (L*pct)+' '+L;
  el.pfNodes.querySelectorAll('.node').forEach((g,i)=>{
    g.classList.toggle('done', doneCount(i) === PHASES[i].items.length);
    g.classList.toggle('active', i === cur);
  });
  const lbl = document.getElementById('pfLabel');
  if(lbl) lbl.textContent = PHASES[cur] ? PHASES[cur].n : '';
}
