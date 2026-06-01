"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const localePrefix = /^\/(fr|en|ar)(\/|$)/;

export function LanguageSwitcher({ variant = "inline" }: { variant?: "inline" | "dropdown" }) {
  const pathname = usePathname() ?? "/";
  const match = pathname.match(localePrefix);
  const currentLang = (match?.[1] as Locale) ?? "fr";
  const suffix = match
    ? pathname.replace(localePrefix, "/").replace(/^\/$/, "") || ""
    : pathname === "/"
      ? ""
      : pathname;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

  if (variant === "dropdown") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="h-4 w-4" />
          <span>{localeLabels[currentLang]}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-lg overflow-hidden z-50 p-1"
            >
              <div className="flex flex-col gap-0.5">
                {displayedLocales.map((lang) => (
                  <Link
                    key={lang}
                    href={hrefFor(lang)}
                    hrefLang={lang}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-between ${
                      lang === currentLang
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {localeLabels[lang]}
                    {lang === currentLang && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
