from django.contrib import admin

from .models import Bookmark, LibraryEntry, ReadingHighlight, ReadingNote, ReadingProgress


@admin.register(LibraryEntry)
class LibraryEntryAdmin(admin.ModelAdmin):
    list_display = ("user", "book", "is_favorite", "is_downloaded_mobile", "last_opened_at")
    list_filter = ("is_favorite", "is_downloaded_mobile")


@admin.register(ReadingProgress)
class ReadingProgressAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "book",
        "preferred_format",
        "current_page",
        "percentage",
        "is_completed",
        "device_id",
        "client_updated_at",
    )
    list_filter = ("preferred_format", "is_completed", "device_id")


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("user", "book", "title", "page_number", "created_at")


@admin.register(ReadingNote)
class ReadingNoteAdmin(admin.ModelAdmin):
    list_display = ("user", "book", "page_number", "updated_at")


@admin.register(ReadingHighlight)
class ReadingHighlightAdmin(admin.ModelAdmin):
    list_display = ("user", "book", "page_number", "color", "created_at")
