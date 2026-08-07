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
1. Push this repository to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

The deployment will automatically:
- Install dependencies
- Build the project with `npm run build`
- Deploy to production

### Manual Deployment
```bash
npm install
npm run build
npm start
```

## Environment Variables
No environment variables required for basic deployment.

