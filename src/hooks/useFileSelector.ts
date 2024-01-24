import { useEffect, useState } from "react"
import { getExtantion } from "../functions/get-extention"
import { allowedDocumenst, allowedPictures } from "../data/allowed-extantions.data"
import { FileSelectorState, initialState } from "../data/init-file-selector.data"



interface FileSelectorProps {
    blob: Blob
    name: string 
}

export const useFileSelector = ({
    blob,
    name
}: FileSelectorProps) => {

    const [ state ,setState] = useState<FileSelectorState>(initialState)

    useEffect(()=>{
        const fileExt = getExtantion(name)
        if(fileExt){
            if( allowedPictures.includes(fileExt)){
                const fakeUrl = URL.createObjectURL(blob)
                setState({...initialState, isPicture: true, payload: fakeUrl})
            }
            if( allowedDocumenst.includes(fileExt)){
                blob.text()
                .then((text) => {setState({...initialState, isDocument: true,  payload: text})})
            }
        }
    }, [blob])

    return state
}