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
⚠️ **Note**: The social media links in `components/TopRightSocialsAnimated.tsx` are currently placeholders. Update them with your actual AssistPro social media URLs before deployment.

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your `assistpro-web` repository
4. Vercel will automatically detect Next.js and configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Configuration
The project includes:
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files excluded from deployment
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration

All settings are pre-configured for optimal Vercel deployment.

