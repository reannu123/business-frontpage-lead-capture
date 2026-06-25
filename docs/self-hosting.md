# Self-Hosting With Docker

The selected v1 launch path is a Docker-backed public demo at
`https://frontpage.demo.reannu.dev` on the home server. Docker is useful here
because the demo should prove clone-and-run delivery and remain self-hostable
on a home server, VPS, or Docker-capable host.

## Development Compose

```bash
cp .env.example .env
docker compose up --build
```

The dev compose file runs `next dev`, keeps `node_modules` and `.next` in named
volumes, and stores SQLite data in a named volume.

## Production-Like Compose

```bash
cp .env.production.example .env
npm run auth:hash -- "replace-with-a-strong-password"
# update ADMIN_PASSWORD_HASH and SESSION_SECRET in .env
docker compose -f compose.prod.yaml up --build -d
```

Open:

```text
http://localhost:3000
```

Health check:

```bash
curl -fsS http://localhost:3000/api/health
```

## Demo Data

By default, production-like Compose does not seed demo leads. To seed demo data:

```bash
SEED_DEMO_DATA=true docker compose -f compose.prod.yaml up --build
```

## Persistent Data

SQLite is stored in the `sqlite_data` named volume at:

```text
/app/prisma/data/dev.db
```

SQLite is the selected database for the first public dummy-client demo. Prefer
Postgres once multiple instances, managed backups, or serverless hosting matter.

## Deployment Notes

- Set `NEXT_PUBLIC_SITE_URL` to `https://frontpage.demo.reannu.dev`.
- Keep `EMAIL_DELIVERY_MODE=demo` for the first public dummy-client demo.
- Set `EMAIL_DELIVERY_MODE=smtp` and provide SMTP credentials only when real
  email delivery is intentionally enabled.
- Replace demo admin credentials.
- Put the app behind TLS before collecting real leads.
- Back up the SQLite volume or move to Postgres.
