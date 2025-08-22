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
    register: builder.mutation<TResponse<IUser>, Partial<IUser>>({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        data: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
    }),

    sendOtp: builder.mutation<TResponse<null>, TOtp>({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data: data,
      }),
    }),

    verifyOtp: builder.mutation<TResponse<null>, TVerifyOtp>({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data: data,
      }),
    }),

    userInfo: builder.query<TResponse<null>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
