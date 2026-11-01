from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.db import IntegrityError
from django.test import Client, TestCase
from django.utils import timezone

from books.models import Book
from content.admin import ArticleAdmin, TranslationGroupAdmin
from content.models import Article, Category, Rubrique, TranslationGroup
from courses.models import Course

User = get_user_model()


class RissalaCMSMultilingualTestSuite(TestCase):
    """
    Test suite verifying the 14 mandatory acceptance criteria of the Rissala CMS refactor:
    1. French content creation in Islamic Sciences
    2. English content creation in Arabic Language
    3. Arabic content creation in Islamic Finance
    4. News creation in all three languages (FR/EN/AR)
    5. Multi-translation association to the same logical content
    6. Modification of one translation without altering others
    7. Prevention of duplicate language translations for the same content
    8. Slug collision auto-resolution
    9. Exact filtering by rubrique and language
    10. Complete exclusion of drafts from public frontend
    11. RTL direction & Arabic typography on public views
    12. Total preservation of legacy content and files
    13. Django admin permissions & editorial role enforcement
    14. Django admin translation indicators and management panel
    """

    @classmethod
    def setUpTestData(cls):
        call_command("seed_rissala")
        cls.admin_user = User.objects.create_superuser(
            email="superadmin@rissala.net",
            pseudo="super_admin",
            password="StrongAdminPassword123!",
        )
        cls.editor_user = User.objects.create_user(
            email="editor_cms@rissala.net",
            pseudo="editor_cms",
            password="StrongEditorPassword123!",
            role=User.Role.EDITOR,
            is_staff=True,
        )
        cls.member_user = User.objects.create_user(
            email="member_cms@rissala.net",
            pseudo="member_cms",
            password="StrongMemberPassword123!",
            role=User.Role.MEMBER,
            is_staff=False,
        )

    def setUp(self):
        self.client = Client()

    # 1. Création d'un contenu français dans les sciences islamiques
    def test_01_creation_francais_sciences_islamiques(self):
        art = Article.objects.create(
            title="Introduction aux Usul al-Fiqh",
            slug="introduction-aux-usul-al-fiqh-test",
            summary="Vue synthétique des sources juridiques en Islam.",
            content_markdown="## Introduction\n\nLes sources fondamentales sont le Coran et la Sunna.",
            language="fr",
            section_type=Rubrique.ISLAMIC_SCIENCES,
            status=Article.Status.PUBLISHED,
            author=self.editor_user,
        )
        self.assertEqual(art.section_type, "islamic_sciences")
        self.assertEqual(art.rubrique, "islamic_sciences")
        self.assertEqual(art.language, "fr")
        self.assertIn("Introduction", art.content_html)
        self.assertIn("/fr/sciences-islamiques/introduction-aux-usul-al-fiqh-test/", art.get_absolute_url())

    # 2. Création d'un contenu anglais dans la langue arabe
    def test_02_creation_anglais_langue_arabe(self):
        art = Article.objects.create(
            title="Mastering Arabic Diacritics",
            slug="mastering-arabic-diacritics-test",
            summary="A comprehensive pedagogical guide to Harakat in classical Arabic.",
            content_markdown="## Overview\n\nShort vowels include Fatha, Kasra, and Damma.",
            language="en",
            section_type=Rubrique.ARABIC_LANGUAGE,
            status=Article.Status.PUBLISHED,
            author=self.editor_user,
        )
        self.assertEqual(art.section_type, "arabic_language")
        self.assertEqual(art.language, "en")
        self.assertIn("/en/arabic-language/mastering-arabic-diacritics-test/", art.get_absolute_url())

    # 3. Création d'un contenu arabe dans la finance islamique
    def test_03_creation_arabe_finance_islamique(self):
        art = Article.objects.create(
            title="أحكام عقد المرابحة للآمر بالشراء",
            slug="ahkam-mourabaha-test",
            summary="دراسة فقهية تأصيلية لضوابط المرابحة المصرفية المعاصرة.",
            content_markdown="## الضوابط الشرعية\n\nيشترط تملك الأصل وقبضه قبل بيعه للعميل.",
            language="ar",
            section_type=Rubrique.ISLAMIC_FINANCE,
            status=Article.Status.PUBLISHED,
            author=self.editor_user,
        )
        self.assertEqual(art.section_type, "islamic_finance")
        self.assertEqual(art.language, "ar")
        self.assertIn("/ar/", art.get_absolute_url())

    # 4. Création d'une actualité dans chacune des trois langues
    def test_04_creation_actualite_trois_langues(self):
        group = TranslationGroup.objects.create(
            canonical_key="news/conference-finance-ethique-2026",
            section_type=Rubrique.NEWS,
        )
        art_fr = Article.objects.create(
            translation_group=group,
            title="Conférence Internationale de Finance Éthique",
            slug="conference-finance-ethique-2026",
            summary="Retour sur les innovations de la finance participative.",
            content_markdown="Compte-rendu complet...",
            language="fr",
            section_type=Rubrique.NEWS,
            status=Article.Status.PUBLISHED,
        )
        art_en = Article.objects.create(
            translation_group=group,
            title="International Ethical Finance Summit",
            slug="international-ethical-finance-summit-2026",
            summary="Key insights on sustainable Islamic finance.",
            content_markdown="Full event coverage...",
            language="en",
            section_type=Rubrique.NEWS,
            status=Article.Status.PUBLISHED,
        )
        art_ar = Article.objects.create(
            translation_group=group,
            title="المؤتمر الدولي للمالية الأخلاقية المستدامة",
            slug="ethical-finance-summit-ar-2026",
            summary="أبرز التوصيات الصادرة عن المؤتمر الدولي للمالية الإسلامية.",
            content_markdown="التغطية الشاملة...",
            language="ar",
            section_type=Rubrique.NEWS,
            status=Article.Status.PUBLISHED,
        )

        self.assertEqual(group.articles.count(), 3)
        self.assertEqual(art_fr.section_type, "news")
        self.assertEqual(art_en.section_type, "news")
        self.assertEqual(art_ar.section_type, "news")

    # 5. Association de plusieurs traductions au même contenu logique
    def test_05_association_plusieurs_traductions_meme_contenu_logique(self):
        group = TranslationGroup.objects.create(
            canonical_key="sciences/quarante-hadiths-nawawi",
            section_type=Rubrique.ISLAMIC_SCIENCES,
        )
        art_fr = Article.objects.create(
            translation_group=group,
            title="Les 40 Hadiths de l'Imam An-Nawawi",
            slug="quarante-hadiths-nawawi-fr",
            content_markdown="Explication...",
            language="fr",
            section_type=Rubrique.ISLAMIC_SCIENCES,
        )
        art_en = Article.objects.create(
            translation_group=group,
            title="The 40 Hadiths of Imam An-Nawawi",
            slug="forty-hadiths-nawawi-en",
            content_markdown="Explanation...",
            language="en",
            section_type=Rubrique.ISLAMIC_SCIENCES,
        )

        trans_map = art_fr.get_translations()
        self.assertIn("fr", trans_map)
        self.assertIn("en", trans_map)
        self.assertEqual(trans_map["en"].id, art_en.id)

    # 6. Modification d'une traduction sans altérer les autres
    def test_06_modification_traduction_sans_alterer_les_autres(self):
        group = TranslationGroup.objects.create(
            canonical_key="arabic/test-independence",
            section_type=Rubrique.ARABIC_LANGUAGE,
        )
        art_fr = Article.objects.create(
            translation_group=group,
            title="Version Française Initiale",
            slug="version-francaise-initiale",
            content_markdown="Texte FR original",
            language="fr",
            section_type=Rubrique.ARABIC_LANGUAGE,
        )
        art_en = Article.objects.create(
            translation_group=group,
            title="Original English Version",
            slug="original-english-version",
            content_markdown="Original EN text",
            language="en",
            section_type=Rubrique.ARABIC_LANGUAGE,
        )

        art_en.title = "Updated English Version with Revisions"
        art_en.content_markdown = "Updated EN content"
        art_en.save()

        art_fr.refresh_from_db()
        self.assertEqual(art_fr.title, "Version Française Initiale")
        self.assertEqual(art_fr.content_markdown, "Texte FR original")

    # 7. Interdiction des doublons de langue pour un même contenu
    def test_07_interdiction_doublons_langue_meme_contenu(self):
        group = TranslationGroup.objects.create(
            canonical_key="finance/test-unicite-langue",
            section_type=Rubrique.ISLAMIC_FINANCE,
        )
        Article.objects.create(
            translation_group=group,
            title="Premier article FR",
            slug="premier-article-fr",
            content_markdown="Contenu...",
            language="fr",
            section_type=Rubrique.ISLAMIC_FINANCE,
        )

        with self.assertRaises(IntegrityError):
            Article.objects.create(
                translation_group=group,
                title="Deuxième article FR dans le même groupe",
                slug="deuxieme-article-fr",
                content_markdown="Tentative doublon...",
                language="fr",
                section_type=Rubrique.ISLAMIC_FINANCE,
            )

    # 8. Gestion des slugs et de leurs conflits
    def test_08_gestion_slugs_et_conflits(self):
        art1 = Article.objects.create(
            title="Le Riba en Économie Moderne",
            slug="",  # will be auto-slugified to "le-riba-en-economie-moderne"
            content_markdown="Premier article...",
            language="fr",
            section_type=Rubrique.ISLAMIC_FINANCE,
        )
        self.assertEqual(art1.slug, "le-riba-en-economie-moderne")

        # Second article with identical title & language -> auto-deduplication should yield "-2"
        art2 = Article.objects.create(
            title="Le Riba en Économie Moderne",
            slug="",
            content_markdown="Second article avec même titre...",
            language="fr",
            section_type=Rubrique.ISLAMIC_FINANCE,
        )
        self.assertEqual(art2.slug, "le-riba-en-economie-moderne-2")

    # 9. Filtrage correct par rubrique et par langue
    def test_09_filtrage_correct_rubrique_et_langue(self):
        sciences_fr = Article.objects.filter(
            section_type=Rubrique.ISLAMIC_SCIENCES, language="fr", status=Article.Status.PUBLISHED
        )
        finance_ar = Article.objects.filter(
            section_type=Rubrique.ISLAMIC_FINANCE, language="ar", status=Article.Status.PUBLISHED
        )
        self.assertTrue(sciences_fr.exists())
        self.assertTrue(finance_ar.exists())
        for a in sciences_fr:
            self.assertEqual(a.section_type, "islamic_sciences")
            self.assertEqual(a.language, "fr")
        for a in finance_ar:
            self.assertEqual(a.section_type, "islamic_finance")
            self.assertEqual(a.language, "ar")

    # 10. Exclusion des brouillons du frontend public
    def test_10_exclusion_brouillons_frontend_public(self):
        draft = Article.objects.create(
            title="Article Secret Non Publié",
            slug="article-secret-non-publie-draft",
            summary="Brouillon confidentiel.",
            content_markdown="Texte non public.",
            language="fr",
            section_type=Rubrique.NEWS,
            status=Article.Status.DRAFT,
            author=self.editor_user,
        )
        # Public visitor gets 404
        res_public = self.client.get(draft.get_absolute_url())
        self.assertEqual(res_public.status_code, 404)

        # Logged-in editor with ?preview=1 gets 200
        self.client.force_login(self.editor_user)
        res_preview = self.client.get(f"{draft.get_absolute_url()}?preview=1")
        self.assertEqual(res_preview.status_code, 200)
        self.assertContains(res_preview, "Article Secret Non Publié")

    # 11. Affichage adapté des contenus arabes en RTL
    def test_11_affichage_adapte_contenus_arabes_rtl(self):
        ar_article = Article.objects.filter(
            language="ar", status=Article.Status.PUBLISHED
        ).first()
        self.assertIsNotNone(ar_article)
        res = self.client.get(ar_article.get_absolute_url())
        self.assertEqual(res.status_code, 200)
        self.assertContains(res, 'dir="rtl"')
        self.assertContains(res, 'lang="ar"')

    # 12. Conservation des anciens contenus et fichiers
    def test_12_conservation_anciens_contenus_et_fichiers(self):
        self.assertEqual(Article.objects.filter(is_demo=False).count(), 58)
        self.assertEqual(Book.objects.count(), 7)
        self.assertEqual(Course.objects.count(), 9)

    # 13. Fonctionnement des permissions de l'administration
    def test_13_fonctionnement_permissions_administration(self):
        # Regular member denied access to admin
        self.client.force_login(self.member_user)
        res_member = self.client.get("/admin/content/article/")
        self.assertIn(res_member.status_code, (302, 403))

        # Editor staff granted access to admin
        self.client.force_login(self.editor_user)
        res_editor = self.client.get("/admin/content/article/")
        self.assertEqual(res_editor.status_code, 200)

    # 14. Django admin translation indicators and management panel
    def test_14_admin_article_form_and_inlines(self):
        from django.contrib.admin.sites import AdminSite

        site = AdminSite()
        admin_instance = ArticleAdmin(Article, site)

        art = Article.objects.filter(language="fr", status=Article.Status.PUBLISHED).first()
        self.assertIsNotNone(art)

        # Rubrique badge
        badge = admin_instance.rubrique_badge(art)
        self.assertIn("span", badge)

        # Language badge
        l_badge = admin_instance.language_badge(art)
        self.assertIn("FR", l_badge)

        # Status badge
        s_badge = admin_instance.status_badge(art)
        self.assertIn("Publié", s_badge)

        # Translations indicator
        t_indicator = admin_instance.translations_indicator(art)
        self.assertIn("FR", t_indicator)

        # Translations panel HTML
        panel_html = admin_instance.translations_management_panel(art)
        self.assertIn("Groupe de traduction logique", panel_html)
        self.assertIn("Français (FR)", panel_html)

    # 15. Préremplissage automatique des formulaires d'administration et cohérence de la rubrique
    def test_15_admin_prefill_and_rubrique_consistency(self):
        from django.contrib.admin.sites import AdminSite
        from django.test import RequestFactory

        site = AdminSite()
        admin_instance = ArticleAdmin(Article, site)
        rf = RequestFactory()

        group = TranslationGroup.objects.create(
            canonical_key="finance/test-prefill-group",
            section_type=Rubrique.ISLAMIC_FINANCE,
        )

        request = rf.get(f"/admin/content/article/add/?translation_group={group.id}&language=en")
        request.user = self.editor_user
        initial = admin_instance.get_changeform_initial_data(request)

        self.assertEqual(initial.get("translation_group"), str(group.id))
        self.assertEqual(initial.get("section_type"), "islamic_finance")
        self.assertEqual(initial.get("language"), "en")

        # Rubrique consistency: assigning article to group enforces group's rubrique
        art = Article(
            translation_group=group,
            title="Consistent Rubrique Article",
            slug="consistent-rubrique-art",
            content_markdown="Test",
            language="en",
            section_type=Rubrique.NEWS,  # intentionally mismatched
        )
        art.clean()
        self.assertEqual(art.section_type, "islamic_finance")

