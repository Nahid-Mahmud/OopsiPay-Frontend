import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ITransactionStats } from "@/types/stats.types";
import { Activity, Clock, CreditCard } from "lucide-react";

// Skeleton component for loading state
const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
);

interface TransactionStatsCardsProps {
  transactionStats?: ITransactionStats;
  isLoading: boolean;
}

export default function TransactionStatsCards({ transactionStats, isLoading }: TransactionStatsCardsProps) {
  return (
    <div id="transaction-stats" className="space-y-4">
      <h2 className="text-xl font-semibold">Transaction Statistics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
        ) : transactionStats ? (
          <>
            <Card
              id="total-transactions"
              className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary">Total Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transactionStats.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  +{transactionStats.newTransactionsLast7Days} from last week
                </p>
              </CardContent>
            </Card>

            <Card
              id="successful-transactions"
              className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary">Successful</CardTitle>
                <Activity className="h-4 w-4 text-green-600 group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{transactionStats.successfulTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  {transactionStats.totalTransactions > 0
                    ? ((transactionStats.successfulTransactions / transactionStats.totalTransactions) * 100).toFixed(1)
                    : 0}
                  % success rate
                </p>
              </CardContent>
            </Card>

            <Card
              id="failed-transactions"
              className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-destructive">Failed</CardTitle>
                <Activity className="h-4 w-4 text-red-600 group-hover:text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{transactionStats.failedTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  {transactionStats.totalTransactions > 0
                    ? ((transactionStats.failedTransactions / transactionStats.totalTransactions) * 100).toFixed(1)
                    : 0}
                  % failure rate
                </p>
              </CardContent>
            </Card>

            <Card
              id="pending-transactions"
              className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-yellow-600">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600 group-hover:text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{transactionStats.pendingTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  {transactionStats.totalTransactions > 0
                    ? ((transactionStats.pendingTransactions / transactionStats.totalTransactions) * 100).toFixed(1)
                    : 0}
                  % pending
                </p>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  );
}
