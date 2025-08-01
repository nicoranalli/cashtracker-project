'use server'

import { BudgetSchema, Budget, ErrorResponseSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


type ActionFormType = {
    errors: string[],
    success: string
}

export async function editBudgetAction(id: Budget['id'], prevState : ActionFormType, formData: FormData) {

    const budgetData = {
        name: formData.get('name'),
        amount: Number(formData.get('amount'))
    }


    const validatedBudgetData = BudgetSchema.safeParse(budgetData)

    if (!validatedBudgetData.success) {
        const errors = validatedBudgetData.error.errors.map((error) => error.message)
        return {
            errors: errors,
            success: ''
        }
    }


    const token = (await cookies()).get('token')?.value


    const URL = `${process.env.BACKEND_URL}/budgets/${id}`

    const response = await fetch(
        URL,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: validatedBudgetData.data.name,
                amount: validatedBudgetData.data.amount
            }),
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
        success: 'Presupuesto editado correctamente'
    }

}