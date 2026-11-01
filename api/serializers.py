from django.contrib.auth import get_user_model
from rest_framework import serializers

from books.models import (
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
from content.models import Article, Category, Tag
from courses.models import Course, CourseModule, Enrollment, Lesson, LessonProgress
from library.models import (
    Bookmark,
    LibraryEntry,
    ReadingHighlight,
    ReadingNote,
    ReadingProgress,
)

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "pseudo",
            "first_name",
            "last_name",
            "preferred_language",
            "password",
        )

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "pseudo",
            "first_name",
            "last_name",
            "role",
            "preferred_language",
            "email_verified",
            "bio",
            "newsletter_opt_in",
            "date_joined",
        )
        read_only_fields = ("id", "email", "role", "email_verified", "date_joined")


class BookAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookAuthor
        fields = ("id", "name", "name_ar", "slug", "era", "bio_fr", "bio_en", "bio_ar")


class BookTranslatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTranslator
        fields = ("id", "name", "slug", "bio")


class BookPublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPublisher
        fields = ("id", "name", "slug", "location", "website")


class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = (
            "id",
            "code",
            "slug_fr",
            "slug_en",
            "slug_ar",
            "name_fr",
            "name_en",
            "name_ar",
            "color_class",
        )


class BookLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookLanguage
        fields = ("id", "code", "name_fr", "name_en", "name_ar", "is_bilingual")


class BookCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCollection
        fields = ("id", "slug", "title_fr", "title_en", "title_ar")


class BookTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTag
        fields = ("id", "slug", "name_fr", "name_en", "name_ar")


class BookFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookFile
        fields = (
            "id",
            "file_format",
            "external_path",
            "file_size_bytes",
            "checksum_sha256",
            "mime_type",
            "version",
            "is_downloadable",
            "is_streamable",
        )


class BookChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookChapter
        fields = (
            "id",
            "order",
            "slug",
            "title_fr",
            "title_en",
            "title_ar",
            "content_fr",
            "content_en",
            "content_ar",
            "estimated_reading_minutes",
            "start_page",
        )


class BookEditionSerializer(serializers.ModelSerializer):
    publisher = BookPublisherSerializer(read_only=True)
    language = BookLanguageSerializer(read_only=True)
    files = BookFileSerializer(many=True, read_only=True)

    class Meta:
        model = BookEdition
        fields = (
            "id",
            "edition_number",
            "title",
            "isbn",
            "publication_year",
            "page_count",
            "is_default",
            "publisher",
            "language",
            "files",
            "table_of_contents_json",
        )


class BookListSerializer(serializers.ModelSerializer):
    authors = BookAuthorSerializer(many=True, read_only=True)
    category = BookCategorySerializer(read_only=True)
    languages = BookLanguageSerializer(many=True, read_only=True)
    available_formats = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = (
            "id",
            "code",
            "slug_fr",
            "slug_en",
            "slug_ar",
            "title_fr",
            "title_en",
            "title_ar",
            "original_arabic_title",
            "subtitle_fr",
            "subtitle_en",
            "subtitle_ar",
            "short_description_fr",
            "short_description_en",
            "short_description_ar",
            "authors",
            "category",
            "languages",
            "cover_image_url",
            "isbn",
            "page_count",
            "estimated_reading_minutes",
            "access_type",
            "is_featured",
            "available_formats",
        )

    def get_available_formats(self, obj: Book) -> list[str]:
        return obj.available_formats()


class BookDetailSerializer(BookListSerializer):
    translators = BookTranslatorSerializer(many=True, read_only=True)
    publisher = BookPublisherSerializer(read_only=True)
    collection = BookCollectionSerializer(read_only=True)
    tags = BookTagSerializer(many=True, read_only=True)
    editions = BookEditionSerializer(many=True, read_only=True)
    chapters = BookChapterSerializer(many=True, read_only=True)
    files = BookFileSerializer(many=True, read_only=True)

    class Meta(BookListSerializer.Meta):
        fields = BookListSerializer.Meta.fields + (
            "long_description_fr",
            "long_description_en",
            "long_description_ar",
            "translators",
            "publisher",
            "collection",
            "tags",
            "publication_year",
            "editions",
            "chapters",
            "files",
        )


