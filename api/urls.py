from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

app_name = "api"

urlpatterns = [
    # OpenAPI Schema
    path("schema/", views.OpenAPISchemaAPIView.as_view(), name="schema"),
    # Authentication & Profile
    path("auth/register/", views.RegisterAPIView.as_view(), name="register"),
    path("auth/token/", views.TokenObtainPairAPIView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/logout/", views.LogoutAPIView.as_view(), name="logout"),
    path("me/", views.UserProfileAPIView.as_view(), name="me"),
    # Books & Ebooks
    path("books/", views.BookListAPIView.as_view(), name="book_list"),
    path("books/<int:book_id>/editions/", views.BookEditionsAPIView.as_view(), name="book_editions"),
    path("books/<int:book_id>/chapters/", views.BookChaptersAPIView.as_view(), name="book_chapters"),
    path("books/<int:book_id>/access/", views.BookSignedFileAccessAPIView.as_view(), name="book_access"),
    path("books/<str:identifier>/", views.BookDetailAPIView.as_view(), name="book_detail"),
    # Personal Library & Reading Progress Sync
    path("library/", views.LibraryEntryListCreateAPIView.as_view(), name="library_list"),
    path("library/<int:pk>/", views.LibraryEntryDetailAPIView.as_view(), name="library_detail"),
    path("library/progress/", views.ReadingProgressListSyncAPIView.as_view(), name="reading_progress"),
    path("library/bookmarks/", views.BookmarkListCreateAPIView.as_view(), name="bookmark_list"),
    path("library/bookmarks/<int:pk>/", views.BookmarkDetailAPIView.as_view(), name="bookmark_detail"),
    path("library/notes/", views.ReadingNoteListCreateAPIView.as_view(), name="note_list"),
    path("library/notes/<int:pk>/", views.ReadingNoteDetailAPIView.as_view(), name="note_detail"),
    path("library/highlights/", views.ReadingHighlightListCreateAPIView.as_view(), name="highlight_list"),
    path("library/highlights/<int:pk>/", views.ReadingHighlightDetailAPIView.as_view(), name="highlight_detail"),
    # Editorial Content, News & Arabic Lessons
    path("categories/", views.CategoryListAPIView.as_view(), name="category_list"),
    path("articles/", views.ArticleListAPIView.as_view(), name="article_list"),
    path("articles/<str:identifier>/", views.ArticleDetailAPIView.as_view(), name="article_detail"),
    path("news/", views.NewsListAPIView.as_view(), name="news_list"),
    path("arabic-lessons/", views.ArabicLessonsListAPIView.as_view(), name="arabic_lessons_list"),
    # Video Courses
    path("courses/", views.CourseListAPIView.as_view(), name="course_list"),
    path("courses/my-enrollments/", views.MyEnrollmentsAPIView.as_view(), name="my_enrollments"),
    path("courses/<int:course_id>/enroll/", views.CourseEnrollAPIView.as_view(), name="course_enroll"),
    path("courses/<str:identifier>/", views.CourseDetailAPIView.as_view(), name="course_detail"),
    path("lessons/<int:lesson_id>/playback/", views.LessonPlaybackAPIView.as_view(), name="lesson_playback"),
    path("lessons/<int:lesson_id>/progress/", views.LessonProgressSyncAPIView.as_view(), name="lesson_progress"),
    # Search
    path("search/", views.GlobalSearchAPIView.as_view(), name="search"),
]
