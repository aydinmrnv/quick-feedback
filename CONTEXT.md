# Project Context: QuickFeedback

## 🎯 Overview
QuickFeedback is a lightweight, conversion-focused Micro-SaaS designed to help startups and developers collect user feedback instantly. It provides an embeddable iframe widget that can be dropped into any website with zero configuration, alongside a management dashboard for tracking responses.

## 🛠 Tech Stack
- **Frontend:** Next.js 15+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (Mobile-first, modern aesthetic)
- **Backend:** Next.js Route Handlers (API)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (Public) / Local (VM)
- **Authentication:** (Planned) Supabase Auth / NextAuth.js

## 🏗 Architecture
- `/src/app/page.tsx`: Marketing landing page.
- `/src/app/dashboard/page.tsx`: Main dashboard for project overview.
- `/src/app/dashboard/[projectId]/page.tsx`: Detailed view for a specific project's feedback.
- `/src/app/widget/[projectId]/page.tsx`: The iframe-optimized feedback form.
- `/src/app/api/`: RESTful endpoints for projects and feedback.
- `/src/lib/supabase.ts`: Centralized database client configuration.

## 📊 Database Schema (Supabase)

### `projects` Table
| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID | Primary Key (auto-generated) |
| `name` | TEXT | Display name of the project |
| `url` | TEXT | Optional target website URL |
| `createdAt` | TIMESTAMPTZ | Creation timestamp |

### `feedbacks` Table
| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID | Primary Key (auto-generated) |
| `projectId` | UUID | Foreign Key -> `projects.id` |
| `rating` | INTEGER | User rating (1-5) |
| `comment` | TEXT | Optional user message |
| `url` | TEXT | Page URL where feedback was sent |
| `createdAt` | TIMESTAMPTZ | Submission timestamp |

## 💰 Monetization Strategy
1. **Free Tier:** 1 project, basic analytics, "Powered by" branding.
2. **Pro Tier ($9/mo):** Unlimited projects, CSV export, Remove branding, Email alerts.
3. **Enterprise:** Custom domains, team collaboration, API access.

## 🚀 Roadmap
- [ ] Add User Authentication (Supabase Auth).
- [ ] Implement Email Notifications (Resend/SendGrid).
- [ ] Build CSV Export functionality for Pro users.
- [ ] Create a "Floating Bubble" widget option.
- [ ] Add sentiment analysis for comments.

---
*Built with love for the builder community.*
