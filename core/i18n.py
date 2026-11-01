"""
Internationalization, localized route dictionary, and UI translations for Rissala.net.
Supports French (fr), English (en), and Arabic (ar, RTL).
"""
from typing import Dict, Optional
from urllib.parse import unquote

LOCALES = ("fr", "en", "ar")
SUPPORTED_LANGUAGES = LOCALES
DEFAULT_LOCALE = "fr"

LOCALE_LABELS = {
    "fr": "Français",
    "en": "English",
    "ar": "العربية",
}

LOCALE_SHORT_LABELS = {
    "fr": "FR",
    "en": "EN",
    "ar": "AR",
}

OPENGRAPH_LOCALES = {
    "fr": "fr_FR",
    "en": "en_US",
    "ar": "ar_SA",
}

# Canonical route slugs per language for all primary sections & pages
ROUTE_SLUGS: Dict[str, Dict[str, str]] = {
    "home": {"fr": "", "en": "", "ar": ""},
    "books": {"fr": "livres", "en": "books", "ar": "books"},
    "islamic_sciences": {"fr": "sciences-islamiques", "en": "islamic-sciences", "ar": "العلوم-الإسلامية"},
    "sciences-islamiques": {"fr": "sciences-islamiques", "en": "islamic-sciences", "ar": "العلوم-الإسلامية"},
    "sciences_foundations": {
        "fr": "sciences-islamiques/fondements",
        "en": "islamic-sciences/foundations",
        "ar": "العلوم-الإسلامية/الأصول",
    },
    "arabic_language": {"fr": "langue-arabe", "en": "arabic-language", "ar": "اللغة-العربية"},
    "apprendre-arabe": {"fr": "langue-arabe", "en": "arabic-language", "ar": "اللغة-العربية"},
    "islamic_finance": {"fr": "finance-islamique", "en": "islamic-finance", "ar": "التمويل-الإسلامي"},
    "fiqh-al-muamalat": {"fr": "finance-islamique", "en": "islamic-finance", "ar": "التمويل-الإسلامي"},
    "courses": {"fr": "parcours", "en": "courses", "ar": "courses"},
    "news": {"fr": "actualites", "en": "news", "ar": "news"},
    "actualites": {"fr": "actualites", "en": "news", "ar": "news"},
    "search": {"fr": "recherche", "en": "search", "ar": "بحث"},
    "login": {"fr": "connexion", "en": "login", "ar": "تسجيل-الدخول"},
    "register": {"fr": "inscription", "en": "register", "ar": "إنشاء-حساب"},
    "forgot_password": {
        "fr": "mot-de-passe-oublie",
        "en": "forgot-password",
        "ar": "نسيت-كلمة-المرور",
    },
    "dashboard": {"fr": "espace-membre", "en": "dashboard", "ar": "فضاء-الأعضاء"},
    "profile": {"fr": "profil", "en": "profile", "ar": "الملف-الشخصي"},
    "newsletter": {"fr": "newsletter", "en": "newsletter", "ar": "newsletter"},
    "about": {"fr": "a-propos", "en": "about", "ar": "من-نحن"},
    "contact": {"fr": "contact", "en": "contact", "ar": "اتصل-بنا"},
    "legal": {"fr": "mentions-legales", "en": "legal", "ar": "إشعار-قانوني"},
    "privacy": {"fr": "confidentialite", "en": "privacy", "ar": "الخصوصية"},
    "services": {"fr": "services", "en": "services", "ar": "الخدمات"},
    "zakat": {"fr": "services/zakat", "en": "services/zakat", "ar": "الخدمات/zakat"},
    "marketplace_stocks": {
        "fr": "marketplaces/stocks",
        "en": "marketplaces/stocks",
        "ar": "marketplaces/stocks",
    },
    "marketplace_crypto": {
        "fr": "marketplaces/crypto",
        "en": "marketplaces/crypto",
        "ar": "marketplaces/crypto",
    },
}

