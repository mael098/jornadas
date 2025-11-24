'use server'

import { db } from '@/lib/db'
import { unstable_cache } from 'next/cache'
import { revalidatePath } from 'next/cache'

export interface GenerarTarjetaProps {
    nc: string
    tipo: 'taller' | 'videojuego'
}

export type GenerarTarjetaResponse =
    | {
          success: true
          url: string
          tarjetaId: number
          info: string
          tipo: 'taller' | 'videojuego'
          tipoLabel: string
      }
    | {
          success: true
          url: string
          info: string
          tipo: 'taller' | 'videojuego'
          tipoLabel: string
          message: string
      }
    | {
          error: string
      }

export async function generarTarjeta({
    nc,
    tipo,
}: GenerarTarjetaProps): Promise<GenerarTarjetaResponse> {
    try {
        // Buscar usuario
        const usuario = await db.usuarios.findUnique({
            where: { nc },
            include: {
                registro_talleres: {
                    include: {
                        taller: true,
                    },
                },
                Registro_videojuegos: true,
            },
        })

        if (!usuario) {
            return {
                error: 'Usuario no encontrado',
            }
        }

        // Verificar si ya tiene tarjeta del tipo especificado
        const tarjetaExistente = await db.targetas.findFirst({
            where: {
                userId: nc,
                tip: tipo,
            },
        })

        if (tarjetaExistente) {
            // Obtener información según el tipo
            let info = ''
            if (tipo === 'taller' && usuario.registro_talleres) {
                info = usuario.registro_talleres.taller.nombre
            } else if (
                tipo === 'videojuego' &&
                usuario.Registro_videojuegos.length > 0
            ) {
                const videojuego = usuario.Registro_videojuegos[0]
                info = videojuego.videojuego_seleccionado
                console.log('Videojuego encontrado:', videojuego)
            }

            return {
                success: true,
                url: tarjetaExistente.url,
                info: info || 'No especificado',
                tipo: tipo,
                tipoLabel:
                    tipo === 'taller' ? 'Taller' : 'Torneo de Videojuegos',
                message: 'Tarjeta ya existe',
            }
        }

        // Obtener información según el tipo
        let info = ''
        if (tipo === 'taller' && usuario.registro_talleres) {
            info = usuario.registro_talleres.taller.nombre
        } else if (
            tipo === 'videojuego' &&
            usuario.Registro_videojuegos.length > 0
        ) {
            const videojuego = usuario.Registro_videojuegos[0]
            info = videojuego.videojuego_seleccionado
            console.log('Videojuego encontrado:', videojuego)
        } else {
            return {
                error:
                    'No hay registro de ' +
                    (tipo === 'taller' ? 'taller' : 'videojuego'),
            }
        }

        // Por ahora guardamos una URL placeholder
        // En producción esto se reemplazaría con la URL de la imagen generada
        const url = `/api/tarjeta/${nc}/${tipo}`

        const tarjeta = await db.targetas.create({
            data: {
                userId: nc,
                nc: nc,
                tip: tipo,
                url: url,
            },
        })

        // Invalidar cache para esta tarjeta
        revalidatePath(`/mi-tarjeta/${nc}`)

        return {
            success: true,
            url: tarjeta.url,
            tarjetaId: tarjeta.id,
            info: info,
            tipo: tipo,
            tipoLabel: tipo === 'taller' ? 'Taller' : 'Torneo de Videojuegos',
        }
    } catch (error) {
        console.error('Error generando tarjeta:', error)
        return {
            error: 'Error interno al generar tarjeta',
        }
    }
}

// Función interna sin cache
async function obtenerTarjetaDB(nc: string, tipo: string) {
    const tarjeta = await db.targetas.findFirst({
        where: {
            userId: nc,
            tip: tipo,
        },
        include: {
            user: {
                include: {
                    registro_talleres: {
                        include: {
                            taller: true,
                        },
                    },
                    Registro_videojuegos: true,
                },
            },
        },
    })

    if (!tarjeta) {
        return { error: 'Tarjeta no encontrada' }
    }

    return {
        success: true,
        tarjeta,
    }
}

// Función con cache - 1 hora de revalidación
export async function obtenerTarjeta(nc: string, tipo: string) {
    try {
        const getCachedTarjeta = unstable_cache(
            async () => obtenerTarjetaDB(nc, tipo),
            [`tarjeta-data-${nc}-${tipo}`],
            {
                revalidate: 3600, // Cache por 1 hora
            },
        )

        return await getCachedTarjeta()
    } catch (error) {
        console.error('Error obteniendo tarjeta:', error)
        return {
            error: 'Error interno al obtener tarjeta',
        }
    }
}

// Función para invalidar manualmente el cache de una tarjeta específica
export async function invalidarCacheTarjeta(nc: string, tipo: string) {
    'use server'
    try {
        revalidatePath(`/mi-tarjeta/${nc}`)
        return { success: true }
    } catch (error) {
        console.error('Error invalidando cache:', error)
        return { error: 'Error al invalidar cache' }
    }
}
