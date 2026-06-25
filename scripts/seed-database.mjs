import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoLeads = [
  {
    fullName: "Mara Santos",
    email: "mara@example.com",
    phone: "+63 917 555 0101",
    requestedService: "deep-cleaning",
    preferredContactMethod: "email",
    message:
      "We need a one-time deep clean for a two-bedroom condo before relatives visit next weekend.",
    status: "NEW",
    source: "seed",
  },
  {
    fullName: "Ramon Lee",
    email: "ramon@example.com",
    phone: "+63 998 555 0199",
    requestedService: "office-cleaning",
    preferredContactMethod: "phone",
    message:
      "Looking for weekly office cleaning for a small studio space in Ortigas. Please send availability.",
    status: "CONTACTED",
    source: "seed",
  },
  {
    fullName: "Alyssa Cruz",
    email: "alyssa@example.com",
    phone: null,
    requestedService: "move-in-out",
    preferredContactMethod: "email",
    message:
      "Move-out cleaning for a townhouse in Quezon City. Target date is the last Friday of the month.",
    status: "QUALIFIED",
    source: "seed",
  },
];

async function main() {
  await prisma.emailOutbox.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of demoLeads) {
    const created = await prisma.lead.create({ data: lead });

    await prisma.emailOutbox.create({
      data: {
        leadId: created.id,
        to: process.env.LEAD_NOTIFICATION_EMAIL ?? "owner@brightnest.example",
        subject: `New ${lead.requestedService} lead from ${lead.fullName}`,
        preview: lead.message.slice(0, 140),
        body: `${lead.fullName} requested ${lead.requestedService}.\n\n${lead.message}`,
        deliveryMode: "demo",
        status: "SENT",
        sentAt: new Date(),
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
