from django.db import models

from core.i18n import build_localized_url
from core.models import TimeStampedModel


class BookLanguage(TimeStampedModel):
    code = models.CharField(max_length=12, unique=True)
    name_fr = models.CharField(max_length=80)
    name_en = models.CharField(max_length=80, blank=True)
    name_ar = models.CharField(max_length=80, blank=True)
    is_bilingual = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Langue d'ouvrage"
        verbose_name_plural = "Langues d'ouvrages"
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.name_fr} ({self.code})"


class BookCategory(TimeStampedModel):
    code = models.SlugField(max_length=80, unique=True)
    slug_fr = models.CharField(max_length=120)
    slug_en = models.CharField(max_length=120, blank=True)
    slug_ar = models.CharField(max_length=120, blank=True)
    name_fr = models.CharField(max_length=120)
    name_en = models.CharField(max_length=120, blank=True)
    name_ar = models.CharField(max_length=120, blank=True)
    color_class = models.CharField(max_length=80, blank=True, default="emerald")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Catégorie de livre"
        verbose_name_plural = "Catégories de livres"
        ordering = ["order", "code"]

    def __str__(self) -> str:
        return self.name_fr


class BookAuthor(TimeStampedModel):
    name = models.CharField(max_length=200)
    name_ar = models.CharField(max_length=200, blank=True)
    slug = models.SlugField(max_length=200, unique=True)
    era = models.CharField(max_length=120, blank=True)
    bio_fr = models.TextField(blank=True)
    bio_en = models.TextField(blank=True)
    bio_ar = models.TextField(blank=True)

    class Meta:
        verbose_name = "Auteur d'ouvrage"
        verbose_name_plural = "Auteurs d'ouvrages"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class BookTranslator(TimeStampedModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    bio = models.TextField(blank=True)

    class Meta:
        verbose_name = "Traducteur"
        verbose_name_plural = "Traducteurs"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class BookPublisher(TimeStampedModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    location = models.CharField(max_length=150, blank=True)
    website = models.URLField(blank=True)

    class Meta:
        verbose_name = "Maison d'édition"
        verbose_name_plural = "Maisons d'édition"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class BookCollection(TimeStampedModel):
    slug = models.SlugField(max_length=150, unique=True)
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    title_ar = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = "Collection d'ouvrages"
        verbose_name_plural = "Collections d'ouvrages"

    def __str__(self) -> str:
        return self.title_fr


class BookTag(TimeStampedModel):
    slug = models.SlugField(max_length=100, unique=True)
    name_fr = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_ar = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Tag de livre"
        verbose_name_plural = "Tags de livres"

    def __str__(self) -> str:
        return self.name_fr


class Book(TimeStampedModel):
    class AccessType(models.TextChoices):
        FREE = "FREE", "Accès libre"
        MEMBER = "MEMBER", "Membres inscrits"
        PREMIUM = "PREMIUM", "Accès Premium"

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Brouillon"
        PUBLISHED = "PUBLISHED", "Publié"

    code = models.SlugField("Code unique", max_length=100, unique=True, db_index=True)
    slug_fr = models.CharField(max_length=200, db_index=True)
    slug_en = models.CharField(max_length=200, blank=True)
    slug_ar = models.CharField(max_length=200, blank=True)

    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True)
    title_ar = models.CharField(max_length=255, blank=True)
    original_arabic_title = models.CharField(max_length=255, blank=True)

    subtitle_fr = models.CharField(max_length=300, blank=True)
    subtitle_en = models.CharField(max_length=300, blank=True)
    subtitle_ar = models.CharField(max_length=300, blank=True)

    short_description_fr = models.TextField()
    short_description_en = models.TextField(blank=True)
    short_description_ar = models.TextField(blank=True)

    long_description_fr = models.TextField(blank=True)
    long_description_en = models.TextField(blank=True)
    long_description_ar = models.TextField(blank=True)

    authors = models.ManyToManyField(BookAuthor, related_name="books", blank=True)
    translators = models.ManyToManyField(BookTranslator, related_name="books", blank=True)
    publisher = models.ForeignKey(
        BookPublisher, null=True, blank=True, on_delete=models.SET_NULL, related_name="books"
    )
    category = models.ForeignKey(
        BookCategory, null=True, blank=True, on_delete=models.SET_NULL, related_name="books"
    )
    languages = models.ManyToManyField(BookLanguage, related_name="books", blank=True)
    collection = models.ForeignKey(
        BookCollection, null=True, blank=True, on_delete=models.SET_NULL, related_name="books"
    )
    tags = models.ManyToManyField(BookTag, related_name="books", blank=True)

    cover_image = models.ImageField(upload_to="covers/", null=True, blank=True)
    cover_image_url = models.CharField(max_length=500, blank=True)
    isbn = models.CharField(max_length=40, blank=True)
    publication_year = models.PositiveIntegerField(null=True, blank=True)
    page_count = models.PositiveIntegerField(default=100)
    estimated_reading_minutes = models.PositiveIntegerField(default=120)

    access_type = models.CharField(
        max_length=16, choices=AccessType.choices, default=AccessType.FREE
    )
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.PUBLISHED, db_index=True
    )
    is_featured = models.BooleanField(default=False, db_index=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Livre & Ebook"
        verbose_name_plural = "Livres & Ebooks"
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title_fr

    def get_title(self, lang: str = "fr") -> str:
        return getattr(self, f"title_{lang}", "") or self.title_fr

    def get_subtitle(self, lang: str = "fr") -> str:
        return getattr(self, f"subtitle_{lang}", "") or self.subtitle_fr

    def get_short_description(self, lang: str = "fr") -> str:
        return getattr(self, f"short_description_{lang}", "") or self.short_description_fr

    def get_long_description(self, lang: str = "fr") -> str:
        return getattr(self, f"long_description_{lang}", "") or self.long_description_fr or self.get_short_description(lang)

    def get_absolute_url(self, lang: str = "fr") -> str:
        slug = getattr(self, f"slug_{lang}", "") or self.slug_fr or self.code
        return build_localized_url(lang, "books", slug)

    def available_formats(self) -> list[str]:
        return sorted({f.file_format for f in self.files.all()})


class BookEdition(TimeStampedModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="editions")
    edition_number = models.CharField(max_length=100, default="1re édition")
    title = models.CharField(max_length=255)
    publisher = models.ForeignKey(
        BookPublisher, null=True, blank=True, on_delete=models.SET_NULL
    )
    language = models.ForeignKey(
        BookLanguage, null=True, blank=True, on_delete=models.SET_NULL
    )
    isbn = models.CharField(max_length=40, blank=True)
    publication_year = models.PositiveIntegerField(null=True, blank=True)
    page_count = models.PositiveIntegerField(default=100)
    is_default = models.BooleanField(default=True)
    table_of_contents_json = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name = "Édition de livre"
        verbose_name_plural = "Éditions de livres"
        ordering = ["-is_default", "id"]

    def __str__(self) -> str:
        return f"{self.book.title_fr} ({self.edition_number})"


class BookChapter(TimeStampedModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="chapters")
    edition = models.ForeignKey(
        BookEdition, null=True, blank=True, on_delete=models.SET_NULL, related_name="chapters"
    )
    order = models.PositiveIntegerField(default=1)
    slug = models.SlugField(max_length=150)
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True)
    title_ar = models.CharField(max_length=255, blank=True)
    content_fr = models.TextField()
    content_en = models.TextField(blank=True)
    content_ar = models.TextField(blank=True)
    estimated_reading_minutes = models.PositiveIntegerField(default=15)
    start_page = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Chapitre de livre"
        verbose_name_plural = "Chapitres de livres"
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(fields=["book", "order"], name="unique_book_chapter_order")
        ]

    def __str__(self) -> str:
        return f"{self.order}. {self.title_fr}"

    def get_title(self, lang: str = "fr") -> str:
        return getattr(self, f"title_{lang}", "") or self.title_fr

    def get_content(self, lang: str = "fr") -> str:
        return getattr(self, f"content_{lang}", "") or self.content_fr


