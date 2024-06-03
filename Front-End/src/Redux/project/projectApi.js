import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/project/all",
      }),
      providesTags: ["project"],
    }),

    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/single/${id}`,
      }),
      providesTags: ["project"],
    }),

    addProject: builder.mutation({
      query: (formData) => ({
        url: `/project/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetSingleProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
