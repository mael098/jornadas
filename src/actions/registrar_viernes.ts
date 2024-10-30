'use server'

import { db } from '@/lib/db'
import { Juegos, LIMITE_DE_SUSCRIPCION } from '@/lib/constantes'
import { TalleresViernes } from '@/lib/constantes'

export interface RegistrarViernesProps {
    apellidos: string
    nombre: string
    numero_control: string
    email: string
    semestre: number
    taller: TalleresViernes
}

export async function registrarViernes({
    apellidos,
    numero_control,
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
    if (!(apellidos && numero_control && email && nombre && semestre && taller))
        return {
            error: 'Faltan Datos',
        }

    // Crear el usuario
    try {
        const user = await db.usuario.findFirst({
            where: {
                numero_control,
            },
        })
        if (!user) {
            await db.usuario.create({
                data: {
                    apellidos,
                    nombre,
                    email,
                    numero_control,
                    semestre,
                },
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
                    numero_control,
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
                taller,
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
                taller,
                usuario: {
                    connect: {
                        numero_control,
                    },
                },
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
