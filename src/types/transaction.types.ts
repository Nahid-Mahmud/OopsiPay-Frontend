export interface ITransaction {
  _id: string;
  transactionType: "CASH_OUT" | "CASH_IN" | "SEND_MONEY" | "ADMIN_CREDIT";
  transactionId: string;
  reference: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  transactionAmount: number;
  transactionFee: number;
  netAmount: number;
  fromWallet: {
    _id: string;
    walletNumber: string;
    user: string;
  };
  toWallet: {
    _id: string;
    walletNumber: string;
    user: string;
  };
  fromUser: string;
  toUser: string;
  createdAt: string;
  updatedAt: string;
}
