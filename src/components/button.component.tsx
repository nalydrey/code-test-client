import {  MouseEvent } from "react"

interface ButtonProps {
    type?: 'reset' | 'button' | 'submit'
    title: string
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({
    type,
    title,
    onClick
}: ButtonProps) => {
    return (
        <button
            type={type}
            className="border px-5 py-2 rounded-md duration-200 bg-slate-500 font-medium text-gray-200 hover:bg-slate-700"
            onClick={onClick}
        >
            {title}
        </button>
    )
}