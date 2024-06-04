import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (query) => ({
        url: "/order/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["order"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["order"],
    }),

    addOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/order/add`,
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),

    statusUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useStatusUpdateMutation,
} = orderApi;
