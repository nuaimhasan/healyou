import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/admins/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("healyou_jwt", result?.data?.token);

          dispatch(
            userLoggedIn({
              token: result?.data?.token,
              data: result?.data,
            })
          );
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),
    getAdmins: builder.query({
      query: () => ({
        url: "/admins/all",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    addAdministrator: builder.mutation({
      query: (info) => ({
        url: `/admins/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useAddAdministratorMutation,
} = userApi;
