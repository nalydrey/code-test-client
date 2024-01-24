import { DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { MouseEvent, useMemo } from "react"
import { allowedDocumenst, allowedPictures } from "../data/allowed-extantions.data"

interface PreviewFileProps {
    className?: string 
    ext?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const PreviewFile = ({
    className,
    ext,
    onClick
}: PreviewFileProps) => {

    const {isDocument, isPicture} = useMemo(()=>{
        if(ext){
            return {
                 isPicture: allowedPictures.includes(ext),
                 isDocument: allowedDocumenst.includes(ext)
             }
        }
        else{
          return {
            isDocument: false,
            isPicture: false
        }  
        }
            
    }, [ext])

    return (
        <div className={`flex items-center ${className}`}>
            {
                isDocument &&
                <button 
                    type='button'
                    className='w-6 rounded-md overflow-hidden duration-200 shadow-lg hover:text-blue-500 hover:scale-150'
                    onClick={onClick}
                >
                    <DocumentTextIcon/>
                </button>
            }
            {
                isPicture &&
                <button 
                    type='button'
                    className='w-6 rounded-md overflow-hidden duration-200 shadow-lg hover:text-blue-500 hover:scale-150'
                    onClick={onClick}
                >
                    <PhotoIcon/>
                </button>
            }
        </div>
    )
}