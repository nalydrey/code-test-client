import { IconButton, InputAdornment, TextField } from "@mui/material"

import { UserPlusIcon } from "@heroicons/react/16/solid"
import { ChangeEvent, FocusEvent, MouseEvent, ReactNode } from "react"

interface InputProps {
    name: string
    label: string
    icon?: JSX.Element
    value?: unknown
    error?: boolean
    helperText?: ReactNode 
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void

}

export const Input = ({
    value,
    name,
    label,
    icon,
    error,
    helperText,
    onClick,
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
            {
                icon &&
                <IconButton
                    sx={{padding: '4px'}}
                    onClick={onClick}
                >
                    <div className="w-8">
                        {icon}
                    </div>
                </IconButton>
            }
        </div>
    )
}