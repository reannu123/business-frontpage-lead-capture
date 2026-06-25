import "server-only";
import nodemailer from "nodemailer";

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

function getSmtpPort() {
  const rawPort = process.env.SMTP_PORT ?? "587";
  const port = Number.parseInt(rawPort, 10);

  if (Number.isNaN(port)) {
    throw new Error("SMTP_PORT must be a number.");
  }

  return port;
}

function isSmtpSecure() {
  return process.env.SMTP_SECURE === "true" || getSmtpPort() === 465;
}

function requireSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host) {
    throw new Error("SMTP_HOST is required when EMAIL_DELIVERY_MODE=smtp.");
  }

  return {
    host,
    port: getSmtpPort(),
    secure: isSmtpSecure(),
    user,
    password,
  };
}

export function createSmtpTransporter() {
  const config = requireSmtpConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth:
      config.user && config.password
        ? {
            user: config.user,
            pass: config.password,
          }
        : undefined,
  });
}

export async function sendEmail(message: EmailMessage) {
  const from =
    process.env.SMTP_FROM ??
    process.env.SMTP_USER ??
    process.env.LEAD_NOTIFICATION_EMAIL;

  if (!from) {
    throw new Error("SMTP_FROM or SMTP_USER is required to send email.");
  }

  const transporter = createSmtpTransporter();

  try {
    await transporter.verify();
    return await transporter.sendMail({
      from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  } finally {
    transporter.close();
  }
}
