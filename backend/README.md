# Rissala — Backend Django

API REST du système d'authentification de la plateforme Rissala.

## Stack

- **Python 3.11+** / **Django 4.2+**
- **PostgreSQL** (dès le développement)
- **Django REST Framework** — API JSON
- **django-cors-headers** — CORS pour le frontend Next.js
- Sessions Django (pas JWT)

---

## Installation

### 1. Prérequis

- Python 3.11+ installé
- PostgreSQL installé et démarré
- Git

### 2. Cloner et accéder au dossier backend

```bash
cd rissala/backend
```

### 3. Créer et activer l'environnement virtuel

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python -m venv .venv
source .venv/bin/activate
```

### 4. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 5. Créer la base PostgreSQL

```sql
-- Dans psql ou pgAdmin :
CREATE DATABASE rissala_db;
CREATE USER rissala_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE rissala_db TO rissala_user;
```

### 6. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Editer `.env` :

```env
DB_NAME=rissala_db
DB_USER=rissala_user
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432

SECRET_KEY=votre-cle-secrete-tres-longue-et-aleatoire
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
FRONTEND_URL=http://localhost:3000
```

### 7. Exécuter les migrations

```bash
python manage.py migrate
```

### 8. Créer un super-utilisateur admin

```bash
python manage.py createsuperuser
# → Saisir email, pseudo, mot de passe
```

### 9. Lancer le serveur

```bash
python manage.py runserver 8000
```

---

## API Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/accounts/csrf/` | Obtenir le token CSRF |
| POST | `/api/accounts/register/` | Inscription |
| POST | `/api/accounts/login/` | Connexion |
| POST | `/api/accounts/logout/` | Déconnexion |
| GET | `/api/accounts/me/` | Utilisateur courant |
| POST | `/api/accounts/password-reset/` | Demande de réinitialisation |
| POST | `/api/accounts/password-reset/confirm/` | Confirmation de réinitialisation |

## Administration Django

URL : `http://localhost:8000/admin/`

Connexion avec les identifiants du superuser.

Fonctionnalités :
- Voir, créer, modifier, supprimer des utilisateurs
- Recherche par pseudo / email
- Filtres par statut, date d'inscription
- Activer / désactiver des comptes en masse

## Tests

```bash
# Les tests utilisent SQLite en mémoire — PostgreSQL non requis
python manage.py test accounts --settings=config.test_settings --verbosity=2
```

## Lancer en développement (conjointement avec Next.js)

```bash
# Terminal 1 — Backend Django
cd backend
.venv\Scripts\activate   # Windows
python manage.py runserver 8000

# Terminal 2 — Frontend Next.js
cd ..   # retour à rissala/
npm run dev
```

Le frontend appelle l'API via `/api/django/*` (proxifié par Next.js vers `localhost:8000`).

## Configuration SMTP (production)

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.votre-fournisseur.com
EMAIL_PORT=587
EMAIL_HOST_USER=noreply@rissala.net
EMAIL_HOST_PASSWORD=votre_mot_de_passe_smtp
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=Rissala <noreply@rissala.net>
```

## Architecture extensible

Le modèle `User` dans `accounts/models.py` est conçu pour accueillir ultérieurement :

```python
# Futures relations (à créer dans une app `courses/`)
class Course(models.Model): ...
class Lesson(models.Model): ...
class Enrollment(models.Model):
    user = models.ForeignKey(User, ...)
class Progress(models.Model): ...
class Certificate(models.Model): ...
```
