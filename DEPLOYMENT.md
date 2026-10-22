# 🚀 Deploying the Frontend to Vercel

> Deploy the **backend (Render) first** — you need its URL here.

This site is **TanStack Start + Nitro** (SSR + a server proxy route), not a plain
static SPA. It's already configured to build for Vercel via the Nitro **`vercel`
preset** (see [`vite.config.ts`](vite.config.ts)), which emits a `.vercel/output`
directory that Vercel picks up automatically (Build Output API).

Because public API calls go through the **server proxy** (`/api/public/proxy`),
the browser never talks to the backend directly — so this app needs **no CORS
changes on the backend**.

---

## Step 1 — Import the project

Vercel → **Add New → Project** → import `ulmind-com/Srikrishna-Seva-Niketan-Frontend`.

Settings:
- **Build command:** `npm run build` (default)
- **Install command:** `npm install` (default)
- **Framework preset:** leave Vercel's auto-detection, or choose **Other**.
- **Output directory:** leave **empty / default**. ⚠️ Do **not** force it to
  `dist` — the Nitro `vercel` preset writes `.vercel/output`, which Vercel uses
  automatically. Forcing `dist` breaks the SSR/server build.

> No `vercel.json` is needed (and none is committed on purpose).

## Step 2 — Environment variables

Project → **Settings → Environment Variables** (scope: **Production**):

| Variable | Value |
|----------|-------|
| `VITE_API_UPSTREAM` | `https://<backend>.onrender.com/api/v1` — **must include `/api/v1`** (the proxy appends bare paths like `/services`), no trailing slash |

> ⚠️ Build-time var — change it and **redeploy**.

## Step 3 — Deploy & verify

1. Deploy. Open the URL, e.g. `https://srikrishna-seva-niketan-frontend.vercel.app`.
2. The homepage should load live content (services, etc.). If it does, the proxy
   → backend path is working.
3. Quick proxy check: `https://<frontend>.vercel.app/api/public/proxy/services`
   should return JSON from the backend.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build error / "No Output Directory named 'dist'" | You forced Output Directory to `dist` — clear it, let Nitro's `.vercel/output` be used |
| Homepage loads but no data | `VITE_API_UPSTREAM` wrong or missing `/api/v1` → fix, **redeploy** |
| `/api/public/proxy/...` returns 502 | Backend down or unreachable (check Render + Atlas), or upstream URL wrong |
| Changed env var, no effect | `VITE_*` is build-time → redeploy |

See also: [README](README.md)
