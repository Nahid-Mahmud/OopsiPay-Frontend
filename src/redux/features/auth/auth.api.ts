import { baseApi } from "@/redux/baseApi";

type TOtp = {
  email: string;
};

type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
};

type TVerifyOtp = {
  email: string;
  otp: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
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
