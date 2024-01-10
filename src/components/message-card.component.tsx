import { Avatar } from "./avatar.component"
import ava from '../assets/avatars/avatar_10.png'
import moment from 'moment'
import 'moment/locale/ru'
import { ControlButton } from "./control-button.component"
import { Counter } from "./counter.component"
import { SourceSection } from "./source-section.comonent"
import { ContentSection } from "./content-section.component"




export const MessageCard = () => {

   
   
    

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
                    <span className="font-bold text-xl">Name</span>
                    <div>{moment().add('days').calendar()}</div>
                    <div>
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
                            icon = {4}
                        />
                    </div>
                </div>
                <Counter/>
            </header>
            <div className="py-2 px-4">
                <ContentSection/>
                <SourceSection/>
            </div>
        </div>
    )
}