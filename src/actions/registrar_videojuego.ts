'use server'

import { db } from '@/lib/db'
import { Juegos } from '@/lib/constantes'

export interface RegistrarVideouegoProps {
    apellidos: string
    nombre: string
    nc: string
    email: string
    semestre: number
    videojuego: Juegos
}

export async function registrarVideojuego({
    apellidos,
    nc,
    email,
    nombre,
    semestre,
    videojuego,
}: RegistrarVideouegoProps): Promise<
    | {
          error?: string
          message: string
      }
    | {
          error: string
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
            error: 'Error Interno',
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
            error: 'Error Interno',
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
