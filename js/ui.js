/* ============================================================
   OUTILS DE LA BARRE ET TOAST
   Onglets, nouveau vol, message ephemere.
   Depend de : data/fields.js, state.js, dom.js, render.js,
   values.js (valuesOuvert), fms.js (fmsOuvert).
============================================================ */
/* ------------------------------------------------------------
   ONGLETS · UN SEUL MECANISME, UN SEUL ONGLET ACTIF
   Valeurs du vol et A380-800 FMS etaient deux bascules independantes,
   chacune avec son propre etat : ouvrir l'une ne fermait pas l'autre. Les
   deux restaient surlignees, et le panneau Valeurs, place au-dessus,
   cachait celui qu'on venait de demander.
   Un clic sur un onglet ferme TOUS les autres et ouvre le sien, toujours :
   un clic sur l'onglet deja ouvert le laisse ouvert. La bascule qui le
   refermait faisait qu'un clic sur un onglet pouvait n'afficher rien.
   Charger le briefing et Nouveau vol sont des actions, pas des onglets :
   ils n'ont pas de panneau et ne touchent a rien ici.
------------------------------------------------------------ */
const ONGLETS = [
  { btn:el.btnValues, panneau:el.valuesSheet, ouvert:valuesOuvert },
  { btn:el.btnFms,    panneau:el.fmsSheet,    ouvert:fmsOuvert }
];

function montrerOnglet(o, on){
  o.panneau.hidden = !on;
  o.btn.classList.toggle('on', on);
  o.btn.setAttribute('aria-expanded', on ? 'true' : 'false');
}

function activerOnglet(o){
  const deja = !o.panneau.hidden;
  ONGLETS.forEach(x=> montrerOnglet(x, x === o));
  if(!deja) o.ouvert();
}

function fermerOnglet(btn){
  ONGLETS.forEach(x=>{ if(x.btn === btn) montrerOnglet(x, false); });
}

ONGLETS.forEach(o=> o.btn.addEventListener('click', ()=> activerOnglet(o)));

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
