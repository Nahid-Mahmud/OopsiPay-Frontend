import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/response.types";
import type { IUserStats, ITransactionStats } from "@/types/stats.types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userStats: builder.query<TResponse<IUserStats>, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    transactionStats: builder.query<TResponse<ITransactionStats>, void>({
      query: () => ({
        url: "/stats/transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useUserStatsQuery, useTransactionStatsQuery } = statsApi;
