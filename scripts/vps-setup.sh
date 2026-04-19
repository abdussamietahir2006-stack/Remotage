#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting Remotage VPS Setup...${NC}"

echo -e "${YELLOW}Updating system...${NC}"
sudo apt-get update -y
sudo apt-get upgrade -y

echo -e "${YELLOW}Installing Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Node: $(node -v), NPM: $(npm -v)"

echo -e "${YELLOW}Installing PM2...${NC}"
sudo npm install -g pm2

echo -e "${YELLOW}Installing Nginx...${NC}"
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

echo -e "${YELLOW}Installing Certbot...${NC}"
sudo apt-get install -y certbot python3-certbot-nginx

echo -e "${YELLOW}Installing Git...${NC}"
sudo apt-get install -y git

echo -e "${YELLOW}Creating directories...${NC}"
sudo mkdir -p /var/www/remotage
sudo mkdir -p /var/log/remotage
sudo chown -R $USER:$USER /var/www/remotage
sudo chown -R $USER:$USER /var/log/remotage

echo -e "${YELLOW}Cloning repository...${NC}"
if [ -d "/var/www/remotage/.git" ]; then
  echo "Already cloned, pulling latest..."
  cd /var/www/remotage && git pull origin main
else
  git clone https://github.com/abdussamietahir2006-stack/Remotage.git /var/www/remotage
fi

echo -e "${YELLOW}Building backend...${NC}"
cd /var/www/remotage/backend
npm install
npm run build

echo -e "${YELLOW}Building frontend...${NC}"
cd /var/www/remotage/frontend
npm install
npm run build

echo -e "${YELLOW}Configuring Nginx...${NC}"
sudo cp /var/www/remotage/nginx/remotage.conf /etc/nginx/sites-available/remotage
sudo ln -sf /etc/nginx/sites-available/remotage /etc/nginx/sites-enabled/remotage
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo -e "${YELLOW}Starting PM2...${NC}"
cd /var/www/remotage
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup | tail -1 | sudo bash

echo -e "${GREEN}"
echo "========================================="
echo "VPS setup complete!"
echo "========================================="
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Upload env files from your LOCAL machine:"
echo "   scp backend/.env.production root@YOUR_VPS_IP:/var/www/remotage/backend/.env"
echo "   scp frontend/.env.production root@YOUR_VPS_IP:/var/www/remotage/frontend/.env.production"
echo ""
echo "2. Rebuild frontend with prod env:"
echo "   cd /var/www/remotage/frontend && npm run build && pm2 reload remotage-frontend"
echo ""
echo "3. Add DNS A records in Hostinger panel:"
echo "   @   -> YOUR_VPS_IP"
echo "   www -> YOUR_VPS_IP"
echo "   api -> YOUR_VPS_IP"
echo ""
echo "4. After DNS propagates (15-30 min), run SSL:"
echo "   sudo certbot --nginx -d remotage.com -d www.remotage.com -d api.remotage.com"
echo -e "${NC}"