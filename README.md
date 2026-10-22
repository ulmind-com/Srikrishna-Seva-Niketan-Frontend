<div align="center">

# 🌐 Srikrishna Seva Niketan — Public Website (Frontend)

**The public-facing website** for Srikrishna Seva Niketan — services, equipment,
blogs, and online booking/enquiry flows for nursing & home-care.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red)](LICENSE)

</div>

---

## 📖 Overview

The customer-facing site. It renders marketing content (services, equipment,
blogs, testimonials, FAQs) and lets visitors submit **bookings, rental requests,
job applications and enquiries** — all backed by the
[Backend API](https://github.com/ulmind-com/Srikrishna-Seva-Niketan-Backend).

Public requests are routed through a **server-side proxy** (`/api/public/proxy`)
so the browser never talks to the backend directly and no API origin or key is
exposed to the client.

> Internal operations (staff, customers, assignments, reports) live in the
> separate [Admin Panel](https://github.com/ulmind-com/Srikrishna-Seva-Niketan-Admin).

---

## 🧱 Tech stack

- **React 18 + Vite + TypeScript** (TanStack-style app with a server proxy layer)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **React Hook Form** for forms
- Deployed on **Vercel**

---

## 🚀 Quick start

> **Prerequisites:** Node 18+ (or [Bun](https://bun.sh/)) and the backend API
> reachable at `VITE_API_UPSTREAM`.

```bash
# 1. Clone
git clone https://github.com/ulmind-com/Srikrishna-Seva-Niketan-Frontend.git
cd Srikrishna-Seva-Niketan-Frontend

# 2. Environment (NEVER commit .env)
cp .env.example .env
#    → set VITE_API_UPSTREAM to your backend origin (e.g. http://localhost:8000)

# 3. Install & run (http://localhost:8080)
npm install          # or: bun install
npm run dev          # or: bun run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server on :8080 |
| `npm run build` | Production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

---

## 🔑 Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_UPSTREAM` | Backend API base the server proxy forwards to — **must include `/api/v1`**, e.g. `http://localhost:8000/api/v1` |

See [`.env.example`](.env.example). **Never commit `.env`.**
Anything prefixed `VITE_` is bundled into the client — never put a secret there.

---

## 🗂️ Project structure

```
src/
├── routes/ · pages/        # Site pages (home, services, equipment, blog, …)
├── components/             # UI sections & shadcn/ui primitives
├── api/ (proxy)            # Server-side proxy → VITE_API_UPSTREAM
├── hooks/ · lib/           # Shared hooks & utilities
└── styles/                 # Tailwind & global styles
```

---

## 🚢 Deployment

Optimised for **Vercel** (zero-config, via the Nitro `vercel` preset). Full
step-by-step guide + gotchas: **[DEPLOYMENT.md](DEPLOYMENT.md)**. Set
`VITE_API_UPSTREAM` in the Vercel project env; the server proxy keeps the
backend origin private.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). CI (lint + build) runs on every
push/PR — [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

> ⚠️ **Never commit secrets or `.env`.** Only `.env.example` is tracked.

---

<div align="center">
<sub>© Srikrishna Seva Niketan · built & maintained by <b>ulmind</b>. All rights reserved.</sub>
</div>
