import { MessageCard } from "./components/message-card.component"
import { Button } from "./components/button.component" 
import { ModalWindow } from "./components/modal-window.component"
import { useState } from "react"
import { CommentForm } from "./components/comment-form.component"

function App() {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handlerClickAddNewComment = () => {
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <div className="container mx-auto">
        <Button
          title="Добавить комментарий"
          onClick={handlerClickAddNewComment}
        />
        <MessageCard/>
      </div>
      <ModalWindow
        open={openModal}
      >
        <CommentForm
          onClose={closeModal}
        />
      </ModalWindow>
    </>
  )
}

export default App
