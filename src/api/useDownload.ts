import { useEffect, useState } from "react"




export const useDownload = () => {

    const [data, setData] = useState<Blob | undefined>()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)

    useEffect(() => {

    }, [])

    const downloadFn = async (id: number) => {
        setLoading(true)
        try{
            const responce = await fetch(`http://localhost:3030/api/file/download/document/${id}`)
            const blob = await responce.blob()
            setSuccess(true)
            setError(false)
            setData(blob)
            setLoading(false)
        }
        catch(err){
            setError(true)
            setSuccess(false)
            setData(undefined)
            setLoading(false)
        }
    }

    return {
        isLoading,
        isSuccess,
        isError,
        data,
        downloadFn
    }
}