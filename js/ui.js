/* ============================================================
   OUTILS DE LA BARRE ET TOAST
   Tout deplier / replier, nouveau vol, message ephemere.
   Depend de : data/fields.js, state.js, dom.js, render.js.
============================================================ */
/* ============================================================
   OUTILS
============================================================ */
function syncOpenBtn(){
  el.btnOpen.textContent = allOpen ? 'Tout replier' : 'Tout déplier';
  el.btnOpen.classList.toggle('on', allOpen);
  el.btnOpen.setAttribute('aria-pressed', allOpen ? 'true':'false');
}
el.btnOpen.addEventListener('click', ()=>{
  allOpen = !allOpen;
  syncOpenBtn();
  applyOpen();
});

el.btnReset.addEventListener('click', ()=>{
  if(!confirm('Nouveau vol : toutes les cases se décochent et les valeurs du vol s\'effacent. Le briefing chargé reste.')) return;
  state.done = {}; state.values = {}; state.auto = {}; state.open = 0;
  FIELDS.forEach(([k])=>{
    const i = document.getElementById('f-'+k);
    if(i){ i.value = ''; i.removeAttribute('title'); i.parentElement.classList.remove('auto'); }
  });
  render();
  save();
  window.scrollTo({top:0, behavior:'smooth'});
  toast('Checklist remise à zéro');
});

let toastTimer = null;
function toast(msg){
  el.toastEl.textContent = msg;
  el.toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.toastEl.classList.remove('show'), 2600);
}
