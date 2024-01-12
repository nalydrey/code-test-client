import { ReactNode } from "react"
import { Avatar } from "./avatar.component"
import ava from '../assets/avatars/avatar_10.png'
import moment from 'moment'
import 'moment/locale/ru'
import { ControlButton } from "./control-button.component"
import { Counter } from "./counter.component"
import { TrashIcon } from "@heroicons/react/16/solid"
import { MouseEvent } from "react"


interface MessageCardProps {
    userName: string,
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
}


export const MessageCard = ({
    userName,
    children,
    onDelete
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
                        src={ava}
                    />
                    <span className="font-bold text-xl">{userName}</span>
                    <div>{moment().add('days').calendar()}</div>
                    <div className="flex">
                        <ControlButton
                            icon = {1}
                        />
                        <ControlButton
                            icon = {2}
                        />
                        <ControlButton
                            icon = {3}
                        />
                        <ControlButton
                            onClick={onDelete}
                            className="hover:text-red-500"
                            icon = {<TrashIcon/>}
                        />
                    </div>
                </div>
                <Counter/>
            </header>
            <div className="py-2 pl-5 pr-1">
              {children}
            </div>
        </div>
    )
}