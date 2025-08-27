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
      query: (withdrawAmount) => ({
        url: "/user/withdraw",
        method: "POST",
        data: withdrawAmount,
      }),
      invalidatesTags: ["DEPOSIT"],
    }),

    sendMoney: builder.mutation({
      query: (sendAmount) => ({
        url: "/user/send",
        method: "POST",
        data: sendAmount,
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

    allUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useDepositMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useUserOverviewQuery,
  useAllUserQuery,
} = userApi;
