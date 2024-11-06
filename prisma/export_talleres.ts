import type { Usuarios } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const db = new PrismaClient()

const horario_1_taller_1 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario1_id: 1,
            },
        },
    },
})
const horario_1_taller_2 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario1_id: 2,
            },
        },
    },
})
const horario_1_taller_3 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario1_id: 3,
            },
        },
    },
})
const horario_2_taller_1 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 4,
            },
        },
    },
})
const horario_2_taller_2 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 5,
            },
        },
    },
})
const horario_2_taller_3 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 6,
            },
        },
    },
})
const horario_3_taller_1 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 7,
            },
        },
    },
})
const horario_3_taller_2 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 8,
            },
        },
    },
})
const horario_3_taller_3 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 9,
            },
        },
    },
})
const viernes_1 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 10,
            },
        },
    },
})
const viernes_2 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 11,
            },
        },
    },
})
const viernes_3 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            every: {
                taller_horario2_id: 12,
            },
        },
    },
})

rm('exports', { recursive: true })
    .catch()
    .finally(() =>
        mkdir('exports', { recursive: true }).then(() => {
            writeFile(
                'exports/horario_1_taller_1.csv',
                toCSV(horario_1_taller_1),
            )
            writeFile(
                'exports/horario_1_taller_2.csv',
                toCSV(horario_1_taller_2),
            )
            writeFile(
                'exports/horario_1_taller_3.csv',
                toCSV(horario_1_taller_3),
            )
            writeFile(
                'exports/horario_2_taller_1.csv',
                toCSV(horario_2_taller_1),
            )
            writeFile(
                'exports/horario_2_taller_2.csv',
                toCSV(horario_2_taller_2),
            )
            writeFile(
                'exports/horario_2_taller_3.csv',
                toCSV(horario_2_taller_3),
            )
            writeFile(
                'exports/horario_3_taller_1.csv',
                toCSV(horario_3_taller_1),
            )
            writeFile(
                'exports/horario_3_taller_2.csv',
                toCSV(horario_3_taller_2),
            )
            writeFile(
                'exports/horario_3_taller_3.csv',
                toCSV(horario_3_taller_3),
            )
            writeFile('exports/viernes_1.csv', toCSV(viernes_1))
            writeFile('exports/viernes_2.csv', toCSV(viernes_2))
            writeFile('exports/viernes_3.csv', toCSV(viernes_3))
        }),
    )

function toCSV(users: Usuarios[]) {
    return [
        'nc,nombres,apellidos,semestre',
        ...users.map(u => `${u.nc},${u.nombre},${u.apellidos},${u.semestre}`),
    ].join('\n')
}
// jornadas-git-dev-mael098s-projects.vercel.app
