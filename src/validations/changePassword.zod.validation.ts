import z from "zod";
import { passwordZodValidationSchema } from "./user.zod.validation";

export const changePasswordValidationSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordZodValidationSchema,
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
