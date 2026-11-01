from django.conf import settings
from django.core import signing

from .models import Book, BookFile


class BookStorageService:
    """Service for verifying book access rights and generating short-lived signed download URLs."""

    SALT = "rissala.books.download"

    @classmethod
    def user_can_access_book(cls, user, book: Book) -> bool:
        if book.access_type == Book.AccessType.FREE:
            return True
        if not user or not getattr(user, "is_authenticated", False):
            return False
        if book.access_type == Book.AccessType.MEMBER:
            return True
        return getattr(user, "is_editorial_staff", False)

    @classmethod
    def generate_signed_download_token(
        cls, book_file_id: int, user_id: int | None = None
    ) -> str:
        payload = {"file_id": book_file_id, "user_id": user_id}
        return signing.dumps(payload, salt=cls.SALT)

    @classmethod
    def verify_signed_download_token(cls, token: str, max_age: int = 3600) -> dict | None:
        try:
            return signing.loads(token, salt=cls.SALT, max_age=max_age)
        except signing.BadSignature:
            return None

    @classmethod
    def get_file_download_url(cls, book_file: BookFile, request=None) -> str:
        path = f"/fr/books/file/{book_file.id}/download/"
        if request is not None:
            return request.build_absolute_uri(path)
        return f"{settings.SITE_URL.rstrip('/')}{path}"
