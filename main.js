/* =====================================================================
   ICS-Sniper — behavior
   Decoupled from index.html. Three independent IIFEs:
   theme toggle (with guarded localStorage), mobile menu, video modal.
   ===================================================================== */

// Theme toggle with guarded persistence
(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  var stored=null;
  try{ stored=localStorage.getItem('ics-sniper-theme'); }catch(e){}
  if(stored==='light'||stored==='dark'){ root.setAttribute('data-theme',stored); }
  btn.addEventListener('click',function(){
    var cur=root.getAttribute('data-theme')||'dark';
    var next=cur==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{ localStorage.setItem('ics-sniper-theme',next); }catch(e){}
  });
})();

// Mobile menu
(function(){
  var m=document.getElementById('menu'), links=document.getElementById('navlinks');
  m.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    m.setAttribute('aria-expanded',open?'true':'false');
  });
  links.addEventListener('click',function(e){
    if(e.target.tagName==='A'){ links.classList.remove('open'); m.setAttribute('aria-expanded','false'); }
  });
})();

// Short-video modal (YouTube embed)
(function(){
  var modal=document.getElementById('videoModal');
  var btn=document.getElementById('videoBtn');
  var frame=document.getElementById('videoFrame');
  if(!modal||!btn) return;
  var embed=frame?frame.getAttribute('data-embed'):'';
  function open(){
    modal.hidden=false;
    document.body.style.overflow='hidden';
    if(frame&&embed){ frame.src=embed; }   // load + autoplay the embed
  }
  function close(){
    modal.hidden=true;
    document.body.style.overflow='';
    if(frame){ frame.src=''; }              // unload to stop playback
  }
  btn.addEventListener('click',open);
  Array.prototype.forEach.call(modal.querySelectorAll('[data-vclose]'),function(el){ el.addEventListener('click',close); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !modal.hidden) close(); });
})();
