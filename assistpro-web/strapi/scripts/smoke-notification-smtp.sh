#!/usr/bin/env bash
set -euo pipefail

required_vars=(
  STRAPI_SMTP_HOST
  STRAPI_SMTP_PORT
  STRAPI_SMTP_USER
  STRAPI_SMTP_PASS
  STRAPI_EMAIL_FROM
  STRAPI_EMAIL_REPLY_TO
  STRAPI_NOTIFICATION_TOKEN
)

missing=()
for name in "${required_vars[@]}"; do
  if [[ -z "${!name:-}" ]]; then
    missing+=("$name")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Missing required environment variables for SMTP smoke test:" >&2
  printf ' - %s\n' "${missing[@]}" >&2
  echo "Set them in your shell or .env before running this command." >&2
  exit 1
fi

STRAPI_SMTP_STREAM_TRANSPORT=false bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/smoke-notification.sh"
