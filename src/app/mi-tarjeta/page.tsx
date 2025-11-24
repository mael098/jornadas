'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { generarTarjeta } from '@/actions/generar_tarjeta'

export default function MiTarjetaPage() {
    const router = useRouter()
    const [nc, setNc] = useState('')
    const [tipo, setTipo] = useState<'taller' | 'videojuego'>('taller')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState<{
        show: boolean
        info?: string
        tipoLabel?: string
    }>({ show: false })

    const handleGenerar = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess({ show: false })

        try {
            const result = await generarTarjeta({ nc, tipo })

            if ('error' in result) {
                setError(result.error || 'Error desconocido')
            } else if (result.success) {
                // Mostrar éxito con la información del taller/videojuego
                setSuccess({
                    show: true,
                    info: result.info || 'No especificado',
                    tipoLabel: result.tipoLabel,
                })

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    router.push(`/mi-tarjeta/${nc}?tipo=${tipo}`)
                }, 2000)
            }
        } catch (err) {
            setError('Error al generar tarjeta')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                        Mi Tarjeta Digital
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Genera tu tarjeta personalizada para las Jornadas
                        Tecnológicas 2025
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30">
                    <form onSubmit={handleGenerar} className="space-y-6">
                        <div>
                            <label className="block text-white mb-2 font-semibold">
                                Número de Control
                            </label>
                            <input
                                type="text"
                                value={nc}
                                onChange={e => setNc(e.target.value)}
                                placeholder="Ej: 22210456"
                                className="w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2 font-semibold">
                                Tipo de Tarjeta
                            </label>
                            <select
                                value={tipo}
                                onChange={e =>
                                    setTipo(
                                        e.target.value as
                                            | 'taller'
                                            | 'videojuego',
                                    )
                                }
                                className="w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                            >
                                <option value="taller">Taller</option>
                                <option value="videojuego">
                                    Torneo de Videojuegos
                                </option>
                            </select>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
                                ❌ {error}
                            </div>
                        )}

                        {success.show && (
                            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-200 animate-pulse">
                                <p className="font-semibold">
                                    ✅ ¡Tarjeta generada con éxito!
                                </p>
                                <p className="text-sm mt-2">
                                    <span className="font-semibold">
                                        {success.tipoLabel}:
                                    </span>{' '}
                                    {success.info}
                                </p>
                                <p className="text-xs mt-3 text-green-300">
                                    Redirigiendo en 2 segundos...
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Generando...' : 'Generar Mi Tarjeta'}
                        </button>
                    </form>

                    <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <p className="text-sm text-gray-300">
                            <span className="font-semibold text-cyan-400">
                                💡 Nota:
                            </span>{' '}
                            Debes haberte registrado previamente a talleres o
                            videojuegos para poder generar tu tarjeta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
