import { useEffect, useRef } from "react"

interface ContentSectionProps {
    text: string
}

const styles: CSSStyleDeclaration = {
    background: 'black'
}

export const ContentSection = ({
    text
}: ContentSectionProps) => {

    const div = useRef<HTMLDivElement>(null)
 

    useEffect(()=>{
        console.log(div);
        if(div.current){
            div.current.innerHTML = text
            const code = div.current.querySelectorAll('code')
            code.forEach(elem => {
                const {style} = elem
                style.background = '#27294a'
                style.borderRadius = '8px'
                style.padding = '10px'
                style.color = '#11e00acc'
            })
            const a = div.current.querySelectorAll('a')
            a.forEach(elem => {
                const {style} = elem
                style.textDecoration = 'underline' 
                style.fontWeight = '500'
                style.color = 'blue'
            })
        }
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