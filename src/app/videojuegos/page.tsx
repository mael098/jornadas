import { useEffect, useState } from 'react'
import { conteoDeVideojuegos } from '@/actions/cotadores'
import { GamesForm } from './FormularioJuegos'
import { Counters } from './Counters'

export default function Page() {
    return (
        <div id="videojuegos" className="tabcontent">
            <h1 className="text-left text-3xl">Concurso de Videojuegos</h1>
            {/* Pasar la función cargarConteo al formulario */}
            <GamesForm />
            <Counters />
        </div>
    )
}
