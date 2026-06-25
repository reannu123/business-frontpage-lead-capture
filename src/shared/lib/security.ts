import "server-only";
import crypto from "node:crypto";

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    headers.get("fly-client-ip") ??
    "unknown"
  );
}

export function hashIp(ip: string) {
  if (ip === "unknown") {
    return null;
  }

  return crypto.createHash("sha256").update(ip).digest("hex");
}
