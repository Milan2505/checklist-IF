/* ============================================================
   ELEMENTS DE LA PAGE
   Definit el : tous les noeuds du document, resolus une seule fois.
   Ce fichier doit etre charge apres le HTML et avant tout le reste.
============================================================ */
/* ============================================================
   ELEMENTS
============================================================ */
const el = {
  phases:   document.getElementById('phases'),
  hdrCount: document.getElementById('hdrCount'),
  header:   document.querySelector('header'),
  footBar:  document.getElementById('footBar'),
  footPct:  document.getElementById('footPct'),
  footWrap: document.querySelector('.foot .bar'),
  footPhase:document.getElementById('footPhase'),
  revTag:   document.getElementById('revTag'),
  pfPath:   document.getElementById('pfPath'),
  pfDone:   document.getElementById('pfDone'),
  pfNodes:  document.getElementById('pfNodes'),
  drawer:   document.getElementById('drawer'),
  drTitle:  document.getElementById('drTitle'),
  drBody:   document.getElementById('drBody'),
  drClose:  document.getElementById('drClose'),
  toastEl:  document.getElementById('toast'),
  valGrid:  document.getElementById('valGrid'),
  valuesSheet: document.getElementById('valuesSheet'),
  alert:    document.getElementById('alert'),
  btnValues:document.getElementById('btnValues'),
  btnOpen:  document.getElementById('btnOpen'),
  btnLoad:  document.getElementById('btnLoad'),
  btnReset: document.getElementById('btnReset'),
  file:     document.getElementById('file')
};
