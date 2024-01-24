import { CodeBracketIcon, DocumentPlusIcon, LinkIcon, PaperClipIcon } from "@heroicons/react/16/solid"
import { ControlButton } from "./control-button.component"
import { BoldIcon } from "./icons/bold-icon.component"
import { ItalicIcon } from "./icons/italic-icon.component"
import { ChangeEvent, MouseEvent, useRef } from "react"

interface TagButtonsProps {
    onAddTag: (e: MouseEvent<HTMLButtonElement>, text: string) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TagButtons = ({
    onAddTag,
    onChange
}: TagButtonsProps) => {

    const fileRef = useRef<HTMLInputElement | null>(null)


    const handleClickRef = () => {
      if(fileRef.current){
        fileRef.current.click()
      }
    }

    return (
        <div className='flex gap-2'>
        <ControlButton
          type='button'
          className='w-5 p-1'
          icon = {<BoldIcon/>}
          onClick={(e) => onAddTag(e, '<strong></strong>')}
        />
        <ControlButton
          type='button'
          className='w-5 p-1'
          icon = {<ItalicIcon/>}
          onClick={(e) => onAddTag(e,  '<i></i>')}
        />
        <ControlButton
          type='button'
          className='w-6 p-1 '
          icon = {<CodeBracketIcon/>}
          onClick={(e) => onAddTag(e, '<code></code>')}
        />
        <ControlButton
          type='button'
          className='w-6 p-1 '
          icon = {<LinkIcon/>}
          onClick={(e) => onAddTag(e, '<a href=”” title=””></a>')}
        />
        <ControlButton
          type='button'
          className='w-6 p-1 '
          icon = {<PaperClipIcon />}
          onClick={handleClickRef}
        />
        <input 
          className=" hidden"
          ref = {fileRef}
          onChange={onChange}
          type="file"
        />
      </div>
    )
}