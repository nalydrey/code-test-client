import { NewCommentDto } from "./new-comment.dto";

export interface ReplyDto {
    body: NewCommentDto
    id: number
}