SECTION_ALIASES: Dict[str, str] = {
    "sciences-islamiques": "islamic_sciences",
    "islamic-sciences": "islamic_sciences",
    "sciences": "islamic_sciences",
    "العلوم-الإسلامية": "islamic_sciences",
    "langue-arabe": "arabic_language",
    "apprendre-arabe": "arabic_language",
    "arabic-language": "arabic_language",
    "اللغة-العربية": "arabic_language",
    "finance-islamique": "islamic_finance",
    "fiqh-al-muamalat": "islamic_finance",
    "islamic-finance": "islamic_finance",
    "التمويل-الإسلامي": "islamic_finance",
    "actualites": "news",
    "news": "news",
    "الأخبار": "news",
    "الاخبار": "news",
    "livres": "books",
    "bibliotheque": "books",
    "books": "books",
    "الكتب": "books",
    "كتب": "books",
    "parcours": "courses",
    "formations": "courses",
    "courses": "courses",
    "paths": "courses",
    "المسارات": "courses",
    "مسارات": "courses",
    "a-propos": "about",
    "about": "about",
    "من-نحن": "about",
    "recherche": "search",
    "search": "search",
    "بحث": "search",
    "connexion": "login",
    "login": "login",
    "تسجيل-الدخول": "login",
    "inscription": "register",
    "register": "register",
    "إنشاء-حساب": "register",
    "espace-membre": "dashboard",
    "tableau-de-bord": "dashboard",
    "dashboard": "dashboard",
    "member-area": "dashboard",
    "فضاء-الأعضاء": "dashboard",
    "لوحة-التحكم": "dashboard",
    "profil": "profile",
    "profile": "profile",
    "الملف-الشخصي": "profile",
    "legal": "legal",
    "mentions-legales": "legal",
    "إشعار-قانوني": "legal",
    "privacy": "privacy",
    "confidentialite": "privacy",
    "الخصوصية": "privacy",
    "contact": "contact",
    "اتصل-بنا": "contact",
    "newsletter": "newsletter",
}

LEGACY_ROOT_REDIRECTS: Dict[str, str] = {
    "/langue-arabe": "/fr/langue-arabe/",
    "/apprendre-arabe": "/fr/langue-arabe/",
    "/sciences": "/fr/sciences-islamiques/",
    "/sciences-islamiques": "/fr/sciences-islamiques/",
    "/fiqh-al-muamalat": "/fr/finance-islamique/",
    "/finance-islamique": "/fr/finance-islamique/",
    "/actualites": "/fr/actualites/",
    "/a-propos": "/fr/a-propos/",
    "/about": "/fr/a-propos/",
    "/bibliotheque": "/fr/livres/",
    "/livres": "/fr/livres/",
    "/parcours": "/fr/parcours/",
    "/formations": "/fr/parcours/",
    "/connexion": "/fr/connexion/",
    "/inscription": "/fr/inscription/",
    "/espace-membre": "/fr/espace-membre/",
    "/mot-de-passe-oublie": "/fr/mot-de-passe-oublie/",
    "/contact": "/fr/contact/",
    "/legal": "/fr/mentions-legales/",
    "/privacy": "/fr/confidentialite/",
    "/services": "/fr/services/",
    "/services/zakat": "/fr/services/zakat/",
    "/marketplaces/crypto": "/fr/marketplaces/crypto/",
    "/marketplaces/stocks": "/fr/marketplaces/stocks/",
}


def is_valid_locale(lang: str) -> bool:
    return lang in LOCALES


def normalize_lang(lang: str | None) -> str:
    if not lang:
        return DEFAULT_LOCALE
    clean = lang.lower().strip()
    return clean if clean in LOCALES else DEFAULT_LOCALE


def is_rtl_lang(lang: str | None) -> bool:
    return normalize_lang(lang) == "ar"


def get_localized_slug(section_key: str, lang: str) -> str:
    lang = normalize_lang(lang)
    return ROUTE_SLUGS.get(section_key, {}).get(lang, section_key)


