'use server'

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema, TokenSchema } from "@/src/schemas";


type ActionStateType = {
    errors: string[];
    success: string;
}


export async function resetPasswordAction(token:string,prevState:ActionStateType, formData: FormData) {

    const resetPasswordData = {
        password: formData.get('password') as string,
        password_confirmation: formData.get('password_confirmation') as string
    }

    const validatedData = ResetPasswordSchema.safeParse(resetPasswordData);

    if (!validatedData.success) {
        const errors = validatedData.error.errors.map((error) => error.message);
        return {
            errors,
            success: ''
        }
    }

    const validatedToken = TokenSchema.safeParse(token);

    if (!validatedToken.success) {
        const errors = validatedToken.error.errors.map((error) => error.message);
        return {
            errors,
            success: ''
        }
    }

    const URL = `${process.env.BACKEND_URL}/auth/login/reset-password/${token}`;
    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: validatedData.data.password,
            password_confirmation: validatedData.data.password_confirmation
        })
    });

    console.log(response);
   const json = await response.json();

    
    if (!response.ok) {
        const {error} = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json);

    return {
        errors: [],
        success
    }

}
