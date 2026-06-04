<div align="center">

<h1>REMOTAGE 🌐</h1>

<p><strong>Your Remote Advantage.</strong><br/>
Scale faster with expert-led digital services, automation, and remote execution.</p>

[![Website](https://img.shields.io/badge/Website-remotage.com-0ea5e9?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.remotage.com)
[![Status](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)]()
[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()

</div>

---

## 🌿 What is Remotage?

**Remotage** is a remote-first virtual services company helping startups, SMBs, and industry professionals scale faster — without hiring full in-house teams. The platform offers expert-led remote execution across lead generation, customer support, marketing, bookkeeping, web development, CRM management, real estate services, and more.

This repository is the full-stack Next.js application that powers [remotage.com](https://www.remotage.com) — a **single Next.js app** with a public marketing site, built-in API routes (no separate backend), MongoDB integration, CMS-powered admin dashboard, booking system, lead management, analytics, and a complete password reset flow.

> *"Your remote advantage — helping businesses scale faster with expert digital services, automation, and execution."*

---

## ✨ Features

### Public Website
- 🏠 **Home** — Hero, 8-service preview, who we assist, 4-step process, client logos, testimonials, newsletter signup
- 👤 **About** — Story, live stats (150+ clients, $2M+ revenue, 98% satisfaction, 24/7 support), mission & vision, 6 core values, team, CTA
- 🛠️ **Services** — Detailed service pages, Remotage vs DIY comparison table, Real Estate specialist section
- 📬 **Contact** — Contact form, book a call, FAQ

### Services Offered (Live on Site)
| # | Service | What We Handle |
|---|---------|----------------|
| 01 | **Lead Generation** | Outreach, pipeline filling, prospect qualification |
| 02 | **Customer Support** | Email, chat, phone; orders, returns, feedback, complaints |
| 03 | **Marketing & Social Media** | Blog content, posts, scheduling, analytics, influencer outreach |
| 04 | **Finance & Bookkeeping** | Invoicing, expense tracking, financial summaries & reports |
| 05 | **Real Estate Services** | FSBO calling, expired leads, cold calling, appointment setting |
| 06 | **Web Development** | Custom sites, landing pages, e-commerce, SEO, maintenance |
| 07 | **CRM Management** | CRM setup, pipeline management, client follow-up |
| 08 | **Online Reputation Management** | Brand monitoring, review management, reputation building |

### Admin Dashboard (`/admin`)
- 🔐 **JWT Authentication** — Secure login, forgot password & reset password flow, token validation
- 📊 **Dashboard** — Live stats + weekly chart (auto-refresh)
- 📅 **Bookings** — View, manage, and update booking status
- 👥 **Leads** — Contact form submissions with status management
- 📧 **Subscribers** — Newsletter subscriber list
- ✏️ **CMS** — Per-page content editor for Home, About, Services, Contact, Navbar, and Footer — with drag & drop image upload
- 🖼️ **Image Upload** — Dedicated `/api/cms/upload/image` endpoint

### API Routes (Built-in — Next.js App Router)
All backend logic lives inside `app/api/` — no separate server required.

### Infrastructure
- 🔒 `middleware.ts` — Route protection for all `/admin/dashboard/*` paths
- 🗄️ `lib/mongodb.ts` — MongoDB connection with connection pooling
- 🛡️ `lib/auth.ts` — JWT utilities
- 📡 `lib/api.ts` — Axios API client
- 📄 `lib/cms.ts` — CMS helper utilities
- 📦 `lib/response.ts` — Standardized API response helpers
- 🧬 `models/Admin.ts` — Mongoose Admin model
- 🔧 `scripts/migrate-admins.ts` — Admin migration script

---

## 🛠️ Tech Stack

### Framework & Language
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Database & Auth
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)

---

## 🏗️ Project Structure

```
frontend/
├── .env.example
├── .env.local                        # Local dev environment variables
├── .env.production                   # Production environment variables
├── middleware.ts                     # Next.js middleware — protects /admin/dashboard/*
├── next.config.ts
├── tsconfig.json
├── package.json
│
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── globals.css
│   ├── favicon.ico
│   │
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx                  # Admin login
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── dashboard/
│   │       ├── page.tsx              # Dashboard overview
│   │       ├── bookings/page.tsx
│   │       ├── leads/page.tsx
│   │       ├── subscribers/page.tsx
│   │       └── cms/
│   │           ├── page.tsx          # CMS landing
│   │           ├── home/page.tsx
│   │           ├── about/page.tsx
│   │           ├── services/page.tsx
│   │           ├── contact/page.tsx
│   │           ├── navbar/page.tsx
│   │           └── footer/page.tsx
│   │
│   └── api/                          # Next.js API Routes (built-in backend)
│       ├── health/route.ts           # Health check endpoint
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── verify/route.ts
│       │   ├── forgot-password/route.ts
│       │   ├── reset-password/route.ts
│       │   └── validate-reset-token/route.ts
│       ├── bookings/
│       │   ├── route.ts              # GET all / POST new booking
│       │   └── [id]/
│       │       ├── route.ts          # GET / DELETE by ID
│       │       └── status/route.ts   # PATCH booking status
│       ├── cms/
│       │   ├── [pageSlug]/route.ts   # GET / PUT page content
│       │   └── upload/image/route.ts # POST image upload
│       ├── dashboard/
│       │   ├── stats/route.ts        # GET dashboard stats
│       │   └── weekly-chart/route.ts # GET weekly chart data
│       ├── leads/
│       │   ├── route.ts              # GET all / POST new lead
│       │   └── [id]/
│       │       ├── route.ts          # GET / DELETE by ID
│       │       └── status/route.ts   # PATCH lead status
│       └── subscribers/
│           ├── route.ts              # GET all / POST subscribe
│           └── [id]/route.ts         # DELETE subscriber
│
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── LayoutWrapper.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── WhoWeHelp.tsx
│   │   ├── Process.tsx
│   │   ├── Clients.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   │
│   ├── about/
│   │   ├── AboutHero.tsx
│   │   ├── AboutStory.tsx
│   │   ├── AboutMissionVision.tsx
│   │   ├── AboutValues.tsx
│   │   ├── AboutStats.tsx
│   │   ├── AboutTeam.tsx
│   │   └── AboutCTA.tsx
│   │
│   ├── services/
│   │   ├── ServicesHero.tsx
│   │   ├── ServiceWebDev.tsx
│   │   ├── AdminSupport.tsx
│   │   ├── MarketingSocial.tsx
│   │   ├── FinanceBookkeeping.tsx
│   │   ├── CustomerSupport.tsx
│   │   ├── ComparisonSection.tsx
│   │   └── ServicesCTA.tsx
│   │
│   ├── contact/
│   │   ├── ContactHero.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ContactBooking.tsx
│   │   └── ContactFAQ.tsx
│   │
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminHeader.tsx
│       ├── AdminSidebar.tsx
│       ├── AdminBookings.tsx
│       ├── AdminLeads.tsx
│       ├── AdminSubscribers.tsx
│       ├── AdminCMS.tsx
│       ├── ForgotPassword.tsx
│       ├── ResetPassword.tsx
│       └── cms/
│           ├── CMSHome.tsx
│           ├── CMSAbout.tsx
│           ├── CMSServices.tsx
│           ├── CMSContact.tsx
│           ├── CMSNavbar.tsx
│           ├── CMSFooter.tsx
│           └── ImageDropZone.tsx
│
├── lib/
│   ├── mongodb.ts                    # MongoDB connection (pooled)
│   ├── auth.ts                       # JWT sign / verify utilities
│   ├── api.ts                        # Axios API client
│   ├── cms.ts                        # CMS fetch helpers
│   └── response.ts                   # Standardized API response helpers
│
├── models/
│   ├── Admin.ts                      # Mongoose Admin model
│   └── index.ts                      # Model exports
│
├── scripts/
│   ├── migrate-admins.ts             # Admin seed / migration script
│   └── build-tree.js                 # Generates project_structure.txt
│
└── public/                           # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/abdussamietahir2006-stack/Remotage.git
cd Remotage/frontend
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_strong_random_secret_min_32_chars
JWT_EXPIRES_IN=7d

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`

### 4. Create Admin Account

Run the migration script to seed your first admin user:

```bash
npx ts-node scripts/migrate-admins.ts
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`) |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the app |

---

## 🌐 API Routes

All routes live inside `app/api/` and run serverlessly via Next.js.

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Admin login — returns JWT |
| GET | `/api/auth/verify` | ✅ | Verify JWT token |
| POST | `/api/auth/forgot-password` | ❌ | Send password reset email |
| POST | `/api/auth/validate-reset-token` | ❌ | Validate reset token |
| POST | `/api/auth/reset-password` | ❌ | Reset password with valid token |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/bookings` | ✅ | List all bookings |
| POST | `/api/bookings` | ❌ | Submit a booking request |
| GET/DELETE | `/api/bookings/[id]` | ✅ | Get or delete a booking |
| PATCH | `/api/bookings/[id]/status` | ✅ | Update booking status |

### Leads
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/leads` | ✅ | List all leads |
| POST | `/api/leads` | ❌ | Submit contact form |
| GET/DELETE | `/api/leads/[id]` | ✅ | Get or delete a lead |
| PATCH | `/api/leads/[id]/status` | ✅ | Update lead status |

### Subscribers
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/subscribers` | ✅ | List all subscribers |
| POST | `/api/subscribers` | ❌ | Subscribe to newsletter |
| DELETE | `/api/subscribers/[id]` | ✅ | Remove a subscriber |

### CMS
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cms/[pageSlug]` | ❌ | Get content for a page section |
| PUT | `/api/cms/[pageSlug]` | ✅ | Update content for a page section |
| POST | `/api/cms/upload/image` | ✅ | Upload an image |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/dashboard/stats` | ✅ | Overview stats (bookings, leads, subscribers) |
| GET | `/api/dashboard/weekly-chart` | ✅ | Weekly activity chart data |

### Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | ❌ | Server health check |

---

## 🌱 CMS Page Slugs

| Slug | Editable Content |
|---|---|
| `home` | Hero, services preview, process, client logos, testimonials, newsletter |
| `about` | Story, stats, mission, vision, values, team |
| `services` | Service titles, descriptions, bullet points, images |
| `contact` | Contact info, FAQ items, booking copy |
| `navbar` | Logo, navigation links, CTA button |
| `footer` | Brand copy, social links, footer links, phone, email |

---

## 🔒 Route Protection

`middleware.ts` intercepts all requests to `/admin/dashboard/*` and redirects unauthenticated users to `/admin`. JWT is validated server-side on every protected request.

---

## 📊 About Remotage

| Metric | Value |
|---|---|
| 🧑‍💼 Clients Served | 150+ |
| 💰 Revenue Generated | $2M+ |
| ⭐ Client Satisfaction | 98% |
| 🕐 Support Availability | 24/7 |
| ⚡ Onboarding Time | 24 hours |
| 📍 Founded | 2023 |

---

## 🔧 Scripts

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Utilities
node scripts/build-tree.js          # Regenerate project_structure.txt
npx ts-node scripts/migrate-admins.ts  # Seed / migrate admin accounts
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel
```

Set the following environment variables in your Vercel project dashboard:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NEXT_PUBLIC_APP_URL`

### Self-Hosted (VPS)

```bash
npm run build
npm run start
```

Use a process manager like PM2 and an Nginx reverse proxy pointing to port `3000`.

---

## 📞 Contact

| Channel | Details |
|---------|---------|
| 🌐 Website | [remotage.com](https://www.remotage.com) |
| 📧 Email | Mashood.tahir@remotage.com |
| 📞 Phone | +1 (628) 265-7358 |
| 📍 Availability | Worldwide · Remote First · 24/7 |

---

## 👨‍💻 Built By

**Abdus Samie Tahir** — Full-Stack Developer · RMAST Studio

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raja%20Abdussamie-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/raja-muhammad-abdussamie-tahir-b70121413/)
[![Instagram](https://img.shields.io/badge/Instagram-@rmaststudio-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/rmaststudio/)
[![Email](https://img.shields.io/badge/Email-rmaststudio@gmail.com-D14836?style=for-the-badge&logo=gmail)](mailto:rmaststudio@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-rmast--studio.vercel.app-52b788?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rmast-studio.vercel.app)

---

## 📄 License

Private project — © 2026 Remotage. All rights reserved.

---

<div align="center">

*"Your Remote Advantage."* 🌐

[remotage.com](https://www.remotage.com)

</div>
