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
            <>
                <p>Juego 1: Personas registradas: {conteos.juego1}</p>
                <p>Juego 2: Personas registradas: {conteos.juego2}</p>
                <p>Juego 3: Personas registradas: {conteos.juego3}</p>
            </>
        </CounterContexProvider>
    )
}
