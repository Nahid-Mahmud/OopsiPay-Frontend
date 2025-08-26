import { baseApi } from "@/redux/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import type { IContactUs } from "@/types/contact-us.types";
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
      invalidatesTags: tagTypes,
    }),

    sendOtp: builder.mutation<TResponse<null>, TOtp>({
      query: (data) => ({
        url: "/otp/resend",
        method: "POST",
        data: data,
      }),
    }),

    changePassword: builder.mutation<TResponse<null>, { oldPassword: string; newPassword: string }>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
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

    forgetPassword: builder.mutation<TResponse<null>, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: data,
      }),
    }),

    resetPassword: builder.mutation<TResponse<null>, { newPassword: string; id: string; token: string }>({
      query: (data) => ({
        url: `/auth/reset-password?id=${data.id}&token=${data.token}`,
        method: "POST",
        data: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // invalidatesTags: tagTypes,
    }),

    contactUs: builder.mutation<TResponse<null>, IContactUs>({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useContactUsMutation,
  useChangePasswordMutation,
} = authApi;
