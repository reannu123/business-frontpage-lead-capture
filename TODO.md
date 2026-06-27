# Business Frontpage + Lead Capture TODO

Last updated: 2026-06-27

## Project

- Name: Business Frontpage + Lead Capture
- Path: `/home/reannu123/Projects/portfolio/business-frontpage-lead-capture`
- GitHub: `https://github.com/reannu123/business-frontpage-lead-capture`
- Status: active
- Stage: showcase new build
- Portfolio role: First dummy-client showcase for the easiest buyer path: a
  local service business website with lead capture, deployment, documentation,
  and a reusable delivery workflow.

## Dummy Client

- Client type: Cleaning service
- Freelance brand: under Reannu Instrella's personal name for now
- Client goal: get a credible public website that explains services clearly and
  turns visitors into leads.
- Lead capture behavior: submit a contact/request form, send an email
  notification, and save the submission to an admin inbox.

## Current Milestone

Build a production-ready local v1 cleaning-service frontpage with lead capture,
admin lead inbox, real single-account login, SMTP-capable notifications,
Docker self-hosting support, documentation, screenshots, and a short portfolio
case-study note. The selected public launch path is a Docker-backed demo at
`https://frontpage.demo.reannu.dev` using SQLite and demo email mode for v1.

## Work Categories

Use one primary category label on executable tasks:

- `[Dev]`: application code, features, data models, frontend/backend behavior.
- `[DevOps]`: deployment, Docker, CI/CD, DNS, reverse proxy, hosting,
  environment/secrets, monitoring, backups, and production smoke checks.
- `[Docs]`: README, setup guides, deployment notes, screenshots, case studies,
  and handoff material.
- `[QA]`: tests, lint/typecheck, bug reproduction, verification, and regression
  checks.
- `[Design/UX]`: visual polish, layout, interaction flow, accessibility, and
  user-facing content structure.
- `[Business/Ops]`: offers, outreach, portfolio positioning, client workflow,
  retainers, and admin/process work.

## Definition Of Done

- [x] Public business frontpage presents the dummy cleaning service clearly.
- [x] Lead form collects name, email or phone, requested service, preferred
      contact method, and message.
- [x] Successful lead submission shows a friendly confirmation state.
- [x] Lead submission triggers an email notification or documented demo-safe
      email equivalent.
- [x] Lead submission is saved to an admin inbox with basic statuses such as
      new, contacted, qualified, won, and lost.
- [x] Demo data and reset/seed instructions are documented.
- [x] CI verifies lint/build/tests or the closest practical checks for the
      chosen stack.
- [x] Deployment target decision is selected and documented.
- [x] README explains purpose, stack, setup, verification, deployment, known
      limitations, and future improvements.
- [x] Screenshots and a short case-study note explain the client problem,
      solution, tradeoffs, and result.
- [x] Final deployment target is selected.
- [ ] Demo is deployed and smoke-tested at the public URL.

## Now

- [ ] [DevOps] Point `frontpage.demo.reannu.dev` to the chosen Docker host or
      reverse proxy.
- [x] [DevOps] Create the home-server deployment folder with `.env`,
      `.admin-login.txt`, and `compose.deploy.yaml`.
- [x] [DevOps] Pull the GHCR image with `compose.deploy.yaml` and pass the VM
      local health check on `http://localhost:3021/api/health`.
- [ ] [DevOps] Run public health/browser smoke checks and add the live URL to
      the case study or portfolio entry.

## Next

- [ ] [DevOps] Configure real SMTP credentials and domain authentication if
      this demo is upgraded from dummy-client mode to real lead email delivery.
- [ ] [Dev] Re-run `npm audit --omit=dev` and upgrade Next when a stable
      release resolves its bundled PostCSS advisory.

## Later

- [ ] [Dev] Add analytics for visits, conversion rate, and lead source.
- [ ] [Dev] Add basic CMS/editable content sections.
- [ ] [Dev] Add multi-user admin auth only if this becomes more than a
      single-owner lead inbox.
- [ ] [Business/Ops] Add appointment booking as the next separate showcase
      instead of expanding this v1.
- [ ] [Dev] Extract reusable frontpage sections only after this dummy client
      ships.

## Blocked

- Actual public deployment is not complete until DNS/reverse proxy access is
  available and the live URL passes smoke checks.
- Real SMTP provider and sender-domain credentials are intentionally deferred;
  v1 public dummy-client launch uses demo email mode.
- Postgres is intentionally deferred; v1 public dummy-client launch uses the
  persisted SQLite Docker volume.
- `npm audit --omit=dev` still reports a moderate advisory in Next 16.2.9's
  bundled PostCSS dependency; Next 16.2.9 is npm's latest stable version, and
  npm's force fix would downgrade Next, so this is tracked for the next stable
  framework patch.

## Done

- 2026-06-25: Created Next.js 16 / React 19 / TypeScript / Tailwind app with a
  light FSD-style structure.
- 2026-06-25: Added dummy-client brief and content model for BrightNest
  Cleaning Co. in `docs/dummy-client-brief.md` and `src/shared/config/site.ts`.
- 2026-06-25: Implemented public frontpage, generated hero image asset,
  validated lead form, `/api/leads`, `/api/health`, Prisma-backed lead
  persistence, demo notification outbox, seeded demo leads, and admin inbox.
- 2026-06-25: Added `.env.example`, README, deployment notes, case-study note,
  CI workflow, unit tests, Playwright browser test, and screenshots under
  `docs/screenshots/`.
- 2026-06-25: Added SMTP notification support with demo mode, real
  single-account admin login, signed session cookies, admin password hashing,
  Dockerfile, development Compose, production-like Compose, and Docker
  self-hosting docs.
- 2026-06-25 verification: `npm run lint`, `npm run typecheck`,
  `npm run test`, `npm run build`, and `npm run test:e2e` passed locally.
- 2026-06-25 Docker verification: `docker compose config --quiet`,
  `docker compose -f compose.prod.yaml config --quiet`, production image build,
  and disposable container `/api/health` smoke test passed locally.
- 2026-06-25 decision: Selected a hybrid public launch path:
  `https://frontpage.demo.reannu.dev`, Dockerized runtime, persisted SQLite,
  demo email mode, and SMTP/Postgres deferred until a real-provider or
  multi-instance requirement appears.
- 2026-06-26: Generated home-server launch credentials in ignored local file
  `.env.home-server.local` and documented Cloudflare Tunnel / Nginx Proxy
  Manager deployment notes.
- 2026-06-26: Published the public GitHub repository at
  `https://github.com/reannu123/business-frontpage-lead-capture`.
- 2026-06-27: Added GHCR image publishing, pull-based `compose.deploy.yaml`,
  and a deployment runbook so the home server can deploy without cloning the
  app source.
- 2026-06-27 VM deploy evidence: `pm-docker` created
  `~/deployments/business-frontpage-lead-capture`, pulled
  `ghcr.io/reannu123/business-frontpage-lead-capture:main`, started
  `business-frontpage-lead-capture-app-1`, and passed
  `curl -fsS http://localhost:3021/api/health`.
