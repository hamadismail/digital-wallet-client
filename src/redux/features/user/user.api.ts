import { baseApi } from "@/redux/baseApi";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation({
      query: (depositAmount) => ({
        url: "/user/add-money",
        method: "POST",
        data: depositAmount,
      }),
      invalidatesTags: ["DEPOSIT"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    userOverview: builder.query({
      query: () => ({
        url: "/me/transaction-summary",
        method: "GET",
      }),
      providesTags: ["DEPOSIT"],
    }),
  }),
});

export const {
  useDepositMutation,
  useRegisterMutation,
  useUserOverviewQuery,
  useLogoutMutation,
} = userApi;
