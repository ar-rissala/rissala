import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, legacySectionRedirects, getInternalSection, type Locale } from "@/lib/i18n";

const localePrefix = /^\/(fr|en|ar)(\/|$)/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  const match = pathname.match(localePrefix);
  if (match) {
    const lang = match[1] as Locale;
    const pathAfterLang = pathname.slice(lang.length + 1); // removes /fr
    
    if (pathAfterLang && pathAfterLang !== "/") {
      const parts = pathAfterLang.split('/').filter(Boolean);
      const slug = parts[0];
      
      const internalSection = getInternalSection(slug, lang);
      if (internalSection && internalSection !== slug) {
        // Rewrite /fr/a-propos to /fr/about internally
        const rewrittenUrl = request.nextUrl.clone();
        parts[0] = internalSection;
        rewrittenUrl.pathname = `/${lang}/${parts.join('/')}`;
        return NextResponse.rewrite(rewrittenUrl);
      }
    }
    return NextResponse.next();
  }

  // Redirect /actualites and /actualites/[slug] to localized versions
  if (pathname === "/actualites") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/actualites`;
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/actualites/")) {
    const slug = pathname.slice("/actualites/".length);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/actualites/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  const legacySections = Object.keys(legacySectionRedirects);
  for (const legacy of legacySections) {
    if (pathname === `/${legacy}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}/${legacySectionRedirects[legacy]}`;
      return NextResponse.redirect(url, 308);
    }
    if (pathname.startsWith(`/${legacy}/`)) {
      const slug = pathname.slice(legacy.length + 2);
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}/${legacySectionRedirects[legacy]}/${slug}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml).*)"],
};
