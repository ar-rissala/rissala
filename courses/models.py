from django.conf import settings
from django.db import models

from core.i18n import build_localized_url
from core.models import TimeStampedModel


class Course(TimeStampedModel):
    class Level(models.TextChoices):
        BEGINNER = "BEGINNER", "Débutant"
        INTERMEDIATE = "INTERMEDIATE", "Intermédiaire"
        ADVANCED = "ADVANCED", "Avancé"

    class AccessType(models.TextChoices):
        FREE = "FREE", "Gratuit (Membre)"
        PREMIUM = "PREMIUM", "Premium"

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Brouillon"
        PUBLISHED = "PUBLISHED", "Publié"

    code = models.SlugField(max_length=100, unique=True, db_index=True)
    slug_fr = models.CharField(max_length=200, db_index=True)
    slug_en = models.CharField(max_length=200, blank=True)
    slug_ar = models.CharField(max_length=200, blank=True)

    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True)
    title_ar = models.CharField(max_length=255, blank=True)

    short_description_fr = models.TextField()
    short_description_en = models.TextField(blank=True)
    short_description_ar = models.TextField(blank=True)

    long_description_fr = models.TextField(blank=True)
    long_description_en = models.TextField(blank=True)
    long_description_ar = models.TextField(blank=True)

    category_code = models.CharField(max_length=60, default="sciences-islamiques", db_index=True)
    level = models.CharField(max_length=20, choices=Level.choices, default=Level.BEGINNER)
    language = models.CharField(max_length=5, default="fr")
    pedagogical_language = models.CharField(max_length=5, default="fr")

    instructor_name = models.CharField(max_length=150)
    instructor_title = models.CharField(max_length=200, blank=True)
    thumbnail_url = models.CharField(max_length=500, blank=True)
    estimated_hours = models.FloatField(default=8.0)
    lessons_count = models.PositiveIntegerField(default=4)

    objectives_fr = models.JSONField(default=list, blank=True)
    objectives_en = models.JSONField(default=list, blank=True)
    objectives_ar = models.JSONField(default=list, blank=True)

    prerequisites_fr = models.JSONField(default=list, blank=True)
    prerequisites_en = models.JSONField(default=list, blank=True)
    prerequisites_ar = models.JSONField(default=list, blank=True)

    access_type = models.CharField(
        max_length=16, choices=AccessType.choices, default=AccessType.FREE
    )
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.PUBLISHED, db_index=True
    )
    is_featured = models.BooleanField(default=False)
    is_demo = models.BooleanField("Fiche de démonstration", default=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Parcours & Formation"
        verbose_name_plural = "Parcours & Formations"
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title_fr

    def get_title(self, lang: str = "fr") -> str:
        return getattr(self, f"title_{lang}", "") or self.title_fr

    def get_short_description(self, lang: str = "fr") -> str:
        return getattr(self, f"short_description_{lang}", "") or self.short_description_fr

    def get_long_description(self, lang: str = "fr") -> str:
        return getattr(self, f"long_description_{lang}", "") or self.long_description_fr or self.get_short_description(lang)

    def get_objectives(self, lang: str = "fr") -> list:
        return getattr(self, f"objectives_{lang}", None) or self.objectives_fr or []

    def get_absolute_url(self, lang: str = "fr") -> str:
        slug = getattr(self, f"slug_{lang}", "") or self.slug_fr or self.code
        return build_localized_url(lang, "courses", slug)


class CourseModule(TimeStampedModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    order = models.PositiveIntegerField(default=1)
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True)
    title_ar = models.CharField(max_length=255, blank=True)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)

    class Meta:
        verbose_name = "Module de parcours"
        verbose_name_plural = "Modules de parcours"
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(fields=["course", "order"], name="unique_course_module_order")
        ]

    def __str__(self) -> str:
        return f"{self.course.title_fr} - Module {self.order}"


class Lesson(TimeStampedModel):
    class VideoProvider(models.TextChoices):
        HLS = "HLS", "HLS Stream Signé"
        MUX = "MUX", "Mux Video"
        CLOUDFLARE = "CLOUDFLARE", "Cloudflare Stream"
        S3 = "S3", "S3 Pré-signé"

    module = models.ForeignKey(CourseModule, on_delete=models.CASCADE, related_name="lessons")
    order = models.PositiveIntegerField(default=1)
    slug = models.SlugField(max_length=150)
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True)
    title_ar = models.CharField(max_length=255, blank=True)
    summary_fr = models.TextField(blank=True)
    summary_en = models.TextField(blank=True)
    summary_ar = models.TextField(blank=True)
    content_notes_markdown = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=20)

    video_provider = models.CharField(
        max_length=20, choices=VideoProvider.choices, default=VideoProvider.HLS
    )
    video_asset_id = models.CharField(max_length=255, blank=True)
    is_free_preview = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Leçon vidéo"
        verbose_name_plural = "Leçons vidéo"
        ordering = ["module__order", "order"]
        constraints = [
            models.UniqueConstraint(fields=["module", "order"], name="unique_module_lesson_order")
        ]

    def __str__(self) -> str:
        return self.title_fr

    def get_title(self, lang: str = "fr") -> str:
        return getattr(self, f"title_{lang}", "") or self.title_fr


class Enrollment(TimeStampedModel):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "En cours"
        COMPLETED = "COMPLETED", "Terminé"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments"
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)
    progress_percentage = models.FloatField(default=0.0)
    last_lesson = models.ForeignKey(
        Lesson, null=True, blank=True, on_delete=models.SET_NULL
    )
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Inscription parcours"
        verbose_name_plural = "Inscriptions parcours"
        constraints = [
            models.UniqueConstraint(fields=["user", "course"], name="unique_user_course_enrollment")
        ]


class LessonProgress(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="lesson_progresses"
    )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="progresses")
    watched_seconds = models.PositiveIntegerField(default=0)
    last_position_seconds = models.PositiveIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Progression leçon"
        verbose_name_plural = "Progressions leçons"
        constraints = [
            models.UniqueConstraint(fields=["user", "lesson"], name="unique_user_lesson_progress")
        ]
