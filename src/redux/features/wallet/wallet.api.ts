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
  }),
});

export const { useGetAllWalletQuery, useUpdateWalletStatusMutation } = walletApi;
