# AssistPro Web - Deployment Guide

This guide provides comprehensive deployment recommendations for the AssistPro web landing page.

## Technology Stack

- **Framework**: Next.js 14.2.0
- **Runtime**: React 18.2.0
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Output**: Static Site Generation (SSG) / Server-Side Rendering (SSR)

---

## Recommended Deployment Options

### 🏆 Option 1: Vercel (Recommended - Best for Next.js)

**Why Vercel?**
- Built by the creators of Next.js
- Zero-configuration deployment
- Automatic HTTPS and global CDN
- Serverless functions support
- Free tier includes generous bandwidth
- Excellent performance optimizations
- Built-in preview deployments for PRs

**Deployment Steps:**

1. **Install Vercel CLI (optional)**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via GitHub Integration (Recommended)**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

**Configuration:**
- See `vercel.json` for custom configuration
- Environment variables can be set in Vercel dashboard
- Custom domain setup available in project settings

**Cost**: Free tier available, scales with usage

---

### 🚀 Option 2: Docker + Cloud Provider (AWS/GCP/Azure)

**Why Docker?**
- Platform independence
- Consistent environments
- Easy scaling with Kubernetes
- Full control over infrastructure

**Deployment Steps:**

1. **Build Docker Image**
   ```bash
   docker build -t assistpro-web .
   ```
   
   **For optimized standalone build (smaller image):**
   - Uncomment `output: 'standalone'` in `next.config.js`
   - Use: `docker build -f Dockerfile.standalone -t assistpro-web .`

2. **Run Locally**
   ```bash
   docker run -p 3000:3000 assistpro-web
   ```

3. **Or use Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Deploy to Cloud**
   
   **AWS ECS/Fargate:**
   ```bash
   # Push to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URI
   docker tag assistpro-web:latest YOUR_ECR_URI/assistpro-web:latest
   docker push YOUR_ECR_URI/assistpro-web:latest
   
   # Deploy via ECS Console or CLI
   ```

   **Google Cloud Run:**
   ```bash
   # Build and deploy
   gcloud builds submit --tag gcr.io/YOUR_PROJECT/assistpro-web
   gcloud run deploy assistpro-web --image gcr.io/YOUR_PROJECT/assistpro-web --platform managed
   ```

   **Azure Container Apps:**
   ```bash
   az containerapp up --name assistpro-web --source .
   ```

**Configuration:**
- See `Dockerfile` and `docker-compose.yml`
- Configure environment variables in your cloud provider console

**Cost**: Pay-as-you-go based on usage

---

### 🌐 Option 3: Netlify

**Why Netlify?**
- Simple deployment
- Great for static sites
- Built-in CDN
- Form handling and serverless functions
- Free tier available

**Deployment Steps:**

1. **Deploy via GitHub Integration**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`

2. **Deploy via CLI**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy --prod
   ```

**Configuration:**
- See `netlify.toml` for custom configuration
- Edge functions can be added if needed

**Cost**: Free tier available

---

### ⚡ Option 4: Static Export to Any Host

**Why Static Export?**
- Works with any hosting provider
- Lowest cost (can use AWS S3, Cloudflare Pages, GitHub Pages)
- Maximum performance
- Simple deployment

**Important Note**: Static export may limit some Next.js dynamic features. Review your usage of:
- Server-side rendering (SSR)
- API routes
- Image optimization

**Deployment Steps:**

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Build Static Export**
   ```bash
   npm run build
   ```
   This creates an `out` directory with static files.

3. **Deploy to Any Provider**

   **AWS S3 + CloudFront:**
   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

   **Cloudflare Pages:**
   ```bash
   npx wrangler pages publish out
   ```

   **GitHub Pages:**
   ```bash
   # Push the out directory to gh-pages branch
   npm install -g gh-pages
   gh-pages -d out
   ```

**Cost**: Very low (often < $1/month for S3)

---

### 🔄 Option 5: CI/CD with GitHub Actions

**Why GitHub Actions?**
- Automated deployments on push
- Run tests before deployment
- Multi-environment support (staging, production)
- Free for public repositories

**Setup:**
- See `.github/workflows/deploy.yml` for configuration
- Automatically deploys to Vercel/Netlify on push to main branch
- Runs build and tests on PRs

