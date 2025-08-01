import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { UserSchema } from '../schemas'

export const verifySession = cache(async () => {

    const cookieInstance = await cookies();

    const cookie = cookieInstance.get('token')?.value

    if (!cookie) {
        redirect('/auth/login')
    }

    //getUser
    const URL = `${process.env.BACKEND_URL}/auth/user`;

    const response = await fetch(URL, {
        headers: {
            "Authorization": `Bearer ${cookie}`
        },
    });

    if (!response.ok) {
        redirect('/auth/login')
    }

    const json = await response.json();

    const result = UserSchema.safeParse(json);

    if (!result.success) {
        redirect('/auth/login')
    }

    return { isAuth: true, user: result.data}


})