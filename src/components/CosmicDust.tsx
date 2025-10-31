'use client'
import { useEffect } from 'react'

export const CosmicDust = () => {
    useEffect(() => {
        // Crear partículas de polvo cósmico flotantes
        const createParticle = () => {
            const particle = document.createElement('div')
            particle.className = 'cosmic-particle'
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.7 ? '#007bff' : '#ffffff'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.6 + 0.2};
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                z-index: -1;
                pointer-events: none;
                animation: float ${Math.random() * 20 + 10}s linear infinite;
                box-shadow: 0 0 ${Math.random() * 10 + 2}px currentColor;
            `

            document.body.appendChild(particle)

            // Remover la partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                }
            }, 30000)
        }

        // Crear partículas iniciales
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createParticle(), i * 100)
        }

        // Crear nuevas partículas periódicamente
        const interval = setInterval(createParticle, 800)

        return () => {
            clearInterval(interval)
            // Limpiar partículas existentes
            const particles = document.querySelectorAll('.cosmic-particle')
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                }
            })
        }
    }, [])

    return null
}
