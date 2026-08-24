/* ============================================================
   BLOCS AEROPORT ET PANNEAU D'IDENTITE
   Les deux blocs — depart et arrivee — ouvrent chacun leur panneau
   superpose : Type, Compagnie, et la porte du terrain concerne.
   Deux panneaux distincts, jamais des onglets ; un seul ouvert a la fois.

   Le panneau n'a AUCUNE source de verite propre : il lit state.values,
   deja resolu par le parseur, et unresolvedKeys() pour la marque d'anomalie.
   Il ne relit aucun fichier et ne declenche aucune requete.
   Depend de : data/fields.js (via state), state.js, dom.js, alert.js.
============================================================ */
/* Trois valeurs par panneau. La porte change de cle selon le terrain ; Type et
   Compagnie sont les MEMES cles des deux cotes — un libelle, une ligne, une
   fois (§A.5 regle 3) : rien n'est duplique, c'est le meme champ affiche deux fois. */
const PORT_ROWS = {
  dep: [['type','Type'], ['airline','Compagnie (OACI)'], ['portedep','Porte départ']],
  arr: [['type','Type'], ['airline','Compagnie (OACI)'], ['portearr','Porte arrivée']]
};
const PORT_TITRE = { dep:'Identité · départ', arr:'Identité · arrivée' };

let portOuvert = null, portFocus = null;

/* « LFML → EDDM » est deja resolu et deja affiche : on le decoupe, on ne le
   reparse pas depuis le document. Separateur tolerant — la fleche du dossier,
   ou un simple > si la feuille l'ecrit autrement. */
function portTerrains(){
  const parts = (state.values.route || '').split(/→|->|>/);
  return { dep:(parts[0]||'').trim(), arr:(parts[1]||'').trim() };
}

/* ___ et la classe empty : exactement ce que fait une pastille de valeur vide
   dans la checklist (voir valSpan). Une case vide se voit, elle ne se cache pas. */
function portText(node, v){
  node.textContent = v || '___';
  node.classList.toggle('empty', !v);
}

function paintPorts(){
  const t = portTerrains();
  portText(el.depIcao, t.dep);
  portText(el.arrIcao, t.arr);
  portText(el.depRwy, (state.values.piste || '').trim());
  portText(el.arrRwy, (state.values.arrpiste || '').trim());
  if(portOuvert) fillPort(portOuvert);      /* le panneau ouvert suit la saisie */
}

function fillPort(which){
  const ko = unresolvedKeys();
  el.portTitle.textContent = PORT_TITRE[which];
  el.portList.textContent = '';
  PORT_ROWS[which].forEach(([k, libelle])=>{
    const v = (state.values[k] || '').trim();
    const dt = document.createElement('dt');
    dt.textContent = libelle;
    const dd = document.createElement('dd');
    /* NIL s'affiche tel quel : c'est une valeur, pas un trou. Elle dit que la
       donnee n'a pas ete observee, et c'est une information (§A.5 regle 7). */
    dd.textContent = v || '___';
    dd.classList.toggle('empty', !v);
    /* Attendu au cartouche mais non resolu : meme marque que le panneau Valeurs.
       Un champ non resolu ne se masque JAMAIS — un panneau qui omet une valeur
       absente transforme un defaut visible en defaut invisible. */
    dd.classList.toggle('unresolved', ko.indexOf(k) >= 0 && !v);
    el.portList.appendChild(dt);
    el.portList.appendChild(dd);
  });
}

function portBtn(which){ return which === 'dep' ? el.portDep : el.portArr; }

function openPort(which){
  if(portOuvert === which){ closePort(); return; }   /* re-clic : on referme */
  if(portOuvert) closePort(true);                    /* le second ferme le premier */
  portOuvert = which;
  fillPort(which);
  portBtn(which).setAttribute('aria-expanded', 'true');
  el.ports.classList.add('open');
  el.portPop.hidden = false;
  el.portBack.hidden = false;
  portFocus = document.activeElement;
  el.portClose.focus({preventScroll:true});
}

function closePort(garderFocus){
  if(!portOuvert) return;
  portBtn(portOuvert).setAttribute('aria-expanded', 'false');
  portOuvert = null;
  el.ports.classList.remove('open');
  el.portPop.hidden = true;
  el.portBack.hidden = true;
  if(!garderFocus && portFocus && portFocus.focus) portFocus.focus({preventScroll:true});
  portFocus = null;
}

/* Trois fermetures : clic hors du panneau, bouton explicite, Échap. */
el.portDep.addEventListener('click', ()=> openPort('dep'));
el.portArr.addEventListener('click', ()=> openPort('arr'));
el.portClose.addEventListener('click', ()=> closePort());
el.portBack.addEventListener('click', ()=> closePort());
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closePort(); });

/* le clavier ne sort pas du panneau tant qu'il est ouvert */
el.portPop.addEventListener('keydown', e=>{
  if(e.key !== 'Tab') return;
  e.preventDefault();
  el.portClose.focus();
});
