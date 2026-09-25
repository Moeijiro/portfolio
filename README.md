# Portfolio

The source of **[moeijiro.github.io/portfolio](https://moeijiro.github.io/portfolio/)**: the portfolio of a Python and
full-stack developer who builds APIs, automation platforms, Discord systems and full-stack products.

![Portfolio home page](public/og/home.png)

It presents 17 open-source projects. The homepage is built to be scanned in a few seconds: who, what, the stack, five
featured projects and a contact link. The depth lives one click away. The nine flagship projects each get a case study
(problem, solution, screenshots, architecture diagram, features, technical decisions, a real code excerpt, security and
testing notes where relevant, and how to run them), and the About page keeps the engineering principles, the system
diagram and the stack counted per repository.

Totals shown on the site (project count, test count, per-category counts) are computed from `src/content/projects.ts`
at build time, never typed in.

## How it's built

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), static export (`output: "export"`) |
| UI | React 19, TypeScript, Tailwind CSS v4, Motion |
| Code excerpts | Shiki, highlighted at build time — no highlighter shipped to the browser |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` |

- **Cards answer three questions.** Each project has a plain-language `pitch` (what it is) and `why` (what makes it
  interesting), plus its stack; the backend detail stays in the case study.
- **Architecture diagrams are data.** Each project's diagram is a list of columns and edges in
  `src/content/projects.ts`; `src/components/diagram.tsx` lays it out horizontally on wide screens and vertically on
  phones, and animates packets along the edges (switched off under `prefers-reduced-motion`).
- **Nothing is invented.** Project text comes from each repository's README and code. Code excerpts are copied from the
  repositories by `scripts/excerpts.mjs` and link to the exact lines at a pinned commit. Test counts are collected with
  `pytest --collect-only`. Screenshots are the repositories' own `docs/screenshots`, converted to WebP by
  `scripts/images.mjs`.
- **Social images** (`public/og/*.png`, 1200×630) and the LinkedIn banner (1584×396) are rendered by
  `scripts/og.mjs` with headless Chrome from the same screenshots (`ONLY=home,studyraid` renders a subset;
  `FONTS_DIR=` points at local Geist files to render offline).

```
src/
  app/                 routes: /, /projects, /projects/[slug], /services, /about, /contact, sitemap, robots
  components/          project cards and filter, diagram, code excerpt, header/footer
  content/             projects.ts (all project data), home.ts (featured list, capabilities, stack), excerpts.json (generated)
scripts/               excerpts.mjs · images.mjs · og.mjs
public/shots/          WebP screenshots per repository
public/og/             social images
```

## Running locally

```bash
npm ci
npm run dev            # http://localhost:3000/portfolio
npm run build          # static site in out/
```

`BASE_PATH` controls the sub-path (default `/portfolio`); set `BASE_PATH=""` to serve from a domain root.

Regenerating content from local clones of the project repositories:

```bash
SRC=../ node scripts/excerpts.mjs
SRC=../ node scripts/images.mjs
node scripts/og.mjs
```

## Checks

- `npm run lint` and `npm run build` run in CI before every deploy.
- Every page is checked at 375, 768 and 1440 px for horizontal overflow; interactive elements are keyboard reachable,
  the diagram has a text alternative, and motion respects `prefers-reduced-motion`. Scroll reveals only hide content
  after hydration, so the static HTML is fully readable without JavaScript.

## License

Code: MIT. Project screenshots and text describe the author's own open-source repositories.
