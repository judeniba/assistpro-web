# AssistPro Web (Landing Page)

Luxury landing page for **AssistPro** with:
- Full-screen hero **video background**
- Top-right social icons with **subtle animation** synced to video readiness (`onCanPlay`)
- Black + **luxury fashion gold** styling
- Sections: precision strip, services, download, partnerships, providers

## Quick start

1) Install dependencies
```bash
npm install
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

## Deploy

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/judeniba/assistpro-web)

1. Click the button above or import the repo in Vercel
2. Framework: Next.js (auto-detected)
3. Build command: `npm run build` (configured automatically)
4. Deploy!

The project is configured with `vercel.json` for optimal deployment settings.

### Manual Build
```bash
npm run build
npm run start
```

