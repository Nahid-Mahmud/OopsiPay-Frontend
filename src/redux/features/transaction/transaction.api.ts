import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/response.types";
import type { ITransaction } from "@/types/transaction.types";

interface TransactionQueryParams {
  page?: number;
  limit?: number;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TResponse<ITransaction[]>, TransactionQueryParams>({
      query: (params) => ({
        url: "/transaction/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    getMyTransactions: builder.query<TResponse<ITransaction[]>, null>({
      query: () => ({
        url: "/transaction/my-transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),

    createTransaction: builder.mutation({
      query: (data: {
        walletNumber: string;
        amount: number;
        transactionType: "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | "ADMIN_CREDIT";
        pin: string;
      }) => ({
        url: "/transaction/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
  }),
});

export const { useGetAllTransactionsQuery, useGetMyTransactionsQuery, useCreateTransactionMutation } = transactionApi;
