# Deployment Notes

The selected v1 launch path is a hybrid portfolio demo: a public Docker-backed
demo at `https://frontpage.demo.reannu.dev`, with self-hosting instructions kept
as part of the client-delivery proof.

## Current Local Runtime

- Next.js app server
- Prisma 6 client
- SQLite demo database at `prisma/dev.db`
- Demo-safe notification outbox, with SMTP support when configured
- Admin login using `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and a signed session
  cookie

## Selected Target

### Dockerized Node Runtime

Good fit because the project should show both a public demo and a self-hostable
delivery path.

Current support:

- Multi-stage Dockerfile with a development target and standalone production
  target
- `docker-compose.yml` for development
- `compose.prod.yaml` for production-like self-hosting
- SQLite persisted in a named volume
- `/api/health` health check

Selected defaults:

- Public URL target: `https://frontpage.demo.reannu.dev`
- Database: SQLite volume for the first public demo
- Email mode: `demo`
- TLS: handled by the chosen reverse proxy or public hosting edge
- Postgres: deferred until the demo needs managed backups, multiple instances,
  or a serverless hosted platform

### Static Site Plus Separate Backend

Not recommended for this v1 because the lead workflow and admin inbox are the
point of the showcase.

## Production Hardening Before Public Use

- Replace the demo admin password hash with a real secret.
- Choose a real SMTP provider and configure SPF/DKIM/DMARC when switching from
  demo mode to real email.
- Move from SQLite to Postgres for hosted multi-user or multi-instance
  deployment.
- Add shared rate limiting if running more than one app instance.
- Set a real `NEXT_PUBLIC_SITE_URL`.
- Confirm privacy copy and data retention rules.
- Add backup and reset instructions for the chosen database.
- Re-run `npm audit --omit=dev` and upgrade Next when a stable release resolves
  the bundled PostCSS advisory present in Next 16.2.9.

## Current Decision

Use the Docker-backed public demo path first. The next milestone is deployment
and smoke verification at `https://frontpage.demo.reannu.dev`.
