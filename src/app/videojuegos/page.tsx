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
            <div id="videojuegos" className="tabcontent px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">
                        🎮 Concurso de Videojuegos
                    </h1>
                    <div className="flex flex-col items-center justify-center py-12">
                        <svg
                            className="animate-spin h-12 w-12 text-blue-500 mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="text-white/60 text-lg">
                            Cargando torneos...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="videojuegos" className="tabcontent px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header con diseño mejorado */}
                <div className="text-center mb-12">
                    <h1
                        className="text-4xl md:text-5xl font-black text-white mb-4 
                                 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                        🎮 Concurso de Videojuegos
                    </h1>
                    <p className="text-white/60 text-lg">
                        Regístrate en tu torneo favorito y demuestra tus
                        habilidades
                    </p>
                </div>

                {/* Estadísticas de registros */}
                {counts && <Counters initialCounters={counts} />}

                {/* Formulario de registro */}
                <div className="mt-12">
                    <GamesForm />
                </div>
            </div>
        </div>
    )
}
