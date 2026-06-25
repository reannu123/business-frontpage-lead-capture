import { redirect } from "next/navigation";
import { AdminLeadInbox } from "@/widgets/admin/admin-lead-inbox";
import {
  getLeadMetrics,
  listLeads,
} from "@/entities/lead/api/lead-service";
import { isLeadStatus, type LeadStatus } from "@/entities/lead/model/status";
import { getAdminSession } from "@/shared/lib/admin-session";

export const dynamic = "force-dynamic";

type AdminSearchParams = {
  status?: string;
  updated?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  const params = await searchParams;
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const statusFilter: LeadStatus | "ALL" = isLeadStatus(params.status ?? "")
    ? (params.status as LeadStatus)
    : "ALL";

  const [leads, metrics] = await Promise.all([
    listLeads({ status: statusFilter }),
    getLeadMetrics(),
  ]);

  return (
    <AdminLeadInbox
      leads={leads}
      metrics={metrics}
      adminEmail={session.email}
      statusFilter={statusFilter}
      updatedLeadId={params.updated}
    />
  );
}
