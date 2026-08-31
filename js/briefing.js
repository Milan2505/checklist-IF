/* ============================================================
   CHARGEMENT DU BRIEFING ET INDEX DES SECTIONS
   Distingue le DOSSIER de la FEUILLE DU VOL, indexe les titres §,
   affiche le badge de revision, branche le bouton et le glisser-deposer.
   Depend de : state.js, dom.js, parser/*, alert.js, refs.js.
============================================================ */
/* ============================================================
   CHARGEMENT DU BRIEFING + LECTURE DES SECTIONS
============================================================ */
/* Deux documents, deux roles, jamais confondus :
   - le DOSSIER porte la methode et les sections § ; son §0 est un gabarit,
     ses colonnes decrivent quoi taper et ne contiennent aucune valeur ;
   - la FEUILLE DU VOL porte les valeurs du jour.
   Un fichier qui resout au moins dix renvois est un dossier, pas une feuille. */
let docIdx = null, sheetIdx = null;

function buildIndex(txt){
  const lines = txt.split('\n'), heads = [];
  let inCode = false;
  lines.forEach((l,i)=>{
    if(/^```/.test(l)){ inCode = !inCode; return; }
    if(inCode) return;                        /* un # dans un bloc de code n'est pas un titre */
    const m = l.match(/^(#{1,4})\s+(.*)$/);
    /* REV 19 titre ses sous-sections « ### §0.5 · … » : le § fait partie du
       titre, pas du numero. On l'enleve a l'indexation, sinon le renvoi 0.5
       ne retrouve jamais sa section. */
    if(m) heads.push({lvl:m[1].length, txt:m[2].replace(/[`*]/g,'').replace(/^§\s*/,'').trim(), i:i});
  });
  return { lines:lines, heads:heads };
}
/* l'entete annonce ce qui est charge : dossier, feuille, ou les deux */
/* Deux pastilles distinctes : le dossier ne bouge qu'a un changement de
   protocole, la feuille se refait a chaque vol. Voir la paire d'un coup
   d'oeil evite de voler sur la feuille d'hier. */
function badgeRev(){
  const out = [];
  if(state.rev) out.push('<span class="rev-chip doc" title="Dossier de référence">'+esc(state.rev)+'</span>');
  if(state.sheetRev){
    const cs = (state.sheetCallsign||'').trim();
    out.push('<span class="rev-chip sheet" title="Feuille du vol">'+
             esc(state.sheetRev + (cs ? ' · '+cs : ''))+'</span>');
    /* 34 cases vides ne disent pas si le document n'en porte pas ou si la
       lecture a echoue : on leve l'ambiguite sans crier. Uniquement quand aucun
       cartouche n'est reconnu — anomalie et cellules vides ont leur propre
       traitement. */
    if(state.sheet && !cartouche){
      out.push('<span class="rev-note" title="Aucun des cinq cartouches du §A.4 n\'a été reconnu dans cette feuille">'+
               'feuille sans cartouche</span>');
    }else if(state.sheet && cartouche && cartouche.resolues < cartouche.total){
      out.push('<span class="rev-note" title="Cellules des cinq cartouches résolues à la lecture">'+
               cartouche.resolues+'/'+cartouche.total+' cellules</span>');
    }
  }
  if(!out.length) out.push('<span class="rev-chip vide">aucun briefing</span>');
  return out.join('');
}
function paintBadge(){ el.revTag.innerHTML = badgeRev(); }
function idxDoc(){   if(!docIdx   && state.doc)   docIdx   = buildIndex(state.doc);   return docIdx; }
function idxSheet(){ if(!sheetIdx && state.sheet) sheetIdx = buildIndex(state.sheet); return sheetIdx; }

/* "2" ne doit pas attraper "2.1" : apres le numero, un separateur est exige.
   Comparaison insensible a la casse : le dossier titre « 7.0 BIS » et ecrit
   « §7.0 bis » en prose. Un numero de section n'a pas de casse — la faire
   compter rendait le renvoi §7.0 bis introuvable, en silence. */
function findHead(idx, ref){
  if(!idx) return -1;
  const r = ref.toLowerCase();
  return idx.heads.findIndex(h=>{
    const t = h.txt.toLowerCase();
    return t === r || (t.slice(0,r.length) === r && /^[\s·:\-–—]/.test(t.slice(r.length)));
  });
}
function countRefs(idx){
  let n = 0;
  ALL_REFS.forEach(r=>{ if(findHead(idx, r) >= 0) n++; });
  return n;
}

