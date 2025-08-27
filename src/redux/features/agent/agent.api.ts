import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (depositAmount) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: depositAmount,
      }),
      invalidatesTags: ["DEPOSIT"],
    }),
    cashOut: builder.mutation({
      query: (depositAmount) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: depositAmount,
      }),
      invalidatesTags: ["DEPOSIT"],
    }),
  }),
});

export const { useCashInMutation, useCashOutMutation } = userApi;
