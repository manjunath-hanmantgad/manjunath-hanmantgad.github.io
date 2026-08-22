# Evidence in Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained, production-themed motion and graphics system to the existing static portfolio without introducing runtime dependencies.

**Architecture:** Keep `index.html` as the semantic source of all visible content and inline SVG diagrams. Extend `styles.css` with evidence-panel, diagram, progress, lightbox, responsive, and reduced-motion rules. Replace the small progressive-enhancement script in `main.js` with isolated functions for observation, active navigation, lightbox behavior, and mobile table labels.

**Tech Stack:** HTML5, CSS, inline SVG, vanilla JavaScript, Python standard-library tests, Node syntax validation.

**Spec:** `docs/superpowers/specs/2026-08-22-evidence-in-motion-design.md`

## Global Constraints

- No third-party animation or UI dependencies.
- All content remains visible and usable when JavaScript is disabled.
- Respect `prefers-reduced-motion`.
- Preserve all existing portfolio claims, project descriptions, links, and image assets.
- Use the existing palette and typography.
- Keep SVG graphics compact, semantic, and accessible.

---

### Task 1: Static contract tests

**Files:**
- Create: `tests/test_portfolio.py`

**Interfaces:**
- Consumes: repository-root `index.html`, `styles.css`, and `main.js`.
- Produces: a repeatable static contract verifying required components, accessibility hooks, reduced-motion support, and JavaScript syntax.

- [ ] **Step 1: Write failing tests**

Create `tests/test_portfolio.py` with tests asserting that the HTML contains `.hero-trace`, five `.system-diagram` elements, `.work-spine`, `.release-pipeline`, `.shot__open`, and `#evidence-dialog`; that CSS contains progress, active, dialog, diagram, and reduced-motion rules; and that JavaScript contains initialization functions for navigation, reveal observers, evidence dialog, and mobile table labels.

- [ ] **Step 2: Run tests to verify they fail**

Run: `python3 -m unittest -v tests/test_portfolio.py`

Expected: failures reporting the new evidence-in-motion structures are missing.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/test_portfolio.py
git commit -m "test: define evidence in motion contract"
```

---

### Task 2: Semantic graphics and evidence-panel markup

**Files:**
- Modify: `index.html`
- Test: `tests/test_portfolio.py`

**Interfaces:**
- Consumes: existing project sections, screenshots, captions, and contact content.
- Produces: `.hero-trace`, `.system-diagram`, `.work-spine`, `.shot__frame`, `.shot__open`, `.release-pipeline`, `.engagement-record`, and `#evidence-dialog` markup used by CSS and JavaScript.

- [ ] **Step 1: Add hero trace and header progress markup**

Add a decorative blueprint layer, an accessible evidence-trace SVG, and `<span class="bar__progress" aria-hidden="true"></span>` inside the header.

- [ ] **Step 2: Add work spine and five project diagrams**

Give each project article a stable `id` and `data-system-index`. Add a compact labelled SVG diagram within each project text block. Add a five-item navigation spine linked to those article IDs.

- [ ] **Step 3: Upgrade screenshots into evidence panels**

Wrap each image in `.shot__frame`, add evidence metadata, context annotations, and a `.shot__open` button with the image source and caption encoded in data attributes.

- [ ] **Step 4: Add release pipeline and closing record**

Insert the seven-stage pipeline before `.base`, an engagement record inside the closing section, and an availability stamp.

- [ ] **Step 5: Add the native dialog**

Append a labelled `<dialog id="evidence-dialog">` containing a close button, image, and caption.

- [ ] **Step 6: Run the HTML contract**

Run: `python3 -m unittest -v tests/test_portfolio.py`

Expected: HTML structure assertions pass; CSS and JavaScript assertions still fail.

- [ ] **Step 7: Commit markup**

```bash
git add index.html
git commit -m "feat: add evidence graphics and portfolio interaction markup"
```

---

### Task 3: Visual system and motion styling

**Files:**
- Modify: `styles.css`
- Test: `tests/test_portfolio.py`