/* ------------------------------------------------------------
   DOSSIER OU FEUILLE
   Compter les renvois § ne suffit plus. Depuis la REV 19, une feuille reprend
   les titres §0.1 a §0.11 du dossier : elle en resout douze, passait donc pour
   un dossier, et AUCUNE de ses valeurs n'etait extraite — la page se chargeait
   sans rien remplir, en silence.
   Ce qui separe reellement les deux, c'est que la feuille PORTE des valeurs :
   les cartouches du dossier sont des gabarits, cellule vide ou methode en
   prose, et rien n'y passe la validation. On compte donc les cellules du
   cartouche reellement resolues.
   readValues() ne touche a aucun global : la mesure est sans effet de bord.
------------------------------------------------------------ */
const CELLULES_FEUILLE = 8;
function compteCellules(txt){
  const vals = readValues(txt.split('\n')).vals;
  let n = 0;
  REQUIRED.forEach(e=>{ if(vals[e.key] !== undefined) n++; });
  return n;
}

function applyDoc(txt){
  const idx = buildIndex(txt);
  const cells = compteCellules(txt);
  const dossier = cells < CELLULES_FEUILLE && countRefs(idx) >= 10;
  const m = txt.match(/REV\s*(\d+)/i);
  const rev = m ? ('REV '+m[1]) : 'BRIEFING';
  if(dossier){ state.doc = txt;   state.rev = rev;      docIdx = idx;   docDirty = true; }
  else       { state.sheet = txt; state.sheetRev = rev; sheetIdx = idx; sheetDirty = true; }
  /* seule la feuille du vol alimente les cases : le gabarit du dossier remplirait
     "Compagnie" avec "OACI 3 lettres" */
  let vals = 0;
  if(!dossier){
    const got = extractValues(txt);        /* renseigne aussi le cartouche lu */
    state.sheetCallsign = got.callsign || '';
    vals = fillFrom(got);
    paintAlert();
  }
  paintBadge();
  markRefs();
  save();
  return { refs:availableRefs().length, vals:vals, dossier:dossier, rev:rev,
           anomalies: cartouche ? (cartouche.bad.length + cartouche.unknown.length + cartouche.missing.length) : 0 };
}

/* le chargement doit se voir : nature du fichier, valeurs reprises, couverture */
function announceDoc(r){
  const tot = ALL_REFS.length;
  const b = r.refs === tot ? 'les '+tot+' renvois § sont lisibles'
                           : r.refs+' renvoi'+(r.refs>1?'s':'')+' § sur '+tot;
  if(r.dossier){ toast(r.rev+' · dossier chargé — '+b); return; }
  const a = r.vals ? r.vals+' valeur'+(r.vals>1?'s':'')+' reprise'+(r.vals>1?'s':'')
                   : 'aucune valeur reconnue';
  /* l'anomalie de cartouche passe devant le reste : elle se corrige avant de voler */
  if(r.anomalies){ toast(r.rev+' · feuille du vol — '+a+' · cartouche à vérifier'); return; }
  toast(r.rev+' · feuille du vol — '+a+' · '+b);
}

async function readFile(f){
  if(!f) return false;
  if(!/\.(md|markdown|txt)$/i.test(f.name)){
    toast('Fichier ignoré : .md, .markdown ou .txt attendu'); return false;
  }
  try{
    announceDoc(applyDoc(await f.text()));
    return true;
  }catch(e){
    toast('Lecture du fichier impossible'); return false;
  }
}

el.btnLoad.addEventListener('click', ()=> el.file.click());
el.file.addEventListener('change', async e=>{
  await readFile(e.target.files[0]);
  e.target.value = '';                        /* le meme fichier peut etre recharge */
});

/* on n'intercepte que les fichiers : le glisser-deposer de texte dans un champ reste possible */
const hasFiles = e => !!(e.dataTransfer && Array.from(e.dataTransfer.types||[]).indexOf('Files') >= 0);
document.addEventListener('dragover', e=>{ if(hasFiles(e)) e.preventDefault(); });
document.addEventListener('drop', async e=>{
  if(!hasFiles(e)) return;
  e.preventDefault();
  await readFile(e.dataTransfer.files[0]);
});
