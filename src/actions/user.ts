'use server'

import { db } from '@/lib/db'

export async function getUser(nc: string) {
    return await db.usuarios.findFirst({
        select: {
            apellidos: true,
            email: true,
            nombre: true,
            nc: true,
            semestre: true,
            registro_talleres: true,
            Registro_videojuegos: true,
            Registro_viernes: true,
        },
        where: {
            nc: nc,
        },
    })
}
