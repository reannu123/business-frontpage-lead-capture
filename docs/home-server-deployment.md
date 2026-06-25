# Home Server Deployment

Selected path:

- Host: home server
- Public hostname: `frontpage.demo.reannu.dev`
- Edge/DNS: Cloudflare
- Ingress: Cloudflare Tunnel, with Nginx Proxy Manager available if you want
  one dashboard for all local apps
- App runtime: Docker Compose production stack
- Host port: `3021`

## 1. Publish The Code

Clone or pull the GitHub repository on the home server, then enter the project
folder:

```bash
git clone git@github.com:reannu123/business-frontpage-lead-capture.git
cd business-frontpage-lead-capture
```

## 2. Add The Launch Environment

Copy the generated local env file from this workstation to the home server as
`.env`, or recreate it from `.env.production.example`.

The app only needs the password hash at runtime. Keep the generated admin
password somewhere private so you can log in at `/admin`.

## 3. Start The App

```bash
docker compose -f compose.prod.yaml up --build -d
docker compose -f compose.prod.yaml ps
curl -fsS http://localhost:3021/api/health
```

## 4. Cloudflare Tunnel

In Cloudflare Zero Trust, add a public hostname:

- Subdomain: `frontpage.demo`
- Domain: `reannu.dev`
- Service type: `HTTP`
- Service URL: `localhost:3021`

This is the simplest path for the first demo because Cloudflare handles the
public hostname and TLS while the app stays bound to the home server.

## 5. Optional Nginx Proxy Manager Path

If you prefer all local apps to pass through Nginx Proxy Manager:

1. In Nginx Proxy Manager, add a proxy host for `frontpage.demo.reannu.dev`.
2. Forward to the home-server IP and port `3021`.
3. In Cloudflare Tunnel, point the public hostname to Nginx Proxy Manager
   instead of directly to `localhost:3021`.

Use this route if Nginx Proxy Manager is already your single place for local
proxy rules. For this single demo, direct Tunnel-to-app is simpler.

## 6. Public Smoke Check

After the hostname is live:

```bash
curl -fsS https://frontpage.demo.reannu.dev/api/health
```

Then submit one test lead on the public page and confirm it appears in
`https://frontpage.demo.reannu.dev/admin`.
