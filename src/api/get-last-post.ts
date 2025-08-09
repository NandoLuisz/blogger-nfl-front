import { api } from "../lib/api"
import type { PostResponse } from "./get-all-posts"

export async function lastPost(){
    const response = await api.get<PostResponse | null>('post/last-post')
    return response.data
}