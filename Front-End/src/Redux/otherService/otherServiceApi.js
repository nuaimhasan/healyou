import { apiSlice } from "../api/apiSlice";

export const otherServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOtherService: builder.query({
      query: () => ({
        url: "/otherService/get",
      }),
      providesTags: ["otherService"],
    }),

    addOtherService: builder.mutation({
      query: (info) => ({
        url: `/otherService/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["otherService"],
    }),

    deleteOtherService: builder.mutation({
      query: (id) => ({
        url: `/otherService/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["otherService"],
    }),
  }),
});

export const {
  useGetOtherServiceQuery,
  useAddOtherServiceMutation,
  useDeleteOtherServiceMutation,
} = otherServiceApi;
