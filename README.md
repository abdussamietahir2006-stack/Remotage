# Remotage

Remote-first business services platform.

- **Frontend:** https://remotage.com
- **API:** https://api.remotage.com
- **Admin:** https://remotage.com/admin

---

## Local Development

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## First-Time VPS Deployment

### 1. SSH into your VPS
```bash
ssh root@YOUR_VPS_IP
```

### 2. Run the setup script (runs once)
```bash
bash /var/www/remotage/scripts/vps-setup.sh
```

### 3. Upload environment files from your local machine
```bash
scp frontend/.env.production root@YOUR_VPS_IP:/var/www/remotage/frontend/.env.production
```

### 4. Rebuild frontend with production env
```bash
ssh root@YOUR_VPS_IP
cd /var/www/remotage/frontend && npm run build && pm2 reload remotage-frontend
```

### 5. Add DNS A records in Hostinger panel
| Type | Name | Value        |
|------|------|--------------|
| A    | @    | YOUR_VPS_IP  |
| A    | www  | YOUR_VPS_IP  |

Wait 15-30 minutes for DNS to propagate.

### 6. Install SSL certificates
```bash
sudo certbot --nginx -d remotage.com -d www.remotage.com
```

---

## Every Future Deploy

```bash
# Push code to GitHub first
git add .
git commit -m "your message"
git push origin main

# Then deploy to VPS
bash scripts/deploy.sh
```

---

## Useful Commands

```bash
# PM2
pm2 list                        # view processes
pm2 logs remotage-frontend      # app logs
pm2 reload remotage-frontend    # reload app

# Nginx
sudo nginx -t                   # test config
sudo systemctl restart nginx    # restart nginx
sudo systemctl status nginx     # check status

# Certbot SSL renewal
sudo certbot renew --dry-run    # test renewal
```