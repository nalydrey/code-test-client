import { useEffect, useRef } from "react"
import { toHTML } from "../functions/toHTML"

interface ParagraphProps {
    text: string
}

export const Paragraph = ({
    text
}: ParagraphProps) => {

    const paragraph = useRef<HTMLParagraphElement | null>(null)

    useEffect(()=>{
        console.log('!');
        toHTML(paragraph, text)
    }, [text])

    return (
        <p 
            ref = {paragraph}
            className="px-3"
        >
            {text}
        </p> 
    )
}