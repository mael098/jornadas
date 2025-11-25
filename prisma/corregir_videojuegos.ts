import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function corregirVideojuegos() {
    try {
        console.log('Iniciando corrección de videojuegos...')

        // Mapeo de videojuegos incorrectos a correctos
        const mapeoCorrecciones = {
            FIFA: 'KOF 2002',
            'Super Smash Bros': 'Smash',
            'Mario Kart': 'Minecraft',
            Minecraft: 'Smash', // Gente que eligió Smash quedó registrada como Minecraft
            // Agregar más si es necesario
        }

        // Iterar sobre cada corrección
        for (const [incorrecto, correcto] of Object.entries(
            mapeoCorrecciones,
        )) {
            const registrosActualizados =
                await db.registro_videojuegos.updateMany({
                    where: {
                        videojuego_seleccionado: incorrecto,
                    },
                    data: {
                        videojuego_seleccionado: correcto,
                    },
                })

            console.log(
                `✓ Actualizado: "${incorrecto}" → "${correcto}" (${registrosActualizados.count} registros)`,
            )
        }

        // Mostrar todos los videojuegos actuales
        const todosLosRegistros = await db.registro_videojuegos.findMany({
            select: {
                id: true,
                videojuego_seleccionado: true,
                usuario_nc: true,
            },
        })

        console.log('\n📊 Estado actual de videojuegos registrados:')
        console.table(todosLosRegistros)

        console.log('\n✅ Corrección completada exitosamente')
    } catch (error) {
        console.error('❌ Error durante la corrección:', error)
    } finally {
        await db.$disconnect()
    }
}

corregirVideojuegos()
