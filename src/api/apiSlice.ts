import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentsResp } from '../models/server-responce/comments.model'
import { NewCommentDto } from '../models/dto/new-comment.dto'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
    tagTypes: ['Comments'],
    endpoints: builder => (
    {
      getComments: builder.query<CommentsResp, string>({
        query: () => '/comments',
        providesTags: ['Comments']
      }),
      deleteComment: builder.mutation({
        query: (id) => ({
          url: `/comments/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Comments']
      }),
      createNewComment: builder.mutation({
        invalidatesTags: ['Comments'],
        query: (body: NewCommentDto) => ({
          url: '/comments',
          method: 'POST',
          body
        })
      })
    })
  })

  export const { 
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useCreateNewCommentMutation
  } = apiSlice