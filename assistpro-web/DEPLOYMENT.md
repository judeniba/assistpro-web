# Deployment Guide

This guide covers deploying AssistPro Web to various platforms.

## Prerequisites

Before deploying, ensure:
- ✅ All tests pass (`npm test`)
- ✅ Linting passes (`npm run lint`)
- ✅ Build succeeds (`npm run build`)
- ✅ Environment variables configured
- ✅ Hero video file added to `public/videos/`

## Vercel (Recommended)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/judeniba/assistpro-web)

### Manual Deploy

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Set Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_API_URL`
   - Add any other variables from `.env.example`

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - You'll get a production URL

### Vercel CLI Deployment

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**
   Add in Netlify Dashboard → Site settings → Environment variables

4. **Deploy**
   - Netlify will auto-deploy on push to main

## Custom Server / VPS

### Using PM2

1. **Install dependencies**
   ```bash
   npm install
   npm run build
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Create ecosystem.config.js**
   ```javascript
   module.exports = {
     apps: [{
       name: 'assistpro-web',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Using Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and run**
   ```bash
   docker build -t assistpro-web .
   docker run -p 3000:3000 assistpro-web
   ```

## AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect GitHub repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add in Amplify Console → App settings → Environment variables

4. **Deploy**
   - Amplify will auto-deploy

## Environment Variables

Ensure these are set in your deployment platform:

### Required
- `NEXT_PUBLIC_SITE_URL` - Your production URL

### Optional
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID
- `NEXT_PUBLIC_API_URL` - Backend API URL
- Social media URLs (if overriding defaults)

### Server-side only (never expose to client)
- `STRIPE_SECRET_KEY`
- `FLUTTERWAVE_SECRET_KEY`

## Post-Deployment Checklist

After deploying:

- [ ] Visit your site and verify it loads
- [ ] Check video playback works
- [ ] Test all navigation links
- [ ] Verify social media links work
- [ ] Check mobile responsiveness
- [ ] Test 404 page (visit non-existent route)
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt is accessible
- [ ] Run Lighthouse audit
- [ ] Verify analytics tracking (if configured)
- [ ] Test error boundaries (trigger an error)

## SSL/HTTPS

### Vercel/Netlify
- Automatic SSL provided
- Custom domains get free SSL

### Custom Server
Use Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Performance Optimization

### Vercel Edge Network
- Static pages cached globally
- Image optimization automatic
- Smart CDN routing

### Manual Optimization
1. Enable gzip/brotli compression
2. Set up CDN for static assets
3. Configure caching headers
4. Use image optimization service

## Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Real-time performance metrics
- Web Vitals tracking

### Google Analytics
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Verify tracking in GA dashboard

### Error Tracking
Consider adding:
- Sentry
- LogRocket
- Bugsnag

## Rollback

### Vercel
- Go to Deployments tab
- Click "..." on previous deployment
- Click "Promote to Production"

### Netlify
- Go to Deploys tab
- Click "..." on previous deployment
- Click "Publish deploy"

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Video Not Playing
- Ensure video file is in `public/videos/`
- Check video file size (optimize if >50MB)
- Verify video codec (H.264 recommended)

### Environment Variables Not Working
- Ensure they're prefixed with `NEXT_PUBLIC_` for client-side
- Restart deployment after adding variables
- Check variable names match exactly

## Support

For deployment issues:
- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Contact: seaointeralia@gmail.com
