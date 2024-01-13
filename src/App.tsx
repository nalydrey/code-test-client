import { MessageCard } from "./components/message-card.component"
import { Button } from "./components/button.component" 
import { ContentSection } from "./components/content-section.component"
import { useCreateNewCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from "./api/apiSlice"
import { useEffect, useState } from "react"
import { Reply } from "./components/reply.component"
import { ModalWindow } from "./components/modal-window.compnent"
import { CommentForm } from "./components/comment-form.component"
import { NewCommentDto } from "./models/dto/new-comment.dto"

function App() {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const { data: comments, isSuccess: isGetCommentsSuccess } = useGetCommentsQuery('')
  const [deleteComment] = useDeleteCommentMutation()
  const [createComment, {isSuccess: isSuccessCreateNewComment}] = useCreateNewCommentMutation()

  const handlerClickAddNewComment = () => {
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const handlerDeleteComment = (id: number) => {
    deleteComment(id)
  }

  const handlerSubmitForm = (form: NewCommentDto) => {
    console.log(form);
    
    createComment(form)
  }

  useEffect(()=>{
    isSuccessCreateNewComment && setOpenModal(false)
  }, [isSuccessCreateNewComment])

  return (
    <>
      <div className="container mx-auto">
        <Button
          title="Добавить комментарий"
          onClick={handlerClickAddNewComment}
        />
        {
          isGetCommentsSuccess &&
          comments.comments.map(comment => (
            <MessageCard
              userName={comment.userName}
              onDelete={() => handlerDeleteComment(comment.id)}
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
          ))
        }
        
      </div>
      <ModalWindow
        open={openModal}
      >
        <CommentForm
          onClose={closeModal}
          onFormSubmit={handlerSubmitForm}
        />
      </ModalWindow>
    </>
  )
}

export default App
