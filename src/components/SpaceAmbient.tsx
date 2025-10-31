'use client'
import { useEffect, useRef } from 'react'

export const SpaceAmbient = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Crear constelaciones
        const createConstellation = () => {
            const constellation = document.createElement('div')
            constellation.className = 'constellation'
            constellation.style.cssText = `
                position: absolute;
                width: ${Math.random() * 200 + 100}px;
                height: ${Math.random() * 200 + 100}px;
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: constellationTwinkle ${Math.random() * 10 + 5}s ease-in-out infinite alternate;
            `

            // Agregar estrellas a la constelación
            for (let i = 0; i < Math.random() * 5 + 3; i++) {
                const star = document.createElement('div')
                star.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #ffffff;
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    box-shadow: 0 0 ${Math.random() * 6 + 2}px #ffffff;
                    animation: starPulse ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
                `
                constellation.appendChild(star)
            }

            container.appendChild(constellation)
        }

        // Crear varias constelaciones
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createConstellation(), i * 500)
        }

        return () => {
            if (container) {
                container.innerHTML = ''
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                pointerEvents: 'none',
            }}
        />
    )
}
