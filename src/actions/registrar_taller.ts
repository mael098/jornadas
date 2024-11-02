'use server'

import { setSession } from '@/lib/auth'
import {
    COOKIES,
    LIMITE_DE_SUSCRIPCION,
    SECRET_KEY,
    TalleresHorario1,
    TalleresHorario2,
    TalleresHorario3,
} from '@/lib/constantes'
import { db } from '@/lib/db'
import { SignJWT } from 'jose'
import next from 'next'
import { cookies } from 'next/headers'
export interface RegistrarTallerPropsOld {
    apellidos: string
    nombre: string
    numero_control: string
    email: string
    semestre: number
    taller_horario1: TalleresHorario1
    taller_horario2: TalleresHorario2
    taller_horario3: TalleresHorario3
}

/**
 *
 * @deprecated
 * @returns
 */
export async function registrarTallerOld({
    apellidos,
    numero_control,
    email,
    nombre,
    semestre,
    taller_horario1,
    taller_horario2,
    taller_horario3,
}: RegistrarTallerPropsOld): Promise<
    | {
          error?: string
          message: string
      }
    | {
          error: string
          message?: string
      }
> {
    if (
        !(
            apellidos &&
            numero_control &&
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
                nc: numero_control,
            },
        })
        if (!user) {
            await db.usuarios.create({
                data: {
                    apellidos,
                    nombre,
                    email,
                    nc: numero_control,
                    semestre,
                    telefono: '',
                    verified: false,
                },
            })
            await setSession({ nc: numero_control })
        }
    } catch (error) {
        console.log('error el crear el usuario', error)
        return {
            error: 'Error Interno',
            message: 'hubo un error al crear el usuario',
        }
    }

    // Revisar si existe registro
    try {
        const taller = await db.registro_talleres.findFirst({
            where: {
                usuario: {
                    nc: numero_control,
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
            error: 'Error Interno',
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
                        nc: numero_control,
                    },
                },
            },
        })
    } catch (error) {
        console.log('error al registrar el taller:', error)
        return {
            error: 'Error Interno',
            message: 'hubo un error al registrar el taller',
        }
    }

    return {
        message: 'Usuario Registrado',
    }
}

export interface RegistrarTallerProps {
    nc: string
    taller_horario1: TalleresHorario1
    taller_horario2: TalleresHorario2
    taller_horario3: TalleresHorario3
}
export type registerTallerMessageErrors =
    | 'Faltan Datos'
    | 'Usuario Registrado'
    | 'Internal Error'
    | 'Taller lleno 1'
    | 'Taller lleno 2'
    | 'Taller lleno 3'
export async function registerTaller({
    nc,
    taller_horario1,
    taller_horario2,
    taller_horario3,
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
    if (!(nc && taller_horario1 && taller_horario2 && taller_horario3))
        return {
            error: 'Faltan Datos',
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
                        nc,
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
