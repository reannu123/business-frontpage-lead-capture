export const leadStatuses = [
  {
    value: "NEW",
    label: "New",
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  },
  {
    value: "CONTACTED",
    label: "Contacted",
    tone: "bg-sky-50 text-sky-800 ring-sky-200",
  },
  {
    value: "QUALIFIED",
    label: "Qualified",
    tone: "bg-amber-50 text-amber-900 ring-amber-200",
  },
  {
    value: "WON",
    label: "Won",
    tone: "bg-teal-50 text-teal-800 ring-teal-200",
  },
  {
    value: "LOST",
    label: "Lost",
    tone: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  },
] as const;

export type LeadStatus = (typeof leadStatuses)[number]["value"];

export const leadStatusValues = leadStatuses.map((status) => status.value) as [
  LeadStatus,
  ...LeadStatus[],
];

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.some((status) => status.value === value);
}

export function getLeadStatusMeta(value: string) {
  return (
    leadStatuses.find((status) => status.value === value) ??
    leadStatuses[0]
  );
}
