<div align="center">

<h1>Remotage 🚀</h1>

<p>A professional full-stack startup website built with a modern MERN architecture — featuring a CMS-powered admin dashboard, booking system, lead management, analytics, and production-ready deployment.</p>

[![GitHub](https://img.shields.io/badge/GitHub-Remotage-181717?style=for-the-badge&logo=github)](https://github.com/abdussamietahir2006-stack/Remotage)
[![Status](https://img.shields.io/badge/Status-In%20Development-f59e0b?style=for-the-badge)]()
[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()

</div>

---

## 🌿 What is Remotage?

**Remotage** is a professional startup website with a full MERN stack architecture — built for businesses that need a polished public-facing site *and* a powerful backend admin panel in one monorepo.

The project is structured as a **monorepo** with a dedicated `frontend` (Next.js) and `backend` (Node.js/Express), a production Nginx config, PM2 process management, and automated VPS deploy scripts.

---

## ✨ Features

### Public Website
- 🏠 **Home** — Hero, services preview, who we help, process, clients, testimonials, newsletter
- 👤 **About** — Hero, story, mission & vision, values, stats, team, CTA
- 🛠️ **Services** — Web dev, admin support, marketing & social, finance & bookkeeping, customer support, comparison section, CTA
- 📬 **Contact** — Contact form, booking/call scheduler, FAQ, hero

### Admin Dashboard (`/admin`)
- 🔐 **JWT Authentication** — Secure login, forgot password, reset password flow
- 📊 **Dashboard** — Live stats overview with analytics
- 📅 **Bookings** — View and manage booking requests
- 👥 **Leads** — Contact form submissions
- 📧 **Subscribers** — Newsletter subscriber list
- ✏️ **CMS** — Full content editor for every page section:
  - Home, About, Services, Contact, Navbar, Footer
  - Drag & drop image upload (`ImageDropZone`)

### Backend API
- RESTful API with Express + TypeScript
- JWT auth with middleware protection
- Password reset flow (token-based)
- Analytics controller
- Structured error handling (`ApiError`, `ApiResponse`, `asyncHandler`)
- Admin migration script

### DevOps & Deployment
- 🖥️ **VPS deployment** with Nginx reverse proxy
- ⚙️ **PM2** process manager (`ecosystem.config.js`)
- 📜 **Shell scripts** for deploy and VPS setup automation
- Nginx config included (`nginx/remotage.conf`)

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

### DevOps & Infrastructure
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)

---

## 🏗️ Project Structure

```
Remotage/
├── ecosystem.config.js               # PM2 process manager config
├── PROJECT_STRUCTURE.md
├── README.md
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts                 # Express app entry point
│       ├── config/
│       │   ├── db.ts                 # MongoDB connection
│       │   └── env.ts                # Environment variable loader
│       ├── controllers/
│       │   ├── analytics.controller.ts
│       │   ├── auth.controller.ts
│       │   ├── bookings.controller.ts
│       │   ├── cms.controller.ts
│       │   ├── dashboard.controller.ts
│       │   ├── leads.controller.ts
│       │   └── subscribers.controller.ts
│       ├── middleware/
│       │   ├── auth.middleware.ts    # JWT protection
│       │   └── error.middleware.ts
│       ├── models/
│       │   ├── Admin.model.ts
│       │   ├── Booking.model.ts
│       │   ├── Lead.model.ts
│       │   ├── PageContent.model.ts
│       │   ├── PasswordReset.model.ts
│       │   └── Subscriber.model.ts
│       ├── routes/
│       │   ├── index.ts              # Route aggregator
│       │   ├── analytics.routes.ts
│       │   ├── auth.routes.ts
│       │   ├── bookings.routes.ts
│       │   ├── cms.routes.ts
│       │   ├── dashboard.routes.ts
│       │   ├── leads.routes.ts
│       │   └── subscribers.routes.ts
│       ├── scripts/
│       │   └── migrate-admins.ts
│       └── utils/
│           ├── ApiError.ts
│           ├── ApiResponse.ts
│           └── asyncHandler.ts
│
├── frontend/
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── admin/
│   │       ├── page.tsx              # Admin login
│   │       ├── forgot-password/page.tsx
│   │       ├── reset-password/page.tsx
│   │       └── dashboard/
│   │           ├── page.tsx          # Dashboard overview
│   │           ├── bookings/page.tsx
│   │           ├── leads/page.tsx
│   │           ├── subscribers/page.tsx
│   │           └── cms/
│   │               ├── page.tsx
│   │               ├── home/page.tsx
│   │               ├── about/page.tsx
│   │               ├── services/page.tsx
│   │               ├── contact/page.tsx
│   │               ├── navbar/page.tsx
│   │               └── footer/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LayoutWrapper.tsx
│   ├── lib/
│   │   ├── api.ts                    # Axios API client
│   │   └── cms.ts                    # CMS helper utilities
│   ├── sections/
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── WhoWeHelp.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Clients.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Newsletter.tsx
│   │   ├── about/
│   │   │   ├── AboutHero.tsx
│   │   │   ├── AboutStory.tsx
│   │   │   ├── AboutMissionVision.tsx
│   │   │   ├── AboutValues.tsx
│   │   │   ├── AboutStats.tsx
│   │   │   ├── AboutTeam.tsx
│   │   │   └── AboutCTA.tsx
│   │   ├── services/
│   │   │   ├── ServicesHero.tsx
│   │   │   ├── ServiceWebDev.tsx
│   │   │   ├── AdminSupport.tsx
│   │   │   ├── MarketingSocial.tsx
│   │   │   ├── FinanceBookkeeping.tsx
│   │   │   ├── CustomerSupport.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   └── ServicesCTA.tsx
│   │   ├── contact/
│   │   │   ├── ContactHero.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ContactBooking.tsx
│   │   │   └── ContactFAQ.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminBookings.tsx
│   │       ├── AdminLeads.tsx
│   │       ├── AdminSubscribers.tsx
│   │       ├── AdminCMS.tsx
│   │       ├── ForgotPassword.tsx
│   │       ├── ResetPassword.tsx
│   │       └── cms/
│   │           ├── CMSHome.tsx
│   │           ├── CMSAbout.tsx
│   │           ├── CMSServices.tsx
│   │           ├── CMSContact.tsx
│   │           ├── CMSNavbar.tsx
│   │           ├── CMSFooter.tsx
│   │           └── ImageDropZone.tsx
│   └── public/
│
├── nginx/
│   └── remotage.conf                 # Nginx reverse proxy config
└── scripts/
    ├── deploy.sh                     # Automated deploy script
    └── vps-setup.sh                  # VPS initial setup script
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/abdussamietahir2006-stack/Remotage.git
cd Remotage
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` in the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret_min_32_chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env.local` in the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Express server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`) |
| `CLIENT_URL` | Frontend URL for CORS |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

---

## 🌐 API Routes

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Admin login |
| POST | `/api/auth/forgot-password` | ❌ | Send password reset email |
| POST | `/api/auth/reset-password` | ❌ | Reset password with token |
| GET | `/api/auth/me` | ✅ | Get current admin |

### CMS
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cms/:section` | ❌ | Get page content |
| PUT | `/api/cms/:section` | ✅ | Update page content |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | ❌ | Submit a booking |
| GET | `/api/bookings` | ✅ | List all bookings |
| PUT | `/api/bookings/:id` | ✅ | Update booking status |
| DELETE | `/api/bookings/:id` | ✅ | Delete booking |

### Leads
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/leads` | ❌ | Submit contact form |
| GET | `/api/leads` | ✅ | List all leads |
| DELETE | `/api/leads/:id` | ✅ | Delete lead |

### Subscribers
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/subscribers` | ❌ | Subscribe to newsletter |
| GET | `/api/subscribers` | ✅ | List all subscribers |
| DELETE | `/api/subscribers/:id` | ✅ | Remove subscriber |

### Dashboard & Analytics
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/dashboard/stats` | ✅ | Get dashboard stats |
| GET | `/api/analytics` | ✅ | Get analytics data |

---

## 🌱 CMS Sections

| Section | Editable Content |
|---|---|
| `home` | Hero, services preview, who we help, process, clients, testimonials, newsletter |
| `about` | Story, mission, vision, values, stats, team |
| `services` | Service titles, descriptions, icons, details |
| `contact` | Contact info, FAQ, booking details |
| `navbar` | Logo, navigation links, CTA button |
| `footer` | Brand info, social links, footer links, contact info |

---

## 🚢 Deployment

### VPS (Recommended — Nginx + PM2)

Run the setup script on a fresh VPS:

```bash
chmod +x scripts/vps-setup.sh
./scripts/vps-setup.sh
```

Deploy updates:

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

PM2 manages both frontend and backend processes via `ecosystem.config.js`. Nginx routes traffic using `nginx/remotage.conf`.

### Vercel (Frontend only)

The frontend can be independently deployed to Vercel:

```bash
cd frontend
vercel
```

Set `NEXT_PUBLIC_API_URL` in your Vercel environment variables to point to your backend.

---

## 🔧 Scripts

### Backend
```bash
npm run dev       # Start with ts-node-dev (hot reload)
npm run build     # Compile TypeScript
npm run start     # Start compiled production server
```

### Frontend
```bash
npm run dev       # Start Next.js dev server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 👨‍💻 Author

**Abdus Samie Tahir** — Full-Stack Developer · Designer · AI Automation

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raja%20Abdussamie-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/raja-muhammad-abdussamie-tahir-b70121413/)
[![Instagram](https://img.shields.io/badge/Instagram-@rmaststudio-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/rmaststudio/)
[![Email](https://img.shields.io/badge/Email-rmaststudio@gmail.com-D14836?style=for-the-badge&logo=gmail)](mailto:rmaststudio@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-rmast--studio.vercel.app-52b788?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rmast-studio.vercel.app)

---

## 📄 License

Private project — © 2026 Remotage / RMAST Studio. All rights reserved.
