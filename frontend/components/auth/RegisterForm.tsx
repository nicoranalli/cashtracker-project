'use client'
import createAccount from "@/actions/create-account.action";
import { useActionState, useEffect } from "react";
import  ErrorMessage  from "@/components/ui/ErrorMessage";

export default function RegisterForm() {

    const [state , formAction] = useActionState(createAccount, 
        { errors: [], success: '' }
    );

    useEffect(() => {
        //limpiar el formulario
        if (state.success) {
            document.querySelectorAll('input').forEach(input => input.value = '');
        }
    }, [state]);

    return (
        <>
            <form action={formAction}
                className="mt-14 space-y-5"
                noValidate
            >
                
                {state.success && <p className=" text-center p-3 uppercase text-sm  font-bold bg-amber-500 text-white rounded-md">{state.success}</p>}
                {state.errors && state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage> )}
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="name"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>
                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password_confirmation"
                    />
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
                />
            </form>


        </>
    );
}