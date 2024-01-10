import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/16/solid"
import { ControlButton } from "./control-button.component"

export const Counter = () => {
    return (
        <div 
            className="flex items-center gap-1"    
        >
            <ControlButton
                className="px-0 py-1"
                icon={<ArrowLongDownIcon className="w-4"/>}
            />
            <span>0</span>
            <ControlButton
                className="px-0 py-1"
                icon={<ArrowLongUpIcon className="w-4"/>}
            />
        </div>
    )
}