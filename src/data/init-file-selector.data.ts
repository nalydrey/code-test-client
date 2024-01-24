export interface FileSelectorState {
    isPicture: boolean
    isDocument: boolean
    payload: string
}

export const initialState: FileSelectorState = {
    isDocument: false,
    isPicture: false,
    payload: ''
}