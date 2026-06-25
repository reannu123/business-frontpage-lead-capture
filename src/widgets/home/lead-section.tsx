import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/features/lead-capture/ui/lead-form";
import { siteConfig } from "@/shared/config/site";

export function LeadSection() {
  return (
    <section id="lead-form" className="bg-[#f4f8f5] py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Request
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 sm:text-4xl">
            Send the details BrightNest needs to follow up.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-700">
            This demo keeps the client workflow practical: contact details,
            requested service, preferred channel, and enough context for the
            next response.
          </p>

          <div className="mt-8 grid gap-4 text-sm text-zinc-700">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
              <span>{siteConfig.serviceArea}</span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
              <span>{siteConfig.contact.phone}</span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
              <span>
                {siteConfig.contact.email} - {siteConfig.contact.responseTime}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
