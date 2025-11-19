'use client'

import { conteoDeViernes } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { LIMITE_DE_SUSCRIPCION } from '@/lib/constantes'
import { use, useEffect, useState } from 'react'

interface CountersProps {
    initialCounters: Awaited<ReturnType<typeof conteoDeViernes>>
}
export function Counters({ initialCounters }: CountersProps) {
    const [conteos, setConteos] = useState(initialCounters)
    const { counterSignal } = use(counterContext)
    useEffect(() => {
        ;(async () => setConteos(await conteoDeViernes()))()
    }, [counterSignal])
    return (
        <CounterContexProvider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-linear-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30 hover:scale-105 transition-transform shadow-lg hover:shadow-emerald-500/50">
                    <h3 className="text-emerald-300 font-semibold mb-2">
                        Taller 1: Dashboards
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.taller1}
                        </span>
                        <span className="text-white/60">
                            / {LIMITE_DE_SUSCRIPCION.TALLER}
                        </span>
                    </div>
                    <p className="text-emerald-200/80 text-sm mt-2">
                        Personas registradas
                    </p>
                </div>

                <div className="bg-linear-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30 hover:scale-105 transition-transform shadow-lg hover:shadow-teal-500/50">
                    <h3 className="text-teal-300 font-semibold mb-2">
                        Taller 2: RAG
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.taller2}
                        </span>
                        <span className="text-white/60">
                            / {LIMITE_DE_SUSCRIPCION.TALLER}
                        </span>
                    </div>
                    <p className="text-teal-200/80 text-sm mt-2">
                        Personas registradas
                    </p>
                </div>

                <div className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30 hover:scale-105 transition-transform shadow-lg hover:shadow-cyan-500/50">
                    <h3 className="text-cyan-300 font-semibold mb-2">
                        Taller 3: Prompting
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.taller3}
                        </span>
                        <span className="text-white/60">
                            / {LIMITE_DE_SUSCRIPCION.TALLER}
                        </span>
                    </div>
                    <p className="text-cyan-200/80 text-sm mt-2">
                        Personas registradas
                    </p>
                </div>
            </div>
        </CounterContexProvider>
    )
}
