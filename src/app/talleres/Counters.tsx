'use client'

import { conteoDeTalleres } from '@/actions/cotadores'
import { CounterContexProvider, counterContext } from '@/contexts/Counter'
import { LIMITE_DE_SUSCRIPCION } from '@/lib/constantes'
import { use, useEffect, useState } from 'react'

interface CountersProps {
    initialCounters: Awaited<ReturnType<typeof conteoDeTalleres>>
}
export function Counters({ initialCounters }: CountersProps) {
    const [conteos, setConteos] = useState(initialCounters)
    const { counterSignal } = use(counterContext)
    useEffect(() => {
        ;(async () => setConteos(await conteoDeTalleres()))()
    }, [counterSignal])
    return (
        <CounterContexProvider>
            <>
                <p>
                    Taller 1 (9:00 AM): Personas registradas: {conteos.taller1}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 2 (9:00 AM): Personas registradas: {conteos.taller2}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 3 (9:00 AM): Personas registradas: {conteos.taller3}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 1 (11:00 AM): Personas registradas: {conteos.taller4}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 2 (11:00 AM): Personas registradas: {conteos.taller5}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 3 (11:00 AM): Personas registradas: {conteos.taller6}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 1 (12:30 PM): Personas registradas: {conteos.taller7}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 2 (12:30 PM): Personas registradas: {conteos.taller8}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
                <p>
                    Taller 3 (12:30 PM): Personas registradas: {conteos.taller9}{' '}
                    / {LIMITE_DE_SUSCRIPCION.TALLER}
                </p>
            </>
        </CounterContexProvider>
    )
}
