import { baseApi } from "@/redux/baseApi";
import type { TResponse } from "@/types/response.types";
import type { IUser } from "@/types/user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<TResponse<IUser>, Partial<IUser>>({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        data: data,
      }),
    }),

    userInfo: builder.query<TResponse<IUser>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllUsers: builder.query<TResponse<IUser[]>, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useUserInfoQuery, useGetAllUsersQuery } = userApi;
