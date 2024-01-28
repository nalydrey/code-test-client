import { Comment } from "../comment.model";

export interface CommentsResp {
    comments: Comment[]
    total: number
} 