/* Abhi Shayrana Hai Dil — motion + catalogue rendering
   All song data comes from songs-data.js (window.SONGS). */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var HUE = {
    'Romantic': 'var(--romantic)', 'Heartbreak & Longing': 'var(--heartbreak)',
    'Ghazal & Nazm': 'var(--ghazal)', 'Dance': 'var(--dance)',
    'Family & Devotional': 'var(--devotional)', 'Patriotic': 'var(--patriotic)',
    'Life & Friendship': 'var(--friendship)'
  };
  var CAT_DEV = {
    'Romantic': 'मोहब्बत', 'Heartbreak & Longing': 'जुदाई', 'Ghazal & Nazm': 'ग़ज़ल',
    'Dance': 'नाच', 'Family & Devotional': 'अपने', 'Patriotic': 'वतन', 'Life & Friendship': 'ज़िंदगी'
  };
  window.SITE_HUE = HUE;
  window.SITE_CATDEV = CAT_DEV;

  /* ---------- artwork: full-size art, then standard, then a drawn cover ---------- */
  function coverSVG(s) {
    var hues = {
      'Romantic': ['#3A2029', '#E0879A'], 'Heartbreak & Longing': ['#1C2333', '#7E9BD0'],
      'Ghazal & Nazm': ['#2A2038', '#B48BD8'], 'Dance': ['#33270F', '#EFB44E'],
      'Family & Devotional': ['#2E2415', '#E8B87A'], 'Patriotic': ['#1B2E1D', '#8DC98F'],
      'Life & Friendship': ['#122E2C', '#7ECFC4']
    };
    var h = hues[s.cat] || ['#241F2E', '#C9963F'];
    var t = s.hi || s.title, w = String(t).split(' '), lines;
    if (w.length > 2) { var m = Math.ceil(w.length / 2); lines = [w.slice(0, m).join(' '), w.slice(m).join(' ')]; }
    else { lines = w.length ? w : [t]; }
    var longest = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    var fs = longest < 11 ? 60 : (longest < 16 ? 46 : 36);
    var y = 250 - (lines.length - 1) * (fs + 12) / 2;
    var spans = lines.map(function (l, i) {
      return "<tspan x='250' dy='" + (i === 0 ? 0 : fs + 12) + "'>" + esc(l) + "</tspan>";
    }).join('');
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='" + h[0] + "'/><stop offset='1' stop-color='#15121C'/>" +
      "</linearGradient></defs>" +
      "<rect width='500' height='500' fill='url(#g)'/>" +
      "<circle cx='410' cy='96' r='128' fill='" + h[1] + "' opacity='.09'/>" +
      "<circle cx='84' cy='420' r='92' fill='" + h[1] + "' opacity='.06'/>" +
      "<text x='250' y='" + y + "' text-anchor='middle' fill='" + h[1] + "' opacity='.93' " +
      "font-family='Tiro Devanagari Hindi,Georgia,serif' font-size='" + fs + "'>" + spans + "</text>" +
      "<text x='250' y='452' text-anchor='middle' fill='" + h[1] + "' opacity='.55' " +
      "font-family='Instrument Sans,Arial,sans-serif' font-size='15' letter-spacing='4'>" +
      esc(String(s.cat).toUpperCase()) + "</text></svg>";
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  window.coverSVG = coverSVG;

  function artTag(s, cls) {
    var fallback = coverSVG(s);
    if (s.cover) {
      return '<img src="' + esc(s.cover) + '" alt="' + esc(s.title) + ' — cover art" width="640" height="640" loading="lazy"' +
        (cls ? ' class="' + cls + '"' : '') +
        ' onerror="this.onerror=null;this.src=\'' + fallback + '\'">';
    }
    if (s.yt) {
      var hq = 'https://i.ytimg.com/vi/' + s.yt + '/hqdefault.jpg';
      return '<img src="https://i.ytimg.com/vi/' + s.yt + '/maxresdefault.jpg" alt="' +
        esc(s.title) + ' — cover art" width="640" height="640" loading="lazy"' + (cls ? ' class="' + cls + '"' : '') +
        ' onerror="this.onerror=function(){this.onerror=null;this.src=\'' + fallback + '\'};this.src=\'' + hq + '\'">';
    }
    return '<img src="' + fallback + '" alt="' + esc(s.title) + ' — cover" loading="lazy"' +
      (cls ? ' class="' + cls + '"' : '') + '>';
  }
  window.artTag = artTag;

  /* ---------- reveal on scroll ---------- */
  function reveals() {
    var els = $$('.rv:not(.is-on), .ly:not(.is-on)');
    if (!els.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-on'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var d = el.dataset.d ? parseInt(el.dataset.d, 10) : 0;
        setTimeout(function () { el.classList.add('is-on'); }, d);
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }
  window.reveals = reveals;

  /* ---------- scroll progress ---------- */
  function progress() {
    var bar = $('#progress');
    if (!bar) return;
    var tick = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ---------- nav ---------- */
  function nav() {
    var b = $('.burger'), l = $('.navlinks');
    if (!b || !l) return;
    b.addEventListener('click', function () {
      var open = l.classList.toggle('is-open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.textContent = open ? 'Close' : 'Menu';
    });
    $$('a', l).forEach(function (a) {
      a.addEventListener('click', function () {
        l.classList.remove('is-open'); b.textContent = 'Menu';
      });
    });
  }

  /* ---------- counters ---------- */
  function counters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.textContent = e.dataset.count + (e.dataset.suffix || ''); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, to = parseInt(el.dataset.count, 10), sfx = el.dataset.suffix || '';
        var t0 = null, dur = 1150;
        var step = function (t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + sfx;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- the living sher ---------- */
  function sher() {
    var box = $('#sher');
    if (!box || !window.SHERS || !window.SHERS.length) return;
    var lines = $('#sherLines'), trans = $('#sherTrans'), from = $('#sherFrom'), dots = $('#sherDots');
    var i = 0, timer = null;

    var MANY = window.SHERS.length > 12;
    if (MANY) {
      dots.classList.add('sherdots--count');
      dots.innerHTML = '<span id="sherNum"></span>';
    }
    (MANY ? [] : window.SHERS).forEach(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-current', n === 0 ? 'true' : 'false');
      b.setAttribute('aria-label', 'Show couplet ' + (n + 1) + ' of ' + window.SHERS.length);
      b.addEventListener('click', function () { show(n, true); });
      dots.appendChild(b);
    });

    function paint(n) {
      var s = window.SHERS[n];
      lines.innerHTML = s.lines.map(function (l) {
        return '<div class="sher__line">' + esc(l) + '</div>';
      }).join('');
      trans.textContent = s.en;
      from.innerHTML = 'from <a href="' + esc(s.slug) + '.html">' + esc(s.song) + '</a>';
      if (MANY) {
        var num = document.getElementById('sherNum');
        if (num) num.textContent = (n + 1) + ' / ' + window.SHERS.length;
      } else {
        $$('button', dots).forEach(function (b, k) {
          b.setAttribute('aria-current', k === n ? 'true' : 'false');
        });
      }
      requestAnimationFrame(function () { box.classList.add('is-on'); });
    }

    function show(n, manual) {
      if (manual && timer) {
        clearInterval(timer); timer = null;
        var pb = document.getElementById('sherPause');
        if (pb) { pb.setAttribute('aria-pressed','true'); pb.textContent = 'Play'; }
      }
      i = n;
      if (REDUCED) { paint(i); return; }
      box.classList.remove('is-on');
      setTimeout(function () { paint(i); }, 460);
    }

    function start() {
      if (timer || REDUCED || window.SHERS.length < 2) return;
      timer = setInterval(function () { show((i + 1) % window.SHERS.length); }, 9500);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    paint(0);
    var pause = document.getElementById('sherPause');
    if (pause) {
      if (REDUCED || window.SHERS.length < 2) { pause.hidden = true; }
      pause.addEventListener('click', function () {
        var paused = pause.getAttribute('aria-pressed') === 'true';
        if (paused) { start(); pause.setAttribute('aria-pressed','false'); pause.textContent = 'Pause'; }
        else        { stop();  pause.setAttribute('aria-pressed','true');  pause.textContent = 'Play'; }
      });
    }
    // stop while someone is reading with the keyboard, or hovering
    box.addEventListener('mouseenter', stop);
    box.addEventListener('focusin', stop);
    start();
  }

  /* ---------- hero name, word by word ---------- */
  function heroWords() {
    var h = $('#heroName');
    if (!h) return;
    var words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map(function (w, n) {
      return '<span style="animation-delay:' + (0.14 + n * 0.09) + 's">' + esc(w) + '</span>';
    }).join(' ');
  }

  /* ---------- marquee ---------- */
  function marquee() {
    var t = $('#marqueeTrack');
    if (!t || !window.SONGS) return;
    var items = window.SONGS.map(function (s) {
      return '<a href="' + esc(s.slug) + '.html" lang="' + (s.hi ? 'hi' : 'en') + '">' + esc(s.hi || s.title) + '</a>';
    }).join('');
    t.innerHTML = items + items;   /* doubled so the loop is seamless */
  }

  window.SITE = { $: $, $$: $$, esc: esc, REDUCED: REDUCED };

  document.addEventListener('DOMContentLoaded', function () {
    heroWords();
    nav();
    progress();
    marquee();
    sher();
    counters();
    if (window.renderPage) window.renderPage();
    reveals();
  });
})();
