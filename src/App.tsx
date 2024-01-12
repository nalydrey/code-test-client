import { MessageCard } from "./components/message-card.component"
import { Button } from "./components/button.component" 
import { ContentSection } from "./components/content-section.component"
import { SourceSection } from "./components/source-section.comonent"
import { useDeleteCommentMutation, useGetCommentsQuery } from "./api/apiSlice"
import { useState } from "react"
import { Reply } from "./components/reply.component"
import { ModalWindow } from "./components/modal-window.compnent"

function App() {

  const [open, setOpen] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<number>(0)
  const { data: comments, isSuccess: isSuccessGetComments } = useGetCommentsQuery('')
  const [ deleteComment , {data: deletedComment}] = useDeleteCommentMutation()


  const handlerDelete = (id: number) => {
    deleteComment(id)
  }

  const handlerClickModalEmptySpace = () => {
    setOpen(false)
  }

  const handlerClickAddComment = () => {
    setOpen(true)
  }
  
  return (
  <>
    <div className="container mx-auto">
      <Button
        title="Добавить комментарий"
        onClick={handlerClickAddComment}
      />
      {
        isSuccessGetComments &&
        comments.comments.map(comment => {
          return (
            <>
            {
              // !comment.parent &&
              <MessageCard
                userName={comment.userName}
                key={comment.id}
                onDelete={()=> handlerDelete(comment.id)}
              >
                  <ContentSection
                    text={comment.text}
                  />
                  {
                    comment.reply.map(reply => {
                      return (
                        <Reply
                          reply={reply}
                        />
                      )
                    })
                  }
                  
              </MessageCard>
            }
            </>
          )
        })
      }
    </div>
         <ModalWindow
          open = {open}
          onEmptySpace={handlerClickModalEmptySpace}
         >
          <div>
            Form
          </div>              
        </ModalWindow>
  </>
  )
}

export default App
