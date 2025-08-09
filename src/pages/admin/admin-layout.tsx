import { CirclePlus, LogOut, SquarePen, UserPen } from "lucide-react";
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom"
import { AdminContext } from "./AdminContext";
import { deleteCookie } from "../../api/delete-cookie";

export default function AdminLayout(){

    const context = useContext(AdminContext)

    const imageProfileUrl = context?.imageProfileUrl;
    const username = context?.username;

    const [modalPerfil, setModalPerfil] = useState<boolean>(false)

    const handleLogout = () => {
            deleteCookie()
            window.location.reload()
        };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col gap-10 font-poppins">
            {modalPerfil && (
                                <div className="absolute min-w-[100px] h-[100px] bg-white flex flex-col justify-between rounded-md px-3 py-3 right-12 top-20 border-[2px] z-50 border-black md:hidden">
                                    <p className="text-base">{username}</p>
                                    <div className="w-full h-[2px] bg-zinc-600"></div>
                                    <div className="w-full flex gap-2" onClick={() => handleLogout()}>
                                        <LogOut className="size-5 text-red-600 cursor-pointer"/>
                                        <span className="text-sm text-red-600 cursor-pointer">sair</span>
                                    </div>
                                </div>
                            )}
            <div className="w-full h-[15vh] px-20 max-md:px-5 flex justify-between items-center border-b-2 border-black">
                <Link to="/">
                    <div className="flex items-center px-12 max-md:px-0 py-3 border-gray-800">
                        <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                        <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                    </div>
                </Link>
                <div className='flex items-center gap-5'>
                    <span className="max-md:hidden">Painel do administrador</span>
                    {(imageProfileUrl && username) ? (
                        <img
                            key={imageProfileUrl} 
                            src={imageProfileUrl}  
                            alt={username} 
                            className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover'
                            onClick={() => setModalPerfil(!modalPerfil)}/>
                    ): (
                        <img 
                            src="/profile-default.jpg" 
                            width={50} 
                            height={50} 
                            alt="username" 
                            className='rounded-4xl cursor-pointer' 
                            onClick={() => setModalPerfil(!modalPerfil)}/>
                    )}
                </div>
            </div>
            <div className="w-full min-h-[80vh] flex gap-10">
                <div className="flex flex-col items-end gap-5">
                    <Link to="/add-blog">
                        <div className="w-64 max-md:w-12 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                        <CirclePlus />
                        <span className="max-md:hidden">Add blogs</span>
                        </div>
                    </Link>
                    <Link to="/blog-list">
                        <div className="w-64 max-md:w-12  h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                        <SquarePen />
                        <span className="max-md:hidden">Lista de blogs</span>
                        </div>
                    </Link>
                    <Link to="/update-profile">
                        <div className="w-64 max-md:w-12  h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border border-black cursor-pointer shadow-links hover:shadow-links-move">
                        <UserPen />
                        <span className="max-md:hidden">Meu perfil</span>
                        </div>
                    </Link>
                </div>
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}



