/**
 * HUNAR Soft-Navigation Router
 * Turns the static multi-page site into a seamless single-page experience.
 * No iframes, no wrapper shell, no per-page HTML edits.
 * Intercepts internal link clicks, fetches the target page, swaps it in place,
 * and manages the URL bar via the History API so back/forward still work.
 * Falls back to normal browser navigation when fetch/history are unavailable
 * (e.g. when the site is opened directly over file://).
 */
(function () {
  'use strict';
  if (window.HunarRouter) return;

  var cache = Object.create(null);
  var navToken = 0;

  /* ------------------------------------------------------------------ */
  /*  Should this anchor be intercepted?                                 */
  /* ------------------------------------------------------------------ */
  function shouldIntercept(a) {
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return false;
    if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) return false;
    var target = a.getAttribute('target');
    if (target && target !== '_self') return false;
    try {
      var url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol) return false;
      if (location.protocol === 'http:' || location.protocol === 'https:') {
        if (url.host !== location.host) return false;
      }
      return /\.(html?|htm)$/i.test(url.pathname) ||
             url.pathname.charAt(url.pathname.length - 1) === '/';
    } catch (e) {
      return false;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Navigate to a URL (soft-swap or pushState + fetch).                */
  /* ------------------------------------------------------------------ */
  function navigate(url, opts) {
    opts = opts || {};
    var myToken = ++navToken;

    if (opts.replace) {
      try { history.replaceState({ hunarUrl: url, hunarScroll: 0 }, '', url); } catch (e) { /* ignore */ }
    } else {
      try { history.pushState({ hunarUrl: url, hunarScroll: 0 }, '', url); } catch (e) { window.location.href = url; return; }
    }

    loadPage(url, myToken, function (ok) {
      if (ok) {
        window.scrollTo(0, 0);
      } else {
        window.location.href = url;
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Fetch (or read cache) and apply a page.                            */
  /* ------------------------------------------------------------------ */
  function loadPage(url, myToken, done) {
    var cached = cache[url];
    if (cached) {
      applyPage(cached, myToken);
      done(true);
      return;
    }
    fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (html) {
      cache[url] = html;
      if (myToken !== navToken) { done(false); return; }
      applyPage(html, myToken);
      done(true);
    }).catch(function () {
      done(false);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Replace the current document with a fetched page and re-run its    */
  /*  scripts in the original order.                                     */
  /* ------------------------------------------------------------------ */
  function applyPage(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var newRoot = doc.documentElement;
    var oldRoot = document.documentElement;

    /* Copy root attributes (lang, class, style, etc.) */
    var attrs = newRoot.attributes;
    for (var i = 0; i < attrs.length; i++) {
      oldRoot.setAttribute(attrs[i].name, attrs[i].value);
    }

    /* Swap innerHTML — removes old DOM and inserts the new page */
    oldRoot.innerHTML = newRoot.innerHTML;

    /* Re-execute every <script> in document order */
    reExecuteScripts();
  }

  /* ------------------------------------------------------------------ */
  /*  Script re-execution engine.                                        */
  /*  External scripts: re-insert with same src, await load.             */
  /*  Inline scripts:   wrap in IIFE to prevent const/let collisions.    */
  /* ------------------------------------------------------------------ */
  function reExecuteScripts() {
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script'));
    var i = 0;

    function next() {
      if (i >= scripts.length) return;
      var old = scripts[i++];
      var parent = old.parentNode;
      if (!parent) { next(); return; }

      var s = document.createElement('script');

      if (old.src) {
        /* External — copy all attributes, wait for load */
        for (var j = 0; j < old.attributes.length; j++) {
          s.setAttribute(old.attributes[j].name, old.attributes[j].value);
        }
        s.addEventListener('load', next, false);
        s.addEventListener('error', next, false);
        parent.insertBefore(s, old);
        parent.removeChild(old);
      } else {
        /* Inline — wrap in IIFE to isolate const/let declarations */
        s.textContent = '(function(){\n' + (old.textContent || '') + '\n})();';
        parent.insertBefore(s, old);
        parent.removeChild(old);
        next(); /* inline scripts execute synchronously */
      }
    }

    next();
  }

  /* ------------------------------------------------------------------ */
  /*  Event handlers                                                     */
  /* ------------------------------------------------------------------ */
  function onClick(e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var anchor = e.target;
    while (anchor && anchor.nodeName !== 'A') anchor = anchor.parentNode;
    if (!anchor || anchor.nodeName !== 'A') return;
    if (!shouldIntercept(anchor)) return;

    var href = anchor.href;
    if (href === location.href) return;

    e.preventDefault();
    navigate(href);
  }

  function onPopState(e) {
    var state = e.state;
    var url = (state && state.hunarUrl) || location.href;
    var scrollY = (state && state.hunarScroll) || 0;
    var myToken = ++navToken;

    loadPage(url, myToken, function (ok) {
      if (ok) {
        window.scrollTo(0, scrollY);
      } else {
        location.reload();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Initialization                                                     */
  /* ------------------------------------------------------------------ */
  function init() {
    document.addEventListener('click', onClick, false);
    window.addEventListener('popstate', onPopState, false);
    try { history.replaceState({ hunarUrl: location.href, hunarScroll: 0 }, '', location.href); } catch (e) { /* file:// */ }
  }

  window.HunarRouter = { navigate: navigate, init: init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
