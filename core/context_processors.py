import json
from functools import lru_cache
from pathlib import Path

from django.conf import settings
from django.http import HttpRequest

from .i18n import (
    DEFAULT_LOCALE,
    LOCALE_LABELS,
    LOCALE_SHORT_LABELS,
    LOCALES,
    OPENGRAPH_LOCALES,
    ROUTE_SLUGS,
    UI_STRINGS,
    build_localized_url,
    is_rtl_lang,
    normalize_lang,
)


class SafeDict(dict):
    """Dictionary that returns empty string for missing keys instead of raising KeyError."""

    def __missing__(self, key):
        return ""


@lru_cache(maxsize=8)
def load_locale_dictionary(lang: str) -> SafeDict:
    lang = normalize_lang(lang)
    dict_path = Path(settings.BASE_DIR) / "seed_data" / "dictionaries" / f"{lang}.json"
    if dict_path.exists():
        try:
            raw = json.loads(dict_path.read_text(encoding="utf-8-sig"))
            return SafeDict(raw)
        except Exception:
            pass
    return SafeDict()


def rissala_GlobalContext(request: HttpRequest) -> dict:
    lang = normalize_lang(
        getattr(request, "rissala_lang", None)
        or getattr(request, "lang", DEFAULT_LOCALE)
    )
    rtl = is_rtl_lang(lang)
    ui = SafeDict(UI_STRINGS[lang])
    locale_dict = load_locale_dictionary(lang)

    nav_urls = {key: build_localized_url(lang, key) for key in ROUTE_SLUGS.keys()}
    nav_urls["logout"] = f"/{lang}/deconnexion/" if lang == "fr" else f"/{lang}/logout/"

    lang_switch_urls = {}
    current_route_key = getattr(request, "rissala_route_key", "home")
    for target_lang in LOCALES:
        lang_switch_urls[target_lang] = build_localized_url(target_lang, current_route_key)

    nav_items = [
        {"key": "home", "label": ui.get("nav_home", "Accueil"), "url": build_localized_url(lang, "home")},
        {"key": "books", "label": ui.get("nav_books", "Livres"), "url": build_localized_url(lang, "books")},
        {"key": "sciences", "label": ui.get("nav_sciences", "Sciences islamiques"), "url": build_localized_url(lang, "islamic_sciences")},
        {"key": "arabic", "label": ui.get("nav_arabic", "Langue arabe"), "url": build_localized_url(lang, "arabic_language")},
        {"key": "finance", "label": ui.get("nav_finance", "Finance islamique"), "url": build_localized_url(lang, "islamic_finance")},
        {"key": "news", "label": ui.get("nav_news", "Actualités"), "url": build_localized_url(lang, "news")},
        {"key": "courses", "label": ui.get("nav_courses", "Parcours"), "url": build_localized_url(lang, "courses")},
    ]

    return {
        "current_lang": lang,
        "lang": lang,
        "html_lang": lang,
        "html_dir": "rtl" if rtl else "ltr",
        "text_dir": "rtl" if rtl else "ltr",
        "dir": "rtl" if rtl else "ltr",
        "is_rtl": rtl,
        "ui": ui,
        "dict": locale_dict,
        "nav_urls": nav_urls,
        "urls": nav_urls,
        "nav_items": nav_items,
        "lang_switch_urls": lang_switch_urls,
        "language_MenuUrls": lang_switch_urls,
        "current_locale_short": LOCALE_SHORT_LABELS[lang],
        "current_locale_label": LOCALE_LABELS[lang],
        "og_locale": OPENGRAPH_LOCALES.get(lang, "fr_FR"),
        "site_url": getattr(settings, "SITE_URL", "https://rissala.net"),
    }
