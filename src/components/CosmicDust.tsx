'use client'
import { useEffect, useState } from 'react'

export const CosmicDust = () => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Pausar cuando la página no es visible
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden)
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        if (!isVisible) {
            return () => {
                document.removeEventListener(
                    'visibilitychange',
                    handleVisibilityChange,
                )
            }
        }

        const particles: HTMLDivElement[] = []
        const maxParticles = 15 // Reducido de 30 a 15

        // Crear partículas de polvo cósmico flotantes
        const createParticle = () => {
            // Limitar número máximo de partículas
            if (particles.length >= maxParticles) {
                const oldParticle = particles.shift()
                if (oldParticle?.parentNode) {
                    oldParticle.parentNode.removeChild(oldParticle)
                }
            }

            const particle = document.createElement('div')
            particle.className = 'cosmic-particle'
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.7 ? '#007bff' : '#ffffff'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                z-index: -1;
                pointer-events: none;
                will-change: transform;
                animation: float ${Math.random() * 25 + 15}s linear infinite;
                box-shadow: 0 0 ${Math.random() * 8 + 2}px currentColor;
            `

            document.body.appendChild(particle)
            particles.push(particle)

            // Remover la partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                    const index = particles.indexOf(particle)
                    if (index > -1) particles.splice(index, 1)
                }
            }, 40000) // Aumentado el tiempo de vida
        }

        // Crear partículas iniciales (menos cantidad)
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createParticle(), i * 200)
        }

        // Crear nuevas partículas periódicamente (menos frecuente)
        const interval = setInterval(createParticle, 2000) // De 800ms a 2000ms

        return () => {
            clearInterval(interval)
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
            // Limpiar partículas existentes
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                }
            })
            particles.length = 0
        }
    }, [isVisible])

    return null
}
