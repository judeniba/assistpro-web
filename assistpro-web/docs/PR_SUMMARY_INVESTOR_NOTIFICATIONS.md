# PR Summary: Investor Workflow + Notification Hardening

## Objective
Deliver an investor acquisition workflow for country licensing, including investor onboarding, admin review, and resilient notifications with Strapi integration and local fallbacks.

## Scope Delivered
- Investor-facing landing page CTAs for application and account access.
- Investor-aware auth flow (register/login intent pathing).
- Dedicated investor dashboard and editable investor application profile.
- Admin investor queue visibility and status updates.
- Notification dispatch strategy with webhook, Strapi route, and local log fallback.
- Strapi notification route/controller and SMTP provider configuration.
- Environment templates and smoke tooling for local and SMTP-style validation.
- One-command end-to-end smoke script for app flow verification.

## Key Runtime Paths
- Investor application write/read: `/api/investor-profile`
- Admin investor updates: `/api/admin/investors/[id]`
- Notification delivery endpoint (Strapi): `/api/notification/send`

## Validation Completed
- Next.js production build succeeded.
- Strapi production build succeeded.
- Automated tests passed (13/13).
- Local notification smoke test succeeded (`npm run smoke:notification`).
- API E2E flow validated: registration, session checks, logout/login, investor profile save/read, and admin access denial for client role.
- Route checks validated for home, investor auth pages, investor dashboard access, and admin redirect behavior.

## New Operational Commands
- `npm run smoke:notification`
- `npm run smoke:notification:smtp`
- `npm run smoke:e2e`

## Known Constraint
- True external SMTP delivery verification requires runtime SMTP credentials (`STRAPI_SMTP_HOST`, `STRAPI_SMTP_PORT`, `STRAPI_SMTP_USER`, `STRAPI_SMTP_PASS`, plus sender/token env vars). The SMTP script enforces these requirements before execution.
