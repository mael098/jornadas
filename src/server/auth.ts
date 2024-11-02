import { CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import { randomUUID } from 'crypto'
import { SignJWT } from 'jose'
import { COOKIES, SECRET_KEY } from '@/lib/constantes'

export async function sendCode({ phone }: { phone: string }) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: async (name: string) => (await cookies()).get(name)?.value,
                set: async (
                    name: string,
                    value: string,
                    options: CookieOptions,
                ) => void (await cookies()).set({ name, value, ...options }),
                remove: async (name: string, options: CookieOptions) =>
                    void (await cookies()).set({ name, value: '', ...options }),
            },
        },
    )

    if (!phone)
        return {
            error: 'need phone',
            phone: '',
        }

    const { error } = await supabase.auth.signInWithOtp({ phone })
    if (error) {
        return {
            error: `${error}`,
            phone: '',
        }
    }
    return { phone }
}

export async function verifyCode({
    phone,
    code,
    nc,
}: {
    phone: string
    code: string
    nc: string
}) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: async (name: string) => (await cookies()).get(name)?.value,
                set: async (
                    name: string,
                    value: string,
                    options: CookieOptions,
                ) => void (await cookies()).set({ name, value, ...options }),
                remove: async (name: string, options: CookieOptions) =>
                    void (await cookies()).set({ name, value: '', ...options }),
            },
        },
    )
    const x = await supabase.auth.verifyOtp({ phone, token: code, type: 'sms' })
    if (x?.error) {
        return {
            error: x.error.message,
            phone,
        }
    }

    const token = await new SignJWT({ nc })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('48h')
        .sign(SECRET_KEY)
    ;(await cookies()).set(COOKIES.SESSION, token)

    return {
        phone,
        token,
        nc,
    }
}
