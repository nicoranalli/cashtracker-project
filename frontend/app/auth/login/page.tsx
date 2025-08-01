import type { Metadata } from "next";
import RegisterForm from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtracker - Iniciar sesión",
    description: "Inicia sesión para controlar tus finanzas",
};
export default function LoginPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">
                Inicia sesión
            </h1>
            <p className="text-3xl ">y controla tus <span className="font-bold text-amber-500">finanzas</span></p>
            <RegisterForm />

            <nav className="flex flex-col gap-2 items-center mt-5">
                <Link href={"/auth/register"} className="text-gray-500">¿No tienes cuenta? <span className="font-semibold text-purple-950">Registrarse</span></Link>
                <Link href={"/auth/forgot-password"} className="text-gray-500">¿Olvidaste tu contraseña? <span className="font-semibold d text-purple-950">Recuperar contraseña</span></Link>
            </nav>
        </>
    );
}
