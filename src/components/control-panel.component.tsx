import { AddCommentOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import { MouseEvent } from "react"

interface ControlPanelProps {
    total?: number
    onCreate?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ControlPanel = ({
    total,
    onCreate
}: ControlPanelProps) => {
    return (
        <div className=" bg-gray-400 rounded-lg shadow-md py-2 px-3 flex justify-between items-center">
            <Button 
                variant="contained" 
                endIcon={<AddCommentOutlined />}
                onClick={onCreate}
            >
                Создать сообщение
            </Button>
            <div>
                Всего записей: {total || 0}
            </div>
        </div>
    )
}