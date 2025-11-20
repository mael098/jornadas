import React from 'react'
import TarjetaDigital from '@/components/TarjetaDigital'

const TarjetaPage: React.FC = () => {
    // Datos de ejemplo
    const usuarioEjemplo = {
        nombre: 'Juan Carlos',
        apellidos: 'Pérez González',
        nc: '22210456',
        email: 'juan.perez@estudiante.utt.edu.mx',
        semestre: 8,
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
                <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                    Tarjetas Digitales
                </h1>
                <p className="text-gray-300 text-lg">
                    Jornadas Tecnológicas 2025 - Sistema de Identificación
                    Digital
                </p>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Tarjeta de Taller Regular */}
                <div>
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4 text-center">
                        Pase para Taller - Jueves
                    </h3>
                    <TarjetaDigital
                        usuario={usuarioEjemplo}
                        taller={tallerEjemplo}
                        tipo="taller"
                    />
                </div>

                {/* Tarjeta de Videojuego */}
                <div>
                    <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">
                        Pase para Videojuego
                    </h3>
                    <TarjetaDigital
                        usuario={{
                            ...usuarioEjemplo,
                            nombre: 'Ana Sofia',
                            apellidos: 'Martínez Cruz',
                            nc: '22210789',
                        }}
                        videojuego="League of Legends"
                        tipo="videojuego"
                    />
                </div>

                {/* Tarjeta de Viernes */}
                <div>
                    <h3 className="text-xl font-semibold text-green-300 mb-4 text-center">
                        Pase para Viernes
                    </h3>
                    <TarjetaDigital
                        usuario={{
                            ...usuarioEjemplo,
                            nombre: 'Diego',
                            apellidos: 'Sánchez Ruiz',
                            nc: '22210321',
                        }}
                        taller={tallerViernes}
                        tipo="taller"
                    />
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-16 max-w-4xl mx-auto">
                <div className="bg-linear-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                        Características de las Tarjetas Digitales
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                ✨ Funcionalidades:
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Flip 3D interactivo</li>
                                <li>• Información completa del evento</li>
                                <li>• Código QR para verificación</li>
                                <li>• Diseño futurista responsive</li>
                                <li>• Efectos de partículas animadas</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                🎨 Tipos de Pase:
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    •{' '}
                                    <span className="text-cyan-400">
                                        Talleres Jueves
                                    </span>{' '}
                                    - 3 horarios disponibles
                                </li>
                                <li>
                                    •{' '}
                                    <span className="text-purple-400">
                                        Videojuegos
                                    </span>{' '}
                                    - Torneos especiales
                                </li>
                                <li>
                                    •{' '}
                                    <span className="text-green-400">
                                        Talleres Viernes
                                    </span>{' '}
                                    - Horarios especiales
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
                        <p className="text-center text-gray-300">
                            <span className="text-cyan-400 font-semibold">
                                💡 Tip:
                            </span>
                            Haz clic en "Ver Detalles" para voltear la tarjeta y
                            ver información adicional
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TarjetaPage
