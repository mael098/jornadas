'use server'

import { db } from '@/lib/db'

export async function getTalleresViernes() {
    return await db.talleres.findMany()
}

export async function getTalleresViernesByUser(nc: string) {
    return await db.registro_talleres.findUnique({
        where: {
            usuario_nc: nc,
        },
    })
}

export async function getVideojuegosByUser(nc: string) {
    return await db.registro_videojuegos.findFirst({
        where: {
            usuario_nc: nc,
        },
    })
}
