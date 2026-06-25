import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid admin email."),
  password: z
    .string()
    .min(8, "Enter the admin password.")
    .max(200, "Password is too long."),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export type AdminLoginState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof AdminLoginInput, string[]>>;
};

export const initialAdminLoginState: AdminLoginState = {
  status: "idle",
  message: "",
};

export function readAdminLoginFormData(formData: FormData) {
  return {
    email: formData.get("email"),
    password: formData.get("password"),
  };
}
