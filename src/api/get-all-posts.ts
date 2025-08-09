import { api } from "../lib/api"

export interface CreatorResponse{
    id: string
    username: string
    email: string
    imageProfileUrl: string
}

export interface PostResponse{
    id: string
    title: string
    content: string
    imagePostUrl: string
    creator: CreatorResponse
    createdAt: string
    type: string
}

export async function getAllPosts(){
    const response = await api.get<PostResponse[]>('/post/all-posts')

    return response.data
}