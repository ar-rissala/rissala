from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.utils.text import slugify

from books.models import (
    Book,
    BookAuthor,
    BookCategory,
    BookChapter,
    BookEdition,
    BookFile,
    BookLanguage,
    BookPublisher,
)
from content.markdown_engine import parse_frontmatter
from content.models import Article, Category, Tag, TranslationGroup
from courses.models import Course, CourseModule, Lesson
from seo.models import SiteSEOSettings


EDITORIAL_CATEGORIES = [
    # Islamic Sciences
    {
        "code": "fondements-foi",
        "section_type": Category.SectionType.ISLAMIC_SCIENCES,
        "slug_fr": "fondements-foi",
        "slug_en": "foundations-faith",
        "slug_ar": "أصول-الإيمان",
        "name_fr": "Fondements de la Foi & Pratique",
        "name_en": "Foundations of Faith & Practice",
        "name_ar": "أصول الإيمان وأركان الإسلام",
        "order": 1,
    },
    {
        "code": "sciences-coran-hadith",
        "section_type": Category.SectionType.ISLAMIC_SCIENCES,
        "slug_fr": "sciences-coran-hadith",
        "slug_en": "quran-hadith-sciences",
        "slug_ar": "علوم-القرآن-والحديث",
        "name_fr": "Sciences du Coran, Hadith & Usul",
        "name_en": "Quran, Hadith & Usul Sciences",
        "name_ar": "علوم القرآن والحديث وأصول الفقه",
        "order": 2,
    },
    # Arabic Language
    {
        "code": "langue-arabe-cursus",
        "section_type": Category.SectionType.ARABIC_LANGUAGE,
        "slug_fr": "langue-arabe-cursus",
        "slug_en": "arabic-language-curriculum",
        "slug_ar": "منهج-اللغة-العربية",
        "name_fr": "Cursus Langue Arabe Littéraire",
        "name_en": "Classical Arabic Curriculum",
        "name_ar": "منهج اللغة العربية الفصحى",
        "order": 1,
    },
    # Islamic Finance
    {
        "code": "fiqh-muamalat",
        "section_type": Category.SectionType.ISLAMIC_FINANCE,
        "slug_fr": "fiqh-muamalat",
        "slug_en": "fiqh-muamalat",
        "slug_ar": "فقه-المعاملات",
        "name_fr": "Fiqh al-Mu'amalat & Contrats",
        "name_en": "Fiqh al-Mu'amalat & Contracts",
        "name_ar": "فقه المعاملات والعقود المالية",
        "order": 1,
    },
    # News
    {
        "code": "economie-finance",
        "section_type": Category.SectionType.NEWS,
        "slug_fr": "economie-finance",
        "slug_en": "economy-finance",
        "slug_ar": "اقتصاد-ومالية",
        "name_fr": "Économie & Finance Éthique",
        "name_en": "Economy & Ethical Finance",
        "name_ar": "الاقتصاد والمالية الأخلاقية",
        "order": 1,
    },
    {
        "code": "sciences-patrimoine",
        "section_type": Category.SectionType.NEWS,
        "slug_fr": "sciences-patrimoine",
        "slug_en": "sciences-heritage",
        "slug_ar": "علوم-وتراث",
        "name_fr": "Sciences, Langue & Patrimoine",
        "name_en": "Sciences, Language & Heritage",
        "name_ar": "العلوم واللغة والتراث",
        "order": 2,
    },
]


BOOK_CATEGORIES_DATA = [
    {
        "code": "fondements",
        "slug_fr": "fondements",
        "slug_en": "foundations",
        "slug_ar": "الأصول",
        "name_fr": "Fondements",
        "name_en": "Foundations",
        "name_ar": "الأصول",
        "order": 1,
    },
    {
        "code": "fiqh",
        "slug_fr": "fiqh",
        "slug_en": "fiqh",
        "slug_ar": "الفقه",
        "name_fr": "Fiqh",
        "name_en": "Fiqh",
        "name_ar": "الفقه",
        "order": 2,
    },
    {
        "code": "langue-arabe",
        "slug_fr": "langue-arabe",
        "slug_en": "arabic-language",
        "slug_ar": "اللغة-العربية",
        "name_fr": "Langue Arabe",
        "name_en": "Arabic",
        "name_ar": "اللغة العربية",
        "order": 3,
    },
    {
        "code": "coran",
        "slug_fr": "coran",
        "slug_en": "quran",
        "slug_ar": "القرآن",
        "name_fr": "Coran",
        "name_en": "Quran",
        "name_ar": "القرآن",
        "order": 4,
    },
    {
        "code": "hadith",
        "slug_fr": "hadith",
        "slug_en": "hadith",
        "slug_ar": "الحديث",
        "name_fr": "Hadith",
        "name_en": "Hadith",
        "name_ar": "الحديث",
        "order": 5,
    },
    {
        "code": "spiritualite",
        "slug_fr": "spiritualite",
        "slug_en": "spirituality",
        "slug_ar": "الروحانية",
        "name_fr": "Spiritualité",
        "name_en": "Spirituality",
        "name_ar": "الروحانية",
        "order": 6,
    },
    {
        "code": "histoire",
        "slug_fr": "histoire",
        "slug_en": "history",
        "slug_ar": "التاريخ",
        "name_fr": "Histoire",
        "name_en": "History",
        "name_ar": "التاريخ",
        "order": 7,
    },
]


