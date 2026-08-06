# AssistPro Web (Landing Page)

Luxury landing page for **AssistPro** with:
- Full-screen hero **video background**
- Top-right social icons with **subtle animation** synced to video readiness (`onCanPlay`)
- Black + **luxury fashion gold** styling
- Sections: precision strip, services, download, partnerships, providers

## Quick start

1) Install dependencies
```bash
npm install --legacy-peer-deps
```

2) Add your hero video
- Put your MP4 at: `public/videos/hero-arrival.mp4`
- Or change the path in `app/page.tsx`.

3) Run
```bash
npm run dev
```

## Social links
Edit links in: `components/TopRightSocialsAnimated.tsx`.

## Deploy (Vercel)
- Import the repo in Vercel
- Framework: Next.js
- Build: `npm run build`

## Strapi setup
To run the app against a local Strapi CMS, start the local stack first:

```bash
docker compose up -d postgres strapi
cd strapi
npm install
npm run develop
```

Then create an admin user in the Strapi admin UI at http://localhost:1337/admin, create the content types described in STRAPI_CONTENT_TYPES.md, and create a token in Settings -> API Tokens.

Add these environment variables before running the Next.js app:

```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=replace-with-your-strapi-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If you leave these unset, the app will continue to use its built-in local demo data.

Investor profiles can also be backed by Strapi by creating the `investor-profiles` collection type described in `STRAPI_CONTENT_TYPES.md`. The web app will read and update investor applications there when Strapi is enabled.

## Investor notifications

Investor submissions, profile updates, and admin status changes support notifications through either a generic webhook or Strapi email plugin.

```bash
NOTIFICATION_EMAIL_TO=investments@assistpro.com
NOTIFICATION_EMAIL_WEBHOOK_URL=https://your-mailer.example/send
STRAPI_NOTIFICATION_EMAIL_TO=investments@assistpro.com
STRAPI_NOTIFICATION_TOKEN=replace-with-a-long-random-token
STRAPI_EMAIL_FROM=noreply@assistpro.com
STRAPI_EMAIL_REPLY_TO=investments@assistpro.com
STRAPI_SMTP_HOST=smtp.example.com
STRAPI_SMTP_PORT=587
STRAPI_SMTP_SECURE=false
STRAPI_SMTP_USER=your-smtp-user
STRAPI_SMTP_PASS=your-smtp-password
```

- `NOTIFICATION_EMAIL_WEBHOOK_URL`: POSTs `{ to, subject, text }` JSON to your mailer service.
- `STRAPI_NOTIFICATION_EMAIL_TO`: if set with Strapi enabled, the app attempts to send through Strapi's email plugin before falling back to local logging.
- `STRAPI_NOTIFICATION_TOKEN`: shared bearer token used by the Next.js app when calling Strapi's custom notification route.
- `STRAPI_EMAIL_FROM` and `STRAPI_EMAIL_REPLY_TO`: default sender settings used by the Strapi email plugin.
- SMTP delivery is configured through Strapi using the nodemailer provider (`STRAPI_SMTP_*` variables).
- If no notification transport is configured, messages are written to `data/notifications.log`.

### .env templates

- Copy `.env.example` to `.env.local` in the Next.js app root.
- Copy `strapi/.env.example` to `strapi/.env` for the Strapi app.

### Smoke test notification endpoint

One-command smoke test:

```bash
npm run smoke:notification
```

This command starts Postgres if needed, launches Strapi with test env values, calls `/api/notification/send`, verifies a `200` response, then shuts Strapi down.

Real SMTP smoke test (no stream transport):

```bash
STRAPI_SMTP_HOST=smtp.example.com \
STRAPI_SMTP_PORT=587 \
STRAPI_SMTP_USER=your-smtp-user \
STRAPI_SMTP_PASS=your-smtp-password \
STRAPI_EMAIL_FROM=noreply@assistpro.com \
STRAPI_EMAIL_REPLY_TO=investments@assistpro.com \
STRAPI_NOTIFICATION_TOKEN=replace-with-a-long-random-token \
npm run smoke:notification:smtp
```

The SMTP smoke-test command validates required env vars, starts Strapi without stream transport, calls `/api/notification/send`, verifies `200`, and shuts Strapi down.

### End-to-end smoke test

Run a full one-command app smoke test:

```bash
npm run smoke:e2e
```

This command validates all of the following in one pass:
- Next.js production build.
- Public route availability.
- Investor-auth registration/login/logout flow.
- Investor profile update and retrieval.
- Admin access controls for non-admin users.

The script uses a temporary test account and restores `data/store.json` at the end so repeated runs do not leave committed fixture noise.

Run Strapi with local stream transport (no external SMTP needed), then call the endpoint:

```bash
cd strapi
STRAPI_SMTP_STREAM_TRANSPORT=true STRAPI_NOTIFICATION_TOKEN=dev-notify-token npm run develop
```

In another terminal:

```bash
curl -X POST http://127.0.0.1:1337/api/notification/send \
	-H "Authorization: Bearer dev-notify-token" \
	-H "Content-Type: application/json" \
	-d '{"to":"investments@example.com","subject":"AssistPro smoke test","text":"Investor notification path is working."}'
```

Expected response:

```json
{"ok":true}
```

## Stripe setup
To enable real Stripe checkout and webhook updates, add these environment variables before running the app:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK_STRIPE=true
```

Then configure Stripe to send checkout session events to:

```text
/api/stripe/webhook
```

The webhook should listen for at least these events:
- checkout.session.completed

