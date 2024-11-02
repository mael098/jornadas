'use server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { COOKIES, SECRET_KEY } from './constantes'

export async function getSession() {
    const token_string = (await cookies()).get(COOKIES.SESSION)?.value
    if (!token_string) return null
    const {
        payload: { numero_control },
    } = await jwtVerify(token_string, SECRET_KEY)
    if (!numero_control) return null
    return {
        numero_control: numero_control as string,
    }
}
