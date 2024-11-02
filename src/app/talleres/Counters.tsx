'use client'

import { conteoDeTalleres } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { use, useEffect, useState } from 'react'

export function Counters() {
    const [conteos, setConteos] = useState(use(conteoDeTalleres()))
    const { counterSignal } = use(counterContext)
    useEffect(() => {
        ;(async () => setConteos(await conteoDeTalleres()))()
    }, [counterSignal])
    return (
        <CounterContexProvider>
            <>
                <p>
                    Taller 1 (9:00 AM): Personas registradas: {conteos.taller1}{' '}
                    / 36
                </p>
                <p>
                    Taller 2 (9:00 AM): Personas registradas: {conteos.taller2}{' '}
                    / 36
                </p>
                <p>
                    Taller 3 (9:00 AM): Personas registradas: {conteos.taller3}{' '}
                    / 36
                </p>
                <p>
                    Taller 1 (1:00 PM): Personas registradas: {conteos.taller4}{' '}
                    / 36
                </p>
                <p>
                    Taller 2 (1:00 PM): Personas registradas: {conteos.taller5}{' '}
                    / 36
                </p>
                <p>
                    Taller 3 (1:00 PM): Personas registradas: {conteos.taller6}{' '}
                    / 36
                </p>
                <p>
                    Taller 1 (4:00 PM): Personas registradas: {conteos.taller7}{' '}
                    / 36
                </p>
                <p>
                    Taller 2 (4:00 PM): Personas registradas: {conteos.taller8}{' '}
                    / 36
                </p>
                <p>
                    Taller 3 (4:00 PM): Personas registradas: {conteos.taller9}{' '}
                    / 36
                </p>
            </>
        </CounterContexProvider>
    )
}
