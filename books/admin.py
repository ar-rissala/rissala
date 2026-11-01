from django.contrib import admin

from .models import (
    Book,
    BookAuthor,
    BookCategory,
    BookChapter,
    BookCollection,
    BookEdition,
    BookFile,
    BookLanguage,
    BookPublisher,
    BookTag,
    BookTranslator,
)


@admin.register(BookLanguage)
class BookLanguageAdmin(admin.ModelAdmin):
    list_display = ("code", "name_fr", "name_en", "name_ar", "is_bilingual")


@admin.register(BookCategory)
class BookCategoryAdmin(admin.ModelAdmin):
    list_display = ("name_fr", "code", "order")


@admin.register(BookAuthor)
class BookAuthorAdmin(admin.ModelAdmin):
    list_display = ("name", "name_ar", "era", "slug")
    search_fields = ("name", "name_ar")


@admin.register(BookTranslator)
class BookTranslatorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")


@admin.register(BookPublisher)
class BookPublisherAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "website")


@admin.register(BookCollection)
class BookCollectionAdmin(admin.ModelAdmin):
    list_display = ("title_fr", "slug")


@admin.register(BookTag)
class BookTagAdmin(admin.ModelAdmin):
    list_display = ("name_fr", "slug")


class BookChapterInline(admin.TabularInline):
    model = BookChapter
    extra = 0


class BookFileInline(admin.TabularInline):
    model = BookFile
    extra = 0


class BookEditionInline(admin.TabularInline):
    model = BookEdition
    extra = 0


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        "title_fr",
        "code",
        "category",
        "page_count",
        "access_type",
        "status",
        "is_featured",
        "order",
    )
    list_filter = ("status", "access_type", "category", "is_featured")
    search_fields = ("title_fr", "title_en", "title_ar", "original_arabic_title", "code", "isbn")
    filter_horizontal = ("authors", "translators", "languages", "tags")
    inlines = [BookEditionInline, BookFileInline, BookChapterInline]
