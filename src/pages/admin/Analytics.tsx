import AnalyticsCharts from "@/components/modules/Admin/Analytics/AnalyticsCharts";
import AnalyticsErrorState from "@/components/modules/Admin/Analytics/AnalyticsErrorState";
import AnalyticsInsights from "@/components/modules/Admin/Analytics/AnalyticsInsights";
import TransactionStatsCards from "@/components/modules/Admin/Analytics/TransactionStatsCards";
import UserStatsCards from "@/components/modules/Admin/Analytics/UserStatsCards";
import { useTransactionStatsQuery, useUserStatsQuery } from "@/redux/features/stats/stats.api";
import type { IChartData } from "@/types/stats.types";

export default function Analytics() {
  const { data: userStatsResponse, isLoading: userDataLoading, error: userDataError } = useUserStatsQuery();
  const {
    data: transactionStatsResponse,
    isLoading: transactionDataLoading,
    error: transactionDataError,
  } = useTransactionStatsQuery();

  const userStats = userStatsResponse?.data;
  const transactionStats = transactionStatsResponse?.data;

  // Transform data for charts
  const userRoleData: IChartData[] =
    userStats?.userByRole?.map((role) => ({
      name: role._id.replace("_", " "),
      value: role.count,
      percentage: ((role.count / userStats.totalUsers) * 100).toFixed(1),
    })) || [];

  const transactionTypeData: IChartData[] =
    transactionStats?.transactionByType?.map((type) => ({
      name: type._id.replace("_", " "),
      value: type.count,
      percentage: ((type.count / transactionStats.totalTransactions) * 100).toFixed(1),
    })) || [];

  const hasError = Boolean(userDataError || transactionDataError);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Overview of user statistics and transaction data</p>
        </div>

        {/* Error State */}
        <AnalyticsErrorState hasError={hasError} />

        {/* User Statistics Cards */}
        <UserStatsCards userStats={userStats} isLoading={userDataLoading} />

        {/* Transaction Statistics Cards */}
        <TransactionStatsCards transactionStats={transactionStats} isLoading={transactionDataLoading} />

        {/* Charts Section */}
        <AnalyticsCharts
          userStats={userStats}
          transactionStats={transactionStats}
          userDataLoading={userDataLoading}
          transactionDataLoading={transactionDataLoading}
          userRoleData={userRoleData}
          transactionTypeData={transactionTypeData}
        />

        {/* Additional Insights */}
        <AnalyticsInsights
          userStats={userStats}
          transactionStats={transactionStats}
          isLoading={userDataLoading || transactionDataLoading}
          userDataError={userDataError}
          transactionDataError={transactionDataError}
          hasError={hasError}
        />
      </div>
    </div>
  );
}
