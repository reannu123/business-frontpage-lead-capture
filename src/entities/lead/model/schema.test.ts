import { describe, expect, it } from "vitest";
import { parseLeadSubmission } from "./schema";

const validLead = {
  fullName: "Maria Santos",
  email: "maria@example.com",
  phone: "",
  requestedService: "deep-cleaning",
  preferredContactMethod: "email",
  message: "We need a deep clean for a two-bedroom condo next Friday.",
  privacyConsent: "on",
  source: "test",
  company: "",
};

describe("leadSubmissionSchema", () => {
  it("accepts a valid lead with email-only contact", () => {
    const result = parseLeadSubmission(validLead);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("maria@example.com");
      expect(result.data.phone).toBeUndefined();
    }
  });

  it("requires either email or phone", () => {
    const result = parseLeadSubmission({
      ...validLead,
      email: "",
      phone: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email?.[0]).toContain("email address or phone number");
      expect(errors.phone?.[0]).toContain("email address or phone number");
    }
  });

  it("rejects invalid services", () => {
    const result = parseLeadSubmission({
      ...validLead,
      requestedService: "pressure-washing",
    });

    expect(result.success).toBe(false);
  });

  it("requires consent before saving the lead", () => {
    const result = parseLeadSubmission({
      ...validLead,
      privacyConsent: "",
    });

    expect(result.success).toBe(false);
  });
});
