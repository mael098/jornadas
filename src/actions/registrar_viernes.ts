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

export async function registrarViernes({
    apellidos,
    nc,
    email,
    nombre,
    semestre,
    taller,
}: RegistrarViernesProps): Promise<
    | {
          error?: string
          message: string
      }
    | {
          error: string
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
            error: 'Error Interno',
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
            error: 'Error Interno',
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
            error: 'Error Interno',
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
            error: 'Error Interno',
        }
    }

    return {
        message: 'Usuario Registrado',
    }
}
