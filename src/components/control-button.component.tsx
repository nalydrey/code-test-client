import {MouseEvent, ReactNode} from 'react'

interface ControlButtonProps {
    icon: ReactNode | number
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ControlButton = ({
    icon,
    className,
    onClick
}: ControlButtonProps) => {
    return (
        <button
            className={`border hover:border-blue-500 duration-200 px-1 rounded-md shadow-inner bg-slate-300/60 ${className}`}
            onClick={onClick}
        >
            <div className='w-5'>
                {icon}
            </div>
        </button>
    )
}