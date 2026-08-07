# Deployment Guide for AssistPro Web

## Overview
AssistPro Web is now ready for deployment! This guide provides instructions for deploying to various platforms.

## Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git

## Project Status
✅ Build verified and working
✅ All dependencies installed
✅ Deployment configurations added
✅ TypeScript and ESLint configured

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform for Next.js applications and offers the simplest deployment process.

#### Steps:
1. Visit [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Import the `judeniba/assistpro-web` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

That's it! Vercel will:
- Automatically install dependencies
- Build your application
- Deploy to production
- Provide a production URL (e.g., `assistpro-web.vercel.app`)
- Set up automatic deployments for every push to main branch

#### Custom Domain (Optional):
- Go to your project settings in Vercel
- Navigate to "Domains"
- Add your custom domain (e.g., `assistpro.com`)
- Follow DNS configuration instructions

### Option 2: Netlify

1. Visit [netlify.com](https://netlify.com)
2. Sign up or log in
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select `judeniba/assistpro-web`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Option 3: Railway

1. Visit [railway.app](https://railway.app)
2. Sign up or log in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `judeniba/assistpro-web`
5. Railway will auto-detect Next.js and deploy

### Option 4: Docker Deployment

A Dockerfile is available for container-based deployments:

```bash
# Build the image
docker build -t assistpro-web .

# Run the container
docker run -p 3000:3000 assistpro-web
```

Deploy to:
- Google Cloud Run
- AWS ECS
- Azure Container Apps
- DigitalOcean App Platform

### Option 5: Traditional VPS/Server

For deployment on a VPS (Ubuntu/Debian):

```bash
# SSH into your server
ssh user@your-server.com

# Clone the repository
git clone https://github.com/judeniba/assistpro-web.git
cd assistpro-web

# Install dependencies
npm install

# Build the application
npm run build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "assistpro-web" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

Configure Nginx as a reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

Currently, no environment variables are required for the basic setup. If you add features like analytics or payment processing, you can set them in your deployment platform:

### Vercel:
- Project Settings → Environment Variables

### Netlify:
- Site Settings → Build & Deploy → Environment Variables

### Railway:
- Project → Variables tab

## Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads correctly
- [ ] Hero video plays properly
- [ ] All sections render correctly
- [ ] Social media links work (update in `components/TopRightSocialsAnimated.tsx`)
- [ ] Navigation links work
- [ ] Contact forms/emails work
- [ ] Mobile responsiveness
- [ ] SSL certificate is active (https://)

## Updating Content

### Social Media Links
Edit `components/TopRightSocialsAnimated.tsx` to update social media icons and links.

### Hero Video
Replace `public/videos/hero-arrival.mp4` with your custom video.

### Contact Email
Update email addresses in:
- `app/page.tsx` (line 303): Partner inquiry email
- `app/page.tsx` (line 325): Provider verification email

## Continuous Deployment

Once set up with Vercel, Netlify, or Railway:
- Every push to the main branch automatically triggers a new deployment
- Pull requests get preview deployments
- Rollback to previous versions is instant

## Performance Optimization

The build is already optimized, but for additional performance:
1. Compress video files (keep under 5MB for faster loading)
2. Enable CDN caching in your deployment platform
3. Monitor Core Web Vitals in production

## Support & Monitoring

Consider adding:
- **Analytics**: Google Analytics, Vercel Analytics, or Plausible
- **Error Tracking**: Sentry
- **Uptime Monitoring**: UptimeRobot or Pingdom

## Cost Estimates

- **Vercel**: Free tier includes hobby projects with good limits
- **Netlify**: Free tier with 100GB bandwidth/month
- **Railway**: $5/month starting tier
- **VPS**: $5-10/month (DigitalOcean, Linode, Vultr)

## Troubleshooting

### Build fails
- Check Node.js version (18.x or higher)
- Clear cache: `rm -rf .next node_modules && npm install`

### Video doesn't play
- Ensure video is in MP4 format
- Check file path is correct
- Verify video file size (keep under 10MB)

### Styles not loading
- Clear browser cache
- Check build output for CSS warnings
- Verify all dependencies are installed

## Next Steps

After deployment:
1. Update social media links
2. Add custom domain
3. Configure SSL/HTTPS
4. Set up email functionality
5. Add analytics tracking
6. Submit sitemap to search engines

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Current Status**: ✅ Ready to deploy
**Build Status**: ✅ Passing
**Dependencies**: ✅ All installed
**Configuration**: ✅ Complete
