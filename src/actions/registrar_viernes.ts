'use server'

import { db } from '@/lib/db'
import { LIMITE_DE_SUSCRIPCION } from '@/lib/constantes'
import { registerUser } from './user'

export interface RegistrarTallerProps {
    apellidos: string
    nombre: string
    nc: string
    email: string
    semestre: number
    taller: number
}

export type registerTallerMessageErrors =
    | 'Faltan Datos'
    | 'Usuario Registrado'
    | 'Internal Error'
    | 'Taller lleno'

export async function registrarViernes({
    apellidos,
    nc,
    email,
    nombre,
    semestre,
    taller,
}: RegistrarTallerProps): Promise<
    | {
          error?: registerTallerMessageErrors
          message: string
      }
    | {
          error: registerTallerMessageErrors
          message?: string
      }
> {
    if (!(apellidos && nc && email && nombre && semestre && taller))
        return {
            error: 'Faltan Datos',
        }

    // Crear el usuario si no existe
    try {
        const user = await db.usuarios.findFirst({
            where: { nc },
        })
        if (!user) {
            await registerUser({
                apellidos,
                nombre,
                email,
                nc,
                semestre,
            })
        }
    } catch (error) {
        console.log('Error al crear el usuario:', error)
        return {
            error: 'Internal Error',
        }
    }

    // Verificar si ya está registrado
    try {
        const registro = await db.registro_talleres.findUnique({
            where: {
                usuario_nc: nc,
            },
        })
        if (registro)
            return {
                error: 'Usuario Registrado',
            }
    } catch (error) {
        console.log('Error al verificar registro:', error)
        return {
            error: 'Internal Error',
        }
    }

    // Verificar límite de cupo del taller
    try {
        const count = await db.registro_talleres.count({
            where: {
                taller_id: taller,
            },
        })
        if (count >= LIMITE_DE_SUSCRIPCION.TALLER) {
            return {
                error: 'Taller lleno',
            }
        }
    } catch (error) {
        console.log('Error al verificar cupo:', error)
        return {
            error: 'Internal Error',
        }
    }

    // REGISTRO
    try {
        await db.registro_talleres.create({
            data: {
                taller_id: taller,
                usuario_nc: nc,
            },
        })

        // Guardar número de control en cookies
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        cookieStore.set('numero_control_registrado', nc, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 30, // 30 días
            path: '/',
        })
    } catch (error) {
        console.log('Error al registrar:', error)
        return {
            error: 'Internal Error',
        }
    }

    return {
        message: 'Usuario Registrado',
    }
}
