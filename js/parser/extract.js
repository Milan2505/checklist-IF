/* ============================================================
   LECTURE · EXTRACTION ET MODE DEBUG
   extractValues() est l'entree unique du lecteur ; cartouche, trace et
   refus portent le dernier releve. window.debugBriefing() les affiche.
   Depend de : parser/tables.js, parser/labels.js.
============================================================ */
let cartouche = null;      /* dernier relevé de completude, pour le bandeau */
let trace = null;          /* dernier relevé de lecture, pour le mode debug */
let refus = [];            /* valeurs refusées hors des 34 du cartouche */

function extractValues(txt){
  const lines = txt.split('\n');
  const read = readValues(lines);
  const out = Object.assign({}, read.vals);
  /* Partir → Arriver se reconstruit toujours depuis les deux lignes atomiques :
     aucun libellé « Route » n'est lu, le mot est trop ambigu (voir REGISTRE) */
  if(out._dep && out._arr) out.route = out._dep+' → '+out._arr;
  scanProse(txt, out);                                   /* cles encore absentes uniquement */
  cartouche = readCartouche(lines, read);
  /* Un rejet disparaissait en silence : la case restait vide sans rien dire,
     exactement le defaut que la lecture stricte doit supprimer. Une cellule
     VIDE ou en AUTO n'est pas un rejet — elle n'a rien tenté ; une cellule
     refusee, si. Les 34 sont deja rapportees par readCartouche : ne restent
     ici que les champs de formulaire, pour ne rien compter deux fois. */
  refus = read.rows.filter(r=>{
    if(!(r.key && !r.ok && r.reason !== 'non fourni')) return false;
    if(out[r.key] !== undefined) return false;
    return !(regFor(r.label) || {}).required;
  }).map(r=>({ key:r.key, label:cleanCell(r.label) || ('ligne '+r.line), line:r.line, reason:r.reason }));
  trace = read.rows;
  return out;
}

/* ------------------------------------------------------------
   5 · MODE DEBUG — window.debugBriefing()
   Pour chaque champ : libelle cherche, ligne retenue, cellule brute,
   valeur apres normalisation. Et les rejets, avec leur motif.
------------------------------------------------------------ */
function debugBriefing(){
  if(!trace){ console.log('Aucun briefing lu dans cette session.'); return; }
  const ok = trace.filter(r=>r.ok).map(r=>({
    champ:r.key, libellé:r.label, ligne:r.line, brut:r.raw, valeur:r.value, forme:r.forme }));
  const ko = trace.filter(r=>!r.ok && (r.key || r.unknown)).map(r=>({
    champ:r.key || '—', libellé:r.label, ligne:r.line, brut:r.raw || '', motif:r.reason }));
  console.log('%c'+ok.length+' valeur(s) retenue(s)', 'font-weight:bold');
  console.table(ok);
  console.log('%c'+ko.length+' ligne(s) écartée(s)', 'font-weight:bold');
  console.table(ko);
  /* Le point ouvert du §A.5 se ferme ici, en une lecture : la colonne « forme »
     dit quelle ecriture du libelle a effectivement resolu chaque ligne. */
  const formes = {};
  trace.forEach(r=>{ if(r.ok && r.forme) formes[r.forme] = (formes[r.forme]||0)+1; });
  const resume = Object.keys(formes).map(f=> f+' × '+formes[f]).join(' · ') || 'aucune';
  console.log('%cForme des libellés retenue (§A.5 point ouvert) : '+resume,
              'font-weight:bold;color:#9D8CFF');
  console.log('Le parseur accepte les deux écritures : « Passagers » comme '+
              '« Passagers (Passengers) ». Reporter cette ligne au §9 ferme le point.');
  return { retenues:ok, ecartees:ko, formes:formes };
}
window.debugBriefing = debugBriefing;
