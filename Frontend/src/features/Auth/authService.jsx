import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({ url: "/api/auth/user", method: "GET" }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
