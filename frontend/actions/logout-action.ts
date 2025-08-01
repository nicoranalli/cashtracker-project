"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export default async function logout() {

    const logoutCookie = await cookies();

    logoutCookie.delete('token');

    redirect('/auth/login')


}