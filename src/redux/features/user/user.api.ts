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

    getAllUsers: builder.query<TResponse<IUser[]>, Record<string, string>>({
      query: (params) => ({
        url: "/user/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    changePin: builder.mutation<TResponse<null>, { oldPin: string; newPin: string }>({
      query: (data) => ({
        url: "/user/change-pin",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    setPin: builder.mutation<TResponse<null>, { pin: string }>({
      query: (data) => ({
        url: "/user/set-pin",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUserInfoQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useChangePinMutation,
  useSetPinMutation,
} = userApi;
