import { api } from "../lib/api"

export async function deletePostById( id: string ){
    const response = await api.delete(`/post/delete-post/${id}`)
    
    return response.status
}