# Adding a Build — Checklist

Target: template clone → live public link in under one hour
(excluding diagram/payload authoring).

## 1. Create the repo
- [ ] GitHub → `ias-build-template` → **Use this template**
- [ ] Name: `ias-build-NNN-slug` (matches projects.csv `repository_name`)
- [ ] Org: `elwoodberry3` · Visibility: **public** (demo code only —
      licensed client versions go in a separate private repo)

## 2. Fill build.config.ts (the only file you edit)
- [ ] `buildNumber` — zero-padded, matches repo name
- [ ] `name`, `sector` — from projects.csv
- [ ] `tagline` — projects.csv `primary_description`, verbatim
- [ ] `status` — honest current state (`preview` is fine)
- [ ] `whatItDoes` — 3–4 paragraphs from `repository_description`, expanded
- [ ] `stack` — actual stack, no aspirational entries
- [ ] `architecture.layers` — 3–4 rows, real responsibilities
- [ ] `architecture.flow` — the actual data flow, in order
- [ ] `payload.input` / `payload.output` — production schema, mock values
- [ ] `links.github` — this repo's URL
- [ ] Search the file for `TODO:` — anything left renders as a visible
      flag on the page (by design)

## 3. Assets
- [ ] Architecture diagram → `/public/diagrams/` and set `diagramSrc`
      (or leave `null` — table renders alone)
- [ ] n8n export → `/workflows/` (credentials stripped) when it exists

## 4. README
- [ ] Update title, status line, live link, description to match config
- [ ] Confirm the 90-second test: link → status → what → diagram → stack,
      all visible without scrolling past the fold on GitHub

## 5. Deploy
- [ ] Vercel → Import Git Repository → this repo
- [ ] Framework preset: Next.js (auto-detected; static export)
- [ ] Domains → add `{slug}.elwoodberry.com`
- [ ] DNS: CNAME `{slug}` → `cname.vercel-dns.com` (skip if wildcard exists)
- [ ] Verify HTTPS resolves; click every link on the live page

## 6. Wire the portfolio
- [ ] projects.csv — confirm `url` and `gitub_url` rows match reality
- [ ] Wix demo card links out to the production subdomain

## Status upgrades (later)
`preview` → `prototype` → `live`. One line in build.config.ts,
push to main, auto-deploys. Set `demo.embedUrl` or `demo.videoUrl`
only when the demo is genuinely runnable/watchable.
