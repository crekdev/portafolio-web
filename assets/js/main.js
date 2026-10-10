(function(){
  /* hora de Viña del Mar */
  var h=document.getElementById('hora');
  function tick(){
    try{h.textContent=new Intl.DateTimeFormat('es-CL',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Santiago'}).format(new Date());}catch(e){}
  }
  if(h){tick();setInterval(tick,30000);}

  /* menú fijo: sombra al bajar, hamburguesa en móvil y sección activa */
  var cab=document.getElementById('cabecera');
  var nav=cab&&cab.querySelector('.nav');
  var burger=document.getElementById('burger');
  var menu=document.getElementById('menu');
  if(cab){
    var sombra=function(){cab.classList.toggle('con-sombra',(window.pageYOffset||document.documentElement.scrollTop)>8);};
    sombra();window.addEventListener('scroll',sombra,{passive:true});
  }
  if(nav&&burger&&menu){
    burger.hidden=false;
    var movil=window.matchMedia('(max-width: 860px)');
    var fijar=function(abrir){
      nav.classList.toggle('abierto',abrir);
      burger.setAttribute('aria-expanded',abrir?'true':'false');
      burger.setAttribute('aria-label',abrir?'Cerrar menú':'Abrir menú');
    };
    burger.addEventListener('click',function(){fijar(burger.getAttribute('aria-expanded')!=='true');});
    menu.addEventListener('click',function(e){if(e.target.closest('a')){fijar(false);}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){fijar(false);burger.focus();}});
    document.addEventListener('click',function(e){if(!nav.contains(e.target)){fijar(false);}});
    var cambio=function(){if(!movil.matches){fijar(false);}};
    if(movil.addEventListener){movil.addEventListener('change',cambio);}else if(movil.addListener){movil.addListener(cambio);}
  }
  if(menu&&'IntersectionObserver' in window){
    var enlaces={};
    [].forEach.call(menu.querySelectorAll('a[href^="#"]'),function(a){enlaces[a.getAttribute('href').slice(1)]=a;});
    var activo=null;
    var obs=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting&&enlaces[en.target.id]){
          if(activo){activo.removeAttribute('aria-current');}
          activo=enlaces[en.target.id];activo.setAttribute('aria-current','true');
        }
      });
    },{rootMargin:'-30% 0px -60% 0px'});
    Object.keys(enlaces).forEach(function(id){var sec=document.getElementById(id);if(sec){obs.observe(sec);}});
    var inicio=document.getElementById('inicio');
    if(inicio){new IntersectionObserver(function(es){if(es[0].isIntersecting&&activo){activo.removeAttribute('aria-current');activo=null;}},{rootMargin:'-30% 0px -60% 0px'}).observe(inicio);}
  }

  /* formulario de contacto (Netlify Forms) */
  var form=document.getElementById('form-contacto');
  var estado=document.getElementById('estado-envio');
  if(form&&window.fetch&&window.URLSearchParams){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var boton=form.querySelector('button[type="submit"]');
      var datos=new URLSearchParams(new FormData(form)).toString();
      if(boton){boton.disabled=true;}
      estado.className='estado-envio';estado.textContent='Enviando...';
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:datos})
        .then(function(r){
          if(!r.ok){throw new Error('status '+r.status);}
          form.reset();
          estado.className='estado-envio ok';
          estado.textContent='Gracias, recibí tu mensaje. Te respondo por correo lo antes posible.';
        })
        .catch(function(){
          estado.className='estado-envio error';
          estado.textContent='No pude enviar el mensaje. Intenta de nuevo o escríbeme por WhatsApp.';
        })
        .then(function(){if(boton){boton.disabled=false;}});
    });
  }

  /* embudo: muchos leads entran, pocos pasan el filtro */
  var svg=document.getElementById('embudo');
  var btn=document.getElementById('repetir');
  if(!svg||!svg.animate||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){return;}
  var capa=svg.querySelector('#puntos');
  var NS='http://www.w3.org/2000/svg';
  var GRIS='#9AA8A1',SENAL='#F6C915';
  function semilla(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  var anims=[];
  function lanzar(){
    anims.forEach(function(a){a.cancel();});anims=[];
    while(capa.firstChild){capa.removeChild(capa.firstChild);}
    svg.classList.add('anim');
    var r=semilla(11),N=54,k=0;
    for(var i=0;i<N;i++){
      var c=document.createElementNS(NS,'circle');
      c.setAttribute('r','7');c.setAttribute('stroke','#0E2A33');c.setAttribute('stroke-width','1.5');c.setAttribute('fill',GRIS);
      c.style.opacity='0';
      capa.appendChild(c);
      var x0=70+r()*280,kf,dur,ok=(i%4===2);
      if(ok){
        var fila=Math.floor(k/7),col=k%7;
        var px=150+col*18+(fila%2?9:0),py=508-fila*16;k++;
        var cx=210+(r()-.5)*20;
        kf=[
          {transform:'translate('+x0+'px,-30px)',opacity:0,fill:GRIS,offset:0},
          {transform:'translate('+x0+'px,20px)',opacity:1,fill:GRIS,offset:.1},
          {transform:'translate('+cx+'px,250px)',opacity:1,fill:SENAL,offset:.45},
          {transform:'translate('+(210+(r()-.5)*6)+'px,385px)',opacity:1,fill:SENAL,offset:.62},
          {transform:'translate('+px+'px,'+py+'px)',opacity:1,fill:SENAL,offset:1}
        ];
        dur=3200;
      }else{
        var yr=110+r()*110,wl=50+(yr-72)*.517,wr=370-(yr-72)*.517;
        var xl=Math.min(Math.max(x0,wl+12),wr-12);
        var xo=xl<210?wl-60:wr+60;
        kf=[
          {transform:'translate('+x0+'px,-30px)',opacity:0,offset:0},
          {transform:'translate('+x0+'px,20px)',opacity:1,offset:.12},
          {transform:'translate('+xl+'px,'+yr+'px)',opacity:1,offset:.55},
          {transform:'translate('+xo+'px,'+(yr+70)+'px)',opacity:0,offset:1}
        ];
        dur=2600;
      }
      anims.push(c.animate(kf,{duration:dur,delay:i*95,fill:'forwards',easing:'ease-in'}));
    }
  }
  var timer=null,pausado=false,enVista=true,pestana=true,fase='corriendo',cola=false;
  function ciclo(){
    clearTimeout(timer);
    capa.style.transition='none';capa.style.opacity='1';
    lanzar();fase='corriendo';
    var ult=anims[anims.length-1];
    ult.finished.then(function(){fase='espera';programar();},function(){});
  }
  function programar(){
    clearTimeout(timer);
    if(pausado||!enVista||!pestana){cola=true;return;}
    cola=false;
    timer=setTimeout(function(){
      capa.style.transition='opacity .7s ease';capa.style.opacity='0';
      timer=setTimeout(ciclo,800);
    },2600);
  }
  function actualizarVista(){if(enVista&&pestana&&cola&&!pausado){programar();}}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){enVista=es[0].isIntersecting;actualizarVista();},{threshold:.15}).observe(svg);
  }
  document.addEventListener('visibilitychange',function(){pestana=!document.hidden;actualizarVista();});
  ciclo();
  if(btn){
    btn.hidden=false;
    btn.addEventListener('click',function(){
      if(!pausado){
        pausado=true;clearTimeout(timer);
        capa.style.transition='none';capa.style.opacity='1';
        anims.forEach(function(a){a.pause();});
        btn.textContent='reanudar animación';
      }else{
        pausado=false;btn.textContent='pausar animación';
        if(fase==='espera'){ciclo();}else{anims.forEach(function(a){a.play();});}
      }
    });
  }
})();
