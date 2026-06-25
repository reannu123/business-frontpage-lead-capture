import Link from "next/link";
import { Inbox, MailCheck, Trophy, UserRoundCheck } from "lucide-react";
import { logoutAction } from "@/features/admin-auth/actions/login";
import { updateLeadStatusAction } from "@/features/admin-leads/actions/update-lead-status";
import {
  getLeadStatusMeta,
  leadStatuses,
  type LeadStatus,
} from "@/entities/lead/model/status";
import type { LeadWithOutbox } from "@/entities/lead/api/lead-service";
import { getServiceLabel } from "@/shared/config/site";
import { cn, formatDateTime, pluralize } from "@/shared/lib/utils";

type Metrics = {
  total: number;
  newLeads: number;
  contacted: number;
  won: number;
};

type Props = {
  leads: LeadWithOutbox[];
  metrics: Metrics;
  adminEmail: string;
  statusFilter: LeadStatus | "ALL";
  updatedLeadId?: string;
};

const metricCards = [
  { key: "total", label: "Total leads", icon: Inbox },
  { key: "newLeads", label: "New", icon: MailCheck },
  { key: "contacted", label: "Contacted", icon: UserRoundCheck },
  { key: "won", label: "Won", icon: Trophy },
] as const;

export function AdminLeadInbox({
  leads,
  metrics,
  adminEmail,
  statusFilter,
  updatedLeadId,
}: Props) {
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Back to site
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-normal text-zinc-950">
              Lead inbox
            </h1>
            <p className="mt-2 text-zinc-600">
              Track new cleaning-service requests from first inquiry to outcome.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="rounded-md bg-white px-4 py-3 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200">
              {pluralize(leads.length, "visible lead")}
            </p>
            <form action={logoutAction}>
              <button
                type="submit"
                className="h-11 rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950 hover:text-zinc-950"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-500">Signed in as {adminEmail}</p>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.key}
                className="rounded-lg border border-zinc-200 bg-white p-5"
              >
                <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-zinc-500">
                  {metric.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-zinc-950">
                  {metrics[metric.key]}
                </p>
              </article>
            );
          })}
        </section>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Lead status filters">
          <Link
            href="/admin"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold ring-1",
              statusFilter === "ALL"
                ? "bg-zinc-950 text-white ring-zinc-950"
                : "bg-white text-zinc-700 ring-zinc-200 hover:text-zinc-950",
            )}
          >
            All
          </Link>
          {leadStatuses.map((status) => (
            <Link
              key={status.value}
              href={`/admin?status=${status.value}`}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold ring-1",
                statusFilter === status.value
                  ? "bg-zinc-950 text-white ring-zinc-950"
                  : "bg-white text-zinc-700 ring-zinc-200 hover:text-zinc-950",
              )}
            >
              {status.label}
            </Link>
          ))}
        </nav>

        <section className="mt-6 grid gap-4">
          {leads.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
              <p className="text-lg font-semibold text-zinc-950">
                No leads match this filter.
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Submit a demo request from the public page or change filters.
              </p>
            </div>
          ) : (
            leads.map((lead) => {
              const status = getLeadStatusMeta(lead.status);
              const latestOutbox = lead.outboxMessages[0];
              const wasUpdated = updatedLeadId === lead.id;

              return (
                <article
                  key={lead.id}
                  className={cn(
                    "rounded-lg border bg-white p-5 shadow-sm",
                    wasUpdated
                      ? "border-emerald-400 ring-2 ring-emerald-100"
                      : "border-zinc-200",
                  )}
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold text-zinc-950">
                          {lead.fullName}
                        </h2>
                        <span
                          className={cn(
                            "rounded-md px-2.5 py-1 text-xs font-bold ring-1",
                            status.tone,
                          )}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-zinc-600">
                        {getServiceLabel(lead.requestedService)} -{" "}
                        {formatDateTime(lead.createdAt)}
                      </p>
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-700">
                        {lead.message}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
                        <p>Email: {lead.email ?? "not provided"}</p>
                        <p>Phone: {lead.phone ?? "not provided"}</p>
                        <p>Preferred: {lead.preferredContactMethod}</p>
                        <p>Source: {lead.source}</p>
                      </div>

                      {latestOutbox ? (
                        <p className="mt-4 rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-600 ring-1 ring-zinc-200">
                          Notification: {latestOutbox.status.toLowerCase()} via{" "}
                          {latestOutbox.deliveryMode}
                        </p>
                      ) : null}
                    </div>

                    <form
                      action={updateLeadStatusAction}
                      className="grid content-start gap-3 rounded-lg bg-zinc-50 p-4 ring-1 ring-zinc-200"
                    >
                      <input type="hidden" name="leadId" value={lead.id} />
                      <label className="grid gap-2 text-sm font-semibold text-zinc-900">
                        Status
                        <select
                          name="status"
                          defaultValue={lead.status}
                          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm font-normal text-zinc-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                        >
                          {leadStatuses.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="submit"
                        className="h-11 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        Save status
                      </button>
                    </form>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
