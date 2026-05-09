import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rissala.net";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rissala | Sciences Islamiques & Arabe",
  description:
    "Plateforme premium de sciences islamiques : apprendre l'arabe, fiqh, aqida et finance islamique.",
  verification: {
    google: "g0SbH6Uv0UaRtCHKt7uTqQZqFFXKMdSaNt5mspGuR9A",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rissala | Sciences Islamiques & Arabe",
    description:
      "Plateforme premium de sciences islamiques : apprendre l'arabe, fiqh, aqida et finance islamique.",
    url: siteUrl,
    siteName: "Rissala",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rissala | Sciences Islamiques & Arabe",
    description:
      "Plateforme premium de sciences islamiques : apprendre l'arabe, fiqh, aqida et finance islamique.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
