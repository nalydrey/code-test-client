import { Pagination, Paper, Table, TableBody, TableContainer } from "@mui/material"
import { useCreateCommentReplyMutation, useCreateNewCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from "../api/apiSlice"
import { CommentTableRow } from "../components/comment-table-row.component"
import { IFile } from "../models/file.model"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { ModalWindow } from "../components/modal-window.compnent"
import { Preview } from "../components/preview.component"
import { useDownload } from "../api/useDownload"
import { ControlPanel } from "../components/control-panel.component"
import { CommentForm } from "../components/comment-form.component"
import { ICommentForm } from "../data/init-comment-form.data"
import { useCreateFileMutation } from "../api/useCreateFile"
import { CommentTableHead, Sort } from "../components/table-head.component"

const limit = 2


export const HomePage = () => {

    const [openFile, setOpenFile] = useState<string >('')
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)

    const [query, setQuery] = useState<{sort?: Sort, page: number}>({page: 0})

    const [file, setFile] = useState<Blob | undefined>(undefined)

    const [createComment] = useCreateNewCommentMutation()
    const [createCommentReply] = useCreateCommentReplyMutation()
    const { data: comments, isSuccess: isGetCommentsSuccess, isFetching} = useGetCommentsQuery(query)
    const {mutation: createFile} = useCreateFileMutation()
    const [deleteComment] = useDeleteCommentMutation()


    const {downloadFn, data, isLoading} = useDownload()

    const pages = useMemo(() => {
        if(comments){
            return Math.ceil(comments.total/limit)
        }
        return 0
    }, [comments?.total])

    useEffect(() => {
        data &&
        setFile(data)
    }, [data])

    console.log(comments);

    const handleShow = (file: IFile | null ) => {
        if(file){
          setOpenFile(file.name)
          downloadFn(file.id)
        }
      }

    const  handleDetail = (file: File) => {
        setOpenFile(file.name)
        setFile(file)
    }

    const handleCloseContentWindow = () => {
        setOpenFile('')
        setFile(undefined)
    }

    const handlerDeleteComment = (id: number) => {
        deleteComment(id)
    }
    
    const hadleCloseForm = ( ) => {
        setOpenForm(false)
    }

    const handleOpenForm = () => {
        setOpenForm(true)
    }

    const handleReply = (id: number) => {
        console.log(id)
        
        setOpenForm(true)
        setId(id)
    }

    const handlerSubmitForm = async (form: ICommentForm, file: File | null) => {
        try{
          setId(null)
          let fileId = null
          if(file){
            const resp = await createFile(file)
            fileId = resp.file.id
          }
          const body = {...form, fileId}
          id 
            ? await createCommentReply({body, id})
            : await createComment(body) 
          setOpenForm(false)
        }
        catch(e){
          console.log('комментарий не создан');
        }
    }

    const handleSort = (sortObj: Sort) => {
        setQuery({...query, sort: sortObj})
    }

    const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
        setQuery({...query, page: page-1})
    }
    

    return (
        <>
            <div className="flex flex-col gap-5 mt-2 container mx-auto">
                <ControlPanel
                    total={comments?.total}
                    onCreate={handleOpenForm}
                />
                <div className="flex justify-center">
                    <Pagination 
                        count={pages} 
                        page={query.page+1} 
                        onChange={handleChangePage}
                    />
                </div>
                <div className="border border-black ">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <CommentTableHead
                            onSort={handleSort}
                        />
                        <TableBody>
                            
                            {isGetCommentsSuccess && comments.comments.map((row) => {
                                return (
                                    <>
                                        {
                                                <CommentTableRow
                                                    isLoading = {isFetching}
                                                    key = {row.id}
                                                    comment={row}
                                                    onShowFile={handleShow}
                                                    onDelete={handlerDeleteComment}
                                                    onReply={handleReply}
                                                />
                                        }
                                    </>
                                )}
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>

            <ModalWindow
                open={openForm}
            >
                <CommentForm
                    onClose={hadleCloseForm}
                    onFormSubmit={handlerSubmitForm}
                    onClickDetail={handleDetail}
                />
            </ModalWindow>                        

            <ModalWindow
                className='z-20'
                open={!!openFile}
                onEmptySpace={handleCloseContentWindow}
            >
                {
                isLoading ?
                <p>Loading...</p>
                :
                file ?
                <Preview
                    blob={ file }
                    fileName={openFile}
                />
                :
                <p>Нет файла</p>
                }
            </ModalWindow>
        </>
    )
}