---

## Deployment Comparison Matrix

| Feature                | Vercel | Docker | Netlify | Static Export |
|------------------------|--------|--------|---------|---------------|
| Setup Complexity       | ⭐      | ⭐⭐⭐    | ⭐       | ⭐⭐            |
| Next.js Optimization   | ⭐⭐⭐    | ⭐⭐     | ⭐⭐      | ⭐⭐            |
| Cost (Small Traffic)   | Free   | $5-20  | Free    | $1-5          |
| Scalability            | ⭐⭐⭐    | ⭐⭐⭐    | ⭐⭐⭐     | ⭐⭐⭐           |
| Full SSR Support       | ✅      | ✅      | ✅       | ❌             |
| API Routes             | ✅      | ✅      | ✅       | ❌             |
| Custom Domain          | ✅      | ✅      | ✅       | ✅             |
| HTTPS by Default       | ✅      | ⚠️      | ✅       | ⚠️             |

**Legend**: ⭐ = Easy, ⭐⭐ = Medium, ⭐⭐⭐ = Advanced

---

## Our Recommendation

### 🎯 For This Project: **Vercel** (Option 1)

**Reasons:**
1. **Zero Configuration**: Vercel automatically detects and optimizes Next.js
2. **Cost Effective**: Free tier is generous for landing pages
3. **Performance**: Automatic global CDN and edge optimization
4. **Developer Experience**: Preview deployments for every PR
5. **Maintenance**: No infrastructure to manage
6. **Video Optimization**: Handles large video files efficiently with CDN

### Alternative: Docker (Option 2)

**Use Docker If:**
- You need full control over the hosting environment
- You're deploying to an existing Kubernetes cluster
- You have specific compliance requirements
- You want to self-host on your own infrastructure

---

## Pre-Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Test build locally: `npm run build`
- [ ] Test production mode: `npm start`
- [ ] Verify video loads correctly (check `public/videos/hero-arrival.mp4`)
- [ ] Update social media links in `components/TopRightSocialsAnimated.tsx`
- [ ] Add environment variables if needed
- [ ] Configure custom domain (if applicable)
- [ ] Set up analytics (Google Analytics, Vercel Analytics, etc.)
- [ ] Test on mobile devices
- [ ] Check SEO metadata in `app/layout.tsx`

---

## Environment Variables

If you need environment variables for APIs or configuration:

**Create `.env.local` (for local development):**
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

**For Production:**
- Vercel: Add in Project Settings → Environment Variables
- Docker: Use `docker-compose.yml` or cloud provider secrets
- Netlify: Add in Site Settings → Environment Variables

---

## Performance Optimization Tips

1. **Video Optimization**
   - Compress your hero video (recommended: < 5MB)
   - Consider using a video CDN for large files
   - Use WebM format for better compression (with MP4 fallback)

2. **Image Optimization**
   - Use Next.js `<Image>` component for automatic optimization
   - Serve images in modern formats (WebP, AVIF)

3. **Code Splitting**
   - Next.js does this automatically
   - Keep dependencies minimal

4. **Caching**
   - Leverage Vercel's CDN caching
   - Configure cache headers for static assets

---

## Monitoring and Analytics

**Recommended Tools:**
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and debugging

---

## Security Best Practices

1. Keep dependencies updated: `npm audit fix`
2. Use environment variables for secrets (never commit them)
3. Enable HTTPS (automatic with Vercel/Netlify)
4. Set up CSP headers if needed
5. Regular security audits

---

## Troubleshooting

**Build Fails:**
- Check Node.js version (recommend Node 18 LTS or higher)
- Clear cache: `rm -rf .next node_modules && npm install`

**Video Not Loading:**
- Verify video path: `public/videos/hero-arrival.mp4`
- Check video format (MP4 with H.264 codec recommended)
- Ensure video file is committed to git (not ignored)

**Deployment Slow:**
- Large video file? Consider hosting video separately (Cloudflare Stream, Vimeo, etc.)
- Use `.vercelignore` or `.dockerignore` to exclude unnecessary files

---

## Support and Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Need help?** Open an issue in the repository or consult the deployment provider's support.
