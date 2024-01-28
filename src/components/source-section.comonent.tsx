import { useEffect, useRef } from "react"
import { toHTML } from "../functions/toHTML"

interface SourceSectionProps {
    text: string
}

export const SourceSection = ({
    text
}: SourceSectionProps) => {

    const div = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        toHTML(div, text)
    }, [])

    return (
        <div 
            className="bg-green-300/20 px-2 py-1 border-l-4 border-green-700 rounded-sm"
            ref = {div}
        >
            {text}
        </div>
    )
}