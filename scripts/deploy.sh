#!/bin/bash
set -e

VPS_USER="root"
VPS_IP="YOUR_VPS_IP_HERE"
VPS_PATH="/var/www/remotage"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Deploying Remotage to production...${NC}"

ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << ENDSSH
  set -e

  echo "Pulling latest code..."
  cd $VPS_PATH
  git pull origin main

  echo "Building backend..."
  cd $VPS_PATH/backend
  npm install --production=false
  npm run build

  echo "Building frontend..."
  cd $VPS_PATH/frontend
  npm install --production=false
  npm run build

  echo "Reloading PM2..."
  cd $VPS_PATH
  pm2 reload ecosystem.config.js --env production

  echo "PM2 Status:"
  pm2 list

  echo "Deploy complete!"
ENDSSH

echo -e "${GREEN}Production deploy finished!${NC}"
echo -e "${YELLOW}Visit: https://remotage.com${NC}"