BOOKS_DATA = [
    {
        "code": "ne-sois-pas-triste",
        "slug_fr": "ne-sois-pas-triste",
        "slug_en": "dont-be-sad",
        "slug_ar": "لا-تحزن",
        "title_fr": "Ne sois pas triste",
        "title_en": "Don't Be Sad",
        "title_ar": "لا تحزن",
        "original_arabic_title": "لا تحزن",
        "subtitle_fr": "Conseils pratiques et spirituels tirés du Coran et de la Sunna",
        "subtitle_en": "Practical and spiritual guidance from the Quran and Sunnah",
        "subtitle_ar": "توجيهات عملية وروحية مستمدة من الكتاب والسنة",
        "short_description_fr": "Un guide spirituel majeur offrant des conseils pratiques et réconfortants, tirés du Coran et de la Sunna, pour surmonter les épreuves, l'anxiété et la tristesse au quotidien.",
        "short_description_en": "A major spiritual guide offering practical and comforting advice from the Quran and Sunnah to overcome trials, anxiety, and sadness in daily life.",
        "short_description_ar": "كتاب روحي وتربوي يقدم نصائح عملية مستمدة من القرآن والسنة لتجاوز المحن والقلق والحزن.",
        "author_name": "Aaidh ibn Abdullah al-Qarni",
        "author_name_ar": "عائض بن عبد الله القرني",
        "author_era": "Époque contemporaine",
        "category_code": "spiritualite",
        "languages": ["FR", "AR"],
        "cover_image_url": "/images/covers/dont_be_sad_fr_cover.jpg",
        "pdf_path": "/livres/dont_be_sad_fr.pdf",
        "isbn": "978-2-9589101-1-1",
        "page_count": 464,
        "estimated_reading_minutes": 480,
        "featured": True,
        "order": 1,
        "chapters": [
            (
                "Chapitre 1 : La sérénité du cœur par le rappel d'Allah",
                "Chapter 1: Serenity of the Heart through Remembrance of Allah",
                "الفصل الأول: طمأنينة القلب بذكر الله",
                "« N'est-ce point par l'évocation d'Allah que se tranquillisent les cœurs ? » (Sourate Ar-Ra'd, v. 28). Ce chapitre explore comment l'ancrage spirituel apaise l'inquiétude et redonne sens à l'action quotidienne.",
            ),
            (
                "Chapitre 2 : Patience, gratitude et acceptation du décret",
                "Chapter 2: Patience, Gratitude, and Acceptance of Divine Decree",
                "الفصل الثاني: الصبر والشكر والرضا بالقضاء",
                "L'épreuve n'est jamais dépourvue de sagesse : le croyant transforme chaque difficulté en élévation spirituelle par la patience (Sabr) et la confiance active en Allah (Tawakkul).",
            ),
            (
                "Chapitre 3 : Agir dans le présent sans regret stérile",
                "Chapter 3: Acting in the Present without Sterile Regret",
                "الفصل الثالث: العمل في الحاضر وتجاوز الندم",
                "Le passé est révolu et l'avenir appartient à Allah : concentrer son énergie sur le devoir de l'instant présent dissipe l'angoisse et féconde les œuvres.",
            ),
        ],
    },
    {
        "code": "risalat-ibn-abi-zayd",
        "slug_fr": "risalat-ibn-abi-zayd",
        "slug_en": "risala-ibn-abi-zayd",
        "slug_ar": "رسالة-ابن-أبي-زيد-القيرواني",
        "title_fr": "La Risāla",
        "title_en": "The Risāla",
        "title_ar": "رسالة ابن أبي زيد القيرواني",
        "original_arabic_title": "الرسالة الفقهية",
        "subtitle_fr": "Traité fondamental de dogme et de jurisprudence mālikite (Xe siècle)",
        "subtitle_en": "Foundational treatise of Maliki creed and jurisprudence (10th century)",
        "subtitle_ar": "متن جامع في العقيدة والفقه والأخلاق على مذهب الإمام مالك",
        "short_description_fr": "Traité fondamental de jurisprudence mālikite rédigé au Xe siècle. Couvre les cinq piliers, les transactions et les règles éthiques essentielles du musulman.",
        "short_description_en": "Foundational treatise of Maliki jurisprudence written in the 10th century. Covers the five pillars, transactions, and essential Islamic ethics.",
        "short_description_ar": "متن فقهي وعقدي أصيل ألفه الإمام ابن أبي زيد القيرواني في القرن الرابع الهجري.",
        "author_name": "Ibn Abī Zayd al-Qayrawānī",
        "author_name_ar": "ابن أبي زيد القيرواني",
        "author_era": "IVe siècle H. / Xe siècle",
        "category_code": "fiqh",
        "languages": ["FR", "AR", "FR/AR"],
        "cover_image_url": "/images/covers/risalat-ibn-abi-zayd.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-2-8",
        "page_count": 112,
        "estimated_reading_minutes": 160,
        "featured": True,
        "order": 2,
        "chapters": [
            (
                "Chapitre 1 : Ce que doivent prononcer les langues et croire les cœurs",
                "Chapter 1: What Tongues Must Utter and Hearts Must Believe",
                "باب ما تنطق به الألسنة وتعتقده الأفئدة من واجب أمور الديانات",
                "Exposé limpide de la croyance des gens de la Sunna (Ahl al-Sunna) concernant l'Unicité d'Allah, Ses Noms et Attributs, la prophétie de Muhammad (ﷺ), le Destin et le Jour Dernier.",
            ),
            (
                "Chapitre 2 : La Purification rituelle et la Prière (Salat)",
                "Chapter 2: Ritual Purification and Prayer (Salah)",
                "باب الطهارة والصلاة وأحكامها",
                "Règles détaillées des ablutions (Wudu'), du Ghusl, du Tayammum, des horaires de prière et de l'accomplissement des prières obligatoires et surérogatoires.",
            ),
            (
                "Chapitre 3 : Zakat, Jeûne, Pèlerinage et Transactions (Mu'amalat)",
                "Chapter 3: Zakat, Fasting, Pilgrimage, and Transactions",
                "باب الزكاة والصيام والحج والبيوع",
                "Synthèse des règles de la Zakat sur les biens, du jeûne de Ramadan, du Hajj et des principes d'équité dans les ventes et contrats.",
            ),
        ],
    },
    {
        "code": "usul-al-fiqh",
        "slug_fr": "usul-al-fiqh",
        "slug_en": "principles-of-islamic-jurisprudence",
        "slug_ar": "أصول-الفقه-الإسلامي",
        "title_fr": "Principes de Jurisprudence Islamique",
        "title_en": "Principles of Islamic Jurisprudence",
        "title_ar": "مبادئ أصول الفقه الإسلامي",
        "original_arabic_title": "أصول الفقه",
        "subtitle_fr": "Introduction académique aux uṣūl al-fiqh : sources et méthodologie",
        "subtitle_en": "Academic introduction to usul al-fiqh: sources and methodology",
        "subtitle_ar": "مدخل أكاديمي إلى أصول الفقه ومناهج الاستنباط",
        "short_description_fr": "Introduction académique aux uṣūl al-fiqh : sources, méthodes d'interprétation, ijtihad et consensus. Référence incontournable pour les étudiants.",
        "short_description_en": "Academic introduction to usul al-fiqh: sources, methods of interpretation, ijtihad, and consensus. Essential reference for students.",
        "short_description_ar": "دراسة منهجية لمصادر التشريع الإسلامي وقواعد تفسير النصوص والإجماع والقياس والاجتهاد.",
        "author_name": "Mohammad Hashim Kamali",
        "author_name_ar": "محمد هاشم كمالي",
        "author_era": "Époque contemporaine",
        "category_code": "fondements",
        "languages": ["FR", "EN", "AR"],
        "cover_image_url": "/images/covers/usul-al-fiqh.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-3-5",
        "page_count": 380,
        "estimated_reading_minutes": 420,
        "featured": True,
        "order": 3,
        "chapters": [
            (
                "Chapitre 1 : Définition et portée des Uṣūl al-Fiqh",
                "Chapter 1: Definition and Scope of Usul al-Fiqh",
                "الفصل الأول: تعريف أصول الفقه وموضوعه",
                "Distinction entre le Fiqh (connaissance des règles pratiques détaillées) et les Uṣūl al-Fiqh (méthodologie permettant de déduire ces règles à partir des sources).",
            ),
            (
                "Chapitre 2 : Les Sources primaires — Le Coran et la Sunna",
                "Chapter 2: Primary Sources — The Quran and the Sunnah",
                "الفصل الثاني: الأدلة النقلية — الكتاب والسنة",
                "Analyse des textes définitifs (Qat'i) et probables (Zanni), des règles linguistiques d'interprétation et de l'articulation entre le Coran et la Sunna.",
            ),
            (
                "Chapitre 3 : Ijmāʿ, Qiyās, Maṣlaḥa et Maqāṣid al-Sharīʿa",
                "Chapter 3: Ijma', Qiyas, Maslaha, and Maqasid al-Shari'ah",
                "الفصل الثالث: الإجماع والقياس والمصالح المرسلة ومقاصد الشريعة",
                "Étude du consensus juridique, du raisonnement analogique, de l'intérêt général et des finalités supérieures du droit islamique.",
            ),
        ],
    },
    {
        "code": "introduction-sciences-coran",
        "slug_fr": "introduction-sciences-coran",
        "slug_en": "introduction-to-quranic-sciences",
        "slug_ar": "مباحث-في-علوم-القرآن",
        "title_fr": "Introduction aux Sciences du Coran",
        "title_en": "Introduction to the Sciences of the Quran",
        "title_ar": "مباحث في علوم القرآن",
        "original_arabic_title": "مباحث في علوم القرآن",
        "subtitle_fr": "Révélation, compilation, tafsīr, qirāʾāt et inimitabilité",
        "subtitle_en": "Revelation, compilation, tafsir, qira'at, and inimitability",
        "subtitle_ar": "دراسة شاملة للوحي وجمع القرآن والتفسير والقراءات والإعجاز",
        "short_description_fr": "Étude systématique des sciences coraniques : révélation, compilation, tafsīr, qirāʾāt et abrogation. Ouvrage de référence dans les instituts islamiques.",
        "short_description_en": "Systematic study of Quranic sciences: revelation, compilation, tafsir, qira'at, and abrogation. Standard reference in Islamic institutes.",
        "short_description_ar": "مرجع علمي جامع في مباحث الوحي والمكي والمدني وجمع القرآن وأصول التفسير.",
        "author_name": "Mannāʿ al-Qaṭṭān",
        "author_name_ar": "مناع القطان",
        "author_era": "XXe siècle",
        "category_code": "coran",
        "languages": ["FR", "AR"],
        "cover_image_url": "/images/covers/introduction-sciences-coran.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-4-2",
        "page_count": 430,
        "estimated_reading_minutes": 450,
        "featured": False,
        "order": 4,
        "chapters": [
            (
                "Chapitre 1 : La Révélation (Al-Waḥy) et la distinction Mecquois / Médinois",
                "Chapter 1: Revelation (Al-Wahy) and Makkan / Madinan Distinction",
                "المبحث الأول: الوحي والمكي والمدني",
                "Étude historique et linguistique de la révélation coranique et des caractéristiques propres aux sourates mecquoises et médinoises.",
            ),
            (
                "Chapitre 2 : La Compilation et la Préservation du Texte Coranique",
                "Chapter 2: Compilation and Preservation of the Quranic Text",
                "المبحث الثاني: جمع القرآن الكريم وتدوينه",
                "Les trois étapes historiques de la préservation écrite et orale : à l'époque du Prophète (ﷺ), sous le califat d'Abū Bakr et sous le califat de ʿUthmān.",
            ),
            (
                "Chapitre 3 : Principes de l'Exégèse (Uṣūl al-Tafsīr)",
                "Chapter 3: Principles of Exegesis (Usul al-Tafsir)",
                "المبحث الثالث: التفسير وأصوله ومناهج المفسرين",
                "Méthodologie du Tafsīr par les textes (Tafsīr bi-al-Maʾthūr) et par l'analyse linguistique et juridique rigoureuse.",
            ),
        ],
    },
    {
        "code": "arbain-nawawi",
        "slug_fr": "arbain-nawawi",
        "slug_en": "forty-hadith-nawawi",
        "slug_ar": "الأربعون-النووية",
        "title_fr": "Les Quarante Hadiths",
        "title_en": "The Forty Hadith",
        "title_ar": "الأربعون النووية",
        "original_arabic_title": "الأربعون النووية",
        "subtitle_fr": "Quarante hadiths fondamentaux couvrant la foi, l'adoration et l'éthique",
        "subtitle_en": "Forty foundational hadiths covering faith, worship, and ethics",
        "subtitle_ar": "اثنان وأربعون حديثاً جامعة لأصول الدين والأخلاق",
        "short_description_fr": "Collection de quarante hadiths fondamentaux sélectionnés par l'imam al-Nawawī, couvrant les piliers de la foi, de l'adoration et de l'éthique islamique.",
        "short_description_en": "Collection of forty foundational hadiths selected by Imam al-Nawawi covering the pillars of faith, worship, and Islamic ethics.",
        "short_description_ar": "مجموعة الأحاديث النبوية الجامعة لأصول الإسلام وقواعد الأحكام والآداب.",
        "author_name": "Yaḥyā ibn Sharaf al-Nawawī",
        "author_name_ar": "الإمام يحيى بن شرف النووي",
        "author_era": "VIIe siècle H. / XIIIe siècle",
        "category_code": "hadith",
        "languages": ["FR", "EN", "AR", "FR/AR"],
        "cover_image_url": "/images/covers/arbain-nawawi.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-5-9",
        "page_count": 96,
        "estimated_reading_minutes": 140,
        "featured": False,
        "order": 5,
        "chapters": [
            (
                "Hadith 1 : Les actes ne valent que par les intentions",
                "Hadith 1: Actions are judged by intentions",
                "الحديث الأول: إنما الأعمال بالنيات",
                "D'après 'Umar ibn al-Khattab (qu'Allah l'agrée), le Messager d'Allah (ﷺ) a dit : « Les actes ne valent que par les intentions, et chaque homme n'aura que ce qu'il a eu réellement l'intention de faire. » (Rapporté par Al-Bukhari et Muslim).",
            ),
            (
                "Hadith 2 : Le Hadith de Jibril (Islam, Iman, Ihsan)",
                "Hadith 2: The Hadith of Jibril (Islam, Iman, Ihsan)",
                "الحديث الثاني: بيان الإسلام والإيمان والإحسان",
                "Ce hadith fondateur expose les trois degrés de la religion : la soumission extérieure par les cinq piliers (Al-Islam), la conviction intérieure par les six articles de foi (Al-Iman) et l'excellence spirituelle (Al-Ihsan).",
            ),
            (
                "Hadith 6 : Le licite est clair et l'illicite est clair",
                "Hadith 6: The lawful is clear and the unlawful is clear",
                "الحديث السادس: الحلال بيّن والحرام بيّن",
                "D'après An-Nu'man ibn Bashir (qu'Allah les agrée), le Prophète (ﷺ) a posé le principe fondamental de la scrupulosité (Wara') face aux zones d'ambiguïté (Mushtabihat) et le rôle central de la rectitude du cœur.",
            ),
        ],
    },
    {
        "code": "methode-arabe",
        "slug_fr": "methode-arabe",
        "slug_en": "arabic-learning-method",
        "slug_ar": "منهج-تعلم-العربية",
        "title_fr": "Méthode d'Apprentissage de l'Arabe",
        "title_en": "Arabic Learning Method",
        "title_ar": "منهج تعلم اللغة العربية",
        "original_arabic_title": "منهج رسالة لتعليم العربية",
        "subtitle_fr": "Phonétique, grammaire, vocabulaire et exercices de lecture",
        "subtitle_en": "Phonetics, grammar, vocabulary, and reading exercises",
        "subtitle_ar": "الأصوات، القواعد، المفردات وتمارين القراءة المتدرجة",
        "short_description_fr": "Parcours progressif pour maîtriser l'arabe standard moderne et l'arabe coranique : phonétique, grammaire, vocabulaire et exercices de lecture.",
        "short_description_en": "Progressive curriculum to master Modern Standard Arabic and Quranic Arabic: phonetics, grammar, vocabulary, and reading exercises.",
        "short_description_ar": "مسار تدريجي لإتقان العربية الفصحى ولغة القرآن الكريم قراءةً وفهماً.",
        "author_name": "Rissala",
        "author_name_ar": "فريق رسالة التعليمي",
        "author_era": "Époque contemporaine",
        "category_code": "langue-arabe",
        "languages": ["FR", "AR", "FR/AR"],
        "cover_image_url": "/images/covers/methode-arabe.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-6-6",
        "page_count": 220,
        "estimated_reading_minutes": 260,
        "featured": True,
        "order": 6,
        "chapters": [
            (
                "Module 1 : L'Alphabet Arabe et les Points d'Articulation (Makhārij)",
                "Module 1: The Arabic Alphabet and Points of Articulation",
                "الوحدة الأولى: الأبجدية العربية ومخارج الحروف",
                "Reconnaissance visuelle des 28 lettres dans leurs formes isolée, initiale, médiane et finale, accompagnée de leurs points d'articulation.",
            ),
            (
                "Module 2 : Voyelles Courtes (Ḥarakāt), Voyelles Longues (Madd) et Tanwīn",
                "Module 2: Short Vowels, Long Vowels, and Tanwin",
                "الوحدة الثانية: الحركات القصيرة والمدود والتنوين",
                "Maîtrise de la Fatha (ـَ), de la Kasra (ـِ), de la Damma (ـُ), du Sukūn (ـْ) et de la Shadda (ـّ) sur des mots vocalisés.",
            ),
            (
                "Module 3 : Structure de la Phrase Nominale et Verbale",
                "Module 3: Structure of Nominal and Verbal Sentences",
                "الوحدة الثالثة: الجملة الاسمية والجملة الفعلية",
                "Introduction pratique à la construction des phrases en arabe littéraire (Al-Jumla Al-Ismiyyah et Al-Jumla Al-Fi'liyyah).",
            ),
        ],
    },
    {
        "code": "ihya-ulum-al-din",
        "slug_fr": "ihya-ulum-al-din",
        "slug_en": "ihya-ulum-al-din",
        "slug_ar": "إحياء-علوم-الدين",
        "title_fr": "Iḥyāʾ ʿUlūm al-Dīn",
        "title_en": "Iḥyāʾ ʿUlūm al-Dīn (Revival of the Religious Sciences)",
        "title_ar": "إحياء علوم الدين",
        "original_arabic_title": "إحياء علوم الدين",
        "subtitle_fr": "Revivification des sciences de la religion : adoration, éthique et spiritualité",
        "subtitle_en": "Revival of the religious sciences: worship, ethics, and spirituality",
        "subtitle_ar": "موسوعة التزكية والأخلاق وأسرار العبادات",
        "short_description_fr": "Le chef-d'œuvre spirituel d'al-Ghazālī : revivification des sciences de la religion en quatre volumes. Couvre les actes d'adoration, les coutumes, les vices et les vertus.",
        "short_description_en": "Al-Ghazali's spiritual masterpiece: revival of the religious sciences in four parts covering worship, daily conduct, destructive vices, and saving virtues.",
        "short_description_ar": "المصنف الجامع للإمام أبي حامد الغزالي في فقه الباطن وأسرار العبادات ومكارم الأخلاق.",
        "author_name": "Abū Ḥāmid al-Ghazālī",
        "author_name_ar": "الإمام أبو حامد الغزالي",
        "author_era": "Ve siècle H. / XIe siècle",
        "category_code": "spiritualite",
        "languages": ["FR", "EN", "AR"],
        "cover_image_url": "/images/covers/ihya-ulum-al-din.jpg",
        "pdf_path": "/livres/demo.pdf",
        "isbn": "978-2-9589101-7-3",
        "page_count": 1500,
        "estimated_reading_minutes": 1200,
        "featured": False,
        "order": 7,
        "chapters": [
            (
                "Quart I : Le Livre de la Science (Kitāb al-ʿIlm) et les Secrets de l'Adoration",
                "Quarter I: The Book of Knowledge and Secrets of Worship",
                "الربع الأول: كتاب العلم وأسرار الطهارة والصلاة",
                "La noblesse de la science utile, l'éthique de l'étudiant et de l'enseignant, et la présence du cœur dans la purification et la prière.",
            ),
            (
                "Quart II : Les Coutumes et Éthique de la Vie Sociale (Al-ʿĀdāt)",
                "Quarter II: Ethics of Daily and Social Life",
                "الربع الثاني: آداب المعاش والأخوة والكسب الحلال",
                "Les règles de bienséance dans la nourriture, le mariage, l'acquisition licite des biens (Kasb al-Ḥalāl) et la fraternité en Allah.",
            ),
            (
                "Quarts III & IV : Les Périls de l'Âme (Muhlikāt) et les Vertus Salvatrices (Munjiyāt)",
                "Quarters III & IV: Destructive Vices and Saving Virtues",
                "الربعان الثالث والرابع: المهلكات والمنجيات",
                "Remèdes contre l'orgueil, l'ostentation et la colère, et culture du repentir, de la patience, de la gratitude et de l'amour d'Allah.",
            ),
        ],
    },
]


