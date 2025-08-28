import AnalyticsCharts from "@/components/modules/Admin/Analytics/AnalyticsCharts";
import AnalyticsErrorState from "@/components/modules/Admin/Analytics/AnalyticsErrorState";
import AnalyticsInsights from "@/components/modules/Admin/Analytics/AnalyticsInsights";
import TransactionStatsCards from "@/components/modules/Admin/Analytics/TransactionStatsCards";
import UserStatsCards from "@/components/modules/Admin/Analytics/UserStatsCards";
import { useDriver } from "@/hooks/useDriver";
import { useTransactionStatsQuery, useUserStatsQuery } from "@/redux/features/stats/stats.api";
import type { IChartData } from "@/types/stats.types";
import { useEffect, useMemo } from "react";

export default function Analytics() {
  const { data: userStatsResponse, isLoading: userDataLoading, error: userDataError } = useUserStatsQuery();
  const { startTour, isTourActive } = useDriver();
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

  const analyticsTourSteps = useMemo(
    () => [
      {
        element: "#user-analytics-section",
        popover: {
          title: "User Analytics",
          description: "This section provides insights into user behavior and engagement.",
        },
      },
      {
        element: "#total-users",
        popover: {
          title: "Total Users",
          description: "This card shows the total number of users registered on the platform.",
        },
      },
      {
        element: "#total-active-users",
        popover: {
          title: "Total Active Users",
          description: "This card shows the total number of active users on the platform.",
        },
      },
      {
        element: "#total-inactive-users",
        popover: {
          title: "Total Inactive Users",
          description: "This card shows the total number of inactive users on the platform.",
        },
      },
      {
        element: "#total-new-user-past-thirty-day",
        popover: {
          title: "Total New Users (Past 30 Days)",
          description: "This card shows the total number of new users who registered in the past 30 days.",
        },
      },
      {
        element: "#transaction-stats",
        popover: {
          title: "Transaction Statistics",
          description: "This section provides insights into transaction performance and trends.",
        },
      },
      {
        element: "#total-transactions",
        popover: {
          title: "Total Transactions",
          description: "This card shows the total number of transactions on the platform.",
        },
      },
      {
        element: "#successful-transactions",
        popover: {
          title: "Successful Transactions",
          description: "This card shows the total number of successful transactions on the platform.",
        },
      },
      {
        element: "#failed-transactions",
        popover: {
          title: "Failed Transactions",
          description: "This card shows the total number of failed transactions on the platform.",
        },
      },
      {
        element: "#pending-transactions",
        popover: {
          title: "Pending Transactions",
          description: "This card shows the total number of pending transactions on the platform.",
        },
      },
      {
        element: "#user-roles-chart",
        popover: {
          title: "User Roles Distribution",
          description: "This chart shows the distribution of users by their assigned roles in the system.",
        },
      },
      {
        element: "#transaction-types-chart",
        popover: {
          title: "Transaction Types Distribution",
          description: "This chart shows the distribution of transactions by their types.",
        },
      },
      {
        element: "#user-growth-insights",
        popover: {
          title: "User Growth Insights",
          description: "This card provides insights into user growth patterns and trends.",
        },
      },
      {
        element: "#transaction-health-insights",
        popover: {
          title: "Transaction Health Insights",
          description: "This card shows transaction success rates and health metrics.",
        },
      },
      {
        element: "#system-status-insights",
        popover: {
          title: "System Status Insights",
          description: "This card displays the current status of various system components.",
        },
      },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenTour = localStorage.getItem("analytics-tour-seen");
      const isDesktop = window.innerWidth >= 768; // md breakpoint

      if (!hasSeenTour && isDesktop) {
        // Check every 500ms if tour is available to start
        const checkAndStartTour = () => {
          if (!isTourActive()) {
            startTour(analyticsTourSteps);
            localStorage.setItem("analytics-tour-seen", "true");
          } else {
            // Keep checking until tour is available
            setTimeout(checkAndStartTour, 500);
          }
        };

        checkAndStartTour();
      }
    }, 1000); // Initial delay to let page load

    return () => clearTimeout(timer);
  }, [startTour, analyticsTourSteps, isTourActive]);

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
