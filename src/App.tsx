import { MessageCard } from "./components/message-card.component"
import { Button } from "./components/button.component" 

function App() {

  return (
    <div className="container mx-auto">
      <Button
        title="Добавить комментарий"
      />
      <MessageCard/>
    </div>
  )
}

export default App
