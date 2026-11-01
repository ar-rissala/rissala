from django import template

from core.i18n import (
    build_localized_url,
    localized_article_url,
    localized_section_url,
    normalize_lang,
)

register = template.Library()

ROUTE_NAME_MAP = {
    "core:home": ("home", ""),
    "home": ("home", ""),
    "books:library_index": ("books", ""),
    "books_catalog": ("books", ""),
    "content:sciences_hub": ("islamic_sciences", ""),
    "islamic_sciences_hub": ("islamic_sciences", ""),
    "content:sciences_foundations": ("sciences_foundations", ""),
    "sciences_foundations": ("sciences_foundations", ""),
    "content:sciences_fiqh": ("islamic_sciences", "fiqh"),
    "content:sciences_hadith": ("islamic_sciences", "hadith"),
    "content:sciences_tafsir": ("islamic_sciences", "tafsir"),
    "content:sciences_sira": ("islamic_sciences", "sira"),
    "content:sciences_histoire": ("islamic_sciences", "histoire"),
    "content:arabic_index": ("arabic_language", ""),
    "arabic_language_hub": ("arabic_language", ""),
    "content:finance_index": ("islamic_finance", ""),
    "islamic_finance_hub": ("islamic_finance", ""),
    "content:news_index": ("news", ""),
    "news_hub": ("news", ""),
    "courses:course_list": ("courses", ""),
    "courses_catalog": ("courses", ""),
    "core:search": ("search", ""),
    "search": ("search", ""),
    "core:about": ("about", ""),
    "about": ("about", ""),
    "core:contact": ("contact", ""),
    "contact": ("contact", ""),
    "core:legal": ("legal", ""),
    "legal": ("legal", ""),
    "core:privacy": ("privacy", ""),
    "privacy": ("privacy", ""),
    "core:services": ("services", ""),
    "services": ("services", ""),
    "core:zakat": ("zakat", ""),
    "zakat": ("zakat", ""),
    "core:marketplace_stocks": ("marketplace_stocks", ""),
    "marketplace_stocks": ("marketplace_stocks", ""),
    "core:marketplace_crypto": ("marketplace_crypto", ""),
    "marketplace_crypto": ("marketplace_crypto", ""),
    "core:newsletter_subscribe": ("newsletter", ""),
    "newsletter_subscribe": ("newsletter", ""),
    "accounts:login": ("login", ""),
    "login": ("login", ""),
    "accounts:register": ("register", ""),
    "register": ("register", ""),
    "accounts:forgot_password": ("forgot_password", ""),
    "forgot_password": ("forgot_password", ""),
    "accounts:dashboard": ("dashboard", ""),
    "dashboard": ("dashboard", ""),
    "accounts:profile": ("profile", ""),
    "profile": ("profile", ""),
}


@register.simple_tag(takes_context=True)
def lang_url(context, route_name: str, **kwargs) -> str:
    lang = normalize_lang(
        kwargs.pop("lang", None)
        or context.get("current_lang")
        or context.get("lang")
        or "fr"
    )
    if route_name in ("accounts:logout", "logout"):
        return f"/{lang}/deconnexion/" if lang == "fr" else f"/{lang}/logout/"
    if route_name in ("books:book_file_download", "book_file_download"):
        file_id = kwargs.get("file_id", "")
        return f"/{lang}/books/file/{file_id}/download/"
    if route_name in ("books:web_toggle_library", "web_toggle_library"):
        book_id = kwargs.get("book_id", "")
        return f"/{lang}/books/{book_id}/toggle-library/"
    if route_name in ("courses:course_enroll", "course_enroll"):
        identifier = kwargs.get("identifier", "")
        base = build_localized_url(lang, "courses", str(identifier))
        return f"{base}enroll/"
    if route_name in ROUTE_NAME_MAP:
        route_key, sub_slug = ROUTE_NAME_MAP[route_name]
        return build_localized_url(lang, route_key, sub_slug)
    return build_localized_url(lang, route_name)


@register.simple_tag(takes_context=True)
def local_url(context, route_key: str, sub_slug: str = "") -> str:
    lang = normalize_lang(context.get("current_lang", "fr"))
    return build_localized_url(lang, route_key, sub_slug)


@register.simple_tag(takes_context=True, name="localized_url")
def localized_url_tag(context, route_key: str, sub_slug: str = "") -> str:
    lang = normalize_lang(context.get("current_lang", "fr"))
    return build_localized_url(lang, route_key, sub_slug)


@register.simple_tag
def section_url(lang, section_key):
    return localized_section_url(lang, section_key)


@register.simple_tag
def article_url(lang, section_key, slug):
    return localized_article_url(lang, section_key, slug)


@register.filter
def get_item(dictionary, key):
    if isinstance(dictionary, dict):
        return dictionary.get(key, "")
    return ""


@register.filter
def trans_field(obj, field_prefix: str) -> str:
    if not obj:
        return ""
    for suffix in ("fr", "en", "ar"):
        val = getattr(obj, f"{field_prefix}_{suffix}", None)
        if val:
            return val
    return getattr(obj, field_prefix, "") or str(obj)


@register.filter
def localized_field(obj, field_prefix: str, lang: str = "fr"):
    if not obj:
        return ""
    attr_name = f"{field_prefix}_{lang}"
    val = getattr(obj, attr_name, None)
    if val:
        return val
    return getattr(obj, f"{field_prefix}_fr", "") or getattr(obj, field_prefix, "")


@register.filter
def book_url(book, lang: str = "fr") -> str:
    if hasattr(book, "get_absolute_url"):
        return book.get_absolute_url(lang)
    return build_localized_url(lang, "books")


@register.filter
def course_url(course, lang: str = "fr") -> str:
    if hasattr(course, "get_absolute_url"):
        return course.get_absolute_url(lang)
    return build_localized_url(lang, "courses")
