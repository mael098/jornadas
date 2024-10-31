'use client'
import { useEffect, useState } from 'react'
import { conteoDeVideojuegos } from '@/actions/cotadores'
import { Formulario_juegos } from './Formulario_juegos'

interface Contadores {
    juego1: number
    juego2: number
    juego3: number
}

export default function Page() {
    const [contadores, setContadores] = useState<Contadores>({
        juego1: 0,
        juego2: 0,
        juego3: 0,
    })

    // Función para cargar el conteo de videojuegos desde el servidor
    const cargarConteo = async () => {
        const { juego1, juego2, juego3 } = await conteoDeVideojuegos()
        setContadores({ juego1, juego2, juego3 })
    }

    useEffect(() => {
        // Cargar datos cuando se monta el componente
        cargarConteo()
    }, [])

    return (
        <div id="videojuegos" className="tabcontent">
            <h1 className="text-left text-3xl">Concurso de Videojuegos</h1>
            {/* Pasar la función cargarConteo al formulario */}
            <Formulario_juegos onRegistroExitoso={cargarConteo} />
            <p id="contador_juego1">
                Juego 1: Personas registradas: {contadores.juego1} / 36
            </p>
            <p id="contador_juego2">
                Juego 2: Personas registradas: {contadores.juego2} / 36
            </p>
            <p id="contador_juego3">
                Juego 3: Personas registradas: {contadores.juego3} / 36
            </p>
        </div>
    )
}

// import { conteoDeVideojuegos } from '@/actions/cotadores'
// import { Formulario_juegos } from './Formulario_juegos'

// export default async function page() {
//     const { juego1, juego2, juego3 } = await conteoDeVideojuegos()
//     return (
//         <div id="videojuegos" className="tabcontent">
//             <h1 className=" text-left text-3xl">Concurso de Videojuegos</h1>

//             <Formulario_juegos />
//             <p id="contador_juego1">
//                 Juego 1: Personas registradas: {juego1} / 36
//             </p>
//             <p id="contador_juego2">
//                 Juego 2: Personas registradas: {juego2} / 36
//             </p>
//             <p id="contador_juego3">
//                 Juego 3: Personas registradas: {juego3} / 36
//             </p>
//         </div>
//     )
// }
