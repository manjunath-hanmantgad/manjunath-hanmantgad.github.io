/* Runtime markup for the evidence-in-motion layer. */
(function (global) {
  "use strict";

  var body = document.body;
  function elementFromHTML(markup) {
    var template = document.createElement("template");
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  }

  function directImage(figure) {
    for (var index = 0; index < figure.children.length; index += 1) {
      if (figure.children[index].tagName === "IMG") return figure.children[index];
    }
    return figure.querySelector("img");
  }

  function enhanceHeader() {
    var header = document.querySelector(".bar");
    if (!header) return;

    header.querySelectorAll('.bar__nav a[href^="#"]').forEach(function (link) {
      if (!link.dataset.section) link.dataset.section = link.getAttribute("href").slice(1);
    });

    if (!header.querySelector(".bar__progress")) {
      header.insertAdjacentHTML("beforeend", '<span class="bar__progress" aria-hidden="true"></span>');
    }
  }

  function enhanceHero() {
    var grid = document.querySelector(".hero__grid");
    if (!grid || grid.querySelector(".hero__proof")) return;

    var nameplate = grid.querySelector(":scope > .nameplate");
    if (!nameplate) return;

    var proof = elementFromHTML(`
      <aside class="hero__proof" aria-label="How a production answer becomes evidence">
        <div class="evidence-flow" aria-label="Request passes through identity, access control, retrieval, citation and audit">
          <div class="evidence-flow__head">
            <span>LIVE CONTROL PATH</span>
            <span>TRACE / 001</span>
          </div>
          <div class="evidence-flow__track">
            <span class="evidence-flow__line" aria-hidden="true"></span>
            <span class="evidence-flow__trace" aria-hidden="true"></span>
            <ol class="evidence-flow__nodes">
              <li class="evidence-flow__node" data-step="request"><span>01</span><b>Request</b></li>
              <li class="evidence-flow__node" data-step="identity"><span>02</span><b>Identity</b></li>
              <li class="evidence-flow__node evidence-flow__node--gate" data-step="access"><span>03</span><b>Access gate</b></li>
              <li class="evidence-flow__node" data-step="retrieval"><span>04</span><b>Retrieval</b></li>
              <li class="evidence-flow__node" data-step="answer"><span>05</span><b>Answer + citation</b></li>
              <li class="evidence-flow__node evidence-flow__node--audit" data-step="audit"><span>06</span><b>Audit record</b></li>
            </ol>
            <span class="evidence-flow__blocked" aria-hidden="true">RESTRICTED / REMOVED</span>
          </div>
        </div>
      </aside>
    `);

    grid.insertBefore(proof, nameplate);
    proof.appendChild(nameplate);
  }

  var SYSTEMS = [
    {
      key: "observatory",
      id: "system-observatory",
      rail: "Observatory",
      diagramClass: "system-diagram--observatory",
      diagramLabel: "A live trace is scored for latency, cost and quality before a threshold breach opens an incident",
      diagram: '<span class="system-diagram__node" data-node="trace"><small>01</small>Live trace</span><span class="system-diagram__link" aria-hidden="true"></span><span class="system-diagram__node" data-node="scores"><small>02</small>Quality + cost</span><span class="system-diagram__link" aria-hidden="true"></span><span class="system-diagram__node system-diagram__node--alert" data-node="incident"><small>03</small>Incident</span>',
      bar: "RUNNING SYSTEM",
      capture: "01",
      focus: "observatory",
      openLabel: "Open LLM Observatory screenshot at full size"
    },
    {
      key: "rag",
      id: "system-rag",
      rail: "Enterprise RAG",
      diagramClass: "system-diagram--rag",
      diagramLabel: "Identity and role filtering remove a restricted document before retrieval, while an allowed source continues to a cited answer",
      diagram: '<span class="system-diagram__node" data-node="role"><small>ROLE</small>Finance</span><span class="system-diagram__node system-diagram__node--gate" data-node="gate"><small>GATE</small>RBAC</span><span class="system-diagram__node system-diagram__node--blocked" data-node="blocked"><small>BLOCK</small>Restricted</span><span class="system-diagram__node" data-node="source"><small>SOURCE</small>Forecast</span><span class="system-diagram__node system-diagram__node--cited" data-node="citation"><small>ANSWER</small>Cited</span>',
      bar: "ACCESS-CONTROL EVIDENCE",
      capture: "02",
      focus: "rag",
      openLabel: "Open Enterprise RAG permission comparison at full size"
    },
    {
      key: "documents",
      id: "system-documents",
      rail: "Documents",
      diagramClass: "system-diagram--documents",
      diagramLabel: "A document is extracted field by field; a low-confidence value pauses in a human review queue before correction is recorded",
      diagram: '<span class="system-diagram__node" data-node="document"><small>01</small>Document</span><span class="system-diagram__node" data-node="extract"><small>02</small>Extract fields</span><span class="system-diagram__node system-diagram__node--review" data-node="review"><small>0.62</small>Human review</span><span class="system-diagram__node system-diagram__node--cited" data-node="record"><small>ACTOR</small>Correction log</span>',
      bar: "FIELD-LEVEL REVIEW",
      capture: "03",
      focus: "workbench",
      openLabel: "Open Document Intelligence Workbench screenshot at full size"
    },
    {
      key: "procurement",
      id: "system-procurement",
      rail: "ProcureAI",
      diagramClass: "system-diagram--procurement",
      diagramLabel: "Policy, vendor, budget and risk specialists return typed findings that assemble into one approval evidence packet",
      diagram: '<span class="system-diagram__node" data-node="policy"><small>01</small>Policy</span><span class="system-diagram__node" data-node="vendor"><small>02</small>Vendor</span><span class="system-diagram__node" data-node="budget"><small>03</small>Budget</span><span class="system-diagram__node" data-node="risk"><small>04</small>Risk</span><span class="system-diagram__node system-diagram__node--cited" data-node="packet"><small>05</small>Evidence packet</span>',
      bar: "DECISION PACKET",
      capture: "04",
      focus: "procure",
      openLabel: "Open ProcureAI evidence packet at full size"
    },
    {
      key: "orchestration",
      id: "system-orchestration",
      rail: "Orchestration",
      diagramClass: "system-diagram--orchestration",
      diagramLabel: "A persistent workflow advances through intake and rules, pauses for human review, then resumes and appends a completion event",
      diagram: '<span class="system-diagram__node" data-node="intake"><small>01</small>Intake</span><span class="system-diagram__node" data-node="rules"><small>02</small>Rules</span><span class="system-diagram__node system-diagram__node--pause" data-node="pause"><small>PAUSE</small>Human review</span><span class="system-diagram__node" data-node="resume"><small>RESUME</small>Typed payload</span><span class="system-diagram__node system-diagram__node--cited" data-node="complete"><small>EVENT</small>Complete</span>',
      bar: "PERSISTENT WORKFLOW STATE",
      capture: "05",
      focus: "audit",
      openLabel: "Open orchestration audit trail at full size"
    }
  ];

  function ensureWorkRail(work) {
    if (work.querySelector(".work-rail")) return;
    var firstSystem = work.querySelector("article.sys");
    if (!firstSystem) return;

    var items = SYSTEMS.map(function (system, index) {
      return '<li><a href="#' + system.id + '" data-system-target="' + system.key + '"><span>0' + (index + 1) + '</span>' + system.rail + '</a></li>';
    }).join("");

    firstSystem.insertAdjacentHTML(
      "beforebegin",
      '<nav class="work-rail" aria-label="System case-study progress"><ol>' + items + "</ol></nav>"
    );
  }

  function enhanceShot(system, metadata) {
    var shot = system.querySelector("figure.shot");
    if (!shot || shot.querySelector(".shot__frame")) return;

    var image = directImage(shot);
    var caption = shot.querySelector("figcaption");
    if (!image) return;

    shot.dataset.capture = metadata.capture;
    var frame = document.createElement("div");
    frame.className = "shot__frame";
    frame.innerHTML = '<div class="shot__bar"><span>' + metadata.bar + '</span><span>CAPTURE ' + metadata.capture + "</span></div>";

    var trigger = document.createElement("button");
    trigger.className = "shot__open";
    trigger.type = "button";
    trigger.dataset.full = image.getAttribute("src") || "";
    trigger.setAttribute("aria-label", metadata.openLabel);
    trigger.appendChild(image);
    trigger.insertAdjacentHTML(
      "beforeend",
      '<span class="shot__focus shot__focus--' + metadata.focus + '" aria-hidden="true"></span><span class="shot__inspect" aria-hidden="true">Inspect evidence ↗</span>'
    );
    frame.appendChild(trigger);

    if (caption) shot.insertBefore(frame, caption);
    else shot.appendChild(frame);
  }

  function enhanceSystems() {
    var work = document.getElementById("work");
    if (!work) return;

    var articles = work.querySelectorAll("article.sys");
    SYSTEMS.forEach(function (metadata, index) {
      var system = articles[index];
      if (!system) return;

      system.id = metadata.id;
      system.dataset.system = metadata.key;

      var claim = system.querySelector(".sys__claim");
      if (claim && !system.querySelector(".system-diagram")) {
        claim.insertAdjacentHTML(
          "afterend",
          '<div class="system-diagram ' + metadata.diagramClass + '" role="img" aria-label="' + metadata.diagramLabel + '">' + metadata.diagram + "</div>"
        );
      }

      enhanceShot(system, metadata);
    });

    ensureWorkRail(work);
  }

  function enhanceBaseline() {
    var baseline = document.getElementById("baseline");
    if (!baseline || baseline.querySelector(".release-pipeline")) return;
    var base = baseline.querySelector(".base");
    if (!base) return;

    base.insertAdjacentHTML("beforebegin", `
      <ol class="release-pipeline" aria-label="Release pipeline from code to production telemetry">
        <li class="release-pipeline__stage" data-stage="code"><span>01</span><b>Code</b><small>typed contracts</small></li>
        <li class="release-pipeline__stage" data-stage="test"><span>02</span><b>Test</b><small>unit + eval</small></li>
        <li class="release-pipeline__stage" data-stage="build"><span>03</span><b>Build</b><small>immutable image</small></li>
        <li class="release-pipeline__stage" data-stage="staging"><span>04</span><b>Staging</b><small>integration proof</small></li>
        <li class="release-pipeline__stage release-pipeline__stage--gate" data-stage="gate"><span>05</span><b>Manual gate</b><small>named approver</small></li>
        <li class="release-pipeline__stage" data-stage="production"><span>06</span><b>Production</b><small>client tenant</small></li>
        <li class="release-pipeline__stage" data-stage="telemetry"><span>07</span><b>Telemetry</b><small>cost + quality</small></li>
      </ol>
    `);
  }

  function enhanceClosingRecord() {
    var close = document.getElementById("contact");
    if (!close || close.querySelector(".close__record")) return;
    var nameplate = close.querySelector(".nameplate--close");
    if (!nameplate) return;

    nameplate.replaceWith(elementFromHTML(`
      <aside class="close__record" aria-label="Engagement availability record">
        <div class="close__record-head"><span>ENGAGEMENT RECORD</span><span>2026 / OPEN</span></div>
        <div class="close__record-row"><span>Scope</span><b>Defined together</b></div>
        <div class="close__record-row"><span>Deployment</span><b>Your Azure tenant</b></div>
        <div class="close__record-row"><span>Handoff</span><b>Documentation included</b></div>
        <div class="close__record-row"><span>Contact</span><b><a class="a a--inv" href="mailto:mhanmant.freebi@gmail.com">mhanmant.freebi@gmail.com</a></b></div>
        <div class="close__record-row"><span>Time zone</span><b>IST / UTC+5:30</b></div>
        <div class="availability-stamp" aria-label="Available for new work">AVAILABLE FOR NEW WORK</div>
      </aside>
    `));

    var foot = close.querySelector(".close__foot");
    if (foot) foot.textContent = "Built by hand — semantic HTML, CSS, and dependency-free JavaScript.";
  }

  function ensureEvidenceViewer() {
    if (document.getElementById("evidence-viewer")) return;
    body.insertAdjacentHTML("beforeend", `
      <dialog class="evidence-viewer" id="evidence-viewer" aria-labelledby="evidence-title">
        <div class="evidence-viewer__shell">
          <header class="evidence-viewer__head">
            <div><span>RUNNING SYSTEM / FULL CAPTURE</span><h2 id="evidence-title">System evidence</h2></div>
            <button class="evidence-viewer__close" type="button" aria-label="Close screenshot viewer">Close</button>
          </header>
          <img class="evidence-viewer__image" src="" alt="">
          <p class="evidence-viewer__caption"></p>
        </div>
      </dialog>
    `);
  }

  function enhanceMarkup() {
    enhanceHeader();
    enhanceHero();
    enhanceSystems();
    enhanceBaseline();
    enhanceClosingRecord();
    ensureEvidenceViewer();
  }

  global.MJPortfolioEnhancements = global.MJPortfolioEnhancements || {};
  global.MJPortfolioEnhancements.enhanceMarkup = enhanceMarkup;
  enhanceMarkup();
})(window);
