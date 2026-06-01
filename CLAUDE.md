# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start dev server (opens browser automatically)
npm start

# Build for production (outputs to dist/)
npm run build
```

There are no tests in this project.

## Architecture

This is a static personal portfolio site built with vanilla JS, jQuery, SCSS, and Webpack. The site is hosted on Netlify, which runs `npm run build` on deploy — `dist/` is not committed.

**Entry points:**
- `src/index.js` — main JS entry; initializes ScrollReveal animations (`sr.js`), tilt effects, and smooth-scroll
- `src/vendor.js` — bundles third-party libraries (Bootstrap, jQuery, Popper)

**All site content lives in one file:** `src/template.html`. Sections in order: Hero → About → Experience → Skills → Projects → Contact → Footer. To update content (text, links, images), edit this file directly.

**Images and assets** referenced in `template.html` are served from `src/my_files/`. Webpack copies them to `dist/assets/` with a content hash in the filename. `src/assets/` contains placeholder/template images (`profile.jpg`, `project.jpg`) that are not used by the site.

**`reference/`** — contains `MargaretReedResume.pdf`, the current resume used as source-of-truth when updating experience content.

**Styles** are in `src/style/main.scss`, which imports partials organized as:
- `abstracts/` — variables (colors, font sizes, scroll-reveal helpers) and mixins (media queries, gradients)
- `base/` — typography and global resets
- `components/` — buttons and tooltips
- `layout/` — footer
- `sections/` — per-section styles (about, contact, experience, hero, projects, skills)

**Webpack** is a single `webpack.config.js` using a factory function (`(env, argv) => ...`) that branches on `argv.mode`. Dev uses `style-loader` for inline styles; prod uses `MiniCssExtractPlugin` to extract a separate CSS file with content hashes.

**ScrollReveal** is loaded via CDN in `template.html` (not npm) and called as a global — `sr.js` configures reveal animations per section class. The tilt.js 3D hover effect is initialized directly in `index.js` on `.project-wrapper__image a div` elements (requires the `data-tilt` attribute in HTML).

## Section color system

Sections alternate purple/white using a clip-path + negative-margin overlap pattern:

| Section | Color | Technique |
|---|---|---|
| About | purple gradient | `clip-path` diagonal cut at bottom, `padding-bottom: 15%` |
| Experience | white | `margin-top: -10rem; padding-top: 15rem` to overlap About's clip |
| Skills | purple gradient | `clip-path` diagonal cut at bottom, `padding-bottom: 10%` |
| Projects | white | `margin-top: -10rem; padding-top: 15rem` to overlap Skills' clip |
| Contact | purple gradient | `clip-path` diagonal cut at top, `margin-top: -10rem` |

On tablet/phone (`tab-land` breakpoint), clip-paths are removed and negative margins reset to 0.

**Section titles:** use `class="section-title dark-blue-text"` on white sections, plain `class="section-title"` on purple sections (defaults to white via `color` inheritance).

**Buttons on purple sections:** use `cta-btn--resume` (white border/text). **Buttons on white sections:** use `cta-btn--hero` (purple gradient border, fills on hover). Using `cta-btn--resume` on a white background makes it invisible.

## CSS pitfalls

- `html { font-size: 62.5% }` makes `1rem = 10px`. Only `p`, `li`, and `a` are explicitly set to `$default-font-size` (1.6rem). Other elements (`span`, `div` text, etc.) inherit 10px from the root — add `font-size: $default-font-size` explicitly if needed.
- Never wrap `<ul>` inside `<p>`. Browsers auto-close `<p>` when they encounter `<ul>`, breaking CSS class inheritance on the list. Put classes directly on the `<ul>` element.
- Node 20 is required (`nvm use 20`). The `sass` package (Dart Sass) does not support older Node versions.
- Pushing to `master` triggers an automatic Netlify production deploy (`npm run build` → `dist/`).
