import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-100 px-4">
      <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-zinc-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          The page does not exist in this demo workflow.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Back to site
        </Link>
      </section>
    </main>
  );
}
