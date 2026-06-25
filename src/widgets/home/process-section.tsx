import { ClipboardCheck, MessageSquareText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/shared/config/site";

const icons = [MessageSquareText, ClipboardCheck, ShieldCheck];

export function ProcessSection() {
  return (
    <section id="process" className="border-y border-zinc-200 bg-zinc-950 py-20 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
            Built for fast follow-up, not vague contact forms.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Every request lands in an inbox with service type, contact
            preference, message, and follow-up status so the business owner can
            move from inquiry to booked work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.process.map((step, index) => {
            const Icon = icons[index] ?? ClipboardCheck;

            return (
              <article
                key={step.title}
                className="rounded-lg border border-white/12 bg-white/6 p-5"
              >
                <Icon className="h-6 w-6 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {step.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
