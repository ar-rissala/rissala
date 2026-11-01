from urllib.parse import unquote

from django.http import HttpRequest, HttpResponse, HttpResponsePermanentRedirect, HttpResponseRedirect
from django.utils import translation

from .i18n import DEFAULT_LOCALE, LEGACY_ROOT_REDIRECTS, LOCALES, is_rtl_lang, normalize_lang

LEGACY_PREFIX_REDIRECTS: dict[str, str] = {
    "/fr/bibliotheque": "/fr/livres/",
    "/en/bibliotheque": "/en/books/",
    "/ar/bibliotheque": "/ar/books/",
    "/fr/apprendre-arabe": "/fr/langue-arabe/",
    "/en/apprendre-arabe": "/en/arabic-language/",
    "/ar/apprendre-arabe": "/ar/اللغة-العربية/",
    "/fr/fiqh-al-muamalat": "/fr/finance-islamique/",
    "/en/fiqh-al-muamalat": "/en/islamic-finance/",
    "/ar/fiqh-al-muamalat": "/ar/التمويل-الإسلامي/",
    "/fr/about": "/fr/a-propos/",
    "/fr/legal": "/fr/mentions-legales/",
    "/fr/privacy": "/fr/confidentialite/",
    "/fr/formations": "/fr/parcours/",
    "/en/parcours": "/en/courses/",
    "/en/livres": "/en/books/",
    "/en/actualites": "/en/news/",
    "/ar/actualites": "/ar/news/",
    "/ar/livres": "/ar/books/",
    **LEGACY_ROOT_REDIRECTS,
}


class RissalaLocaleAndRedirectMiddleware:
    """
    Handles:
    1. Permanent (301) redirects from legacy Next.js URLs to canonical translated URLs.
    2. Custom database RedirectRule entries managed in Django Admin.
    3. Language activation (fr, en, ar) and RTL flag on the request.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        raw_path = request.path_info or "/"
        decoded_path = unquote(raw_path)

        # Skip API, Admin, Static, Media, SEO files, and Healthcheck
        if any(
            decoded_path.startswith(prefix)
            for prefix in ("/api/", "/admin/", "/static/", "/media/", "/robots.txt", "/sitemap.xml", "/health")
        ) or any(
            decoded_path.startswith(asset)
            for asset in (
                "/images/",
                "/livres/",
                "/LogoRissala",
                "/iconRissala",
                "/logo-icon",
                "/hero-bg",
                "/arabe-bg",
                "/islamic-pattern-bg",
                "/library-bg",
            )
        ):
            request.lang = DEFAULT_LOCALE
            request.rissala_lang = DEFAULT_LOCALE
            request.is_rtl = False
            return self.get_response(request)

        # Check legacy prefix redirects (301)
        clean_no_slash = decoded_path.rstrip("/")
        if clean_no_slash in LEGACY_PREFIX_REDIRECTS:
            target = LEGACY_PREFIX_REDIRECTS[clean_no_slash]
            qs = request.META.get("QUERY_STRING", "")
            if qs:
                target = f"{target}?{qs}"
            return HttpResponsePermanentRedirect(target)

        for old_prefix, new_prefix in LEGACY_PREFIX_REDIRECTS.items():
            if decoded_path.startswith(f"{old_prefix}/"):
                suffix = decoded_path[len(old_prefix) + 1 :]
                return HttpResponsePermanentRedirect(f"{new_prefix}{suffix}")

        # Determine language from first URL segment (/fr/..., /en/..., /ar/...)
        segments = [s for s in decoded_path.strip("/").split("/") if s]
        lang = DEFAULT_LOCALE
        if segments and segments[0].lower() in LOCALES:
            lang = normalize_lang(segments[0])
        elif getattr(request, "user", None) and request.user.is_authenticated:
            lang = normalize_lang(getattr(request.user, "preferred_language", DEFAULT_LOCALE))

        request.lang = lang
        request.rissala_lang = lang
        request.rissala_is_rtl = is_rtl_lang(lang)
        request.is_rtl = request.rissala_is_rtl
        request.LANGUAGE_CODE = lang
        translation.activate(lang)

        response = self.get_response(request)
        response.headers["Content-Language"] = lang
        return response


class SecurityHeadersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        response = self.get_response(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault(
            "Permissions-Policy",
            "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
        )
        return response
