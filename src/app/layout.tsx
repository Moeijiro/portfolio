import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionRoot } from "@/components/reveal";
import { asset, site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [
    "Python developer", "full-stack developer", "FastAPI developer", "Next.js developer", "API developer",
    "automation developer", "Discord bot developer", "API integrations", "freelance Python developer",
  ],
  authors: [{ name: site.name, url: site.github }],
  icons: { icon: asset("/icon.svg") },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: [{ url: "og/home.png", width: 1200, height: 630, alt: `${site.name} · ${site.role}` }],
  },
  twitter: { card: "summary_large_image", images: ["og/home.png"] },
};

export const viewport: Viewport = { themeColor: "#07080a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: [site.github, site.linkedin].filter(Boolean),
    knowsAbout: ["Python", "FastAPI", "REST APIs", "Automation", "Discord bots", "Next.js", "React", "TypeScript", "WebSockets"],
  };
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-50 rounded-md bg-fg px-3 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <MotionRoot>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionRoot>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
