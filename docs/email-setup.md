# Email Setup

The app defaults to demo-safe email delivery:

```bash
EMAIL_DELIVERY_MODE="demo"
```

In demo mode, a lead is saved, an outbox record is created, and no external
email provider is contacted.

The selected first public dummy-client launch keeps `EMAIL_DELIVERY_MODE="demo"`.
That makes the lead workflow visible in the admin inbox without sending test
messages from a fake business identity.

## SMTP Delivery

Use SMTP first because it works in hosted and self-hosted deployments. Most
providers support SMTP, including transactional email services and many domain
mailboxes.

Set:

```bash
EMAIL_DELIVERY_MODE="smtp"
LEAD_NOTIFICATION_EMAIL="owner@example.com"
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="smtp-user@example.com"
SMTP_PASSWORD="provider-password-or-app-password"
SMTP_FROM="BrightNest Cleaning Co. <hello@example.com>"
```

Use `SMTP_SECURE="true"` for port `465`. Use `SMTP_SECURE="false"` for port
`587` with STARTTLS.

## Provider Checklist

1. Create a mailbox or transactional sender for the domain.
2. Verify the sending domain if the provider requires it.
3. Generate an SMTP password or app password.
4. Put SMTP settings in `.env` or deployment secrets.
5. Submit a test lead.
6. Check the admin inbox notification row:
   - `sent via smtp` means delivery succeeded.
   - `failed via smtp` means the lead was saved but SMTP failed.

## Recommended Production Notes

- Do not commit real SMTP credentials.
- Use a domain sender such as `hello@yourdomain.com`.
- Keep `LEAD_NOTIFICATION_EMAIL` as the inbox owner who should receive new
  lead alerts.
- If deliverability matters, configure SPF, DKIM, and DMARC with the email
  provider.
