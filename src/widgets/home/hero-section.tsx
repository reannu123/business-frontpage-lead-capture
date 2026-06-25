import Image from "next/image";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/shared/config/site";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[76vh] items-center overflow-hidden">
      <Image
        src="/images/cleaning-service-hero.png"
        alt="A BrightNest cleaner wiping a kitchen counter in a clean modern home"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_34%,rgba(255,255,255,0.32)_66%,rgba(255,255,255,0.05)_100%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-200">
            Local cleaning service demo
          </p>
          <h1 className="text-4xl font-bold leading-[1.02] tracking-normal text-zinc-950 sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 sm:text-xl">
            {siteConfig.tagline} Book a practical cleaning request and get a
            clear follow-up from the local team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Request a cleaning quote
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-300 bg-white/80 px-5 text-sm font-semibold text-zinc-950 transition hover:border-emerald-700 hover:text-emerald-900"
            >
              View services
            </a>
          </div>

          <dl className="mt-7 grid max-w-xl grid-cols-3 gap-3 sm:mt-10">
            {siteConfig.proofPoints.map((point) => (
              <div key={point.label} className="border-l border-emerald-700 pl-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {point.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-zinc-950">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 hidden gap-2 text-sm font-medium text-zinc-700 sm:grid sm:grid-cols-2">
            {siteConfig.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
