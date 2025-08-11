import { CloudUpload } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../lib/api";
import { AdminContext } from "../AdminContext";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const postCreateFormSchema = z.object({
    imagePost: z
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
    title: z.string().min(25).max(100),
    content: z.string().min(200),
    type: z.string().min(6).max(12)
})

type PostFormFields = z.infer<typeof postCreateFormSchema>

export default function AddBlog(){

    const context = useContext(AdminContext)

    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const [editorContent, setEditorContent] = useState("");

    if (!context) {
      return 
    }

    const { creatorId } = context

    const {
        register, 
        handleSubmit, 
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormFields>()

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
            setThumbnail(URL.createObjectURL(file));

            setValue("imagePost", [file]); 
        }
    }

     const onSubmit: SubmitHandler<PostFormFields> = async (data) => {

            if(!creatorId) return
        
            if (!data.imagePost || data.imagePost.length === 0) {
                console.error("Nenhuma imagem foi enviada.");
                return;
            }
            
            const result = postCreateFormSchema.safeParse(data) 
            console.log(result)
            if(!result.success) return 
    
            const { imagePost, title, content, type } = data
    
            const formPost = new FormData()
            formPost.append("imagePost", imagePost[0]);
            formPost.append("title", title);
            formPost.append("content", content);
            formPost.append("creatorId", creatorId);
            formPost.append("type", type)
    
            try{
                const response = await api.post("post/create-post", formPost, {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                })
    
                if(response.status === 200 || response.status === 201) 
                    toast.success("Post feito com sucesso!")
                    reset(); 
                    setThumbnail(null); 
                    setEditorContent(""); 
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""; 
                    }
    
            } catch (error: any) {
                console.log(error)
            }
        }

    return (
        <form 
            className='w-96 flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
            >
            <ToastContainer position="bottom-right" autoClose={2000} />
            <div className='flex flex-col gap-3 w-50'>
                <span className='text-lg'>Carregue a Miniatura</span>
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
                {errors.imagePost && <p className="error">{errors.imagePost.message}</p>}
            </div>
            <div className='flex flex-col gap-3 w-full'>
                <span className='text-lg'>Título do Blog</span>
                <input 
                    {...register("title", 
                        {required: "Título obrigatório", 
                                                    minLength: {
                                                        value: 25,
                                                        message: "Título precisa ter no mínimo 25 caracteres"
                                                    }
                                                    })} 
                    type="text" 
                    placeholder='Digite aqui' 
                    className='w-full max-md:w-[65%] px-3 py-3 border-[0.5px] border-gray-400 outline-none'
                />
                {errors.title && <span className="text-red-700 text-xs">{errors.title.message}</span>}
            </div>
            <div className='flex flex-col gap-3 w-full max-md:w-[65%]'>
                <span className='text-lg'>Descrição do Blog</span>
                <ReactQuill
                    theme="snow"
                    value={editorContent}
                    onChange={(value) => {
                        setEditorContent(value);
                        setValue("content", value); 
                    }}
                    className="bg-white border border-gray-300"
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link'],
                            ['clean']
                        ]
                    }}
                />
                {errors.content && <span className="text-red-700 text-xs">{errors.content.message}</span>}
            </div>
            <div className='flex flex-col gap-3 w-48'>
                <span className='text-lg'>Categoria do Blog</span>
                <select 
                    className='p-3 border-[0.5px] border-gray-400 outline-none text-gray-500'
                    {...register("type")}
                    >
                    <option value="Startups">Startups</option>
                    <option value="Tecnológia">Tecnológia</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            </div>
            <button 
                type='submit' 
                className='w-48 bg-black text-white py-3 cursor-pointer mb-5'>
                {isSubmitting ? "Adicionando..." : "ADD"}
            </button>
        </form>
    )
}