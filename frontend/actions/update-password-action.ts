"use server"

import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionFormType = {
    errors: string[],
    success: string,
}

export async function updatePasswordAction(prevState: ActionFormType,
    formData: FormData) {

    const updatePasswordData = {
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const validatedData = UpdatePasswordSchema.safeParse(updatePasswordData)
    if (!validatedData.success) {
        return { errors: validatedData.error.issues.map(issue => issue.message) , success: '' }
    }

    const token = (await cookies()).get('token')?.value

    const url = `${process.env.BACKEND_URL}/auth/change-password`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                current_password: validatedData.data.current_password,
                password: validatedData.data.password,
                password_confirmation: validatedData.data.password_confirmation
            }
        ),

    })

    const json = await response.json()

    if (!response.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return { errors: [error], success: '' }
    }

    const success = SuccessSchema.parse(json)



    return { errors: [], success }



}