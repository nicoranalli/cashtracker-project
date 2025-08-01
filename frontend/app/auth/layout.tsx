
import Logo from "@/components/ui/Logo";
import ToastNotificacion from "@/components/ui/ToastNotification";
import Link from "next/link";



export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <> 
            <div className="lg:grid grid-cols-2 min-h-screen ">
                <div className="flex justify-center bg-purple-950 lg:bg-[url('/grafico.svg')] bg-30 bg-cover">
                    <div className="w-96 py-10 lg:py-20 ">
                        <Link href={"/"}>
                        <Logo />
                        </Link>
                    </div>
                </div>
                <div className="p-10 lg:py-28 ">
                    <div className="max-w-2xl mx-auto">
                        {children}
                    </div>
                </div>

            </div>

            <ToastNotificacion />

        </>
    );
}
