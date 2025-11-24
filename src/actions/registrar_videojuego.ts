'use server'

import { db } from '@/lib/db'

export interface RegistrarVideouegoProps {
    apellidos: string
    nombre: string
    nc: string
    email: string
    semestre: number
    videojuego: string
}
export type registerTallerMessageErrors =
    | 'Faltan Datos'
    | 'Usuario Registrado'
    | 'Internal Error'
export async function registrarVideojuego({
    apellidos,
    nc,
    email,
    nombre,
    semestre,
    videojuego,
}: RegistrarVideouegoProps): Promise<
    | {
          error?: registerTallerMessageErrors
          message: string
      }
    | {
          error: registerTallerMessageErrors
          message?: string
      }
> {
    if (!(apellidos && nc && email && nombre && semestre && videojuego))
        return {
            error: 'Faltan Datos',
        }

    // Crear el usuario
    try {
        const user = await db.usuarios.findFirst({
            where: {
                nc,
            },
        })
        if (!user) {
            await db.usuarios.create({
                data: {
                    apellidos,
                    nombre,
                    email,
                    nc,
                    semestre,
                },
            })
        }
    } catch (error) {
        console.log(error)
        return {
            error: 'Internal Error',
        }
    }

    // revisar si esiste registro
    try {
        const taller = await db.registro_videojuegos.findFirst({
            where: {
                usuario: {
                    nc,
                },
            },
        })
        if (taller)
            return {
                error: 'Usuario Registrado',
            }
    } catch (error) {
        console.log(error)
        return {
            error: 'Internal Error',
        }
    }

    // REGISTRO
    try {
        await db.registro_videojuegos.create({
            data: {
                videojuego_seleccionado: videojuego,
                usuario: {
                    connect: {
                        nc,
                    },
                },
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
        console.log(error)
        return {
            error: 'Internal Error',
        }
    }

    return {
        message: 'Usuario Registrado',
    }
}
