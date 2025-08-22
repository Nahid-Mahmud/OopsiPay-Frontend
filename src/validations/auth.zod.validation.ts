import z from "zod";

export const loginUserValidationSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password is required"),
});
