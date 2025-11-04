'use client'

import React, { useState } from 'react'
import './tarjeta-digital.css'

interface TarjetaDigitalProps {
    usuario: {
        nombre: string
        apellidos: string
        nc: string
        email: string
        semestre: number
    }
    taller?: {
        nombre: string
        tallerista: string
        horario: string
        dia: string
    }
    videojuego?: string
    tipo: 'taller' | 'videojuego' | 'viernes'
}

const TarjetaDigital: React.FC<TarjetaDigitalProps> = ({
    usuario,
    taller,
    videojuego,
    tipo,
}) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const formatHorario = (horario: string) => {
        switch (horario) {
            case 'HORARIO1':
                return '9:00 - 10:30 AM'
            case 'HORARIO2':
                return '10:30 - 12:00 PM'
            case 'HORARIO3':
                return '1:30 - 3:00 PM'
            default:
                return horario
        }
    }

    const formatDia = (dia: string) => {
        switch (dia) {
            case 'JUEVES':
                return 'Jueves 25 de Noviembre'
            case 'VIERNES':
                return 'Viernes 26 de Noviembre'
            default:
                return dia
        }
    }

    const getTipoIcon = () => {
        switch (tipo) {
            case 'taller':
                return '🛠️'
            case 'videojuego':
                return '🎮'
            case 'viernes':
                return '📚'
            default:
                return '⭐'
        }
    }

    const getTipoTitle = () => {
        switch (tipo) {
            case 'taller':
                return 'PASE DE ACCESO - TALLER'
            case 'videojuego':
                return 'PASE DE ACCESO - VIDEOJUEGO'
            case 'viernes':
                return 'PASE DE ACCESO - VIERNES'
            default:
                return 'PASE DE ACCESO'
        }
    }

    return (
        <div className={`tarjeta-container ${isFlipped ? 'flipped' : ''}`}>
            <div className="tarjeta-card">
                {/* Lado Frontal */}
                <div className="tarjeta-front">
                    <div className="tarjeta-header">
                        <div className="tarjeta-logo">
                            <span className="logo-icon">{getTipoIcon()}</span>
                            <div className="logo-text">
                                <h3>JORNADAS TECNOLÓGICAS</h3>
                                <p>SISTEMAS COMPUTACIONALES</p>
                            </div>
                        </div>
                        <div className="tarjeta-tipo">{getTipoTitle()}</div>
                    </div>

                    <div className="tarjeta-body">
                        <div className="usuario-info">
                            <div className="avatar">
                                <span>
                                    {usuario.nombre.charAt(0)}
                                    {usuario.apellidos.charAt(0)}
                                </span>
                            </div>
                            <div className="usuario-datos">
                                <h2>
                                    {usuario.nombre} {usuario.apellidos}
                                </h2>
                                <p className="nc">NC: {usuario.nc}</p>
                                <p className="semestre">
                                    {usuario.semestre}° Semestre
                                </p>
                            </div>
                        </div>

                        {tipo === 'taller' && taller && (
                            <div className="evento-info">
                                <h3>{taller.nombre}</h3>
                                <div className="detalles">
                                    <p>
                                        <span className="icon">👨‍💼</span>{' '}
                                        Instructor: {taller.tallerista}
                                    </p>
                                    <p>
                                        <span className="icon">📅</span>{' '}
                                        {formatDia(taller.dia)}
                                    </p>
                                    <p>
                                        <span className="icon">⏰</span>{' '}
                                        {formatHorario(taller.horario)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {tipo === 'videojuego' && videojuego && (
                            <div className="evento-info">
                                <h3>Torneo de Videojuegos</h3>
                                <div className="detalles">
                                    <p>
                                        <span className="icon">🎮</span> Juego:{' '}
                                        {videojuego}
                                    </p>
                                    <p>
                                        <span className="icon">📅</span> Viernes
                                        26 de Noviembre
                                    </p>
                                    <p>
                                        <span className="icon">⏰</span> 2:00 -
                                        4:00 PM
                                    </p>
                                </div>
                            </div>
                        )}

                        {tipo === 'viernes' && taller && (
                            <div className="evento-info">
                                <h3>{taller.nombre}</h3>
                                <div className="detalles">
                                    <p>
                                        <span className="icon">👨‍💼</span>{' '}
                                        Instructor: {taller.tallerista}
                                    </p>
                                    <p>
                                        <span className="icon">📅</span> Viernes
                                        26 de Noviembre
                                    </p>
                                    <p>
                                        <span className="icon">⏰</span> Horario
                                        Especial
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="tarjeta-footer">
                        <div className="qr-placeholder">
                            <div className="qr-code">
                                <span>QR</span>
                            </div>
                            <p>Código de Acceso</p>
                        </div>
                        <div className="tech-pattern"></div>
                    </div>

                    <button
                        className="flip-button"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        Ver Detalles →
                    </button>
                </div>

                {/* Lado Trasero */}
                <div className="tarjeta-back">
                    <div className="back-header">
                        <h3>INFORMACIÓN ADICIONAL</h3>
                    </div>

                    <div className="back-content">
                        <div className="info-section">
                            <h4>📧 Contacto</h4>
                            <p>{usuario.email}</p>
                        </div>

                        <div className="info-section">
                            <h4>📍 Ubicación del Evento</h4>
                            <p>Universidad Tecnológica de Tijuana</p>
                            <p>Edificio de Sistemas Computacionales</p>
                        </div>

                        <div className="info-section">
                            <h4>📋 Instrucciones</h4>
                            <ul>
                                <li>
                                    Presenta esta tarjeta digital al ingresar
                                </li>
                                <li>Llega 15 minutos antes del evento</li>
                                <li>Mantén tu dispositivo cargado</li>
                                <li>Respeta los horarios establecidos</li>
                            </ul>
                        </div>

                        <div className="info-section">
                            <h4>⚠️ Importante</h4>
                            <p>
                                Esta tarjeta es personal e intransferible. El
                                acceso está sujeto a disponibilidad de cupo.
                            </p>
                        </div>
                    </div>

                    <button
                        className="flip-button back-button"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        ← Volver
                    </button>
                </div>
            </div>

            {/* Efectos de partículas */}
            <div className="particle-effects">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                ))}
            </div>
        </div>
    )
}

export default TarjetaDigital
