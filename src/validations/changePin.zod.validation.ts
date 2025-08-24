import z from "zod";

export const changePinZodSchema = z
  .object({
    oldPin: z.string().min(5, "Old pin must be at least 5 characters long"),
    newPin: z.string().min(5, "New pin must be at least 5 characters long"),
    confirmPin: z.string().min(5, "Confirm pin must be at least 5 characters long"),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "Pins must match",
    path: ["confirmPin"],
  });

export const setPinZodSchema = z
  .object({
    newPin: z.string().min(5, "Pin must be at least 5 characters long"),
    confirmPin: z.string().min(5, "Confirm pin must be at least 5 characters long"),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "Pins must match",
    path: ["confirmPin"],
  });
