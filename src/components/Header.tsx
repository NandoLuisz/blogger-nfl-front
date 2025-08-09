import { ArrowRight, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { CreatorResponse } from "../api/get-all-posts";
import { getDataCreatorByToken } from "../api/get-creator-data-by-token";
import { Link } from "react-router-dom";
import { deleteCookie } from "../api/delete-cookie";

export default function HeaderAllPosts(){

    const [creatorAuthenticated, setCreatorAuthenticated] = useState<boolean>(false)
    const [modalPerfil, setModalPerfil] = useState<boolean>(false)
    const [creator, setCreator] = useState<CreatorResponse>({
        username: "",
        imageProfileUrl: "",
        id: "",
        email: ""
    })

    const handleLogout = () => {
        deleteCookie()
        window.location.reload()
    };

    useEffect(() => {
        const fetchDataCreator = async () => { 
            const data: CreatorResponse | null = await getDataCreatorByToken(); 
            if(!data) return 
            setCreator({
                username: data.username ?? "",
                imageProfileUrl: data.imageProfileUrl ?? "",
                id: data.id ?? "",
                email: data.email ?? ""
            })
            setCreatorAuthenticated(true)
        }

        fetchDataCreator();
    }, []);


    return(
        <header className='w-full h-[20vh] max-md:h-[15vh]'>
            <div className="flex items-center justify-between px-12 py-3 relative max-md:px-4">
                {modalPerfil && (
                    <div className="absolute min-w-[100px] h-[100px] flex flex-col justify-between rounded-md px-3 py-3 right-12 top-20 border-[2px] border-black">
                        <p className="text-base">{creator.username}</p>
                        <div className="w-full h-[2px] bg-zinc-600"></div>
                        <div className="w-full flex gap-2" onClick={() => handleLogout()}>
                            <LogOut className="size-5 text-red-600 cursor-pointer"/>
                            <span className="text-sm text-red-600 cursor-pointer">sair</span>
                        </div>
                    </div>
                )}
                <Link to="/">
                    <div className='flex items-center cursor-pointer'>
                        <img src={"/icon-logo.png"} width={66} height={66} alt="Logo"/>
                        <span className="text-black text-2xl max-md:text-xl font-semibold tracking-tighter">NFL's Blogger</span>
                    </div>
                </Link>
               {creatorAuthenticated ? (
                <div className="flex items-center gap-5">
                    <Link to="/add-blog">
                        <div className='bg-white flex items-center gap-3 p-2 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <span className="max-md:text-xs">Meu inventário</span>
                        </div>
                    </Link>
                    {(creator.imageProfileUrl && creator.username) ? (
                        <img src={creator.imageProfileUrl} 
                            alt={creator.username} 
                            className={`rounded-full cursor-pointer w-[55px] h-[55px] 
                                object-cover ${modalPerfil ? "border-[2px] border-black" : "border-2 border-white"}  max-md:hidden`} 
                            onClick={() => setModalPerfil(!modalPerfil)}
                            />
                    ): (
                        <img src="/perfil.jpeg" alt="username" className='rounded-full cursor-pointer w-[55px] h-[55px] object-cover  max-md:hidden'/>
                    )}
                </div>
               ) : (
                <Link to="/sign-in">
                    <div className="flex items-center justify-center gap-2 max-md:gap-1 px-4 py-2 max-md:px-2 max-md:py-1 border-[0.5px] 
                                    border-black text-black text-base max-md:text-xs cursor-pointer shadow-links hover:shadow-links-move">
                            Começar
                            <ArrowRight className="max-md:size-4"/>
                        </div>
                </Link>
               )}
            </div>
        </header>
    )
}