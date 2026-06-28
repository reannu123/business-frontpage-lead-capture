# Home Server Deployment

Selected path:

- Host: home server
- Public hostname: `frontpage.reannu.dev`
- Edge/DNS: Cloudflare
- Ingress: Cloudflare Tunnel, with Nginx Proxy Manager available if you want
  one dashboard for all local apps
- App runtime: Docker Compose deploy stack pulling from GHCR
- Host port: `3021`

## 1. Publish The Image

Push to `main` or `master` and let GitHub Actions publish the production image
to GitHub Container Registry:

- `ghcr.io/reannu123/business-frontpage-lead-capture:main`
- `ghcr.io/reannu123/business-frontpage-lead-capture:<commit-sha>`

The home server does not need the app source code for the selected deploy path.
After the first publish, confirm the GHCR package is public or log in on the
home server with a token that has `read:packages` access.

## 2. Add The Launch Environment

Create the deployment, appdata, and backup folders on the home server, then add
`.env` and `compose.deploy.yaml`:

```bash
mkdir -p /docker/compose/business-frontpage-lead-capture
mkdir -p /docker/appdata/business-frontpage-lead-capture/sqlite
mkdir -p /docker/backups/business-frontpage-lead-capture
cd /docker/compose/business-frontpage-lead-capture
```

Copy the generated local env file from this workstation to the home server as
`.env`, or recreate it from `.env.production.example`. Copy
`compose.deploy.yaml` from the repository into this deployment folder.

The app only needs the password hash at runtime. Keep the generated admin
password somewhere private so you can log in at `/admin`.

SQLite is bind-mounted from:

```bash
/docker/appdata/business-frontpage-lead-capture/sqlite
```

## 3. Start The App

```bash
docker compose -f compose.deploy.yaml pull
docker compose -f compose.deploy.yaml up -d
docker compose -f compose.deploy.yaml ps
curl -fsS http://localhost:3021/api/health
```

## 4. Cloudflare Tunnel

In Cloudflare Zero Trust, add a public hostname:

- Subdomain: `frontpage`
- Domain: `reannu.dev`
- Service type: `HTTP`
- Service URL: the Nginx Proxy Manager origin or Docker host, depending on the
  selected ingress path

This is the simplest path for the first demo because Cloudflare handles the
public hostname and TLS while the app stays bound to the home server.

Note: `frontpage.reannu.dev` is intentionally one level under `reannu.dev` so
it fits the existing Cloudflare wildcard certificate and tunnel rule. A nested
hostname such as `frontpage.demo.reannu.dev` needs separate Cloudflare
certificate coverage.

## 5. Optional Nginx Proxy Manager Path

If you prefer all local apps to pass through Nginx Proxy Manager:

1. In Nginx Proxy Manager, add a proxy host for `frontpage.reannu.dev`.
2. Forward to the home-server IP and port `3021`.
3. In Cloudflare Tunnel, point the public hostname to Nginx Proxy Manager
   instead of directly to `localhost:3021`.

Use this route if Nginx Proxy Manager is already your single place for local
proxy rules. For this single demo, direct Tunnel-to-app is simpler.

## 6. Public Smoke Check

After the hostname is live:

```bash
curl -fsS https://frontpage.reannu.dev/api/health
```

Then submit one test lead on the public page and confirm it appears in
`https://frontpage.reannu.dev/admin`.

See `docs/deployment-runbook.md` for update deploys, rollback, logs, and data
notes.
