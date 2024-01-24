import { allowedDocumenst, allowedPictures } from "../data/allowed-extantions.data"
import { getExtantion } from "../functions/get-extention"
import { FileResponce } from "../models/server-responce/file-responce.model"

export class Fetch {

    private async apiFetch <T>(url: string, init: RequestInit) {
        const responce = await fetch(`http://localhost:3030/api/${url}`,  init)
        const json: T = await responce.json()
        return json 
    }

    async createFile (file: File) {
        const body = new FormData()
        body.append('file', file)
        const fileExt = getExtantion(file.name)
        let route = 'picture'
        if(fileExt){
          if(allowedPictures.includes(fileExt)) route = 'picture'
          if(allowedDocumenst.includes(fileExt)) route = 'document'
        }
        const responce = await this.apiFetch<FileResponce>(`file/${route}`, {body, method: 'POST'})
        return responce
    }
}

export const apiFetch = new Fetch()