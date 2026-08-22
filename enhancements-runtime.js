/* Motion, navigation state and accessible evidence inspection. */
(function (global) {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  function startHero() {
    var hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-settling");
  }

  function initialiseMotionAndInteraction() {
    var bar = document.querySelector(".bar");
    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var still = motionQuery.matches;

    if (still) {
      startHero();
    } else if (document.fonts && document.fonts.ready) {
      var heroStarted = false;
      var startHeroOnce = function () {
        if (heroStarted) return;
        heroStarted = true;
        startHero();
      };
      document.fonts.ready.then(startHeroOnce);
      window.setTimeout(startHeroOnce, 1200);
    } else {
      startHero();
    }

    var spec = document.querySelector(".spec");
    if (spec) {
      var heads = spec.querySelectorAll("thead th");
      var labels = [heads[1], heads[2]].map(function (head) {
        return head.dataset.short || head.textContent;
      });
      spec.querySelectorAll("tbody tr").forEach(function (row) {
        row.querySelectorAll("td").forEach(function (cell, index) {
          cell.setAttribute("data-label", labels[index] || "");
        });
      });
    }

    var revealTargets = document.querySelectorAll(
      ".shot, .system-diagram, .spec tbody tr, .release-pipeline, .close__record"
    );

    function reveal(target) {
      target.classList.add("is-in-view");
      if (target.classList.contains("shot")) target.classList.add("is-arriving");
    }

    if (!still && "IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.16 });
      revealTargets.forEach(function (target) { revealObserver.observe(target); });
    } else {
      revealTargets.forEach(reveal);
    }

    var sectionLinks = Array.prototype.slice.call(
      document.querySelectorAll(".bar__nav a[data-section]")
    );
    var sections = sectionLinks.map(function (link) {
      return document.getElementById(link.dataset.section);
    }).filter(Boolean);
    var railLinks = Array.prototype.slice.call(
      document.querySelectorAll(".work-rail a[data-system-target]")
    );
    var systems = Array.prototype.slice.call(
      document.querySelectorAll("#work article[data-system]")
    );

    function setCurrentNavigation(activeId) {
      sectionLinks.forEach(function (link) {
        if (link.dataset.section === activeId) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    function setCurrentSystem(activeSystem) {
      railLinks.forEach(function (link) {
        if (link.dataset.systemTarget === activeSystem) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
    }

    function updateActiveSection() {
      var marker = window.innerHeight * 0.42;
      var active = "";
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= marker) active = section.id;
      });
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 8) active = "contact";
      setCurrentNavigation(active);
    }

    function updateActiveSystem() {
      var work = document.getElementById("work");
      if (!work || !systems.length) return;
      var workRect = work.getBoundingClientRect();
      if (workRect.bottom <= 0 || workRect.top >= window.innerHeight) {
        setCurrentSystem("");
        return;
      }
      var marker = Math.min(window.innerHeight * 0.5, 430);
      var active = systems[0].dataset.system;
      systems.forEach(function (system) {
        if (system.getBoundingClientRect().top <= marker) active = system.dataset.system;
      });
      setCurrentSystem(active);
    }

    function updateScrollState() {
      var maximum = Math.max(1, root.scrollHeight - window.innerHeight);
      var progress = Math.min(1, Math.max(0, window.scrollY / maximum));
      root.style.setProperty("--page-progress", (progress * 100).toFixed(2) + "%");
      if (bar) bar.classList.toggle("is-compact", window.scrollY > 28);
      updateActiveSection();
      updateActiveSystem();
    }

    var scrollTicking = false;
    function requestScrollUpdate() {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        updateScrollState();
        scrollTicking = false;
      });
    }

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    updateScrollState();

    var viewer = document.getElementById("evidence-viewer");
    var viewerImage = viewer && viewer.querySelector(".evidence-viewer__image");
    var viewerTitle = viewer && viewer.querySelector("#evidence-title");
    var viewerCaption = viewer && viewer.querySelector(".evidence-viewer__caption");
    var viewerClose = viewer && viewer.querySelector(".evidence-viewer__close");
    var lastEvidenceTrigger = null;

    function openEvidenceViewer(trigger) {
      if (!viewer || !viewerImage || !viewerTitle || !viewerCaption) return;
      var system = trigger.closest("[data-system]");
      var figure = trigger.closest("figure");
      var sourceImage = trigger.querySelector("img");
      var heading = system && system.querySelector(".sys__name");
      var caption = figure && figure.querySelector("figcaption");

      lastEvidenceTrigger = trigger;
      viewerImage.src = trigger.dataset.full || (sourceImage && sourceImage.currentSrc) || "";
      viewerImage.alt = sourceImage ? sourceImage.alt : "System screenshot";
      viewerTitle.textContent = heading ? heading.textContent : "System evidence";
      viewerCaption.textContent = caption ? caption.textContent : "";
      body.classList.add("has-dialog");

      if (typeof viewer.showModal === "function") viewer.showModal();
      else viewer.setAttribute("open", "");
    }

    function closeEvidenceViewer() {
      if (!viewer) return;
      if (typeof viewer.close === "function" && viewer.open) viewer.close();
      else {
        viewer.removeAttribute("open");
        body.classList.remove("has-dialog");
        if (lastEvidenceTrigger) lastEvidenceTrigger.focus();
      }
    }

    document.querySelectorAll(".shot__open[data-full]").forEach(function (trigger) {
      trigger.addEventListener("click", function () { openEvidenceViewer(trigger); });
    });
    if (viewerClose) viewerClose.addEventListener("click", closeEvidenceViewer);
    if (viewer) {
      viewer.addEventListener("click", function (event) {
        if (event.target === viewer) closeEvidenceViewer();
      });
      viewer.addEventListener("close", function () {
        body.classList.remove("has-dialog");
        viewerImage.removeAttribute("src");
        if (lastEvidenceTrigger) lastEvidenceTrigger.focus();
      });
    }
  }

  var enhancement = global.MJPortfolioEnhancements;
  if (enhancement && enhancement.enhanceMarkup) enhancement.enhanceMarkup();
  initialiseMotionAndInteraction();
})(window);
