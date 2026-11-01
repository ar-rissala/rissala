# Rissala.net — Plateforme Éditoriale, Bibliothèque Numérique (EPUB/PDF) & Formations (Django 5.2 LTS)

Plateforme francophone et internationale (`fr`, `en`, `ar` + RTL) dédiée aux **Sciences Islamiques**, à l'apprentissage de la **Langue Arabe**, à la **Finance Islamique (Fiqh al-Mu'amalat)**, à la **Bibliothèque Numérique (EPUB & PDF)** synchronisée avec l'application mobile **React Native**, et aux **Parcours de Formation Vidéo**.

---

## 1. Architecture Technique & Applications Django

Le projet repose exclusivement sur **Python / Django 5.2 LTS**, **PostgreSQL**, **Django Templates**, **Tailwind CSS**, **Alpine.js**, **Django REST Framework (SimpleJWT)** et **Gunicorn / WhiteNoise**. Toute dépendance historique à Next.js, React Web, Convex ou Vercel a été intégralement supprimée.

| Application | Responsabilité |
| :--- | :--- |
| [`config/`](file:///c:/Users/micka/Desktop/rissala-frontend/config/settings.py) | Configuration globale Django 5.2 LTS, sécurité HTTPS/Railway, PostgreSQL (`DATABASE_URL`), S3 optionnel, DRF, SimpleJWT, Celery. |
| [`core/`](file:///c:/Users/micka/Desktop/rissala-frontend/core/i18n.py) | Multilinguisme (`fr`, `en`, `ar`), gestion RTL, redirections permanentes (301) des anciennes URLs, accueil, recherche globale, calculateur de Zakat, pages institutionnelles. |
| [`accounts/`](file:///c:/Users/micka/Desktop/rissala-frontend/accounts/models.py) | Modèle utilisateur personnalisé (`User` avec `email`, `pseudo`, `role` Membre/Éditeur/Admin, `preferred_language`), authentification Email ou Pseudo, espace membre et tableau de bord. |
| [`content/`](file:///c:/Users/micka/Desktop/rissala-frontend/content/models.py) | Base éditoriale (`Category`, `Tag`, `TranslationGroup`, `Article`, `ArticleRevision`, `ArticleMedia`), moteur Markdown sécurisé anti-XSS, préservation de l'arabe pédagogique, commande idempotente `seed_rissala`. |
| [`books/`](file:///c:/Users/micka/Desktop/rissala-frontend/books/models.py) | Système dédié aux ouvrages et ebooks (`Book`, `BookEdition`, `BookChapter`, `BookAuthor`, `BookTranslator`, `BookPublisher`, `BookFile` EPUB/PDF, `BookCategory`, `BookLanguage`) et URLs de téléchargement signées. |
| [`library/`](file:///c:/Users/micka/Desktop/rissala-frontend/library/models.py) | Bibliothèque personnelle membre (`LibraryEntry`) et synchronisation sans conflit de la progression de lecture (`ReadingProgress`), marque-pages (`Bookmark`), notes (`ReadingNote`) et surlignages (`ReadingHighlight`). |
| [`courses/`](file:///c:/Users/micka/Desktop/rissala-frontend/courses/models.py) | Parcours de formation vidéo (`Course`, `CourseModule`, `Lesson`, `Enrollment`, `LessonProgress`) et service `VideoStreamingService` générant des jetons de lecture signés temporaires. |
| [`newsletter/`](file:///c:/Users/micka/Desktop/rissala-frontend/newsletter/models.py) | Gestion RGPD de la newsletter (`NewsletterSubscriber`, `NewsletterCampaign`, `NewsletterDeliveryLog`), double opt-in, preuve de consentement horodatée, désinscription en un clic, connecteur Brevo + fallback SMTP/Django. |
| [`api/`](file:///c:/Users/micka/Desktop/rissala-frontend/api/urls.py) | API REST versionnée `/api/v1/` dédiée à l'application mobile **React Native** (JWT, profil, livres, bibliothèque, sync de lecture, articles, cours, recherche, schéma OpenAPI). |
| [`seo/`](file:///c:/Users/micka/Desktop/rissala-frontend/seo/services.py) | Métadonnées SEO & GEO dynamiques (`canonical`, `hreflang` fr/en/ar/x-default, Open Graph, Twitter Cards, Schema.org JSON-LD, `/robots.txt`, `/sitemap.xml`, `RedirectRule`). |

---

## 2. Installation & Lancement en Local

```bash
# 1. Créer et activer un environnement virtuel (optionnel si déjà configuré)
python -m venv .venv
# Windows : .venv\Scripts\activate | Linux/macOS : source .venv/bin/activate

# 2. Installer les dépendances
pip install -r requirements.txt

# 3. Appliquer les migrations
python manage.py migrate

# 4. Peupler la base de données (idempotent : articles FR/EN/AR, 7 livres EPUB/PDF, 9 parcours vidéo)
python manage.py seed_rissala

# 5. Collecter les fichiers statiques
python manage.py collectstatic --noinput

# 6. Lancer le serveur de développement
python manage.py runserver
```

---

## 3. API REST Mobile React Native (`/api/v1/`)

L'API REST versionnée est documentée via `/api/v1/schema/` :

- `POST /api/v1/auth/register/` — Inscription membre + couple JWT (`access`, `refresh`)
- `POST /api/v1/auth/token/` — Connexion JWT (par email ou pseudo)
- `POST /api/v1/auth/token/refresh/` — Rafraîchissement du jeton JWT
- `GET / PATCH /api/v1/me/` — Profil et préférences utilisateur
- `GET /api/v1/books/` — Catalogue des livres (filtres `category`, `language`, `format`, `q`)
- `GET /api/v1/books/<identifier>/` — Détail complet d'un livre (éditions, chapitres, fichiers EPUB/PDF)
- `GET /api/v1/books/<book_id>/access/?format=EPUB|PDF` — URL signée temporaire de téléchargement/lecture
- `GET / POST /api/v1/library/` — Bibliothèque personnelle de l'utilisateur
- `GET / POST /api/v1/library/progress/` — Synchronisation sans conflit de la progression de lecture (`client_updated_at`, `epub_cfi`, `current_page`, `percentage`)
- `GET / POST /api/v1/library/bookmarks/` — Marque-pages synchronisés
- `GET / POST /api/v1/library/notes/` — Notes de lecture synchronisées
- `GET / POST /api/v1/library/highlights/` — Surlignages synchronisés
- `GET /api/v1/articles/` | `/api/v1/news/` | `/api/v1/arabic-lessons/` — Contenus éditoriaux et leçons d'arabe
- `GET /api/v1/courses/` | `POST /api/v1/courses/<id>/enroll/` | `GET /api/v1/lessons/<id>/playback/` — Parcours vidéo et jetons de streaming signés
- `GET /api/v1/search/?q=...&language=fr` — Recherche globale

---

## 4. Déploiement sur Railway

Le dépôt inclut [`Procfile`](file:///c:/Users/micka/Desktop/rissala-frontend/Procfile), [`railway.json`](file:///c:/Users/micka/Desktop/rissala-frontend/railway.json), [`requirements.txt`](file:///c:/Users/micka/Desktop/rissala-frontend/requirements.txt) et [`.env.example`](file:///c:/Users/micka/Desktop/rissala-frontend/.env.example).

1. Connectez le dépôt GitHub à un projet **Railway**.
2. Ajoutez un service **PostgreSQL** dans Railway (`DATABASE_URL` est injectée automatiquement).
3. Configurez les variables d'environnement listées dans [`.env.example`](file:///c:/Users/micka/Desktop/rissala-frontend/.env.example) (`DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `SITE_URL`).
4. Railway exécute automatiquement les migrations, le seed idempotent (`seed_rissala`), `collectstatic` et démarre **Gunicorn** avec vérification de santé sur `/health/`.
