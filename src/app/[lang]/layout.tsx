import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/context/AuthContext";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { LangSetter } from "@/components/layout/LangSetter";

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
  title: "Rissala | Fondements & Arabe",
  description:
    "Plateforme premium de fondements : apprendre l'arabe, fiqh, aqida et finance islamique.",
  verification: {
    google: "g0SbH6Uv0UaRtCHKt7uTqQZqFFXKMdSaNt5mspGuR9A",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rissala | Fondements & Arabe",
    description:
      "Plateforme premium de fondements : apprendre l'arabe, fiqh, aqida et finance islamique.",
    url: siteUrl,
    siteName: "Rissala",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/logo-icon.png",
        width: 1200,
        height: 630,
        alt: "Logo Rissala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rissala | Fondements & Arabe",
    description:
      "Plateforme premium de fondements : apprendre l'arabe, fiqh, aqida et finance islamique.",
    images: ["/logo-icon.png"],
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dir = lang === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ConvexClientProvider>
              <LangSetter lang={lang as Locale} />
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </ConvexClientProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
