"use server"
import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
}


export async function confirmAccount(token:string,prevState:ActionStateType ) {

    const validatedToken = TokenSchema.safeParse(token);

    if (!validatedToken.success) {
        const errors = validatedToken.error.errors.map((error) => error.message);
        return {
            errors,
            success: ''
        }
    }


    const URL = `${process.env.BACKEND_URL}/auth/confirm-account`;

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: validatedToken.data
        })
    });


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

