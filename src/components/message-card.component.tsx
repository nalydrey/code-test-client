import { MouseEvent, ReactNode } from "react"
import { Avatar } from "./avatar.component"
import moment from 'moment'
import 'moment/locale/ru'
import { ControlButton } from "./control-button.component"
import { PreviewFile } from "./preview-file.component"
import { getExtantion } from "../functions/get-extention"
import { IFile } from "../models/file.model"
import { DeleteForeverOutlined, ReplyOutlined } from "@mui/icons-material"


interface MessageCardProps {
    file: IFile | null
    avaSrc: string
    userName: string,
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
    onShow?: (e: MouseEvent<HTMLButtonElement>) => void
    onReply?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const MessageCard = ({
    file,
    avaSrc,
    userName,
    children,
    onDelete,
    onShow,
    onReply
}: MessageCardProps) => {

    
   
    

    return (
        <div className="max-w-[700px] shadow-xl">
            <header
                className="bg-gray-200  flex justify-between items-center  py-1 px-3 rounded-t-lg"
            >
                <div
                    className="flex gap-4 items-center"
                >
                    <Avatar
                        src={avaSrc}
                    />
                    <span className="font-bold text-xl">{userName}</span>
                    <div>{moment().add('days').calendar()}</div>
                    <div className="flex grow">
                        <ControlButton
                            icon = {1}
                        />
                        <ControlButton
                            icon = {2}
                        />
                        <ControlButton
                            icon = {<ReplyOutlined/>}
                            onClick={onReply}
                        />
                        <ControlButton
                            onClick={onDelete}
                            className="hover:text-red-500"
                            icon = {<DeleteForeverOutlined/>}
                        />
                    </div>
                </div>
                    {
                        file &&
                        <PreviewFile
                            ext={getExtantion(file.name)}
                            onClick={onShow}
                        />
                    }
            </header>
            <div className="py-2 pl-5 pr-1">
              {children}
            </div>
        </div>
    )
}