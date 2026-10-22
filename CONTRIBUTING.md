# Contributing — Srikrishna Seva Niketan Frontend

## Getting set up

1. `cp .env.example .env` → set `VITE_API_UPSTREAM` to your backend origin.
2. `npm install` (or `bun install`)
3. `npm run dev` → http://localhost:8080 (needs the backend reachable).

## Conventions

- **Styling:** Tailwind + shadcn/ui primitives. Keep sections responsive and
  consistent with the existing design system; support light & dark where used.
- **Data:** public API calls go through the server proxy (`/api/public/proxy`),
  never straight to the backend from the browser.
- **Forms:** React Hook Form. Validate and show friendly errors.
- Type everything; run Prettier (`npm run format`) before committing.

## Branching & commits

- Branch from `main`: `feat/…`, `fix/…`, `chore/…`.
- [Conventional Commits](https://www.conventionalcommits.org/): `feat: add equipment page`.

## Before you open a PR

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] No secrets / `.env` in tracked files (remember: `VITE_*` is public)

CI must be green. Fill in the PR template.
