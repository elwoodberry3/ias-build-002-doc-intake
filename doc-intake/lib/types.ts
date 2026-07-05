/**
 * lib/types.ts
 * Shape of the per-build configuration. Do not edit per build —
 * edit build.config.ts instead. Changes here propagate to all
 * builds on the next template sync.
 */

export type BuildStatus = "live" | "prototype" | "preview";

export interface ArchitectureLayer {
  layer: string;
  technology: string;
  responsibility: string;
}

export interface BuildConfig {
  buildNumber: string;
  name: string;
  sector: string;
  tagline: string;
  status: BuildStatus;
  whatItDoes: string[];
  stack: string[];
  architecture: {
    diagramSrc: string | null;
    diagramAlt: string;
    layers: ArchitectureLayer[];
    flow: string[];
  };
  payload: {
    caption: string;
    input: Record<string, unknown>;
    output: Record<string, unknown>;
  };
  demo: {
    embedUrl: string | null;
    videoUrl: string | null;
    note: string;
  };
  links: {
    github: string;
    portfolio: string;
    booking: string;
  };
}

/** Status chip presentation map — single source of truth. */
export const STATUS_META: Record<
  BuildStatus,
  { label: string; tone: "accent" | "secondary" | "muted" }
> = {
  live: { label: "LIVE DEMO", tone: "accent" },
  prototype: { label: "INTERACTIVE PROTOTYPE", tone: "secondary" },
  preview: { label: "ARCHITECTURE PREVIEW — BUILD IN PROGRESS", tone: "muted" },
};

/** True when a config string is an unfilled placeholder. */
export const isTodo = (v: unknown): boolean =>
  typeof v === "string" && v.trim().toUpperCase().startsWith("TODO");
