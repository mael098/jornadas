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
        dia: string
    }
    videojuego?: string
    tipo: 'taller' | 'videojuego' | 'viernes'
    fechaRegistro: Date
}

// Obtener tarjeta por NC de usuario y tipo de registro
export async function obtenerTarjetaUsuario(
    nc: string,
    tipo: 'taller' | 'videojuego' | 'viernes',
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
                const registro = await db.registro_talleres.findFirst({
                    where: { usuario_nc: nc },
                    include: {
                        taller1: true,
                        taller2: true,
                        taller3: true,
                    },
                })

                if (!registro) return null

                // Por ahora retornamos el primer taller, pero podrías implementar lógica para seleccionar cuál
                const taller = registro.taller1

                return {
                    usuario: {
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        nc: usuario.nc,
                        email: usuario.email,
                        semestre: usuario.semestre,
                    },
                    taller: {
                        nombre: taller.nombre,
                        tallerista: taller.tallerista,
                        horario: taller.horario,
                        dia: taller.dia,
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

            case 'viernes': {
                const registro = await db.registro_viernes.findFirst({
                    where: { usuario_nc: nc },
                    include: {
                        talleres: true,
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
                        nombre: registro.talleres.nombre,
                        tallerista: registro.talleres.tallerista,
                        horario: registro.talleres.horario,
                        dia: registro.talleres.dia,
                    },
                    tipo: 'viernes',
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
        // Tarjeta de talleres regulares
        const tarjetaTaller = await obtenerTarjetaUsuario(nc, 'taller')
        if (tarjetaTaller) tarjetas.push(tarjetaTaller)

        // Tarjeta de videojuegos
        const tarjetaVideojuego = await obtenerTarjetaUsuario(nc, 'videojuego')
        if (tarjetaVideojuego) tarjetas.push(tarjetaVideojuego)

        // Tarjeta de viernes
        const tarjetaViernes = await obtenerTarjetaUsuario(nc, 'viernes')
        if (tarjetaViernes) tarjetas.push(tarjetaViernes)

        return tarjetas
    } catch (error) {
        console.error('Error al obtener todas las tarjetas:', error)
        return []
    }
}

// Obtener estadísticas de tarjetas generadas
export async function obtenerEstadisticasTarjetas() {
    try {
        const [talleres, videojuegos, viernes] = await Promise.all([
            db.registro_talleres.count(),
            db.registro_videojuegos.count(),
            db.registro_viernes.count(),
        ])

        return {
            totalTalleres: talleres,
            totalVideojuegos: videojuegos,
            totalViernes: viernes,
            totalGeneral: talleres + videojuegos + viernes,
        }
    } catch (error) {
        console.error('Error al obtener estadísticas:', error)
        return {
            totalTalleres: 0,
            totalVideojuegos: 0,
            totalViernes: 0,
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

        return usuario
    } catch (error) {
        console.error('Error al buscar usuario:', error)
        return null
    }
}
