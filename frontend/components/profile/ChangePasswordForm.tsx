"use client"

import { updatePasswordAction } from "@/actions/update-password-action"
import { useActionState, useEffect } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ChangePasswordForm() {

  const router = useRouter()

  const [state, formAction] = useActionState(updatePasswordAction, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      setTimeout(() => {
        router.push('/admin') // Redirige después de un breve retraso
      }, 1000) // Ajusta el tiempo según sea necesario
    }
    if (state.errors.length > 0) {
      console.log('errores')
      state.errors.forEach((error) => {
        toast.error(error)
      })
    }
  }, [state.success, state.errors, router],)


  return (
    <>
      <form
        action={formAction}
        className=" mt-14 space-y-5"
        noValidate
      >
        {state.errors && state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="current_password"
          >Password Actual</label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >Nuevo Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="password_confirmation"
            className="font-bold text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value='Cambiar Password'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}