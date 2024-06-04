import { apiSlice } from "../api/apiSlice";

export const rentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRents: builder.query({
      query: (query) => ({
        url: "/rent/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["rent"],
    }),

    getRentById: builder.query({
      query: (id) => ({
        url: `rent/${id}`,
      }),
      providesTags: ["rent"],
    }),

    addRent: builder.mutation({
      query: (rentInfo) => ({
        url: `/rent/add`,
        method: "POST",
        body: rentInfo,
      }),
      invalidatesTags: ["rent"],
    }),

    deleteRent: builder.mutation({
      query: (id) => ({
        url: `/rent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rent"],
    }),

    statusUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rent/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["rent"],
    }),
  }),
});

export const {
  useGetAllRentsQuery,
  useAddRentMutation,
  useGetRentByIdQuery,
  useDeleteRentMutation,
  useStatusUpdateMutation,
} = rentApi;
