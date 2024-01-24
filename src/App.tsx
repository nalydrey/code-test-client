import { MessageCard } from "./components/message-card.component"
import { Button } from "./components/button.component" 
import { ContentSection } from "./components/content-section.component"
import { useCreateNewCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from "./api/apiSlice"
import { useEffect, useState } from "react"
import { Reply } from "./components/reply.component"
import { ModalWindow } from "./components/modal-window.compnent"
import { CommentForm } from "./components/comment-form.component"
import defaultAvatar from './assets/avatars/avatar_13.png'
import { avatars } from "./data/avatars.data"
import { useDownload } from "./api/useDownload"
import { ICommentForm } from "./data/init-comment-form.data"
import { useCreateFileMutation } from "./api/useCreateFile"
import { IFile } from "./models/file.model"
import { Preview } from "./components/preview.component"





function App() {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [openFile, setOpenFile] = useState<string >('')

  const { data: comments, isSuccess: isGetCommentsSuccess } = useGetCommentsQuery('')
  const [deleteComment] = useDeleteCommentMutation()
  const [createComment, {isSuccess: isSuccessCreateNewComment}] = useCreateNewCommentMutation()
  const {mutation: createFile} = useCreateFileMutation()

console.log(comments);

  const {downloadFn, data, isLoading} = useDownload()

console.log(data);

  const handlerClickAddNewComment = () => {
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const handlerDeleteComment = (id: number) => {
    deleteComment(id)
  }

  const handlerSubmitForm = async (form: ICommentForm, file: File | null) => {
    try{
      let fileId = null
      if(file){
        const resp = await createFile(file)
        fileId = resp.file.id
      }
      createComment({...form, fileId})
    }
    catch(e){
      console.log('комментарий не создан');
    }
  }

  useEffect(()=>{
    isSuccessCreateNewComment && setOpenModal(false)
  }, [isSuccessCreateNewComment])




   const handleShow = (file: IFile | null ) => {
    if(file){
      setOpenFile(file.name)
      downloadFn(file.id)
    }
  }

  const handleCloseContentWindow = () => {
    setOpenFile('')
  }
  return (
    <>
      <div className="container mx-auto">
       
        <Button
          title="Добавить комментарий"
          onClick={handlerClickAddNewComment}
        />
        {
          isGetCommentsSuccess &&
          comments.comments.map(comment => {
            const avatar = avatars.find(ava => ava.name === comment.user.avatar)?.path || defaultAvatar 
            return (
            <MessageCard
              avaSrc={avatar}
              userName={comment.user.userName}
              file={comment.file}
              onDelete={() => handlerDeleteComment(comment.id)}
              onShow={() => handleShow(comment.file)}
            >
              <ContentSection
                text={comment.text}
              />
              {
                comment.reply.map(item => (
                  <Reply
                    reply={item}
                    onDelete={()=>handlerDeleteComment(item.id)}
                  />
                ))
              }
            </MessageCard>
          )
        })
        }
        
      </div>
      <ModalWindow
        open={openModal}
      >
        <CommentForm
          onClose={closeModal}
          onFormSubmit={handlerSubmitForm}
          // onClickDetail={handleClickDetail}
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
          data ?
         <Preview
            blob={data}
            fileName={openFile}
         />
         :
         <p>Нет файла</p>
        }
      </ModalWindow>
      
    </>
  )
}

export default App
