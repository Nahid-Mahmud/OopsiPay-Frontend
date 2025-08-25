/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { transferValidationSchema, type TransferFormData } from "@/validations/transfer.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, X } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import CurrencyTransfer from "./currency-transfer";

interface TransferFormProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onTransfer?: (data: TransferFormData) => Promise<void>;
  triggerText?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  transactionType?: "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | "ADMIN_CREDIT";
  showTrigger?: boolean;
}

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    rotateX: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

export default function TransferForm({
  title = "Send Money",
  description = "Transfer funds to another wallet securely and instantly.",
  onTransfer,
  triggerText = "Send Money",
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  transactionType = "SEND_MONEY",
  showTrigger = true,
}: TransferFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const [showTransferProgress, setShowTransferProgress] = React.useState(false);
  const [transferData, setTransferData] = React.useState<TransferFormData | null>(null);
  const [hasError, setHasError] = React.useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferValidationSchema),
    defaultValues: {
      walletNumber: "",
      amount: 50,
      transactionType: transactionType,
      reference: "",
      pin: "",
    },
  });

  // Update form when transactionType prop changes
  React.useEffect(() => {
    form.setValue("transactionType", transactionType);
  }, [transactionType, form]);

  const onSubmit = async (values: TransferFormData) => {
    setIsLoading(true);
    setHasError(false);

    // Immediately close the form and show progress modal
    setIsOpen(false);
    setTransferData(values);
    setShowTransferProgress(true);

    try {
      // Simulate the transfer process with the progress modal visible
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 seconds to show the animation

      // Simulate random error for demo (remove this in production)
      if (Math.random() > 0.7) {
        throw new Error("Transfer failed due to insufficient funds");
      }

      if (onTransfer) {
        await onTransfer(values);
      }

      // Stop loading but keep modal open for user to close manually
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setHasError(true);
      console.log(error);
    }
  };

  // Handle modal close
  const handleModalClose = (open: boolean) => {
    setShowTransferProgress(open);

    // If modal is being closed, reset the form and error state
    if (!open) {
      setHasError(false);
      form.reset({
        walletNumber: "",
        amount: 50,
        transactionType: transactionType,
        reference: "",
        pin: "",
      });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <DrawerTrigger asChild>
          <Button className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {triggerText}
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent className="max-w-md mx-auto p-6 rounded-2xl shadow-xl">
        <Form {...form}>
          <motion.div
            variants={drawerVariants as any}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full space-y-6"
          >
            <motion.div variants={itemVariants as any}>
              <DrawerHeader className="px-0 space-y-2.5">
                <DrawerTitle className="text-2xl text-center font-semibold flex items-center justify-center gap-2.5 tracking-tighter">
                  <Send className="w-6 h-6" />
                  <motion.span className="text-center" variants={itemVariants as any}>
                    {title}
                  </motion.span>
                </DrawerTitle>
                <motion.div variants={itemVariants as any}>
                  <DrawerDescription className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 tracking-tighter text-center">
                    {description}
                  </DrawerDescription>
                </motion.div>
              </DrawerHeader>
            </motion.div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants as any} className="space-y-4">
                {/* Wallet Number Field - Only for SEND_MONEY and CASH_OUT */}
                {
                  <FormField
                    control={form.control}
                    name="walletNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {transactionType === "SEND_MONEY" ? "Recipient Wallet Number" : "Destination Wallet Number"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter wallet number" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }

                {/* Amount Field */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {transactionType === "CASH_IN" && "Amount to Add (Minimum: ৳50)"}
                        {transactionType === "CASH_OUT" && "Amount to Withdraw (Minimum: ৳50)"}
                        {transactionType === "SEND_MONEY" && "Amount to Send (Minimum: ৳50)"}
                        {transactionType === "ADMIN_CREDIT" && "Credit Amount (Minimum: ৳50)"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={
                            transactionType === "CASH_IN"
                              ? "Enter amount to add"
                              : transactionType === "CASH_OUT"
                              ? "Enter amount to withdraw"
                              : transactionType === "SEND_MONEY"
                              ? "Enter amount to send"
                              : "Enter credit amount"
                          }
                          min="50"
                          step="0.01"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Reference Field (Optional) */}
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter reference note" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PIN Field */}
                <div className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN (5 digits)</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={5} {...field} disabled={isLoading}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants as any}>
                <DrawerFooter className="flex flex-col gap-3 px-0">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl cursor-pointer text-white font-semibold tracking-wide shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {(transactionType === "SEND_MONEY" && "Send Money") ||
                          (transactionType === "CASH_IN" && "Add Money") ||
                          (transactionType === "CASH_OUT" && "Withdraw Money") ||
                          (transactionType === "ADMIN_CREDIT" && "Admin Credit")}
                      </>
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-sm font-semibold transition-colors tracking-tighter"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </motion.div>
            </form>
          </motion.div>
        </Form>
      </DrawerContent>

      {/* Transfer Progress Modal */}
      <Dialog open={showTransferProgress} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-sm mx-auto p-0 border-0 bg-transparent shadow-none">
          {/* Close Button */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 h-8 w-8 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>

          {transferData && (
            <CurrencyTransfer
              transactionType={transferData.transactionType}
              amount={transferData.amount}
              fromWallet={
                transferData.transactionType === "CASH_IN"
                  ? "Bank Account"
                  : transferData.transactionType === "CASH_OUT"
                  ? "Your Wallet"
                  : transferData.transactionType === "SEND_MONEY"
                  ? "Your Wallet"
                  : "Admin System"
              }
              toWallet={
                transferData.transactionType === "CASH_IN"
                  ? "Your Wallet"
                  : transferData.transactionType === "CASH_OUT"
                  ? "Bank Account"
                  : transferData.transactionType === "SEND_MONEY"
                  ? `Wallet ${transferData.walletNumber}`
                  : "Target Account"
              }
              loadingTransfer={isLoading}
              hasError={hasError}
            />
          )}
        </DialogContent>
      </Dialog>
    </Drawer>
  );
}
