'use client'

import { conteoDeVideojuegos } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { use, useEffect, useState } from 'react'

interface CountersProps {
    initialCounters: Awaited<ReturnType<typeof conteoDeVideojuegos>>
}
export function Counters({ initialCounters }: CountersProps) {
    const [conteos, setConteos] = useState(initialCounters)
    const { counterSignal } = use(counterContext)

    useEffect(() => {
        ;(async () => setConteos(await conteoDeVideojuegos()))()
    }, [counterSignal])

    return (
        <CounterContexProvider>
            <div className="max-w-2xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* KOF 2002 */}
                <div
                    className="bg-linear-to-br from-red-500/20 to-orange-500/20 
                              backdrop-blur-sm rounded-xl p-6 border border-red-500/30
                              hover:border-red-400/50 transition-all duration-300
                              hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">
                            🥊 KOF 2002
                        </h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.juego1}
                        </span>
                        <span className="text-white/60 text-sm mb-1.5">
                            registrados
                        </span>
                    </div>
                </div>

                {/* Minecraft */}
                <div
                    className="bg-linear-to-br from-green-500/20 to-emerald-500/20 
                              backdrop-blur-sm rounded-xl p-6 border border-green-500/30
                              hover:border-green-400/50 transition-all duration-300
                              hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/20"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">
                            ⛏️ Minecraft
                        </h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.juego3}
                        </span>
                        <span className="text-white/60 text-sm mb-1.5">
                            registrados
                        </span>
                    </div>
                </div>

                {/* Smash */}
                <div
                    className="bg-linear-to-br from-purple-500/20 to-pink-500/20 
                              backdrop-blur-sm rounded-xl p-6 border border-purple-500/30
                              hover:border-purple-400/50 transition-all duration-300
                              hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">
                            ⚔️ Smash
                        </h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-white">
                            {conteos.juego2}
                        </span>
                        <span className="text-white/60 text-sm mb-1.5">
                            registrados
                        </span>
                    </div>
                </div>
            </div>
        </CounterContexProvider>
    )
}
