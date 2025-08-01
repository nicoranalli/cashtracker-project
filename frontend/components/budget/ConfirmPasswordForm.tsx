'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import { useActionState, useEffect } from "react"
import { deleteBudgetAction } from "@/actions/delete-budget-action"
import { toast } from "react-toastify"

export default function ConfirmPasswordForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const budgetId = searchParams.get('deleteBudgetId')

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteBudgetId')
        router.replace(`${pathname}?${hideModal}`)
    }

    const deleteBudgetActionWithId = deleteBudgetAction.bind(null, Number(budgetId))
    const [state, formAction] = useActionState(deleteBudgetActionWithId, {
        errors: [],
        success: ''
    })

    console.log(state)

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
    }, [state.success, state.errors, router], )


    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Eliminar Presupuesto
            </DialogTitle>
            <p className="text-xl font-bold">Ingresa tu Password para {''}
                <span className="text-amber-500">eliminar el presupuesto {''}</span>
            </p>
            <p className='text-gray-600 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>
            <form
                action={formAction}
                className=" mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >Ingresa tu Password para eliminar</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name='password'
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <input
                        type="submit"
                        value='Eliminar Presupuesto'
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                    />
                    <button
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                        onClick={closeModal}
                    >Cancelar</button>
                </div>
            </form>

        </>
    )
}