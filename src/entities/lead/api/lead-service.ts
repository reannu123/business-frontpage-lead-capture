import "server-only";
import type { Lead } from "@prisma/client";
import { leadStatusValues, type LeadStatus } from "@/entities/lead/model/status";
import type { LeadSubmissionInput } from "@/entities/lead/model/schema";
import { queueLeadNotification } from "@/entities/lead/api/notification-service";
import { prisma } from "@/shared/lib/prisma";

export type CreateLeadContext = {
  ipHash?: string | null;
  userAgent?: string | null;
};

export async function createLead(
  input: LeadSubmissionInput,
  context: CreateLeadContext = {},
) {
  const lead = await prisma.lead.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      requestedService: input.requestedService,
      preferredContactMethod: input.preferredContactMethod,
      message: input.message,
      source: input.source,
      ipHash: context.ipHash,
      userAgent: context.userAgent?.slice(0, 240),
    },
  });

  await queueLeadNotification(lead);

  return lead;
}

export type LeadFilter = {
  status?: LeadStatus | "ALL";
};

export async function listLeads(filter: LeadFilter = {}) {
  return prisma.lead.findMany({
    where:
      filter.status && filter.status !== "ALL"
        ? {
            status: filter.status,
          }
        : undefined,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      outboxMessages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!leadStatusValues.includes(status)) {
    throw new Error("Unsupported lead status.");
  }

  return prisma.lead.update({
    where: { id },
    data: { status },
  });
}

export async function getLeadMetrics() {
  const [total, newLeads, contacted, won] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "WON" } }),
  ]);

  return { total, newLeads, contacted, won };
}

export type LeadWithOutbox = Awaited<ReturnType<typeof listLeads>>[number];
export type LeadRecord = Lead;
