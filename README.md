# manjunath-hanmantgad.github.io

Personal site. Serves at **https://manjunath-hanmantgad.github.io**.

Hand-written HTML, CSS, and about eighty lines of JavaScript. No framework, no
build step, no dependencies — what's in this repo is what ships.

```
index.html    structure and copy
styles.css    palette, type, layout, motion
main.js       headline settle, screenshot reveal, table labels
img/          screenshots of the running systems
```

## Run it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Design notes

**Lane.** A certificate of conformance — the stamped, signed document that says a
system was inspected and passed. Not a terminal, not a magazine, not a SaaS
landing page. It matches the argument the site makes: these systems can account
for themselves.

**Color.** Committed strategy. One saturated stamp-pad blue carries the hero and
the closing section; pure white paper in between; a single red mark reserved for
the status stamp and nothing else. Every text pair clears WCAG AA.

**Type.** One family — Archivo variable — across three widths. Headlines run
expanded at `wdth 118` like an equipment nameplate, body sits at 100, and dense
data drops to 96. Martian Mono appears only on field labels, where the content
genuinely is machine output.

**Imagery.** Real screenshots of the running software, pulled from
[ai-engineering-portfolio](https://github.com/manjunath-hanmantgad/ai-engineering-portfolio).
The systems themselves are private; these are the evidence.

**Motion.** Two moments, not a page-wide reflex. The headline settles along the
typeface's width axis on load, and screenshots unfurl once as they arrive.
Everything is fully readable with JavaScript disabled — no content is gated on a
class, so nothing ships blank if a transition never fires. All motion is off
under `prefers-reduced-motion: reduce`.

## Deployment

GitHub Pages serves `main` from the repository root. Push to `main` and it goes
live within a minute or so.

## Things worth changing later

- **Contact route.** Four `mailto:` links point at `mhanmant.freebi@gmail.com`.
  A Cal.com link would convert better for the "book an intro call" path.
- **Open Graph image.** There's no `og:image` yet; a 1200×630 crop of the hero
  would make shared links look right.
- **Archive dates.** They come from GitHub's `updated_at`, which is last push,
  not when the work happened.
