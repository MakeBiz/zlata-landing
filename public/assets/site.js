/* ===========================================================
   Общая логика сайта. Править обычно не нужно —
   всё содержимое лежит в assets/data.js
   =========================================================== */
(function () {
  'use strict';

  var C = window.CONFIG || (typeof CONFIG !== 'undefined' ? CONFIG : null);
  if (!C) { console.warn('CONFIG не найден — проверьте, что assets/data.js подключён до site.js'); return; }

  var MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  var MONTHS_SHORT = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
  var WEEKDAYS = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];

  var ICONS = {
    telegram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2L6.1 13.1l-4.9-1.5c-1-.3-1-1 .2-1.5l19.2-7.4c.9-.3 1.6.2 1.3 1.6z"/></svg>',
    chat:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 20l1.1-4.4A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z"/></svg>',
    vk:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 16.9c-5.2 0-8.4-3.6-8.5-9.5h2.7c.1 4.4 2.1 6.3 3.6 6.6V7.4h2.5v3.8c1.5-.2 3-1.9 3.5-3.8h2.5c-.4 2.3-2 4-3.2 4.7 1.2.6 3 2.1 3.7 4.8h-2.8c-.5-1.7-1.9-3-3.7-3.2v3.2h-.3z"/></svg>',
    dzen:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.6c.4 5.4 1.3 8 3.2 9.5 1.5 1.2 4 1.9 7.2 1.6-5.4.4-8 1.3-9.5 3.2-1.2 1.5-1.9 4-1.6 7.2-.4-5.4-1.3-8-3.2-9.5-1.5-1.2-4-1.9-7.2-1.6 5.4-.4 8-1.3 9.5-3.2C11.6 7.3 12.3 4.8 12 1.6z"/></svg>',
    x:        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.7 3h3.3l-7.2 8.3L22 21h-6.6l-5.2-6.8L4.2 21H.9l7.7-8.8L.5 3h6.8l4.7 6.2L17.7 3zm-1.2 16h1.8L7.6 4.8H5.7L16.5 19z"/></svg>',
    fb:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    li:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 21H3.4V9h3.5v12zM5.1 7.4A2 2 0 1 1 5.1 3.3a2 2 0 0 1 0 4.1zM21 21h-3.5v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.7V9H13v1.6h.1a3.6 3.6 0 0 1 3.3-1.8c3.5 0 4.2 2.3 4.2 5.3V21z"/></svg>',
    mail:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    wa:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-1.2 1.3-1.1 3 .5 5.2a12 12 0 0 0 4.8 4.2c1.8.7 2.6.8 3.5.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.4-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/></svg>'
  };

  /* ---------- Мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* ---------- Тень у шапки при прокрутке ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Липкая панель записи на телефоне ---------- */
  var mcta = document.querySelector('.mobile-cta');
  if (mcta) {
    var toggleCta = function () { mcta.classList.toggle('show', window.scrollY > 420); };
    toggleCta();
    window.addEventListener('scroll', toggleCta, { passive: true });
  }

  /* ---------- Появление блоков ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: .08, rootMargin: '0px 0px -40px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- Ссылки-контакты ---------- */
  function tgLink(text) {
    var u = C.contacts.telegramUser;
    if (!u) return '#';
    return 'https://t.me/' + u + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  function waLink(text) {
    var w = C.contacts.whatsapp;
    if (!w) return '';
    return 'https://wa.me/' + w + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  document.querySelectorAll('[data-tg]').forEach(function (el) {
    el.setAttribute('href', tgLink(el.getAttribute('data-tg') || 'Здравствуйте, Злата. Хочу записаться на встречу.'));
    el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener');
  });
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var link = waLink(el.getAttribute('data-wa') || 'Здравствуйте, Злата. Хочу записаться на встречу.');
    if (link) { el.setAttribute('href', link); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
    else { el.style.display = 'none'; }
  });

  /* ---------- Блок контактов ---------- */
  document.querySelectorAll('#contact-lines, [data-contacts]').forEach(function (contactBox) {
    var lines = '';
    if (C.contacts.telegramUser) {
      lines += '<div class="contact-line"><div class="ic">' + ICONS.telegram + '</div><div>' +
        '<div class="lb">Telegram — быстрее всего</div>' +
        '<div class="vl"><a href="' + tgLink('Здравствуйте, Злата. Хочу записаться на встречу.') + '" target="_blank" rel="noopener">@' + C.contacts.telegramUser + '</a></div>' +
        '</div></div>';
    }
    if (C.contacts.whatsapp) {
      lines += '<div class="contact-line"><div class="ic">' + ICONS.wa + '</div><div>' +
        '<div class="lb">WhatsApp</div>' +
        '<div class="vl"><a href="' + waLink('Здравствуйте, Злата. Хочу записаться на встречу.') + '" target="_blank" rel="noopener">+' + C.contacts.whatsapp + '</a></div>' +
        '</div></div>';
    }
    if (C.contacts.email) {
      lines += '<div class="contact-line"><div class="ic">' + ICONS.mail + '</div><div>' +
        '<div class="lb">Почта</div>' +
        '<div class="vl"><a href="mailto:' + C.contacts.email + '">' + C.contacts.email + '</a></div>' +
        '</div></div>';
    }
    if (C.contacts.city) {
      lines += '<div class="contact-line"><div class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg></div><div>' +
        '<div class="lb">Формат</div><div class="vl">' + C.contacts.city + '</div></div></div>';
    }
    contactBox.innerHTML = lines;
  });

  /* ---------- Плитки ресурсов ---------- */
  document.querySelectorAll('[data-links]').forEach(function (box) {
    box.innerHTML = C.links.map(function (l) {
      var has = !!l.url;
      var tag = has ? 'a' : 'div';
      var attrs = has ? ' href="' + l.url + '" target="_blank" rel="noopener"' : '';
      return '<' + tag + ' class="link-tile' + (has ? '' : ' soon') + '"' + attrs + '>' +
        '<span class="ic">' + (ICONS[l.icon] || '') + '</span>' +
        '<span><span class="nm">' + l.name + '</span><br><span class="sb">' + (has ? l.sub : 'скоро') + '</span></span>' +
        '</' + tag + '>';
    }).join('');
  });

  /* ---------- Расписание ---------- */
  function parseDate(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }

  document.querySelectorAll('[data-events]').forEach(function (box) {
    var limit = parseInt(box.getAttribute('data-events'), 10) || 99;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var list = (C.events || [])
      .filter(function (e) { return parseDate(e.date) >= today; })
      .sort(function (a, b) { return parseDate(a.date) - parseDate(b.date); })
      .slice(0, limit);

    if (!list.length) {
      box.innerHTML = '<div class="schedule-note">Ближайшие даты сейчас собираются. Напишите в Telegram — скажу, когда откроется запись, и подберу удобное окно.</div>';
      return;
    }

    box.innerHTML = list.map(function (e) {
      var d = parseDate(e.date);
      var isFree = e.type === 'free';
      var tags = '';
      if (isFree) tags += '<span class="tag free">Бесплатно</span>';
      if (e.type === 'group') tags += '<span class="tag">Малая группа</span>';
      if (e.status === 'few') tags += '<span class="tag few">Осталось мало мест</span>';
      if (e.status === 'closed') tags += '<span class="tag">Набор закрыт</span>';
      if (e.note) tags += '<span class="tag">' + e.note + '</span>';

      var msg = isFree
        ? 'Здравствуйте, Злата. Хочу прийти на разбор «' + e.title + '» ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + '.'
        : 'Здравствуйте, Злата. Хочу место в группе ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + '.';

      var btn = e.status === 'closed'
        ? '<span class="btn btn-ghost" style="opacity:.5;pointer-events:none">Набор закрыт</span>'
        : '<a class="btn ' + (isFree ? 'btn-ghost' : 'btn-primary') + '" data-tg="' + msg.replace(/"/g, '&quot;') + '">' + (isFree ? 'Прийти' : 'Занять место') + '</a>';

      return '<article class="event' + (isFree ? ' is-free' : '') + '">' +
        '<div class="event-date"><div class="event-day">' + d.getDate() + '</div><div class="event-month">' + MONTHS_SHORT[d.getMonth()] + '</div></div>' +
        '<div class="event-body"><h3>' + e.title + '</h3><p>' + e.desc + '</p>' +
        '<div class="event-tags"><span class="tag">' + WEEKDAYS[d.getDay()] + ', ' + e.time + '</span>' + tags + '</div></div>' +
        btn + '</article>';
    }).join('');

    // проставить ссылки у только что созданных кнопок
    box.querySelectorAll('[data-tg]').forEach(function (el) {
      el.setAttribute('href', tgLink(el.getAttribute('data-tg')));
      el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener');
    });
  });

  /* ---------- Статьи ---------- */
  document.querySelectorAll('[data-posts]').forEach(function (box) {
    var limit = parseInt(box.getAttribute('data-posts'), 10) || 99;
    var list = (C.posts || []).slice().sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); }).slice(0, limit);

    if (!list.length) {
      box.innerHTML = '<div class="schedule-note">Первые материалы появятся здесь совсем скоро.</div>';
      return;
    }
    var CATS = { razbor: 'Разбор', metod: 'О методе', praktika: 'Из практики', lichnoe: 'Личное' };
    box.innerHTML = list.map(function (p) {
      var d = parseDate(p.date);
      return '<a class="post" href="' + p.slug + '" data-cat="' + p.cat + '">' +
        '<div class="post-top"><span class="tag">' + (CATS[p.cat] || 'Статья') + '</span></div>' +
        '<div class="post-body"><h3>' + p.title + '</h3><p>' + p.excerpt + '</p>' +
        '<div class="post-meta"><span>' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + '</span><span>' + p.readTime + '</span></div>' +
        '</div></a>';
    }).join('');
  });

  /* ---------- Фильтры статей ---------- */
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        var cat = f.getAttribute('data-filter');
        document.querySelectorAll('.post').forEach(function (p) {
          p.classList.toggle('is-hidden', cat !== 'all' && p.getAttribute('data-cat') !== cat);
        });
      });
    });
  }

  /* ---------- Форма ---------- */
  document.querySelectorAll('form#lead-form, form[data-lead]').forEach(function (form) {
    if (C.formspreeId) form.setAttribute('action', 'https://formspree.io/f/' + C.formspreeId);

    var scope = form.closest('.form-card') || document;
    var ok = scope.querySelector('#form-success, [data-success]');

    function fail(field, msg) {
      var w = field.closest('.field') || field.parentElement;
      w.classList.add('error');
      var e = w.querySelector('.err');
      if (e && msg) e.textContent = msg;
    }
    form.querySelectorAll('input, textarea').forEach(function (i) {
      i.addEventListener('input', function () { var w = i.closest('.field'); if (w) w.classList.remove('error'); });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var hp = form.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return;

      var valid = true;
      var name = form.querySelector('[name="name"]');
      var contact = form.querySelector('[name="contact"]');
      var about = form.querySelector('[name="about"]');
      var consent = form.querySelector('[name="consent"]');

      if (!name.value.trim()) { fail(name, 'Как к вам обращаться?'); valid = false; }
      if (!contact.value.trim()) { fail(contact, 'Оставьте Telegram, почту или телефон — иначе я не смогу ответить'); valid = false; }
      if (!consent.checked) { alert('Пожалуйста, отметьте согласие на обработку данных — без него я не могу принять заявку.'); valid = false; }
      if (!valid) return;

      var text = 'Здравствуйте, Злата!\n\nИмя: ' + name.value.trim() +
                 '\nСвязь: ' + contact.value.trim() +
                 (about.value.trim() ? '\n\nЧто происходит:\n' + about.value.trim() : '');

      if (!C.formspreeId) {
        window.open(tgLink(text), '_blank', 'noopener');
        form.classList.add('hidden');
        if (ok) ok.classList.add('show');
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var was = btn.textContent;
      btn.textContent = 'Отправляю…'; btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error('bad response');
        form.classList.add('hidden');
        if (ok) ok.classList.add('show');
      }).catch(function () {
        btn.textContent = was; btn.disabled = false;
        window.open(tgLink(text), '_blank', 'noopener');
      });
    });
  });

  /* ---------- Год в подвале ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Дисклеймер из настроек ---------- */
  document.querySelectorAll('[data-disclaimer]').forEach(function (el) { el.textContent = C.disclaimer; });

})();