DEMO_COURSES_DATA = [
    {
        "code": "fondements-foi-pratique",
        "slug_fr": "fondements-de-la-foi-et-pratique",
        "slug_en": "foundations-of-faith-and-practice",
        "slug_ar": "أصول-الإيمان-والعبادات",
        "title_fr": "Fondements de la Foi & Pratique Quotidienne",
        "title_en": "Foundations of Faith & Daily Practice",
        "title_ar": "أصول الإيمان وفقه العبادات اليومية",
        "short_description_fr": "Maîtrisez les 5 piliers de l'Islam et les 6 articles de la Foi à travers une approche structurée du Hadith de Jibril.",
        "short_description_en": "Master the 5 pillars of Islam and 6 articles of Faith through a structured study of the Hadith of Jibril.",
        "short_description_ar": "دراسة منهجية لأركان الإسلام الخمسة وأركان الإيمان الستة في ضوء حديث جبريل.",
        "category_code": "sciences-islamiques",
        "level": Course.Level.BEGINNER,
        "instructor_name": "Pr. K. Al-Mansouri",
        "instructor_title": "Enseignant en Sciences Islamiques",
        "estimated_hours": 8.0,
        "objectives_fr": [
            "Comprendre l'articulation entre Islam, Iman et Ihsan",
            "Connaître les conditions de validité de la Shahada et de la Salat",
            "Maîtriser les règles essentielles du jeûne et de la Zakat",
        ],
        "modules": [
            ("Architecture du Hadith de Jibril", [("Introduction aux trois degrés de la religion", 25, True), ("Les 5 piliers de l'Islam expliqués", 30, False)]),
            ("Les 6 Articles de la Foi (Al-Iman)", [("Unicité divine, Anges et Livres révélés", 35, False), ("Les Prophètes, le Jour Dernier et le Destin", 30, False)]),
        ],
    },
    {
        "code": "introduction-sciences-hadith",
        "slug_fr": "introduction-aux-sciences-du-hadith",
        "slug_en": "introduction-to-hadith-sciences",
        "slug_ar": "مدخل-إلى-علوم-الحديث",
        "title_fr": "Introduction aux Sciences du Hadith (Mustalah al-Hadith)",
        "title_en": "Introduction to Hadith Sciences (Mustalah al-Hadith)",
        "title_ar": "مدخل إلى مصطلح الحديث وعلومه",
        "short_description_fr": "Découvrez comment les savants ont vérifié, classifié et préservé la Sunna prophétique à travers l'Isnad et le Matn.",
        "short_description_en": "Discover how scholars verified, classified, and preserved the Prophetic Sunnah through Isnad and Matn.",
        "short_description_ar": "التعرف على مناهج المحدثين في نقد السند والمتن وأقسام الحديث الصحيح والحسن والضعيف.",
        "category_code": "sciences-islamiques",
        "level": Course.Level.INTERMEDIATE,
        "instructor_name": "Dr. Y. Benali",
        "instructor_title": "Chercheur en Sciences du Hadith",
        "estimated_hours": 10.0,
        "objectives_fr": [
            "Distinguer l'Isnad (chaîne de transmission) du Matn (énoncé)",
            "Comprendre les 5 conditions du Hadith Sahih",
            "Identifier les 6 grands recueils canoniques (Al-Kutub As-Sittah)",
        ],
        "modules": [
            ("Histoire et Préservation de la Sunna", [("De la transmission orale à la codification", 28, True), ("Le système de l'Isnad", 32, False)]),
            ("Classification des Hadiths", [("Le Sahih, le Hasan et le Da'if", 35, False), ("Étude pratique des 40 Hadiths d'An-Nawawi", 40, False)]),
        ],
    },
    {
        "code": "initiation-usul-al-fiqh",
        "slug_fr": "initiation-aux-fondements-du-droit-usul-al-fiqh",
        "slug_en": "introduction-to-islamic-legal-theory-usul-al-fiqh",
        "slug_ar": "مدخل-إلى-أصول-الفقه",
        "title_fr": "Initiation aux Fondements du Droit (Usul al-Fiqh & Maqasid)",
        "title_en": "Introduction to Islamic Legal Theory (Usul al-Fiqh & Maqasid)",
        "title_ar": "مدخل إلى أصول الفقه ومقاصد الشريعة",
        "short_description_fr": "Comprenez les sources du droit islamique (Coran, Sunna, Ijma', Qiyas) et les cinq finalités supérieures de la Loi (Maqasid).",
        "short_description_en": "Understand the sources of Islamic law (Quran, Sunnah, Ijma', Qiyas) and the five higher objectives (Maqasid).",
        "short_description_ar": "دراسة الأدلة الشرعية الكلية والأحكام التكليفية الخمسة ومقاصد الشريعة.",
        "category_code": "sciences-islamiques",
        "level": Course.Level.ADVANCED,
        "instructor_name": "Pr. K. Al-Mansouri",
        "instructor_title": "Enseignant en Droit Comparé",
        "estimated_hours": 12.0,
        "objectives_fr": [
            "Maîtriser les 5 qualifications juridiques (Al-Ahkam Al-Khamsah)",
            "Comprendre le raisonnement analogique (Qiyas) et le consensus (Ijma')",
            "Articuler la lettre du texte et les finalités (Maqasid al-Shari'a)",
        ],
        "modules": [
            ("Les Qualifications Juridiques (Al-Ahkam)", [("Obligatoire, Recommandé, Permis, Déconseillé, Interdit", 30, True), ("Causes, Conditions et Empêchements", 35, False)]),
            ("Les Sources et Finalités", [("Coran, Sunna, Ijma' et Qiyas", 40, False), ("Les 5 Maqasid al-Daruriyyah", 35, False)]),
        ],
    },
    {
        "code": "arabe-alphabet-lecture",
        "slug_fr": "arabe-niveau-1-alphabet-lecture-et-prononciation",
        "slug_en": "arabic-level-1-alphabet-reading-and-pronunciation",
        "slug_ar": "المستوى-الأول-حروف-الهجاء-والقراءة",
        "title_fr": "Arabe Niveau 1 : Alphabet, Voyelles (Harakat) & Lecture Fluide",
        "title_en": "Arabic Level 1: Alphabet, Vowels (Harakat) & Fluent Reading",
        "title_ar": "المستوى الأول: حروف الهجاء والحركات والقراءة السليمة",
        "short_description_fr": "Apprenez à lire et écrire l'arabe vocalisé pas à pas : les 28 lettres, leurs 4 positions, les voyelles brèves et longues.",
        "short_description_en": "Learn to read and write vocalized Arabic step by step: the 28 letters, their 4 positions, short and long vowels.",
        "short_description_ar": "تعلم قراءة وكتابة الحروف العربية بأشكالها المختلفة مع الحركات والمدود والتنوين.",
        "category_code": "langue-arabe",
        "level": Course.Level.BEGINNER,
        "instructor_name": "Ustadh M. Al-Fassi",
        "instructor_title": "Professeur de Langue Arabe Littéraire",
        "estimated_hours": 9.0,
        "objectives_fr": [
            "Identifier et tracer les 28 lettres en position isolée, initiale, médiane et finale",
            "Maîtriser les voyelles brèves (Fatha, Kasra, Damma), le Sukun et la Shadda",
            "Lire des phrases complètes vocalisées sans hésitation",
        ],
        "modules": [
            ("Les 28 Lettres et Points d'Articulation", [("Les lettres solaires et lunaires", 25, True), ("Liaison des lettres dans le mot", 30, False)]),
            ("Le Système Vocalique (Harakat & Mudud)", [("Fatha, Kasra, Damma et Tanwin", 30, False), ("Sukun, Shadda et exercices de lecture", 35, False)]),
        ],
    },
    {
        "code": "grammaire-arabe-nahw-debutant",
        "slug_fr": "grammaire-arabe-nahw-phrase-nominale-et-verbale",
        "slug_en": "arabic-grammar-nahw-nominal-and-verbal-sentences",
        "slug_ar": "قواعد-النحو-الجملة-الاسمية-والفعلية",
        "title_fr": "Grammaire Arabe (An-Nahw) : Phrase Nominale & Phrase Verbale",
        "title_en": "Arabic Grammar (An-Nahw): Nominal & Verbal Sentences",
        "title_ar": "قواعد النحو العربي: الجملة الاسمية والجملة الفعلية",
        "short_description_fr": "Comprenez l'architecture de la phrase arabe : Mubtada et Khabar, Fi'l et Fa'il, et les règles fondamentales de l'I'rab.",
        "short_description_en": "Understand the architecture of the Arabic sentence: Mubtada and Khabar, Fi'l and Fa'il, and the rules of I'rab.",
        "short_description_ar": "دراسة تطبيقية لأركان الجملة الاسمية والجملة الفعلية وعلامات الإعراب الأصلية.",
        "category_code": "langue-arabe",
        "level": Course.Level.INTERMEDIATE,
        "instructor_name": "Ustadh M. Al-Fassi",
        "instructor_title": "Professeur de Langue Arabe Littéraire",
        "estimated_hours": 11.0,
        "objectives_fr": [
            "Distinguer Ism (nom), Fi'l (verbe) et Harf (particule)",
            "Analyser une phrase nominale (Al-Jumlah Al-Ismiyyah)",
            "Analyser une phrase verbale (Al-Jumlah Al-Fi'liyyah) et ses compléments",
        ],
        "modules": [
            ("La Phrase Nominale (Al-Jumlah Al-Ismiyyah)", [("Le Mubtada et le Khabar", 30, True), ("L'effet de Kana et Inna", 35, False)]),
            ("La Phrase Verbale (Al-Jumlah Al-Fi'liyyah)", [("Verbe accompli (Madi) et inaccompli (Mudari')", 35, False), ("Le sujet (Fa'il) et le COD (Maf'ul bihi)", 35, False)]),
        ],
    },
    {
        "code": "etude-texte-al-ajurrumiyyah",
        "slug_fr": "commentaire-methodique-dal-ajurrumiyyah",
        "slug_en": "methodical-commentary-on-al-ajurrumiyyah",
        "slug_ar": "شرح-متن-الآجرومية",
        "title_fr": "Étude Textuelle : Commentaire d'Al-Ajurrumiyyah",
        "title_en": "Textual Study: Commentary on Al-Ajurrumiyyah",
        "title_ar": "شرح وتطبيق متن المقدمة الآجرومية",
        "short_description_fr": "Lecture expliquée du célèbre précis d'Ibn Ajurrum avec tableaux récapitulatifs et exercices d'analyse grammaticale (I'rab).",
        "short_description_en": "Explained reading of Ibn Ajurrum's classic primer with summary tables and grammatical parsing (I'rab) exercises.",
        "short_description_ar": "قراءة تحليلية لمتن الآجرومية مع تدريبات عملية على إعراب الآيات والأمثلة الفصيحة.",
        "category_code": "langue-arabe",
        "level": Course.Level.ADVANCED,
        "instructor_name": "Ustadh M. Al-Fassi",
        "instructor_title": "Professeur de Langue Arabe Littéraire",
        "estimated_hours": 14.0,
        "objectives_fr": [
            "Maîtriser les signes principaux et secondaires de l'I'rab",
            "Identifier les Marfu'at, Mansubat et Majrurat dans un texte arabe classique",
            "Réaliser l'analyse grammaticale complète (I'rab) de phrases classiques",
        ],
        "modules": [
            ("Kalam et Signes de l'I'rab", [("Analyse du premier chapitre d'Al-Ajurrumiyyah", 35, True), ("Tableau complet des signes de déclinaison", 40, False)]),
            ("Les Noms Déclinés (Marfu'at & Mansubat)", [("Sujet, substitut du sujet et annexes", 40, False), ("Compléments circonstanciels et Hal", 40, False)]),
        ],
    },
    {
        "code": "principes-finance-islamique",
        "slug_fr": "fondamentaux-de-la-finance-islamique",
        "slug_en": "fundamentals-of-islamic-finance",
        "slug_ar": "أساسيات-المالية-الإسلامية",
        "title_fr": "Fondamentaux de la Finance Islamique & Éthique Économique",
        "title_en": "Fundamentals of Islamic Finance & Economic Ethics",
        "title_ar": "أساسيات المالية الإسلامية والاقتصاد الأخلاقي",
        "short_description_fr": "Comprenez les trois interdictions majeures (Riba, Gharar, Maysir), l'adossement à l'actif réel et le partage des profits et des risques.",
        "short_description_en": "Understand the three major prohibitions (Riba, Gharar, Maysir), asset-backing, and profit-and-loss sharing.",
        "short_description_ar": "دراسة الضوابط الشرعية للمعاملات المالية: تحريم الربا والغرر والميسر وربط التمويل بالاقتصاد الحقيقي.",
        "category_code": "finance-islamique",
        "level": Course.Level.BEGINNER,
        "instructor_name": "Dr. S. El-Amrani",
        "instructor_title": "Économiste & Spécialiste en Finance Islamique",
        "estimated_hours": 8.5,
        "objectives_fr": [
            "Distinguer Riba al-Dayn et Riba al-Buyu'",
            "Comprendre la différence entre Gharar majeur (interdit) et Gharar mineur (toléré)",
            "Saisir la logique économique de la règle Al-Ghunm bil-Ghurm",
        ],
        "modules": [
            ("Les Interdictions Structurantes", [("Pourquoi l'usure (Riba) est prohibée", 28, True), ("Gharar (incertitude) et Maysir (spéculation pure)", 32, False)]),
            ("Principes Positifs de l'Économie Islamique", [("Adossement à l'économie réelle", 30, False), ("Partage des risques et justice contractuelle", 30, False)]),
        ],
    },
    {
        "code": "contrats-financement-islamique",
        "slug_fr": "contrats-de-financement-murabaha-ijara-musharaka",
        "slug_en": "islamic-financing-contracts-murabaha-ijara-musharaka",
        "slug_ar": "عقود-التمويل-مرابحة-إجارة-مشاركة",
        "title_fr": "Contrats de Financement : Murabaha, Ijara, Mudaraba & Musharaka",
        "title_en": "Financing Contracts: Murabaha, Ijara, Mudaraba & Musharaka",
        "title_ar": "عقود التمويل والاستثمار: المرابحة والإجارة والمضاربة والمشاركة",
        "short_description_fr": "Étude technique et jurisprudentielle des contrats commerciaux et participatifs selon les standards AAOIFI.",
        "short_description_en": "Technical and jurisprudential study of commercial and participatory contracts according to AAOIFI standards.",
        "short_description_ar": "تحليل فقهي وتطبيقي لعقود المداينات والمشاركات وفق معايير أيوفي (AAOIFI).",
        "category_code": "finance-islamique",
        "level": Course.Level.INTERMEDIATE,
        "instructor_name": "Dr. S. El-Amrani",
        "instructor_title": "Économiste & Spécialiste en Finance Islamique",
        "estimated_hours": 12.0,
        "objectives_fr": [
            "Vérifier les conditions de validité d'une Murabaha (propriété et détention préalable)",
            "Structurer un contrat d'Ijara Muntahiya Bittamlik",
            "Comparer Mudaraba et Musharaka dégressive (Diminishing Musharaka)",
        ],
        "modules": [
            ("Contrats Commerciaux (Murabaha, Salam, Istisna')", [("Conditions AAOIFI de la Murabaha", 35, True), ("Ijara et transfert de propriété", 35, False)]),
            ("Contrats Participatifs (Mudaraba & Musharaka)", [("Répartition des profits et prise en charge des pertes", 40, False), ("Étude de cas : financement immobilier participatif", 40, False)]),
        ],
    },
    {
        "code": "zakat-sukuk-marches-capitaux",
        "slug_fr": "zakat-entreprise-sukuk-et-marches-des-capitaux",
        "slug_en": "corporate-zakat-sukuk-and-capital-markets",
        "slug_ar": "زكاة-الأموال-والصكوك-وأسواق-المال",
        "title_fr": "Zakat Patrimoniale, Sukuk & Filtrage Boursier (Sharia Screening)",
        "title_en": "Wealth Zakat, Sukuk & Equity Sharia Screening",
        "title_ar": "فقه الزكاة المعاصر والصكوك الإسلامية وضوابط الأسهم",
        "short_description_fr": "Maîtrisez le calcul de la Zakat sur les actifs modernes, la structuration des Sukuk et le filtrage financier des actions.",
        "short_description_en": "Master Zakat calculation on modern assets, Sukuk structuring, and financial screening of equities.",
        "short_description_ar": "دراسة تطبيقية لحساب زكاة الأصول المعاصرة وهيكلة الصكوك ومعايير الفحص الشرعي للأسهم.",
        "category_code": "finance-islamique",
        "level": Course.Level.ADVANCED,
        "instructor_name": "Dr. S. El-Amrani",
        "instructor_title": "Économiste & Spécialiste en Finance Islamique",
        "estimated_hours": 11.0,
        "objectives_fr": [
            "Calculer le Nisab et l'assiette zakatable d'un portefeuille financier",
            "Distinguer une obligation conventionnelle d'un certificat de Sukuk",
            "Appliquer les ratios de filtrage boursier et de purification des dividendes",
        ],
        "modules": [
            ("Fiqh Contemporain de la Zakat", [("Liquidités, actions, immobilisations et dettes", 35, True), ("Cas pratiques avec le calculateur Rissala", 30, False)]),
            ("Sukuk et Marchés Financiers", [("Structuration des Sukuk al-Ijara et Sukuk Verts", 35, False), ("Sharia Screening des actions et gouvernance AAOIFI", 40, False)]),
        ],
    },
]


