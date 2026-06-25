import "server-only";
import type { Lead } from "@prisma/client";
import { getServiceLabel, siteConfig } from "@/shared/config/site";
import { sendEmail } from "@/shared/lib/email";
import { prisma } from "@/shared/lib/prisma";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function queueLeadNotification(lead: Lead) {
  const deliveryMode = process.env.EMAIL_DELIVERY_MODE ?? "demo";
  const recipient =
    process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.contact.email;
  const serviceLabel = getServiceLabel(lead.requestedService);
  const subject = `New ${serviceLabel} lead from ${lead.fullName}`;
  const preview = `${lead.fullName} asked about ${serviceLabel}.`;
  const body = [
    `New lead for ${siteConfig.name}`,
    "",
    `Name: ${lead.fullName}`,
    `Service: ${serviceLabel}`,
    `Preferred contact: ${lead.preferredContactMethod}`,
    `Email: ${lead.email ?? "not provided"}`,
    `Phone: ${lead.phone ?? "not provided"}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");
  const html = `
    <h1>New lead for ${siteConfig.name}</h1>
    <p><strong>Name:</strong> ${escapeHtml(lead.fullName)}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Preferred contact:</strong> ${escapeHtml(lead.preferredContactMethod)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email ?? "not provided")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone ?? "not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(lead.message).replaceAll("\n", "<br />")}</p>
  `;

  const isDemoMode = deliveryMode === "demo";

  const outbox = await prisma.emailOutbox.create({
    data: {
      leadId: lead.id,
      to: recipient,
      subject,
      preview,
      body,
      deliveryMode,
      status: isDemoMode ? "SENT" : "QUEUED",
      sentAt: isDemoMode ? new Date() : null,
    },
  });

  if (isDemoMode) {
    console.info(`[lead-notification:demo] ${subject} -> ${recipient}`);
    return outbox;
  }

  if (deliveryMode !== "smtp") {
    return prisma.emailOutbox.update({
      where: { id: outbox.id },
      data: {
        status: "FAILED",
        error: `Unsupported EMAIL_DELIVERY_MODE: ${deliveryMode}`,
      },
    });
  }

  try {
    await sendEmail({
      to: recipient,
      subject,
      text: body,
      html,
    });

    return prisma.emailOutbox.update({
      where: { id: outbox.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown SMTP delivery error.";
    console.error(`[lead-notification:smtp] ${message}`);

    return prisma.emailOutbox.update({
      where: { id: outbox.id },
      data: {
        status: "FAILED",
        error: message,
      },
    });
  }
}
