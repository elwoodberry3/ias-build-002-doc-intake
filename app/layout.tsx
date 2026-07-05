import type { Metadata } from "next";
import { buildConfig } from "@/build.config";
import "./globals.css";

/**
 * Page metadata derives from build.config.ts — title, description,
 * and OpenGraph all stay in sync with the page content automatically.
 */
export const metadata: Metadata = {
  title: `Build ${buildConfig.buildNumber} — ${buildConfig.name} · I Automate Shit`,
  description: buildConfig.tagline,
  openGraph: {
    title: `Build ${buildConfig.buildNumber} — ${buildConfig.name}`,
    description: buildConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Brand fonts loaded via Google Fonts link (matches the
          existing IAS static pages). If/when @ias/tokens ships
          self-hosted fonts, swap this for next/font/local.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
