"use server"

import { RegisterSchema, SuccessSchema, ErrorResponseSchema} from "@/src/schemas";


 type ActionFormType = {
    errors: string[]
    success: string;
  };
export default async function createAccount(prevState: ActionFormType, formData: FormData) {

    const registerData = {
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation")
    }

    // Validar errores

    const validatedData = RegisterSchema.safeParse(registerData);

    if (!validatedData.success) {
        const errors = validatedData.error.errors.map((error) => error.message);
        return {
            errors,
            success: prevState.success
          };
    }

    // Enviar datos al backend para crear la cuenta
    const URL = `${process.env.BACKEND_URL}/auth/create-account`;

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: validatedData.data.name,
            email: validatedData.data.email,
            password: validatedData.data.password
        }),
    });

    const json = await response.json();


    if (response.status === 409) {
        const {error} = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: ''
          };

    }

    const success = SuccessSchema.parse(json);
    

    return { 
        errors: [],
        success
        
      };
}

