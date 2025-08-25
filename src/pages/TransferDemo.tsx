import TransferForm from "@/components/kokonutui/TransferForm";
import type { TransferFormData } from "@/validations/transfer.zod.validation";

export default function TransferDemo() {
  const handleTransfer = async (data: TransferFormData) => {
    console.log("Transfer data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically call your transfer API
    // Example:
    // const response = await transferAPI.createTransaction(data);
    // if (!response.success) throw new Error(response.message);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Transfer Money Demo</h1>
        <TransferForm
          onTransfer={handleTransfer}
          title="Send Money"
          description="Transfer funds to another OopsiPay wallet securely and instantly."
          triggerText="Send Money"
        />
      </div>
    </div>
  );
}