def _generate_valid_epub_bytes(b_data: dict) -> bytes:
    """Generate a structurally valid EPUB 3 archive (ZIP with mimetype, container.xml, OPF, nav, XHTML chapters)."""
    import html
    import io
    import zipfile

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        # 1. mimetype MUST be first and uncompressed (ZIP_STORED)
        zf.writestr("mimetype", b"application/epub+zip", compress_type=zipfile.ZIP_STORED)

        # 2. META-INF/container.xml
        container_xml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n'
            "  <rootfiles>\n"
            '    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>\n'
            "  </rootfiles>\n"
            "</container>\n"
        )
        zf.writestr("META-INF/container.xml", container_xml.encode("utf-8"), compress_type=zipfile.ZIP_DEFLATED)

        # 3. Chapters XHTML & Manifest items
        manifest_items = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>']
        spine_items = []
        nav_links = []

        for idx, (ch_fr, _ch_en, ch_ar, ch_body) in enumerate(b_data["chapters"], start=1):
            fname = f"chapter-{idx}.xhtml"
            item_id = f"chap{idx}"
            manifest_items.append(f'<item id="{item_id}" href="{fname}" media-type="application/xhtml+xml"/>')
            spine_items.append(f'<itemref idref="{item_id}"/>')
            nav_links.append(f'<li><a href="{fname}">{html.escape(ch_fr)}</a></li>')

            chapter_xhtml = (
                '<?xml version="1.0" encoding="UTF-8"?>\n'
                '<!DOCTYPE html>\n'
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">\n'
                f"<head><title>{html.escape(ch_fr)}</title></head>\n"
                "<body>\n"
                f"  <h1>{html.escape(ch_fr)}</h1>\n"
                f'  <p dir="rtl" lang="ar">{html.escape(ch_ar)}</p>\n'
                f"  <div><p>{html.escape(ch_body)}</p></div>\n"
                "</body>\n"
                "</html>\n"
            )
            zf.writestr(f"OEBPS/{fname}", chapter_xhtml.encode("utf-8"), compress_type=zipfile.ZIP_DEFLATED)

        # 4. OEBPS/nav.xhtml
        nav_xhtml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<!DOCTYPE html>\n'
            '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="fr" lang="fr">\n'
            f"<head><title>{html.escape(b_data['title_fr'])}</title></head>\n"
            "<body>\n"
            '  <nav epub:type="toc" id="toc">\n'
            f"    <h1>{html.escape(b_data['title_fr'])}</h1>\n"
            f"    <ol>{''.join(nav_links)}</ol>\n"
            "  </nav>\n"
            "</body>\n"
            "</html>\n"
        )
        zf.writestr("OEBPS/nav.xhtml", nav_xhtml.encode("utf-8"), compress_type=zipfile.ZIP_DEFLATED)

        # 5. OEBPS/content.opf
        opf_xml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId">\n'
            '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n'
            f'    <dc:identifier id="BookId">urn:isbn:{html.escape(b_data["isbn"])}</dc:identifier>\n'
            f'    <dc:title>{html.escape(b_data["title_fr"])}</dc:title>\n'
            f'    <dc:creator>{html.escape(b_data["author_name"])}</dc:creator>\n'
            "    <dc:language>fr</dc:language>\n"
            "  </metadata>\n"
            f"  <manifest>{''.join(manifest_items)}</manifest>\n"
            f"  <spine>{''.join(spine_items)}</spine>\n"
            "</package>\n"
        )
        zf.writestr("OEBPS/content.opf", opf_xml.encode("utf-8"), compress_type=zipfile.ZIP_DEFLATED)

    return buf.getvalue()


