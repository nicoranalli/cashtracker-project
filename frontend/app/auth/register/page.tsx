import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtracker - Crea tu cuenta",
    description: "Registrate para controlar tus finanzas",
};
export default function RegisterPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">
                Crea una cuenta
            </h1>
            <p className="text-3xl ">y controla tus <span className="font-bold text-amber-500">finanzas</span></p>
            <RegisterForm />

            <nav className="flex flex-col gap-2 mt-5">
                <Link href={"/auth/login"} className="text-gray-500 text-center">¿Ya tienes una cuenta? <span className="font-semibold text-purple-950">Iniciar sesión</span></Link>
            </nav>
           
            {/* <div className="flex gap-2 justify-content mt-5">
                <p className="text-base text-gray-500">¿Ya tienes una cuenta?</p>
                <Link href="/auth/login" className="text-base text-purple-950 font-bold">Inicia sesión</Link>
            </div> */}
        </>
    );
}
