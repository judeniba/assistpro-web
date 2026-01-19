# AssistPro Web (Landing Page)

[![Deployment Ready](https://img.shields.io/badge/deployment-ready-brightgreen)]() [![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black)]() [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)]()

Luxury landing page for **AssistPro** with:
- Full-screen hero **video background**
- Top-right social icons with **subtle animation** synced to video readiness (`onCanPlay`)
- Black + **luxury fashion gold** styling
- Sections: precision strip, services, download, partnerships, providers

## ✅ Deployment Status

**This project is ready for deployment!**

- ✅ TypeScript configured and type-checked
- ✅ Build passes successfully (`npm run build`)
- ✅ Linting passes with no errors (`npm run lint`)
- ✅ No security vulnerabilities
- ✅ Vercel deployment configuration included
- ✅ Environment variables documented

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

### ⚠️ Before Production Deployment

Update these placeholder values:
1. Social media links in `components/TopRightSocialsAnimated.tsx`
2. App Store/Play Store links in `app/page.tsx`
3. Create legal pages (Privacy Policy, Terms, Provider Standards)

## Quick Start

### 1) Install dependencies
```bash
npm install
```

### 2) Hero video
- Video already included at: `public/videos/hero-arrival.mp4`
- Or replace with your own MP4
- Update path in `app/page.tsx` if needed

### 3) Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4) Build for production
```bash
npm run build
npm start
```

## Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

### Social Links
Edit links in: `components/TopRightSocialsAnimated.tsx`

## Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import repository in Vercel
3. Framework is auto-detected as Next.js
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Technology Stack

- **Framework**: Next.js 15.5.9
- **Language**: TypeScript 5.9.3
- **Styling**: CSS-in-JS (native CSS variables)
- **Animations**: Framer Motion 11.x
- **Runtime**: React 18.2

## Project Structure

```
assistpro-web/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   └── TopRightSocialsAnimated.tsx
├── public/
│   └── videos/           # Video assets
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── DEPLOYMENT.md        # Deployment guide
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── vercel.json         # Vercel deployment config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2026 AssistPro. All rights reserved.

