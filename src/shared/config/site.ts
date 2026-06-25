export const serviceIds = [
  "standard-cleaning",
  "deep-cleaning",
  "move-in-out",
  "office-cleaning",
  "post-renovation",
] as const;

export const contactMethodIds = ["email", "phone", "either"] as const;

export const siteConfig = {
  name: "BrightNest Cleaning Co.",
  shortName: "BrightNest",
  tagline: "Reliable home and small-office cleaning across Metro Manila.",
  description:
    "A demo cleaning-service website with lead capture, admin follow-up, and a reusable freelance delivery workflow.",
  serviceArea: "Quezon City, Pasig, Mandaluyong, Taguig, and nearby Metro Manila areas",
  contact: {
    phone: "+63 917 220 0411",
    email: "hello@brightnest.example",
    responseTime: "Replies within 1 business day",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Request", href: "#lead-form" },
  ],
  proofPoints: [
    { label: "Recurring clients", value: "120+" },
    { label: "Average response", value: "< 1 day" },
    { label: "Service areas", value: "5+" },
  ],
  services: [
    {
      id: "standard-cleaning",
      title: "Standard Cleaning",
      summary:
        "Weekly or biweekly upkeep for bedrooms, kitchens, bathrooms, floors, and shared spaces.",
      detail: "Best for busy households that need a dependable recurring reset.",
    },
    {
      id: "deep-cleaning",
      title: "Deep Cleaning",
      summary:
        "Detailed room-by-room cleaning for neglected areas, appliance exteriors, grout, and built-up dust.",
      detail: "Best before guests, after a busy season, or before starting regular service.",
    },
    {
      id: "move-in-out",
      title: "Move-In / Move-Out",
      summary:
        "A practical reset for condos, apartments, and townhouses before handoff or move day.",
      detail: "Best when deposits, turnovers, and timelines matter.",
    },
    {
      id: "office-cleaning",
      title: "Small Office Cleaning",
      summary:
        "Workstation, pantry, restroom, and common-area cleaning for compact offices and studios.",
      detail: "Best for small teams that want a presentable space without hiring in-house.",
    },
    {
      id: "post-renovation",
      title: "Post-Renovation Reset",
      summary:
        "Dust removal, surface cleaning, and final polish after minor renovation or repair work.",
      detail: "Best when the project is done but the space is not ready yet.",
    },
  ],
  process: [
    {
      title: "Tell us what changed",
      body: "Share the space type, service need, preferred schedule, and contact method.",
    },
    {
      title: "Get a practical quote",
      body: "BrightNest reviews the request, confirms details, and sends next steps.",
    },
    {
      title: "Approve the visit",
      body: "The team confirms timing, arrives prepared, and records follow-up notes.",
    },
  ],
  assurances: [
    "Checklist-based service notes",
    "Demo-safe lead notifications",
    "Admin follow-up statuses",
    "Clear handoff and reset docs",
  ],
  dummyClientBrief: {
    clientType: "Local cleaning service",
    clientName: "BrightNest Cleaning Co.",
    audience:
      "Busy homeowners, condo renters, small-office managers, and move-out clients in Metro Manila.",
    primaryGoal:
      "Turn website visitors into qualified cleaning-service leads with enough detail for a quick follow-up.",
    tone: "Calm, dependable, practical, local, and easy to contact.",
  },
};

export function getServiceLabel(serviceId: string) {
  return (
    siteConfig.services.find((service) => service.id === serviceId)?.title ??
    serviceId
  );
}
