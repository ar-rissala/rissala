import zipfile
from datetime import timedelta
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.test import Client, TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from books.models import Book, BookFile
from books.services import BookStorageService
from content.markdown_engine import render_markdown_safe
from content.models import Article, Category
from courses.models import Course, Lesson
from newsletter.models import NewsletterCampaign, NewsletterSubscriber
from newsletter.services import NewsletterService

User = get_user_model()


class RissalaFullPlatformTestSuite(TestCase):
    """Comprehensive automated audit & non-regression test suite for the Rissala Django platform."""

    @classmethod
    def setUpTestData(cls):
        call_command("seed_rissala")
        cls.member_user = User.objects.create_user(
            email="member@rissala.net",
            pseudo="lecteur_rissala",
            password="StrongPassword123!",
            preferred_language="fr",
        )
        cls.editor_user = User.objects.create_user(
            email="editor@rissala.net",
            pseudo="editeur_rissala",
            password="StrongPassword123!",
            role=User.Role.EDITOR,
            is_staff=True,
        )

    def setUp(self):
        self.client = Client()
        self.api_client = APIClient()

    # =========================================================================
    # 1. IDEMPOTENT SEEDING, ARTICLES & BOOKS CONTENT AUDIT
    # =========================================================================
    def test_seed_command_is_idempotent_and_exact_counts(self):
        initial_articles = Article.objects.count()
        initial_books = Book.objects.count()
        initial_courses = Course.objects.count()

        self.assertEqual(initial_articles, 63)
        self.assertEqual(Article.objects.filter(language="fr").count(), 25)
        self.assertEqual(Article.objects.filter(language="en").count(), 19)
        self.assertEqual(Article.objects.filter(language="ar").count(), 19)
        self.assertEqual(Article.objects.filter(is_demo=False).count(), 58)
        self.assertEqual(Article.objects.filter(is_demo=True).count(), 5)
        self.assertEqual(initial_books, 7)
        self.assertEqual(initial_courses, 9)

        # Run seed_rissala a second time and verify zero duplicates
        call_command("seed_rissala")
        self.assertEqual(Article.objects.count(), initial_articles)
        self.assertEqual(Book.objects.count(), initial_books)
        self.assertEqual(Course.objects.count(), initial_courses)

    def test_mojibake_and_bom_absent_across_all_58_articles(self):
        for article in Article.objects.all():
            self.assertNotIn("\ufeff", article.title)
            self.assertNotIn("\ufeff", article.content_markdown)
            self.assertNotIn("\u00c3\u00a9", article.title)
            self.assertNotIn("\u00c3\u00a9", article.content_markdown)

        mourabaha = Article.objects.filter(
            language="fr", slug="essor-immobilier-conforme-mourabaha-ijara"
        ).first()
        self.assertIsNotNone(mourabaha)
        self.assertIn("propriétaire", mourabaha.content_markdown)

    def test_seven_canonical_books_and_valid_epub_pdf_files(self):
        expected_codes = {
            "ne-sois-pas-triste",
            "risalat-ibn-abi-zayd",
            "usul-al-fiqh",
            "introduction-sciences-coran",
            "arbain-nawawi",
            "methode-arabe",
            "ihya-ulum-al-din",
        }
        actual_codes = set(Book.objects.values_list("code", flat=True))
        self.assertEqual(actual_codes, expected_codes)

        static_root = Path(settings.BASE_DIR) / "static"
        for book in Book.objects.prefetch_related("files", "chapters", "editions"):
            self.assertGreaterEqual(book.chapters.count(), 3)
            self.assertGreaterEqual(book.editions.count(), 1)
            self.assertEqual(set(book.available_formats()), {"EPUB", "PDF"})

            for bf in book.files.all():
                self.assertEqual(len(bf.checksum_sha256), 64)
                self.assertGreater(bf.file_size_bytes, 100)
                local_path = static_root / bf.external_path.lstrip("/")
                self.assertTrue(local_path.exists(), f"Missing file {local_path}")
                if bf.file_format == BookFile.Format.PDF:
                    header = local_path.read_bytes()[:5]
                    self.assertEqual(header, b"%PDF-")
                elif bf.file_format == BookFile.Format.EPUB:
                    self.assertTrue(zipfile.is_zipfile(local_path))
                    with zipfile.ZipFile(local_path, "r") as zf:
                        names = set(zf.namelist())
                        self.assertIn("mimetype", names)
                        self.assertIn("META-INF/container.xml", names)
                        self.assertIn("OEBPS/content.opf", names)
                        self.assertEqual(zf.read("mimetype"), b"application/epub+zip")

    # =========================================================================
    # 2. MAIN ROUTES, MULTILINGUALISM, RTL & LEGACY 301 REDIRECTS
    # =========================================================================
    def test_home_routes_fr_en_ar_and_rtl(self):
        res_fr = self.client.get("/fr/")
        self.assertEqual(res_fr.status_code, 200)
        self.assertContains(res_fr, 'lang="fr"')
        self.assertContains(res_fr, 'dir="ltr"')

        res_en = self.client.get("/en/")
        self.assertEqual(res_en.status_code, 200)
        self.assertContains(res_en, 'lang="en"')

        res_ar = self.client.get("/ar/")
        self.assertEqual(res_ar.status_code, 200)
        self.assertContains(res_ar, 'lang="ar"')
        self.assertContains(res_ar, 'dir="rtl"')

    def test_all_primary_navigation_routes_return_200(self):
        routes = [
            "/fr/livres/",
            "/en/books/",
            "/ar/books/",
            "/fr/sciences-islamiques/",
            "/fr/sciences-islamiques/fondements/",
            "/fr/sciences-islamiques/fiqh/",
            "/fr/sciences-islamiques/hadith/",
            "/fr/sciences-islamiques/tafsir/",
            "/fr/sciences-islamiques/sira/",
            "/fr/sciences-islamiques/histoire/",
            "/en/islamic-sciences/",
            "/fr/langue-arabe/",
            "/en/arabic-language/",
            "/fr/finance-islamique/",
            "/en/islamic-finance/",
            "/fr/parcours/",
            "/en/courses/",
            "/ar/courses/",
            "/fr/actualites/",
            "/en/news/",
            "/ar/news/",
            "/fr/recherche/?q=Zakat",
            "/fr/a-propos/",
            "/fr/contact/",
            "/fr/mentions-legales/",
            "/fr/confidentialite/",
            "/fr/services/",
            "/fr/services/zakat/",
            "/fr/marketplaces/stocks/",
            "/fr/marketplaces/crypto/",
            "/fr/connexion/",
            "/fr/inscription/",
            "/health/",
            "/robots.txt",
            "/sitemap.xml",
        ]
        for path in routes:
            response = self.client.get(path)
            self.assertEqual(response.status_code, 200, f"Failed on route {path}")

    def test_legacy_urls_redirect_permanently_301(self):
        res1 = self.client.get("/fr/bibliotheque/")
        self.assertEqual(res1.status_code, 301)
        self.assertEqual(res1["Location"], "/fr/livres/")

        res2 = self.client.get("/fr/apprendre-arabe/")
        self.assertEqual(res2.status_code, 301)
        self.assertEqual(res2["Location"], "/fr/langue-arabe/")

        res3 = self.client.get("/fr/fiqh-al-muamalat/")
        self.assertEqual(res3.status_code, 301)
        self.assertEqual(res3["Location"], "/fr/finance-islamique/")

    # =========================================================================
    # 3. PEDAGOGICAL ARABIC CONTENT EXCEPTION & XSS SANITIZATION
    # =========================================================================
    def test_arabic_language_section_preserves_pedagogical_arabic(self):
        ar_lesson = Article.objects.filter(
            section_type=Category.SectionType.ARABIC_LANGUAGE,
            language="fr",
            slug="alphabet-arabe",
        ).first()
        self.assertIsNotNone(ar_lesson)
        self.assertTrue(ar_lesson.preserve_arabic_content)
        self.assertEqual(ar_lesson.pedagogical_language, "ar")

        res = self.client.get("/fr/langue-arabe/alphabet-arabe/")
        self.assertEqual(res.status_code, 200)
        self.assertContains(res, ar_lesson.title)

    def test_markdown_xss_sanitization(self):
        malicious_md = (
            '# Titre sûr\n\n'
            '<script>alert("xss")</script>\n'
            '<a href="javascript:alert(1)" onclick="steal()">Lien</a>\n'
            '<div className="arabic" onmouseover="evil()">بِسْمِ اللَّهِ</div>'
        )
        safe_html = render_markdown_safe(malicious_md)
        self.assertNotIn("<script", safe_html)
        self.assertNotIn("javascript:", safe_html)
        self.assertNotIn("onclick", safe_html)
        self.assertNotIn("onmouseover", safe_html)
        self.assertIn('class="arabic"', safe_html)
        self.assertIn("بِسْمِ اللَّهِ", safe_html)

    def test_draft_article_hidden_from_public_and_visible_in_editor_preview(self):
        cat = Category.objects.filter(section_type=Category.SectionType.NEWS).first()
        draft = Article.objects.create(
            title="Article Brouillon Secret",
            slug="article-brouillon-secret",
            summary="Résumé brouillon",
            content_markdown="Contenu brouillon",
            section_type=Category.SectionType.NEWS,
            category=cat,
            language="fr",
            status=Article.Status.DRAFT,
        )
        pub_res = self.client.get(draft.get_absolute_url())
        self.assertEqual(pub_res.status_code, 404)

        self.client.force_login(self.editor_user)
        prev_res = self.client.get(f"{draft.get_absolute_url()}?preview=1")
        self.assertEqual(prev_res.status_code, 200)
        self.assertContains(prev_res, "Article Brouillon Secret")

    # =========================================================================
    # 4. SECURITY AUDIT: SIGNED TOKENS, EXPIRATION, CROSS-FILE REUSE, MALFORMED FILES & PATH TRAVERSAL
    # =========================================================================
    def test_books_catalog_detail_and_signed_download_security(self):
        book_a = Book.objects.get(code="ne-sois-pas-triste")
        book_b = Book.objects.get(code="risalat-ibn-abi-zayd")

        res = self.client.get(book_a.get_absolute_url("fr"))
        self.assertEqual(res.status_code, 200)
        self.assertContains(res, book_a.title_fr)

        # Signed file access via API
        access_res = self.api_client.get(f"/api/v1/books/{book_a.id}/access/?format=PDF")
        self.assertEqual(access_res.status_code, 200)
        self.assertIn("signed_url", access_res.data)
        self.assertEqual(access_res.data["format"], "PDF")

        file_a = book_a.files.filter(file_format=BookFile.Format.PDF).first()
        file_b = book_b.files.filter(file_format=BookFile.Format.PDF).first()
        valid_token_a = BookStorageService.generate_signed_download_token(file_a.id, self.member_user.id)

        # 1. Valid token for file A succeeds on file A
        dl_ok = self.client.get(f"/fr/books/file/{file_a.id}/download/?token={valid_token_a}")
        self.assertEqual(dl_ok.status_code, 200)
        dl_ok.close()

        # 2. Cross-file reuse: token for file A used to request file B MUST be rejected (403)
        dl_cross = self.client.get(f"/fr/books/file/{file_b.id}/download/?token={valid_token_a}")
        self.assertEqual(dl_cross.status_code, 403)

        # 3. Expired token verification: max_age=-1 returns None
        expired_check = BookStorageService.verify_signed_download_token(valid_token_a, max_age=-1)
        self.assertIsNone(expired_check)

        # 4. Tampered token rejected (403)
        dl_tampered = self.client.get(f"/fr/books/file/{file_a.id}/download/?token={valid_token_a}tampered")
        self.assertEqual(dl_tampered.status_code, 403)

        # 5. Private book (access_type=MEMBER) rejected for anonymous user
        book_b.access_type = Book.AccessType.MEMBER
        book_b.save(update_fields=["access_type"])
        anon_dl = self.client.get(f"/fr/books/file/{file_b.id}/download/")
        self.assertEqual(anon_dl.status_code, 403)
        anon_api_access = self.api_client.get(f"/api/v1/books/{book_b.id}/access/?format=PDF")
        self.assertEqual(anon_api_access.status_code, 403)
        book_b.access_type = Book.AccessType.FREE
        book_b.save(update_fields=["access_type"])

    def test_malformed_pdf_epub_and_path_traversal_rejected(self):
        book = Book.objects.get(code="ne-sois-pas-triste")

        # 1. Malformed PDF rejected by BookFile.clean()
        fake_pdf = SimpleUploadedFile("malformed.pdf", b"NOT_A_PDF_HEADER_DATA", content_type="application/pdf")
        bf_bad_pdf = BookFile(book=book, file_format=BookFile.Format.PDF, file=fake_pdf)
        with self.assertRaises(ValidationError):
            bf_bad_pdf.clean()

        # 2. Malformed EPUB (not a valid ZIP with mimetype/container.xml) rejected by BookFile.clean()
        fake_epub = SimpleUploadedFile("malformed.epub", b"NOT_A_ZIP_ARCHIVE", content_type="application/epub+zip")
        bf_bad_epub = BookFile(book=book, file_format=BookFile.Format.EPUB, file=fake_epub)
        with self.assertRaises(ValidationError):
            bf_bad_epub.clean()

        # 3. Path traversal in external_path rejected by BookFile.clean()
        bf_traversal = BookFile(
            book=book,
            file_format=BookFile.Format.PDF,
            external_path="/livres/../../config/settings.py",
        )
        with self.assertRaises(ValidationError):
            bf_traversal.clean()

        # 4. Path traversal via root static asset route returns 404
        traversal_res = self.client.get("/images/../../manage.py")
        self.assertEqual(traversal_res.status_code, 404)

    # =========================================================================
    # 5. REACT NATIVE REST API (/api/v1/) & MULTI-DEVICE CONFLICT RESOLUTION
    # =========================================================================
    def test_react_native_jwt_auth_refresh_and_conflict_safe_reading_progress_sync(self):
        # 1. Register new mobile user via API
        reg_res = self.api_client.post(
            "/api/v1/auth/register/",
            {
                "email": "mobile_user@rissala.net",
                "pseudo": "mobile_reader",
                "password": "MobilePassword123!",
                "preferred_language": "fr",
            },
            format="json",
        )
        self.assertEqual(reg_res.status_code, 201)
        self.assertIn("tokens", reg_res.data)

        # 2. Obtain JWT token using email or username
        token_res = self.api_client.post(
            "/api/v1/auth/token/",
            {"username": "member@rissala.net", "password": "StrongPassword123!"},
            format="json",
        )
        self.assertEqual(token_res.status_code, 200)
        access_token = token_res.data["access"]
        refresh_token = token_res.data["refresh"]

        # 3. Refresh JWT token
        refresh_res = self.api_client.post(
            "/api/v1/auth/token/refresh/",
            {"refresh": refresh_token},
            format="json",
        )
        self.assertEqual(refresh_res.status_code, 200)
        self.assertIn("access", refresh_res.data)

        self.api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        # 4. Verify & update /api/v1/me/
        me_res = self.api_client.patch(
            "/api/v1/me/",
            {"first_name": "Youssef"},
            format="json",
        )
        self.assertEqual(me_res.status_code, 200)
        self.assertEqual(me_res.data["first_name"], "Youssef")

        # 5. Sync reading progress from Device A (iPhone) at T0 (45%)
        book = Book.objects.get(code="ne-sois-pas-triste")
        t0 = timezone.now()
        sync_1 = self.api_client.post(
            "/api/v1/library/progress/",
            {
                "book_id": book.id,
                "preferred_format": "EPUB",
                "epub_cfi": "epubcfi(/6/4[chap2]!/4/2/1:0)",
                "current_page": 28,
                "total_pages": 64,
                "percentage": 45.0,
                "reading_time_delta_seconds": 300,
                "client_updated_at": t0.isoformat(),
                "device_id": "iphone-15",
            },
            format="json",
        )
        self.assertEqual(sync_1.status_code, 200)
        self.assertTrue(sync_1.data["updated"])
        self.assertEqual(sync_1.data["progress"]["percentage"], 45.0)

        # 6. Send stale progress from Device B (offline iPad) at T0 - 10 minutes (20%) -> MUST NOT overwrite 45%
        t_stale = t0 - timedelta(minutes=10)
        sync_stale = self.api_client.post(
            "/api/v1/library/progress/",
            {
                "book_id": book.id,
                "preferred_format": "EPUB",
                "current_page": 12,
                "total_pages": 64,
                "percentage": 20.0,
                "reading_time_delta_seconds": 120,
                "client_updated_at": t_stale.isoformat(),
                "device_id": "ipad-offline",
            },
            format="json",
        )
        self.assertEqual(sync_stale.status_code, 200)
        self.assertFalse(sync_stale.data["updated"])
        self.assertTrue(sync_stale.data["conflict_resolved"])
        self.assertEqual(sync_stale.data["progress"]["percentage"], 45.0)
        self.assertEqual(sync_stale.data["progress"]["reading_time_seconds"], 420)

    def test_api_bookmarks_notes_highlights_articles_courses_and_openapi(self):
        self.api_client.force_authenticate(user=self.member_user)
        book = Book.objects.get(code="ne-sois-pas-triste")

        # Personal library entry
        lib_toggle = self.api_client.post(
            "/api/v1/library/",
            {"book_id": book.id, "is_favorite": True},
            format="json",
        )
        self.assertIn(lib_toggle.status_code, (200, 201))

        # Bookmark
        bm_res = self.api_client.post(
            "/api/v1/library/bookmarks/",
            {"book": book.id, "title": "Passage clé", "page_number": 10, "percentage": 15.0},
            format="json",
        )
        self.assertEqual(bm_res.status_code, 201)

        # Note
        note_res = self.api_client.post(
            "/api/v1/library/notes/",
            {"book": book.id, "page_number": 12, "content": "Note personnelle importante"},
            format="json",
        )
        self.assertEqual(note_res.status_code, 201)

        # Highlight
        hl_res = self.api_client.post(
            "/api/v1/library/highlights/",
            {
                "book": book.id,
                "page_number": 14,
                "selected_text": "La patience est une lumière.",
                "color": "emerald",
            },
            format="json",
        )
        self.assertEqual(hl_res.status_code, 201)

        # Articles filtering & pagination
        art_res = self.api_client.get("/api/v1/articles/?language=fr&section=islamic_finance")
        self.assertEqual(art_res.status_code, 200)
        self.assertEqual(art_res.data["count"], 7)

        # Courses list
        courses_res = self.api_client.get("/api/v1/courses/")
        self.assertEqual(courses_res.status_code, 200)
        self.assertEqual(courses_res.data["count"], 9)

        # OpenAPI schema
        schema_res = self.api_client.get("/api/v1/schema/")
        self.assertEqual(schema_res.status_code, 200)

    # =========================================================================
    # 6. DEMO COURSES HONEST VIDEO STATUS & ENROLLMENT
    # =========================================================================
    def test_demo_courses_explicitly_marked_and_no_fake_video_stream(self):
        for course in Course.objects.all():
            self.assertTrue(course.is_demo)

        course = Course.objects.first()
        non_preview_lesson = Lesson.objects.filter(
            module__course=course, is_free_preview=False
        ).first()

        # Anonymous user cannot access non-preview lesson playback
        anon_res = self.api_client.get(f"/api/v1/lessons/{non_preview_lesson.id}/playback/")
        self.assertEqual(anon_res.status_code, 403)

        # Authenticated user enrolls and checks playback metadata
        self.api_client.force_authenticate(user=self.member_user)
        enroll_res = self.api_client.post(f"/api/v1/courses/{course.id}/enroll/")
        self.assertEqual(enroll_res.status_code, 200)

        play_res = self.api_client.get(f"/api/v1/lessons/{non_preview_lesson.id}/playback/")
        self.assertEqual(play_res.status_code, 200)
        self.assertTrue(play_res.data["allowed"])
        self.assertTrue(play_res.data["is_demo"])
        self.assertFalse(play_res.data["video_available"])
        self.assertIsNone(play_res.data["manifest_url"])
        self.assertTrue(bool(play_res.data["demo_notice"]))

    # =========================================================================
    # 7. NEWSLETTER DOUBLE OPT-IN, UNSUBSCRIBE & CAMPAIGN IDEMPOTENCY
    # =========================================================================
    def test_newsletter_double_opt_in_unsubscribe_and_campaign_idempotency(self):
        sub, created = NewsletterService.subscribe_email(
            email="abonne@rissala.net",
            language="fr",
            first_name="Karim",
            source_url="/fr/",
            ip_address="127.0.0.1",
            consent_text="J'accepte de recevoir la newsletter Rissala.",
        )
        self.assertTrue(created)
        self.assertEqual(sub.status, NewsletterSubscriber.Status.PENDING)
        self.assertTrue(bool(sub.consent_ip_hash))

        # Confirm subscription (double opt-in)
        confirmed = NewsletterService.confirm_subscription(sub.confirmation_token)
        self.assertIsNotNone(confirmed)
        self.assertEqual(confirmed.status, NewsletterSubscriber.Status.ACTIVE)

        # Send campaign and verify idempotency (no duplicate delivery logs)
        campaign = NewsletterCampaign.objects.create(
            title="Lettre Mensuelle Rissala",
            subject_fr="Nouveautés Sciences & Finance",
            content_html_fr="<p>Bonjour de Rissala</p>",
            target_language="fr",
        )
        sent_first = NewsletterService.send_campaign(campaign)
        self.assertEqual(sent_first, 1)

        sent_second = NewsletterService.send_campaign(campaign)
        self.assertEqual(sent_second, 0)

        # Unsubscribe in one click
        unsub = NewsletterService.unsubscribe_by_token(sub.unsubscribe_token)
        self.assertEqual(unsub.status, NewsletterSubscriber.Status.UNSUBSCRIBED)

    # =========================================================================
    # 8. CUSTOM 404 & SEO METADATA
    # =========================================================================
    def test_custom_404_and_seo_tags(self):
        res_404 = self.client.get("/fr/page-totalement-inexistante-xyz/")
        self.assertEqual(res_404.status_code, 404)
        self.assertContains(res_404, "404", status_code=404)

        res_home = self.client.get("/fr/")
        self.assertContains(res_home, 'rel="canonical"')
        self.assertContains(res_home, 'hreflang="fr"')
        self.assertContains(res_home, 'hreflang="en"')
        self.assertContains(res_home, 'hreflang="ar"')
        self.assertContains(res_home, 'hreflang="x-default"')
        self.assertContains(res_home, "application/ld+json")

    # =========================================================================
    # 9. LEGAL NOTICES, PRIVACY POLICY & CONTACT COMPLIANCE
    # =========================================================================
    def test_legal_notice_compliance_and_privacy_protection(self):
        """Verify legal notice pages in all languages, hosting details, contact email, and absence of private data."""
        legal_urls = [
            "/fr/mentions-legales/",
            "/en/legal/",
            "/ar/%D8%A5%D8%B4%D8%B9%D8%A7%D8%B1-%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A/",
        ]
        for url in legal_urls:
            res = self.client.get(url)
            self.assertEqual(res.status_code, 200, f"Legal URL failed: {url}")
            content = res.content.decode("utf-8")
            # Contact email must be present and linked via mailto:
            self.assertIn("rissala@tutamail.com", content)
            self.assertIn('href="mailto:rissala@tutamail.com"', content)
            # Railway host details must be present
            self.assertIn("Railway Corp", content)
            self.assertIn("548 Market St", content)
            # Private coordinates must NOT be published
            self.assertNotIn("Mickael Bon", content)
            self.assertNotIn("fenals", content.lower())
            self.assertNotIn("13010", content)
            self.assertNotIn("88909075900024", content)
            self.assertNotIn("FR45889090759", content)

    def test_contact_page_compliance(self):
        """Verify contact pages have functional mailto link and no personal address."""
        contact_urls = [
            "/fr/contact/",
            "/en/contact/",
            "/ar/%D8%A7%D8%AA%D8%B5%D9%84-%D8%A8%D9%86%D8%A7/",
        ]
        for url in contact_urls:
            res = self.client.get(url)
            self.assertEqual(res.status_code, 200, f"Contact URL failed: {url}")
            content = res.content.decode("utf-8")
            self.assertIn('href="mailto:rissala@tutamail.com"', content)
            self.assertNotIn("fenals", content.lower())
            self.assertNotIn("13010", content)

    def test_privacy_policy_compliance(self):
        """Verify privacy policy pages in all languages have GDPR details, cookies notice, and mailto link."""
        privacy_urls = [
            "/fr/confidentialite/",
            "/en/privacy/",
            "/ar/%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9/",
        ]
        for url in privacy_urls:
            res = self.client.get(url)
            self.assertEqual(res.status_code, 200, f"Privacy URL failed: {url}")
            content = res.content.decode("utf-8")
            self.assertIn('href="mailto:rissala@tutamail.com"', content)
            self.assertIn("Railway Corp", content)
            self.assertIn("sessionid", content)
            self.assertIn("csrftoken", content)
            self.assertNotIn("fenals", content.lower())
            self.assertNotIn("13010", content)
            self.assertNotIn("88909075900024", content)
