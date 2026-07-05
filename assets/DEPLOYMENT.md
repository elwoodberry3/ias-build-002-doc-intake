# DEPLOYMENT

**Build 002 — Document Ingestion & Analysis** · `doc-intake.elwoodberry.com` · Hosted on Vercel

This document describes how the demo is deployed: the environment model, the promotion path from a commit to production, how configuration and secrets are separated per environment, and how rollback works. It closes with an honest mapping of what stays the same and what changes when this discipline scales to an enterprise setting.

The one-sentence philosophy: **deployments are immutable artifacts promoted through environments by merge — never by hand.** Nothing reaches production that didn't exist first as a reviewable preview URL.

---

## 1. What gets deployed

The demo page is a Next.js 14 static export (`output: "export"` in `next.config.mjs`). The build compiles to plain HTML/CSS/JS with no server runtime, which shapes the whole deployment story:

- There is no server to patch, scale, or monitor for the page itself. The attack and failure surface of the presentation layer is a set of static files on a CDN.
- All dynamic behavior lives in the n8n workflow behind an authenticated webhook. The page and the workflow deploy independently and are versioned independently — a deliberate separation, because their change cadence is different.
- The entire per-build content surface is `build.config.ts`, so most production changes are content changes, and every content change still flows through the same promotion path as a code change. There is no side door.

## 2. Environment model

Three environments, mapped to Git in the standard Vercel pattern:

| Environment | Git ref | URL | Purpose |
| --- | --- | --- | --- |
| Development | any feature branch | local `:3000` + per-push Preview URL | Active work; every push gets an immutable, shareable preview deployment |
| Staging | `staging` branch | fixed branch domain (`ias-build-002-doc-intake-staging.vercel.app`) | Pre-production verification against the staging workflow |
| Production | `main` | `doc-intake.elwoodberry.com` | Public |

Notes on the model:

- **Every push to any branch produces a full preview deployment** with a unique URL — an exact production build, not a simulation of one. Review happens against the real artifact, which eliminates the "worked in dev" class of surprise.
- **Staging is a persistent branch domain**, so there is always one stable URL that answers "what is about to ship?" Stakeholder review, link checking, and the pre-release checklist all run there.
- **Production only moves when `main` moves.** No manual uploads, no direct file edits, no exceptions — including for one-line copy fixes.

## 3. Promotion path

The path from change to production, in order:

1. Branch from `main` (`feat/...`, `fix/...`, `content/...`).
2. Push. Vercel builds and posts the preview URL. The build itself is the first quality gate — `next build` runs the TypeScript compiler in strict mode, so a config edit that breaks the `BuildConfig` contract fails here, before any human looks at it.
3. Open a pull request. Review happens against the preview URL and the diff together. Two things get checked that CI can't: copy accuracy against `projects.csv`, and the page rendered visually against the brand system.
4. Merge to `staging`. Run the pre-release checks (section 5) against the staging URL, with the staging webhook wired in.
5. Merge `staging` to `main`. Vercel deploys, aliases the production domain, done. Elapsed time from merge to live is typically under two minutes.

A governance behavior inherited from the template is load-bearing here: **unfilled `TODO:` config values render visibly on the page.** Incomplete content cannot pass a staging review by being invisible — it announces itself on the staging URL. The honesty mechanism doubles as a release gate.

## 4. Configuration and secrets

Environment variables are scoped per environment in Vercel's project settings (Development / Preview / Production) and are never committed. `.env.local` is git-ignored; `.env.example` documents the required names with no values.

| Variable | Development / Preview | Production |
| --- | --- | --- |
| `N8N_WEBHOOK_URL` | staging workflow endpoint | production workflow endpoint |
| `N8N_WEBHOOK_TOKEN` | staging-only token | production token, distinct value |

Three rules, uniformly applied:

- **Staging never holds production credentials.** The staging page talks to a staging copy of the workflow with its own token. A leaked preview URL exposes nothing that touches production.
- **Tokens are distinct per environment and rotated on any suspicion of exposure.** Rotation is a two-minute operation: update the n8n header auth and the Vercel env var, redeploy.
- **The client bundle contains no secrets.** The static page posts to the webhook; the webhook enforces header auth and the n8n side enforces rate limiting. Anything that must remain private stays on the workflow side of the boundary.

## 5. Pre-release checklist (staging)

Run against the staging URL before every production promotion. Deliberately short — a checklist people actually run beats a comprehensive one they skip:

1. Page renders with zero visible `TODO:` flags.
2. Status chip reflects reality (`preview` / `prototype` / `live`) — the chip is a claim, and claims get verified.
3. Every link resolves: GitHub repo, portfolio, booking page.
4. Payload section matches the current workflow's actual schema.
5. If a demo embed is configured: one full end-to-end run against the staging workflow.
6. Lighthouse spot-check on performance and accessibility — the static export should hold high scores by construction; a regression means something structural changed and gets investigated, not waved through.

## 6. Rollback and failure modes

Every Vercel deployment is immutable and permanently addressable. Rollback is therefore **re-pointing the production alias to the previous deployment** — one action in the dashboard or `vercel rollback` from the CLI, effective in seconds, no rebuild. The bad deployment stays available at its unique URL for diagnosis.

Failure modes, separated by layer:

- **Page failure** (build regression, broken asset): rollback as above. Because the page is static, partial failure states barely exist — it deploys atomically or not at all.
- **Workflow failure** (n8n side): the page degrades gracefully to Demo Mode, which serves cached real outputs of the real workflow. Public visitors see a working demonstration while the live path is repaired. The two layers failing independently — and being repaired independently — is the payoff of keeping them separate.
- **DNS/TLS**: certificates are provisioned and renewed automatically by Vercel; the CNAME is the only manually-managed record.

## 7. Scaling this to an enterprise setting

This is a single-developer portfolio demo deployed with production discipline. Stating plainly what that means: the *practices* above are the same ones that operate at Fortune 500 scale; the *controls around the practices* are right-sized for one operator, and here is exactly what changes when they aren't:

| Concern | This demo | Enterprise equivalent |
| --- | --- | --- |
| Review | PR discipline, self-reviewed against preview URL | Required reviewers + CODEOWNERS; no self-merge to protected branches |
| CI | Vercel build as the gate (typecheck, compile) | Dedicated CI (lint, typecheck, unit/e2e tests, SAST, dependency audit) must pass before Vercel builds |
| Access | Personal Vercel account, 2FA | SSO/SCIM, role-based access, deployment protection on previews, audit logs |
| Infrastructure config | Dashboard-managed | Terraform-managed Vercel project — environment config reviewed as code |
| Change management | This document + PR history | Ticketed changes, release notes, defined maintenance windows for the workflow layer |
| Workflow environments | Staging + production workflows on one n8n instance | Isolated instances (or VPC-deployed self-hosted n8n) per environment, separate credential stores, promotion via exported workflow artifacts in Git |
| Observability | Vercel analytics + n8n execution logs | Centralized logging, uptime monitoring with alerting, SLOs on the webhook path |

The through-line: none of the enterprise column requires re-architecting anything above. Immutable deployments, environment-scoped secrets, merge-gated promotion, and instant rollback are the foundation in both columns — the enterprise version adds enforcement and audit around the same shape. That is the definition of a demo built production-grade: not that it carries every control, but that adopting the controls requires adding, not undoing.

---

*Related: `README.md` (recreating the demo end to end) · `docs/ADDING_A_BUILD.md` (template operations) · `/workflows` (n8n export, the deployable artifact for the orchestration layer).*
