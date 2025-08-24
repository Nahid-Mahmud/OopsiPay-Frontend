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
  }),
});

export const { useGetAllTransactionsQuery, useGetMyTransactionsQuery } = transactionApi;
