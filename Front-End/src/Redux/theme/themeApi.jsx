import { apiSlice } from "../api/apiSlice";

export const themeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThemes: builder.query({
      query: () => ({
        url: "/themes/get-themes",
      }),
      providesTags: ["themes"],
    }),
    updateTheme: builder.mutation({
      query: ({ id, data }) => ({
        url: `/themes/update-theme/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["themes"],
    }),
    addTheme: builder.mutation({
      query: (data) => ({
        url: `/themes/add-theme`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["themes"],
    }),
  }),
});

export const {
  useGetThemesQuery,
  useUpdateThemeMutation,
  useAddThemeMutation,
} = themeApi;
