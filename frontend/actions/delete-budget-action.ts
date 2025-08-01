'use server'

import { Budget, PasswordSchema, ErrorResponseSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


type ActionFormType = {
    errors: string[],
    success: string
}

export async function deleteBudgetAction(id: Budget['id'], prevState : ActionFormType, formData: FormData) {

    const password = formData.get('password')


    const validatedBudgetData = PasswordSchema.safeParse({password: password})

    if (!validatedBudgetData.success) {
        const errors = validatedBudgetData.error.errors.map((error) => error.message)
        return {
            errors: errors,
            success: ''
        }
    }

    const token = (await cookies()).get('token')?.value


    const urlPassword = `${process.env.BACKEND_URL}/auth/check-password`


    const resetPassword = await fetch(
        urlPassword,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({password: password})
        })
    
    const jsonPassword = await resetPassword.json()

    if (!resetPassword.ok) {
        const { error } = ErrorResponseSchema.parse(jsonPassword)
        return {
            errors: [error],
            success: ''
        }
    }


    const URL = `${process.env.BACKEND_URL}/budgets/${id}`

    const response = await fetch(
        URL,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })


    const json = await response.json()

        
    if (!response.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    revalidatePath('/admin')

    return {
        errors: [],
        success: 'Presupuesto eliminado correctamente'
    }

}