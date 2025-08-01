
import Link from 'next/link';
import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm';

export default function ConfirmAccountPage() {
    return (
        <div>

            <h1 className="font-black text-6xl text-purple-950 mb-1">
                Confirma tu cuenta
            </h1>
            <p className="text-3xl ">Ingresá el código que enviamos a tu <span className="font-bold text-amber-500">correo</span>
            </p>

            <ConfirmAccountForm />
            <nav className="flex justify-center items-center Ft-5">
                <Link href={"/auth/register"} className="text-gray-500">¿No tienes cuenta? <span className="font-semibold text-purple-950">Registrate aquí</span></Link>
            </nav>

        </div>
    )
}