class BookFile(TimeStampedModel):
    class Format(models.TextChoices):
        EPUB = "EPUB", "EPUB"
        PDF = "PDF", "PDF"

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="files")
    edition = models.ForeignKey(
        BookEdition, null=True, blank=True, on_delete=models.CASCADE, related_name="files"
    )
    file_format = models.CharField(max_length=10, choices=Format.choices, default=Format.PDF)
    file = models.FileField(upload_to="ebooks/", null=True, blank=True)
    external_path = models.CharField(max_length=500, blank=True)
    file_size_bytes = models.BigIntegerField(default=0)
    checksum_sha256 = models.CharField(max_length=64, blank=True)
    mime_type = models.CharField(max_length=80, default="application/pdf")
    version = models.CharField(max_length=32, default="1.0")
    is_downloadable = models.BooleanField(default=True)
    is_streamable = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Fichier numérique (EPUB / PDF)"
        verbose_name_plural = "Fichiers numériques (EPUB / PDF)"

    def __str__(self) -> str:
        return f"{self.book.title_fr} [{self.file_format}]"

    def clean(self):
        import zipfile
        from django.conf import settings
        from django.core.exceptions import ValidationError

        super().clean()
        if self.external_path and (".." in self.external_path or "\\" in self.external_path):
            raise ValidationError({"external_path": "Chemin de fichier invalide (traversée de répertoire interdite)."})

        if self.file:
            fname = (self.file.name or "").lower()
            if ".." in fname:
                raise ValidationError({"file": "Nom de fichier invalide."})
            max_bytes = getattr(settings, "MAX_EBOOK_UPLOAD_SIZE_MB", 100) * 1024 * 1024
            if getattr(self.file, "size", 0) > max_bytes:
                raise ValidationError({"file": "Fichier trop volumineux."})

            if self.file_format == self.Format.PDF:
                if not fname.endswith(".pdf"):
                    raise ValidationError({"file": "Un fichier PDF doit porter l'extension .pdf."})
                self.file.seek(0)
                header = self.file.read(5)
                self.file.seek(0)
                if header != b"%PDF-":
                    raise ValidationError({"file": "Fichier PDF malformé (en-tête %PDF- manquant)."})
            elif self.file_format == self.Format.EPUB:
                if not fname.endswith(".epub"):
                    raise ValidationError({"file": "Un fichier EPUB doit porter l'extension .epub."})
                self.file.seek(0)
                header = self.file.read(4)
                self.file.seek(0)
                if header != b"PK\x03\x04" or not zipfile.is_zipfile(self.file):
                    self.file.seek(0)
                    raise ValidationError({"file": "Fichier EPUB malformé (archive ZIP invalide)."})
                with zipfile.ZipFile(self.file, "r") as zf:
                    names = set(zf.namelist())
                    if "mimetype" not in names and "META-INF/container.xml" not in names:
                        self.file.seek(0)
                        raise ValidationError({"file": "Structure EPUB invalide (container.xml ou mimetype manquant)."})
                self.file.seek(0)

    def save(self, *args, **kwargs):
        import hashlib

        if self.file_format == self.Format.EPUB:
            self.mime_type = "application/epub+zip"
        else:
            self.mime_type = "application/pdf"

        if self.file and not self.checksum_sha256:
            try:
                self.file.seek(0)
                content_bytes = self.file.read()
                self.file.seek(0)
                self.file_size_bytes = len(content_bytes)
                self.checksum_sha256 = hashlib.sha256(content_bytes).hexdigest()
            except Exception:
                pass
        super().save(*args, **kwargs)
