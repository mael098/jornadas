'use server'

import { db } from '@/lib/db'
import { LIMITE_DE_SUSCRIPCION } from '@/lib/constantes'
import { registerUser } from './user'

export interface RegistrarViernesProps {
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
}: RegistrarViernesProps): Promise<
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

    // Crear el usuario
    try {
        const user = await db.usuarios.findFirst({
            where: {
                nc,
            },
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
        console.log(error)
        return {
            error: 'Internal Error',
        }
    }

    // revisar si esiste registro
    try {
        const taller = await db.registro_viernes.findFirst({
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

    // Limite re registros
    try {
        const count = await db.registro_viernes.count({
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
        console.log(error)
        return {
            error: 'Internal Error',
        }
    }

    // REGISTRO
    try {
        await db.registro_viernes.create({
            data: {
                taller_id: taller,
                usuario_nc: nc,
            },
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
