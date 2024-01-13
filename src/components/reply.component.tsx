import { MouseEvent } from "react"
import { Comment } from "../models/comment.model"
import { ContentSection } from "./content-section.component"
import { MessageCard } from "./message-card.component"
import { SourceSection } from "./source-section.comonent"


interface ReplyProps {
    reply: Comment
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Reply = ({
    reply,
    onDelete
}: ReplyProps) => {
    return (

        <MessageCard
            userName={reply.userName}
            onDelete={onDelete}
        >
             <div>
                <SourceSection
                    text={reply.parent ? reply.parent.text : 'message deleted'}
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