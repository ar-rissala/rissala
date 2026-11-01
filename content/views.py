from django.db.models import Q
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from content.models import Article, Category
from core.i18n import UI_STRINGS, build_localized_url, normalize_lang
from seo.services import build_seo_context


SCIENCES_DISCIPLINES = {
    "coran": {
        "fr": {
            "title": "Sciences du Coran ('Ulum al-Qur'an)",
            "subtitle": "Révélation, compilation, causes de révélation (Asbab al-Nuzul) et méthodologie de l'exégèse (Tafsir).",
        },
        "en": {
            "title": "Quranic Sciences ('Ulum al-Qur'an)",
            "subtitle": "Revelation, compilation, occasions of revelation (Asbab al-Nuzul), and principles of exegesis (Tafsir).",
        },
        "ar": {
            "title": "علوم القرآن وأصول التفسير",
            "subtitle": "الوحي، جمع القرآن، أسباب النزول، المكي والمدني ومناهج المفسرين.",
        },
    },
    "tafsir": {
        "fr": {
            "title": "Tafsir — Exégèse du Coran",
            "subtitle": "Approfondir la compréhension du Coran à travers les sources classiques et la méthodologie des savants.",
        },
        "en": {
            "title": "Tafsir — Quranic Exegesis",
            "subtitle": "Deepen your understanding of the Quran through classical sources and scholarly methodology.",
        },
        "ar": {
            "title": "التفسير وعلوم القرآن",
            "subtitle": "تعميق فهم القرآن الكريم من خلال المصادر الأصيلة ومناهج المفسرين.",
        },
    },
    "hadith": {
        "fr": {
            "title": "Sciences du Hadith ('Ulum al-Hadith)",
            "subtitle": "Chaînes de transmission (Isnad), critique textuelle (Matn), classification et recueils canoniques.",
        },
        "en": {
            "title": "Hadith Sciences ('Ulum al-Hadith)",
            "subtitle": "Chains of transmission (Isnad), textual analysis (Matn), classification, and canonical collections.",
        },
        "ar": {
            "title": "علوم الحديث ومصطلحه",
            "subtitle": "الإسناد والمتن، درجات الحديث، الجرح والتعديل ودراسة الدواوين الحديثية.",
        },
    },
    "fiqh": {
        "fr": {
            "title": "Jurisprudence & Fondements (Fiqh & Usul)",
            "subtitle": "Règles des adorations ('Ibadat), méthodologie juridique (Usul al-Fiqh) et finalités de la Loi (Maqasid).",
        },
        "en": {
            "title": "Jurisprudence & Legal Theory (Fiqh & Usul)",
            "subtitle": "Rules of worship ('Ibadat), legal methodology (Usul al-Fiqh), and higher objectives (Maqasid).",
        },
        "ar": {
            "title": "الفقه وأصوله ومقاصد الشريعة",
            "subtitle": "فقه العبادات، القواعد الفقهية، أصول الاستنباط ومقاصد الشريعة الإسلامية.",
        },
    },
    "sira": {
        "fr": {
            "title": "Sîra — Biographie du Prophète ﷺ",
            "subtitle": "La vie du Prophète ﷺ, son contexte historique et ses enseignements à La Mecque et à Médine.",
        },
        "en": {
            "title": "Sira — Prophetic Biography ﷺ",
            "subtitle": "The life of the Prophet ﷺ, historical context, and teachings in Makkah and Madinah.",
        },
        "ar": {
            "title": "السيرة النبوية الشريفة",
            "subtitle": "حياة النبي ﷺ وسيرته العطرة في العهدين المكي والمدني ودروسها التربوية.",
        },
    },
    "histoire": {
        "fr": {
            "title": "Histoire Islamique",
            "subtitle": "Les grandes périodes, la transmission du savoir et la structuration des institutions islamiques.",
        },
        "en": {
            "title": "Islamic History",
            "subtitle": "Major historical periods, transmission of knowledge, and the structuring of Islamic institutions.",
        },
        "ar": {
            "title": "التاريخ الإسلامي وتراث الأمة",
            "subtitle": "المراحل الكبرى للتاريخ الإسلامي وانتقال العلوم وتطور المؤسسات العلمية.",
        },
    },
    "aqida": {
        "fr": {
            "title": "Dogme & Spiritualité ('Aqida & Tazkiya)",
            "subtitle": "Théologie sunnite authentique, unicité divine (Tawhid) et purification du cœur (Ihsan).",
        },
        "en": {
            "title": "Creed & Spirituality ('Aqida & Tazkiya)",
            "subtitle": "Authentic Sunni theology, divine oneness (Tawhid), and spiritual purification (Ihsan).",
        },
        "ar": {
            "title": "العقيدة والتزكية والإحسان",
            "subtitle": "أصول التوحيد، العقيدة الصحيحة وتزكية النفس والأخلاق الإسلامية.",
        },
    },
}


