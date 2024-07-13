import { apiSlice } from "../api/apiSlice";

export const serviceCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addServiceCategory: builder.mutation({
      query: (data) => ({
        url: `/service/category/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["serviceCategory"],
    }),
    getServiceCategories: builder.query({
      query: () => ({
        url: `/service/category/all`,
      }),
      providesTags: ["serviceCategory"],
    }),
    getServiceCategory: builder.query({
      query: (id) => ({
        url: `/service/category/${id}`,
      }),
      providesTags: ["serviceCategory"],
    }),
    updateServiceCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["serviceCategory"],
    }),
    deleteServiceCategory: builder.mutation({
      query: (id) => ({
        url: `/service/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["serviceCategory"],
    }),
  }),
});

export const {
  useAddServiceCategoryMutation,
  useGetServiceCategoriesQuery,
  useGetServiceCategoryQuery,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = serviceCategoryApi;
