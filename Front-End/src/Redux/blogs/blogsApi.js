import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (query) => ({
        url: "/blogs/all",
        params: query,
      }),
      providesTags: ["blogs"],
    }),

    getBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
      providesTags: ["blogs"],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: `/blogs/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    editBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/blogs/edit/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
