
const tagRegExp = new RegExp('</?[^>]*>', 'g')

export const forbiddenTagList = (text: string = '', allowedTags: string[]): string[] => {
    const allTags = text.match(tagRegExp)?.map(elem => {
        const newTag = elem.slice(1, -1).trim().split(' ')[0]
        if(newTag[0] !== '/'){
            return newTag
        }
        return ''
    }).filter(item => item) || [];
    if(allTags.length){
        const forbidenTags = allTags.filter(tag => !allowedTags.includes(tag)) || []
        return forbidenTags 
    }
    return []
}