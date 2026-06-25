import { Building2, Home, PackageCheck, Paintbrush, Sparkle } from "lucide-react";
import { siteConfig } from "@/shared/config/site";

const icons = [Home, Sparkle, PackageCheck, Building2, Paintbrush];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 sm:text-4xl">
            Clear service options for common cleaning requests.
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            The v1 scope is intentionally focused: visitors can understand the
            offer, pick the right service, and send enough detail for follow-up.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {siteConfig.services.map((service, index) => {
            const Icon = icons[index] ?? Sparkle;

            return (
              <article
                key={service.id}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold text-zinc-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {service.summary}
                </p>
                <p className="mt-4 border-t border-zinc-200 pt-4 text-sm font-medium leading-6 text-zinc-600">
                  {service.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
