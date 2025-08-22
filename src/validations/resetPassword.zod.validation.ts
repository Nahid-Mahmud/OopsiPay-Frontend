import z from "zod";
import { passwordZodValidationSchema } from "./user.zod.validation";

export const resetPasswordValidationSchema = z
  .object({
    password: passwordZodValidationSchema,
    cPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords must match",
    path: ["cPassword"],
  });
