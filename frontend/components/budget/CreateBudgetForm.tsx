"use client"

import { createBudgetAction } from "@/actions/create-budget-action"
import {useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function CreateBudgetForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [state, formAction] = useActionState(createBudgetAction, {
        errors: [],
        success: ''
    })

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(state.success,
            )
            setIsLoading(true)
            setTimeout(() => {
                router.push('/admin') // Redirige después de un breve retraso
            }, 500)

        }
        if (state.errors.length > 0) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
    },
        [state, router]
    )

    return (
        <form
            action={formAction}
            className="space-y-3"
            noValidate
        >
            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre
                </label>
                <input
                    id="name"
                    className="w-full p-3  border rounded-2xl border-gray-100 bg-slate-100"
                    type="text"
                    placeholder="Nombre del Presupuesto"
                    name="name"
                />
            </div>
            <div className="space-y-3">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad
                </label>
                <input
                    type="number"
                    id="amount"
                    className="w-full p-3  border rounded-2xl border-gray-100 bg-slate-100"
                    placeholder="Cantidad Presupuesto"
                    name="amount"
                />
            </div>
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 rounded-2xl text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value={isLoading ? 'Cargando...' : 'Crear presupuesto'} // Cambia el texto del botón
                disabled={isLoading} // Deshabilita el botón durante el loading
            />

            {/* Muestra un spinner o mensaje de carga si isLoading es true */}
            {isLoading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
            )}
        </form>
    )
}