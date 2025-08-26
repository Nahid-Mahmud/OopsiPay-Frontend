import z from "zod";

export const loginUserValidationSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
