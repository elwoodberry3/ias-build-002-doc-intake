/**
 * build.config.ts
 * ─────────────────────────────────────────────────────────────
 * THE ONLY FILE YOU EDIT PER BUILD.
 *
 * Clone the template → fill this file → add a diagram to
 * /public/diagrams → deploy. Everything on the page renders
 * from this object.
 *
 * Governance (Article IX): no fabricated data. Every unknown
 * value stays as an explicit "TODO:" string — the page renders
 * TODO values in a visible warning style so they cannot ship
 * silently.
 * ─────────────────────────────────────────────────────────────
 */

import type { BuildConfig } from "./lib/types";

export const buildConfig: BuildConfig = {
  // ── Identity ─────────────────────────────────────────────
  buildNumber: "000", // e.g. "002" — matches ias-build-NNN-slug
  name: "IAS Build Template",
  sector: "Infrastructure", // e.g. "Legal & Compliance Services"

  // One-line description. Pull verbatim from projects.csv
  // (primary_description) so site + CSV + repo never drift.
  tagline:
    "The shared demo shell every IAS build deploys from — one config file drives the entire page.",

  // ── Status (honest, always) ──────────────────────────────
  // "live"      → ● LIVE DEMO            (working end-to-end demo)
  // "prototype" → ● INTERACTIVE PROTOTYPE (partial working demo)
  // "preview"   → ● ARCHITECTURE PREVIEW  (design + payloads only)
  status: "preview",

  // ── What it does (3–4 short paragraphs max) ──────────────
  // Direct, technical, zero buzzwords. Expand the
  // repository_description from projects.csv.
  whatItDoes: [
    "This is the reference deployment of the IAS build template. Each of the nineteen portfolio builds is a clone of this repo with one config file changed.",
    "The template enforces the IAS design token system, an honest status chip, an architecture section, and a real sample payload on every build page — so no build ships as a bare claim.",
    "TODO: replace with build-specific copy.",
  ],

  // ── Stack ────────────────────────────────────────────────
  stack: ["Next.js", "n8n", "TypeScript", "Vercel"],

  // ── Architecture ─────────────────────────────────────────
  architecture: {
    // Path under /public. Set to null until a real diagram
    // exists — the section then renders the layer table only.
    diagramSrc: null, // e.g. "/diagrams/flow.svg"
    diagramAlt: "TODO: describe the diagram for screen readers",

    // System map — same format as the Claims prototype scope doc.
    layers: [
      {
        layer: "Presentation",
        technology: "Next.js on Vercel",
        responsibility: "Build page, demo UI, status + payload rendering",
      },
      {
        layer: "Orchestration",
        technology: "n8n (self-hosted)",
        responsibility: "TODO: workflow responsibilities for this build",
      },
      {
        layer: "Data",
        technology: "TODO: data layer",
        responsibility: "TODO: what is stored and where",
      },
      {
        layer: "AI",
        technology: "TODO: model/API",
        responsibility: "TODO: extraction / reasoning / classification steps",
      },
    ],

    // Numbered data flow — order carries information here,
    // so numbering is structurally justified.
    flow: [
      "User action on the demo page fires a request to the intake endpoint",
      "TODO: step 2",
      "TODO: step 3",
      "Results render back on the page with the full structured output",
    ],
  },

  // ── Sample payload (the Phase-1 'demonstrate' artifact) ──
  // Real schema, mock values, always labeled as mock.
  payload: {
    caption: "// mock data — representative of production schema",
    input: {
      event: "demo.request",
      submitted_at: "2026-07-04T00:00:00Z",
      source: "build-template.elwoodberry.com",
      fields: { note: "TODO: representative input for this build" },
    },
    output: {
      status: "processed",
      confidence: 0.97,
      routed_to: "TODO: downstream queue/system",
      audit_id: "ias-demo-000-0001",
    },
  },

  // ── Live demo slot (optional) ────────────────────────────
  // Only set when a real demo exists. Never point this at a
  // mock-up pretending to be live.
  demo: {
    embedUrl: null, // e.g. an iframe-able demo route
    videoUrl: null, // e.g. a recorded walkthrough (YouTube)
    note: "Demo Mode serves cached representative responses to public traffic; live mode is enabled per session.",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    github: "https://github.com/elwoodberry3/ias-build-template",
    portfolio: "https://www.elwoodberry.com", // TODO: confirm portfolio root URL
    booking: "https://www.elwoodberry.com/book-a-call", // TODO: confirm dedicated booking page URL
  },
};
