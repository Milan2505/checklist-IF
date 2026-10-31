/* ============================================================
   OUTILS D'AFFICHAGE DES VALEURS
   Echappement, marque NIL, normalisation du Type, rafraichissement
   des blocs qui suivent les valeurs. Depend de : state.js, dom.js.
   Appelle paintPorts() (ports.js).
   REV 33 · la checklist de vol est retiree : les phases, leurs cases et
   leur rendu ont quitte ce fichier. Il ne reste que ce que le panneau
   Valeurs et les blocs aeroport utilisent.
============================================================ */
function esc(s){
  return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* ------------------------------------------------------------
   NIL — UNE DONNEE QUI N'A JAMAIS EXISTE N'EST PAS UN RELEVE
   §A.5 regle 7 : ce qui ne peut pas etre estime s'ecrit `NIL`, valeur nue.
   Elle est REMPLIE — elle ne se confond donc jamais avec une case vide, qui
   dit qu'on n'a pas rempli — mais elle ne doit pas se lire comme un chiffre
   releve. Le mot reste ecrit tel quel : SEUL son habillage change, et la
   difference doit se voir sans lire. Casse indifferente.
   Une seule definition : le panneau Valeurs et le panneau d'identite
   marquent EXACTEMENT la meme chose.
------------------------------------------------------------ */
function estNil(v){ return /^nil$/i.test(String(v == null ? '' : v).trim()); }

function refreshValues(){
  paintPorts();                    /* les blocs aéroport suivent les mêmes valeurs */
}

/* Valeur resolue de `Type` au cartouche ①, normalisee : c'est la seule
   question que la page pose sur le type volé. */
function normType(v){
  return String(v == null ? '' : v).toUpperCase().replace(/[^A-Z0-9]/g,'');
}
