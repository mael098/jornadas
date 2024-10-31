'use client'
import { useEffect, useState } from 'react'
import { conteoDeViernes } from '@/actions/cotadores'
import { Formulario_viernes } from './Formulario_viernes'

interface Contadores {
    taller1: number
    taller2: number
    taller3: number
}

export default function Page() {
    const [contadores, setContadores] = useState<Contadores>({
        taller1: 0,
        taller2: 0,
        taller3: 0,
    })

    // Función para cargar el conteo de talleres desde el servidor
    const cargarConteo = async () => {
        const { taller1, taller2, taller3 } = await conteoDeViernes()
        setContadores({ taller1, taller2, taller3 })
    }

    useEffect(() => {
        // Cargar datos cuando se monta el componente
        cargarConteo()
    }, [])

    return (
        <div id="viernes" className="tabcontent">
            <h1 className="text-left text-3xl">Talleres Día Viernes</h1>

            {/* Pasar cargarConteo al formulario */}
            <Formulario_viernes onRegistroExitoso={cargarConteo} />

            <p id="contador_viernes1">
                Taller 1: Personas registradas: {contadores.taller1} / 36
            </p>
            <p id="contador_viernes2">
                Taller 2: Personas registradas: {contadores.taller2} / 36
            </p>
            <p id="contador_viernes3">
                Taller 3: Personas registradas: {contadores.taller3} / 36
            </p>
        </div>
    )
}

// import { conteoDeViernes } from '@/actions/cotadores'
// import { Formulario_viernes } from './Formulario_viernes'

// export default async function page() {
//     const { taller1, taller2, taller3 } = await conteoDeViernes()
//     return (
//         <div id="viernes" className="tabcontent">
//             <h1 className="text-left text-3xl">Talleres Día Viernes</h1>

//             <Formulario_viernes />

//             <p id="contador_viernes1">
//                 Taller 1: Personas registradas: {taller1} / 36
//             </p>
//             <p id="contador_viernes2">
//                 Taller 2: Personas registradas: {taller2} / 36
//             </p>
//             <p id="contador_viernes3">
//                 Taller 3: Personas registradas: {taller3} / 36
//             </p>
//         </div>
//     )
// }
