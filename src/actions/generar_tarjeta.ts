'use server'

import { db } from '@/lib/db'
import { unstable_cache } from 'next/cache'
import { revalidatePath } from 'next/cache'

export interface GenerarTarjetaProps {
    nc: string
    tipo: 'taller' | 'videojuego' | 'viernes'
}

export async function generarTarjeta({ nc, tipo }: GenerarTarjetaProps) {
    try {
        // Buscar usuario
        const usuario = await db.usuarios.findUnique({
            where: { nc },
            include: {
                registro_talleres: {
                    include: {
                        taller1: true,
                        taller2: true,
                        taller3: true,
                    },
                },
                Registro_videojuegos: true,
                Registro_viernes: {
                    include: {
                        talleres: true,
                    },
                },
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
            return {
                success: true,
                url: tarjetaExistente.url,
                message: 'Tarjeta ya existe',
            }
        }

        // Obtener información según el tipo
        let info = ''
        if (tipo === 'taller' && usuario.registro_talleres.length > 0) {
            const registro = usuario.registro_talleres[0]
            info = `${registro.taller1.nombre} | ${registro.taller2.nombre} | ${registro.taller3.nombre}`
        } else if (
            tipo === 'videojuego' &&
            usuario.Registro_videojuegos.length > 0
        ) {
            info = usuario.Registro_videojuegos[0].videojuego_seleccionado
        } else if (tipo === 'viernes' && usuario.Registro_viernes.length > 0) {
            info = usuario.Registro_viernes[0].talleres.nombre
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
                            taller1: true,
                            taller2: true,
                            taller3: true,
                        },
                    },
                    Registro_videojuegos: true,
                    Registro_viernes: {
                        include: {
                            talleres: true,
                        },
                    },
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
