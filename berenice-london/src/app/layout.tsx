import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
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

// Generate structured data for the organization
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
        {/* Critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold CSS */
            * { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            body {
              margin: 0;
              font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1c1917;
              background: linear-gradient(135deg, #fef3c7, #fed7aa);
              min-height: 100vh;
            }
            .loading-spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #f3f3f3;
              border-top: 3px solid #b45309;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .nav-loading { height: 4rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); }
            .hero-loading { min-height: 80vh; background: linear-gradient(135deg, #fef3c7, #fed7aa); }
          `
        }} />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme and Brand Colors */}
        <meta name="theme-color" content="#b45309" />
        <meta name="msapplication-TileColor" content="#b45309" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* DNS Prefetch and Preconnect */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//js.stripe.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Performance Hints */}
        <link rel="preload" href="/images/hero-background.jpg" as="image" type="image/jpeg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema, null, 2)
          }}
        />

        {/* Google Analytics (replace with your GA4 ID) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {/* Microsoft Clarity (optional) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
          `}
        </Script>

        {/* Schema.org Breadcrumb Script (will be populated by pages) */}
        <script id="breadcrumb-schema" type="application/ld+json"></script>
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>

        {/* Load Same Runtime */}
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
