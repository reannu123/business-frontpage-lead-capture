# Launch Plan

The selected v1 launch path is a hybrid portfolio demo:

- Public demo URL: `https://frontpage.reannu.dev`
- Host: home server
- Edge/DNS: Cloudflare
- Ingress: Cloudflare Tunnel, with Nginx Proxy Manager optional as the local
  proxy dashboard
- Runtime: Dockerized Next.js standalone app behind TLS, with GitHub Actions
  publishing the image to GHCR
- Database: SQLite persisted in the Docker volume for the first public demo
- Email mode: `demo`, so submissions are saved and visible without contacting a
  real email provider
- Self-hosting proof: `Dockerfile`, `docker-compose.yml`, `compose.prod.yaml`,
  and `compose.deploy.yaml` stay part of the deliverable

This keeps the first dummy-client showcase easy to deploy and explain while
still proving the self-hostable delivery workflow.

## Launch Steps

1. Point `frontpage.reannu.dev` through Cloudflare Tunnel to the home
   server.
2. Copy `.env.production.example` or `.env.home-server.local` to `.env` on the
   home server.
3. Generate a launch-only admin password hash:

   ```bash
   npm run auth:hash -- "replace-with-a-strong-password"
   ```

4. Set `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, and `NEXT_PUBLIC_SITE_URL` in
   `.env`.
5. Pull and start the deploy stack:

   ```bash
   docker compose -f compose.deploy.yaml pull
   docker compose -f compose.deploy.yaml up -d
   ```

6. Verify the health endpoint:

   ```bash
   curl -fsS https://frontpage.reannu.dev/api/health
   ```

7. Submit a test lead and confirm it appears in `/admin`.

See `docs/home-server-deployment.md` for the Cloudflare Tunnel and Nginx Proxy
Manager details. See `docs/deployment-runbook.md` for update deploys,
rollback, logs, and data notes.

## Later Upgrade Gates

- Move to Postgres if the demo runs on a platform that does not support a
  persistent SQLite volume, needs multiple app instances, or needs managed
  backups.
- Switch to `EMAIL_DELIVERY_MODE=smtp` when a real sender domain and provider
  credentials are selected.
- Add analytics after the first public URL is live and linked from the
  portfolio.
