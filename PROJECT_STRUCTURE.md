# Remotage - Project Structure

```
Remotage(2)/
├── PROJECT_STRUCTURE.md
├── README.md
├── ecosystem.config.js
├── nginx/
│   └── remotage.conf
├── scripts/
│   ├── deploy.sh
│   └── vps-setup.sh
└── frontend/
    ├── PROJECT_STRUCTURE.md
    ├── README.md
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── .env.local
    ├── .env.production
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── about/
    │   │   └── page.tsx
    │   ├── admin/
    │   │   ├── page.tsx
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx
    │   │   │   ├── bookings/
    │   │   │   │   └── page.tsx
    │   │   │   ├── cms/
    │   │   │   │   ├── page.tsx
    │   │   │   │   ├── about/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── contact/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── footer/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── home/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── navbar/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── services/
    │   │   │   │   │   └── page.tsx
    │   │   │   ├── leads/
    │   │   │   │   └── page.tsx
    │   │   │   ├── subscribers/
    │   │   │   │   └── page.tsx
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   ├── reset-password/
    │   │   │   └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   ├── services/
    │   │   └── page.tsx
    │   └── api/
    │       ├── health/
    │       │   └── route.ts
    │       ├── auth/
    │       │   ├── login/
    │       │   │   └── route.ts
    │       │   ├── verify/
    │       │   │   └── route.ts
    │       │   ├── forgot-password/
    │       │   │   └── route.ts
    │       │   ├── validate-reset-token/
    │       │   │   └── route.ts
    │       │   └── reset-password/
    │       │       └── route.ts
    │       ├── leads/
    │       │   ├── route.ts
    │       │   └── [id]/
    │       │       ├── route.ts
    │       │       └── status/
    │       │           └── route.ts
    │       ├── bookings/
    │       │   ├── route.ts
    │       │   └── [id]/
    │       │       ├── route.ts
    │       │       └── status/
    │       │           └── route.ts
    │       ├── subscribers/
    │       │   ├── route.ts
    │       │   └── [id]/
    │       │       └── route.ts
    │       ├── cms/
    │       │   ├── upload/
    │       │   │   └── image/
    │       │   │       └── route.ts
    │       │   └── [pageSlug]/
    │       │       └── route.ts
    │       └── dashboard/
    │           ├── stats/
    │           │   └── route.ts
    │           └── weekly-chart/
    │               └── route.ts
    ├── components/
    │   ├── Footer.tsx
    │   ├── LayoutWrapper.tsx
    │   └── Navbar.tsx
    ├── lib/
    │   ├── api.ts
    │   ├── cms.ts
    │   ├── db.ts
    │   ├── env-config.ts
    │   ├── auth-middleware.ts
    │   ├── ApiError.ts
    │   ├── ApiResponse.ts
    │   └── models/
    │       ├── Admin.model.ts
    │       ├── Booking.model.ts
    │       ├── Lead.model.ts
    │       ├── PageContent.model.ts
    │       ├── PasswordReset.model.ts
    │       └── Subscriber.model.ts
    ├── public/
    ├── scripts/
    │   └── migrate-admins.ts
    └── sections/
        ├── about/
        │   ├── AboutCTA.tsx
        │   ├── AboutHero.tsx
        │   ├── AboutMissionVision.tsx
        │   ├── AboutStats.tsx
        │   ├── AboutStory.tsx
        │   ├── AboutTeam.tsx
        │   └── AboutValues.tsx
        ├── admin/
        │   ├── AdminBookings.tsx
        │   ├── AdminCMS.tsx
        │   ├── AdminDashboard.tsx
        │   ├── AdminHeader.tsx
        │   ├── AdminLeads.tsx
        │   ├── AdminLogin.tsx
        │   ├── AdminSidebar.tsx
        │   ├── AdminSubscribers.tsx
        │   ├── ForgotPassword.tsx
        │   ├── ResetPassword.tsx
        │   └── cms/
        │       ├── CMSAbout.tsx
        │       ├── CMSContact.tsx
        │       ├── CMSFooter.tsx
        │       ├── CMSHome.tsx
        │       ├── CMSNavbar.tsx
        │       ├── CMSServices.tsx
        │       └── ImageDropZone.tsx
        ├── contact/
        │   ├── ContactBooking.tsx
        │   ├── ContactFAQ.tsx
        │   ├── ContactForm.tsx
        │   └── ContactHero.tsx
        ├── home/
        │   ├── Clients.tsx
        │   ├── Hero.tsx
        │   ├── Newsletter.tsx
        │   ├── Process.tsx
        │   ├── ServicesPreview.tsx
        │   ├── Testimonials.tsx
        │   └── WhoWeHelp.tsx
        └── services/
            ├── AdminSupport.tsx
            ├── ComparisonSection.tsx
            ├── CustomerSupport.tsx
            ├── FinanceBookkeeping.tsx
            ├── MarketingSocial.tsx
            ├── ServiceWebDev.tsx
            ├── ServicesCTA.tsx
            └── ServicesHero.tsx
```

## Project Overview

**Remotage** is a unified Next.js professional startup services website with integrated API routes, database models, and administration control panel.

### Core Features
- Unified Next.js application hosting both SSR/CSR components and API backend routes
- Mongoose database integration with active connection pooling
- Admin Dashboard for CMS, leads tracking, bookings management, and subscribers control
- Tailwind CSS styling and Framer Motion micro-animations
