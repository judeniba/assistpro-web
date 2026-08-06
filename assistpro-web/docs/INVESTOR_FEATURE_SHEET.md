# AssistPro Investor Feature Sheet

## What Investors Can Do
- Apply to secure country rights for the AssistPro platform.
- Access a dedicated investor profile dashboard after account creation.
- Submit and update market details, budget range, and operating experience.
- Track application status through a clear lifecycle (submitted, under review, approved).

## Core Investor Journey
1. Click investor CTA on the home page.
2. Register a client account with investor intent.
3. Submit investor application profile.
4. Receive status updates managed by AssistPro admin.
5. Access investor dashboard to review and maintain profile details.

## Admin Review Controls
- View investor pipeline in the admin panel.
- Move applications between review statuses.
- Approve qualified investor applications.
- Maintain an auditable status history through profile timestamps.

## Platform and Notification Reliability
- Investor events can notify through:
  - Configured webhook delivery.
  - Strapi email plugin route.
  - Local log fallback when no external transport is configured.
- Smoke commands are available for local and SMTP-style notification validation.
- End-to-end smoke automation validates investor auth/profile/admin control paths.

## Included Security and Access Behavior
- Session-based authentication.
- Role-based access controls for admin-only actions.
- Protected admin routes and API endpoints.

## Validation Snapshot
- Web build and Strapi build successful.
- Automated tests passing.
- Notification smoke test passing.
- End-to-end investor workflow smoke test passing.
