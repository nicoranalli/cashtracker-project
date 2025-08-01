'use client'

import { forgotPasswordAction } from "@/actions/forgot-password-action"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function ForgotPasswordForm() {

    const [state, formAction] = useActionState(forgotPasswordAction,
        {
            errors: [],
            success: ''
        }
    )

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
        }
        if (state.errors.length > 0) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
    }, [state])

    return (
        <form 
            action={formAction}
            className=" mt-10 space-y-5"
            noValidate
        >
            <div className="flex flex-col gap-2 mb-5">
                <label
                className="font-bold text-2xl"
                >Email</label>
        
                <input
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>
        
            <input 
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}