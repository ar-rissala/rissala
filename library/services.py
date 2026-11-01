from django.db import transaction
from django.utils import timezone

from books.models import Book, BookChapter, BookEdition
from .models import LibraryEntry, ReadingProgress


@transaction.atomic
def sync_reading_progress(
    *,
    user,
    book: Book,
    client_updated_at,
    preferred_format: str = "WEB",
    edition: BookEdition | None = None,
    current_chapter: BookChapter | None = None,
    epub_cfi: str = "",
    chapter_locator: str = "",
    scroll_offset: float = 0.0,
    current_page: int = 1,
    total_pages: int = 100,
    percentage: float = 0.0,
    reading_time_delta_seconds: int = 0,
    device_id: str = "web",
) -> tuple[ReadingProgress, bool]:
    """
    Conflict-safe reading progress synchronization between Web and React Native.
    If an incoming sync has an older `client_updated_at` than the server record,
    it does not overwrite the newer reading position, while still accumulating reading time.
    """
    now = timezone.now()
    LibraryEntry.objects.update_or_create(
        user=user,
        book=book,
        defaults={"last_opened_at": now},
    )

    progress = ReadingProgress.objects.select_for_update().filter(user=user, book=book).first()
    if progress is None:
        is_done = percentage >= 99.0
        progress = ReadingProgress.objects.create(
            user=user,
            book=book,
            edition=edition,
            current_chapter=current_chapter,
            preferred_format=preferred_format,
            epub_cfi=epub_cfi,
            chapter_Locator=chapter_locator,
            scroll_offset=scroll_offset,
            current_page=current_page,
            total_pages=max(1, total_pages),
            percentage=min(100.0, max(0.0, percentage)),
            reading_time_seconds=max(0, reading_time_delta_seconds),
            is_completed=is_done,
            completed_at=now if is_done else None,
            client_updated_at=client_updated_at,
            device_id=device_id,
            sync_version=1,
        )
        return progress, True

    # Always accumulate reading time delta if provided
    if reading_time_delta_seconds > 0:
        progress.reading_time_seconds += reading_time_delta_seconds

    # Conflict check: reject stale position overwrite
    if client_updated_at < progress.client_updated_at:
        progress.save(update_fields=["reading_time_seconds", "updated_at"])
        return progress, False

    progress.preferred_format = preferred_format or progress.preferred_format
    if edition is not None:
        progress.edition = edition
    if current_chapter is not None:
        progress.current_chapter = current_chapter
    if epub_cfi:
        progress.epub_cfi = epub_cfi
    if chapter_locator:
        progress.chapter_Locator = chapter_locator
    progress.scroll_offset = scroll_offset
    progress.current_page = max(1, current_page)
    progress.total_pages = max(1, total_pages)
    progress.percentage = min(100.0, max(0.0, percentage))
    if progress.percentage >= 99.0 and not progress.is_completed:
        progress.is_completed = True
        progress.completed_at = now
    progress.client_updated_at = client_updated_at
    progress.device_id = device_id
    progress.sync_version += 1
    progress.save()
    return progress, True
