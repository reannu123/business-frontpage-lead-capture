import { NextResponse } from "next/server";
import { createLead } from "@/entities/lead/api/lead-service";
import {
  parseLeadSubmission,
  readLeadFormData,
} from "@/entities/lead/model/schema";
import { checkRateLimit } from "@/shared/lib/rate-limit";
import { getClientIp, hashIp } from "@/shared/lib/security";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const rawInput: Record<string, unknown> = contentType.includes(
    "multipart/form-data",
  )
    ? readLeadFormData(await request.formData())
    : { ...((await request.json()) as Record<string, unknown>), source: "api" };

  if (typeof rawInput.company === "string" && rawInput.company.trim()) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const ip = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`api-lead:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      { status: 429 },
    );
  }

  const parsed = parseLeadSubmission(rawInput);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const lead = await createLead(parsed.data, {
    ipHash: hashIp(ip),
    userAgent: request.headers.get("user-agent"),
  });

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}
