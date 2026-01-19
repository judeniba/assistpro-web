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
1. Visit [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import this repository (`judeniba/assistpro-web`)
4. Vercel will automatically detect Next.js settings from `vercel.json`
5. Click "Deploy"
6. Your site will be live in minutes at `https://your-project.vercel.app`

### Other Platforms
The project includes:
- `vercel.json` - Vercel configuration
- `.gitignore` - Prevents committing build artifacts
- TypeScript support with `tsconfig.json`
- Build command: `npm run build`
- Start command: `npm start`

### Build Verification
```bash
npm run build
```

The build should complete successfully with static page generation.

