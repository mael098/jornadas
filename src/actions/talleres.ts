'use server'

import { db } from '@/lib/db'
import { Dia, Horario } from '@prisma/client'

export async function getTalleresViernes() {
    return await db.talleres.findMany({
        where: {
            dia: Dia.VIERNES,
        },
    })
}

export async function getTalleresJueves() {
    return await Promise.all([
        db.talleres.findMany({
            where: {
                dia: Dia.JUEVES,
                horario: Horario.HORARIO1,
            },
        }),
        db.talleres.findMany({
            where: {
                dia: Dia.JUEVES,
                horario: Horario.HORARIO2,
            },
        }),
        db.talleres.findMany({
            where: {
                dia: Dia.JUEVES,
                horario: Horario.HORARIO3,
            },
        }),
    ])
}
