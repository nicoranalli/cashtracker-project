import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Logo() {
    return (
            <Image
                src={logo}
                alt="Logo"
                width={400}
                height={100}
                priority
            />

    );
}