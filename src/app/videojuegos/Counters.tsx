'use client'

import { conteoDeVideojuegos } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { use, useEffect, useState } from 'react'

export function Counters() {
    const [conteos, setConteos] = useState(use(conteoDeVideojuegos()))
    const { counterSignal } = use(counterContext)
    useEffect(() => {
        ;(async () => setConteos(await conteoDeVideojuegos()))()
    }, [counterSignal])
    return (
        <CounterContexProvider>
            <>
                <p>Juego 1: Personas registradas: {conteos.juego1} / 36</p>
                <p>Juego 2: Personas registradas: {conteos.juego2} / 36</p>
                <p>Juego 3: Personas registradas: {conteos.juego3} / 36</p>
            </>
        </CounterContexProvider>
    )
}