class LibraryEntrySerializer(serializers.ModelSerializer):
    book = BookListSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.filter(status=Book.Status.PUBLISHED),
        source="book",
        write_only=True,
    )

    class Meta:
        model = LibraryEntry
        fields = (
            "id",
            "book",
            "book_id",
            "is_favorite",
            "is_archived",
            "is_downloaded_mobile",
            "last_opened_at",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class ReadingProgressSerializer(serializers.ModelSerializer):
    book_code = serializers.CharField(source="book.code", read_only=True)

    class Meta:
        model = ReadingProgress
        fields = (
            "id",
            "book",
            "book_code",
            "edition",
            "current_chapter",
            "preferred_format",
            "epub_cfi",
            "chapter_Locator",
            "scroll_offset",
            "current_page",
            "total_pages",
            "percentage",
            "reading_time_seconds",
            "is_completed",
            "completed_at",
            "client_updated_at",
            "device_id",
            "sync_version",
            "updated_at",
        )
        read_only_fields = ("id", "sync_version", "updated_at", "completed_at")


class ReadingProgressSyncInputSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
    edition_id = serializers.IntegerField(required=False, allow_null=True)
    current_chapter_id = serializers.IntegerField(required=False, allow_null=True)
    preferred_format = serializers.ChoiceField(
        choices=["EPUB", "PDF", "WEB"], default="WEB", required=False
    )
    epub_cfi = serializers.CharField(required=False, allow_blank=True, default="")
    chapter_locator = serializers.CharField(required=False, allow_blank=True, default="")
    scroll_offset = serializers.FloatField(required=False, default=0.0)
    current_page = serializers.IntegerField(required=False, default=1, min_value=1)
    total_pages = serializers.IntegerField(required=False, default=1, min_value=1)
    percentage = serializers.FloatField(required=False, default=0.0, min_value=0.0, max_value=100.0)
    reading_time_delta_seconds = serializers.IntegerField(required=False, default=0, min_value=0)
    client_updated_at = serializers.DateTimeField()
    device_id = serializers.CharField(required=False, allow_blank=True, default="react-native")


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = (
            "id",
            "book",
            "chapter",
            "title",
            "epub_cfi",
            "page_number",
            "percentage",
            "client_id",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class ReadingNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingNote
        fields = (
            "id",
            "book",
            "chapter",
            "epub_cfi",
            "page_number",
            "selected_text",
            "content",
            "color",
            "client_id",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class ReadingHighlightSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        if "selected_text" in data and "highlighted_text" not in data:
            data = data.copy() if hasattr(data, "copy") else dict(data)
            data["highlighted_text"] = data["selected_text"]
        return super().to_internal_value(data)

    class Meta:
        model = ReadingHighlight
        fields = (
            "id",
            "book",
            "chapter",
            "epub_cfi_range",
            "page_number",
            "highlighted_text",
            "color",
            "note_text",
            "client_id",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "section_type",
            "code",
            "slug_fr",
            "slug_en",
            "slug_ar",
            "name_fr",
            "name_en",
            "name_ar",
            "description_fr",
            "description_en",
            "description_ar",
            "icon",
            "order",
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "slug", "name_fr", "name_en", "name_ar")


class ArticleListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "section_type",
            "category",
            "tags",
            "language",
            "pedagogical_language",
            "preserve_arabic_content",
            "author_name",
            "featured_image_url",
            "reading_time_minutes",
            "level",
            "published_at",
            "is_featured",
            "is_demo",
            "editorial_nature",
            "url",
        )

    def get_url(self, obj: Article) -> str:
        return obj.get_absolute_url()


class ArticleDetailSerializer(ArticleListSerializer):
    translations = serializers.SerializerMethodField()

    class Meta(ArticleListSerializer.Meta):
        fields = ArticleListSerializer.Meta.fields + (
            "content_markdown",
            "content_html",
            "sources_references",
            "seo_title",
            "seo_description",
            "translations",
        )

    def get_translations(self, obj: Article) -> dict[str, str]:
        return {
            lang: art.get_absolute_url()
            for lang, art in obj.get_translations().items()
        }


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = (
            "id",
            "order",
            "slug",
            "title_fr",
            "title_en",
            "title_ar",
            "summary_fr",
            "summary_en",
            "summary_ar",
            "duration_minutes",
            "video_provider",
            "is_free_preview",
            "is_demo",
        )


class CourseModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = CourseModule
        fields = (
            "id",
            "order",
            "title_fr",
            "title_en",
            "title_ar",
            "description_fr",
            "description_en",
            "description_ar",
            "lessons",
        )


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            "id",
            "code",
            "slug_fr",
            "slug_en",
            "slug_ar",
            "title_fr",
            "title_en",
            "title_ar",
            "short_description_fr",
            "short_description_en",
            "short_description_ar",
            "category_code",
            "level",
            "language",
            "pedagogical_language",
            "instructor_name",
            "instructor_title",
            "thumbnail_url",
            "estimated_hours",
            "lessons_count",
            "access_type",
            "is_featured",
            "is_demo",
        )


class CourseDetailSerializer(CourseListSerializer):
    modules = CourseModuleSerializer(many=True, read_only=True)

    class Meta(CourseListSerializer.Meta):
        fields = CourseListSerializer.Meta.fields + (
            "long_description_fr",
            "long_description_en",
            "long_description_ar",
            "objectives_fr",
            "objectives_en",
            "objectives_ar",
            "prerequisites_fr",
            "prerequisites_en",
            "prerequisites_ar",
            "modules",
        )


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "course",
            "status",
            "progress_percentage",
            "last_lesson",
            "completed_at",
            "last_accessed_at",
            "created_at",
        )


class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = (
            "id",
            "lesson",
            "watched_seconds",
            "last_position_seconds",
            "is_completed",
            "completed_at",
            "updated_at",
        )
        read_only_fields = ("id", "completed_at", "updated_at")

