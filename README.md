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

### Vercel (Quick Deploy)
- Import the repo in Vercel
- Framework: Next.js
- Build: `npm run build`

### AWS (Production)
Multiple AWS deployment options available:
- **AWS Amplify** - Simplest, automatic CI/CD
- **AWS ECS with Fargate** - Scalable container orchestration
- **AWS Elastic Beanstalk** - Managed platform
- **AWS EC2** - Direct control

See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md) for detailed instructions.

### Docker (Local/Any Platform)
```bash
# Build
docker build -t assistpro-web .

# Run
docker run -p 3000:3000 assistpro-web

# Or use Docker Compose
docker-compose up
```

