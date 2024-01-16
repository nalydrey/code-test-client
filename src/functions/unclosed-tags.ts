
export const unclosedTags = (text: string, checkTags: string[]): string[] => {
    const errors = checkTags.filter((item)=>{
        const openTagRegExp = new RegExp(`< *${item}( *[a-zA-Z]* *= *['"][\\w]*['"])* *>`, 'g')
        const closeTagRegExp = new RegExp(`< */${item} *>`, 'g')
        console.log(text.match(openTagRegExp));
        const lengthOpenTags = text.match(openTagRegExp)?.length || 0
        let lengthCloseTags = 0
        if(length){
            // console.log(text.match(closeTagRegExp));
            lengthCloseTags = text.match(closeTagRegExp)?.length || 0
        }
        // console.log(lengthOpenTags, lengthCloseTags);
        return lengthOpenTags !== lengthCloseTags && item
    })
    // console.log(errors);
    
    return errors
}