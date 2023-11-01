import React, { useContext, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import { zodResolver } from "@hookform/resolvers/zod"
import Loading from '../components/Loading'
import Input from '../components/Input'
import Password from '../components/Password'
import InputRoot from '../components/InputRoot'
import Label from '../components/Label'
import Button from '../components/Button'

function Login() {

  const [loginLoading, setLoginLoding] = useState(false)

  const formSchema = z.object({
    email: z.string().nonempty("Campo Obrigatório").email("E-Mail Inválido"),
    password: z.string().nonempty("Campo Obrigatório")
  })

  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  const { signIn } = useContext(AuthContext)

  async function handleSingIn(data: any) {
    setLoginLoding(true)
    await signIn(data)
      .then(() => {
        setLoginLoding(false)
      })
      .catch(() => {
        setLoginLoding(false)
      })
  }

  return (
    <section className="gradient-form h-screen w-full bg-neutral-200 ">
      <div className="h-full w-full ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
          <div className="g-0 h-full lg:flex-row flex-col flex lg:flex-wrap">
            <div className="flex-1 md:mx-6 md:p-12 flex items-center justify-center flex-col p-10">
              <form className='flex flex-col gap-4'>
                <h4 className=" pb-1 text-3xl font-semibold text-zinc-800">
                  Supets
                </h4>
                <p>Bem vindo de volta</p>
                <InputRoot label={"E-Mail"} error={errors.email}>
                  <Label className="text-zinc-800">E-Mail</Label>
                  <Input 
                    className="bg-transparent border border-zinc-800 p-2 rounded outline-none"
                    register={register('email')} />
                </InputRoot>
                <InputRoot label={"Senha"} error={errors.password}>
                  <Label className="text-zinc-800">Senha</Label>
                  <Password 
                    className="bg-transparent border border-zinc-800 p-2 rounded outline-none"
                    register={register('password')} />
                </InputRoot>
                <Button                     
                  className="h-10 mb-3 flex items-center justify-center w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  style={{
                    background:" linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                  }}
                  submit={handleSubmit(handleSingIn)}
                  loading={loginLoading}
                  loadingComponent = {<Loading visible={true} className="w-5 h-5"/>}
                  >
                    Entrar
                </Button>
              </form>
            </div>
            <div className="text-white flex-1 flex justify-center items-center flex-col p-5"
              style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>
                <h4 className="mb-6 text-xl font-semibold">
                  We are more than just a company
                </h4>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
