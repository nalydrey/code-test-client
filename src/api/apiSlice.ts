import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentsResp } from '../models/server-responce/comments.model'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
    endpoints: builder => (
    {
      getComments: builder.query<CommentsResp, string>({
        query: () => '/comments'
      }),
      deleteComment: builder.mutation({
        query: (id) => ({
          url: `/comments/${id}`,
          method: 'DELETE'
        })
      })
    })
  })

  export const { 
    useGetCommentsQuery,
    useDeleteCommentMutation 
  } = apiSlice