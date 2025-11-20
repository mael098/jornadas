'use client'

import React, { useState, useTransition } from 'react'
import TarjetaDigital from '@/components/TarjetaDigital'
import { obtenerTodasLasTarjetas, type TarjetaData } from '@/actions/tarjetas'

const GeneradorTarjetas: React.FC = () => {
    const [nc, setNc] = useState('')
    const [tarjetas, setTarjetas] = useState<TarjetaData[]>([])
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState('')
    const [searched, setSearched] = useState(false)

    const buscarTarjetas = async () => {
        if (!nc.trim()) {
            setError('Por favor ingresa tu número de control')
            return
        }

        setError('')
        setSearched(false)

        startTransition(async () => {
            try {
                const tarjetasEncontradas = await obtenerTodasLasTarjetas(
                    nc.trim(),
                )
                setTarjetas(tarjetasEncontradas)
                setSearched(true)

                if (tarjetasEncontradas.length === 0) {
                    setError(
                        'No se encontraron registros para este número de control',
                    )
                }
            } catch (err) {
                setError('Error al buscar las tarjetas. Intenta nuevamente.')
                console.error('Error:', err)
            }
        })
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            buscarTarjetas()
        }
    }

    const limpiarBusqueda = () => {
        setNc('')
        setTarjetas([])
        setError('')
        setSearched(false)
    }

    const getTipoNombre = (tipo: string) => {
        switch (tipo) {
            case 'taller':
                return 'Taller'
            case 'videojuego':
                return 'Torneo de Videojuegos'
            default:
                return tipo
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                    Generador de Tarjetas Digitales
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Ingresa tu número de control para generar tus pases
                    digitales para las Jornadas Tecnológicas 2025
                </p>
            </div>

            {/* Buscador */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-linear-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="nc"
                                className="block text-lg font-semibold text-cyan-300 mb-3"
                            >
                                Número de Control
                            </label>
                            <div className="flex space-x-4">
                                <input
                                    id="nc"
                                    type="text"
                                    value={nc}
                                    onChange={e => setNc(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ej: 22210456"
                                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                    disabled={isPending}
                                />
                                <button
                                    onClick={buscarTarjetas}
                                    disabled={isPending}
                                    className="px-8 py-3 bg-linear-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    {isPending ?
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            <span>Buscando...</span>
                                        </div>
                                    :   'Generar Tarjetas'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                                <p className="text-red-400 text-center">
                                    {error}
                                </p>
                            </div>
                        )}

                        {searched && tarjetas.length === 0 && !error && (
                            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                                <p className="text-yellow-400 text-center">
                                    No tienes registros activos. Regístrate
                                    primero en los eventos disponibles.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tarjetas generadas */}
            {tarjetas.length > 0 && (
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Tus Pases Digitales
                        </h2>
                        <p className="text-gray-300">
                            Se encontraron {tarjetas.length} registro(s)
                            activo(s)
                        </p>
                        <button
                            onClick={limpiarBusqueda}
                            className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                        >
                            Nueva Búsqueda
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {tarjetas.map((tarjeta, index) => (
                            <div
                                key={`${tarjeta.tipo}-${tarjeta.usuario.nc}-${index}`}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-semibold text-center text-cyan-300">
                                    {getTipoNombre(tarjeta.tipo)}
                                </h3>
                                <TarjetaDigital
                                    usuario={tarjeta.usuario}
                                    taller={tarjeta.taller}
                                    videojuego={tarjeta.videojuego}
                                    tipo={tarjeta.tipo}
                                />
                                <div className="text-center text-sm text-gray-400">
                                    Registrado:{' '}
                                    {new Date(
                                        tarjeta.fechaRegistro,
                                    ).toLocaleDateString('es-MX', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Información adicional */}
            <div className="mt-16 max-w-4xl mx-auto">
                <div className="bg-linear-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                        📱 Información sobre las Tarjetas Digitales
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                🎫 Cómo usar tu pase:
                            </h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>
                                    • Presenta tu tarjeta digital al ingresar al
                                    evento
                                </li>
                                <li>
                                    • Guarda la imagen o captura de pantalla
                                </li>
                                <li>• Llega 15 minutos antes del inicio</li>
                                <li>• Mantén tu dispositivo cargado</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                ⚠️ Importante:
                            </h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>
                                    • Las tarjetas son personales e
                                    intransferibles
                                </li>
                                <li>
                                    • Verifica que tu información sea correcta
                                </li>
                                <li>
                                    • Contacta a soporte si encuentras errores
                                </li>
                                <li>
                                    • Cada registro genera una tarjeta única
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
                        <p className="text-center text-gray-300">
                            <span className="text-cyan-400 font-semibold">
                                💡 Tip:
                            </span>{' '}
                            Puedes guardar o imprimir tus tarjetas como respaldo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneradorTarjetas
