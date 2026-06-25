import { z } from "zod";
import { contactMethodIds, serviceIds } from "@/shared/config/site";

function emptyToUndefined(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const optionalEmail = z.preprocess(
  emptyToUndefined,
  z.string().email("Enter a valid email address.").max(160).optional(),
);

const optionalPhone = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .regex(/^[+\d][+\d\s().-]{6,23}$/, "Enter a valid phone number.")
    .max(32)
    .optional(),
);

export const leadSubmissionSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your name.")
      .max(90, "Keep the name under 90 characters."),
    email: optionalEmail,
    phone: optionalPhone,
    requestedService: z.enum(serviceIds, "Choose a service."),
    preferredContactMethod: z.enum(
      contactMethodIds,
      "Choose a preferred contact method.",
    ),
    message: z
      .string()
      .trim()
      .min(10, "Add a short note about the space or timing.")
      .max(900, "Keep the message under 900 characters."),
    privacyConsent: z.preprocess(
      (value) => (value === true ? "on" : value),
      z.literal("on", "Confirm that BrightNest can contact you."),
    ),
    source: z.string().trim().max(80).optional().default("website"),
    company: z.string().trim().max(120).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.email && !value.phone) {
      ctx.addIssue({
        code: "custom",
        message: "Add an email address or phone number.",
        path: ["email"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Add an email address or phone number.",
        path: ["phone"],
      });
    }
  });

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
  leadId?: string;
  fieldErrors?: Partial<Record<keyof LeadSubmissionInput, string[]>>;
};

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
};

export function readLeadFormData(formData: FormData) {
  return {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    requestedService: formData.get("requestedService"),
    preferredContactMethod: formData.get("preferredContactMethod"),
    message: formData.get("message"),
    privacyConsent: formData.get("privacyConsent"),
    source: formData.get("source") ?? "website",
    company: formData.get("company") ?? "",
  };
}

export function parseLeadSubmission(input: unknown) {
  return leadSubmissionSchema.safeParse(input);
}
