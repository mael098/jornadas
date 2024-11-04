'use server'

import {
    LIMITE_DE_SUSCRIPCION,
    TalleresHorario1,
    TalleresHorario2,
    TalleresHorario3,
} from '@/lib/constantes'
import { db } from '@/lib/db'
import { registerUser } from './user'

export type registerTallerMessageErrors =
    | 'Faltan Datos'
    | 'Usuario Registrado'
    | 'Internal Error'
    | 'Taller lleno 1'
    | 'Taller lleno 2'
    | 'Taller lleno 3'

export interface RegisterTallerProps {
    apellidos: string
    nombre: string
    nc: string
    email: string
    semestre: number
    taller_horario1: TalleresHorario1
    taller_horario2: TalleresHorario2
    taller_horario3: TalleresHorario3
}

export async function registerTaller({
    apellidos,
    nc,
    email,
    nombre,
    semestre,
    taller_horario1,
    taller_horario2,
    taller_horario3,
}: RegisterTallerProps): Promise<
    | {
          error?: registerTallerMessageErrors
          message: string
      }
    | {
          error: registerTallerMessageErrors
          message?: string
      }
> {
    if (
        !(
            apellidos &&
            nc &&
            email &&
            nombre &&
            semestre &&
            taller_horario1 &&
            taller_horario2 &&
            taller_horario3
        )
    )
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
        console.log('error el crear el usuario', error)
        return {
            error: 'Internal Error',
            message: 'hubo un error al crear el usuario',
        }
    }

    // Revisar si existe registro
    try {
        const taller = await db.registro_talleres.findFirst({
            where: {
                usuario: {
                    nc,
                },
            },
        })
        if (taller)
            return {
                error: 'Usuario Registrado',
                message: 'este usuario ya tiene un taller registrados',
            }
    } catch (error) {
        return {
            error: 'Internal Error',
        }
    }

    // Límite de talleres a registrar
    try {
        const countTalleres1 = await db.registro_talleres.count({
            where: {
                taller_horario1,
            },
        })
        if (countTalleres1 >= LIMITE_DE_SUSCRIPCION.TALLER) {
            return {
                error: 'Taller lleno 1',
            }
        }
        const countTalleres2 = await db.registro_talleres.count({
            where: {
                taller_horario2,
            },
        })
        if (countTalleres2 >= LIMITE_DE_SUSCRIPCION.TALLER) {
            return {
                error: 'Taller lleno 2',
            }
        }
        const countTalleres3 = await db.registro_talleres.count({
            where: {
                taller_horario3,
            },
        })
        if (countTalleres3 >= LIMITE_DE_SUSCRIPCION.TALLER) {
            return {
                error: 'Taller lleno 3',
            }
        }
    } catch (error) {
        console.log('Error al contar los talleres:', error)
    }

    // REGISTRO
    try {
        await db.registro_talleres.create({
            data: {
                taller_horario1,
                taller_horario2,
                taller_horario3,
                usuario: {
                    connect: {
                        nc: nc,
                    },
                },
            },
        })
    } catch (error) {
        console.log('error al registrar el taller:', error)
        return {
            error: 'Internal Error',
            message: 'hubo un error al registrar el taller',
        }
    }

    return {
        message: 'Usuario Registrado',
    }
}
