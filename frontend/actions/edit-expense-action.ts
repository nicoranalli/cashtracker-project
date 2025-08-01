"use server"

import { SuccessSchema, ErrorResponseSchema, Expense, Budget, ExpenseFormSchema} from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

type BudgetAndExpenseIdType = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

type ActionFormType = {
    errors: string[],
    success: string
}

export default async function editExpenseAction({budgetId, expenseId} : BudgetAndExpenseIdType, prevState : ActionFormType, formData: FormData){

    const expenseData = {
        name: formData.get('name'),
        amount: Number(formData.get('amount'))
    }

    const validatedExpenseData = ExpenseFormSchema.safeParse(expenseData)

    if (!validatedExpenseData.success) {
        const errors = validatedExpenseData.error.errors.map((error) => error.message)
        return {
            errors: errors,
            success: ''
        }
    }

    const token = (await cookies()).get('token')?.value

    const URL = `${process.env.BACKEND_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const response = await fetch(
        URL,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: validatedExpenseData.data.name,
                amount: validatedExpenseData.data.amount
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
        success: 'Gasto editado correctamente'
    }

}