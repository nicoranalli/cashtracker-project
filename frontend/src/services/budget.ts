import { cookies } from "next/headers";
import { BudgetAPIResponseSchema, BudgetsAPIResponseSchema } from "../schemas";
import { cache } from "react";
import { notFound } from "next/navigation";

export const getBudget = cache(async (id: string) => {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${process.env.BACKEND_URL}/budgets/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const json = await response.json();


    if (!response.ok) {
        notFound();
    }

    const budget = BudgetAPIResponseSchema.parse(json);

    return budget;
})


export async function getBudgets() {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${process.env.BACKEND_URL}/budgets`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const json = await response.json();

    if (!response.ok) {
        return [];
    }

    const budgets = BudgetsAPIResponseSchema.parse(json);

    return budgets;
}
