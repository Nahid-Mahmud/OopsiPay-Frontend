import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/response.types";
import type { IWallet } from "@/types/wallet.types";

interface WalletQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWallet: builder.query<TResponse<IWallet[]>, WalletQueryParams>({
      query: (params) => ({
        url: "/wallet/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["Wallet"],
    }),

    getMyWallet: builder.query<TResponse<IWallet>, void>({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),

    updateWalletStatus: builder.mutation<
      TResponse<IWallet>,
      {
        id: string;
        status: {
          walletStatus: string;
        };
      }
    >({
      query: ({ id, status }) => ({
        url: `/wallet/update-wallet-status/${id}`,
        method: "PATCH",
        data: status,
      }),
      invalidatesTags: ["Wallet"],
    }),

    getWalletNumber: builder.query({
      query: (number: string) => ({
        url: `/wallet/wallet-number/${number}`,
        method: "GET",
      }),
      providesTags: (_, error, number) => (error ? [] : [{ type: "Wallet", id: `number-${number}` }]),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAllWalletQuery, useGetMyWalletQuery, useUpdateWalletStatusMutation, useGetWalletNumberQuery } =
  walletApi;
