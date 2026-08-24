/* ============================================================
   LECTURE · LIBELLES
   Normalisation, nettoyage des marqueurs de source, resolution d'un
   libelle vers une entree du registre, forme retenue, libelles ignores.
   Depend de : parser/registre.js.
============================================================ */
function normLabel(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
          .replace(/[`*]/g,'').replace(/\s+/g,' ').trim();
}
/* Marqueurs de SOURCE du dossier (§Conventions) : ils qualifient l'origine de la
   valeur, pas la valeur elle-meme, donc ils se retirent avant validation.
   [WIP] et [MANQUE] n'y figurent pas volontairement — le premier disqualifie la
   cellule, le second dit « non fourni ». Tous deux sont traites dans validate(). */
const MARQUEUR_SOURCE = /\[(OFP|FORM|NAV|SIM|RDR|CALC)\]/g;
function cleanCell(s){
  return s.replace(/[`*]/g,'').replace(MARQUEUR_SOURCE,'')
          .replace(/\s+/g,' ').trim();
}
function digits(s){ return s.replace(/[\s\u00A0\u202F]/g,''); }

/* Un libelle s'ecrit "Compagnie aérienne (Airline)" : on essaie la chaine
   entiere, puis chaque moitie — trois egalites strictes, jamais un "contient". */
function regFor(raw){
  const n = normLabel(raw);
  if(REG_BY_LABEL.has(n)) return REG_BY_LABEL.get(n);
  const m = n.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if(m){
    if(REG_BY_LABEL.has(m[1])) return REG_BY_LABEL.get(m[1]);
    if(REG_BY_LABEL.has(m[2])) return REG_BY_LABEL.get(m[2]);
  }
  return null;
}
/* ------------------------------------------------------------
   FORME DU LIBELLE — REV 20 §A.5, point ouvert
   Le dossier pose la question sans pouvoir la trancher : « soit le parseur
   tronque a la parenthese et le registre se met au format nu partout, soit il
   exige la forme complete ». La reponse observable est ici — regFor() accepte
   les DEUX : la chaine entiere d'abord, puis chaque moitie de
   « Passagers (Passengers) ». Cette fonction dit laquelle a repondu, ligne par
   ligne, pour que window.debugBriefing() ferme le point par OBSERVATION et non
   par deduction (§9, « forme des libellés retenue »).
   Aucun effet sur la resolution : elle ne fait que nommer ce qui s'est passe.
------------------------------------------------------------ */
function formeLibelle(raw){
  const n = normLabel(raw);
  if(REG_BY_LABEL.has(n)) return 'complète';
  const m = n.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if(m){
    if(REG_BY_LABEL.has(m[1])) return 'tronquée à la parenthèse';
    if(REG_BY_LABEL.has(m[2])) return 'parenthèse seule';
  }
  return '—';
}
/* section : titre de la section qui contient la ligne, deja normalise.
   Un libelle peut n'etre ignore QUE la ou il change de sens (§A.5). */
function estIgnore(raw, section){
  const n = normLabel(raw);
  const formes = [n];
  const m = n.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if(m){ formes.push(m[1], m[2]); }
  if(formes.some(f => IGNORE.indexOf(f) >= 0)) return true;
  if(section){
    return IGNORE_EN_SECTION.some(r =>
      r.section.test(section) && formes.some(f => r.labels.indexOf(f) >= 0));
  }
  return false;
}
