"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  adminLoginSchema,
  type AdminLoginState,
  readAdminLoginFormData,
} from "@/entities/admin/model/schema";
import { setAdminSession, clearAdminSession } from "@/shared/lib/admin-session";
import { checkRateLimit } from "@/shared/lib/rate-limit";
import { getClientIp } from "@/shared/lib/security";
import { verifyPassword } from "@/shared/lib/password";

function genericLoginError(): AdminLoginState {
  return {
    status: "error",
    message: "The admin email or password is incorrect.",
  };
}

export async function loginAction(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const parsed = adminLoginSchema.safeParse(readAdminLoginFormData(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const rateLimit = checkRateLimit(`admin-login:${ip}`, 5, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return {
      status: "error",
      message: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
    };
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@brightnest.example";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminPasswordHash || parsed.data.email !== adminEmail) {
    return genericLoginError();
  }

  const passwordMatches = await verifyPassword(
    parsed.data.password,
    adminPasswordHash,
  );

  if (!passwordMatches) {
    return genericLoginError();
  }

  await setAdminSession(adminEmail);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
