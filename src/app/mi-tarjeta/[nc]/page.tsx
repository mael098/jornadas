'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { obtenerTarjeta } from '@/actions/generar_tarjeta'
import dynamic from 'next/dynamic'

const Tarjeta3DSimple = dynamic(() => import('@/components/Tarjeta3DSimple'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-white text-xl">Cargando tarjeta 3D...</div>
        </div>
    ),
})

export default function VisualizarTarjetaPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const nc = params.nc as string
    const tipo = (searchParams.get('tipo') || 'taller') as
        | 'taller'
        | 'videojuego'
        | 'viernes'

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [tarjetaData, setTarjetaData] = useState<any>(null)

    useEffect(() => {
        async function cargarTarjeta() {
            try {
                const result = await obtenerTarjeta(nc, tipo)

                if ('error' in result) {
                    setError(result.error || 'Error al cargar tarjeta')
                } else if (result.tarjeta) {
                    setTarjetaData(result.tarjeta)
                }
            } catch (err) {
                setError('Error al cargar la tarjeta')
            } finally {
                setLoading(false)
            }
        }

        cargarTarjeta()
    }, [nc, tipo])

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">
                    Cargando tarjeta...
                </div>
            </div>
        )
    }

    if (error || !tarjetaData) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-red-500/20 border border-red-500 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-red-200 mb-4">
                        Error
                    </h2>
                    <p className="text-red-100">{error}</p>
                    <a
                        href="/mi-tarjeta"
                        className="mt-6 block text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
                    >
                        Volver a intentar
                    </a>
                </div>
            </div>
        )
    }

    const usuario = tarjetaData.user
    let tallerData = null

    if (tipo === 'taller' && usuario.registro_talleres.length > 0) {
        const registro = usuario.registro_talleres[0]
        tallerData = {
            nombre: registro.taller1.nombre,
            tallerista: registro.taller1.tallerista,
            horario: registro.taller1.horario,
            dia: registro.taller1.dia,
        }
    } else if (tipo === 'viernes' && usuario.Registro_viernes.length > 0) {
        const registro = usuario.Registro_viernes[0]
        tallerData = {
            nombre: registro.talleres.nombre,
            tallerista: registro.talleres.tallerista,
            horario: registro.talleres.horario,
            dia: registro.talleres.dia,
        }
    }

    const videojuego =
        tipo === 'videojuego' && usuario.Registro_videojuegos.length > 0 ?
            usuario.Registro_videojuegos[0].videojuego_seleccionado
        :   undefined

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 ">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {usuario.nombre} {usuario.apellidos}
                    </h1>
                    <p className="text-gray-300">NC: {usuario.nc}</p>
                </div>

                <Tarjeta3DSimple
                    usuario={{
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        nc: usuario.nc,
                        semestre: usuario.semestre,
                    }}
                    taller={tallerData || undefined}
                    videojuego={videojuego}
                    tipo={tipo}
                />

                <div className="mt-8 text-center space-y-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/30">
                        <h3 className="text-xl font-semibold text-white mb-4">
                            Información de la Tarjeta
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-gray-400 text-sm">Tipo</p>
                                <p className="text-white font-semibold capitalize">
                                    {tipo}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Semestre
                                </p>
                                <p className="text-white font-semibold">
                                    {usuario.semestre}°
                                </p>
                            </div>
                        </div>
                    </div>

                    <a
                        href="/mi-tarjeta"
                        className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
                    >
                        Generar Otra Tarjeta
                    </a>
                </div>
            </div>
        </div>
    )
}
