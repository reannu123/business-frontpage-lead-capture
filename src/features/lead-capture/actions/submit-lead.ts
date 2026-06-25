"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createLead } from "@/entities/lead/api/lead-service";
import {
  type LeadFormState,
  parseLeadSubmission,
  readLeadFormData,
} from "@/entities/lead/model/schema";
import { checkRateLimit } from "@/shared/lib/rate-limit";
import { getClientIp, hashIp } from "@/shared/lib/security";

export async function submitLeadAction(
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const rawInput = readLeadFormData(formData);

  if (rawInput.company) {
    return {
      status: "success",
      message:
        "Thanks. Your request was received and the team will follow up soon.",
    };
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rateLimit = checkRateLimit(`lead:${ip}`);

  if (!rateLimit.allowed) {
    return {
      status: "error",
      message: `Too many requests. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
    };
  }

  const parsed = parseLeadSubmission(rawInput);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const lead = await createLead(parsed.data, {
      ipHash: hashIp(ip),
      userAgent: requestHeaders.get("user-agent"),
    });

    revalidatePath("/admin");

    return {
      status: "success",
      leadId: lead.id,
      message:
        "Request received. BrightNest will review the details and follow up soon.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message:
        "Something went wrong while saving the request. Please try again.",
    };
  }
}
