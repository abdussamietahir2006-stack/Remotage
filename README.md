<div align="center">

<h1>Remotage 🌐</h1>

<p>Remote-first business services platform for modern teams, freelancers, and growing businesses worldwide.</p>

[![Website](https://img.shields.io/badge/Website-remotage.com-0077B5?style=for-the-badge&logo=google-chrome&logoColor=white)](https://remotage.com)
[![Status](https://img.shields.io/badge/Status-Live-52b788?style=for-the-badge)]()
[![Made With](https://img.shields.io/badge/Made%20With-❤️-red?style=for-the-badge)]()

</div>

---

## 🌍 What is Remotage?

Remotage is a full-stack business services platform that helps remote teams and freelancers manage bookings, leads, subscribers, and content — all from one clean dashboard.

Built for speed, scalability, and real-world use.

---

## ✨ Features

- 📅 **Service Booking System** — clients book services with date, time, and status tracking
- 👥 **Lead Management** — capture and manage inbound leads from the website
- 📧 **Newsletter & Subscribers** — full subscriber management with email list export
- 📊 **Admin Dashboard** — real-time analytics, weekly charts, and KPI cards
- 🔐 **JWT Authentication** — secure admin login with token-based auth
- 📁 **CMS** — manage website content directly from the admin panel
- 📱 **Fully Responsive** — works perfectly on all devices

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

### Backend
![Express](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

### Infrastructure
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)
![VPS](https://img.shields.io/badge/VPS-Hostinger-purple?style=for-the-badge)
![SSL](https://img.shields.io/badge/SSL-Certbot-orange?style=for-the-badge)

---

## 🏗️ Architecture
remotage/
├── frontend/          # Next.js 14+ app
│   ├── app/           # Pages & API routes
│   ├── components/    # UI components
│   └── lib/           # Utilities & API client
│
├── backend/           # Express.js API
│   ├── routes/        # API endpoints
│   ├── controllers/   # Business logic
│   ├── middleware/     # Auth & validation
│   └── config/        # DB & environment
│
└── scripts/           # Deployment scripts


---

## 🔗 Live Links

| Service | URL |
|---|---|
| 🌐 Frontend | https://remotage.com |
| ⚙️ API | https://api.remotage.com |


---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/abdussamietahir2006-stack/remotage.git

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:5000`

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/dashboard/stats` | Dashboard KPIs |
| GET/POST | `/api/bookings` | Bookings management |
| GET/POST | `/api/leads` | Leads management |
| GET/POST | `/api/subscribers` | Newsletter subscribers |
| GET/PUT | `/api/cms/:page` | CMS content |

---

## 🔐 Environment Variables

Create `.env` in `/backend`:
```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
PORT=5000
ALLOWED_ORIGINS=https://remotage.com
```

Create `.env.production` in `/frontend`:
```env
NEXT_PUBLIC_API_URL=https://api.remotage.com
```

---

## 📦 Deployment

Full deployment guide → [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📸 Screenshots

> Coming soon — dashboard, booking system, and admin panel previews.

---

## 📄 License

Private project — © 2025 RMAST Studio. All rights reserved.

---

<div align="center">

Built with 🌱 by **RMAST Studio**

[![Instagram](https://img.shields.io/badge/Instagram-@rmaststudio-E4405F?style=for-the-badge&logo=instagram)](https://instagram.com/rmaststudio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raja%20Abdussamie-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/raja-muhammad-abdussamie-tahir-b70121413)

</div>
