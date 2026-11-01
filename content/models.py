from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from core.i18n import build_localized_url
from core.models import TimeStampedModel

from .markdown_engine import render_markdown_safe


class Rubrique(models.TextChoices):
    ISLAMIC_SCIENCES = "islamic_sciences", "Sciences islamiques"
    ARABIC_LANGUAGE = "arabic_language", "Langue arabe"
    ISLAMIC_FINANCE = "islamic_finance", "Finance islamique"
    NEWS = "news", "Actualités"


class Category(TimeStampedModel):
    SectionType = Rubrique

    section_type = models.CharField(
        "Rubrique",
        max_length=32,
        choices=Rubrique.choices,
        db_index=True,
        help_text="Rubrique principale à laquelle est rattachée cette catégorie.",
    )
    code = models.SlugField("Code unique", max_length=80, unique=True)
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="subcategories",
    )
    slug_fr = models.CharField(max_length=120)
    slug_en = models.CharField(max_length=120, blank=True)
    slug_ar = models.CharField(max_length=120, blank=True)

    name_fr = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150, blank=True)
    name_ar = models.CharField(max_length=150, blank=True)

    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)

    icon = models.CharField(max_length=60, blank=True, default="BookOpen")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name = "Catégorie éditoriale"
        verbose_name_plural = "Catégories éditoriales"
        ordering = ["section_type", "order", "code"]

    def __str__(self) -> str:
        return f"{self.name_fr} ({self.section_type})"

    def get_name(self, lang: str = "fr") -> str:
        return getattr(self, f"name_{lang}", "") or self.name_fr


class Tag(TimeStampedModel):
    slug = models.SlugField(max_length=100, unique=True, allow_unicode=True)
    name_fr = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_ar = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Tag éditorial"
        verbose_name_plural = "Tags éditoriaux"
        ordering = ["name_fr"]

    def __str__(self) -> str:
        return self.name_fr


class TranslationGroup(TimeStampedModel):
    canonical_key = models.CharField(max_length=220, unique=True, db_index=True)
    section_type = models.CharField(
        "Rubrique",
        max_length=32,
        choices=Rubrique.choices,
        default=Rubrique.ISLAMIC_SCIENCES,
    )
    notes = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Groupe de traductions"
        verbose_name_plural = "Groupes de traductions"
        ordering = ["canonical_key"]

    def __str__(self) -> str:
        return self.canonical_key

    def clean(self):
        super().clean()
        if self.section_type:
            self.section_type = self.section_type.lower()


