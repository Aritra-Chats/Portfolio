# Aritra Chatterjee — Portfolio

A cinematic, scroll-driven portfolio with a black-and-white editorial aesthetic.

## Architecture

```
aritra-portfolio/
├── frontend/          # React + TypeScript + Tailwind CSS + Framer Motion (Vite)
│   ├── src/
│   │   ├── data/      # All portfolio content (portfolio.ts)
│   │   ├── sections/  # Hero, About, Skills, Projects, Career, Contact
│   │   ├── components/# Navbar
│   │   ├── App.tsx
│   │   └── index.css
│   └── public/        # Place resume.pdf here → served at /resume.pdf
└── backend/           # Express + TypeScript API (contact form mailer)
    └── src/
        └── index.ts
```

## Quick Start (Development)

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend (optional — only needed for contact form email delivery)
```bash
cd backend
npm install

# Set env vars:
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your@gmail.com
export SMTP_PASS=your_app_password
export ALLOWED_ORIGIN=http://localhost:5173

npm run dev
# → http://localhost:3001
```

> **Gmail**: Go to Google Account → Security → App Passwords to generate `SMTP_PASS`.

### 3. Add Your Résumé
Place your `resume.pdf` inside `frontend/public/resume.pdf`.
It will be served at `/resume.pdf` and linked from the Résumé button and Download CTA.

---

## Production Build

```bash
# Build frontend
cd frontend && npm run build   # outputs to frontend/dist/

# Build backend
cd backend && npm run build    # outputs to backend/dist/

# Run backend (serves frontend too)
cd backend && npm start
# → http://localhost:3001
```

---

## Design Decisions

| Decision | Rationale |
|---|---|
| B&W monochrome palette | Editorial restraint — lets the work speak |
| `Bebas Neue` display + `Syne` headings + `JetBrains Mono` | Uncommon pairing: industrial x refined x technical |
| Scroll-driven hero (5×vh sticky) | Avatar sun expands to full portrait, about cards appear, then collapses simultaneously as pill floats up |
| Iris/aperture reveal for Projects | Camera metaphor fits a "systems builder" narrative; rarer and more memorable than page-flip |
| Dossier split-screen for Career | Room for timeline depth; feels like opening a personnel file |
| Network graph for Contact | Arrival scene — social nodes pulse like signals, echoes hero sun |
| `prefers-reduced-motion` fallback | All animations disabled via CSS media query |

---

## Customisation

All content lives in `frontend/src/data/portfolio.ts`. To update:
- **Bio, taglines, location** → `personal` export
- **Tech stack** → `skills` export
- **Projects** → `projects` array
- **Experience / Education** → `experience`, `education` exports
- **Contact links** → `contact` export

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Bundler | Vite 5 |
| Backend | Express 4 + TypeScript |
| Mailer | Nodemailer |
| Fonts | Bebas Neue · Syne · JetBrains Mono · DM Sans |
| Icons | Devicons CDN (grayscale filtered) |
