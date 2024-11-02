'use server'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { COOKIES, SECRET_KEY } from './constantes'

export async function getSession() {
    const token_string = (await cookies()).get(COOKIES.SESSION)?.value
    if (!token_string) return null
    const {
        payload: { nc },
    } = await jwtVerify(token_string, SECRET_KEY)
    if (!nc) return null
    return {
        nc: nc as string,
    }
}

interface SetSessionProps {
    nc: string
}
export async function setSession({ nc }: SetSessionProps) {
    const token = await new SignJWT({ nc })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('48h')
        .sign(SECRET_KEY)
    ;(await cookies()).set(COOKIES.SESSION, token)
    return { nc }
}
