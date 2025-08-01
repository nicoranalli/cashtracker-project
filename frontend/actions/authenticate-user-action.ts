"use server"
import { LoginSchema, ErrorResponseSchema, SuccessSchema} from "@/src/schemas";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";


type ActionFormType = {
    errors: string[]
  };

export async function authenticate(prevState: ActionFormType, formData:FormData) {

    const loginData = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const validatedData = LoginSchema.safeParse(loginData);

    if (!validatedData.success){
        const errors = validatedData.error.errors.map((error) => error.message);
        return {
            errors,
        }
    }

    const URL = `${process.env.BACKEND_URL}/auth/login`;

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: validatedData.data.email,
            password: validatedData.data.password
        }),
    });

    const json = await response.json();

    if (!response.ok) {
        const {error} = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
        }
    }

    const authCookie = await cookies();

    
     // Guardar el token en las cookies
     authCookie.set({
            name: 'token',
            value: json,
            httpOnly: true,
            path : '/admin'
     })

     redirect('/admin')
}

