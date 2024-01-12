export interface Comment {
    id: number
    userName: string
    email: string
    homePage: string
    text: string
    parent: Comment | null
    reply: Comment[]
}
