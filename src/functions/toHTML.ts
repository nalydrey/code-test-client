import { RefObject } from "react"

export const toHTML = (ref: RefObject<HTMLElement>, text: string) => {
    if(ref.current){
            ref.current.innerHTML = text
        const code = ref.current.querySelectorAll('code')
        code.forEach(elem => {
            const {style} = elem
            style.background = '#27294a'
            style.borderRadius = '8px'
            style.padding = '10px'
            style.color = '#11e00acc'
        })
        const a = ref.current.querySelectorAll('a')
        a.forEach(elem => {
            const {style} = elem
            style.textDecoration = 'underline' 
            style.fontWeight = '500'
            style.color = 'blue'
        }) 
    }
}