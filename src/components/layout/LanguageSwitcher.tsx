"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale, getInternalSection, getLocalizedSlug } from "@/lib/i18n";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const localePrefix = /^\/(fr|en|ar)(\/|$)/;

const shortLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
};

const fullNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher({ dropUp = false }: { dropUp?: boolean }) {
  const rawPathname = usePathname() ?? "/";
  // Decode URI component to handle Arabic characters correctly
  const pathname = decodeURIComponent(rawPathname);
  
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
      const parts = suffix.split('/').filter(Boolean);
      if (parts.length > 0) {
        const slug = parts[0];
        const internalSection = getInternalSection(slug, currentLang);
        if (internalSection) {
          parts[0] = getLocalizedSlug(internalSection, lang);
          return `/${lang}/${parts.join('/')}`;
        }
      }
      return `/${lang}${suffix}`;
    }
    return `/${lang}${pathname === "/" ? "" : pathname}`;
  }

  const parts = suffix.split('/').filter(Boolean);
  const slug = parts[0];
  const internalSection = slug ? getInternalSection(slug, currentLang) : undefined;
  const isApprendreArabe = internalSection === "apprendre-arabe";

  const displayedLocales = isApprendreArabe
    ? locales.filter((lang) => lang !== "ar")
    : locales;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border/80 bg-background/80 hover:bg-muted/50 active:scale-[0.98] text-foreground text-xs font-semibold uppercase tracking-wider shadow-xs transition-all select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Changer de langue"
      >
        <span className="w-5 text-center font-bold text-primary">{shortLabels[currentLang]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? -6 : 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? -6 : 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 ${
              dropUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-1.5 origin-top-right"
            } w-36 rounded-xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl z-50 p-1 space-y-0.5`}
          >
            {displayedLocales.map((lang) => {
              const active = lang === currentLang;
              return (
                <Link
                  key={lang}
                  href={hrefFor(lang)}
                  hrefLang={lang}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors font-medium ${
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold w-4 text-center">{shortLabels[lang]}</span>
                    <span className="text-[11px] text-muted-foreground/80 font-normal">{fullNames[lang]}</span>
                  </div>
                  {active && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
