import {ReactNode} from 'react'

interface ControlButtonProps {
    icon: ReactNode | number
    className?: string
}

export const ControlButton = ({
    icon,
    className
}: ControlButtonProps) => {
    return (
        <button
            className={`border hover:border-blue-500 duration-200 px-2 rounded-md shadow-inner bg-slate-300/60 ${className}`}
        >{icon}</button>
    )
}