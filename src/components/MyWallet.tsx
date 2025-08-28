import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useState } from "react";
import TransferForm from "./kokonutui/TransferForm";
import CreditCard from "./modules/Wallet/CreditCard";
import PaymentOptions from "./modules/Wallet/PaymentOptions";
import { Skeleton } from "./ui/skeleton";

type PaymentType = "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | "ADMIN_CREDIT";

export default function MyWallet() {
  const { data: walletData, isLoading, isError } = useGetMyWalletQuery();
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<PaymentType>("SEND_MONEY");

  // Format wallet number for card display
  const formatWalletNumber = (walletNumber: string) => {
    if (!walletNumber) return "•••• •••• •••••";

    // For 13-digit numbers, format as XXXX XXXX XXXXX
    if (walletNumber.length === 13) {
      return walletNumber.replace(/(\d{4})(\d{4})(\d{5})/, "$1 $2 $3");
    }

    // For other lengths, use default 4-digit grouping
    return walletNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handlePaymentSelect = (type: PaymentType) => {
    setSelectedTransactionType(type);
    setIsTransferFormOpen(true);
  };

  const getTransferFormTitle = (type: PaymentType) => {
    switch (type) {
      case "CASH_IN":
        return "Cash In";
      case "CASH_OUT":
        return "Withdraw Money";
      case "SEND_MONEY":
        return "Send Money";
      case "ADMIN_CREDIT":
        return "Admin Credit";
      default:
        return "Transfer";
    }
  };

  const getTransferFormDescription = (type: PaymentType) => {
    switch (type) {
      case "CASH_IN":
        return "Add funds to User wallet securely.";
      case "CASH_OUT":
        return "Withdraw money from your wallet to your bank account.";
      case "SEND_MONEY":
        return "Transfer funds to another wallet securely and instantly.";
      case "ADMIN_CREDIT":
        return "Add administrative credits to the system.";
      default:
        return "Complete your transaction securely.";
    }
  };

  if (isError) {
    return (
      <div className="space-y-6 p-4 max-w-xl mx-auto">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold">Error loading wallet</h2>
          <p>Failed to load wallet information. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 max-w-xl mx-auto">
      <h1 className="text-lg">My Wallet</h1>

      {isLoading ? (
        // Skeleton for credit card
        <div className="relative w-full max-w-md h-56 rounded-3xl p-8 bg-primary/40 border border-white/10">
          <div className="h-full flex flex-col justify-between">
            {/* Top section skeleton */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Middle section skeleton */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-6 rounded" />
                <div className="text-right">
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 w-full" />
            </div>

            {/* Bottom section skeleton */}
            <div className="flex justify-between items-end">
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="text-right">
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CreditCard
          cardNumber={formatWalletNumber(walletData?.data?.walletNumber || "")}
          balance={walletData?.data?.balance || 0}
          cardholderName={`${walletData?.data?.user?.firstName || ""} ${walletData?.data?.user?.lastName || ""}`.trim()}
        />
      )}

      <PaymentOptions userRole={walletData?.data?.user?.role} onPaymentSelect={handlePaymentSelect} />

      <TransferForm
        title={getTransferFormTitle(selectedTransactionType)}
        description={getTransferFormDescription(selectedTransactionType)}
        transactionType={selectedTransactionType}
        isOpen={isTransferFormOpen}
        onOpenChange={setIsTransferFormOpen}
        // onTransfer={handleTransfer}
        showTrigger={false}
      />
    </div>
  );
}
