# AWS Deployment Checklist

Use this checklist to ensure a smooth deployment to AWS.

## Pre-Deployment Checklist

### ✅ Repository Setup
- [ ] Code is committed and pushed to GitHub
- [ ] All dependencies are listed in `package.json`
- [ ] Build works locally: `npm run build`
- [ ] Application runs locally: `npm start`

### ✅ AWS Account Setup
- [ ] AWS Account created
- [ ] Billing alerts configured
- [ ] IAM user created with appropriate permissions
- [ ] AWS CLI installed and configured: `aws configure`

### ✅ Domain & SSL (Optional)
- [ ] Domain name purchased (if using custom domain)
- [ ] Domain DNS accessible
- [ ] SSL certificate ready (AWS Certificate Manager can provide free certificates)

---

## Deployment Method Selection

Choose ONE of the following methods:

### Option A: AWS Amplify (Recommended for beginners)
- [ ] Navigate to AWS Amplify Console
- [ ] Connect GitHub repository
- [ ] Select branch to deploy
- [ ] Review and confirm build settings
- [ ] Deploy
- [ ] (Optional) Add custom domain

**Estimated Time**: 5-10 minutes  
**Skill Level**: Beginner  
**Cost**: ~$5-15/month

---

### Option B: AWS ECS with Fargate (Recommended for production)

#### Infrastructure Setup
- [ ] Install Docker locally
- [ ] Run: `./scripts/setup-aws.sh`
- [ ] Verify ECR repository created
- [ ] Verify ECS cluster created
- [ ] Verify CloudWatch log group created

#### Docker Image
- [ ] Run: `./scripts/deploy-ecr.sh`
- [ ] Verify image pushed to ECR
- [ ] Copy ECR image URI from output
- [ ] Update `aws/task-definition.json` with image URI

#### ECS Configuration
- [ ] Get VPC subnet ID (VPC Console → Subnets)
- [ ] Get security group ID (VPC Console → Security Groups)
- [ ] Edit security group: Allow inbound on port 3000
- [ ] Register task definition: `aws ecs register-task-definition --cli-input-json file://aws/task-definition.json`
- [ ] Create ECS service with network configuration
- [ ] Verify service is running

#### Load Balancer (Recommended)
- [ ] Create Application Load Balancer
- [ ] Create target group (port 3000)
- [ ] Update ECS service to use ALB
- [ ] Configure health checks
- [ ] (Optional) Add SSL certificate

**Estimated Time**: 30-45 minutes  
**Skill Level**: Intermediate  
**Cost**: ~$15-30/month

---

### Option C: AWS Elastic Beanstalk

- [ ] Install EB CLI: `pip install awsebcli`
- [ ] Initialize: `eb init -p docker assistpro-web --region us-east-1`
- [ ] Create environment: `eb create assistpro-web-prod`
- [ ] Wait for deployment to complete
- [ ] Open application: `eb open`
- [ ] (Optional) Configure custom domain
- [ ] (Optional) Enable HTTPS

**Estimated Time**: 15-20 minutes  
**Skill Level**: Beginner-Intermediate  
**Cost**: ~$20-40/month

---

### Option D: AWS EC2

#### Launch Instance
- [ ] Launch EC2 instance (Amazon Linux 2)
- [ ] Choose instance type (t3.micro or larger)
- [ ] Create or select key pair
- [ ] Configure security group (ports 22, 80, 443)
- [ ] Launch instance
- [ ] Note public IP address

#### Setup Server
- [ ] Connect via SSH: `ssh -i your-key.pem ec2-user@<public-ip>`
- [ ] Update system: `sudo yum update -y`
- [ ] Install Docker: `sudo yum install docker git -y`
- [ ] Start Docker: `sudo service docker start`
- [ ] Add user to docker group: `sudo usermod -a -G docker ec2-user`
- [ ] Logout and login again

#### Deploy Application
- [ ] Clone repository
- [ ] Run: `docker-compose up -d`
- [ ] Verify application is running: `curl localhost:3000`
- [ ] Access via browser: `http://<public-ip>:3000`

#### (Optional) Setup Nginx
- [ ] Install Nginx
- [ ] Configure reverse proxy
- [ ] Install Certbot for SSL
- [ ] Configure auto-renewal

**Estimated Time**: 20-30 minutes  
**Skill Level**: Intermediate-Advanced  
**Cost**: ~$10-15/month

---

## Post-Deployment Checklist

### ✅ Verification
- [ ] Application is accessible via URL
- [ ] All pages load correctly
- [ ] Hero video plays properly
- [ ] Links work as expected
- [ ] Mobile responsiveness verified
- [ ] Social media links work

### ✅ Performance
- [ ] Page load time is acceptable
- [ ] Video loads without errors
- [ ] No console errors in browser

### ✅ Monitoring
- [ ] CloudWatch logs are working
- [ ] Error tracking is configured
- [ ] Uptime monitoring set up (optional)

### ✅ Security
- [ ] HTTPS enabled (for production)
- [ ] Security groups properly configured
- [ ] No sensitive data exposed in logs
- [ ] Environment variables secured

### ✅ Domain & SSL (if applicable)
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Certificate auto-renewal configured

### ✅ Cost Management
- [ ] Billing alerts configured
- [ ] Budget limits set
- [ ] Cost Explorer reviewed
- [ ] Unused resources identified

---

## Continuous Deployment (Optional)

### GitHub Actions Setup
- [ ] Create IAM role for GitHub Actions
- [ ] Configure OIDC provider in AWS
- [ ] Add `AWS_ROLE_ARN` to GitHub secrets
- [ ] Update workflow file with correct values
- [ ] Test by pushing to main branch
- [ ] Verify automatic deployment

---

## Rollback Plan

In case something goes wrong:

### Amplify
- [ ] Revert to previous deployment in Amplify Console

### ECS
```bash
# Update to previous task definition revision
aws ecs update-service \
  --cluster assistpro-cluster \
  --service assistpro-web-service \
  --task-definition assistpro-web:PREVIOUS_REVISION
```

### Elastic Beanstalk
```bash
# List previous versions
eb appversion lifecycle

# Deploy previous version
eb deploy --version VERSION_LABEL
```

### EC2
```bash
# Pull previous Docker image
docker pull <ECR_URI>:PREVIOUS_TAG
docker stop assistpro-web
docker run -d -p 3000:3000 --name assistpro-web <ECR_URI>:PREVIOUS_TAG
```

---

## Troubleshooting

### Build Fails
1. Check build logs
2. Verify Node.js version (18+)
3. Run `npm install` and `npm run build` locally
4. Check for missing dependencies

### Container Won't Start
1. Check CloudWatch logs
2. Verify environment variables
3. Test Docker image locally
4. Check security group rules

### Can't Access Application
1. Verify security group allows inbound traffic
2. Check that service is running
3. Verify load balancer configuration
4. Check DNS settings (if using custom domain)

### High Costs
1. Review running services
2. Stop unused environments
3. Reduce instance sizes
4. Enable auto-scaling to scale down

---

## Support Resources

- **AWS Documentation**: https://docs.aws.amazon.com/
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Docker Documentation**: https://docs.docker.com/
- **Project Issues**: seaointeralia@gmail.com

---

## Notes

- Always test in a staging environment before production
- Keep your AWS credentials secure
- Regularly update dependencies
- Monitor costs and set budgets
- Back up important data
- Document any custom configurations
