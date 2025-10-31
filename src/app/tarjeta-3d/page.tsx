'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Importación dinámica para evitar problemas de SSR con Three.js
const Tarjeta3DSimple = dynamic(() => import('@/components/Tarjeta3DSimple'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-white text-xl">Cargando experiencia 3D...</div>
        </div>
    ),
})

const Tarjeta3DPage: React.FC = () => {
    // Datos de ejemplo
    const usuarioEjemplo1 = {
        nombre: 'Juan Carlos',
        apellidos: 'Pérez González',
        nc: '22210456',
        semestre: 8,
    }

    const usuarioEjemplo2 = {
        nombre: 'Ana Sofia',
        apellidos: 'Martínez Cruz',
        nc: '22210789',
        semestre: 6,
    }

    const usuarioEjemplo3 = {
        nombre: 'Diego',
        apellidos: 'Sánchez Ruiz',
        nc: '22210321',
        semestre: 7,
    }

    const tallerEjemplo = {
        nombre: 'Desarrollo Web Avanzado con React',
        tallerista: 'Dr. María López',
        horario: 'HORARIO1',
        dia: 'JUEVES',
    }

    const tallerViernes = {
        nombre: 'Inteligencia Artificial y Machine Learning',
        tallerista: 'Ing. Carlos Rodríguez',
        horario: 'HORARIO2',
        dia: 'VIERNES',
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                    Tarjetas 3D Interactivas
                </h1>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Experiencia inmersiva con física realista y interacción
                    natural. Arrastra las tarjetas para explorar el futuro de la
                    identificación digital.
                </p>
            </div>

            {/* Información sobre la tecnología */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="bg-linear-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                        🚀 Tecnología React Three Fiber
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                            <div className="text-4xl mb-3">🎮</div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Física Realista
                            </h4>
                            <p className="text-gray-300 text-sm">
                                Motor de física Rapier con simulación de cuerda
                                y gravedad
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl mb-3">🖱️</div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Interacción Natural
                            </h4>
                            <p className="text-gray-300 text-sm">
                                Arrastra las tarjetas con el mouse para una
                                experiencia táctil
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl mb-3">✨</div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Renderizado Dinámico
                            </h4>
                            <p className="text-gray-300 text-sm">
                                Contenido personalizado renderizado en tiempo
                                real sobre texturas 3D
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center space-x-4 bg-blue-900/20 px-6 py-3 rounded-xl border border-blue-500/30">
                            <span className="text-cyan-400 font-semibold">
                                💡 Tecnologías:
                            </span>
                            <span className="text-gray-300">
                                React Three Fiber
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">
                                Rapier Physics
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">Three.js</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">WebGL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjeta 3D Principal */}
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-semibold text-cyan-300 mb-4">
                        🛠️ Tu Tarjeta Digital 3D
                    </h3>
                    <p className="text-gray-300 text-lg">
                        Interactúa con tu pase de acceso en una experiencia
                        completamente inmersiva
                    </p>
                </div>

                <Tarjeta3DSimple
                    usuario={usuarioEjemplo1}
                    taller={tallerEjemplo}
                    tipo="taller"
                />
            </div>

            {/* Instrucciones de uso */}
            <div className="mt-16 max-w-4xl mx-auto">
                <div className="bg-linear-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                        🎯 Cómo Interactuar con las Tarjetas 3D
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                🖱️ Controles:
                            </h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>
                                    • <strong>Clic y arrastra:</strong> Mueve la
                                    tarjeta libremente
                                </li>
                                <li>
                                    • <strong>Suelta:</strong> La física toma
                                    control automáticamente
                                </li>
                                <li>
                                    • <strong>Hover:</strong> El cursor cambia
                                    para indicar interactividad
                                </li>
                                <li>
                                    • <strong>Inercia:</strong> Las tarjetas se
                                    balancean naturalmente
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                ✨ Características:
                            </h4>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>
                                    • <strong>Cordón realista:</strong> Se curva
                                    siguiendo las leyes físicas
                                </li>
                                <li>
                                    • <strong>Material holográfico:</strong>{' '}
                                    Efectos iridiscentes y clearcoat
                                </li>
                                <li>
                                    • <strong>Contenido dinámico:</strong>{' '}
                                    Información actualizada en tiempo real
                                </li>
                                <li>
                                    • <strong>Iluminación avanzada:</strong>{' '}
                                    Múltiples fuentes de luz direccional
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-900/20 rounded-xl border border-purple-500/30">
                        <p className="text-center text-gray-300">
                            <span className="text-purple-400 font-semibold">
                                🎨 Innovación:
                            </span>
                            Primera implementación de tarjetas de identificación
                            con física 3D en tiempo real para eventos académicos
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer tecnológico */}
            <div className="mt-16 text-center">
                <p className="text-gray-400 text-sm">
                    Desarrollado con React Three Fiber, Rapier Physics Engine y
                    Three.js
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    Jornadas Tecnológicas 2025 - Sistemas Computacionales UTT
                </p>
            </div>
        </div>
    )
}

export default Tarjeta3DPage
