import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'
import { CommentsResp } from '../models/server-responce/comments.model'
import { NewCommentDto } from '../models/dto/new-comment.dto'
import { FileResponce } from '../models/server-responce/file-responce.model'
import { IUpdateFile } from '../models/dto/update-file.dto'
import { allowedDocumenst, allowedPictures } from '../data/allowed-extantions.data'
import { getExtantion } from '../functions/get-extention'
import { CommentResponce } from '../models/server-responce/comment-responce'
import { ReplyDto } from '../models/dto/reply-dto'
import { queryString } from 'object-query-string'
import { Sort } from '../components/table-head.component'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api' }),
    tagTypes: ['Comments'],
    endpoints: builder => (
    {
      getComments: builder.query<CommentsResp, {sort?: Sort, page: number}>({
        query: (q) => {
          const query = queryString({
            sort: {...q.sort},
            page: q.page
          })
          console.log(query);
          
          return `/comments?${query}`
        },
        providesTags: ['Comments']
      }),
      deleteComment: builder.mutation({
        query: (id) => ({
          url: `/comments/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Comments']
      }),
      createNewComment: builder.mutation<CommentResponce, NewCommentDto>({
        invalidatesTags: ['Comments'],
        query: (body) => ({
          url: '/comments',
          method: 'POST',
          body
        })
      }),
      createCommentReply: builder.mutation<CommentResponce, ReplyDto>({
        invalidatesTags: ['Comments'],
        query: ({body, id}) => ({
          url: `/comments/${id}`,
          method: 'POST',
          body
        })
      }),
      createFile: builder.mutation<FileResponce, File>({
        query: (file) =>{
          const body = new FormData()
          body.append('file', file)
          const fileExt = getExtantion(file.name)
          let route = 'picture'
          if(fileExt){
            if(allowedPictures.includes(fileExt)) route = 'picture'
            if(allowedDocumenst.includes(fileExt)) route = 'document'
          }
          return {
            url: `/file/${route}`,
            method: 'POST',
            body
          }
        },
      }),
      

      createOrUpdateFile: builder.mutation<FileResponce, IUpdateFile>({
        query: ({fileId, body, fileExt}) => {
          let route = 'picture'
          if(allowedPictures.includes(fileExt)) route = 'picture'
          if(allowedDocumenst.includes(fileExt)) route = 'document'
         return ({
            url: `/file/${route}/${fileId ?? ''} `,
            method: fileId ? 'PUT' : 'POST',
            body
        })
      }
      }),
    })
  })

  export const { 
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useCreateNewCommentMutation,
    useCreateOrUpdateFileMutation,
    useCreateFileMutation,
    useCreateCommentReplyMutation
    
  } = apiSlice