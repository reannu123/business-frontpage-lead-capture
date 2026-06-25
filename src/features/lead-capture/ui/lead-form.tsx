"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitLeadAction } from "@/features/lead-capture/actions/submit-lead";
import {
  initialLeadFormState,
  type LeadFormState,
  type LeadSubmissionInput,
} from "@/entities/lead/model/schema";
import { contactMethodIds, siteConfig } from "@/shared/config/site";

function FieldError({
  state,
  name,
}: {
  state: LeadFormState;
  name: keyof LeadSubmissionInput;
}) {
  const error = state.fieldErrors?.[name]?.[0];
  return error ? (
    <p className="mt-2 text-sm font-medium text-red-700">{error}</p>
  ) : null;
}

const contactMethodLabels: Record<(typeof contactMethodIds)[number], string> = {
  email: "Email",
  phone: "Phone",
  either: "Either is fine",
};

export function LeadForm() {
  const [state, formAction, pending] = useActionState(
    submitLeadAction,
    initialLeadFormState,
  );

  return (
    <form
      key={state.leadId ?? "lead-form"}
      action={formAction}
      className="grid gap-5"
      noValidate
    >
      <input type="hidden" name="source" value="website" />
      <div className="absolute left-[-100vw]" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status !== "idle" ? (
        <div
          className={
            state.status === "success"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
              : "rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"
          }
          role="status"
          aria-live="polite"
        >
          <div className="flex gap-3">
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
            ) : null}
            <p className="text-sm font-medium leading-6">{state.message}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Full name
          <input
            className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            name="fullName"
            autoComplete="name"
            placeholder="Maria Santos"
            required
          />
          <FieldError state={state} name="fullName" />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Requested service
          <select
            className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            name="requestedService"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            {siteConfig.services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          <FieldError state={state} name="requestedService" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Email
          <input
            className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="maria@example.com"
          />
          <FieldError state={state} name="email" />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Phone
          <input
            className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+63 917 555 0101"
          />
          <FieldError state={state} name="phone" />
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-zinc-900">
          Preferred contact method
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactMethodIds.map((method) => (
            <label
              key={method}
              className="flex h-12 items-center gap-3 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 transition has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50"
            >
              <input
                type="radio"
                name="preferredContactMethod"
                value={method}
                className="h-4 w-4 accent-emerald-700"
                required
              />
              {contactMethodLabels[method]}
            </label>
          ))}
        </div>
        <FieldError state={state} name="preferredContactMethod" />
      </fieldset>

      <label className="grid gap-2 text-sm font-semibold text-zinc-900">
        Message
        <textarea
          className="min-h-32 rounded-md border border-zinc-300 bg-white px-3 py-3 text-base font-normal text-zinc-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          name="message"
          placeholder="Tell us about the space, preferred date, and anything we should know."
          required
        />
        <FieldError state={state} name="message" />
      </label>

      <label className="flex gap-3 text-sm leading-6 text-zinc-700">
        <input
          type="checkbox"
          name="privacyConsent"
          className="mt-1 h-4 w-4 flex-none accent-emerald-700"
          required
        />
        <span>
          BrightNest may contact me about this request. Demo submissions are
          saved to the local lead inbox.
        </span>
      </label>
      <FieldError state={state} name="privacyConsent" />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {pending ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
