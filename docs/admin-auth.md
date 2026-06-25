# Admin Authentication

The admin inbox now uses a real login instead of a token in the URL.

## Local Demo Credentials

```bash
ADMIN_EMAIL="admin@brightnest.example"
ADMIN_PASSWORD="local-demo-admin"
```

`ADMIN_PASSWORD` is used only by Playwright tests and local convenience. The app
verifies `ADMIN_PASSWORD_HASH`.

## Generate A New Password Hash

```bash
npm run auth:hash -- "replace-with-a-strong-password"
```

Copy the output into:

```bash
ADMIN_PASSWORD_HASH="scrypt:..."
```

Set a long random session secret:

```bash
SESSION_SECRET="at-least-32-random-characters"
```

## Session Behavior

- Login creates an httpOnly signed cookie.
- Session lifetime is 8 hours.
- `/admin` redirects unauthenticated users to `/admin/login`.
- Lead status changes check the server-side session before writing.
- Sign out clears the session cookie.

## Production Notes

- Replace the demo password hash before deployment.
- Use deployment secrets instead of committed env files.
- Move to provider-backed auth if a real client needs multiple admin users,
  password reset, audit trails, or roles.
