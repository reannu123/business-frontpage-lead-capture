import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/shared/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-zinc-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700 text-white">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold tracking-[0.12em]">
            {siteConfig.shortName.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-zinc-950">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden text-sm font-semibold text-zinc-700 hover:text-zinc-950 sm:inline"
          >
            Admin
          </Link>
          <a
            href="#lead-form"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Request
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
