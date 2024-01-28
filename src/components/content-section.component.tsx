import { useEffect, useRef } from "react"
import { toHTML } from "../functions/toHTML"

interface ContentSectionProps {
    text: string
}


export const ContentSection = ({
    text
}: ContentSectionProps) => {

    const div = useRef<HTMLDivElement>(null)
 

    useEffect(()=>{
        toHTML(div, text)
    }, [text])




    return (
        <div
            ref = {div}
            className="py-2"
        >
            {text}
        </div>
    )
}