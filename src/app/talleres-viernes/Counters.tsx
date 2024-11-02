'use client'

import { conteoDeViernes } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { use, useEffect, useState } from 'react'

export function Counters() {
    const [conteos, setConteos] = useState(use(conteoDeViernes()))
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