def build_localized_url(lang: str, route_key: str, sub_slug: str = "") -> str:
    lang_code = normalize_lang(lang)
    segment = ROUTE_SLUGS.get(route_key, {}).get(lang_code, "")
    if not segment:
        base = f"/{lang_code}/"
    else:
        base = f"/{lang_code}/{segment}/"
    if sub_slug:
        return f"{base}{sub_slug.strip('/')}/"
    return base


def localized_section_url(lang: str, section_key: str) -> str:
    return build_localized_url(lang, section_key)


def localized_article_url(lang: str, section_key: str, article_slug: str) -> str:
    return build_localized_url(lang, section_key, article_slug)


def resolve_section_key(slug: str) -> Optional[str]:
    decoded = unquote(slug).strip("/")
    return SECTION_ALIASES.get(decoded)


def translate_path_to_locale(path: str, target_lang: str) -> str:
    target_lang = normalize_lang(target_lang)
    decoded = unquote(path or "/")
    parts = [p for p in decoded.split("/") if p]
    if not parts:
        return f"/{target_lang}/"
    if parts[0] in LOCALES:
        parts = parts[1:]
    if not parts:
        return f"/{target_lang}/"

    first_seg = parts[0]
    sec_key = resolve_section_key(first_seg)
    if sec_key and sec_key in ROUTE_SLUGS:
        parts[0] = get_localized_slug(sec_key, target_lang)

    return "/" + target_lang + "/" + "/".join(parts) + "/"


