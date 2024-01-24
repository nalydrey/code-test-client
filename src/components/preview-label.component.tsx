import { MouseEvent} from "react"
import { XMarkIcon } from "@heroicons/react/16/solid"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { useFileSelector } from "../hooks/useFileSelector"

interface PreviewLabelProps {
    file: File
    className?: string
    onShow?: (e: MouseEvent<HTMLButtonElement>) => void
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const PreviewLabel = ({
    file,
    className,
    onDelete,
    onShow
}: PreviewLabelProps) => {

    const {isDocument, isPicture, payload} = useFileSelector({blob: file, name: file.name})

    return (
        <div className={`${className}`}>
             {
                 isPicture &&
                 <button 
                     type='button'
                     className=' w-10   rounded-md overflow-hidden shadow-lg'
                     onClick={onShow}
                 >
                     <img 
                     src={payload} 
                     alt=""
                     />
                 </button>
             }
             {
                 isDocument &&
                 <button 
                     type='button'
                     className='w-5 rounded-md overflow-hidden shadow-lg'
                     onClick={onShow}
                 >
                     <DocumentTextIcon/>
                 </button>
             }
             <button 
                 type='button'
                 className='absolute -translate-y-1/2 -translate-x-1/4 text-red-500'
                 onClick={onDelete}
             >
                 <XMarkIcon className='w-5'/>
             </button>
        </div>
    )
}