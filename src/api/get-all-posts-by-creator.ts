import { api } from "../lib/api"
import type { PostResponse } from "./get-all-posts"

export async function getAllPostsByCreator( creatorId:string ){
    const response = await api.get<PostResponse[]>(`/post/all-posts-by-creator/${creatorId}`)

    return response.data
}