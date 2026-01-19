#!/bin/bash
# Script to build and push Docker image to AWS ECR

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
ECR_REPOSITORY="${ECR_REPOSITORY:-assistpro-web}"

echo -e "${YELLOW}Starting AWS ECR deployment...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install it first.${NC}"
    exit 1
fi

# Get AWS Account ID
echo -e "${YELLOW}Getting AWS Account ID...${NC}"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${RED}Failed to get AWS Account ID. Please check your AWS credentials.${NC}"
    exit 1
fi
echo -e "${GREEN}AWS Account ID: $AWS_ACCOUNT_ID${NC}"

# ECR Repository URI
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY"

# Login to ECR
echo -e "${YELLOW}Logging in to Amazon ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to login to ECR${NC}"
    exit 1
fi
echo -e "${GREEN}Successfully logged in to ECR${NC}"

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $ECR_REPOSITORY:latest .
if [ $? -ne 0 ]; then
    echo -e "${RED}Docker build failed${NC}"
    exit 1
fi
echo -e "${GREEN}Docker image built successfully${NC}"

# Tag image with ECR URI
echo -e "${YELLOW}Tagging image...${NC}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag $ECR_REPOSITORY:latest $ECR_URI:latest
docker tag $ECR_REPOSITORY:latest $ECR_URI:$TIMESTAMP

# Push to ECR
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_URI:latest
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push latest tag to ECR${NC}"
    exit 1
fi

docker push $ECR_URI:$TIMESTAMP
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push timestamped tag to ECR${NC}"
    exit 1
fi

echo -e "${GREEN}Successfully pushed image to ECR!${NC}"
echo -e "${GREEN}Image URI: $ECR_URI:latest${NC}"
echo -e "${GREEN}Timestamped URI: $ECR_URI:$TIMESTAMP${NC}"
