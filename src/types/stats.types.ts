export interface IUserStats {
  totalUsers: number;
  activeUsers: number;
  totalInactiveUsers: number;
  totalBlockedUsers: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  userByRole: Array<{
    _id: string;
    count: number;
  }>;
}

export interface ITransactionStats {
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  newTransactionsLast7Days: number;
  newTransactionsLast30Days: number;
  transactionByType: Array<{
    _id: string;
    count: number;
  }>;
}

export interface IChartData {
  name: string;
  value: number;
  percentage: string;
}
