import { apiSlice } from "../api/apiSlice";

export const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub-category"],
    }),
    getSubCategories: builder.query({
      query: () => ({
        url: `/sub-categories`,
      }),
      providesTags: ["sub-category"],
    }),
    getSubCategory: builder.query({
      query: (id) => ({
        url: `/sub-categories/${id}`,
      }),
      providesTags: ["sub-category"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/sub-categories/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["sub-category"],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ id, categoryId }) => ({
        url: `/sub-categories/${id}`,
        method: "DELETE",
        data: { categoryId },
      }),
      invalidatesTags: ["sub-category"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
