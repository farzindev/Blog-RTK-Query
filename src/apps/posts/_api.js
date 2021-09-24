import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hn33n-4000.sse.codesandbox.io"
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts/",
      providesTags: ["Post"]
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}/`
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `posts/`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["Post"]
    }),
    editPost: builder.mutation({
      query(body) {
        return {
          url: `posts/${body.id}/`,
          method: "PUT",
          body
        };
      },
      invalidatesTags: ["Post"]
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}/`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["Post"]
    })
  })
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = postsApi;
