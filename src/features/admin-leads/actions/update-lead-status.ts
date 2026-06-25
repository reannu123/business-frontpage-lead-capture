"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateLeadStatus } from "@/entities/lead/api/lead-service";
import { isLeadStatus } from "@/entities/lead/model/status";
import { getAdminSession } from "@/shared/lib/admin-session";

export async function updateLeadStatusAction(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "");
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized lead status update.");
  }

  if (!leadId || !isLeadStatus(status)) {
    throw new Error("Invalid lead status update.");
  }

  await updateLeadStatus(leadId, status);
  revalidatePath("/admin");
  redirect(`/admin?updated=${leadId}`);
}
