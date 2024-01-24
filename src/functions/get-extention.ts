import { extRegExp } from "../models/regular-expressions/extention.regExp"

export const getExtantion = (fileName: string) => {
    const extantionArr = fileName.match(extRegExp)
    if(extantionArr){
        return extantionArr[0].slice(1)
    }
}