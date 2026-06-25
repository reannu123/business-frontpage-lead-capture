import { siteConfig } from "@/shared/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 text-sm text-zinc-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-semibold text-zinc-950">{siteConfig.name}</p>
        <p>
          Dummy-client showcase built for a freelance local-business website and
          lead-capture workflow.
        </p>
      </div>
    </footer>
  );
}
