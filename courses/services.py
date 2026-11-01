import hashlib
import hmac
import time

from django.conf import settings
from django.utils import timezone

from .models import Course, Enrollment, Lesson, LessonProgress


class VideoStreamingService:
    """
    Generates short-lived signed playback tokens for video lessons and enforces course enrollment.
    Never exposes permanent public video URLs.
    """

    @classmethod
    def enroll_user(cls, user, course: Course) -> Enrollment:
        enrollment, _ = Enrollment.objects.get_or_create(
            user=user,
            course=course,
        )
        return enrollment

    @classmethod
    def user_can_watch(cls, user, lesson: Lesson) -> tuple[bool, str]:
        if lesson.is_free_preview:
            return True, "free_preview"
        if not user or not getattr(user, "is_authenticated", False):
            return False, "authentication_required"
        if getattr(user, "is_editorial_staff", False):
            return True, "staff_access"
        is_enrolled = Enrollment.objects.filter(
            user=user, course=lesson.module.course
        ).exists()
        if not is_enrolled:
            return False, "enrollment_required"
        return True, "enrolled"

    @classmethod
    def get_playback_metadata(cls, user, lesson: Lesson) -> dict:
        allowed, reason = cls.user_can_watch(user, lesson)
        if not allowed:
            return {"allowed": False, "reason": reason}

        ttl = 3600
        expires_at = int(time.time()) + ttl
        uid = str(getattr(user, "id", "preview") or "preview")
        secret = getattr(settings, "VIDEO_SIGNING_SECRET", settings.SECRET_KEY)
        payload = f"{lesson.video_provider}:{lesson.video_asset_id}:{uid}:{expires_at}"
        token = hmac.new(
            secret.encode("utf-8"),
            payload.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

        video_file = getattr(lesson, "video_file", None)
        ext_url = getattr(lesson, "external_video_url", None)
        has_real_video = bool(
            video_file
            or ext_url
            or (lesson.video_asset_id and not lesson.is_demo)
        )
        base_url = getattr(settings, "VIDEO_STREAMING_BASE_URL", "https://stream.rissala.net").rstrip("/")
        manifest_url = None
        if has_real_video:
            if video_file:
                manifest_url = f"{video_file.url}?token={token}&expires={expires_at}"
            elif ext_url:
                manifest_url = f"{ext_url}?token={token}&expires={expires_at}"
            elif lesson.video_asset_id:
                manifest_url = f"{base_url}/{lesson.video_asset_id}/manifest.m3u8?token={token}&expires={expires_at}"

        return {
            "allowed": True,
            "reason": reason,
            "lesson_id": lesson.id,
            "provider": lesson.video_provider,
            "asset_id": lesson.video_asset_id if has_real_video else "",
            "playback_token": token,
            "video_available": has_real_video,
            "manifest_url": manifest_url,
            "expires_in_seconds": ttl,
            "is_demo": lesson.is_demo,
            "demo_notice": (
                "Contenu de démonstration : aucune ressource vidéo réelle n'est rattachée à cette leçon."
                if lesson.is_demo and not has_real_video
                else ""
            ),
        }

    @classmethod
    def record_lesson_progress(
        cls,
        *,
        user,
        lesson: Lesson,
        watched_seconds: int = 0,
        last_position_seconds: int = 0,
        mark_completed: bool = False,
    ) -> LessonProgress:
        course = lesson.module.course
        enrollment, _ = Enrollment.objects.get_or_create(user=user, course=course)

        now = timezone.now()
        prog, _ = LessonProgress.objects.get_or_create(user=user, lesson=lesson)
        prog.watched_seconds = max(prog.watched_seconds, watched_seconds)
        prog.last_position_seconds = max(0, last_position_seconds)
        if mark_completed and not prog.is_completed:
            prog.is_completed = True
            prog.completed_at = now
        prog.save()

        # Recompute overall course enrollment percentage
        total_lessons = Lesson.objects.filter(module__course=course).count()
        completed_count = LessonProgress.objects.filter(
            user=user, lesson__module__course=course, is_completed=True
        ).count()
        enrollment.last_lesson = lesson
        enrollment.progress_percentage = (
            round((completed_count / total_lessons) * 100.0, 1) if total_lessons else 0.0
        )
        if completed_count >= total_lessons and total_lessons > 0:
            enrollment.status = Enrollment.Status.COMPLETED
            enrollment.completed_at = enrollment.completed_at or now
        enrollment.save()
        return prog
