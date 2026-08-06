#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STRAPI_DIR="$ROOT_DIR/strapi"

mkdir -p "$STRAPI_DIR/public/uploads"

echo "[smoke] ensuring postgres is running"
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d postgres >/dev/null

APP_KEYS="${APP_KEYS:-dev-key-a,dev-key-b}"
JWT_SECRET="${JWT_SECRET:-dev-jwt-secret}"
API_TOKEN_SALT="${API_TOKEN_SALT:-dev-api-token-salt}"
TRANSFER_TOKEN_SALT="${TRANSFER_TOKEN_SALT:-dev-transfer-token-salt}"
ADMIN_JWT_SECRET="${ADMIN_JWT_SECRET:-dev-admin-jwt}"
STRAPI_NOTIFICATION_TOKEN="${STRAPI_NOTIFICATION_TOKEN:-dev-notify-token}"
STRAPI_EMAIL_FROM="${STRAPI_EMAIL_FROM:-noreply@assistpro.local}"
STRAPI_EMAIL_REPLY_TO="${STRAPI_EMAIL_REPLY_TO:-investments@assistpro.local}"
DATABASE_HOST="${DATABASE_HOST:-127.0.0.1}"
DATABASE_PORT="${DATABASE_PORT:-5432}"
DATABASE_NAME="${DATABASE_NAME:-assistpro}"
DATABASE_USERNAME="${DATABASE_USERNAME:-assistpro}"
DATABASE_PASSWORD="${DATABASE_PASSWORD:-assistpro}"
STRAPI_SMTP_STREAM_TRANSPORT="${STRAPI_SMTP_STREAM_TRANSPORT:-true}"

LOG_FILE="/tmp/assistpro-strapi-smoke.log"
RESP_FILE="/tmp/assistpro-notify-response.json"

cleanup() {
  if [[ -n "${STRAPI_PID:-}" ]] && kill -0 "$STRAPI_PID" >/dev/null 2>&1; then
    kill "$STRAPI_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "[smoke] starting strapi"
(
  cd "$STRAPI_DIR"
  APP_KEYS="$APP_KEYS" \
  JWT_SECRET="$JWT_SECRET" \
  API_TOKEN_SALT="$API_TOKEN_SALT" \
  TRANSFER_TOKEN_SALT="$TRANSFER_TOKEN_SALT" \
  ADMIN_JWT_SECRET="$ADMIN_JWT_SECRET" \
  STRAPI_SMTP_STREAM_TRANSPORT=true \
  STRAPI_NOTIFICATION_TOKEN="$STRAPI_NOTIFICATION_TOKEN" \
  STRAPI_EMAIL_FROM="$STRAPI_EMAIL_FROM" \
  STRAPI_EMAIL_REPLY_TO="$STRAPI_EMAIL_REPLY_TO" \
  STRAPI_SMTP_STREAM_TRANSPORT="$STRAPI_SMTP_STREAM_TRANSPORT" \
  DATABASE_HOST="$DATABASE_HOST" \
  DATABASE_PORT="$DATABASE_PORT" \
  DATABASE_NAME="$DATABASE_NAME" \
  DATABASE_USERNAME="$DATABASE_USERNAME" \
  DATABASE_PASSWORD="$DATABASE_PASSWORD" \
  npm run develop >"$LOG_FILE" 2>&1
) &
STRAPI_PID=$!

echo "[smoke] waiting for /api/notification/send"
HTTP_CODE="$(curl --retry 40 --retry-delay 1 --retry-all-errors --retry-connrefused -sS -o "$RESP_FILE" -w "%{http_code}" \
  -X POST "http://127.0.0.1:1337/api/notification/send" \
  -H "Authorization: Bearer $STRAPI_NOTIFICATION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to":"investments@example.com","subject":"AssistPro smoke test","text":"Investor notification path is working."}')"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "[smoke] failed with HTTP $HTTP_CODE"
  echo "[smoke] response:"
  cat "$RESP_FILE" || true
  echo "[smoke] strapi log tail:"
  tail -n 80 "$LOG_FILE" || true
  exit 1
fi

echo "[smoke] success: HTTP $HTTP_CODE"
cat "$RESP_FILE"
echo