# Case-Study Note

## Client Problem

A local cleaning business needs more than a static brochure page. It needs a
simple way to explain services, collect useful quote requests, and follow up
without losing inquiries in a generic inbox.

## Solution

This v1 builds a focused business frontpage for BrightNest Cleaning Co. with:

- Service sections for common cleaning requests
- A validated public lead form
- Honeypot and rate-limit protections
- Local database persistence
- Demo-safe email notification outbox
- Admin inbox with follow-up statuses
- README, environment, verification, and CI setup

## Delivery Choices

- **Next.js App Router:** keeps the marketing page and lead workflow in one
  deployable app.
- **Server Actions:** handle public form submission with server-side validation.
- **Prisma + SQLite:** gives a real local persistence layer while keeping the
  demo easy to clone and run.
- **Demo email outbox:** proves the notification workflow without requiring an
  email provider key before the deployment decision.
- **Single-account admin login:** protects the demo admin inbox without turning
  v1 into a multi-user auth project.

## Result

The app demonstrates a sellable local-business workflow: visitors can request a
cleaning quote, and the business owner can review, contact, qualify, win, or
lose each lead.

Public demo: `https://frontpage.reannu.dev`

## Tradeoffs

- A real client would need a chosen email provider and, if multiple users are
  required, provider-backed admin auth.
- A public multi-instance deployment should use a shared rate limit and hosted
  database.
- Appointment booking belongs in the next showcase rather than this v1.

## Portfolio Role

This project is the first new local-business showcase. It supports freelance
positioning around websites, lead capture, internal admin workflows, and
maintainable delivery.
