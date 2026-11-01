release: python manage.py migrate --noinput && python manage.py seed_rissala && python manage.py collectstatic --noinput
web: gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --timeout 120
worker: celery -A config worker -l info

