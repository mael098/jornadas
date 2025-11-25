import type { Usuarios } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const db = new PrismaClient()

// Nuevo esquema: un solo taller por usuario
const taller_1 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            taller_id: 1,
        },
    },
    select: {
        nc: true,
        nombre: true,
        apellidos: true,
        email: true,
        semestre: true,
    },
})
const taller_2 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            taller_id: 2,
        },
    },
    select: {
        nc: true,
        nombre: true,
        apellidos: true,
        email: true,
        semestre: true,
    },
})
const taller_3 = await db.usuarios.findMany({
    where: {
        registro_talleres: {
            taller_id: 3,
        },
    },
    select: {
        nc: true,
        nombre: true,
        apellidos: true,
        email: true,
        semestre: true,
    },
})

function asTsv(data: typeof taller_1) {
    const headers = ['NC', 'Nombre', 'Apellidos', 'Email', 'Semestre']
    return [
        headers.join('\t'),
        ...data.map(u =>
            [u.nc, u.nombre, u.apellidos, u.email, u.semestre].join('\t'),
        ),
    ].join('\n')
}

try {
    await rm('exports', { recursive: true })
} catch {}
await mkdir('exports')

await writeFile('exports/taller_1.tsv', asTsv(taller_1))
await writeFile('exports/taller_2.tsv', asTsv(taller_2))
await writeFile('exports/taller_3.tsv', asTsv(taller_3))

console.log('✅ Exports generados:')
console.log(`  - Taller 1: ${taller_1.length} registros`)
console.log(`  - Taller 2: ${taller_2.length} registros`)
console.log(`  - Taller 3: ${taller_3.length} registros`)

const allUsers_juego = await db.usuarios.findMany({
    where: {
        Registro_videojuegos: {
            some: {
                videojuego_seleccionado: 'Smash',
            },
        },
    },
    select: {
        nc: true,
        nombre: true,
        apellidos: true,
        email: true,
        semestre: true,
    },
})

const allUsers_juego_minecraft = await db.usuarios.findMany({
    where: {
        Registro_videojuegos: {
            some: {
                videojuego_seleccionado: 'Minecraft',
            },
        },
    },
    select: {
        nc: true,
        nombre: true,
        apellidos: true,
        email: true,
        semestre: true,
    },
})

const allUsers_juego_KOF_2002 = await db.usuarios.findMany({})

await writeFile('exports/usuarios_smash.tsv', asTsv(allUsers_juego))
await writeFile(
    'exports/usuarios_minecraft.tsv',
    asTsv(allUsers_juego_minecraft),
)
console.log(
    `  - Usuarios que eligieron Smash: ${allUsers_juego.length} registros`,
)
console.log(
    `  - Usuarios que eligieron Minecraft: ${allUsers_juego_minecraft.length} registros`,
)
