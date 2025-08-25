import z from "zod";

// Transaction types from backend
export const TransactionType = ["CASH_OUT", "CASH_IN", "SEND_MONEY", "ADMIN_CREDIT"] as const;

export const transferValidationSchema = z
  .object({
    walletNumber: z.string().length(13, "Wallet number must be exactly 13 digits"),
    amount: z
      .number({ message: "Amount must be a valid number" })
      .min(50, "Minimum transfer amount is 50")
      .positive("Amount must be positive"),
    transactionType: z.enum(TransactionType, { message: "Invalid transaction type" }),
    reference: z.string().optional(),
    pin: z
      .string()
      .length(5, "PIN must be exactly 5 digits")
      .regex(/^\d{5}$/, "PIN must contain only digits"),
  })
  .refine(
    (data) => {
      // Wallet number is required for SEND_MONEY and CASH_OUT
      if ((data.transactionType === "SEND_MONEY" || data.transactionType === "CASH_OUT") && !data.walletNumber) {
        return false;
      }
      // Wallet number must be digits only if provided
      if (data.walletNumber && !/^\d+$/.test(data.walletNumber)) {
        return false;
      }
      return true;
    },
    {
      message: "Wallet number is required for this transaction type and must contain only digits",
      path: ["walletNumber"],
    }
  );

export type TransferFormData = z.infer<typeof transferValidationSchema>;
