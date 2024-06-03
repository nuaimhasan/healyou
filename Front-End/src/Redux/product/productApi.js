import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => ({
        url: "/products/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/update-product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/products/add-product`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["product"],
    }),
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/products/getbyslug/${slug}`,
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
} = productApi;
