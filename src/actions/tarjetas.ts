'use server'

import { db } from '@/lib/db'

export interface TarjetaData {
    usuario: {
        nombre: string
        apellidos: string
        nc: string
        email: string
        semestre: number
    }
    taller?: {
        nombre: string
        tallerista: string
        horario: string
    }
    videojuego?: string
    tipo: 'taller' | 'videojuego'
    fechaRegistro: Date
}

// Obtener tarjeta por NC de usuario y tipo de registro
export async function obtenerTarjetaUsuario(
    nc: string,
    tipo: 'taller' | 'videojuego',
): Promise<TarjetaData | null> {
    try {
        const usuario = await db.usuarios.findUnique({
            where: { nc },
        })

        if (!usuario) {
            return null
        }

        switch (tipo) {
            case 'taller': {
                const registro = await db.registro_talleres.findUnique({
                    where: { usuario_nc: nc },
                    include: {
                        taller: true,
                    },
                })

                if (!registro) return null

                return {
                    usuario: {
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        nc: usuario.nc,
                        email: usuario.email,
                        semestre: usuario.semestre,
                    },
                    taller: {
                        nombre: registro.taller.nombre,
                        tallerista: registro.taller.tallerista,
                        horario: registro.taller.horario,
                    },
                    tipo: 'taller',
                    fechaRegistro: registro.fecha_registro,
                }
            }

            case 'videojuego': {
                const registro = await db.registro_videojuegos.findFirst({
                    where: { usuario_nc: nc },
                })

                if (!registro) return null

                return {
                    usuario: {
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        nc: usuario.nc,
                        email: usuario.email,
                        semestre: usuario.semestre,
                    },
                    videojuego: registro.videojuego_seleccionado,
                    tipo: 'videojuego',
                    fechaRegistro: registro.fecha_registro,
                }
            }

            default:
                return null
        }
    } catch (error) {
        console.error('Error al obtener tarjeta:', error)
        return null
    }
}

// Obtener todas las tarjetas de un usuario
export async function obtenerTodasLasTarjetas(
    nc: string,
): Promise<TarjetaData[]> {
    const tarjetas: TarjetaData[] = []

    try {
        // Tarjeta de talleres
        const tarjetaTaller = await obtenerTarjetaUsuario(nc, 'taller')
        if (tarjetaTaller) tarjetas.push(tarjetaTaller)

        // Tarjeta de videojuegos
        const tarjetaVideojuego = await obtenerTarjetaUsuario(nc, 'videojuego')
        if (tarjetaVideojuego) tarjetas.push(tarjetaVideojuego)

        return tarjetas
    } catch (error) {
        console.error('Error al obtener todas las tarjetas:', error)
        return []
    }
}

// Obtener estadísticas de tarjetas generadas
export async function obtenerEstadisticasTarjetas() {
    try {
        const [talleres, videojuegos] = await Promise.all([
            db.registro_talleres.count(),
            db.registro_videojuegos.count(),
        ])

        return {
            totalTalleres: talleres,
            totalVideojuegos: videojuegos,
            totalGeneral: talleres + videojuegos,
        }
    } catch (error) {
        console.error('Error al obtener estadísticas:', error)
        return {
            totalTalleres: 0,
            totalVideojuegos: 0,
            totalGeneral: 0,
        }
    }
}

// Buscar usuario por NC para generar tarjetas
export async function buscarUsuarioParaTarjeta(nc: string) {
    try {
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

        return usuario
    } catch (error) {
        console.error('Error al buscar usuario:', error)
        return null
    }
}
