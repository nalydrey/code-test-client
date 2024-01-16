import { MouseEvent, useEffect } from "react"

interface ModalWindowProps {
    className?: string
    children: JSX.Element 
    open: boolean
    onEmptySpace?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ModalWindow = ({
    className,
    children,
    open,
    onEmptySpace
}: ModalWindowProps) => {

    
    useEffect(()=>{
        open ? document.body.style.overflow = 'hidden'
             : document.body.style.overflow = 'visible'
    }, [open])


  

    return (
        <>
        {
            open &&
            <div className={`fixed bg-black/70 top-0 left-0 w-full flex h-full items-center justify-center ${className}`}
                onClick={onEmptySpace}
            >
            <div
                onClick={(e)=>{e.stopPropagation()}}
            >
                {children}
            </div>
            </div>
        }
        </>
    )
}