import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { HydrationBoundary } from "@/components/HydrationBoundary";
import { generateMetadata as createSEOMetadata, generateOrganizationSchema, generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createSEOMetadata({
  title: "Berenice London | Premium Hair Solutions",
  description: "Expert craftsmanship in bespoke wigs, hairpieces, and professional hair education. Transforming lives through exceptional hair solutions with over 20 years of expertise in London.",
  keywords: [
    "bespoke wigs London",
    "premium hair solutions",
    "custom hairpieces",
    "professional wig making",
    "hair loss solutions",
    "medical wigs",
    "alopecia wigs",
    "cancer patient wigs",
    "theatrical wigs",
    "hair education courses",
    "wig consultation London"
  ],
  path: "/",
});

const organizationSchema = generateOrganizationSchema();
const localBusinessSchema = generateLocalBusinessSchema();
const websiteSchema = generateWebsiteSchema();

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    localBusinessSchema,
    websiteSchema
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} ${geistMono.variable}`}>
       <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            body {
              margin: 0;
              font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f4f4f4;
              min-height: 100vh;
            }
          `
        }} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content="#b45309" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema, null, 2)
          }}
        />

        <HydrationBoundary>
          <Analytics />
        </HydrationBoundary>
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
