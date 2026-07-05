# Deploy This Project to Vercel

**Build 002 — Document Ingestion & Analysis** · target: a public URL in ~15 minutes

This guide assumes a brand-new Vercel account with zero projects. You'll connect your Git provider, import this repository, deploy it, and (optionally) attach a custom domain. No prior Vercel experience is assumed; if you've done this before, steps 5–7 are the only parts specific to this project.

> **Note on UI labels:** Vercel iterates on its dashboard frequently. Button labels below may differ slightly from what you see; the flow itself is stable.

---

## Prerequisites

- A [Vercel account](https://vercel.com) (the free Hobby tier is fine for evaluation)
- This repository pushed to a Git provider Vercel supports — GitHub, GitLab, or Bitbucket (this guide uses GitHub)
- That's it. You do **not** need Node.js locally, the Vercel CLI, or any build tooling — Vercel builds the project from source on its own infrastructure.

Why no local build: this project is a Next.js static export. Vercel detects the framework, runs `next build`, and serves the output from its CDN. Your machine is never in the deploy path — which is the point (see `DEPLOYMENT.md` for the philosophy).

---

## Step 1 — Connect your Git provider

1. Log in at [vercel.com](https://vercel.com). With no projects, your dashboard shows **Import Project — "Add a repo from your git provider."** Click it.
2. Choose **GitHub** (or your provider). A GitHub authorization window opens.
3. GitHub asks where to install the Vercel app. Recommended: **Only select repositories** → choose this repo (`ias-build-002-doc-intake`). Granting access to all repositories works too, but least-privilege is the better habit — you can widen access later in one click.
4. Click **Install**. You're returned to Vercel with the repository now listed.

If the repo doesn't appear: it usually means the Vercel GitHub App was installed on your personal account but the repo lives in an organization (or vice versa). Click **Adjust GitHub App Permissions** and install it on the right owner.

## Step 2 — Import the repository

1. Find `ias-build-002-doc-intake` in the list and click **Import**.
2. Vercel shows the **Configure Project** screen. Verify three things:
   - **Framework Preset:** `Next.js` — detected automatically. If it shows anything else, select Next.js manually.
   - **Root Directory:** `./` — the project lives at the repo root; don't change this.
   - **Build & Output Settings:** leave every override **off**. The defaults (`next build`) are correct; the static export is configured inside `next.config.mjs`, so Vercel needs no special instruction.

## Step 3 — Environment variables (read before skipping)

The **Environment Variables** section on the same screen is where the page's webhook connection is configured:

| Name | Value | Needed now? |
| --- | --- | --- |
| `N8N_WEBHOOK_URL` | your n8n webhook endpoint | **No** — only when wiring a live demo |
| `N8N_WEBHOOK_TOKEN` | the matching header-auth token | **No** — same |

At `preview` status the page is fully self-contained — architecture, payloads, and copy all render from `build.config.ts` with no external calls. **You can deploy with zero environment variables** and add these later (Project → Settings → Environment Variables) without re-importing anything.

Two rules if you do set them, now or later:

- Scope them per environment (Production vs. Preview) — staging and production must never share a webhook token.
- Never commit values to the repo. `.env.local` is git-ignored for exactly this reason.

## Step 4 — Deploy

1. Click **Deploy**.
2. Watch the build log if you're curious — you'll see dependency install, `next build` with TypeScript strict-mode compilation, and static page generation. First build takes 1–2 minutes.
3. On success, Vercel shows a congratulations screen with your live URL: `https://ias-build-002-doc-intake-<something>.vercel.app`.

**Verify before calling it done** — open the URL and check:

1. The page renders with the dark hero, build badge, and status chip.
2. Fonts loaded correctly (headings should be Space Grotesk, code blocks Space Mono — if you see a generic font, hard-refresh once).
3. No visible `TODO:` warning flags — unless expected. This project renders unfilled config values as visible flags **by design**; if you see one, it's telling you the config needs attention, not that the deploy failed.
4. All three footer links resolve (GitHub, portfolio, booking).

If the build fails instead: the log tells you why, and the most common cause is a TypeScript error in `build.config.ts` — the config is strictly typed on purpose, so a malformed edit fails at build time rather than rendering broken. Fix, push, and Vercel rebuilds automatically.

## Step 5 — What you now have (automatic, no setup)

Importing the repo wired up Vercel's Git integration. From this point forward:

- **Every push to `main` deploys to production** automatically.
- **Every push to any other branch creates a Preview Deployment** with its own unique URL, posted to the pull request. This is the review artifact — an exact production build of the change.
- **Every deployment is immutable and keeps its URL forever**, which is what makes rollback instant: Project → Deployments → previous deployment → **Promote to Production** (or "Instant Rollback," depending on dashboard version).

## Step 6 — Custom domain (optional)

To serve this at `doc-intake.elwoodberry.com` instead of the `.vercel.app` URL:

1. Project → **Settings → Domains** → enter `doc-intake.elwoodberry.com` → **Add**.
2. Vercel shows the DNS record it needs. For a subdomain that's a **CNAME**: name `doc-intake`, value `cname.vercel-dns.com`.
3. Add that record at your DNS provider for `elwoodberry.com`.
4. Back in Vercel, the domain flips to **Valid** once DNS propagates (usually minutes, occasionally up to an hour). TLS certificates issue and renew automatically — there is nothing to configure or maintain.

The `.vercel.app` URL keeps working alongside the custom domain.

## Step 7 — Staging branch (optional, recommended)

To match the environment model in `DEPLOYMENT.md`:

1. Create and push a `staging` branch: `git checkout -b staging && git push -u origin staging`.
2. Vercel automatically gives the branch a stable domain of the form `<project>-git-staging-<team>.vercel.app` — a fixed URL that always shows the tip of `staging`.
3. Promotion becomes: feature branch → PR (review the preview URL) → merge to `staging` (run the pre-release checklist in `DEPLOYMENT.md` §5) → merge to `main` (production).

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Repo not listed at import | Vercel GitHub App installed on the wrong owner | Adjust GitHub App permissions; install on the org/account that owns the repo |
| Build fails on type errors | Edited `build.config.ts` doesn't match the `BuildConfig` type | Read the log — it names the exact field; fix and push |
| Page renders but looks unstyled | Ad-blocker or network blocking Google Fonts | Hard refresh; confirm fonts.googleapis.com isn't blocked |
| Domain stuck on "Invalid Configuration" | CNAME not added, or added at the wrong provider/zone | Verify the record exists with `dig doc-intake.elwoodberry.com CNAME` |
| Visible yellow `TODO:` flag on the page | Intentional — an unfilled config value | Fill the value in `build.config.ts`, push; it's a content gate, not a bug |

## Done-state checklist

- [ ] Deployment shows **Ready** in the Vercel dashboard
- [ ] Live URL renders correctly on desktop and a phone
- [ ] Push-to-deploy verified (push a trivial change to a branch; confirm a preview URL appears)
- [ ] (If configured) custom domain shows **Valid** with HTTPS
- [ ] (If configured) `staging` branch has its stable URL

Total time from empty account to public URL: about 15 minutes, most of it waiting on the first build and DNS.

---

*Next documents in this set: `README.md` — recreate the full demo including the n8n workflow · `DEPLOYMENT.md` — the environment model, promotion path, and rollback strategy this deploy plugs into.*
