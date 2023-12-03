#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status.

# Wait for the database to be ready
python manage.py wait_for_db

# Apply database migrations
python manage.py migrate

# Collect static files
# Uncomment the next line if you use Django's static files in production
# python manage.py collectstatic --noinput

# Start the main process
exec "$@"
