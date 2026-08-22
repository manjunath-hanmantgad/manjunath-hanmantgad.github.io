# Evidence in Motion Design

## Purpose

Make the portfolio feel richer and more interactive while preserving its existing certificate-of-conformance identity. Motion must explain production AI engineering rather than decorate the page.

## Design direction

The page behaves like an auditable system coming to life. Requests move through identity and access controls, sources connect to answers, quality thresholds open incidents, human review pauses workflows, and verified records are appended.

## Visual system

- Keep the existing stamp-blue, white-paper, graphite, and red-verification palette.
- Use native HTML, CSS, inline SVG, and vanilla JavaScript only.
- Use restrained line drawing, opacity, transforms, clipping, and variable-font animation.
- No particles, WebGL, videos, glowing gradients, or third-party animation libraries.
- Every enhancement must preserve full content and usability when JavaScript is unavailable.
- Respect `prefers-reduced-motion` and stop observation-based work after an element has entered.

## Components

### Hero evidence trace

Add a compact SVG system trace beside the existing nameplate. It shows request, identity, access gate, retrieval, cited answer, and audit record. A restricted document is visibly rejected while an authorised document continues. The hero receives a faint blueprint grid and trace metadata.

### Navigation and page progress

Add a thin scroll progress line to the sticky header. Highlight the active navigation item. Reduce the header slightly after scrolling.

### Prototype-to-production table

Reveal rows individually. The prototype cell becomes visually subordinate, a connector draws across, and the shipped cell receives a verification mark.

### System-specific diagrams

Add one compact inline SVG per project:

1. Observatory: traces, threshold breach, incident state.
2. Enterprise RAG: role gate removes a restricted document before retrieval and connects an allowed source to a cited answer.
3. Document Intelligence: field extraction, confidence validation, human review queue.
4. ProcureAI: specialist checks merge into an evidence packet.
5. Orchestration: persistent state pauses for human review, resumes, and appends an audit event.

### Screenshot evidence panels

Frame screenshots as running-system evidence. Add small metadata labels, contextual annotations, a keyboard-accessible open-control, and a modal lightbox showing the full screenshot and caption.

### Systems progress spine

Add a numbered vertical guide for the five systems. The active project updates as the visitor scrolls. Collapse it into a horizontal compact guide on narrower layouts.

### Release pipeline

Add a staged pipeline above the baseline list: code, test, build, staging, manual gate, production, observability. Stages activate sequentially when visible.

### Closing record

Add a faint engagement record behind the closing copy and a one-time availability stamp.

## Accessibility and performance

- All informative SVGs use accessible titles or visible text; decorative geometry is hidden from assistive technology.
- The lightbox uses a native `<dialog>`, labelled controls, Escape handling, and restores focus.
- Motion is disabled under `prefers-reduced-motion`.
- No runtime dependency or network request is added.
- Layout must remain usable at 360px, 768px, 1024px, and large desktop widths.

## Acceptance criteria

- The seven visible enhancements are present without changing the portfolio claims or project descriptions.
- JavaScript parses without errors.
- HTML retains one H1, logical section headings, usable links, and labelled interactive controls.
- Static tests verify required structures and progressive-enhancement hooks.
- The page works with JavaScript disabled and reduced motion enabled.
