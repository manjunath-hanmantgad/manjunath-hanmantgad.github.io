/* Progressive loader for the evidence-in-motion layer. */
(function () {
  "use strict";

  function loadStyle(id, href) {
    if (document.getElementById(id)) return;
    var link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src, done) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = done || null;
    script.onerror = function () {
      /* The original document remains fully usable if an enhancement fails. */
    };
    document.head.appendChild(script);
  }

  loadStyle("evidence-core", "enhancements-core.css");
  loadStyle("evidence-panels", "enhancements-panels.css");
  loadStyle("evidence-delivery", "enhancements-delivery.css");
  loadScript("enhancements-markup.js", function () {
    loadScript("enhancements-runtime.js");
  });
})();
