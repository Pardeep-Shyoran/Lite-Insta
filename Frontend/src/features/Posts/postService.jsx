import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({ url: "/api/posts", method: "GET" }),
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/api/posts",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
} = postApi;