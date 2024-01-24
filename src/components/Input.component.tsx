import {  TextField } from "@mui/material"
import { ChangeEvent, FocusEvent, ReactNode } from "react"

interface InputProps {
    name: string
    label: string
    value?: unknown
    error?: boolean
    helperText?: ReactNode 
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void

}

export const Input = ({
    value,
    name,
    label,
    error,
    helperText,
    onChange,
    onBlur
}:InputProps) => {

    return (
        <div className="flex items-end">
            <TextField
                variant='standard'
                fullWidth
                name={name}
                label = {label}
                value={value}
                error={error}
                helperText = {helperText}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}