import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { z } from "zod";
import { api } from "../../../lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";

const creatorRegisterFormSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
  })
  
type RegisterFormFields = z.infer<typeof creatorRegisterFormSchema>

export default function SingUp(){

  const [type, setType] = useState('password');
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false)

  const timeSuccess = () => {
    setTimeout(() => {
      setSignUpSuccess(true)
    }, 2000)
    setSignUpSuccess(false)
  }

  const 
  { register, 
    handleSubmit, 
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>()

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
  const result = creatorRegisterFormSchema.safeParse(data) 
    
  if(!result.success) return 

  const { username, email, password } = data
    const role  = "ADMIN"
    const user = {
      username,
      password,
      email,
      role
    }
  
    try {
      const response = await api.post("auth/register-creator", JSON.stringify(user))
      if(response.status != 400){
        timeSuccess()
        reset() 
      } 
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data
        
        if (errorMessage === "Usuário já cadastrado.") {
          setError("username", { message: errorMessage });
        } else if (errorMessage === "Email já cadastrado.") {
          setError("email", { message: errorMessage });
        } else {
          setError("root", { message: "Erro inesperado ao registrar o usuário." });
        }

      } else {
        setError("root", { message: "Erro de conexão com o servidor." });
      }
    }
  }

  return(
        <>
          <h1 className="font-semibold font-roboto text-xl">Bem-vindo ao NFL's Blogger!</h1>  
          <div className="w-full flex items-center justify-between gap-2">
              <button className="w-[50%] flex items-center justify-center 
                                  py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
                  <FcGoogle />
              </button>
              <button className="w-[50%] flex items-center justify-center 
                                  py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
                  <FaGithub />
              </button>
          </div>
          <div className="w-full flex items-center gap-2">
              <div className="w-full h-[0.5px] bg-zinc-200"></div>
              <span className="text-zinc-300">Ou</span>
              <div className="w-full h-[0.5px] bg-zinc-200"></div>
          </div>
          <form 
              className="w-full min-h-[35%] flex flex-col gap-1"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                  <span className="font-medium">Usuário</span>
                  <input 
                      {...register("username", 
                          {required: "Usuário obrigatório", 
                                                      minLength: {
                                                        value: 3,
                                                        message: "Usuário precisa ter no mínimo 6 caracteres"
                                                      }
                                                      })} 
                      type="text" 
                      className="py-2 px-2 border-b-2 border-zinc-300 outline-none"
                      placeholder="Digite seu usuário"
                  />
                      {errors.username && <span className="text-red-700 text-xs">{errors.username.message}</span>}
              </div>
              <div className="flex flex-col">
                  <span className="font-medium">Email</span>
                  <input 
                      {...register("email", 
                          {required: "Email obrigatório!", 
                                                    validate: (value) => {
                                                      if(!value.includes("@") || !value.includes(".com")){
                                                        return "Email precisa ser válido"
                                                      } 
                                                      return true
                                                    },})} 
                      type="email" 
                      placeholder="exemplo@gmail.com" 
                      className="py-2 px-2 border-b-2 border-zinc-300 outline-none"/>
                      {errors.email && <span className="text-red-700 text-xs mb-5">{errors.email.message}</span>}
              </div>
              <div className="flex flex-col relative">
                  <span className="font-medium">Senha</span>
                  <input 
                      {...register("password", 
                          {required: "Senha obrigatória", 
                                                      minLength: {
                                                        value: 6,
                                                        message: "Senha precisa ter no minímo 6 digitos"
                                                      },
                                                      })} 
                      type={type} 
                      className="py-2 px-2 border-b-2 border-zinc-300 outline-none"
                      placeholder="Digite sua senha"
                      />
                      {errors.password && <span className="text-red-700 text-xs">{errors.password.message}</span>}
                      {type === 'password' ? (
                        <Eye 
                          className="absolute right-5 bottom-2 text-zinc-400"
                          onClick={() => setType('text')}
                        />
                      ) : (
                        <EyeOff  
                          className="absolute right-5 bottom-2 text-zinc-400"
                          onClick={() => setType('password')}
                      />
                      )}
              </div>
              <button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className="w-full py-2 bg-blue-800 hover:bg-blue-900 border-[0.5px] border-blue-700 
                          text-white rounded-lg mt-4 cursor-pointer">
                      {isSubmitting ? "Registrando..." : "Registrar"}
              </button>
              {errors.root && <span className="text-red-700 text-xs">{errors.root.message}</span> }
          </form>
          <span className="text-sm text-zinc-500 mt-2 text-center">
              Ao clicar em registrar, você concorda com os Termos de Serviços 
              e a Política de Privacidade do NFL's Bloggers
          </span>
          {signUpSuccess && <span className="text-sm text-emerald-500 mt-2 text-center">Cadastrado feito com sucesso!</span>}
          <div className="flex items-center gap-2 text-zinc-600 mt-6">
              <span>Já tem uma conta?</span>
              <Link to="/sign-in">
                  <span 
                      className="bg-zinc-500 text-white px-2 py-1 rounded-md border-[0.5px] border-zinc-400 cursor-pointer">
                      Entrar
                  </span>
              </Link>
          </div>
        </>
    )
}