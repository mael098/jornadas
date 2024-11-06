'use server'

import { db } from '@/lib/db'
import { Dia } from '@prisma/client'

export async function getTalleresViernes() {
    return await db.talleres.findMany({
        where: {
            dia: Dia.VIERNES,
        },
    })
}
