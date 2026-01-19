#!/bin/bash
# Script to setup AWS infrastructure for ECS deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
CLUSTER_NAME="${CLUSTER_NAME:-assistpro-cluster}"
SERVICE_NAME="${SERVICE_NAME:-assistpro-web-service}"
ECR_REPOSITORY="${ECR_REPOSITORY:-assistpro-web}"
LOG_GROUP="/ecs/assistpro-web"

echo -e "${YELLOW}Setting up AWS infrastructure for AssistPro Web...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Create ECR Repository
echo -e "${YELLOW}Creating ECR repository...${NC}"
aws ecr create-repository \
  --repository-name $ECR_REPOSITORY \
  --region $AWS_REGION \
  --image-scanning-configuration scanOnPush=true \
  2>/dev/null || echo -e "${YELLOW}ECR repository already exists${NC}"

# Create CloudWatch Log Group
echo -e "${YELLOW}Creating CloudWatch log group...${NC}"
aws logs create-log-group \
  --log-group-name $LOG_GROUP \
  --region $AWS_REGION \
  2>/dev/null || echo -e "${YELLOW}Log group already exists${NC}"

# Create ECS Cluster
echo -e "${YELLOW}Creating ECS cluster...${NC}"
aws ecs create-cluster \
  --cluster-name $CLUSTER_NAME \
  --region $AWS_REGION \
  2>/dev/null || echo -e "${YELLOW}ECS cluster already exists${NC}"

echo -e "${GREEN}AWS infrastructure setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Run ${GREEN}./scripts/deploy-ecr.sh${NC} to build and push your Docker image"
echo -e "2. Update ${GREEN}aws/task-definition.json${NC} with your ECR image URI"
echo -e "3. Create an ECS service using the AWS console or CLI"
echo -e "4. Configure a load balancer (optional but recommended)"
