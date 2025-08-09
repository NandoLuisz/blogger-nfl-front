import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
 return (
    <main className="w-full h-screen flex items-center justify-center relative">
      <Link to="/">
        <button className="bg-blue-400 hover:bg-blue-500 text-white text-xs flex gap-1 rounded-md px-4 py-2 absolute left-5 top-5 max-md:left-3 max-md:top-3 cursor-pointer">
          <ArrowLeft className="size-4" />
          Voltar para os posts
        </button>
      </Link>
      <div className="w-[450px] min-h-[600px] max-md:max-md:w-[90%] bg-white border-[0.5px] flex flex-col items-center gap-2 border-black px-6 py-6 rounded-md">
        <img src="/icon-logo.png" width={50} height={50} alt="Logo" />
        <Outlet />
      </div>
    </main>
  );
}
