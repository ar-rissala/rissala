from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.utils.text import slugify

from .models import (
    Article,
    ArticleMedia,
    ArticleRevision,
    Category,
    Rubrique,
    Tag,
    TranslationGroup,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_fr", "code", "section_type", "order", "is_active")
    list_filter = ("section_type", "is_active")
    search_fields = ("name_fr", "name_en", "name_ar", "code")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name_fr", "name_en", "name_ar", "slug")
    search_fields = ("name_fr", "slug")


class ArticleInlineForTranslationGroup(admin.TabularInline):
    model = Article
    fields = ("language", "title", "slug", "status", "published_at", "edit_link")
    readonly_fields = ("edit_link",)
    extra = 0
    show_change_link = True

    def edit_link(self, obj):
        if not obj or not obj.id:
            return "-"
        url = reverse("admin:content_article_change", args=[obj.id])
        return format_html('<a href="{}" style="font-weight:bold;color:#059669;">Modifier l\'article &rarr;</a>', url)

    edit_link.short_description = "Accès direct"


@admin.register(TranslationGroup)
class TranslationGroupAdmin(admin.ModelAdmin):
    list_display = ("canonical_key", "rubrique_display", "translations_summary", "created_at")
    list_filter = ("section_type", "created_at")
    search_fields = ("canonical_key", "notes")
    inlines = [ArticleInlineForTranslationGroup]

    def rubrique_display(self, obj):
        labels = dict(Rubrique.choices)
        return labels.get(obj.section_type, obj.section_type)

    rubrique_display.short_description = "Rubrique"

    def translations_summary(self, obj):
        articles = {a.language: a for a in obj.articles.all()}
        pills = []
        for lang_code in ("fr", "en", "ar"):
            if lang_code in articles:
                art = articles[lang_code]
                bg = "#059669" if art.status == Article.Status.PUBLISHED else "#d97706"
                pills.append(
                    f'<span style="background:{bg};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:bold;margin-right:4px;">'
                    f'{lang_code.upper()} : {art.get_status_display()}</span>'
                )
            else:
                pills.append(
                    f'<span style="background:#e5e7eb;color:#6b7280;padding:2px 8px;border-radius:4px;font-size:11px;margin-right:4px;">'
                    f'{lang_code.upper()} : Manquant</span>'
                )
        return format_html("".join(pills))

    translations_summary.short_description = "Versions linguistiques"


class ArticleRevisionInline(admin.TabularInline):
    model = ArticleRevision
    extra = 0
    readonly_fields = ("editor", "title", "note", "created_at")


class ArticleMediaInline(admin.TabularInline):
    model = ArticleMedia
    extra = 0


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "rubrique_badge",
        "language_badge",
        "status_badge",
        "translations_indicator",
        "author_display",
        "published_at",
    )
    list_filter = (
        "section_type",
        "language",
        "status",
        "preserve_arabic_content",
        "is_featured",
        "is_demo",
        "published_at",
    )
    search_fields = ("title", "slug", "summary", "content_markdown")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags", "related_articles")
    date_hierarchy = "published_at"
    inlines = [ArticleMediaInline, ArticleRevisionInline]
    readonly_fields = ("translations_management_panel", "created_at", "updated_at")

    fieldsets = (
        (
            "1. Rubrique & Langue",
            {
                "fields": (
                    "section_type",
                    "language",
                    "translation_group",
                    "editorial_nature",
                ),
                "description": "Sélectionnez obligatoirement la rubrique principale et la langue du contenu.",
            },
        ),
        (
            "2. Contenu Rédactionnel",
            {
                "fields": (
                    "title",
                    "slug",
                    "summary",
                    "content_markdown",
                    "featured_image",
                    "featured_image_url",
                ),
            },
        ),
        (
            "3. Gestion des Traductions (FR / EN / AR)",
            {
                "fields": ("translations_management_panel",),
                "description": "Visualisez les traductions existantes et créez directement les versions manquantes.",
            },
        ),
        (
            "4. Statut & Publication",
            {
                "fields": (
                    "status",
                    "published_at",
                    "author",
                    "author_name",
                    "is_featured",
                    "is_demo",
                ),
            },
        ),
        (
            "5. Référencement & Métadonnées SEO",
            {
                "classes": ("collapse",),
                "fields": ("seo_title", "seo_description", "canonical_url", "noindex"),
            },
        ),
        (
            "6. Classification & Pédagogie",
            {
                "classes": ("collapse",),
                "fields": (
                    "category",
                    "tags",
                    "level",
                    "order",
                    "sources_references",
                    "related_articles",
                    "preserve_arabic_content",
                ),
            },
        ),
    )

    def rubrique_badge(self, obj):
        labels = dict(Rubrique.choices)
        label = labels.get(obj.section_type, obj.section_type)
        colors = {
            "islamic_sciences": "#047857",
            "arabic_language": "#0284c7",
            "islamic_finance": "#b45309",
            "news": "#4338ca",
        }
        color = colors.get(str(obj.section_type).lower(), "#374151")
        return format_html(
            '<span style="background:{};color:#fff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;">{}</span>',
            color,
            label,
        )

    rubrique_badge.short_description = "Rubrique"
    rubrique_badge.admin_order_field = "section_type"

    def language_badge(self, obj):
        flags = {"fr": "🇫🇷 FR", "en": "🇬🇧 EN", "ar": "🇸🇦 AR"}
        label = flags.get(obj.language, obj.language.upper())
        return format_html(
            '<span style="background:#f3f4f6;color:#111827;border:1px solid #d1d5db;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:bold;">{}</span>',
            label,
        )

    language_badge.short_description = "Langue"
    language_badge.admin_order_field = "language"

    def status_badge(self, obj):
        if obj.status == Article.Status.PUBLISHED:
            return format_html('<span style="color:#059669;font-weight:bold;">Publié</span>')
        elif obj.status == Article.Status.DRAFT:
            return format_html('<span style="color:#d97706;font-weight:bold;">Brouillon</span>')
        return format_html('<span style="color:#4b5563;font-weight:bold;">Programmé</span>')

    status_badge.short_description = "Statut"
    status_badge.admin_order_field = "status"

    def author_display(self, obj):
        if obj.author:
            return obj.author.pseudo or obj.author.email
        return obj.author_name

    author_display.short_description = "Auteur / Rédacteur"

    def translations_indicator(self, obj):
        if not obj.translation_group_id:
            return format_html('<span style="color:#9ca3af;font-size:11px;">Aucun groupe lié</span>')

        all_translations = obj.get_all_translations()
        pills = []
        for l_code, l_label in (("fr", "FR"), ("en", "EN"), ("ar", "AR")):
            if l_code in all_translations:
                trans = all_translations[l_code]
                bg = "#059669" if trans.status == Article.Status.PUBLISHED else "#d97706"
                edit_url = reverse("admin:content_article_change", args=[trans.id])
                pills.append(
                    f'<a href="{edit_url}" title="{trans.title} ({trans.get_status_display()})" style="text-decoration:none;">'
                    f'<span style="background:{bg};color:#fff;padding:2px 6px;border-radius:3px;font-size:11px;font-weight:bold;margin-right:3px;">'
                    f'{l_label}</span></a>'
                )
            else:
                add_url = (
                    reverse("admin:content_article_add")
                    + f"?translation_group={obj.translation_group_id}&section_type={obj.section_type}&language={l_code}"
                )
                pills.append(
                    f'<a href="{add_url}" title="Créer la traduction en {l_label}" style="text-decoration:none;">'
                    f'<span style="background:#e5e7eb;color:#9ca3af;border:1px dashed #9ca3af;padding:2px 5px;border-radius:3px;font-size:11px;margin-right:3px;">'
                    f'+{l_label}</span></a>'
                )
        return format_html("".join(pills))

    translations_indicator.short_description = "Traductions (FR/EN/AR)"

    def translations_management_panel(self, obj):
        if not obj or not obj.id:
            return format_html(
                '<div style="padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;color:#166534;">'
                '<strong>ℹ️ Enregistrement initial :</strong> Le groupe de traduction sera automatiquement '
                'créé et associé lors de la sauvegarde de cet article. Vous pourrez ensuite ajouter les autres langues en 1 clic.'
                '</div>'
            )

        group = obj.translation_group
        if not group:
            canonical_key = f"{obj.section_type}/{obj.slug}"
            group, _ = TranslationGroup.objects.get_or_create(
                canonical_key=canonical_key,
                defaults={"section_type": obj.section_type},
            )
            obj.translation_group = group
            obj.save(update_fields=["translation_group"])

        all_translations = obj.get_all_translations()
        rows = []
        lang_names = {"fr": "Français (FR)", "en": "Anglais (EN)", "ar": "Arabe (AR)"}

        for l_code in ("fr", "en", "ar"):
            if l_code in all_translations:
                trans = all_translations[l_code]
                status_color = "#059669" if trans.status == Article.Status.PUBLISHED else "#d97706"
                edit_url = reverse("admin:content_article_change", args=[trans.id])
                is_current = " (version affichée)" if trans.id == obj.id else ""
                rows.append(
                    f'<tr>'
                    f'<td style="padding:8px;font-weight:bold;">{lang_names[l_code]}{is_current}</td>'
                    f'<td style="padding:8px;">{trans.title}</td>'
                    f'<td style="padding:8px;"><span style="color:{status_color};font-weight:bold;">{trans.get_status_display()}</span></td>'
                    f'<td style="padding:8px;">{trans.published_at.strftime("%d/%m/%Y %H:%M") if trans.published_at else "-"}</td>'
                    f'<td style="padding:8px;"><a href="{edit_url}" class="button" style="padding:4px 10px;">Modifier cette version</a></td>'
                    f'</tr>'
                )
            else:
                add_url = (
                    reverse("admin:content_article_add")
                    + f"?translation_group={group.id}&section_type={obj.section_type}&language={l_code}"
                )
                rows.append(
                    f'<tr style="background:#fafafa;">'
                    f'<td style="padding:8px;font-weight:bold;color:#6b7280;">{lang_names[l_code]}</td>'
                    f'<td style="padding:8px;color:#9ca3af;font-style:italic;">Non encore rédigé</td>'
                    f'<td style="padding:8px;color:#9ca3af;">—</td>'
                    f'<td style="padding:8px;color:#9ca3af;">—</td>'
                    f'<td style="padding:8px;"><a href="{add_url}" class="button" style="padding:4px 10px;background:#059669;color:#fff;">+ Créer la version {l_code.upper()}</a></td>'
                    f'</tr>'
                )

        table_html = (
            f'<div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">'
            f'<div style="padding:10px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-weight:bold;color:#374151;">'
            f'Groupe de traduction logique : <code>{group.canonical_key}</code>'
            f'</div>'
            f'<table style="width:100%;border-collapse:collapse;font-size:13px;">'
            f'<thead>'
            f'<tr style="background:#f3f4f6;text-align:left;color:#4b5563;">'
            f'<th style="padding:8px;">Langue</th>'
            f'<th style="padding:8px;">Titre</th>'
            f'<th style="padding:8px;">Statut</th>'
            f'<th style="padding:8px;">Date publication</th>'
            f'<th style="padding:8px;">Action</th>'
            f'</tr>'
            f'</thead>'
            f'<tbody>'
            f'{"".join(rows)}'
            f'</tbody>'
            f'</table>'
            f'</div>'
        )
        return format_html(table_html)

    translations_management_panel.short_description = "État des traductions associées"

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        tg_id = request.GET.get("translation_group")
        if tg_id:
            initial["translation_group"] = tg_id
            try:
                group = TranslationGroup.objects.get(pk=tg_id)
                initial["section_type"] = group.section_type
            except (TranslationGroup.DoesNotExist, ValueError):
                pass
        if "section_type" in request.GET:
            initial["section_type"] = request.GET["section_type"]
        if "language" in request.GET:
            initial["language"] = request.GET["language"]
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.author and request.user.is_authenticated:
            obj.author = request.user

        if obj.translation_group_id:
            obj.section_type = obj.translation_group.section_type
        else:
            # Auto-create or resolve TranslationGroup
            canonical_key = f"{obj.section_type}/{obj.slug or slugify(obj.title, allow_unicode=False)}"
            group, _ = TranslationGroup.objects.get_or_create(
                canonical_key=canonical_key,
                defaults={"section_type": obj.section_type},
            )
            obj.translation_group = group

        super().save_model(request, obj, form, change)
