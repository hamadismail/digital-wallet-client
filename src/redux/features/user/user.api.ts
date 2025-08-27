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

    withdraw: builder.mutation({
      query: (depositAmount) => ({
        url: "/user/withdraw",
        method: "POST",
        data: depositAmount,
      }),
      invalidatesTags: ["DEPOSIT"],
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
  useWithdrawMutation,
  useUserOverviewQuery,
} = userApi;
