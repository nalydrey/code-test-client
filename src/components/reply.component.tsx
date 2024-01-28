import { useMemo } from "react"
import { Comment } from "../models/comment.model"
import { ContentSection } from "./content-section.component"
import { MessageCard } from "./message-card.component"
import { SourceSection } from "./source-section.comonent"
import { avatars } from "../data/avatars.data"
import defaultAvatar from '../assets/avatars/avatar_13.png'
import { IFile } from "../models/file.model"


interface ReplyProps {
    reply: Comment
    onDelete?: (id: number) => void
    onReply?: (id: number) => void
    onShow?: (file: IFile | null) => void
}

export const Reply = ({
    reply,
    onShow,
    onDelete,
    onReply
}: ReplyProps) => {

    const handleDelete = (id: number) => {
        onDelete && onDelete(id)
    }

    const handleShow = (file: IFile | null) => {
        onShow && onShow(file)
    }

    const handleReply = (id: number) => {
        onReply && onReply(id)
    }

    const avatar = useMemo(() => {
        return avatars.find(ava => ava.name === reply.user.avatar)?.path || defaultAvatar 
    }, [])

    return (

        <MessageCard
            file={reply.file}
            avaSrc={avatar}
            userName={reply.user.userName}
            onDelete={() => handleDelete(reply.id)}
            onShow={() => handleShow(reply.file)}
            onReply={() => handleReply(reply.id)}
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
                                 onDelete={handleDelete}
                                 onShow={handleShow}
                                 onReply={handleReply}
                             />
                         )
                     })
                 }
                
             </div>
            

        </MessageCard>
    )
}