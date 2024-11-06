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
            <>
                <p>
                    Taller 1: Personas registradas: {conteos.taller1} /{' '}
                    {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 2: Personas registradas: {conteos.taller2} /{' '}
                    {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 3: Personas registradas: {conteos.taller3} /{' '}
                    {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
            </>
        </CounterContexProvider>
    )
}
