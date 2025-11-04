'use client'
import { useEffect, useState } from 'react'

// Estilos
import './contador.css'
import { FECHA_DEL_EVENTO } from '@/lib/constantes'

export function Contador() {
    const [dias, setday] = useState(0)
    const [minutos, setminutos] = useState(0)
    const [horas, sethoras] = useState(0)
    const [segundos, setsegundos] = useState(0)
    const [colorCountdown, setColorCountdown] = useState('#333')
    const [iniciado, setIniciado] = useState(false)

    useEffect(() => {
        const eventoFecha = new Date(FECHA_DEL_EVENTO).getTime()

        // Debug: Mostrar fechas en consola
        console.log('Fecha del evento:', new Date(FECHA_DEL_EVENTO))
        console.log('Fecha actual:', new Date())

        const intervalo = setInterval(function () {
            const ahora = new Date().getTime()
            const diferencia = eventoFecha - ahora

            // Si el tiempo termina
            if (diferencia < 0) {
                clearInterval(intervalo)
                setIniciado(true)
                return
            }

            // Calculos de días, horas, minutos y segundos
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
            const horas = Math.floor(
                (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            )
            const minutos = Math.floor(
                (diferencia % (1000 * 60 * 60)) / (1000 * 60),
            )
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000)

            // Mostrar el resultado en cada elemento correspondiente
            setday(dias)
            sethoras(horas)
            setminutos(minutos)
            setsegundos(segundos)

            // Cambiar el color del texto a rojo si queda menos de una hora
            if (diferencia < 3600000 && diferencia > 0) {
                setColorCountdown('red')
            }
        }, 1000)

        return () => clearInterval(intervalo)
    }, [])
    return (
        <>
            {!iniciado && (
                <div
                    style={{
                        color: colorCountdown,
                    }}
                    className="countdown-container"
                >
                    <div className="faltan">Faltan</div>
                    <div className="countdown-block">
                        <span>{dias}</span>
                        <p>Días</p>
                    </div>
                    <div className="countdown-block">
                        <span>{horas}</span>
                        <p>Horas</p>
                    </div>
                    <div className="countdown-block">
                        <span>{minutos}</span>
                        <p>Minutos</p>
                    </div>
                    <div className="countdown-block">
                        <span>{segundos}</span>
                        <p>Segundos</p>
                    </div>
                </div>
            )}

            {/* <!-- Mensaje de Evento Iniciado --> */}
            {iniciado && (
                <div className="evento-iniciado hidden">¡Evento iniciado!</div>
            )}
        </>
    )
}
