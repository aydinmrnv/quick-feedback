# QuickFeedback 🚀

The simplest way to collect user feedback on your website.

## Features
- **Instant Setup:** Just an iframe embed.
- **Clean Dashboard:** Manage projects and view responses.
- **Mobile Friendly:** Works great on all devices.
- **Lightweight:** Minimal impact on your site's performance.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Local JSON (Upgradeable to Supabase)
- **Deployment:** Vercel / Render / SSH

## Getting Started

### Local Development
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

### Deployment (Vercel)
1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Vercel will automatically detect Next.js and deploy.
4. **Note:** For Vercel deployment, you should switch from the local JSON file to a real database like Supabase (PostgreSQL).

## Monetization Plan
- **Free Tier:** 1 project, basic analytics, "Powered by" branding.
- **Pro Tier ($9/mo):** Unlimited projects, CSV export, Remove branding, Email notifications.

## Launch Checklist
1. [ ] Customize branding in `tailwind.config.ts`.
2. [ ] Replace analytics placeholder in `layout.tsx`.
3. [ ] Set up Supabase for production data persistence.
4. [ ] Deploy to Vercel.
5. [ ] Post on Product Hunt and Indiehacker.
