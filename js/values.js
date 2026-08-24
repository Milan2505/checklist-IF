/* ============================================================
   PANNEAU « VALEURS DU VOL »
   Construit la grille de saisie et son bouton d'ouverture.
   Depend de : data/fields.js, state.js, dom.js, render.js (esc, refreshValues).
============================================================ */
/* ============================================================
   VALEURS DU VOL
============================================================ */
/* champs strictement chiffres : clavier numerique sur tablette */
const NUM = ['v1','vr','v2','flex','thrred','accel','bloc','trip','bingo','mindiv',
             'da','lw','vref','vapp','inbound','degcap','degdist','capdep','tow','oew',
             'fltnum','pilotid','airac','pax','fret','payload','zfw','trans','extra',
             'altinit'];

/* champs a valeur longue : deux colonnes */
const WIDE = ['eobt','rte','route'];

function buildValues(){
  const frag = document.createDocumentFragment();
  let groupe = null;
  FIELDS.forEach(([k,label,g])=>{
    if(g && g !== groupe){
      groupe = g;
      const h = document.createElement('div');
      h.className = 'grp';
      h.textContent = g;
      frag.appendChild(h);
    }
    const d = document.createElement('div');
    d.className = 'fld' + (WIDE.indexOf(k) >= 0 ? ' wide' : '');
    d.innerHTML =
      '<label for="f-'+k+'">'+esc(label)+'</label>'+
      '<input id="f-'+k+'" autocomplete="off" spellcheck="false" enterkeyhint="done"'+
      (NUM.indexOf(k) >= 0 ? ' inputmode="decimal"' : '')+'>';
    const inp = d.querySelector('input');
    inp.value = state.values[k] || '';
    if(state.auto[k]){                     /* reprise du briefing, non confirmee */
      d.classList.add('auto');
      inp.title = 'Valeur reprise du briefing — à confirmer sur l\'OFP';
    }
    /* saisie : on rafraichit les pastilles, on ne reconstruit pas la checklist */
    inp.addEventListener('input', ()=>{
      state.values[k] = inp.value;
      d.classList.remove('auto');          /* corrigee a la main : plus une reprise */
      delete state.auto[k];
      inp.removeAttribute('title');
      refreshValues();
      save();
    });
    frag.appendChild(d);
  });
  el.valGrid.appendChild(frag);
}

el.btnValues.addEventListener('click', ()=>{
  const shown = el.valuesSheet.hidden;
  el.valuesSheet.hidden = !shown;
  el.btnValues.classList.toggle('on', shown);
  el.btnValues.setAttribute('aria-expanded', shown ? 'true':'false');
  if(shown){
    const first = el.valGrid.querySelector('input');
    if(first) first.focus({preventScroll:true});
  }
});
