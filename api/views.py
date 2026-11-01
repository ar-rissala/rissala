from django.contrib.auth import authenticate
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from books.models import Book, BookChapter, BookEdition, BookFile
from books.services import BookStorageService
from content.models import Article, Category
from courses.models import Course, Enrollment, Lesson, LessonProgress
from courses.services import VideoStreamingService
from library.models import (
    Bookmark,
    LibraryEntry,
    ReadingHighlight,
    ReadingNote,
    ReadingProgress,
)
from library.services import sync_reading_progress

from .permissions import IsOwner
from .serializers import (
    ArticleDetailSerializer,
    ArticleListSerializer,
    BookChapterSerializer,
    BookDetailSerializer,
    BookEditionSerializer,
    BookListSerializer,
    BookmarkSerializer,
    CategorySerializer,
    CourseDetailSerializer,
    CourseListSerializer,
    EnrollmentSerializer,
    LessonProgressSerializer,
    LibraryEntrySerializer,
    ReadingHighlightSerializer,
    ReadingNoteSerializer,
    ReadingProgressSerializer,
    ReadingProgressSyncInputSerializer,
    UserProfileSerializer,
    UserRegisterSerializer,
)


class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": UserProfileSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_201_CREATED,
        )


class TokenObtainPairAPIView(APIView):
    """Issue JWT access & refresh tokens using email, pseudo, or username."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        identifier = (
            request.data.get("email")
            or request.data.get("username")
            or request.data.get("identifier")
            or ""
        ).strip()
        password = request.data.get("password") or ""
        if not identifier or not password:
            return Response(
                {
                    "status": "error",
                    "code": 400,
                    "message": "Identifiant (email ou pseudo) et mot de passe requis.",
                    "errors": {},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(request, username=identifier, password=password)
        if user is None or not user.is_active:
            return Response(
                {
                    "status": "error",
                    "code": 401,
                    "message": "Identifiants invalides ou compte inactif.",
                    "errors": {},
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserProfileSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return Response({"status": "logged_out"}, status=status.HTTP_200_OK)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class BookListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BookListSerializer

    def get_queryset(self):
        qs = (
            Book.objects.filter(status=Book.Status.PUBLISHED)
            .select_related("category")
            .prefetch_related("authors", "languages", "files")
        )
        category_code = self.request.query_params.get("category")
        if category_code:
            qs = qs.filter(category__code=category_code)
        lang_code = self.request.query_params.get("language")
        if lang_code:
            qs = qs.filter(languages__code=lang_code)
        fmt = self.request.query_params.get("format")
        if fmt:
            qs = qs.filter(files__file_format=fmt.upper())
        q = self.request.query_params.get("q")
        if q:
            qs = qs.filter(
                Q(title_fr__icontains=q)
                | Q(title_en__icontains=q)
                | Q(title_ar__icontains=q)
                | Q(original_arabic_title__icontains=q)
                | Q(authors__name__icontains=q)
            )
        return qs.distinct()


class BookDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BookDetailSerializer

    def get_object(self):
        identifier = self.kwargs["identifier"]
        qs = (
            Book.objects.filter(status=Book.Status.PUBLISHED)
            .select_related("category", "publisher", "collection")
            .prefetch_related("authors", "translators", "languages", "tags", "editions", "chapters", "files")
        )
        if identifier.isdigit():
            return get_object_or_404(qs, pk=int(identifier))
        return get_object_or_404(
            qs,
            Q(code=identifier)
            | Q(slug_fr=identifier)
            | Q(slug_en=identifier)
            | Q(slug_ar=identifier),
        )


class BookEditionsAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BookEditionSerializer

    def get_queryset(self):
        book = get_object_or_404(Book, pk=self.kwargs["book_id"], status=Book.Status.PUBLISHED)
        return BookEdition.objects.filter(book=book).select_related("publisher", "language").prefetch_related("files")


class BookChaptersAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BookChapterSerializer

    def get_queryset(self):
        book = get_object_or_404(Book, pk=self.kwargs["book_id"], status=Book.Status.PUBLISHED)
        return BookChapter.objects.filter(book=book).order_by("order")


class BookSignedFileAccessAPIView(APIView):
    """Return a short-lived signed download or stream URL for an EPUB or PDF file."""

    permission_classes = [permissions.AllowAny]

    def get(self, request, book_id: int):
        book = get_object_or_404(Book, pk=book_id, status=Book.Status.PUBLISHED)
        if not BookStorageService.user_can_access_book(request.user, book):
            return Response(
                {
                    "status": "error",
                    "code": 403,
                    "message": "Authentication or member access required for this book.",
                    "errors": {},
                },
                status=status.HTTP_403_FORBIDDEN,
            )
        fmt = request.query_params.get("format", "PDF").upper()
        book_file = BookFile.objects.filter(book=book, file_format=fmt).first()
        if not book_file:
            book_file = BookFile.objects.filter(book=book).first()
        if not book_file:
            return Response(
                {
                    "status": "error",
                    "code": 404,
                    "message": "No digital file available for this book.",
                    "errors": {},
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        token = BookStorageService.generate_signed_download_token(
            book_file_id=book_file.id,
            user_id=request.user.id if request.user.is_authenticated else None,
        )
        signed_url = BookStorageService.get_file_download_url(book_file, request=request)
        return Response(
            {
                "book_id": book.id,
                "file_id": book_file.id,
                "format": book_file.file_format,
                "mime_type": book_file.mime_type,
                "signed_url": f"{signed_url}?token={token}",
                "expires_in_seconds": 3600,
            }
        )


class LibraryEntryListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LibraryEntrySerializer

    def get_queryset(self):
        return (
            LibraryEntry.objects.filter(user=self.request.user)
            .select_related("book", "book__category")
            .prefetch_related("book__authors", "book__languages", "book__files")
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = serializer.validated_data["book"]
        entry, created = LibraryEntry.objects.update_or_create(
            user=request.user,
            book=book,
            defaults={
                "is_favorite": serializer.validated_data.get("is_favorite", False),
                "is_archived": serializer.validated_data.get("is_archived", False),
                "is_downloaded_mobile": serializer.validated_data.get("is_downloaded_mobile", False),
                "last_opened_at": timezone.now(),
            },
        )
        return Response(
            LibraryEntrySerializer(entry).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class LibraryEntryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = LibraryEntrySerializer

    def get_queryset(self):
        return LibraryEntry.objects.filter(user=self.request.user)


class ReadingProgressListSyncAPIView(APIView):
    """List all reading progress records or perform conflict-safe synchronization."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = ReadingProgress.objects.filter(user=request.user).select_related("book")
        book_id = request.query_params.get("book_id")
        if book_id:
            qs = qs.filter(book_id=book_id)
        return Response(ReadingProgressSerializer(qs, many=True).data)

    def post(self, request):
        serializer = ReadingProgressSyncInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        book = get_object_or_404(Book, pk=data["book_id"], status=Book.Status.PUBLISHED)
        edition = (
            BookEdition.objects.filter(pk=data.get("edition_id"), book=book).first()
            if data.get("edition_id")
            else None
        )
        chapter = (
            BookChapter.objects.filter(pk=data.get("current_chapter_id"), book=book).first()
            if data.get("current_chapter_id")
            else None
        )

        progress, was_updated = sync_reading_progress(
            user=request.user,
            book=book,
            client_updated_at=data["client_updated_at"],
            preferred_format=data.get("preferred_format", "WEB"),
            edition=edition,
            current_chapter=chapter,
            epub_cfi=data.get("epub_cfi", ""),
            chapter_locator=data.get("chapter_locator", ""),
            scroll_offset=data.get("scroll_offset", 0.0),
            current_page=data.get("current_page", 1),
            total_pages=data.get("total_pages", book.page_count or 1),
            percentage=data.get("percentage", 0.0),
            reading_time_delta_seconds=data.get("reading_time_delta_seconds", 0),
            device_id=data.get("device_id", "react-native"),
        )
        return Response(
            {
                "updated": was_updated,
                "conflict_resolved": not was_updated,
                "progress": ReadingProgressSerializer(progress).data,
            },
            status=status.HTTP_200_OK,
        )


class BookmarkListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        qs = Bookmark.objects.filter(user=self.request.user)
        book_id = self.request.query_params.get("book_id")
        if book_id:
            qs = qs.filter(book_id=book_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookmarkDetailAPIView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)


class ReadingNoteListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReadingNoteSerializer

    def get_queryset(self):
        qs = ReadingNote.objects.filter(user=self.request.user)
        book_id = self.request.query_params.get("book_id")
        if book_id:
            qs = qs.filter(book_id=book_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReadingNoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ReadingNoteSerializer

    def get_queryset(self):
        return ReadingNote.objects.filter(user=self.request.user)


class ReadingHighlightListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReadingHighlightSerializer

    def get_queryset(self):
        qs = ReadingHighlight.objects.filter(user=self.request.user)
        book_id = self.request.query_params.get("book_id")
        if book_id:
            qs = qs.filter(book_id=book_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReadingHighlightDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ReadingHighlightSerializer

    def get_queryset(self):
        return ReadingHighlight.objects.filter(user=self.request.user)


class CategoryListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer

    def get_queryset(self):
        qs = Category.objects.filter(is_active=True)
        section_type = self.request.query_params.get("section_type")
        if section_type:
            qs = qs.filter(section_type=section_type.lower())
        return qs


class ArticleListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        qs = (
            Article.objects.filter(status=Article.Status.PUBLISHED)
            .select_related("category")
            .prefetch_related("tags")
        )
        lang = self.request.query_params.get("language")
        if lang:
            qs = qs.filter(language=lang)
        section = self.request.query_params.get("section") or self.request.query_params.get("rubrique")
        if section:
            qs = qs.filter(section_type=section.lower())
        cat = self.request.query_params.get("category")
        if cat:
            qs = qs.filter(category__code=cat)
        return qs


class ArticleDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ArticleDetailSerializer

    def get_object(self):
        identifier = self.kwargs["identifier"]
        qs = (
            Article.objects.filter(status=Article.Status.PUBLISHED)
            .select_related("category", "translation_group")
            .prefetch_related("tags")
        )
        if identifier.isdigit():
            return get_object_or_404(qs, pk=int(identifier))
        lang = self.request.query_params.get("language")
        if lang:
            art = qs.filter(slug=identifier, language=lang).first()
            if art:
                return art
        return get_object_or_404(qs, slug=identifier)


class NewsListAPIView(ArticleListAPIView):
    def get_queryset(self):
        return super().get_queryset().filter(section_type=Category.SectionType.NEWS)


class ArabicLessonsListAPIView(ArticleListAPIView):
    def get_queryset(self):
        return super().get_queryset().filter(section_type=Category.SectionType.ARABIC_LANGUAGE)


class CourseListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseListSerializer

    def get_queryset(self):
        qs = Course.objects.filter(status=Course.Status.PUBLISHED)
        cat = self.request.query_params.get("category")
        if cat:
            qs = qs.filter(category_code=cat)
        level = self.request.query_params.get("level")
        if level:
            qs = qs.filter(level=level)
        return qs


class CourseDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseDetailSerializer

    def get_object(self):
        identifier = self.kwargs["identifier"]
        qs = Course.objects.filter(status=Course.Status.PUBLISHED).prefetch_related("modules__lessons")
        if identifier.isdigit():
            return get_object_or_404(qs, pk=int(identifier))
        return get_object_or_404(
            qs,
            Q(code=identifier)
            | Q(slug_fr=identifier)
            | Q(slug_en=identifier)
            | Q(slug_ar=identifier),
        )


class CourseEnrollAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id: int):
        course = get_object_or_404(Course, pk=course_id, status=Course.Status.PUBLISHED)
        enrollment = VideoStreamingService.enroll_user(request.user, course)
        return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_200_OK)


class MyEnrollmentsAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).select_related("course")


class LessonPlaybackAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, lesson_id: int):
        lesson = get_object_or_404(
            Lesson.objects.select_related("module__course"), pk=lesson_id
        )
        playback = VideoStreamingService.get_playback_metadata(request.user, lesson)
        if not playback.get("allowed"):
            return Response(
                {
                    "status": "error",
                    "code": 403,
                    "message": "Authentication or course enrollment required to view this video lesson.",
                    "errors": {"reason": playback.get("reason")},
                },
                status=status.HTTP_403_FORBIDDEN,
            )
        return Response(playback)


class LessonProgressSyncAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, lesson_id: int):
        lesson = get_object_or_404(
            Lesson.objects.select_related("module__course"), pk=lesson_id
        )
        watched_seconds = int(request.data.get("watched_seconds", 0))
        last_position_seconds = int(request.data.get("last_position_seconds", 0))
        is_completed = bool(request.data.get("is_completed", False))
        progress = VideoStreamingService.record_lesson_progress(
            user=request.user,
            lesson=lesson,
            watched_seconds=watched_seconds,
            last_position_seconds=last_position_seconds,
            mark_completed=is_completed,
        )
        return Response(LessonProgressSerializer(progress).data)


class GlobalSearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        q = request.query_params.get("q", "").strip()
        lang = request.query_params.get("language", "fr")
        if not q:
            return Response({"query": "", "books": [], "articles": [], "courses": []})

        books = Book.objects.filter(
            status=Book.Status.PUBLISHED
        ).filter(
            Q(title_fr__icontains=q)
            | Q(title_en__icontains=q)
            | Q(title_ar__icontains=q)
            | Q(short_description_fr__icontains=q)
            | Q(authors__name__icontains=q)
        ).distinct()[:10]

        articles = Article.objects.filter(
            status=Article.Status.PUBLISHED,
            language=lang,
        ).filter(
            Q(title__icontains=q) | Q(summary__icontains=q) | Q(content_markdown__icontains=q)
        )[:15]

        courses = Course.objects.filter(
            status=Course.Status.PUBLISHED
        ).filter(
            Q(title_fr__icontains=q)
            | Q(title_en__icontains=q)
            | Q(title_ar__icontains=q)
            | Q(short_description_fr__icontains=q)
        )[:10]

        return Response(
            {
                "query": q,
                "books": BookListSerializer(books, many=True).data,
                "articles": ArticleListSerializer(articles, many=True).data,
                "courses": CourseListSerializer(courses, many=True).data,
            }
        )


