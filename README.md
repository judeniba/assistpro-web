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

### 🚀 AWS Deployment (Multiple Options)

This project is fully configured for AWS deployment with multiple options:

- **[Quick Start Guide](./QUICKSTART_AWS.md)** - Get started in 5 minutes
- **[Detailed AWS Guide](./AWS_DEPLOYMENT.md)** - Complete instructions for all AWS services
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist for any deployment

**Available AWS deployment methods:**
1. **AWS Amplify** - Simplest, automatic CI/CD (5 min)
2. **AWS ECS with Fargate** - Production-ready, scalable (30 min)
3. **AWS Elastic Beanstalk** - Managed platform (15 min)
4. **AWS EC2** - Full control (20 min)

### 🐳 Docker Deployment

```bash
# Build
docker build -t assistpro-web .

# Run
docker run -p 3000:3000 assistpro-web

# Or use Docker Compose
docker-compose up
```

### Vercel (Alternative)
- Import the repo in Vercel
- Framework: Next.js
- Build: `npm run build`

## CI/CD

GitHub Actions workflow included for automatic deployment to AWS ECS:
- See `.github/workflows/deploy-aws.yml`
- Configure AWS credentials as GitHub secrets
- Push to main branch to trigger deployment

## Project Structure

```
assistpro-web/
├── app/                    # Next.js app directory
├── components/             # React components
├── public/                 # Static assets
├── aws/                    # AWS deployment configs
├── scripts/                # Deployment scripts
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Local Docker setup
├── amplify.yml             # AWS Amplify config
├── Dockerrun.aws.json      # Elastic Beanstalk config
└── AWS_DEPLOYMENT.md       # Detailed deployment guide
```