def _repair_mojibake(raw_text: str) -> str:
    """Repair double-encoded UTF-8 mojibake if present (stripping BOM first)."""
    cleaned = (raw_text or "").lstrip("\ufeff")
    if "\u00c3\u00a9" in cleaned or "\u00c3\u00a8" in cleaned or "\u00c3\u00a0" in cleaned:
        try:
            return cleaned.encode("cp1252").decode("utf-8")
        except Exception:
            try:
                return cleaned.encode("latin1").decode("utf-8")
            except Exception:
                return cleaned
    return cleaned


class Command(BaseCommand):
    help = "Idempotent database seeding for Rissala (Articles FR/EN/AR, Books EPUB/PDF, Categories, 9 Demo Courses)."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("1. Seeding global SEO settings and editorial categories...")
        SiteSEOSettings.objects.get_or_create(id=1)

        cat_map: dict[str, Category] = {}
        for c_data in EDITORIAL_CATEGORIES:
            cat, _ = Category.objects.update_or_create(
                code=c_data["code"],
                defaults=c_data,
            )
            cat_map[c_data["code"]] = cat

        self.stdout.write("2. Importing Markdown articles from seed_data/content/{fr,en,ar}...")
        seed_root = Path(settings.BASE_DIR) / "seed_data" / "content"
        if not seed_root.exists():
            seed_root = Path(settings.BASE_DIR) / "content"

        folder_to_section = {
            "sciences-islamiques": (Category.SectionType.ISLAMIC_SCIENCES, "sciences-coran-hadith"),
            "apprendre-arabe": (Category.SectionType.ARABIC_LANGUAGE, "langue-arabe-cursus"),
            "fiqh-al-muamalat": (Category.SectionType.ISLAMIC_FINANCE, "fiqh-muamalat"),
            "actualites": (Category.SectionType.NEWS, "economie-finance"),
        }

        fondements_slugs = {
            "shahada",
            "salat",
            "zakat",
            "sawm",
            "hajj",
            "foi-en-allah",
            "les-anges",
            "les-livres",
            "les-prophetes",
            "jour-dernier",
            "le-destin",
        }

        imported_articles = 0
        for lang in ("fr", "en", "ar"):
            lang_dir = seed_root / lang
            if not lang_dir.exists():
                continue
            for folder_name, (section_type, default_cat_code) in folder_to_section.items():
                sec_dir = lang_dir / folder_name
                if not sec_dir.exists():
                    continue
                Article.objects.filter(slug__iexact="readme").delete()
                for idx, md_file in enumerate(sorted(sec_dir.rglob("*.md")), start=1):
                    if md_file.name.lower() == "readme.md":
                        continue
                    raw_text = md_file.read_text(encoding="utf-8", errors="replace")
                    raw_text = _repair_mojibake(raw_text)
                    meta, body_md = parse_frontmatter(raw_text)

                    slug = md_file.stem
                    canonical_key_slug = (
                        "riba-usure-explication"
                        if slug == "riba-usure-explanation"
                        else slug
                    )
                    group_key = f"{folder_name}/{canonical_key_slug}"
                    t_group, _ = TranslationGroup.objects.get_or_create(
                        canonical_key=group_key,
                        defaults={"section_type": section_type, "notes": group_key},
                    )

                    cat_code = default_cat_code
                    if section_type == Category.SectionType.ISLAMIC_SCIENCES and slug in fondements_slugs:
                        cat_code = "fondements-foi"
                    category_obj = cat_map.get(cat_code)

                    title = str(meta.get("title") or slug.replace("-", " ").title()).strip()
                    description = str(meta.get("description") or meta.get("excerpt") or "").strip()
                    image_url = str(meta.get("image") or "").strip()
                    if image_url and not image_url.startswith("/static/") and image_url.startswith("/images/"):
                        image_url = f"/static{image_url}"

                    is_demo = slug.startswith("placeholder-")
                    preserve_arabic = section_type == Category.SectionType.ARABIC_LANGUAGE
                    ped_lang = "ar" if preserve_arabic else lang

                    read_time_raw = str(meta.get("readTime") or meta.get("readingTime") or "6")
                    digits = "".join(ch for ch in read_time_raw if ch.isdigit())
                    reading_minutes = int(digits) if digits else 6

                    article, _ = Article.objects.update_or_create(
                        language=lang,
                        section_type=section_type,
                        slug=slug,
                        defaults={
                            "translation_group": t_group,
                            "title": title,
                            "summary": description[:600],
                            "content_markdown": body_md,
                            "category": category_obj,
                            "pedagogical_language": ped_lang,
                            "preserve_arabic_content": preserve_arabic,
                            "author_name": str(meta.get("author") or "Rédaction Rissala")[:120],
                            "featured_image_url": image_url,
                            "reading_time_minutes": reading_minutes,
                            "level": str(meta.get("level") or "")[:50],
                            "status": Article.Status.PUBLISHED,
                            "published_at": timezone.now(),
                            "order": int(meta.get("order", idx)) if str(meta.get("order", "")).isdigit() else idx,
                            "is_featured": bool(meta.get("featured", False)) or slug == "essor-finance-islamique-europe-2026",
                            "is_demo": is_demo,
                            "editorial_nature": (
                                Article.EditorialNature.PEDAGOGICAL_SYNTHESIS
                                if section_type != Category.SectionType.NEWS
                                else Article.EditorialNature.NEWS_REPORT
                            ),
                            "sources_references": (
                                "Sources classiques : Coran, Recueils authentiques (Al-Bukhari, Muslim), standards AAOIFI / IFSB et ouvrages de référence."
                            ),
                            "seo_title": title[:160],
                            "seo_description": description[:320],
                        },
                    )

                    tags_raw = meta.get("tags")
                    if isinstance(tags_raw, list):
                        for t_name in tags_raw:
                            t_str = str(t_name).strip()
                            if not t_str:
                                continue
                            t_slug = slugify(t_str) or "tag"
                            tag_obj, _ = Tag.objects.get_or_create(
                                slug=t_slug,
                                defaults={"name_fr": t_str, "name_en": t_str, "name_ar": t_str},
                            )
                            article.tags.add(tag_obj)

                    imported_articles += 1

        self.stdout.write(f"   -> Imported/updated {imported_articles} articles across FR, EN, AR.")

        self.stdout.write("3. Seeding Books, Editions, Chapters, and EPUB/PDF Files...")
        import hashlib

        canonical_cat_codes = [bc["code"] for bc in BOOK_CATEGORIES_DATA]
        canonical_book_codes = [b["code"] for b in BOOKS_DATA]
        Book.objects.exclude(code__in=canonical_book_codes).delete()
        BookCategory.objects.exclude(code__in=canonical_cat_codes).delete()

        book_cat_map: dict[str, BookCategory] = {}
        for bc in BOOK_CATEGORIES_DATA:
            bcat, _ = BookCategory.objects.update_or_create(code=bc["code"], defaults=bc)
            book_cat_map[bc["code"]] = bcat

        lang_objs: dict[str, BookLanguage] = {}
        for code, n_fr, n_en, n_ar, is_bi in [
            ("FR", "Français", "French", "الفرنسية", False),
            ("EN", "Anglais", "English", "الإنجليزية", False),
            ("AR", "Arabe", "Arabic", "العربية", False),
            ("FR/AR", "Bilingue Français / Arabe", "Bilingual French / Arabic", "ثنائي اللغة (فرنسي / عربي)", True),
        ]:
            l_obj, _ = BookLanguage.objects.update_or_create(
                code=code,
                defaults={"name_fr": n_fr, "name_en": n_en, "name_ar": n_ar, "is_bilingual": is_bi},
            )
            lang_objs[code] = l_obj

        publisher, _ = BookPublisher.objects.get_or_create(
            slug="editions-rissala",
            defaults={
                "name": "Éditions Numériques Rissala",
                "location": "Paris / Marseille",
                "website": "https://rissala.net",
            },
        )

        livres_dir = Path(settings.BASE_DIR) / "static" / "livres"
        livres_dir.mkdir(parents=True, exist_ok=True)

        for b_data in BOOKS_DATA:
            author_slug = slugify(b_data["author_name"]) or b_data["code"]
            author, _ = BookAuthor.objects.update_or_create(
                slug=author_slug,
                defaults={
                    "name": b_data["author_name"],
                    "name_ar": b_data["author_name_ar"],
                    "era": b_data["author_era"],
                },
            )

            book, _ = Book.objects.update_or_create(
                code=b_data["code"],
                defaults={
                    "slug_fr": b_data["slug_fr"],
                    "slug_en": b_data["slug_en"],
                    "slug_ar": b_data["slug_ar"],
                    "title_fr": b_data["title_fr"],
                    "title_en": b_data["title_en"],
                    "title_ar": b_data["title_ar"],
                    "original_arabic_title": b_data["original_arabic_title"],
                    "subtitle_fr": b_data["subtitle_fr"],
                    "subtitle_en": b_data["subtitle_en"],
                    "subtitle_ar": b_data["subtitle_ar"],
                    "short_description_fr": b_data["short_description_fr"],
                    "short_description_en": b_data["short_description_en"],
                    "short_description_ar": b_data["short_description_ar"],
                    "long_description_fr": b_data["short_description_fr"],
                    "long_description_en": b_data["short_description_en"],
                    "long_description_ar": b_data["short_description_ar"],
                    "category": book_cat_map.get(b_data["category_code"]),
                    "publisher": publisher,
                    "cover_image_url": b_data["cover_image_url"],
                    "isbn": b_data["isbn"],
                    "publication_year": 2025,
                    "page_count": b_data["page_count"],
                    "estimated_reading_minutes": b_data["estimated_reading_minutes"],
                    "access_type": Book.AccessType.FREE,
                    "status": Book.Status.PUBLISHED,
                    "is_featured": b_data.get("featured", True),
                    "order": b_data["order"],
                },
            )
            book.authors.set([author])
            book.languages.set([lang_objs[c] for c in b_data["languages"] if c in lang_objs])

            edition, _ = BookEdition.objects.update_or_create(
                book=book,
                edition_number="1re édition numérique Rissala",
                defaults={
                    "title": b_data["title_fr"],
                    "publisher": publisher,
                    "language": lang_objs.get("FR/AR"),
                    "isbn": b_data["isbn"],
                    "publication_year": 2025,
                    "page_count": b_data["page_count"],
                    "is_default": True,
                    "table_of_contents_json": [
                        {"order": idx + 1, "title_fr": ch[0], "title_en": ch[1], "title_ar": ch[2]}
                        for idx, ch in enumerate(b_data["chapters"])
                    ],
                },
            )

            # Compute real PDF size & SHA-256
            pdf_rel = b_data["pdf_path"].lstrip("/")
            pdf_disk_path = Path(settings.BASE_DIR) / "static" / pdf_rel
            if pdf_disk_path.exists():
                pdf_bytes = pdf_disk_path.read_bytes()
                pdf_size = len(pdf_bytes)
                pdf_sha256 = hashlib.sha256(pdf_bytes).hexdigest()
            else:
                pdf_size = 0
                pdf_sha256 = ""

            BookFile.objects.update_or_create(
                book=book,
                edition=edition,
                file_format=BookFile.Format.PDF,
                defaults={
                    "external_path": b_data["pdf_path"],
                    "mime_type": "application/pdf",
                    "file_size_bytes": pdf_size,
                    "checksum_sha256": pdf_sha256,
                    "is_downloadable": True,
                    "is_streamable": True,
                },
            )

            # Generate valid EPUB 3 file on disk and compute real size & SHA-256
            epub_bytes = _generate_valid_epub_bytes(b_data)
            epub_filename = f"{b_data['code']}.epub"
            epub_disk_path = livres_dir / epub_filename
            epub_disk_path.write_bytes(epub_bytes)
            epub_sha256 = hashlib.sha256(epub_bytes).hexdigest()

            BookFile.objects.update_or_create(
                book=book,
                edition=edition,
                file_format=BookFile.Format.EPUB,
                defaults={
                    "external_path": f"/livres/{epub_filename}",
                    "mime_type": "application/epub+zip",
                    "file_size_bytes": len(epub_bytes),
                    "checksum_sha256": epub_sha256,
                    "is_downloadable": True,
                    "is_streamable": True,
                },
            )

            for c_idx, (c_title_fr, c_title_en, c_title_ar, c_body) in enumerate(b_data["chapters"], start=1):
                BookChapter.objects.update_or_create(
                    book=book,
                    order=c_idx,
                    defaults={
                        "edition": edition,
                        "slug": f"chapitre-{c_idx}",
                        "title_fr": c_title_fr,
                        "title_en": c_title_en,
                        "title_ar": c_title_ar,
                        "content_fr": c_body,
                        "content_en": c_body,
                        "content_ar": c_body,
                        "estimated_reading_minutes": 15,
                        "start_page": (c_idx - 1) * 12 + 1,
                    },
                )

        self.stdout.write(f"   -> Seeded {len(BOOKS_DATA)} books with chapters, editions, and valid EPUB/PDF files.")

        self.stdout.write("4. Seeding 9 Structured Video Courses (marked is_demo=True)...")
        for c_idx, c_data in enumerate(DEMO_COURSES_DATA, start=1):
            total_lessons = sum(len(m[1]) for m in c_data["modules"])
            course, _ = Course.objects.update_or_create(
                code=c_data["code"],
                defaults={
                    "slug_fr": c_data["slug_fr"],
                    "slug_en": c_data["slug_en"],
                    "slug_ar": c_data["slug_ar"],
                    "title_fr": c_data["title_fr"],
                    "title_en": c_data["title_en"],
                    "title_ar": c_data["title_ar"],
                    "short_description_fr": c_data["short_description_fr"],
                    "short_description_en": c_data["short_description_en"],
                    "short_description_ar": c_data["short_description_ar"],
                    "long_description_fr": c_data["short_description_fr"],
                    "long_description_en": c_data["short_description_en"],
                    "long_description_ar": c_data["short_description_ar"],
                    "category_code": c_data["category_code"],
                    "level": c_data["level"],
                    "language": "fr",
                    "pedagogical_language": "ar" if c_data["category_code"] == "langue-arabe" else "fr",
                    "instructor_name": c_data["instructor_name"],
                    "instructor_title": c_data["instructor_title"],
                    "estimated_hours": c_data["estimated_hours"],
                    "lessons_count": total_lessons,
                    "objectives_fr": c_data["objectives_fr"],
                    "objectives_en": c_data["objectives_fr"],
                    "objectives_ar": c_data["objectives_fr"],
                    "access_type": Course.AccessType.FREE,
                    "status": Course.Status.PUBLISHED,
                    "is_featured": c_idx <= 3,
                    "is_demo": True,
                    "order": c_idx,
                },
            )

            for m_idx, (m_title, m_lessons) in enumerate(c_data["modules"], start=1):
                mod, _ = CourseModule.objects.update_or_create(
                    course=course,
                    order=m_idx,
                    defaults={
                        "title_fr": m_title,
                        "title_en": m_title,
                        "title_ar": m_title,
                    },
                )
                for l_idx, (l_title, l_dur, l_free) in enumerate(m_lessons, start=1):
                    Lesson.objects.update_or_create(
                        module=mod,
                        order=l_idx,
                        defaults={
                            "slug": f"module-{m_idx}-lecon-{l_idx}",
                            "title_fr": l_title,
                            "title_en": l_title,
                            "title_ar": l_title,
                            "summary_fr": f"Support pédagogique de démonstration de la leçon « {l_title} » ({course.title_fr}).",
                            "duration_minutes": l_dur,
                            "video_provider": Lesson.VideoProvider.HLS,
                            "video_asset_id": "",
                            "is_free_preview": l_free,
                            "is_demo": True,
                        },
                    )

        self.stdout.write(self.style.SUCCESS("Rissala database seeding completed idempotently!"))
