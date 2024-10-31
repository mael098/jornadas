'use client'
import { conteoDeTalleres } from '@/actions/cotadores'
import { Formulario_taller } from './Formulario_taller'
import { useEffect, useState } from 'react'

interface Contadores {
    taller1: number
    taller2: number
    taller3: number
    taller4: number
    taller5: number
    taller6: number
    taller7: number
    taller8: number
    taller9: number
}

export default function Page() {
    const [conteos, setconteos] = useState<Contadores>({
        taller1: 0,
        taller2: 0,
        taller3: 0,
        taller4: 0,
        taller5: 0,
        taller6: 0,
        taller7: 0,
        taller8: 0,
        taller9: 0,
    })

    // Función para cargar el conteo de los talleres
    const cargaConteo = async () => {
        try {
            const {
                taller1,
                taller2,
                taller3,
                taller4,
                taller5,
                taller6,
                taller7,
                taller8,
                taller9,
            } = await conteoDeTalleres()
            setconteos({
                taller1,
                taller2,
                taller3,
                taller4,
                taller5,
                taller6,
                taller7,
                taller8,
                taller9,
            })
        } catch (error) {
            console.error('Error al cargar el conteo de talleres:', error)
        }
    }

    // Llama a cargaConteo una vez cuando el componente se monta
    useEffect(() => {
        cargaConteo()
    }, [])

    return (
        <div id="talleres" className="tabcontent">
            <h1 className="text-left text-3xl">
                Talleres Disponibles y Registro
            </h1>
            {/* Formulario de Registro */}
            <Formulario_taller onRegistroExito={cargaConteo} />

            {/* Contadores de cada taller */}
            <p id="contador1">
                Taller 1 (9:00 AM): Personas registradas: {conteos.taller1} / 36
            </p>
            <p id="contador2">
                Taller 2 (9:00 AM): Personas registradas: {conteos.taller2} / 36
            </p>
            <p id="contador3">
                Taller 3 (9:00 AM): Personas registradas: {conteos.taller3} / 36
            </p>
            <p id="contador4">
                Taller 1 (1:00 PM): Personas registradas: {conteos.taller4} / 36
            </p>
            <p id="contador5">
                Taller 2 (1:00 PM): Personas registradas: {conteos.taller5} / 36
            </p>
            <p id="contador6">
                Taller 3 (1:00 PM): Personas registradas: {conteos.taller6} / 36
            </p>
            <p id="contador7">
                Taller 1 (4:00 PM): Personas registradas: {conteos.taller7} / 36
            </p>
            <p id="contador8">
                Taller 2 (4:00 PM): Personas registradas: {conteos.taller8} / 36
            </p>
            <p id="contador9">
                Taller 3 (4:00 PM): Personas registradas: {conteos.taller9} / 36
            </p>
        </div>
    )
}