class OpenAPISchemaAPIView(APIView):
    """Machine-readable OpenAPI 3.0 specification for React Native integration."""

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(
            {
                "openapi": "3.0.3",
                "info": {
                    "title": "Rissala Mobile REST API",
                    "version": "1.0.0",
                    "description": "Versioned REST API (/api/v1/) for the Rissala React Native mobile application (Books, EPUB/PDF Reader Sync, Articles, Arabic Lessons, Video Courses).",
                },
                "servers": [{"url": "/api/v1"}],
                "paths": {
                    "/auth/register/": {"post": {"summary": "Register a new user account"}},
                    "/auth/token/": {"post": {"summary": "Obtain JWT access and refresh token pair"}},
                    "/auth/token/refresh/": {"post": {"summary": "Refresh JWT access token"}},
                    "/auth/logout/": {"post": {"summary": "Invalidate session"}},
                    "/me/": {"get": {"summary": "Get user profile"}, "patch": {"summary": "Update user profile"}},
                    "/books/": {"get": {"summary": "List and filter published books"}},
                    "/books/{identifier}/": {"get": {"summary": "Get book detail, editions, chapters, and files"}},
                    "/books/{book_id}/editions/": {"get": {"summary": "List book editions"}},
                    "/books/{book_id}/chapters/": {"get": {"summary": "List structured book chapters"}},
                    "/books/{book_id}/access/": {"get": {"summary": "Generate signed download/stream URL for EPUB or PDF"}},
                    "/library/": {"get": {"summary": "List user's personal library"}, "post": {"summary": "Add/update book in personal library"}},
                    "/library/progress/": {"get": {"summary": "Get reading progress"}, "post": {"summary": "Conflict-safe sync of reading progress"}},
                    "/library/bookmarks/": {"get": {"summary": "List bookmarks"}, "post": {"summary": "Create bookmark"}},
                    "/library/notes/": {"get": {"summary": "List reading notes"}, "post": {"summary": "Create reading note"}},
                    "/library/highlights/": {"get": {"summary": "List highlights"}, "post": {"summary": "Create highlight"}},
                    "/categories/": {"get": {"summary": "List editorial categories"}},
                    "/articles/": {"get": {"summary": "List published articles"}},
                    "/articles/{identifier}/": {"get": {"summary": "Get article detail"}},
                    "/news/": {"get": {"summary": "List news articles"}},
                    "/arabic-lessons/": {"get": {"summary": "List Arabic language lessons"}},
                    "/courses/": {"get": {"summary": "List video courses"}},
                    "/courses/{identifier}/": {"get": {"summary": "Get course detail with modules and lessons"}},
                    "/courses/{course_id}/enroll/": {"post": {"summary": "Enroll in a course"}},
                    "/courses/my-enrollments/": {"get": {"summary": "List user's course enrollments"}},
                    "/lessons/{lesson_id}/playback/": {"get": {"summary": "Get signed video playback metadata"}},
                    "/lessons/{lesson_id}/progress/": {"post": {"summary": "Sync lesson video progress"}},
                    "/search/": {"get": {"summary": "Global search across books, articles, and courses"}},
                },
            }
        )
