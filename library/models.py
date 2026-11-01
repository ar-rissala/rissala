from django.conf import settings
from django.db import models
from django.utils import timezone

from books.models import Book, BookChapter, BookEdition
from core.models import TimeStampedModel


class LibraryEntry(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="library_entries",
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="library_entries",
    )
    is_favorite = models.BooleanField(default=True)
    is_archived = models.BooleanField(default=False)
    is_downloaded_mobile = models.BooleanField(default=False)
    last_opened_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Entrée bibliothèque personnelle"
        verbose_name_plural = "Entrées bibliothèque personnelle"
        ordering = ["-last_opened_at", "-created_at"]
        constraints = [
            models.UniqueConstraint(fields=["user", "book"], name="unique_user_book_library")
        ]

    def __str__(self) -> str:
        return f"{self.user} - {self.book}"


class ReadingProgress(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reading_progresses",
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="reading_progresses",
    )
    edition = models.ForeignKey(
        BookEdition,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    current_chapter = models.ForeignKey(
        BookChapter,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    preferred_format = models.CharField(max_length=12, default="WEB")
    epub_cfi = models.CharField(max_length=255, blank=True)
    chapter_Locator = models.CharField(max_length=150, blank=True)
    scroll_offset = models.FloatField(default=0.0)
    current_page = models.PositiveIntegerField(default=1)
    total_pages = models.PositiveIntegerField(default=100)
    percentage = models.FloatField(default=0.0)
    reading_time_seconds = models.PositiveIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    client_updated_at = models.DateTimeField(default=timezone.now)
    device_id = models.CharField(max_length=120, default="web")
    sync_version = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Progression de lecture"
        verbose_name_plural = "Progressions de lecture"
        ordering = ["-updated_at"]
        constraints = [
            models.UniqueConstraint(fields=["user", "book"], name="unique_user_book_progress")
        ]

    def __str__(self) -> str:
        return f"{self.user} - {self.book} ({self.percentage:.1f}%)"


class Bookmark(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookmarks"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="bookmarks")
    chapter = models.ForeignKey(
        BookChapter, null=True, blank=True, on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=200)
    epub_cfi = models.CharField(max_length=255, blank=True)
    page_number = models.PositiveIntegerField(default=1)
    percentage = models.FloatField(default=0.0)
    client_id = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Marque-page"
        verbose_name_plural = "Marque-pages"
        ordering = ["-created_at"]


class ReadingNote(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reading_notes"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reading_notes")
    chapter = models.ForeignKey(
        BookChapter, null=True, blank=True, on_delete=models.SET_NULL
    )
    epub_cfi = models.CharField(max_length=255, blank=True)
    page_number = models.PositiveIntegerField(default=1)
    selected_text = models.TextField(blank=True)
    content = models.TextField()
    color = models.CharField(max_length=24, default="emerald")
    client_id = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Note de lecture"
        verbose_name_plural = "Notes de lecture"
        ordering = ["-updated_at"]


class ReadingHighlight(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reading_highlights"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reading_highlights")
    chapter = models.ForeignKey(
        BookChapter, null=True, blank=True, on_delete=models.SET_NULL
    )
    epub_cfi_range = models.CharField(max_length=255, blank=True)
    page_number = models.PositiveIntegerField(default=1)
    highlighted_text = models.TextField()
    color = models.CharField(max_length=24, default="emerald")
    note_text = models.TextField(blank=True)
    client_id = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "Surlignage"
        verbose_name_plural = "Surlignages"
        ordering = ["-created_at"]
