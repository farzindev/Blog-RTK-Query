import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000"
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
    })
  })
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useGetPostQuery
} = postsApi;
