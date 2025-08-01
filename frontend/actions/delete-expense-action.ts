"use server"

import { SuccessSchema, ErrorResponseSchema, Expense, Budget, ExpenseFormSchema} from "@/src/schemas"
import { cookies } from "next/headers"


export default async function deleteExpenseAction({ budgetId, expenseId }: { budgetId: number, expenseId: number }) {
    const token = (await cookies()).get('token')?.value

    
    const res = await fetch(`${process.env.BACKEND_URL}/budgets/${budgetId}/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await res.json()

    if (!res.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    return {
        errors: [],
        success: 'Gasto eliminado correctamente'
    }
}