**Interfaces:**
- Consumes: the classes and SVG groups introduced in Task 2.
- Produces: responsive evidence frames, diagram states, trace animation, scroll progress, active navigation, row verification, pipeline activation, dialog styling, and reduced-motion fallbacks.

- [ ] **Step 1: Add blueprint, trace, and header states**

Style the hero grid texture, trace panel, moving trace path, rejected document, scroll progress line, compact header state, and active navigation link.

- [ ] **Step 2: Add table and section reveal states**

Style `.is-revealed` rows with a connector and verification mark. Add section-label and diagram-reveal treatments without hiding content by default.

- [ ] **Step 3: Add project diagrams and work spine**

Define shared diagram primitives and project-specific active states. Style the vertical spine and its active/completed nodes.

- [ ] **Step 4: Add evidence frames and dialog**

Style frame metadata, annotations, hover/focus treatment, open controls, backdrop, large image containment, and close control.

- [ ] **Step 5: Add release pipeline and closing record**

Style the staged pipeline, active stage states, engagement record, and one-time availability stamp.

- [ ] **Step 6: Add responsive and reduced-motion rules**

Collapse the work spine on smaller screens, preserve screenshot usability, make the dialog mobile-safe, and disable all nonessential transitions and keyframes under reduced motion.

- [ ] **Step 7: Run the CSS contract**

Run: `python3 -m unittest -v tests/test_portfolio.py`

Expected: HTML and CSS assertions pass; JavaScript behavior assertions still fail.

- [ ] **Step 8: Commit styles**

```bash
git add styles.css
git commit -m "feat: style evidence motion and interactive graphics"
```

---

### Task 4: Progressive enhancement behavior

**Files:**
- Modify: `main.js`
- Test: `tests/test_portfolio.py`

**Interfaces:**
- Consumes: semantic classes, IDs, and data attributes from `index.html`.
- Produces: `initHero()`, `initRevealObservers()`, `initNavigation()`, `initEvidenceDialog()`, and `initMobileTableLabels()` initialization functions.

- [ ] **Step 1: Preserve and isolate the hero animation**

Move the existing font-ready headline start into `initHero()` and keep the capped font wait.

- [ ] **Step 2: Implement reveal observers**

Use `IntersectionObserver` to add one-time states to screenshots, table rows, diagrams, pipeline stages, and the closing record. Avoid visibility gating.

- [ ] **Step 3: Implement navigation progress and project spine state**

Update `--page-progress`, toggle `.bar--compact`, mark the active top navigation link, and update work-spine nodes based on observed sections and systems.

- [ ] **Step 4: Implement the evidence dialog**

Open the native dialog from `.shot__open`, populate image and caption, support backdrop click and close button, and return focus to the opener.

- [ ] **Step 5: Preserve mobile table labels**

Move the existing table-label logic into `initMobileTableLabels()` and guard all optional elements.

- [ ] **Step 6: Verify JavaScript syntax and full contract**

Run:

```bash
node --check main.js
python3 -m unittest -v tests/test_portfolio.py
```

Expected: JavaScript syntax valid and all tests pass.

- [ ] **Step 7: Commit behavior**

```bash
git add main.js
git commit -m "feat: add progressive evidence interactions"
```

---

### Task 5: Browser and repository verification

**Files:**
- Modify if required: `index.html`, `styles.css`, `main.js`, `tests/test_portfolio.py`

**Interfaces:**
- Consumes: completed static implementation.
- Produces: verified branch suitable for pull request and merge.

- [ ] **Step 1: Run all automated checks**

```bash
node --check main.js
python3 -m unittest discover -s tests -v
```

Expected: zero failures and zero JavaScript syntax errors.

- [ ] **Step 2: Serve locally and perform browser smoke checks**

Run: `python3 -m http.server 4173`

Check desktop and mobile widths for horizontal overflow, dialog operation, focus visibility, active navigation, image opening, and reduced-motion behavior.

- [ ] **Step 3: Review the complete diff**

Confirm no existing copy, links, screenshots, email address, or project claims were removed or altered accidentally.

- [ ] **Step 4: Open and review a pull request**

Create a pull request from `feat/evidence-in-motion` into `main`, inspect the changed-file patch, and merge after verification.
