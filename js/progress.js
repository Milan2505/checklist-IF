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

/* Le profil ne porte que les phases reellement affichees : une phase
   entierement conditionnee, hors condition, ne laisse pas de noeud vide. */
function buildNodes(){
  const vis = visiblePhases();
  const L = el.pfPath.getTotalLength(), n = vis.length;
  el.pfNodes.textContent = '';
  vis.forEach((pi,k)=>{
    const p = el.pfPath.getPointAtLength(n > 1 ? L*(k/(n-1)) : L/2);
    const g = svgEl('g', {'class':'node', 'data-p':pi});
    g.appendChild(svgEl('circle', {'class':'ring', cx:p.x, cy:p.y, r:6}));
    const t = svgEl('text', {'class':'num', x:p.x, y:p.y+0.5});
    t.textContent = k+1;
    g.appendChild(t);
    g.addEventListener('click', ()=> openPhase(pi));
    el.pfNodes.appendChild(g);
  });
  el.pfNodes.appendChild(svgEl('text', {'class':'pf-label', id:'pfLabel', x:500, y:34}));
}

function paintProgress(){
  const vis = visiblePhases();
  let all = 0, ok = 0, lastComplete = -1;
  vis.forEach(pi=>{
    const d = doneCount(pi), t = totalCount(pi);
    all += t; ok += d;
    if(d === t) lastComplete = pi;
  });
  const pct = all ? ok/all : 0, pctInt = Math.round(pct*100);

  el.hdrCount.innerHTML = '<b>'+ok+'</b>/'+all;
  el.footBar.style.width = (pct*100)+'%';
  el.footPct.textContent = pctInt+'%';
  if(el.footWrap) el.footWrap.setAttribute('aria-valuenow', pctInt);

  let cur = (state.open >= 0 && phaseVisible(state.open)) ? state.open : -1;
  if(cur < 0 && vis.length){
    const k = vis.indexOf(lastComplete);           /* -1 si aucune n'est complete */
    cur = vis[Math.min(k+1, vis.length-1)];
  }
  el.footPhase.textContent = PHASES[cur] ? PHASES[cur].n : 'Vol';

  const L = el.pfPath.getTotalLength();
  el.pfDone.style.strokeDasharray = (L*pct)+' '+L;
  el.pfNodes.querySelectorAll('.node').forEach(g=>{
    const pi = +g.dataset.p;
    g.classList.toggle('done', doneCount(pi) === totalCount(pi));
    g.classList.toggle('active', pi === cur);
  });
  const lbl = document.getElementById('pfLabel');
  if(lbl) lbl.textContent = PHASES[cur] ? PHASES[cur].n : '';
}
