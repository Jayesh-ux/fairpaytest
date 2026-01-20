# FairPay Solutions - Client Portal & Admin Dashboard

A comprehensive, production-grade debt advisory platform built with Next.js 14, Prisma, and NextAuth.

## 🚀 Key Features

### Client Portal
- **Case Dashboard**: Real-time overview of debt settlement progress.
- **Ticket Management**: Create and track multiple loan settlement cases.
- **Interaction Hub**: Secure real-time chat with debt advisors.
- **Case Timeline**: Automated logs of every step in the settlement journey.
- **Document Management**: Upload and track verification documents.

### Admin Dashboard
- **Command Center**: High-level statistics on active cases, leads, and reviews.
- **Case Management**: Full control over ticket stages, status, and progress.
- **Lead Tracking**: Manage callback requests from public landing pages.
- **Review Moderation**: Approve or reject client testimonials before they go live.
- **User Directory**: Unified view of all registered clients and their activity.

### Technical Excellence
- **Next.js 14 App Router**: Server-side rendering for optimal performance and SEO.
- **Prisma ORM**: Robust database management with PostgreSQL.
- **NextAuth (Google OAuth)**: Secure, enterprise-grade authentication.
- **Modern UI**: High-fidelity dark mode interface with Framer Motion animations.
- **Glassmorphism**: Premium aesthetic and responsive design using Tailwind CSS.

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google Cloud Console Project (for OAuth)

### 2. Installation
```sh
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/fairpay"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Initialization
```sh
npx prisma db push
npx prisma db seed # To create initial admin users
```

### 5. Running the App
```sh
npm run dev
```

## 📂 Project Structure
- `app/`: Next.js 14 App Router routes.
  - `(marketing)/`: Public-facing website pages.
  - `portal/`: Client-facing dashboard and tools.
  - `admin/`: Staff-only management dashboard.
  - `api/`: REST API endpoints.
  - `auth/`: Customized authentication pages.
- `components/`: Reusable UI components (shadcn/ui + custom).
- `lib/`: Utility functions, auth config, and Prisma client.
- `prisma/`: Database schema and seed scripts.

## ⚖️ License
Proprietary - FairPay Solutions
