import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/response.types";
import type { IUser } from "@/types/user.types";

type TOtp = {
  email: string;
};

type TVerifyOtp = {
  email: string;
  otp: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TResponse<IUser>,
      {
        email: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
    }),

    sendOtp: builder.mutation<TResponse<null>, TOtp>({
      query: (data) => ({
        url: "/otp/resend",
        method: "POST",
        data: data,
      }),
    }),

    verifyOtp: builder.mutation<TResponse<null>, TVerifyOtp>({
      query: (data) => ({
        url: "/otp/verify-user",
        method: "POST",
        data: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation, useVerifyOtpMutation, useLogoutMutation } = authApi;
