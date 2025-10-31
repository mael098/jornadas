'use client'
import { useEffect, useState } from 'react'
import { conteoDeVideojuegos } from '@/actions/cotadores'
import { GamesForm } from './FormularioJuegos'
import { Counters } from './Counters'

export default function Page() {
    const [counts, setCounts] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const data = await conteoDeVideojuegos()
                setCounts(data)
            } catch (error) {
                console.error('Error loading counts:', error)
            } finally {
                setLoading(false)
            }
        }

        loadCounts()
    }, [])

    if (loading) {
        return (
            <div id="videojuegos" className="tabcontent">
                <h1 className="text-left text-3xl">Concurso de Videojuegos</h1>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div id="videojuegos" className="tabcontent">
            <h1 className="text-left text-3xl">Concurso de Videojuegos</h1>
            {/* Pasar la función cargarConteo al formulario */}
            <GamesForm />
            {counts && <Counters initialCounters={counts} />}
        </div>
    )
}
