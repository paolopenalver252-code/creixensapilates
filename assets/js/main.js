(function () {
  'use strict';

  var WHATSAPP_NUMBER = '34611550183';
  var MAP_EMBED = 'https://www.google.com/maps?q=Creixensa+Pilates+%26+fitness+studio,+C.+de+Desiderio+Escosura+45,+50005+Zaragoza&output=embed';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------- Cabecera: borde al hacer scroll ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    }
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.target)) setMenu(false);
  });

  window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Filtro del horario ---------- */
  var filterButtons = document.querySelectorAll('[data-filter]');
  var filterStatus = document.querySelector('[data-filter-status]');
  var labels = { all: 'todas las clases', pilates: 'clases de Pilates', fitness: 'clases de fitness' };

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      document.querySelectorAll('[data-schedule] [data-type]').forEach(function (el) {
        el.classList.toggle('is-dimmed', value !== 'all' && el.getAttribute('data-type') !== value);
      });
      filterStatus.textContent = 'Mostrando ' + labels[value] + ' resaltadas en el horario.';
    });
  });

  /* ---------- Mapa bajo demanda ---------- */
  var loadMap = document.querySelector('[data-map-load]');
  if (loadMap) {
    loadMap.addEventListener('click', function () {
      var map = document.querySelector('[data-map]');
      var iframe = document.createElement('iframe');
      iframe.src = MAP_EMBED;
      iframe.title = 'Mapa de Google con la ubicación de Creixensa en C/ Desiderio Escosura, 45, Zaragoza';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      map.innerHTML = '';
      map.appendChild(iframe);
      iframe.focus();
    });
  }

  /* ---------- Formulario: prepara un mensaje de WhatsApp ---------- */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');

    function showError(field, show) {
      var error = document.getElementById(field.getAttribute('aria-describedby'));
      field.setAttribute('aria-invalid', show ? 'true' : 'false');
      if (error) error.hidden = !show;
    }

    ['nombre', 'interes'].forEach(function (name) {
      var field = form.elements[name];
      field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', function () {
        if (field.getAttribute('aria-invalid') === 'true') showError(field, !field.value.trim());
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      var nombre = form.elements.nombre;
      var interes = form.elements.interes;
      var invalid = [];

      [nombre, interes].forEach(function (field) {
        var bad = !field.value.trim();
        showError(field, bad);
        if (bad) invalid.push(field);
      });

      if (invalid.length) {
        invalid[0].focus();
        status.textContent = invalid.length === 1
          ? 'Falta un dato por completar.'
          : 'Faltan ' + invalid.length + ' datos por completar.';
        return;
      }

      var franja = form.elements.franja.value;
      var mensaje = form.elements.mensaje.value.trim();
      var lines = [
        'Hola, soy ' + nombre.value.trim() + '.',
        'Me interesa: ' + interes.value + '.'
      ];
      if (franja) lines.push('Me vendría mejor por las ' + franja + '.');
      if (mensaje) lines.push(mensaje);

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      // Sin 'noopener' en las opciones: con él, window.open devuelve null y no sabríamos si se bloqueó.
      var win = window.open(url, '_blank');
      if (win) win.opener = null;

      status.innerHTML = '';
      var p = document.createTextNode(win
        ? 'Hemos abierto WhatsApp con tu mensaje. Todavía no se ha enviado: revísalo y pulsa enviar en WhatsApp. '
        : 'Tu navegador ha bloqueado la ventana de WhatsApp. ');
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = win ? 'Volver a abrir WhatsApp' : 'Abrir WhatsApp con el mensaje';
      status.appendChild(p);
      status.appendChild(a);
    });
  }

  /* ---------- Transición hero → «El estudio» ---------- */
  // El hero queda fijo (sticky) cuando su parte inferior llega al final de la pantalla, así que
  // también se ve entero si es más alto que la ventana. --hero-cover va de 0 a 1 según
  // «El estudio» lo va tapando; el CSS lo usa para atenuar el hero.
  var hero = document.querySelector('.hero');
  var values = document.getElementById('estudio');
  var heroCover = 0;
  var onHeroCover = function () {};
  var stageTicking = false;

  function updateStage() {
    stageTicking = false;
    var headerH = header.offsetHeight;
    var viewH = window.innerHeight;
    hero.style.setProperty('--hero-stick', Math.min(headerH, viewH - hero.offsetHeight) + 'px');
    var top = values.getBoundingClientRect().top;
    heroCover = Math.min(1, Math.max(0, (viewH - top) / (viewH - headerH)));
    hero.style.setProperty('--hero-cover', heroCover.toFixed(3));
    onHeroCover();
  }
  function requestStage() {
    if (!stageTicking) {
      stageTicking = true;
      window.requestAnimationFrame(updateStage);
    }
  }
  window.addEventListener('scroll', requestStage, { passive: true });
  window.addEventListener('resize', requestStage);
  updateStage();

  /* ---------- Barra de contacto en móvil ---------- */
  // Aparece cuando el hero ya está casi tapado y se oculta al llegar a Contacto.
  var mobileCta = document.querySelector('[data-mobile-cta]');
  var contact = document.getElementById('contacto');
  if (mobileCta && 'IntersectionObserver' in window) {
    var contactVisible = false;
    var update = function () {
      var show = heroCover > 0.6 && !contactVisible;
      mobileCta.classList.toggle('is-visible', show);
      mobileCta.inert = !show;
    };
    onHeroCover = update;
    new IntersectionObserver(function (entries) {
      contactVisible = entries[0].isIntersecting;
      update();
    }).observe(contact);
    update();
  }

  /* ---------- Aparición suave de bloques ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.section-head, .values-intro, .values-list li, .feature, .service-block, .steps li, .review, .reviews-summary, .contact-form, .info-list'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
