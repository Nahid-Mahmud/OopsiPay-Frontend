import z from "zod";

export const forgetPasswordValidationSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
});
