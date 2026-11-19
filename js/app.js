/* =====================================================================
   app.js  -  Lógica de la página
   No necesitas editar este archivo: todo lo personal está en config.js
   Orden del archivo:
   0. Ayudas generales
   1. Partículas al pulsar botones
   2. Destellos de fondo
   3. Corazón de desbloqueo
   4. Galería de recuerdos
   5. Video del poema
   6. Inicio
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 0. AYUDAS GENERALES ---------- */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const $ = (selector, root) => (root || document).querySelector(selector);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function svgIcon(id, className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value || '';
  }

  /* ---------- 1. PARTÍCULAS AL PULSAR BOTONES ---------- */
  const particleLayer = $('#particles');
  const SYMBOLS = ['✦', '✧', '♥'];
  const COLORS = ['#d4698b', '#dca75a', '#e89ab3'];

  function burst(x, y, count) {
    for (let i = 0; i < (count || 8); i++) {
      const p = el('span', 'particle', SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      const angle = Math.random() * Math.PI * 2;
      const distance = 36 + Math.random() * 70;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.style.fontSize = (11 + Math.random() * 11) + 'px';
      p.style.setProperty('--dx', (Math.cos(angle) * distance).toFixed(1) + 'px');
      p.style.setProperty('--dy', (Math.sin(angle) * distance - 24).toFixed(1) + 'px');
      p.style.setProperty('--rot', Math.floor(Math.random() * 120 - 60) + 'deg');
      particleLayer.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  // Partículas cada vez que se toca un botón (con mouse, dedo o teclado)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .polaroid');
    if (!target || target.id === 'heart-btn' || target.disabled || target.classList.contains('dot')) return;
    let x = e.clientX;
    let y = e.clientY;
    if (!e.detail) {                       // clic hecho con el teclado: salen desde el centro del botón
      const r = target.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    burst(x, y, 7);
  });

  /* ---------- 2. DESTELLOS DE FONDO ---------- */
  // Estrellitas que se prenden y se apagan. Cada vez que una se apaga,
  // reaparece en otro lugar, así el fondo nunca se ve repetido.
  function initSparkles() {
    const box = $('#sparkles');
    if (!box) return;
    const count = window.innerWidth < 600 ? 18 : 30;

    function place(s) {
      s.style.left = (2 + Math.random() * 94).toFixed(1) + '%';
      s.style.top = (2 + Math.random() * 94).toFixed(1) + '%';
    }

    for (let i = 0; i < count; i++) {
      const s = svgIcon('sparkle', 'sparkle' + (Math.random() < 0.5 ? ' rose' : ''));
      const size = (6 + Math.random() * 10).toFixed(1) + 'px';
      s.style.width = size;
      s.style.height = size;
      s.style.setProperty('--dur', (2.6 + Math.random() * 3.4).toFixed(2) + 's');
      s.style.setProperty('--delay', (-Math.random() * 5).toFixed(2) + 's');
      place(s);
      s.addEventListener('animationiteration', () => place(s));
      box.appendChild(s);
    }
  }

  /* ---------- 3. CORAZÓN DE DESBLOQUEO ---------- */
  function initLock() {
    const cfg = CONFIG.inicio || {};
    const lock = $('#lock-screen');
    const app = $('#app');
    const btn = $('#heart-btn');
    const fill = $('#heart-fill');
    const percent = $('#heart-percent');

    setText('lock-eyebrow', cfg.sobretitulo);
    setText('lock-title', cfg.titulo);
    setText('lock-hint', cfg.instruccion);

    const FILL_MS = cfg.tiempoLlenado || 2200;   // tiempo para llenarse
    const DRAIN_MS = FILL_MS * 0.6;              // si lo sueltas, se vacía un poco más rápido
    let progress = 0;
    let holding = false;
    let unlocked = false;
    let last = 0;
    let running = false;

    function paint() {
      fill.setAttribute('transform', 'translate(0 ' + (92 - 90 * progress).toFixed(2) + ')');
      percent.textContent = progress > 0.01 ? Math.round(progress * 100) + '%' : '';
    }

    function tick(now) {
      if (unlocked) { running = false; return; }
      const dt = Math.min(now - last, 100);
      last = now;
      progress += (holding ? dt / FILL_MS : -dt / DRAIN_MS);
      progress = Math.max(0, Math.min(1, progress));
      paint();
      if (progress >= 1) { unlock(); return; }
      if (holding || progress > 0) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    function startLoop() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(tick);
    }

    function startHold() {
      if (unlocked) return;
      holding = true;
      btn.classList.add('holding');
      startLoop();
    }

    function endHold() {
      holding = false;
      btn.classList.remove('holding');
    }

    function unlock() {
      if (unlocked) return;
      unlocked = true;
      holding = false;
      progress = 1;
      paint();
      percent.textContent = '';
      btn.classList.remove('holding');
      const r = btn.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 22);
      try { if (navigator.vibrate) navigator.vibrate(60); } catch (err) { /* no pasa nada */ }
      lock.classList.add('unlocking');
      setTimeout(() => {
        lock.hidden = true;
        app.hidden = false;
        app.classList.add('reveal');
        document.body.classList.remove('locked');
        try { window.scrollTo(0, 0); } catch (err) { /* no pasa nada */ }
      }, 1000);
    }

    // Mouse y dedo (los "pointer events" funcionan para ambos)
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      try { btn.setPointerCapture(e.pointerId); } catch (err) { /* no pasa nada */ }
      startHold();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => btn.addEventListener(name, endHold));
    btn.addEventListener('contextmenu', (e) => e.preventDefault());   // evita el menú al mantener presionado en el celular

    // Teclado (barra espaciadora o Enter)
    btn.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold(); }
    });
    btn.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') endHold();
    });
    btn.addEventListener('blur', endHold);

    paint();
  }

  /* ---------- 4. GALERÍA DE RECUERDOS ---------- */
  function initGallery() {
    const fotos = CONFIG.fotos || [];
    const track = $('#gallery-track');
    const dotsBox = $('#gallery-dots');
    const counter = $('#gallery-counter');
    const prev = $('#gal-prev');
    const next = $('#gal-next');

    if (!fotos.length) {
      track.textContent = 'Agrega tus fotos en js/config.js';
      prev.hidden = true;
      next.hidden = true;
      return;
    }

    const slides = [];
    const dots = [];
    let current = 0;

    function setActive(i) {
      current = i;
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      counter.textContent = (i + 1) + ' de ' + fotos.length;
      prev.disabled = i === 0;
      next.disabled = i === fotos.length - 1;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(fotos.length - 1, i));
      const left = i * track.clientWidth;
      if (track.scrollTo) track.scrollTo({ left: left, behavior: 'smooth' });
      else track.scrollLeft = left;
      setActive(i);
    }

    fotos.forEach((f, i) => {
      const slide = el('article', 'slide');
      const pol = el('div', 'polaroid');
      pol.setAttribute('role', 'button');
      pol.setAttribute('aria-pressed', 'false');
      pol.setAttribute('aria-label', 'Foto ' + (i + 1) + '. Toca para ver su fecha y su mensaje.');
      pol.tabIndex = 0;
      pol.style.setProperty('--tilt', (i % 2 ? 1.5 : -1.5) + 'deg');

      const inner = el('div', 'polaroid-inner');

      const front = el('div', 'face front');
      const photo = el('div', 'photo');
      const img = document.createElement('img');
      img.src = f.archivo;
      img.alt = f.titulo || ('Recuerdo ' + (i + 1));
      img.loading = 'lazy';
      img.draggable = false;
      img.addEventListener('error', () => {
        photo.classList.add('missing');
        photo.setAttribute('data-msg', 'No se encontró la imagen «' + f.archivo + '». Revisa el nombre en config.js');
      });
      photo.append(img, el('span', 'grain'), el('span', 'vignette'));
      front.append(photo, el('p', 'caption', f.titulo || ''), el('p', 'tap-hint', 'toca para girar'));

      const back = el('div', 'face back');
      back.append(el('span', 'back-mark', '✦'), el('p', 'date', f.fecha || ''), el('p', 'msg', f.mensaje || ''));

      inner.append(front, back);
      pol.append(inner);
      slide.append(pol);
      track.append(slide);
      slides.push(slide);

      const toggle = () => {
        const on = pol.classList.toggle('flipped');
        pol.setAttribute('aria-pressed', String(on));
      };
      pol.addEventListener('click', toggle);
      pol.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });

      const dot = el('button', 'dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsBox.append(dot);
      dots.push(dot);
    });

    // Detecta qué foto está en el centro al deslizar
    track.addEventListener('scroll', () => {
      const w = track.clientWidth || 1;
      const i = Math.max(0, Math.min(fotos.length - 1, Math.round(track.scrollLeft / w)));
      if (i !== current) setActive(i);
    }, { passive: true });

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    // Cada foto aparece al llegar al centro; al salir, se vuelve a girar de frente
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const s = en.target;
          if (en.intersectionRatio >= 0.55) {
            s.classList.add('visible');
          } else if (en.intersectionRatio < 0.15) {
            s.classList.remove('visible');
            const p = $('.polaroid', s);
            p.classList.remove('flipped');
            p.setAttribute('aria-pressed', 'false');
          }
        });
      }, { root: track, threshold: [0, 0.15, 0.55, 0.8] });
      slides.forEach((s) => io.observe(s));
    } else {
      slides.forEach((s) => s.classList.add('visible'));
    }

    setActive(0);
  }

  /* ---------- 5. VIDEO DEL POEMA ---------- */
  function initVideo() {
    const cfg = CONFIG.video || {};
    const section = $('#poema');
    const video = $('#poem-video');
    const msg = $('#video-msg');

    if (!cfg.archivo) {                  // sin video: se oculta toda la sección
      section.hidden = true;
      return;
    }

    setText('poem-title', cfg.titulo);
    setText('poem-sub', cfg.subtitulo);
    if (cfg.portada) video.poster = cfg.portada;
    video.addEventListener('error', () => {
      msg.textContent = 'No se pudo cargar el video «' + cfg.archivo + '». Revisa que el archivo exista en la carpeta video y que el nombre sea igual en config.js. Si lo grabaste con un iPhone, conviértelo a MP4.';
    });
    video.addEventListener('playing', () => { msg.textContent = ''; });
    video.src = cfg.archivo;

    // Texto del poema (opcional)
    const box = $('#poem-text');
    (cfg.poema || []).forEach((estrofa) => box.append(el('p', null, estrofa)));
  }

  /* ---------- 6. INICIO ---------- */
  function init() {
    setText('hero-title', (CONFIG.portada || {}).titulo);
    setText('hero-text', (CONFIG.portada || {}).texto);
    setText('footer-text', CONFIG.pie);
    initSparkles();
    initLock();
    initGallery();
    initVideo();
  }

  init();
})();
