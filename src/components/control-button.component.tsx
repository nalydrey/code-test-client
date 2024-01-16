import { MouseEvent, ReactNode} from 'react'

interface ControlButtonProps  {
    type?: "submit" | "reset" | "button"
    icon: ReactNode | number
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ControlButton = ({
    type,
    icon,
    className,
    onClick
}: ControlButtonProps) => {
    return (
        <button
            type={type}
            className={`border flex justify-center items-center hover:border-blue-500 duration-200 px-1 rounded-md shadow-inner bg-slate-300/60 ${className}`}
            onClick={onClick}
        >
            <div className='w-5'>
                {icon}
            </div>
        </button>
    )
}