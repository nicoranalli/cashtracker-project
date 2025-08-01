"use server"

import { ErrorResponseSchema, SuccessSchema, EmailSchema} from "@/src/schemas";
import { error } from "console";

type ActionFormType = {
    errors: string[]
    success: string;
  };

export async function forgotPasswordAction(prevState: ActionFormType, formData : FormData) {

    const forgotPasswordData = {email: formData.get('email')}

    const validatedData = EmailSchema.safeParse(forgotPasswordData);
    if (!validatedData.success) {
        const errors = validatedData.error.errors.map((error) => error.message);
        return {
            errors,
            success: prevState.success
        }
    }

    const URL = `${process.env.BACKEND_URL}/auth/login/forgot-password`;

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: validatedData.data.email,
        }),
    });

    const json = await response.json();

    console.log(json);
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