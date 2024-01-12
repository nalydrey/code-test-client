import { MouseEvent, useEffect } from "react"

interface ModalWindowProps {
    children: JSX.Element 
    open: boolean
    onEmptySpace: (e: MouseEvent<HTMLDivElement>) => void
}

export const ModalWindow = ({
    children,
    open,
    onEmptySpace
}: ModalWindowProps) => {

    
    useEffect(()=>{
        open ? document.body.style.overflow = 'hidden'
             : document.body.style.overflow = 'visible'
    }, [open])


  

    return (
        <div className={`fixed bg-black/70 top-0 left-0 w-full h-full flex items-center justify-center ${open ? '': 'hidden'}`}
            onClick={onEmptySpace}
        >
           <div
            onClick={(e)=>{e.stopPropagation()}}
           >
            {children}
           </div>
        </div>
    )
}