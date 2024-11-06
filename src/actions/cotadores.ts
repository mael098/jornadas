'use server'
import { JUEGOS } from '@/lib/constantes'
import { db } from '@/lib/db'

export async function conteoDeTalleres() {
    const [
        taller1,
        taller2,
        taller3,
        taller4,
        taller5,
        taller6,
        taller7,
        taller8,
        taller9,
    ] = await Promise.all([
        db.registro_talleres.count({
            where: {
                taller_horario1_id: 1,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario1_id: 2,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario1_id: 3,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario2_id: 4,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario2_id: 5,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario2_id: 6,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario3_id: 7,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario3_id: 8,
            },
        }),
        db.registro_talleres.count({
            where: {
                taller_horario3_id: 9,
            },
        }),
    ])

    return {
        taller1,
        taller2,
        taller3,
        taller4,
        taller5,
        taller6,
        taller7,
        taller8,
        taller9,
    }
}

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
    return {
        juego1,
        juego2,
        juego3,
    }
}

export async function conteoDeViernes() {
    const [taller1, taller2, taller3] = await Promise.all([
        db.registro_viernes.count({
            where: {
                taller_id: 10,
            },
        }),
        db.registro_viernes.count({
            where: {
                taller_id: 11,
            },
        }),
        db.registro_viernes.count({
            where: {
                taller_id: 12,
            },
        }),
    ])
    return {
        taller1,
        taller2,
        taller3,
    }
}
