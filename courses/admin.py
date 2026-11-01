from django.contrib import admin

from .models import Course, CourseModule, Enrollment, Lesson, LessonProgress


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0


class CourseModuleInline(admin.TabularInline):
    model = CourseModule
    extra = 0


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title_fr",
        "code",
        "category_code",
        "level",
        "estimated_hours",
        "lessons_count",
        "status",
        "is_demo",
        "order",
    )
    list_filter = ("status", "level", "category_code", "is_demo")
    search_fields = ("title_fr", "title_en", "title_ar", "code")
    inlines = [CourseModuleInline]


@admin.register(CourseModule)
class CourseModuleAdmin(admin.ModelAdmin):
    list_display = ("title_fr", "course", "order")
    list_filter = ("course",)
    inlines = [LessonInline]


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title_fr", "module", "order", "duration_minutes", "video_provider", "is_free_preview", "is_demo")
    list_filter = ("video_provider", "is_free_preview", "is_demo")


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "status", "progress_percentage", "last_accessed_at")


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "lesson", "is_completed", "watched_seconds", "updated_at")
