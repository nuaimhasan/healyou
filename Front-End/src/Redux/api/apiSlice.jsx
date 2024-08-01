import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("healyou_jwt");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "banner",
    "logo",
    "contact",
    "product",
    "services",
    "about",
    "category",
    "sub-category",
    "sub-sub-category",
    "admin",
    "themes",
    "favicon",
    "blogs",
  ],
});
