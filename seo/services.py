import json
from typing import Any

from django.conf import settings

from core.i18n import build_localized_url


def build_seo_context(
    *,
    lang: str,
    title: str,
    description: str,
    canonical_path: str,
    route_key: str | None = None,
    alternate_paths: dict[str, str] | None = None,
    og_type: str = "website",
    og_image: str = "/static/LogoRissala.png",
    noindex: bool = False,
    breadcrumbs: list[dict[str, str]] | None = None,
    json_ld_extra: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """Generate complete SEO, hreflang, Open Graph, Twitter Card & Schema.org JSON-LD metadata."""
    base_url = settings.SITE_URL.rstrip("/")
    canonical_url = f"{base_url}{canonical_path}"

    hreflangs: dict[str, str] = {}
    if alternate_paths:
        for l_code, path in alternate_paths.items():
            hreflangs[l_code] = f"{base_url}{path}"
    elif route_key:
        for l_code in ("fr", "en", "ar"):
            hreflangs[l_code] = f"{base_url}{build_localized_url(l_code, route_key)}"
    else:
        hreflangs[lang] = canonical_url

    x_default = hreflangs.get("fr") or canonical_url
    full_og_image = og_image if og_image.startswith("http") else f"{base_url}{og_image}"

    locale_map = {"fr": "fr_FR", "en": "en_US", "ar": "ar_SA"}

    schemas: list[dict[str, Any]] = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rissala",
            "url": base_url,
            "logo": f"{base_url}/static/LogoRissala.png",
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rissala",
            "url": f"{base_url}/{lang}/",
            "inLanguage": lang,
            "potentialAction": {
                "@type": "SearchAction",
                "target": f"{base_url}{build_localized_url(lang, 'search')}?q={{search_term_string}}",
                "query-input": "required name=search_term_string",
            },
        },
    ]

    if breadcrumbs:
        schemas.append(
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": idx + 1,
                        "name": crumb["label"],
                        "item": f"{base_url}{crumb['url']}" if crumb.get("url") else canonical_url,
                    }
                    for idx, crumb in enumerate(breadcrumbs)
                ],
            }
        )

    if json_ld_extra:
        schemas.extend(json_ld_extra)

    return {
        "seo_title": f"{title} | Rissala" if "Rissala" not in title else title,
        "seo_description": description,
        "seo_canonical": canonical_url,
        "seo_hreflangs": hreflangs,
        "seo_x_default": x_default,
        "seo_og_type": og_type,
        "seo_og_locale": locale_map.get(lang, "fr_FR"),
        "seo_og_image": full_og_image,
        "seo_robots": "noindex, nofollow" if noindex else "index, follow",
        "breadcrumbs": breadcrumbs or [],
        "seo_json_ld": json.dumps(schemas, ensure_ascii=False),
    }

