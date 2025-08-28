import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IUserStats } from "@/types/stats.types";
import { TrendingUp, UserCheck, Users, UserX } from "lucide-react";

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

interface UserStatsCardsProps {
  userStats?: IUserStats;
  isLoading: boolean;
}

export default function UserStatsCards({ userStats, isLoading }: UserStatsCardsProps) {
  return (
    <div id="user-analytics-section" className="space-y-4">
      <h2 className="text-xl font-semibold">User Statistics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
        ) : userStats ? (
          <>
            <Card id="total-users" className="hover:shadow-lg dark:hover:shadow-white/30 transition-all duration-200 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">+{userStats.newUsersLast7Days} from last week</p>
              </CardContent>
            </Card>

            <Card id="total-active-users" className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {userStats.totalUsers > 0 ? ((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1) : 0}% of
                  total users
                </p>
              </CardContent>
            </Card>

            <Card id="total-inactive-users" className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-destructive">Inactive Users</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalInactiveUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {userStats.totalUsers > 0
                    ? ((userStats.totalInactiveUsers / userStats.totalUsers) * 100).toFixed(1)
                    : 0}
                  % of total users
                </p>
              </CardContent>
            </Card>

            <Card id="total-new-user-past-thirty-day" className="hover:shadow-lg transition-all dark:hover:shadow-white/30 duration-200 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary">New Users (30d)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.newUsersLast30Days}</div>
                <p className="text-xs text-muted-foreground">{userStats.newUsersLast7Days} in last 7 days</p>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  );
}