UI_STRINGS: Dict[str, Dict[str, str]] = {
    "fr": {
        "site_name": "Rissala",
        "nav_home": "Accueil",
        "nav_books": "Livres",
        "nav_sciences": "Sciences islamiques",
        "nav_arabic": "Langue arabe",
        "nav_finance": "Finance islamique",
        "nav_courses": "Parcours",
        "nav_news": "Actualités",
        "nav_search": "Recherche",
        "nav_login": "Connexion",
        "nav_register": "Inscription",
        "nav_member": "Espace membre",
        "nav_dashboard": "Tableau de bord",
        "nav_profile": "Profil & Préférences",
        "nav_logout": "Déconnexion",
        "nav_admin": "Administration",
        "hero_badge": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "hero_title_1": "Le savoir islamique authentique,",
        "hero_title_2": "structuré avec clarté et exigence.",
        "hero_subtitle": "Explorez les sciences islamiques classiques, apprenez la langue arabe littéraire, maîtrisez les principes de la finance éthique et accédez à notre bibliothèque numérique d'ouvrages de référence.",
        "hero_cta_primary": "Explorer les Sciences Islamiques",
        "hero_cta_secondary": "Découvrir la Bibliothèque",
        "pillars_title": "Nos Piliers Fondamentaux",
        "pillars_subtitle": "Une architecture éditoriale rigoureuse conçue pour accompagner l'étudiant et le lecteur francophone, anglophone et arabophone.",
        "pillar_1_title": "Sciences Islamiques",
        "pillar_1_desc": "Dogme ('Aqida), Sciences du Coran, Sciences du Hadith, Jurisprudence (Fiqh) et Fondements du Droit (Usul al-Fiqh).",
        "pillar_1_cta": "Étudier les Sciences",
        "pillar_2_title": "Langue Arabe",
        "pillar_2_desc": "Cursus progressif de l'alphabet jusqu'à la grammaire classique (Al-Ajurrumiyyah), la morphologie (Sarf) et l'analyse textuelle.",
        "pillar_2_cta": "Apprendre l'Arabe",
        "pillar_3_title": "Finance Islamique",
        "pillar_3_desc": "Principes de Fiqh al-Mu'amalat, interdictions (Riba, Gharar), contrats (Murabaha, Ijara, Musharaka, Sukuk) et calculateur de Zakat.",
        "pillar_3_cta": "Comprendre la Finance",
        "news_title": "Actualités & Analyses",
        "news_subtitle": "Veille stratégique, finance éthique internationale, patrimoine manuscrit et dossiers de fond.",
        "news_read_more": "Lire l'article",
        "library_title": "Bibliothèque Numérique & Ouvrages",
        "library_subtitle": "Consultez et téléchargez les grands textes classiques en arabe et en français (EPUB & PDF) avec suivi de progression synchronisé.",
        "courses_title": "Parcours & Formations Structurées",
        "courses_subtitle": "Des cursus vidéo progressifs articulés autour des sciences islamiques, de la langue arabe et de la finance éthique.",
        "newsletter_title": "La Lettre Éditoriale Rissala",
        "newsletter_desc": "Recevez nos nouveaux dossiers, livres numériques et analyses financières directement par email. Sans publicité, désinscription en un clic.",
        "newsletter_placeholder": "Votre adresse email...",
        "newsletter_btn": "S'abonner",
        "newsletter_consent": "J'accepte de recevoir la newsletter Rissala conformément à la politique de confidentialité (RGPD).",
        "footer_desc": "Plateforme internationale d'édition numérique, d'étude et de recherche dédiée aux sciences islamiques, à la langue arabe et à la finance éthique.",
        "footer_rights": "Tous droits réservés.",
        "footer_legal": "Mentions légales",
        "footer_privacy": "Confidentialité",
        "footer_about": "À propos",
        "footer_contact": "Contact",
        "search_placeholder": "Rechercher un article, un livre, un contrat financier, une leçon d'arabe...",
        "search_btn": "Rechercher",
        "read_online": "Lire en ligne",
        "download_pdf": "Télécharger PDF",
        "download_epub": "Télécharger EPUB",
        "reading_time": "min de lecture",
        "pages": "pages",
        "demo_badge": "Contenu de démonstration pédagogique",
        "arabic_pedagogical_notice": "Section pédagogique : les textes, exemples et exercices en langue arabe sont préservés dans leur langue originale d'apprentissage.",
        "empty_results": "Aucun contenu ne correspond à vos critères actuels.",
        "filter_all": "Tous",
        "resume_reading": "Reprendre la lecture",
        "start_course": "Commencer le parcours",
        "404_title": "Page introuvable (404)",
        "404_desc": "La page que vous recherchez n'existe pas ou a été déplacée.",
        "404_cta": "Retourner à l'accueil",
        "meta_default_desc": "Plateforme internationale d'édition numérique, d'étude et de recherche dédiée aux sciences islamiques, à la langue arabe et à la finance éthique.",
    },
    "en": {
        "site_name": "Rissala",
        "nav_home": "Home",
        "nav_books": "Books",
        "nav_sciences": "Islamic Sciences",
        "nav_arabic": "Arabic Language",
        "nav_finance": "Islamic Finance",
        "nav_courses": "Courses",
        "nav_news": "News",
        "nav_search": "Search",
        "nav_login": "Sign In",
        "nav_register": "Register",
        "nav_member": "Member Area",
        "nav_dashboard": "Dashboard",
        "nav_profile": "Profile & Preferences",
        "nav_logout": "Sign Out",
        "nav_admin": "Admin",
        "hero_badge": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "hero_title_1": "Authentic Islamic Scholarship,",
        "hero_title_2": "structured with clarity and rigor.",
        "hero_subtitle": "Explore classical Islamic sciences, master standard Arabic, understand Islamic finance principles, and read foundational books in our digital library.",
        "hero_cta_primary": "Explore Islamic Sciences",
        "hero_cta_secondary": "Browse the Library",
        "pillars_title": "Our Core Pillars",
        "pillars_subtitle": "A rigorous editorial architecture crafted to support students and readers across French, English, and Arabic.",
        "pillar_1_title": "Islamic Sciences",
        "pillar_1_desc": "Creed ('Aqida), Quranic Sciences, Hadith Sciences, Jurisprudence (Fiqh), and Legal Theory (Usul al-Fiqh).",
        "pillar_1_cta": "Explore Sciences",
        "pillar_2_title": "Arabic Language",
        "pillar_2_desc": "Progressive curriculum from the Arabic alphabet to classical grammar (Al-Ajurrumiyyah), morphology (Sarf), and textual reading.",
        "pillar_2_cta": "Learn Arabic",
        "pillar_3_title": "Islamic Finance",
        "pillar_3_desc": "Fiqh al-Mu'amalat principles, prohibitions (Riba, Gharar), contracts (Murabaha, Ijara, Musharaka, Sukuk), and Zakat calculator.",
        "pillar_3_cta": "Study Finance",
        "news_title": "News & Editorial Analysis",
        "news_subtitle": "Strategic insights, global ethical finance, manuscript heritage, and in-depth reports.",
        "news_read_more": "Read article",
        "library_title": "Digital Library & Books",
        "library_subtitle": "Read and download foundational classical texts in Arabic, French, and English (EPUB & PDF) with synchronized reading progress.",
        "courses_title": "Structured Courses & Learning Paths",
        "courses_subtitle": "Progressive video curricula covering Islamic sciences, Arabic language, and ethical finance.",
        "newsletter_title": "The Rissala Editorial Newsletter",
        "newsletter_desc": "Receive our new dossiers, digital books, and financial analyses directly by email. One-click unsubscribe.",
        "newsletter_placeholder": "Your email address...",
        "newsletter_btn": "Subscribe",
        "newsletter_consent": "I agree to receive the Rissala newsletter in accordance with the privacy policy (GDPR).",
        "footer_desc": "International digital publishing, study, and research platform dedicated to Islamic sciences, Arabic language, and ethical finance.",
        "footer_rights": "All rights reserved.",
        "footer_legal": "Legal Notice",
        "footer_privacy": "Privacy Policy",
        "footer_about": "About Us",
        "footer_contact": "Contact",
        "search_placeholder": "Search articles, books, financial contracts, Arabic lessons...",
        "search_btn": "Search",
        "read_online": "Read Online",
        "download_pdf": "Download PDF",
        "download_epub": "Download EPUB",
        "reading_time": "min read",
        "pages": "pages",
        "demo_badge": "Pedagogical Demonstration Content",
        "arabic_pedagogical_notice": "Pedagogical section: Arabic texts, examples, and exercises are preserved in their original learning script.",
        "empty_results": "No content matches your current criteria.",
        "filter_all": "All",
        "resume_reading": "Resume Reading",
        "start_course": "Start Course",
        "404_title": "Page Not Found (404)",
        "404_desc": "The page you are looking for does not exist or has been moved.",
        "404_cta": "Return to Home",
        "meta_default_desc": "International digital publishing, learning, and research platform dedicated to Islamic sciences, Arabic language, and ethical finance.",
    },
    "ar": {
        "site_name": "رسالة",
        "nav_home": "الرئيسية",
        "nav_books": "الكتب",
        "nav_sciences": "العلوم الإسلامية",
        "nav_arabic": "اللغة العربية",
        "nav_finance": "التمويل الإسلامي",
        "nav_courses": "المسارات",
        "nav_news": "الأخبار",
        "nav_search": "بحث",
        "nav_login": "تسجيل الدخول",
        "nav_register": "إنشاء حساب",
        "nav_member": "فضاء الأعضاء",
        "nav_dashboard": "لوحة التحكم",
        "nav_profile": "الملف الشخصي",
        "nav_logout": "تسجيل الخروج",
        "nav_admin": "الإدارة",
        "hero_badge": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "hero_title_1": "المعرفة الإسلامية الأصيلة،",
        "hero_title_2": "بمنهجية علمية واضحة ورصينة.",
        "hero_subtitle": "استكشف العلوم الشرعية الأصيلة، وتعلّم اللغة العربية الفصحى، وتعرّف على فقه المعاملات والمالية الإسلامية، وتصفّح مكتبتنا الرقمية.",
        "hero_cta_primary": "استكشف العلوم الإسلامية",
        "hero_cta_secondary": "تصفح المكتبة الرقمية",
        "pillars_title": "ركائز المنصة الأساسية",
        "pillars_subtitle": "بنية معرفية وتحريرية متكاملة لمرافقة طالب العلم والقارئ باللغات العربية والفرنسية والإنجليزية.",
        "pillar_1_title": "العلوم الإسلامية",
        "pillar_1_desc": "العقيدة، علوم القرآن، علوم الحديث، الفقه وأصول الفقه ومقاصد الشريعة.",
        "pillar_1_cta": "تصفح العلوم الشرعية",
        "pillar_2_title": "اللغة العربية",
        "pillar_2_desc": "منهج متدرج من الحروف الهجائية إلى النحو الأصيل (الآجرومية) والصرف والبلاغة.",
        "pillar_2_cta": "تعلم اللغة العربية",
        "pillar_3_title": "التمويل الإسلامي",
        "pillar_3_desc": "فقه المعاملات المالية، الضوابط الشرعية، العقود (المرابحة، الإجارة، المشاركة، الصكوك) وحاسبة الزكاة.",
        "pillar_3_cta": "ادرس المالية الإسلامية",
        "news_title": "الأخبار والتحليلات",
        "news_subtitle": "متابعة معمقة للاقتصاد الإسلامي العالمي، التراث المخطوط، والتقارير العلمية.",
        "news_read_more": "اقرأ المقال",
        "library_title": "المكتبة الرقمية والكتب",
        "library_subtitle": "طالع وحمّل أمهات المتون والكتب العلمية بصيغتي EPUB و PDF مع مزامنة تقدم القراءة.",
        "courses_title": "المسارات والدورات التعليمية",
        "courses_subtitle": "مسارات مرئية متدرجة في العلوم الشرعية واللغة العربية والمالية الإسلامية.",
        "newsletter_title": "النشرة البريدية لمنصة رسالة",
        "newsletter_desc": "توصل بأحدث المقالات والكتب الرقمية والتحليلات الاقتصادية مباشرة عبر البريد الإلكتروني.",
        "newsletter_placeholder": "بريدك الإلكتروني...",
        "newsletter_btn": "اشترك الآن",
        "newsletter_consent": "أوافق على تلقي النشرة البريدية لمنصة رسالة وفقاً لسياسة الخصوصية.",
        "footer_desc": "منصة دولية للنشر الرقمي والدراسة والبحث في العلوم الإسلامية واللغة العربية والمالية الأخلاقية.",
        "footer_rights": "جميع الحقوق محفوظة.",
        "footer_legal": "إشعار قانوني",
        "footer_privacy": "سياسة الخصوصية",
        "footer_about": "من نحن",
        "footer_contact": "اتصل بنا",
        "search_placeholder": "ابحث عن مقال، كتاب، عقد مالي، أو درس...",
        "search_btn": "بحث",
        "read_online": "قراءة مباشرة",
        "download_pdf": "تحميل PDF",
        "download_epub": "تحميل EPUB",
        "reading_time": "دقائق للقراءة",
        "pages": "صفحة",
        "demo_badge": "محتوى تعليمي تجريبي",
        "arabic_pedagogical_notice": "قسم تعليمي: يتم الحفاظ على النصوص والأمثلة والتمارين باللغة العربية كما هي لأغراض التعلم.",
        "empty_results": "لا توجد نتائج مطابقة لبحثك الحالي.",
        "filter_all": "الكل",
        "resume_reading": "متابعة القراءة",
        "start_course": "ابدأ المسار",
        "404_title": "الصفحة غير موجودة (404)",
        "404_desc": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
        "404_cta": "العودة إلى الرئيسية",
        "meta_default_desc": "منصة دولية للنشر الرقمي والدراسة والبحث في العلوم الإسلامية واللغة العربية والمالية الأخلاقية.",
    },
}
