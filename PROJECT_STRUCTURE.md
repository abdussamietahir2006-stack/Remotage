# Remotage - Project Structure

```
Remotage(2)/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── pages/
│   │       │   ├── home.tsx
│   │       │   ├── about.tsx
│   │       │   ├── services.tsx
│   │       │   └── contact.tsx
│   │       ├── subscribers/
│   │       │   └── page.tsx
│   │       └── bookings/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Loader.tsx
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
│   │   │   ├── AboutIntro.tsx
│   │   │   ├── MissionVision.tsx
│   │   │   └── Team.tsx
│   │   ├── services/
│   │   │   ├── ServicesList.tsx
│   │   │   ├── ServiceDetails.tsx
│   │   │   └── ProcessExplained.tsx
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       ├── BookCall.tsx
│   │       └── ContactInfo.tsx
│   ├── lib/
│   │   ├── axios.ts
│   │   └── cloudinary.ts
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── adminService.ts
│   ├── store/
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── userSlice.ts
│   │       └── adminSlice.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   └── service.ts
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.local
│   ├── .gitignore
│   └── README.md
└── backend/
    └── (To be created)

```

## Project Overview

**Remotage** is a professional startup website with a MERN stack architecture.

### Frontend
- Next.js App Router with TypeScript
- Reusable UI components and page sections
- Redux store for state management
- Tailwind CSS for styling
- Admin dashboard for content management
- Authentication and API integration

### Backend
- (Structure to be defined)

## Frontend Directory Overview

- **app/** - Next.js App Router pages and layouts
- **components/** - Reusable UI components
- **sections/** - Page section components organized by feature
- **lib/** - Utility libraries (Axios, Cloudinary integration)
- **hooks/** - Custom React hooks
- **services/** - API and business logic services
- **store/** - Redux store and slices
- **types/** - TypeScript type definitions
- **styles/** - Global CSS files
- **public/** - Static assets (images, icons)