def islamic_sciences_hub_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    page_copy = {
        "fr": {
            "metaTitle": "Sciences Islamiques | Rissala",
            "metaDesc": "Hub d'orientation des sciences islamiques : Fiqh, Hadith, Tafsir, Sîra.",
            "title_main": "SCIENCES",
            "title_accent": "ISLAMIQUES",
            "subtitle": "Hub d'orientation",
            "description": "Explorez notre cursus structuré et accédez directement aux différentes branches du savoir islamique. Sélectionnez une discipline pour commencer votre étude.",
            "themes": [
                {
                    "title": "FONDEMENTS",
                    "desc": "Les bases essentielles des sciences islamiques.",
                    "link": "fondements",
                },
                {
                    "title": "FIQH",
                    "desc": "Les règles et principes du droit islamique.",
                    "link": "fiqh",
                },
                {
                    "title": "HADITH",
                    "desc": "Étude et compréhension des hadiths.",
                    "link": "hadith",
                },
                {
                    "title": "TAFSIR",
                    "desc": "Approfondir la compréhension du Coran.",
                    "link": "tafsir",
                },
                {
                    "title": "SÎRA",
                    "desc": "La vie du Prophète ﷺ et son contexte.",
                    "link": "sira",
                },
                {
                    "title": "HISTOIRE ISLAMIQUE",
                    "desc": "Les grandes périodes et événements de l'histoire.",
                    "link": "histoire",
                },
            ],
        },
        "en": {
            "metaTitle": "Islamic Sciences | Rissala",
            "metaDesc": "Orientation hub for Islamic Sciences: Fiqh, Hadith, Tafsir, Sira.",
            "title_main": "ISLAMIC",
            "title_accent": "SCIENCES",
            "subtitle": "Orientation Hub",
            "description": "Explore our structured curriculum and directly access the different branches of Islamic knowledge. Select a discipline to begin your study.",
            "themes": [
                {
                    "title": "FOUNDATIONS",
                    "desc": "Essential foundations of Islamic sciences.",
                    "link": "fondements",
                },
                {
                    "title": "FIQH",
                    "desc": "Rules and principles of Islamic jurisprudence.",
                    "link": "fiqh",
                },
                {
                    "title": "HADITH",
                    "desc": "Study and comprehension of hadiths.",
                    "link": "hadith",
                },
                {
                    "title": "TAFSIR",
                    "desc": "Deepening understanding of the Holy Quran.",
                    "link": "tafsir",
                },
                {
                    "title": "SÎRA",
                    "desc": "The life of the Prophet ﷺ and his context.",
                    "link": "sira",
                },
                {
                    "title": "ISLAMIC HISTORY",
                    "desc": "Major eras and historical milestones.",
                    "link": "histoire",
                },
            ],
        },
        "ar": {
            "metaTitle": "العلوم الإسلامية | رسالة",
            "metaDesc": "مركز التوجيه للعلوم الإسلامية: فقه، حديث، تفسير، سيرة.",
            "title_main": "العلوم",
            "title_accent": "الإسلامية",
            "subtitle": "مركز التوجيه",
            "description": "استكشف منهجنا المنظم وقم بالوصول المباشر إلى مختلف فروع المعرفة الإسلامية. اختر تخصصًا لتبدأ دراستك.",
            "themes": [
                {
                    "title": "الأصول والأسس",
                    "desc": "القواعد والأصول الأساسية للعلوم الشرعية.",
                    "link": "fondements",
                },
                {
                    "title": "الفقه وأصوله",
                    "desc": "أحكام الشريعة وقواعد الفقه الإسلامي.",
                    "link": "fiqh",
                },
                {
                    "title": "علوم الحديث",
                    "desc": "دراسة الحديث الشريف ومصطلحه وأسانيده.",
                    "link": "hadith",
                },
                {
                    "title": "علوم القرآن والتفسير",
                    "desc": "أصول التفسير وتدبر معاني القرآن الكريم.",
                    "link": "tafsir",
                },
                {
                    "title": "السيرة النبوية",
                    "desc": "سيرة النبي ﷺ العطرة وأبعادها التربوية.",
                    "link": "sira",
                },
                {
                    "title": "التاريخ الإسلامي",
                    "desc": "المحطات الكبرى والتاريخ الحضاري الإسلامي.",
                    "link": "histoire",
                },
            ],
        },
    }
    t = page_copy.get(lang, page_copy["fr"])

    seo = build_seo_context(
        lang=lang,
        title=t["metaTitle"],
        description=t["metaDesc"],
        canonical_path=build_localized_url(lang, "islamic_sciences"),
        route_key="islamic_sciences",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_sciences"], "url": build_localized_url(lang, "islamic_sciences")},
        ],
    )
    context = {
        "current_lang": lang,
        "lang": lang,
        "copy": t,
        "themes": t["themes"],
        "base_url": build_localized_url(lang, "islamic_sciences"),
        "page_alternate_urls": {
            l_code: build_localized_url(l_code, "islamic_sciences")
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "content/sciences_hub.html", context)


def sciences_foundations_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    articles_qs = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.ISLAMIC_SCIENCES,
            language=lang,
        )
        .select_related("category")
        .prefetch_related("tags")
        .order_by("order", "id")
    )
    if not articles_qs.exists():
        articles_qs = (
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.ISLAMIC_SCIENCES,
                language="fr",
            )
            .select_related("category")
            .prefetch_related("tags")
            .order_by("order", "id")
        )

    articles_list = list(articles_qs)
    for art in articles_list:
        art.tag_label = (
            art.category.get_name(lang)
            if art.category
            else ("Sciences Islamiques" if lang == "fr" else ("Islamic Sciences" if lang == "en" else "العلوم الإسلامية"))
        )

    page_copy = {
        "fr": {
            "metaTitle": "Fondements | Sciences Islamiques | Rissala",
            "metaDesc": "Découvrez les bases essentielles des sciences islamiques.",
            "description": "Ce cursus retrace l'histoire et les fondements de la tradition sunnite, de la révélation à la structuration des sciences islamiques.",
            "heading": "Les",
            "accent": "Fondements",
            "fondementsTitle": "Articles Fondamentaux",
            "backToHub": "Hub Sciences Islamiques",
        },
        "en": {
            "metaTitle": "Foundations | Islamic Sciences | Rissala",
            "metaDesc": "Discover the essential foundations of Islamic sciences.",
            "description": "This course traces the history and foundations of the Sunni tradition, from revelation to the structuring of Islamic sciences.",
            "heading": "The",
            "accent": "Foundations",
            "fondementsTitle": "Core Articles",
            "backToHub": "Islamic Sciences Hub",
        },
        "ar": {
            "metaTitle": "الأسس | العلوم الإسلامية | رسالة",
            "metaDesc": "اكتشف الأسس الأساسية للعلوم الإسلامية.",
            "description": "يتتبع هذا المسار تاريخ وأسس التراث السني، من الوحي إلى هيكلة العلوم الإسلامية.",
            "heading": "الأسس",
            "accent": "الإسلامية",
            "fondementsTitle": "المقالات الأساسية",
            "backToHub": "مركز العلوم الإسلامية",
        },
    }
    t = page_copy.get(lang, page_copy["fr"])

    seo = build_seo_context(
        lang=lang,
        title=t["metaTitle"],
        description=t["metaDesc"],
        canonical_path=f"{build_localized_url(lang, 'islamic_sciences')}fondements/",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_sciences"], "url": build_localized_url(lang, "islamic_sciences")},
            {"label": t["accent"], "url": f"{build_localized_url(lang, 'islamic_sciences')}fondements/"},
        ],
    )
    context = {
        "current_lang": lang,
        "lang": lang,
        "copy": t,
        "articles": articles_list,
        "page_alternate_urls": {
            l_code: f"{build_localized_url(l_code, 'islamic_sciences')}fondements/"
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "content/sciences_foundations.html", context)


def arabic_language_hub_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    """
    Arabic Language hub.
    IMPORTANT REQUIREMENT: Preserves pedagogical Arabic lessons/examples/texts in Arabic
    without forcing machine translation of pedagogical content, while keeping UI elements in `lang`.
    """
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    # Fetch articles in current UI language OR fallback to pedagogical French/Arabic lessons
    articles = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.ARABIC_LANGUAGE,
            language=lang,
        )
        .select_related("category")
        .order_by("order", "id")
    )
    if not articles.exists():
        articles = (
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.ARABIC_LANGUAGE,
                language="fr",
            )
            .select_related("category")
            .order_by("order", "id")
        )

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_arabic"],
        description=ui["pillar_2_desc"],
        canonical_path=build_localized_url(lang, "arabic_language"),
        route_key="arabic_language",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_arabic"], "url": build_localized_url(lang, "arabic_language")},
        ],
    )
    return render(
        request,
        "content/arabic_index.html",
        {
            "articles": articles,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "arabic_language")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def islamic_finance_hub_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    page_copy = {
        "fr": {
            "metaTitle": "fiqh al-muamalat | Rissala — Jurisprudence des Transactions",
            "metaDesc": "Fiqh al-muamalat : commerce, ribā, zakāt et finance moderne.",
            "description": "Découvrez le fiqh al-muamalat : la jurisprudence des transactions. Un système économique complet visant l'équité, le partage des risques et la connexion avec l'économie réelle.",
            "titleMain": "fiqh",
            "titleAccent": "al-muamalat",
            "ctaTitle": "Du fiqh classique à l'application moderne",
            "ctaDesc": "L'économie islamique n'est pas qu'une série d'interdits. C'est une vision éthique du commerce où la rentabilité s'allie à la justice sociale.",
            "ctaBtn": "Commencer par le Fondement",
        },
        "en": {
            "metaTitle": "Fiqh al-Mu'amalat | Rissala",
            "metaDesc": "Fiqh al-muamalat: trade, ribā, zakāt, and modern finance.",
            "description": "Explore fiqh al-muamalat — transactional jurisprudence built on equity, shared risk, and real-economy ties.",
            "titleMain": "Fiqh",
            "titleAccent": "al-Mu'amalat",
            "ctaTitle": "From classical fiqh to modern application",
            "ctaDesc": "Islamic economics is not only prohibitions — it is an ethical vision of trade where profit meets social justice.",
            "ctaBtn": "Start with the foundations",
        },
        "ar": {
            "metaTitle": "فقه المعاملات | رسالة",
            "metaDesc": "فقه المعاملات: البيع والربا والزكاة والتمويل الحديث.",
            "description": "تعرّف على فقه المعاملات — نظام اقتصادي يهدف إلى العدالة وتقاسم المخاطر والربط بالاقتصاد الحقيقي.",
            "titleMain": "فقه",
            "titleAccent": "المعاملات",
            "ctaTitle": "من الفقه الكلاسيكي إلى التطبيق الحديث",
            "ctaDesc": "الاقتصاد الإسلامي ليس مجرد محظورات — بل رؤية أخلاقية للتجارة تجمع الربح والعدالة.",
            "ctaBtn": "ابدأ بالأساس",
        },
    }
    copy = page_copy[lang]

    catalog_meta = {
        "fondements-commerce-islam": {
            "order": 1,
            "icon": "scale",
            "tag": {"fr": "Fondements", "en": "Foundations", "ar": "أساس"},
            "subtitle": {
                "fr": "Licéité et Justice Économique",
                "en": "Permissibility and economic justice",
                "ar": "الجواز والعدالة الاقتصادية",
            },
        },
        "regles-vente-contrats": {
            "order": 2,
            "icon": "handshake",
            "tag": {"fr": "Contrats", "en": "Contracts", "ar": "عقود"},
            "subtitle": {
                "fr": "Conditions de Validité d'un Contrat",
                "en": "Conditions for a valid contract",
                "ar": "شروط صحة العقد",
            },
        },
        "riba-usure-explication": {
            "order": 3,
            "icon": "coins",
            "tag": {"fr": "Interdictions", "en": "Prohibitions", "ar": "محظورات"},
            "subtitle": {
                "fr": "Ribā al-Faḍl et Ribā al-Nasīʾa",
                "en": "Ribā al-faḍl and ribā al-nasīʾa",
                "ar": "ربا الفضل وربا النسيئة",
            },
        },
        "zakat-mecanisme-economique": {
            "order": 4,
            "icon": "book",
            "tag": {"fr": "Redistribution", "en": "Redistribution", "ar": "إعادة توزيع"},
            "subtitle": {
                "fr": "Pilier Spirituel et Mécanisme Économique",
                "en": "Spiritual pillar and economic mechanism",
                "ar": "ركن روحي وآلية اقتصادية",
            },
        },
        "zakat-ere-moderne": {
            "order": 5,
            "icon": "coins",
            "tag": {"fr": "Haute Science", "en": "Advanced", "ar": "متقدّم"},
            "subtitle": {
                "fr": "Purifier sa Richesse au XXIe Siècle",
                "en": "Purifying wealth in the 21st century",
                "ar": "تطهير المال في القرن الحادي والعشرين",
            },
        },
        "finance-islamique-moderne": {
            "order": 6,
            "icon": "building",
            "tag": {"fr": "Époque Moderne", "en": "Modern era", "ar": "عصر حديث"},
            "subtitle": {
                "fr": "De la Jurisprudence Classique aux Banques",
                "en": "From classical fiqh to banks",
                "ar": "من الفقه الكلاسيكي إلى المصارف",
            },
        },
    }

    base_articles = list(
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.ISLAMIC_FINANCE,
            language=lang,
        )
        .select_related("category")
        .order_by("order", "id")
    )
    if not base_articles:
        base_articles = list(
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.ISLAMIC_FINANCE,
                language="fr",
            )
            .select_related("category")
            .order_by("order", "id")
        )

    # Filter strictly to the 6 core catalog articles and attach catalog metadata
    articles = []
    for art in base_articles:
        m = catalog_meta.get(art.slug)
        if m:
            art.order_num = m["order"]
            art.catalog_icon = m["icon"]
            art.catalog_tag = m["tag"][lang]
            art.catalog_subtitle = m["subtitle"][lang]
            articles.append(art)
    articles.sort(key=lambda a: getattr(a, "order_num", 99))

    cta_href = build_localized_url(lang, "islamic_finance", "fondements-commerce-islam")

    seo = build_seo_context(
        lang=lang,
        title=copy["metaTitle"],
        description=copy["metaDesc"],
        canonical_path=build_localized_url(lang, "islamic_finance"),
        route_key="islamic_finance",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_finance"], "url": build_localized_url(lang, "islamic_finance")},
        ],
    )
    return render(
        request,
        "content/finance_index.html",
        {
            "articles": articles,
            "copy": copy,
            "cta_href": cta_href,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "islamic_finance")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def news_hub_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    cat_filter = request.GET.get("category", "").strip()
    search_q = request.GET.get("q", "").strip()
    hide_demo = request.GET.get("real_only") == "1"

    qs = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.NEWS,
            language=lang,
        )
        .select_related("category")
        .prefetch_related("tags")
        .order_by("-is_featured", "-published_at", "-created_at")
    )
    if not qs.exists():
        qs = (
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.NEWS,
                language="fr",
            )
            .select_related("category")
            .prefetch_related("tags")
            .order_by("-is_featured", "-published_at", "-created_at")
        )

    if hide_demo:
        qs = qs.filter(is_demo=False)
    if cat_filter:
        qs = qs.filter(category__code=cat_filter)
    if search_q:
        qs = qs.filter(Q(title__icontains=search_q) | Q(summary__icontains=search_q))

    categories = Category.objects.filter(
        section_type=Category.SectionType.NEWS, is_active=True
    ).order_by("order")

    articles_list = list(qs)
    for art in articles_list:
        if not art.featured_image_url and art.featured_image:
            art.image = art.featured_image.url
        elif art.featured_image_url:
            art.image = art.featured_image_url
        else:
            art.image = "/static/images/actualites/default-finance.jpg"
        art.tag_label = (
            art.category.get_name(lang)
            if art.category
            else ("Économie" if lang == "fr" else ("Economy" if lang == "en" else "اقتصاد"))
        )

    hero_article = articles_list[0] if articles_list else None
    secondary_articles = articles_list[1:3] if len(articles_list) > 1 else []
    feed_articles = (
        articles_list[3:10]
        if len(articles_list) > 3
        else (articles_list[1:] if len(articles_list) > 1 else [])
    )

    page_copy = {
        "fr": {
            "metaTitle": "Actualités Économiques & Financières | Rissala",
            "metaDesc": "Suivez l'actualité de la finance islamique, des banques, de la création monétaire et de l'investissement éthique.",
            "featured": "À la une",
            "search_results": "Résultats pour",
            "archive_title": "Archive des actualités",
            "search_placeholder": "Rechercher un article...",
            "latest_news": "Dernières actualités",
            "all_news": "Toutes les actualités",
            "load_more": "Explorer plus d'archives",
            "empty_results": "Aucun article ne correspond à votre recherche.",
            "reading_time": "5 min",
        },
        "en": {
            "metaTitle": "Economic & Financial News | Rissala",
            "metaDesc": "Follow the news on Islamic finance, banking, money creation, and ethical investment.",
            "featured": "Featured",
            "search_results": "Results for",
            "archive_title": "News Archive",
            "search_placeholder": "Search for an article...",
            "latest_news": "Latest News",
            "all_news": "All News",
            "load_more": "Explore more archives",
            "empty_results": "No articles match your search.",
            "reading_time": "5 min",
        },
        "ar": {
            "metaTitle": "الأخبار الاقتصادية والمالية | رسالة",
            "metaDesc": "تابع أخبار التمويل الإسلامي، البنوك، خلق المال، والاستثمار الأخلاقي.",
            "featured": "الأخبار المميزة",
            "search_results": "نتائج البحث عن",
            "archive_title": "أرشيف الأخبار",
            "search_placeholder": "البحث عن مقال...",
            "latest_news": "آخر الأخبار",
            "all_news": "جميع الأخبار",
            "load_more": "استكشاف المزيد من الأرشيف",
            "empty_results": "لم يتم العثور على أي مقالات تطابق بحثك.",
            "reading_time": "5 دقائق",
        },
    }
    t = page_copy.get(lang, page_copy["fr"])

    seo = build_seo_context(
        lang=lang,
        title=t["metaTitle"],
        description=t["metaDesc"],
        canonical_path=build_localized_url(lang, "news"),
        route_key="news",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_news"], "url": build_localized_url(lang, "news")},
        ],
    )
    return render(
        request,
        "content/news_index.html",
        {
            "current_lang": lang,
            "lang": lang,
            "hero_article": hero_article,
            "secondary_articles": secondary_articles,
            "feed_articles": feed_articles,
            "featured_article": hero_article,
            "articles": secondary_articles,
            "all_articles": articles_list,
            "categories": categories,
            "selected_category": cat_filter,
            "copy": t,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "news")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def article_or_discipline_view(
    request: HttpRequest, slug: str, section_type: str, lang: str = "fr"
) -> HttpResponse:
    """
    Resolve an article slug (or a discipline subpage slug in Islamic Sciences).
    Handles cross-language translation lookups and pedagogical Arabic fallback.
    """
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    # Check if it's one of the Islamic Sciences discipline overview subpages
    if section_type == Category.SectionType.ISLAMIC_SCIENCES and slug in SCIENCES_DISCIPLINES:
        disc = SCIENCES_DISCIPLINES[slug][lang]
        discipline_article_map = {
            "fiqh": ["ecoles-juridiques-sunnites"],
            "hadith": ["science-hadith-bukhari"],
            "tafsir": ["transmission-message-islamique"],
            "sira": ["vie-prophete-muhammad"],
            "histoire": ["islam-sunnite-sources", "ecoles-juridiques-sunnites"],
            "fondements": ["islam-sunnite-sources", "transmission-message-islamique"],
            "coran": ["transmission-message-islamique"],
            "aqida": ["islam-sunnite-sources"],
        }
        target_slugs = discipline_article_map.get(slug, [])

        articles = (
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.ISLAMIC_SCIENCES,
                language=lang,
            )
            .select_related("category")
            .order_by("order", "id")
        )
        if target_slugs:
            filtered_arts = articles.filter(slug__in=target_slugs)
            if filtered_arts.exists():
                articles = filtered_arts

        articles_list = list(articles)
        for art in articles_list:
            art.tag_label = disc["title"]

        seo = build_seo_context(
            lang=lang,
            title=disc["title"],
            description=disc["subtitle"],
            canonical_path=f"{build_localized_url(lang, 'islamic_sciences')}{slug}/",
            breadcrumbs=[
                {"label": ui["nav_home"], "url": f"/{lang}/"},
                {"label": ui["nav_sciences"], "url": build_localized_url(lang, "islamic_sciences")},
                {"label": disc["title"], "url": f"{build_localized_url(lang, 'islamic_sciences')}{slug}/"},
            ],
        )
        return render(
            request,
            "content/sciences_subpage.html",
            {
                "current_lang": lang,
                "lang": lang,
                "discipline_slug": slug,
                "discipline": disc,
                "articles": articles_list,
                "back_to_hub": "Hub Sciences Islamiques" if lang == "fr" else ("Islamic Sciences Hub" if lang == "en" else "مركز العلوم الإسلامية"),
                "articles_title": "Articles de la discipline" if lang == "fr" else ("Discipline Articles" if lang == "en" else "مقالات التخصص"),
                "page_alternate_urls": {
                    l_code: f"{build_localized_url(l_code, 'islamic_sciences')}{slug}/"
                    for l_code in ("fr", "en", "ar")
                },
                **seo,
            },
        )

    # Preview mode for editors/admins
    is_preview = request.GET.get("preview") == "1" and (
        request.user.is_authenticated and getattr(request.user, "is_editorial_staff", False)
    )

    base_qs = Article.objects.select_related("category", "translation_group").prefetch_related("tags")
    if not is_preview:
        base_qs = base_qs.filter(status=Article.Status.PUBLISHED, published_at__lte=timezone.now())

    sec_key = str(section_type).lower()

    # 1. Exact match on (language, section_type, slug)
    article = base_qs.filter(language=lang, section_type=sec_key, slug=slug).first()

    # 2. Handle riba-usure-explication <-> riba-usure-explanation alias
    if not article and slug in ("riba-usure-explication", "riba-usure-explanation"):
        alt_slug = (
            "riba-usure-explanation"
            if slug == "riba-usure-explication"
            else "riba-usure-explication"
        )
        article = base_qs.filter(language=lang, section_type=sec_key, slug=alt_slug).first()
        if article:
            return redirect(article.get_absolute_url(), permanent=True)

    # 3. Check if slug exists in another language within the same section -> redirect to current lang translation if available
    if not article:
        other_lang_article = base_qs.filter(section_type=sec_key, slug=slug).first()
        if other_lang_article:
            translations = other_lang_article.get_translations()
            if lang in translations and translations[lang].status == Article.Status.PUBLISHED:
                return redirect(translations[lang].get_absolute_url(), permanent=False)
            raise Http404(f"Cet article n'est pas encore disponible en langue '{lang}'.")

    if not article:
        raise Http404("Article introuvable")

    # Sidebar sibling articles in the same section
    sibling_articles = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=article.section_type,
            language=article.language,
        )
        .select_related("category")
        .order_by("order", "id")
    )
    siblings_list = list(sibling_articles)
    prev_article = None
    next_article = None
    article_number = 1
    total_articles = len(siblings_list)
    for idx, item in enumerate(siblings_list):
        if item.id == article.id:
            article_number = idx + 1
            if idx > 0:
                prev_article = siblings_list[idx - 1]
            if idx < len(siblings_list) - 1:
                next_article = siblings_list[idx + 1]
            break

    section_route_map = {
        Category.SectionType.ISLAMIC_SCIENCES: ("islamic_sciences", ui["nav_sciences"]),
        Category.SectionType.ARABIC_LANGUAGE: ("arabic_language", ui["nav_arabic"]),
        Category.SectionType.ISLAMIC_FINANCE: ("islamic_finance", ui["nav_finance"]),
        Category.SectionType.NEWS: ("news", ui["nav_news"]),
    }
    sec_route_key, sec_label = section_route_map.get(
        article.section_type, ("islamic_sciences", ui["nav_sciences"])
    )
    sec_url = build_localized_url(lang, sec_route_key)

    section_back_labels = {
        Category.SectionType.ARABIC_LANGUAGE: {
            "fr": "Retour au programme",
            "en": "Back to program",
            "ar": "العودة إلى البرنامج",
        },
        Category.SectionType.ISLAMIC_SCIENCES: {
            "fr": "Retour aux fondements",
            "en": "Back to foundations",
            "ar": "العودة إلى الأسس",
        },
        Category.SectionType.ISLAMIC_FINANCE: {
            "fr": "Retour à fiqh al-muamalat",
            "en": "Back to fiqh al-Mu'amalat",
            "ar": "العودة إلى فقه المعاملات",
        },
        Category.SectionType.NEWS: {
            "fr": "Retour aux actualités",
            "en": "Back to news",
            "ar": "العودة إلى الأخبار",
        },
    }
    back_label = section_back_labels.get(article.section_type, {}).get(lang, f"Retour à {sec_label}")
    use_simple_layout = article.section_type in (
        Category.SectionType.ARABIC_LANGUAGE,
        Category.SectionType.NEWS,
    )

    translations_map = {
        l_code: trans_art.get_absolute_url()
        for l_code, trans_art in article.get_translations().items()
    }
    # If a language doesn't have a specific translation yet, point the language switcher to the section hub in that language
    page_alternate_urls = {
        l_code: translations_map.get(l_code, build_localized_url(l_code, sec_route_key))
        for l_code in ("fr", "en", "ar")
    }

    article_schema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle" if article.section_type == Category.SectionType.NEWS else "Article",
        "headline": article.title,
        "description": article.effective_seo_description,
        "author": {"@type": "Organization", "name": article.author_name or "Rissala"},
        "inLanguage": article.language,
        "datePublished": (article.published_at or article.created_at).isoformat(),
        "dateModified": article.updated_at.isoformat(),
    }

    seo = build_seo_context(
        lang=lang,
        title=article.effective_seo_title,
        description=article.effective_seo_description,
        canonical_path=article.get_absolute_url(),
        alternate_paths=translations_map,
        og_type="article",
        og_image=article.featured_image_url or "/static/LogoRissala.png",
        noindex=article.noindex or is_preview,
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": sec_label, "url": sec_url},
            {"label": article.title, "url": article.get_absolute_url()},
        ],
        json_ld_extra=[article_schema],
    )

    context = {
        "article": article,
        "sibling_articles": siblings_list,
        "prev_article": prev_article,
        "next_article": next_article,
        "article_number": article_number,
        "total_articles": total_articles,
        "section_label": sec_label,
        "section_url": sec_url,
        "back_label": back_label,
        "use_simple_layout": use_simple_layout,
        "is_preview": is_preview,
        "available_translations": translations_map,
        "page_alternate_urls": page_alternate_urls,
        **seo,
    }
    return render(request, "content/article_detail.html", context)

