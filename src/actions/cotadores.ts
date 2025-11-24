'use server'
import { JUEGOS } from '@/lib/constantes'
import { db } from '@/lib/db'

export async function conteoDeVideojuegos() {
    const [juego1, juego2, juego3] = await Promise.all([
        db.registro_videojuegos.count({
            where: {
                videojuego_seleccionado: JUEGOS.Juego_1,
            },
        }),
        db.registro_videojuegos.count({
            where: {
                videojuego_seleccionado: JUEGOS.Juego_2,
            },
        }),
        db.registro_videojuegos.count({
            where: {
                videojuego_seleccionado: JUEGOS.Juego_3,
            },
        }),
    ])

    // Debug: Mostrar todos los registros de videojuegos
    const todosLosRegistros = await db.registro_videojuegos.findMany({
        select: {
            videojuego_seleccionado: true,
        },
    })
    console.log('📊 Todos los videojuegos en BD:', todosLosRegistros)
    console.log('🎮 Buscando por:', {
        juego1: JUEGOS.Juego_1,
        juego2: JUEGOS.Juego_2,
        juego3: JUEGOS.Juego_3,
    })

    return {
        juego1,
        juego2,
        juego3,
    }
}

export async function conteoDeViernes() {
    const [taller1, taller2, taller3] = await Promise.all([
        db.registro_talleres.count({
            where: {
                taller_id: 1,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_id: 2,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_id: 3,
            },
        }),
    ])
    return {
        taller1,
        taller2,
        taller3,
    }
}
