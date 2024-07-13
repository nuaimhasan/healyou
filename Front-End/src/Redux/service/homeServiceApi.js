import { apiSlice } from "../api/apiSlice";

export const homeServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeServices: builder.query({
      query: () => ({
        url: "/service/home/all",
      }),
      providesTags: ["homeService"],
    }),

    addHomeService: builder.mutation({
      query: (services) => ({
        url: `/service/home/add`,
        method: "POST",
        body: services,
      }),
      invalidatesTags: ["homeService"],
    }),

    editHomeService: builder.mutation({
      query: ({ id, services }) => ({
        url: `/service/home/edit/${id}`,
        method: "PATCH",
        body: services,
      }),
      invalidatesTags: ["homeService"],
    }),
  }),
});

export const {
  useGetHomeServicesQuery,
  useAddHomeServiceMutation,
  useEditHomeServiceMutation,
} = homeServiceApi;
