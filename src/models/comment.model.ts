import { IFile } from "./file.model"
import { IUser } from "./user.model"

export interface Comment {
    id: number
    file: IFile | null
    user: IUser
    text: string
    parent: Comment | null
    reply: Comment[]
    createdDate: Date
}
