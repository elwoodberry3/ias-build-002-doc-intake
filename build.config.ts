/**
 * build.config.ts — BUILD 002 · Document Ingestion & Analysis
 * ─────────────────────────────────────────────────────────────
 * Repo: ias-build-002-doc-intake
 * URL:  doc-intake.elwoodberry.com
 * Sector: Legal & Compliance Services
 *
 * THE ONLY FILE EDITED FOR THIS BUILD.
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
  buildNumber: "002",
  name: "Document Ingestion & Analysis",
  sector: "Legal & Compliance Services",

  // Verbatim from projects.csv (primary_description) —
  // site + CSV + repo never drift.
  tagline:
    "Splits immense PDF bundles, extracts key data via AI, and auto-sorts contracts, leases, and evidence packets into the right queue.",

  // ── Status (honest, always) ──────────────────────────────
  // Upgrade path: "preview" → "prototype" → "live" as the
  // deep-build ships. One word, push to main, auto-deploys.
  status: "preview",

  // ── What it does ─────────────────────────────────────────
  whatItDoes: [
    "Law firms and compliance teams receive discovery bundles, lease packages, and evidence sets as single massive PDFs. Someone splits them, reads them, and files them by hand.",
    "This pipeline does all three: n8n splits the bundle into individual documents, an LLM extracts key entities against a fixed schema, and each document routes to its correct downstream queue automatically.",
    "Every action writes to an audit trail, so the sorting decision is always traceable back to the extracted evidence.",
  ],

  // ── Stack ────────────────────────────────────────────────
  stack: ["n8n", "OpenAI API", "Next.js", "Vercel"],

  // ── Architecture ─────────────────────────────────────────
  architecture: {
    // Real diagrams only. Stays null until one is drawn —
    // the page renders the system-map table alone.
    diagramSrc: null,
    diagramAlt: "TODO: describe the diagram for screen readers",

    layers: [
      {
        layer: "Presentation",
        technology: "Next.js on Vercel",
        responsibility:
          "Build page, document upload UI, status and payload rendering",
      },
      {
        layer: "Orchestration",
        // Demos run on n8n Cloud. The identical workflows deploy
        // self-hosted or in a client's VPC for regulated
        // production — the /workflows export is the portable
        // artifact. Never state "self-hosted" as current fact.
        technology: "n8n (cloud-hosted)",
        responsibility:
          "PDF bundle splitting, schema-validated LLM extraction, classification, queue routing",
      },
      {
        layer: "Data",
        // Storage + queue selection pending deep-build.
        // Stated uncertainty beats invented detail.
        technology: "TODO: object storage + queue selection pending deep-build",
        responsibility:
          "TODO: document storage, extraction records, routing queues, audit log",
      },
      {
        layer: "AI",
        technology: "OpenAI API (schema-validated calls)",
        responsibility:
          "Entity extraction and document classification from split PDFs",
      },
    ],

    // Numbered because order carries meaning — this is the
    // sequence a document actually travels.
    flow: [
      "Bundle uploaded via the demo page fires the intake request",
      "n8n webhook receives the file reference and opens an audit record",
      "PDF bundle is split into individual documents",
      "LLM extracts entities from each document against a fixed schema",
      "Each document is classified and routed to its downstream queue",
      "Audit record is finalized and the structured result returns to the page",
    ],
  },

  // ── Sample payload ───────────────────────────────────────
  // Real production schema, mock values, labeled as mock.
  payload: {
    caption: "// mock data — representative of production schema",
    input: {
      event: "doc.bundle.received",
      submitted_at: "2026-07-05T14:12:00Z",
      source: "doc-intake.elwoodberry.com",
      fields: {
        filename: "discovery-bundle-0347.pdf",
        pages: 182,
        matter_ref: "MOCK-2026-0113",
      },
    },
    output: {
      status: "processed",
      confidence: 0.94,
      routed_to: "queue:contracts-review",
      audit_id: "ias-demo-002-0001",
    },
  },

  // ── Live demo slot ───────────────────────────────────────
  // Renders only when a real demo exists. Demo Mode (cached
  // representative responses) is the default for public
  // traffic — protects demo reliability and n8n Cloud
  // execution quota.
  demo: {
    embedUrl: null,
    videoUrl: null,
    note: "Demo Mode serves cached representative responses to public traffic; live mode is enabled per session.",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    github: "https://github.com/elwoodberry3/ias-build-002-doc-intake",
    portfolio: "https://www.elwoodberry.com", // TODO: confirm portfolio root URL
    // TODO: confirm /contact is the persona-routed booking page,
    // not a generic contact form, before deep-build ships.
    booking: "https://elwoodberry.com/contact",
  },
};