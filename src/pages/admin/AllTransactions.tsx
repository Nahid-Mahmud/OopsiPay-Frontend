import { TransactionsTable } from "@/components/modules/Admin/Transactions/TransactionsTable";

export default function AllTransactions() {
  return (
    <div>
      <div className="container mx-auto py-8">
        <TransactionsTable />
      </div>
    </div>
  );
}
