import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IUserStats, ITransactionStats } from "@/types/stats.types";

// Skeleton component for loading state
const InsightCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-32" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

interface AnalyticsInsightsProps {
  userStats?: IUserStats;
  transactionStats?: ITransactionStats;
  isLoading: boolean;
  userDataError: unknown;
  transactionDataError: unknown;
  hasError: boolean;
}

export default function AnalyticsInsights({
  userStats,
  transactionStats,
  isLoading,
  userDataError,
  transactionDataError,
  hasError,
}: AnalyticsInsightsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => <InsightCardSkeleton key={index} />)
      ) : (
        <>
          <Card id="user-growth-insights" className="dark:hover:shadow-white/30">
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last 7 days</span>
                  <span className="font-medium">{userStats?.newUsersLast7Days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last 30 days</span>
                  <span className="font-medium">{userStats?.newUsersLast30Days || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Growth rate</span>
                  <span className="font-medium text-green-600">
                    {userStats?.newUsersLast30Days && userStats.newUsersLast30Days > 0 ? "100%" : "0%"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="transaction-health-insights" className="dark:hover:shadow-white/30">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-green-600">
                    {transactionStats && transactionStats.totalTransactions > 0
                      ? `${(
                          (transactionStats.successfulTransactions / transactionStats.totalTransactions) *
                          100
                        ).toFixed(0)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Failure Rate</span>
                  <span className="font-medium">
                    {transactionStats && transactionStats.totalTransactions > 0
                      ? `${((transactionStats.failedTransactions / transactionStats.totalTransactions) * 100).toFixed(
                          0
                        )}%`
                      : "0%"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Processing</span>
                  <span className="font-medium">Instant</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="system-status-insights" className="dark:hover:shadow-white/30">
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">User System</span>
                  <div className={`h-2 w-2 rounded-full ${!userDataError ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transactions</span>
                  <div
                    className={`h-2 w-2 rounded-full ${!transactionDataError ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">API Status</span>
                  <div className={`h-2 w-2 rounded-full ${!hasError ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
