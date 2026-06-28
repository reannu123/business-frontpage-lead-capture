# Deployment Runbook

This runbook is for the public demo at
`https://frontpage.reannu.dev`.

The selected hostname is one level under `reannu.dev` so it fits the existing
Cloudflare wildcard certificate and tunnel rule.

## Deployment Model

- GitHub Actions verifies the app, builds the production Docker image, and
  publishes it to GitHub Container Registry.
- The home server keeps only deployment files and secrets, not the app source.
- Compose files live under `/docker/compose`.
- Persistent app data lives under `/docker/appdata`.
- Backups live under `/docker/backups`.
- Docker Compose pulls the selected image tag and runs it with a persisted
  SQLite bind mount.
- Cloudflare Tunnel routes `frontpage.reannu.dev` to Nginx Proxy Manager on the
  Raspberry Pi, which forwards to `pm-docker` at `192.168.0.125:3021`.

## Image Tags

The CI workflow publishes:

- `ghcr.io/reannu123/business-frontpage-lead-capture:main`
- `ghcr.io/reannu123/business-frontpage-lead-capture:<commit-sha>`

Use `main` for the simple demo path. Use a commit SHA when you want a pinned
deployment or rollback target.

After the first image publish, confirm the GHCR package is public if the home
server should pull without logging in. If you keep the package private, log in
on the home server with a token that has `read:packages` access:

```bash
docker login ghcr.io
```

## First Deploy On The Home Server

Create a deployment directory:

```bash
mkdir -p /docker/compose/business-frontpage-lead-capture
mkdir -p /docker/appdata/business-frontpage-lead-capture/sqlite
mkdir -p /docker/backups/business-frontpage-lead-capture
cd /docker/compose/business-frontpage-lead-capture
```

Add these files:

- `.env`
- `compose.deploy.yaml`

The `.env` file should come from the generated `.env.home-server.local` values
or from `.env.production.example`.

Start the app:

```bash
docker compose -f compose.deploy.yaml pull
docker compose -f compose.deploy.yaml up -d
docker compose -f compose.deploy.yaml ps
curl -fsS http://localhost:3021/api/health
```

Then configure Cloudflare Tunnel:

- Public hostname: `frontpage.reannu.dev`
- Service type: `HTTP`
- Service URL: Nginx Proxy Manager on the Raspberry Pi

Run the public smoke check:

```bash
curl -fsS https://frontpage.reannu.dev/api/health
```

Submit one test lead through the public page and confirm it appears in
`https://frontpage.reannu.dev/admin`.

## Update Deploy

After a new image is published:

```bash
cd /docker/compose/business-frontpage-lead-capture
docker compose -f compose.deploy.yaml pull
docker compose -f compose.deploy.yaml up -d
docker compose -f compose.deploy.yaml ps
curl -fsS https://frontpage.reannu.dev/api/health
```

## Rollback

Set `IMAGE_TAG` in `.env` to a previous commit SHA tag:

```bash
IMAGE_TAG="previous-commit-sha"
```

Then redeploy:

```bash
docker compose -f compose.deploy.yaml pull
docker compose -f compose.deploy.yaml up -d
curl -fsS https://frontpage.reannu.dev/api/health
```

## Logs

```bash
docker compose -f compose.deploy.yaml logs -f --tail=100 app
```

## Data Notes

SQLite is persisted at:

```bash
/docker/appdata/business-frontpage-lead-capture/sqlite
```

Backups for this app belong in:

```bash
/docker/backups/business-frontpage-lead-capture
```

Back up or snapshot the SQLite appdata directory before destructive resets once
the public demo has real test leads you care about keeping.
