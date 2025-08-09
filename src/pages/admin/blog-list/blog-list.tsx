import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AdminContext";
import type { PostResponse } from "../../../api/get-all-posts";
import { getAllPostsByCreator } from "../../../api/get-all-posts-by-creator";
import formatarData from "../../../api/date-format";
import { deletePostById } from "../../../api/delete-post-by-id";

export default function BlogListPage(){

    const context = useContext(AdminContext)

    const creatorId  = context?.creatorId

    const [postsByCreator, setPostByCreator] = useState<PostResponse[]>([])

    
     useEffect(() => {
        if(!creatorId) return

        const fetchPosts = async () => {
            const posts = await getAllPostsByCreator(creatorId)
            setPostByCreator(posts)
        }

        fetchPosts()
    }, [creatorId, postsByCreator])

    function truncateText(text: string, maxLength: number = 45): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    function truncateTextName(text: string, maxLength: number = 12): string {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    return ( 
        <div className='w-full h-full'>
            <h3 className='text-xl font-semibold mb-5'>Teus Posts</h3>
            <div className='w-[852px] max-md:w-[95%] min-h-[10vh] border-[1px] border-black md:text-center'>
                <div className='w-[850px] max-md:w-full md:grid md:grid-cols-[200px_400px_200px] max-md:flex max-md:justify-between max-md:items-center bg-zinc-200 p-2'>
                    <span className='font-medium max-md:hidden'>Nome do autor</span>
                    <span className='font-medium'>Título do post</span>
                    <div className='md:w-[220px] flex justify-between max-md:hidden'>
                        <span className="max-md:hidden font-medium">Data</span>
                        <span className='font-medium'>Ação</span>
                    </div>
                    <span className='md:hidden font-medium'>Ação</span>
                </div>
                {postsByCreator.length > 0 ? (
                    postsByCreator.map((post) => (
                        <div 
                            className='w-[850px] max-md:w-full md:grid md:grid-cols-[200px_400px_150px] max-md:flex max-md:justify-between max-md:items-center p-2 border-t-[1px] border-zinc-200'
                            key={post.id}>
                            <div className='flex gap-2 items-center max-md:hidden'>
                                <img 
                                    src={post.creator.imageProfileUrl}     
                                    alt={post.creator.username}
                                    className='rounded-4xl cursor-pointer w-[35px] h-[35px] object-cover max-md:hidden' />
                                    <span className="max-md:hidden">{truncateTextName((post.creator.username).toString())}</span>
                            </div>
                            <span className='flex md:items-center'>{truncateText((post.title).toString())}</span>
                            <div className='md:w-[210px] md:flex md:justify-between'>
                                <span className='flex items-center max-md:hidden'>{formatarData(post.createdAt)}</span>
                                <span className='md:flex md:items-center'>
                                    <X 
                                        className='text-zinc-700 hover:text-red-700'
                                        onClick={() => deletePostById(post.id)}/>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='text-zinc-400 text-center max-md:mr-10'>Não tem posts para serem exibidos.</span>
                )}
            </div>
        </div>
    )
}