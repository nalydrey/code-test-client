import { Comment } from "../models/comment.model"
import { ContentSection } from "./content-section.component"
import { MessageCard } from "./message-card.component"
import { SourceSection } from "./source-section.comonent"


interface ReplyProps {
    reply: Comment
}

export const Reply = ({
    reply
}: ReplyProps) => {
    return (

        <MessageCard
            userName={reply.userName}
        >
               
             <div>
                 <SourceSection
                     text={reply.parent ? reply.parent.text : 'message deletes'}
                 />
                <ContentSection
                    text={reply.text}
                /> 
                
                 {
                     reply.reply.map(repl  => {
                         return (
                             <Reply
                                 reply={repl}
                             />
                         )
                     })
                 }
                
             </div>
            

        </MessageCard>
    )
}