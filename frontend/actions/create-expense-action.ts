'use server'

import { ErrorResponseSchema, ExpenseFormSchema, SuccessSchema } from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string
}

export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {

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

    console.log

    const token = (await cookies()).get('token')?.value

    const URL = `${process.env.BACKEND_URL}/budgets/${budgetId}/expenses`

    const response = await fetch(URL,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(
                {
                    name: validatedExpenseData.data.name,
                    amount: validatedExpenseData.data.amount
                }

            )
        }
    )

    console.log(response)

    const json = await response.json()

    if (!response.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }

    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success: success
    }
}