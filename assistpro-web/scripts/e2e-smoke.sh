#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STORE_FILE="$ROOT_DIR/data/store.json"
STORE_BACKUP="$(mktemp)"
COOKIE_JAR="$(mktemp)"
NEXT_LOG="$(mktemp)"
PORT="${PORT:-3101}"
BASE_URL="http://127.0.0.1:${PORT}"
NEXT_PID=""

assert_status() {
  local name="$1"
  local got="$2"
  local expected="$3"
  if [[ "$got" != "$expected" ]]; then
    echo "[e2e] ${name} failed: expected ${expected}, got ${got}" >&2
    if [[ -f "$NEXT_LOG" ]]; then
      echo "[e2e] next log tail:" >&2
      tail -n 120 "$NEXT_LOG" >&2 || true
    fi
    exit 1
  fi
}

cleanup() {
  if [[ -n "$NEXT_PID" ]]; then
    kill "$NEXT_PID" >/dev/null 2>&1 || true
    wait "$NEXT_PID" >/dev/null 2>&1 || true
  fi

  if [[ -f "$STORE_BACKUP" ]]; then
    cp "$STORE_BACKUP" "$STORE_FILE"
  fi

  rm -f "$STORE_BACKUP" "$COOKIE_JAR" "$NEXT_LOG"
}
trap cleanup EXIT

if [[ ! -f "$STORE_FILE" ]]; then
  echo "[e2e] expected store file at $STORE_FILE" >&2
  exit 1
fi

cp "$STORE_FILE" "$STORE_BACKUP"

echo "[e2e] ensuring postgres is running"
(
  cd "$ROOT_DIR"
  docker compose up -d postgres
)

echo "[e2e] building Next.js app"
(
  cd "$ROOT_DIR"
  npm run build >/dev/null
)

echo "[e2e] starting Next.js app on port ${PORT}"
(
  cd "$ROOT_DIR"
  PORT="$PORT" npm run start >"$NEXT_LOG" 2>&1
) &
NEXT_PID="$!"

echo "[e2e] waiting for app readiness"
curl -fsS --retry 60 --retry-all-errors --retry-connrefused --retry-delay 1 "$BASE_URL/api/marketing" >/dev/null

echo "[e2e] checking public routes"
code_home=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
code_register_page=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/auth/register?intent=investor")
code_login_page=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/auth/login?intent=investor")
assert_status "home route" "$code_home" "200"
assert_status "register route" "$code_register_page" "200"
assert_status "login route" "$code_login_page" "200"

echo "[e2e] running auth and investor workflow"
ts="$(date +%s)"
email="e2e-investor-${ts}@example.com"
password="Pass1234"

code_register=$(curl -s -c "$COOKIE_JAR" -o /tmp/e2e-register.json -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"E2E Investor\",\"email\":\"${email}\",\"password\":\"${password}\",\"role\":\"client\",\"investorCountry\":\"Kenya\",\"investorBudget\":\"50000\",\"investorOperatingExperience\":\"Regional product operations\",\"investorNotes\":\"Automated e2e validation\"}" \
  "$BASE_URL/api/auth/register")
assert_status "register API" "$code_register" "201"

code_me_after_register=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-me-after-register.json -w "%{http_code}" "$BASE_URL/api/auth/me")
assert_status "auth me after register" "$code_me_after_register" "200"
if ! grep -q "\"email\":\"${email}\"" /tmp/e2e-me-after-register.json; then
  echo "[e2e] expected registered user session in /api/auth/me response" >&2
  cat /tmp/e2e-me-after-register.json >&2
  exit 1
fi

code_logout=$(curl -s -b "$COOKIE_JAR" -c "$COOKIE_JAR" -o /tmp/e2e-logout.json -w "%{http_code}" -X POST "$BASE_URL/api/auth/logout")
assert_status "logout API" "$code_logout" "200"

code_me_after_logout=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-me-after-logout.json -w "%{http_code}" "$BASE_URL/api/auth/me")
assert_status "auth me after logout" "$code_me_after_logout" "200"
if ! grep -q '"user":null' /tmp/e2e-me-after-logout.json; then
  echo "[e2e] expected user session to be cleared after logout" >&2
  cat /tmp/e2e-me-after-logout.json >&2
  exit 1
fi

code_login=$(curl -s -b "$COOKIE_JAR" -c "$COOKIE_JAR" -o /tmp/e2e-login.json -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${email}\",\"password\":\"${password}\"}" \
  "$BASE_URL/api/auth/login")
assert_status "login API" "$code_login" "200"

code_me_after_login=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-me-after-login.json -w "%{http_code}" "$BASE_URL/api/auth/me")
assert_status "auth me after login" "$code_me_after_login" "200"
if ! grep -q "\"email\":\"${email}\"" /tmp/e2e-me-after-login.json; then
  echo "[e2e] expected authenticated session after login" >&2
  cat /tmp/e2e-me-after-login.json >&2
  exit 1
fi

code_investor_post=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-investor-post.json -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -d "{\"country\":\"Kenya\",\"budget\":\"90000\",\"operatingExperience\":\"5 years in SaaS rollout\",\"notes\":\"Profile update during E2E test\"}" \
  "$BASE_URL/api/investor-profile")
assert_status "investor profile update API" "$code_investor_post" "200"

code_investor_get=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-investor-get.json -w "%{http_code}" "$BASE_URL/api/investor-profile")
assert_status "investor profile read API" "$code_investor_get" "200"

code_admin_api=$(curl -s -b "$COOKIE_JAR" -o /tmp/e2e-admin-api.json -w "%{http_code}" "$BASE_URL/api/admin")
assert_status "admin API access as client" "$code_admin_api" "403"

code_admin_page=$(curl -s -b "$COOKIE_JAR" -D /tmp/e2e-admin-headers.txt -o /dev/null -w "%{http_code}" "$BASE_URL/admin")
assert_status "admin page redirect" "$code_admin_page" "307"

if ! grep -qiE "^location: /(dashboard|auth/login)" /tmp/e2e-admin-headers.txt; then
  echo "[e2e] admin redirect location mismatch" >&2
  cat /tmp/e2e-admin-headers.txt >&2
  exit 1
fi

echo "[e2e] success"
echo "[e2e] verified: build, public routes, auth workflow, investor profile workflow, and admin access controls"
