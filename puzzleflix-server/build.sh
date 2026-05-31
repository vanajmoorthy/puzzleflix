#!/bin/bash
set -e
echo "Building server, remember to git pull prior for latest version"

if [ ! -f .env ]; then
    echo "ERROR: ./.env not found. Create it with DB_HOST/DB_USER/DB_PASSWORD/DB_NAME/DB_PORT before building." >&2
    exit 1
fi

docker build . --no-cache -t puzzleflix-backend
docker stop api 2>/dev/null || true
docker rm api 2>/dev/null || true
docker run -d -p 24100:24100 --name api --env APP_ENVIRONMENT=PRODUCTION --env-file .env puzzleflix-backend
