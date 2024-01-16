import { MouseEvent } from "react"

interface AvatarItemProps {
    title: string
    src: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const AvatarItem = ({
    src,
    title,
    onClick
}:AvatarItemProps) => {
    return (
        <button 
            className='p-1 border border-gray-300 rounded-md flex flex-col items-center max-w-20 hover:shadow-2xl hover:border-gray-400 duration-200'
            onClick = {onClick}
        >
            <img className='w-20' src={src} alt="" />
            <h3 className='text-center text-md font-medium first-letter:capitalize'>{title}</h3>
        </button>
    )
}