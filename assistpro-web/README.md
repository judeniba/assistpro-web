# AssistPro Web (Landing Page)

Luxury landing page for **AssistPro** with:
- Full-screen hero **video background**
- Top-right social icons with **subtle animation** synced to video readiness (`onCanPlay`)
- Black + **luxury fashion gold** styling
- Sections: precision strip, services, download, partnerships, providers
- **Production-ready** with TypeScript, testing, linting, and CI/CD

## 🚀 Quick Start

1) **Install dependencies**
```bash
npm install
```

2) **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your configuration (API keys, analytics IDs, etc.)

3) **Add your hero video**
- Put your MP4 at: `public/videos/hero-arrival.mp4`
- Or change the path in `app/page.tsx`

4) **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## ✨ Features

### Core Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Framer Motion** for smooth animations
- **Responsive design** with mobile-first approach
- **SEO optimized** with metadata and Open Graph tags

### Production-Ready
- ✅ **Error Boundaries** - Custom error and 404 pages
- ✅ **Loading States** - Loading UI for better UX
- ✅ **Analytics** - Google Analytics integration with Web Vitals
- ✅ **Security Headers** - CSP, X-Frame-Options, and more
- ✅ **Sitemap & Robots** - SEO-friendly crawling
- ✅ **Testing** - Jest + React Testing Library
- ✅ **Linting** - ESLint with Next.js config
- ✅ **Formatting** - Prettier for consistent code style
- ✅ **CI/CD** - GitHub Actions workflow

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables. Key variables:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL for SEO
- `NEXT_PUBLIC_API_URL` - API endpoint (when backend is ready)
- Social media URLs
- Payment gateway keys (server-side only)

### Customization

- **Social links**: Edit `components/TopRightSocialsAnimated.tsx`
- **Services**: Edit services array in `app/page.tsx`
- **Styling**: Edit `app/globals.css` for global styles
- **Colors**: Modify CSS variables in `globals.css`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Tests are located in `__tests__` directories next to the components they test.

## 🚢 Deploy (Vercel)

1. Import the repo in Vercel
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Add environment variables in Vercel dashboard
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/judeniba/assistpro-web)

## 📁 Project Structure

```
assistpro-web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # 404 page
│   ├── loading.tsx          # Loading UI
│   ├── sitemap.ts           # Dynamic sitemap
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Analytics.tsx        # Analytics integration
│   ├── TopRightSocialsAnimated.tsx
│   └── __tests__/          # Component tests
├── lib/                     # Utility functions
│   └── analytics.ts         # Analytics utilities
├── public/                  # Static assets
│   ├── videos/             # Video files
│   └── robots.txt          # Robots.txt for SEO
├── .github/workflows/      # GitHub Actions
│   └── ci.yml              # CI/CD pipeline
├── .env.example            # Environment variables template
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore rules
├── jest.config.cjs         # Jest configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── CONTRIBUTING.md         # Contribution guidelines
└── package.json            # Dependencies and scripts
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## 📄 License

All rights reserved © AssistPro

## 📞 Contact

- Admin: seaointeralia@gmail.com
- Instagram: [@assistpro](https://instagram.com/assistpro)
- LinkedIn: [AssistPro](https://linkedin.com/company/assistpro)
