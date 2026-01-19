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

3) Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Social links
Edit links in: `components/TopRightSocialsAnimated.tsx`.

## Deployment

### Quick Deploy to Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/judeniba/assistpro-web)

1. Click the button above or visit [vercel.com](https://vercel.com)
2. Import the `judeniba/assistpro-web` repository
3. Vercel auto-detects Next.js and deploys automatically
4. Your site will be live in minutes!

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: One-click deploy from GitHub
- **Docker**: `docker build -t assistpro-web . && docker run -p 3000:3000 assistpro-web`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for all platforms.

## Build for production

```bash
npm run build
npm start
```

## Project Status
✅ Production ready
✅ All dependencies configured
✅ Docker support included
✅ TypeScript and ESLint configured

