export interface NewCommentDto {
    fileId: number | null
    userName: string
    email: string
    captcha: string
    avatar: string
    homePage: string
    text: string
}
