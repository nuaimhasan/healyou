import { apiSlice } from "../api/apiSlice";

export const counterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => ({
        url: "/counter/get",
      }),
      providesTags: ["counter"],
    }),

    addCounter: builder.mutation({
      query: (counterInfo) => ({
        url: `/counter/add`,
        method: "POST",
        body: counterInfo,
      }),
      invalidatesTags: ["counter"],
    }),

    updateCounter: builder.mutation({
      query: ({ id, counterInfo }) => ({
        url: `/counter/update/${id}`,
        method: "PATCH",
        body: counterInfo,
      }),
      invalidatesTags: ["counter"],
    }),
  }),
});

export const {
  useGetCounterQuery,
  useAddCounterMutation,
  useUpdateCounterMutation,
} = counterApi;
