import { apiSlice } from "../api/apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (query) => ({
        url: "/services/all",
        params: query,
      }),
      providesTags: ["service"],
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/single/${id}`,
      }),
      providesTags: ["service"],
    }),

    addService: builder.mutation({
      query: (formData) => ({
        url: `/services/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    editService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/services/edit/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
