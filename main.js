/* Two moments of motion, and one bit of table plumbing.
   Everything on this page is readable with JavaScript off;
   nothing below gates visibility. */

(function () {
  "use strict";

  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- 1. The headline settles along the width axis, once. --- */
  if (!still) {
    var hero = document.querySelector(".hero");
    var start = function () { hero.classList.add("is-settling"); };

    if (document.fonts && document.fonts.ready) {
      // The animation interpolates a variable-font axis, so it needs
      // the font. Cap the wait so a slow CDN can't swallow the moment.
      var fired = false;
      var once = function () { if (!fired) { fired = true; start(); } };
      document.fonts.ready.then(once);
      setTimeout(once, 1200);
    } else {
      start();
    }
  }

  /* --- 2. Screenshots unfurl as they arrive. --- */
  if (!still && "IntersectionObserver" in window) {
    var shots = document.querySelectorAll(".shot");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-arriving");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.2 });
    shots.forEach(function (s) { io.observe(s); });
  }

  /* --- 3. Give the spec table's cells their mobile labels. --- */
  var spec = document.querySelector(".spec");
  if (spec) {
    var heads = spec.querySelectorAll("thead th");
    var labels = [heads[1], heads[2]].map(function (h) {
      return h.dataset.short || h.textContent;
    });
    spec.querySelectorAll("tbody tr").forEach(function (tr) {
      tr.querySelectorAll("td").forEach(function (td, i) {
        td.setAttribute("data-label", labels[i] || "");
      });
    });
  }
})();
