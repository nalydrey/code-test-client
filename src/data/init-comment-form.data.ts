export const initialValues: ICommentForm = {
    userName: '',
    email: '',
    captcha: '',
    homePage: '',
    text: '',
    avatar: ''
}

export interface ICommentForm  {
    userName: string,
    email: string,
    captcha: string,
    homePage: string,
    text: string,
    avatar: string
}