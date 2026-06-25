"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAction } from "@/features/admin-auth/actions/login";
import {
  initialAdminLoginState,
  type AdminLoginInput,
  type AdminLoginState,
} from "@/entities/admin/model/schema";

function FieldError({
  state,
  name,
}: {
  state: AdminLoginState;
  name: keyof AdminLoginInput;
}) {
  const error = state.fieldErrors?.[name]?.[0];
  return error ? (
    <p className="mt-2 text-sm font-medium text-red-700">{error}</p>
  ) : null;
}

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialAdminLoginState,
  );

  return (
    <form action={formAction} className="mt-6 grid gap-4" noValidate>
      {state.status === "error" ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-900"
          role="alert"
        >
          {state.message}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-zinc-900">
        Admin email
        <input
          name="email"
          type="email"
          autoComplete="username"
          className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          placeholder="admin@brightnest.example"
          required
        />
        <FieldError state={state} name="email" />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-zinc-900">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 rounded-md border border-zinc-300 bg-white px-3 text-base font-normal text-zinc-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          required
        />
        <FieldError state={state} name="password" />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
