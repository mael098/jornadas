'use server'

import {
    LIMITE_DE_SUSCRIPCION,
    TalleresHorario1,
    TalleresHorario2,
    TalleresHorario3,
} from '@/lib/constantes'
import { db } from '@/lib/db'

export interface RegistrarTallerProps {
    apellidos: string
    nombre: string
    numero_control: string
    email: string
    semestre: number
    taller_horario1: TalleresHorario1
    taller_horario2: TalleresHorario2
    taller_horario3: TalleresHorario3
}

export async function registrarTaller({
    apellidos,
    numero_control,
    email,
    nombre,
    semestre,
    taller_horario1,
    taller_horario2,
    taller_horario3,
}: RegistrarTallerProps): Promise<
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
                    numero_control,
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
                        numero_control,
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
