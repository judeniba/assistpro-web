# Quick Start - AWS Deployment

This guide will help you deploy AssistPro Web to AWS in minutes.

## Choose Your Deployment Method

### 🚀 Fastest: AWS Amplify (5 minutes)

**Best for**: Quick deployments, automatic CI/CD, minimal configuration

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository: `judeniba/assistpro-web`
4. Select branch (usually `main`)
5. Click "Save and deploy"

✅ Done! Your app will be live at `https://xxxxx.amplifyapp.com`

**Custom Domain**: Go to Domain management → Add domain

---

### 🐳 Most Flexible: Docker on ECS (30 minutes)

**Best for**: Production deployments, scalability, container control

**Prerequisites**: AWS CLI and Docker installed

#### Quick Setup:

```bash
# 1. Setup AWS infrastructure
./scripts/setup-aws.sh

# 2. Build and push to ECR
./scripts/deploy-ecr.sh

# 3. Get your image URI (from step 2 output)
# Update aws/task-definition.json with your ECR URI

# 4. Register task definition
aws ecs register-task-definition \
  --cli-input-json file://aws/task-definition.json

# 5. Create ECS service (replace subnet and security group IDs)
aws ecs create-service \
  --cluster assistpro-cluster \
  --service-name assistpro-web-service \
  --task-definition assistpro-web \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}"
```

**Find your subnet/security group IDs**:
- Go to VPC Console → Subnets (copy a subnet ID)
- Go to VPC Console → Security Groups (copy the default security group)
- Edit security group to allow inbound traffic on port 3000

---

### 📦 Easiest: Elastic Beanstalk (15 minutes)

**Best for**: Managed infrastructure, auto-scaling

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p docker assistpro-web --region us-east-1

# Create and deploy
eb create assistpro-web-prod

# Open in browser
eb open
```

---

### 💻 Full Control: EC2 (20 minutes)

**Best for**: Complete control, custom configurations

1. Launch EC2 instance (Amazon Linux 2, t3.micro or larger)
2. Configure security group: Allow ports 22 (SSH) and 80 (HTTP)
3. Connect via SSH:
```bash
ssh -i your-key.pem ec2-user@<instance-ip>
```

4. Install Docker:
```bash
sudo yum update -y
sudo yum install docker git -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

5. Clone and run:
```bash
git clone https://github.com/judeniba/assistpro-web.git
cd assistpro-web
docker-compose up -d
```

Access at: `http://<instance-ip>:3000`

---

## Local Testing

Before deploying to AWS, test locally:

```bash
# With Docker
docker build -t assistpro-web .
docker run -p 3000:3000 assistpro-web

# Or with Docker Compose
docker-compose up

# Or without Docker
npm install
npm run build
npm start
```

Open http://localhost:3000

---

## GitHub Actions Auto-Deploy

For automatic deployments on git push:

1. **Create IAM Role** with ECR and ECS permissions
2. **Configure GitHub OIDC** in AWS
3. **Add GitHub Secret**: `AWS_ROLE_ARN`
4. **Push to main branch** → Auto-deploy!

See `.github/workflows/deploy-aws.yml`

---

## Cost Comparison

| Method | Est. Monthly Cost |
|--------|------------------|
| Amplify | $5-15 |
| ECS Fargate | $15-30 |
| Elastic Beanstalk | $20-40 |
| EC2 t3.micro | $10-15 |

---

## Troubleshooting

**Build fails**: 
```bash
npm install
npm run build
```

**Docker build fails**:
```bash
docker build -t assistpro-web . --no-cache
```

**Need help?** See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md) for detailed instructions.

---

## Next Steps

After deployment:
- ✅ Add custom domain
- ✅ Configure SSL/HTTPS
- ✅ Set up monitoring (CloudWatch)
- ✅ Configure auto-scaling
- ✅ Add environment variables (if needed)
