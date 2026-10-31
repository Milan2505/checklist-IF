/* ============================================================
   OUTILS DE LA BARRE ET TOAST
   Nouveau vol, message ephemere.
   Depend de : data/fields.js, state.js, dom.js, render.js.
============================================================ */
/* ============================================================
   OUTILS
============================================================ */
el.btnReset.addEventListener('click', ()=>{
  if(!confirm('Nouveau vol : les valeurs du vol s\'effacent. Le briefing chargé reste.')) return;
  state.values = {}; state.auto = {};
  FIELDS.forEach(([k])=>{
    const i = document.getElementById('f-'+k);
    if(i){ i.value = ''; i.removeAttribute('title'); i.parentElement.classList.remove('auto','nil'); }
  });
  refreshValues();
  save();
  window.scrollTo({top:0, behavior:'smooth'});
  toast('Valeurs du vol effacées');
});

let toastTimer = null;
function toast(msg){
  el.toastEl.textContent = msg;
  el.toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.toastEl.classList.remove('show'), 2600);
}
