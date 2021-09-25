import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/"
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts/",
      providesTags: (result) =>
        // learn about revalidation:
        // https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
        result ?
          [...result.map(({ id }) => ({ type: 'Posts', id })), { type: 'Posts', id: 'LIST' },]
          :
          [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `posts/`,
          method: "POST",
          body
        };
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    editPost: builder.mutation({
      query(data) {
        const {id, ...body} = data
        return {
          url: `posts/${id}/`,
          method: "PUT",
          body
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}/`,
          method: "DELETE"
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
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
