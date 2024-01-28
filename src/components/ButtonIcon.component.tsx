import { KeyboardDoubleArrowDownOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"


export const ButtonIcon = () => {
    return (
        <div className={` duration-200 ${state === 'name' ? 'rotate-180':' rotate-0'}`}>
            <IconButton 
                onClick={() => {handleClick('name')}}
            >
                <KeyboardDoubleArrowDownOutlined />

            </IconButton>
        </div>
    )
}