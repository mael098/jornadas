'use client'

import { conteoDeViernes } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
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
            <>
                <p>Taller 1: Personas registradas: {conteos.taller1} / 36</p>
                <p>Taller 2: Personas registradas: {conteos.taller2} / 36</p>
                <p>Taller 3: Personas registradas: {conteos.taller3} / 36</p>
            </>
        </CounterContexProvider>
    )
}
