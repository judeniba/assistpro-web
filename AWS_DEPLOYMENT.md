# AWS Deployment Guide for AssistPro Web

This guide covers multiple AWS deployment options for the AssistPro web application.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Docker installed (for containerized deployments)
- Node.js 18+ (for local development)

## Deployment Options

### Option 1: AWS Amplify (Recommended for Simplicity)

AWS Amplify provides the simplest deployment with automatic CI/CD.

#### Setup Steps:

1. **Login to AWS Console** and navigate to AWS Amplify

2. **Connect Repository**:
   - Click "New app" → "Host web app"
   - Choose GitHub and authorize AWS Amplify
   - Select the `assistpro-web` repository
   - Select the branch to deploy (e.g., `main`)

3. **Configure Build Settings**:
   - Amplify will auto-detect Next.js
   - The `amplify.yml` file in the root defines the build configuration
   - No additional configuration needed

4. **Environment Variables** (if needed):
   - Navigate to App settings → Environment variables
   - Add any required environment variables

5. **Deploy**:
   - Click "Save and deploy"
   - Amplify will automatically build and deploy your app
   - You'll get a URL like: `https://main.xxxxx.amplifyapp.com`

#### Custom Domain:
- Go to Domain management
- Add your custom domain
- Follow DNS configuration instructions

---

### Option 2: AWS ECS with Fargate (Recommended for Production)

ECS (Elastic Container Service) with Fargate provides scalable, serverless container orchestration.

#### Prerequisites:
- Docker installed locally
- AWS CLI configured with credentials

#### Setup Steps:

1. **Create ECR Repository**:
```bash
aws ecr create-repository \
  --repository-name assistpro-web \
  --region us-east-1
```

2. **Build and Push Docker Image**:
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build the image
docker build -t assistpro-web .

# Tag the image
docker tag assistpro-web:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/assistpro-web:latest

# Push to ECR
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/assistpro-web:latest
```

3. **Create ECS Cluster**:
```bash
aws ecs create-cluster --cluster-name assistpro-cluster --region us-east-1
```

4. **Create CloudWatch Log Group**:
```bash
aws logs create-log-group --log-group-name /ecs/assistpro-web --region us-east-1
```

5. **Register Task Definition**:
```bash
# Update the task definition with your ECR image URI
# Edit aws/task-definition.json and replace <IMAGE_URI> with your image

aws ecs register-task-definition \
  --cli-input-json file://aws/task-definition.json \
  --region us-east-1
```

6. **Create ECS Service**:
```bash
aws ecs create-service \
  --cluster assistpro-cluster \
  --service-name assistpro-web-service \
  --task-definition assistpro-web \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --region us-east-1
```

Note: Replace `subnet-xxxxx` and `sg-xxxxx` with your VPC subnet and security group IDs.

7. **Configure Load Balancer** (Optional but recommended):
   - Create an Application Load Balancer in the same VPC
   - Create a target group for port 3000
   - Update the ECS service to use the load balancer

#### GitHub Actions CI/CD:

The `.github/workflows/deploy-aws.yml` file provides automated deployment.

**Setup**:
1. Create an IAM role with permissions for ECR and ECS
2. Configure GitHub OIDC provider in AWS
3. Add GitHub secrets:
   - `AWS_ROLE_ARN`: ARN of the IAM role for GitHub Actions

The workflow will automatically:
- Build the Docker image
- Push to ECR
- Update ECS task definition
- Deploy to ECS service

---

### Option 3: AWS Elastic Beanstalk

Elastic Beanstalk provides managed infrastructure with auto-scaling.

#### Setup Steps:

1. **Install EB CLI**:
```bash
pip install awsebcli
```

2. **Initialize Elastic Beanstalk**:
```bash
eb init -p docker assistpro-web --region us-east-1
```

3. **Create Environment**:
```bash
eb create assistpro-web-prod
```

4. **Deploy**:
```bash
eb deploy
```

5. **Open Application**:
```bash
eb open
```

The `Dockerrun.aws.json` file configures how Elastic Beanstalk runs your Docker container.

#### Updates:
```bash
# After making changes
eb deploy
```

---

### Option 4: AWS EC2 (Manual Setup)

For direct control over the infrastructure.

#### Setup Steps:

1. **Launch EC2 Instance**:
   - Choose Amazon Linux 2 AMI
   - t3.micro or larger
   - Configure security group to allow ports 22 (SSH) and 80 (HTTP)

2. **Connect to Instance**:
```bash
ssh -i your-key.pem ec2-user@<instance-public-ip>
```

3. **Install Dependencies**:
```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

4. **Clone Repository**:
```bash
git clone https://github.com/judeniba/assistpro-web.git
cd assistpro-web
```

5. **Run with Docker Compose**:
```bash
docker-compose up -d
```

6. **Configure Nginx Reverse Proxy** (Optional):
```bash
sudo yum install nginx -y
```

Create `/etc/nginx/conf.d/assistpro.conf`:
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

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Cost Estimates

| Service | Monthly Cost (Estimate) |
|---------|------------------------|
| AWS Amplify | $5-15 (includes hosting + build minutes) |
| ECS Fargate (1 task) | $15-30 |
| Elastic Beanstalk | $20-40 (includes EC2 instance) |
| EC2 t3.micro | $10-15 (compute only) |

*Costs are approximate and vary by region and usage*

---

## Environment Variables

If your application requires environment variables, add them through:

- **Amplify**: App Settings → Environment variables
- **ECS**: Update task definition with environment variables
- **Elastic Beanstalk**: `eb setenv KEY=value`
- **EC2**: Add to docker-compose.yml or use .env file

---

## Monitoring and Logs

### CloudWatch Logs:
- **ECS**: Logs automatically sent to `/ecs/assistpro-web`
- **Elastic Beanstalk**: Accessible via `eb logs`
- **EC2**: Use `docker logs` or configure CloudWatch agent

### Health Checks:
- Configure health check endpoint in your load balancer
- Default Next.js health check: `http://your-app/`

---

## Scaling

### Amplify:
- Auto-scales automatically

### ECS:
```bash
aws ecs update-service \
  --cluster assistpro-cluster \
  --service assistpro-web-service \
  --desired-count 3
```

### Elastic Beanstalk:
```bash
eb scale 3
```

---

## SSL/HTTPS

### Amplify:
- Automatic SSL with custom domains

### ECS with ALB:
1. Request certificate in AWS Certificate Manager
2. Add HTTPS listener to ALB
3. Associate certificate

### Elastic Beanstalk:
```bash
eb config
# Add SSL certificate ARN in configuration
```

---

## Troubleshooting

### Build Failures:
- Check build logs in AWS console
- Verify Node.js version compatibility
- Ensure all dependencies are in package.json

### Container Issues:
```bash
# Test locally first
docker build -t assistpro-web .
docker run -p 3000:3000 assistpro-web
```

### ECS Task Not Starting:
- Check CloudWatch logs
- Verify security group allows traffic
- Ensure ECR image is accessible

---

## Support

For AWS-specific issues, refer to:
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elastic-beanstalk/)

For application issues, contact: seaointeralia@gmail.com
