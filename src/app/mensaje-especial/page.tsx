'use client'

import { useState, useEffect } from 'react'
import { obtenerNumeroControl } from '@/lib/cookies'

export default function MensajeEspecial() {
    const [numeroControl, setNumeroControl] = useState('')
    const [permitido, setPermitido] = useState(false)
    const [intento, setIntento] = useState(false)

    const NUMERO_AUTORIZADO = '22820090'

    useEffect(() => {
        // Verificar si ya hay una cookie válida
        const cookieControl = obtenerNumeroControl()
        if (cookieControl === NUMERO_AUTORIZADO) {
            setPermitido(true)
            setNumeroControl(NUMERO_AUTORIZADO)
        }
    }, [])

    const handleVerificar = () => {
        setIntento(true)
        if (numeroControl === NUMERO_AUTORIZADO) {
            setPermitido(true)
        }
    }

    if (permitido) {
        return (
            <div className="min-h-screen bg-linear-to-br from-pink-900 via-red-900 to-pink-900 text-white overflow-hidden">
                {/* Fondo decorativo */}
                <div className="fixed inset-0 opacity-10">
                    <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-red-500 opacity-20 blur-3xl"></div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
                    {/* Encabezado */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
                            <span className="text-pink-400 text-sm font-semibold">
                                Mensaje Especial
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                            Mi amor…
                        </h1>
                        <div className="h-1 w-24 bg-linear-to-r from-pink-400 to-red-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Contenido */}
                    <article className="space-y-6 text-lg leading-relaxed">
                        <p className="text-gray-200">
                            Quiero decirte algo desde lo más sincero de mí: lo
                            siento.
                        </p>

                        <p className="text-gray-300">
                            Perdón por las cosas que a veces no hago como tú
                            quisieras, por los momentos en los que no reacciono
                            bien o me dejo llevar por mis emociones.
                            <br />
                            Perdón por lo de ayer… no quiero que nada de lo que
                            pase entre nosotros te lastime.
                        </p>

                        <div className="bg-linear-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-lg p-6 my-8">
                            <p className="text-gray-200 font-semibold mb-2">
                                Quiero que sepas algo muy claro: te amo
                                muchísimo.
                            </p>
                            <p className="text-gray-300">
                                Eres algo maravilloso en mi mundo, eres mi paz,
                                mi fuerza y mi motivación.
                                <br />
                                Si hoy estoy creciendo, avanzando y llegando
                                lejos es porque te tengo a ti acompañándome,
                                dándome luz y empujándome a ser mejor.
                            </p>
                        </div>

                        <p className="text-gray-300">
                            Sé que todo esto que estamos viviendo son etapas, y
                            soy consciente de ello.
                            <br />
                            La universidad, los proyectos, los cambios… todo
                            forma parte de un camino que estamos recorriendo
                            juntos.
                            <br />Y aunque a veces se sienta difícil, también sé
                            que cada etapa que superamos nos une más, nos hace
                            más fuertes y nos acerca a un futuro que quiero
                            vivir contigo.
                        </p>

                        <div className="bg-linear-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-lg p-6 my-8">
                            <p className="text-gray-200 font-semibold mb-4">
                                No quiero que tengas dudas de algo:
                            </p>
                            <p className="text-gray-200 text-xl font-bold">
                                Eres mi todo, mi amor.
                            </p>
                            <p className="text-gray-300 mt-4">
                                Y no quiero perder lo que tenemos.
                            </p>
                        </div>

                        <div className="bg-linear-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-lg p-6 my-8 space-y-3">
                            <p className="text-gray-300">Gracias por estar.</p>
                            <p className="text-gray-300">Gracias por ser tú.</p>
                            <p className="text-gray-300">
                                Gracias por seguir conmigo incluso en mis días
                                más torpes.
                            </p>
                        </div>

                        <p className="text-2xl font-bold bg-linear-to-r from-pink-400 to-red-400 bg-clip-text text-transparent text-center mt-12">
                            Te amo con todo mi corazón.
                        </p>
                    </article>

                    {/* Footer */}
                    <div className="mt-16 text-center">
                        <div className="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full">
                            <span className="text-pink-400 text-sm">
                                ❤️ Con todo el amor
                            </span>
                        </div>
                    </div>
                </div>

                {/* Efecto de luz flotante */}
                <div className="fixed bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
                <div
                    className="fixed bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"
                    style={{ animationDelay: '2s' }}
                ></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4">
            {/* Fondo decorativo */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
            </div>

            {/* Contenedor de verificación */}
            <div className="relative z-10 max-w-md w-full bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
                        <span className="text-purple-400 text-sm font-semibold">
                            Acceso Restringido
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Mensaje Especial
                    </h1>
                    <p className="text-gray-400">
                        Ingresa tu número de control para continuar
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="control"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Número de Control
                        </label>
                        <input
                            id="control"
                            type="password"
                            value={numeroControl}
                            onChange={e => {
                                setNumeroControl(e.target.value)
                                setIntento(false)
                            }}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    handleVerificar()
                                }
                            }}
                            placeholder="Ingresa tu número de control"
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                        />
                    </div>

                    <button
                        onClick={handleVerificar}
                        className="w-full px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
                    >
                        Verificar
                    </button>

                    {intento && numeroControl !== NUMERO_AUTORIZADO && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">
                                ❌ Número de control incorrecto. Intenta de
                                nuevo.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Este contenido es privado y solo accesible con
                        autorización.
                    </p>
                </div>
            </div>

            {/* Efecto de luz flotante */}
            <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
            <div
                className="fixed bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"
                style={{ animationDelay: '2s' }}
            ></div>
        </div>
    )
}
