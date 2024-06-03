import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: "/banner/allBanners",
      }),
      providesTags: ["banner"],
    }),
    addBanner: builder.mutation({
      query: (formData) => ({
        url: `/banner/add-banner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
