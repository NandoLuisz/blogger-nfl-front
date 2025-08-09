import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import type { PostResponse } from "../api/get-all-posts"
import { lastPost } from "../api/get-last-post"
import formatarData from "../api/date-format"
import { Link } from "react-router-dom"

export default function LastPost(){
    const [thaLastPost, setTheLastPost] = useState<PostResponse | null>(null)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const post = await lastPost()
                if (post != null) {
                    setTheLastPost(post) 
                }
            } catch (error) {
            }
        }

        fetchPosts()

    }, [])

    if (!thaLastPost) return <p className="max-md:text-sm">Carregando...</p>

    return(
        <div className='w-[80%] max-md:w-full px-4 py-4'>
            {thaLastPost && (
                <div className="w-full relative">
                    <img src={thaLastPost.imagePostUrl} alt={thaLastPost.title} className='w-full h-[600px] max-md:h-[300px] object-cover border-[0.5px] border-black'/>
                    <p className="font-poppins md:hidden text-sm text-zinc-800">{formatarData(thaLastPost.createdAt)}</p>
                    <div className="absolute left-10 max-md:left-2 bottom-10 flex items-center max-md:items-end gap-4">
                        <img 
                            src={thaLastPost.creator.imageProfileUrl} 
                            alt={thaLastPost.creator.username} 
                            className="w-[80px] h-[80px] max-md:w-[55px] max-md:h-[55px] border-2 border-white rounded-full object-cover z-10"/>
                        <div>
                            <div>
                                <p className="font-poppins text-white max-md:hidden">{formatarData(thaLastPost.createdAt)}</p>
                                <p className="z-10 text-white text-2xl max-md:text-xl font-serif">{thaLastPost.creator.username}</p>
                                <p className="z-10 text-white text-3xl max-md:text-2xl tracking-tighter">{thaLastPost.title}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/post/${thaLastPost.id}`}>
                        <button 
                            className="flex items-center bg-zinc-100  px-4 py-2 rounded-md hover:bg-zinc-200 
                                        cursor-pointer absolute bottom-10 right-10 z-50 pointer-events-auto 
                                        max-md:bottom-0 max-md:right-5  max-md:bg-zinc-300 max-md:opacity-80 max-md:text-xs">
                            Ler mais  
                            <ArrowUpRight className="max-md:size-3"/>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}


