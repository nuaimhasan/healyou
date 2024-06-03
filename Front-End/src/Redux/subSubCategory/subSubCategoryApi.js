import { apiSlice } from "../api/apiSlice";

export const subSubCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-sub-categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub-sub-category"],
    }),
    getSubSubCategories: builder.query({
      query: () => ({
        url: `/sub-sub-categories`,
      }),
      providesTags: ["sub-sub-category"],
    }),
    getSubSubCategory: builder.query({
      query: (id) => ({
        url: `/sub-sub-categories/${id}`,
      }),
      providesTags: ["sub-sub-category"],
    }),
    updateSubSubCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/sub-sub-categories/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["sub-sub-category"],
    }),
    deleteSubSubCategory: builder.mutation({
      query: ({ id, subCategoryId }) => ({
        url: `/sub-sub-categories/${id}`,
        method: "DELETE",
        body: { subCategoryId },
      }),
      invalidatesTags: ["sub-sub-category"],
    }),
  }),
});

export const {
  useAddSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
  useGetSubSubCategoryQuery,
  useUpdateSubSubCategoryMutation,
  useDeleteSubSubCategoryMutation,
} = subSubCategoryApi;
