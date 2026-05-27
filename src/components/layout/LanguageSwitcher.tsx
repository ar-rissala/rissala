"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";

const localePrefix = /^\/(fr|en|ar)(\/|$)/;

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const match = pathname.match(localePrefix);
  const currentLang = (match?.[1] as Locale) ?? "fr";
  const suffix = match
    ? pathname.replace(localePrefix, "/").replace(/^\/$/, "") || ""
    : pathname === "/"
      ? ""
      : pathname;

  function hrefFor(lang: Locale): string {
    if (localePrefix.test(pathname)) {
      return `/${lang}${suffix}`;
    }
    return `/${lang}${pathname === "/" ? "" : pathname}`;
  }

  const isApprendreArabe = suffix === "/apprendre-arabe" || suffix.startsWith("/apprendre-arabe/");
  const displayedLocales = isApprendreArabe
    ? locales.filter((lang) => lang !== "ar")
    : locales;

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-muted/30 p-0.5"
      role="navigation"
      aria-label="Language"
    >
      {displayedLocales.map((lang) => (
        <Link
          key={lang}
          href={hrefFor(lang)}
          hrefLang={lang}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
            lang === currentLang
              ? "bg-background text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {localeLabels[lang]}
        </Link>
      ))}
    </div>
  );
}
