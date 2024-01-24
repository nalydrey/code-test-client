import { useState } from "react"
import { apiFetch } from "./useFetchData"
import { FileResponce } from "../models/server-responce/file-responce.model"

interface CreateFileMutationState {
    data?: FileResponce
    error?: {message: string}
    isLoading: boolean
}

const initState: CreateFileMutationState = {
    isLoading: false,
    data: undefined,
    error: undefined
}


export const useCreateFileMutation = () => {

    const [state, setState] = useState<CreateFileMutationState>(initState)

    const {isLoading, data, error} = state
    

    const mutation = async (file: File) => {
        setState({...initState, isLoading: true})
          const resp = await apiFetch.createFile(file)
            console.log(resp);
            setState({...initState, data: resp, isLoading: false})
            return resp
    }

    return {
        mutation,
        isLoading,
        data,
        error
    }
}