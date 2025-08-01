import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtracker - Recupera tu contraseña",
    description: "Recupera tu contraseña para controlar tus finanzas",
};

export default function ForgotPasswordPage() {
    return (
        <>

            <h1 className="font-black text-6xl text-purple-950">
                ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-3xl ">reestablecela <span className="font-bold text-amber-500">aquí</span></p>
            <ForgotPasswordForm/>

            
            <nav className="flex justify-center items-center mt-5">
                <Link href={"/auth/register"} className="text-gray-500">¿No tienes cuenta? <span className="font-semibold text-purple-950">Registrate aquí</span></Link>
            </nav>

        </>
    );
}