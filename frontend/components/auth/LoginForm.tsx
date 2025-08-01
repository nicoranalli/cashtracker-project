'use client'

import { authenticate } from "@/actions/authenticate-user-action";
import { useActionState, useEffect } from "react";
import {toast } from "react-toastify";

export default function LoginForm() {

    const [state, formAction] = useActionState( authenticate,{
        errors: [],
    });

    useEffect(() => {
      if (state.errors.length > 0) {
        state.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }, [state]);


    return (
        <>
            <form
                action={formAction}
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu email"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
                />
            </form>
        </>
    )
}