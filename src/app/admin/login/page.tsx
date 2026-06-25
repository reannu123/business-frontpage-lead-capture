import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { AdminLoginForm } from "@/features/admin-auth/ui/login-form";
import { getAdminSession } from "@/shared/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-zinc-100 px-4">
      <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <LockKeyhole className="h-7 w-7 text-emerald-700" aria-hidden="true" />
        <h1 className="mt-5 text-2xl font-bold text-zinc-950">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Sign in to review leads, filter the inbox, and update follow-up
          statuses.
        </p>
        <AdminLoginForm />
        <Link
          href="/"
          className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          Back to site
        </Link>
      </section>
    </main>
  );
}