class Article(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Brouillon"
        SCHEDULED = "SCHEDULED", "Programmé"
        PUBLISHED = "PUBLISHED", "Publié"

    class EditorialNature(models.TextChoices):
        PEDAGOGICAL_SYNTHESIS = "PEDAGOGICAL_SYNTHESIS", "Synthèse pédagogique sourcée"
        JURISPRUDENTIAL_STUDY = "JURISPRUDENTIAL_STUDY", "Analyse jurisprudentielle (Fiqh)"
        NEWS_REPORT = "NEWS_REPORT", "Article d'actualité & analyse"

    LANGUAGE_CHOICES = (
        ("fr", "Français"),
        ("en", "English"),
        ("ar", "العربية"),
    )

    translation_group = models.ForeignKey(
        TranslationGroup,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="articles",
    )
    title = models.CharField("Titre", max_length=255)
    slug = models.CharField("Slug", max_length=220, db_index=True)
    summary = models.TextField("Résumé", blank=True)
    content_markdown = models.TextField("Contenu Markdown")
    content_html = models.TextField("HTML rendu (sécurisé)", blank=True, editable=False)

    section_type = models.CharField(
        "Rubrique",
        max_length=32,
        choices=Rubrique.choices,
        db_index=True,
        help_text="Rubrique principale du contenu (obligatoire).",
    )
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="articles",
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")

    language = models.CharField(
        "Langue du contenu",
        max_length=5,
        choices=LANGUAGE_CHOICES,
        default="fr",
        db_index=True,
    )
    pedagogical_language = models.CharField(
        "Langue pédagogique du contenu",
        max_length=5,
        choices=LANGUAGE_CHOICES,
        default="fr",
    )
    preserve_arabic_content = models.BooleanField(
        "Préserver le contenu pédagogique arabe",
        default=False,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="articles",
    )
    author_name = models.CharField(max_length=120, default="Rédaction Rissala")
    featured_image = models.ImageField(upload_to="articles/", null=True, blank=True)
    featured_image_url = models.CharField(max_length=500, blank=True)

    reading_time_minutes = models.PositiveIntegerField(default=5)
    level = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=1)

    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.PUBLISHED,
        db_index=True,
    )
    published_at = models.DateTimeField(default=timezone.now, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_demo = models.BooleanField("Contenu de démonstration", default=False)

    editorial_nature = models.CharField(
        max_length=32,
        choices=EditorialNature.choices,
        default=EditorialNature.PEDAGOGICAL_SYNTHESIS,
    )
    sources_references = models.TextField(blank=True)
    related_articles = models.ManyToManyField("self", blank=True, symmetrical=False)

    # SEO fields
    seo_title = models.CharField(max_length=160, blank=True)
    seo_description = models.CharField(max_length=320, blank=True)
    canonical_url = models.URLField(blank=True)
    noindex = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Article éditorial"
        verbose_name_plural = "Articles éditoriaux"
        ordering = ["order", "-published_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["language", "section_type", "slug"],
                name="unique_article_lang_section_slug",
            ),
            models.UniqueConstraint(
                fields=["translation_group", "language"],
                condition=models.Q(translation_group__isnull=False),
                name="unique_article_translation_group_lang",
            ),
        ]

    def __str__(self) -> str:
        return f"[{self.language.upper()}] {self.title}"

    @property
    def rubrique(self) -> str:
        return self.section_type

    def clean(self):
        super().clean()
        if self.section_type:
            self.section_type = self.section_type.lower()
        if self.translation_group_id:
            self.section_type = self.translation_group.section_type

    def save(self, *args, **kwargs):
        if self.translation_group_id:
            self.section_type = self.translation_group.section_type
        if self.section_type:
            self.section_type = self.section_type.lower()
        if not self.slug:
            if self.language == "ar":
                base_slug = slugify(self.title, allow_unicode=True) or "article"
            else:
                base_slug = slugify(self.title, allow_unicode=False) or "article"
            slug_candidate = base_slug
            counter = 1
            while (
                Article.objects.filter(
                    language=self.language,
                    section_type=self.section_type,
                    slug=slug_candidate,
                )
                .exclude(pk=self.pk)
                .exists()
            ):
                counter += 1
                slug_candidate = f"{base_slug}-{counter}"
            self.slug = slug_candidate
        self.content_html = render_markdown_safe(self.content_markdown)
        super().save(*args, **kwargs)

    @property
    def subtitle(self) -> str:
        return self.summary

    @property
    def excerpt(self) -> str:
        return self.seo_description or self.summary

    @property
    def effective_seo_title(self) -> str:
        return self.seo_title or self.title

    @property
    def effective_seo_description(self) -> str:
        return (self.seo_description or self.summary or self.title)[:300]

    def get_absolute_url(self) -> str:
        sec = str(self.section_type).lower()
        route_map = {
            "islamic_sciences": "islamic_sciences",
            "arabic_language": "arabic_language",
            "islamic_finance": "islamic_finance",
            "news": "news",
        }
        route_key = route_map.get(sec, "islamic_sciences")
        return build_localized_url(self.language, route_key, self.slug)

    def get_translations(self) -> dict[str, "Article"]:
        if not self.translation_group_id:
            return {self.language: self}
        qs = Article.objects.filter(
            translation_group_id=self.translation_group_id,
            status=self.Status.PUBLISHED,
        )
        return {a.language: a for a in qs}

    def get_all_translations(self) -> dict[str, "Article"]:
        if not self.translation_group_id:
            return {self.language: self}
        qs = Article.objects.filter(translation_group_id=self.translation_group_id)
        return {a.language: a for a in qs}


class ArticleRevision(TimeStampedModel):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="revisions")
    editor = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=255)
    content_markdown = models.TextField()
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Révision d'article"
        verbose_name_plural = "Révisions d'articles"
        ordering = ["-created_at"]


class ArticleMedia(TimeStampedModel):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="media")
    title = models.CharField(max_length=150)
    file = models.FileField(upload_to="article_media/", null=True, blank=True)
    external_url = models.CharField(max_length=500, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Média d'article"
        verbose_name_plural = "Médias d'articles"
        ordering = ["order"]
