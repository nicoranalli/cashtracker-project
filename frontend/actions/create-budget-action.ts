'use server'

import { BudgetSchema, ErrorResponseSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionFormType = {
    errors: string[],
    success: string
}

export async function createBudgetAction(prevState: ActionFormType, formData: FormData) {

    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
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

    console.log(token)

    const URL = `${process.env.BACKEND_URL}/budgets`

    const response = await fetch(
        URL,
        {
            method: 'POST',
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

    return {
        errors: [],
        success: 'Presupuesto creado'
    }

}