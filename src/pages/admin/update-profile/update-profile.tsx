import { useContext, useRef, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { CloudUpload } from "lucide-react"
import { AdminContext } from "../AdminContext"
import { api } from "../../../lib/api"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface UpdateProfileResponse{
    imageProfileUrl: string
}

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileUpdateFormSchema = z.object({
    imageProfile: z
    .array(z.instanceof(File))
    .nonempty("Image is required.")
    .max(1, "You can only upload one file.")
    .refine(
        (files) => files[0].size <= MAX_FILE_SIZE,
        `Max file size is 20MB.`
    )
    .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})

type ProfileUpdateFormFilds = z.infer<typeof profileUpdateFormSchema>

export default function UpdateProfilePage(){
    const context = useContext(AdminContext)
    const creatorId = context?.creatorId
    const imageProfileUrl = context?.imageProfileUrl
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const {
        handleSubmit, 
        setValue,
        formState: { isSubmitting },
    } = useForm<ProfileUpdateFormFilds>()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
            setThumbnail(URL.createObjectURL(file));

            setValue("imageProfile", [file]); 
        }
    };

    const onSubmit: SubmitHandler<ProfileUpdateFormFilds> = async (data) => {
        
        if(!creatorId) return

        if (!data.imageProfile || data.imageProfile.length === 0) {
            return;
        }
        
        const result = profileUpdateFormSchema.safeParse(data) 
        if(!result.success) return 

        const { imageProfile } = data

        if(!imageProfileUrl) return

        const formPost = new FormData()
        formPost.append("imageProfile", imageProfile[0]);
        formPost.append("id", creatorId)
        formPost.append("imageUrlProfile", imageProfileUrl)

        try{
            const response = await api.put<UpdateProfileResponse>("/creator/update-image-creator-profile", formPost, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            })

            if(response.status != 400){
                toast.success("Perfil alterado com sucesso!")
                context?.setImageProfileUrl(response.data.imageProfileUrl);
                setThumbnail(null)
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    return(
        <form 
            className='w-96 flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
            >
            <ToastContainer position="bottom-right" autoClose={3000} />
            <div className='flex flex-col gap-3 w-50'>
                <span className='text-lg'>Carregue sua foto</span>
                <div 
                    className='w-42 h-20 flex flex-col items-center 
                                justify-center bg-gray-100 border-dashed 
                                border-2 border-gray-300 cursor-pointer relative'
                    onClick={() => {fileInputRef.current?.click()}}>
                    {thumbnail ? (
                        <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <CloudUpload className='text-gray-400 size-9'/>
                            <span className='text-gray-400 text-sm'>Carregar</span>
                        </>
                    )}
                    <input 
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        onChange={handleFileChange}  
                        ref={fileInputRef} 
                        className="absolute right-[9999px]"
                    />
                </div>
            </div>
            <button 
                type='submit' 
                className='w-42 bg-black text-white py-3 cursor-pointer'>
                {isSubmitting ? "Editando..." : "Editar"}
            </button>
        </form>
    )
}