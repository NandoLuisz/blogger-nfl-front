import { ArrowUpRight } from "lucide-react"
import type { CreatorResponse } from "../api/get-all-posts"
import { Link } from "react-router-dom"

interface CardPostProps{
    id: string
    imagePostUrl: string
    type: string
    creator: CreatorResponse
    title: string
}

export default function CardPost({ id, imagePostUrl, type, title, creator }: CardPostProps){
    return (
        <div className="border-[0.5px] border-black md:hover:shadow-links">
            <img src={imagePostUrl} alt={title} className='w-full h-[200px] max-md:h-[150px]'/>
            <div className="w-full px-2 py-2 flex flex-col gap-2 relative">
                <div className="w-full flex items-center justify-between ">
                <img src={creator.imageProfileUrl} alt={creator.username} className='w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px] object-cover rounded-full'/>
                <p className="bg-black text-white px-1 py-1 text-xs">{type}</p>
                </div>
                <p className="font-serif">{creator.username}</p>
                <p className="tracking-tighter max-md:text-sm">{title}</p>
                <Link to={`post/${id}`}>
                    <button className="flex bg-zinc-100 px-2 py-[0.5px] rounded-md hover:bg-zinc-200 
                                        cursor-pointer max-md:absolute max-md:-bottom-2 max-md:right-2 max-md:bg-zinc-300 max-md:opacity-80 max-md:text-xs">
                        Ler mais  
                        <ArrowUpRight className="max-md:size-3"/>
                    </button>
                </Link>
            </div>
        </div>
    )
}