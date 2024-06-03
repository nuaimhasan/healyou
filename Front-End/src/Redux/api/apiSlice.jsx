import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("business_jwt");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "banner",
    "impactSection",
    "impacts",
    "logo",
    "clientBanner",
    "client",
    "contact",
    "product",
    "careerBanner",
    "careerForm",
    "news-events",
    "about",
    "company-profile",
    "our-mission",
    "our-vision",
    "team",
    "category",
    "sub-category",
    "sub-sub-category",
    "news-category",
    "admin",
    "themes",
    "favicon",
  ],
});
