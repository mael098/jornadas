import { CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
