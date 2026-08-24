/* ============================================================
   BANDEAU D'ANOMALIE ET REMPLISSAGE DES CASES
   Signale ce qui n'a pas ete lu, revalide la feuille restauree,
   remplit les champs sans jamais ecraser une saisie du pilote.
   Depend de : data/fields.js, state.js, dom.js, render.js, parser/extract.js.
============================================================ */
/* bandeau d'anomalie : une case vide et signalee vaut mieux qu'une valeur fausse */
function paintAlert(){
  const c = cartouche, parts = [];
  const pluriel = (n,s,p)=> n > 1 ? p : s;
  if(c){
    if(c.bad.length) parts.push(
      c.bad.length+' '+pluriel(c.bad.length,'ligne ignorée','lignes ignorées')+
      ' (format de tableau non reconnu) : '+c.bad.join(', '));
    if(c.unknown.length) parts.push(
      pluriel(c.unknown.length,'libellé non reconnu','libellés non reconnus')+' : '+c.unknown.join(', '));
    if(c.rejected.length) parts.push(
      pluriel(c.rejected.length,'valeur refusée','valeurs refusées')+' : '+c.rejected.join(' · '));
    if(c.missing.length) parts.push(
      pluriel(c.missing.length,'champ absent','champs absents')+' : '+c.missing.join(', '));
  }
  const horsCart = refus.map(r=> r.label+' (ligne '+r.line+') — '+r.reason);
  /* Une cellule simplement absente n'est pas un cartouche mal forme : le
     dossier admet le marqueur MANQUE, motive en prose. Ne crier au defaut de
     format que quand la forme est reellement en cause. */
  const malForme = !!(c && (c.bad.length || c.unknown.length || c.rejected.length));
  const titre = malForme ? 'Cartouche mal formé.'
              : (c && c.missing.length) ? 'Cartouche incomplet — '+c.resolues+'/'+c.total+' cellules.'
              : 'Valeur refusée à la lecture.';
  if(horsCart.length) parts.push(
    pluriel(horsCart.length,'hors cartouche','hors cartouche')+' : '+horsCart.join(' · '));
  if(!parts.length){ el.alert.hidden = true; el.alert.textContent = ''; return; }
  el.alert.innerHTML =
    '<strong>'+esc(titre)+'</strong> '+esc(parts.join(' · '))+
    '<span class="alert-note">Ces cases restent vides et non remplies : sur une feuille de vol, '+
    'une valeur fausse silencieuse est le pire cas.</span>';
  el.alert.hidden = false;
}

/* Au demarrage, la feuille restauree du stockage est RELUE, pas seulement
   revalidee : les valeurs sont re-derivees du document et reappliquees.
   Sans cela, une feuille chargee par une version anterieure du lecteur garde
   pour toujours les cases que cette version-la savait remplir — BLOC, BINGO,
   MIN DIV et LW sont restes vides plusieurs rechargements durant, sans qu'un
   rafraichissement puisse y changer quoi que ce soit. Le document est la
   source, le stockage n'en est qu'un cache.
   Les saisies manuelles restent protegees : fillFrom ne touche que l'auto. */
function validateSheet(){
  if(state.sheet){
    const got = extractValues(state.sheet);     /* renseigne cartouche, refus et trace */
    fillFrom(got);
    save();
  }else{
    cartouche = null; refus = []; trace = null;
  }
  paintAlert();
  paintBadge();
  paintUnresolved();
  paintPorts();
}

/* Cles attendues au cartouche et non resolues a la lecture. Une seule definition :
   le panneau Valeurs et le panneau d'identite doivent marquer EXACTEMENT les
   memes champs, sinon un defaut visible d'un cote devient invisible de l'autre. */
function unresolvedKeys(){
  return ((cartouche && cartouche.unresolved) ? cartouche.unresolved : [])
         .concat(refus.map(r=>r.key));
}

/* champ attendu mais non resolu : etat visuel distinct d'une case simplement vide */
function paintUnresolved(){
  const ko = unresolvedKeys();
  FIELDS.forEach(([k])=>{
    const inp = document.getElementById('f-'+k);
    if(!inp) return;
    const nr = ko.indexOf(k) >= 0 && !(state.values[k]||'').trim();
    inp.parentElement.classList.toggle('unresolved', nr);
    if(nr) inp.title = 'Attendu au cartouche, non résolu à la lecture — voir le bandeau';
    else if(!state.auto[k]) inp.removeAttribute('title');
  });
}

/* ------------------------------------------------------------
   5 · REMPLISSAGE
   L'ancienne regle "ne pas ecraser une case non vide" protegeait aussi
   les reprises d'un briefing precedent : un 1100 faux survivait a tous
   les rechargements, y compris a la feuille corrigee. Desormais :
     saisie du pilote (non vide ET pas marquee auto) -> intouchable
     reprise d'un briefing                            -> ecrasee
     reprise devenue absente ou refusee               -> EFFACEE
------------------------------------------------------------ */
function fillFrom(got){
  let n = 0;
  FIELDS.forEach(([k])=>{
    const inp   = document.getElementById('f-'+k);
    const neuf  = (got && got[k] != null) ? String(got[k]) : '';
    const saisi = (state.values[k]||'').trim() && !state.auto[k];
    if(saisi) return;                                   /* saisie du pilote : intouchable */

    if(neuf){
      state.values[k] = neuf;
      state.auto[k] = 1;
      if(inp){
        inp.value = neuf;
        inp.parentElement.classList.add('auto');
        inp.parentElement.classList.remove('unresolved');
        inp.title = 'Valeur reprise du briefing — à confirmer sur l\'OFP';
      }
      n++;
    }else if(state.auto[k]){                            /* reprise qui n'a plus de source */
      delete state.values[k];
      delete state.auto[k];
      if(inp){
        inp.value = '';
        inp.parentElement.classList.remove('auto');
        inp.removeAttribute('title');
      }
    }
  });
  refreshValues();
  paintUnresolved();
  return n;
}
