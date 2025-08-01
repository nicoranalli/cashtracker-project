import { z } from "zod";

export const RegisterSchema = z.object({
        email: z.string().
                min(1, { message: "El email es obligatorio" }).
                email({ message: "El email no es valido" }),
        name: z.string().min(1, { message: "El nombre es obligatorio" }),
        password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
        path: ["password_confirmation"]
});


export const TokenSchema = z.string().min(6).max(6, { message: "El token debe tener 6 caracteres" })

export const LoginSchema = z.object({
        email: z.string()
                .min(1, { message: 'El Email es Obligatorio' })
                .email({ message: 'Email no válido' }),
        password: z.string()
                .min(1, { message: 'El Password no puede ir vacio' })
})


export const UserSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
})

export type User = z.infer<typeof UserSchema>

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({
        error: z.string()
})

export const EmailSchema = z.object({
        email: z.string().min(1, { message: "El email es obligatorio" }).
                email({ message: "El email no es valido" }),
})


export const ResetPasswordSchema = z.object({
        password: z.string()
                .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Los Passwords no son iguales",
        path: ["password_confirmation"]
});

export const BudgetSchema = z.object({
        name: z.string().min(1, { message: "El nombre es obligatorio" }),
        amount: z.number().min(1, { message: "La cantidad es obligatoria" })
})

export const ExpenseApiResponseSchema = z.object({
        id: z.number(),
        name: z.string(),
        amount: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        budgetId: z.number(),
})

export type Expense = z.infer<typeof ExpenseApiResponseSchema>


export const BudgetAPIResponseSchema = z.object({
        id: z.number(),
        name: z.string(),
        amount: z.string(),
        userId: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
        expenses: z.array(ExpenseApiResponseSchema),
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({expenses: true}))

export type Budget = z.infer<typeof BudgetAPIResponseSchema>

export type BudgetForm = z.infer<typeof BudgetSchema>

export const PasswordSchema = z.object({
        password: z.string().min(8, { message: "El password debe tener al menos 8 caracteres" })
})

export const ExpenseFormSchema = z.object({
        name: z.string().min(1, { message: "El nombre es obligatorio" }),
        amount: z.number().min(1, { message: "La cantidad es obligatoria" })
})

export const UpdatePasswordSchema = z.object({
        current_password: z.string().min(1, { message: "El password actual es obligatorio" }),
        password: z.string().min(8, { message: "El password nuevo es obligatorio" }),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Las contraseñas no coinciden",
})