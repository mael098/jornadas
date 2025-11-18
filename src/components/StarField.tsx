'use client'
import { useMemo, useState, useEffect } from 'react'
import './starfield.css'

interface StarData {
    x: number
    y: number
    size: number
    opacity: number
    delay: number
    duration: number
}

export const StarField = () => {
    const [mounted, setMounted] = useState(false)

    // Solo montar en el cliente para evitar hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Generar estrellas una sola vez con useMemo
    const stars = useMemo<StarData[]>(() => {
        const starArray: StarData[] = []
        const numStars = 150 // Mucho menos que 300 porque son estáticas

        for (let i = 0; i < numStars; i++) {
            starArray.push({
                x: Math.random() * 100, // Porcentaje
                y: Math.random() * 100, // Porcentaje
                size: Math.random() * 2 + 0.5, // 0.5px a 2.5px
                opacity: Math.random() * 0.5 + 0.3, // 0.3 a 0.8
                delay: Math.random() * 3, // 0 a 3 segundos
                duration: Math.random() * 2 + 2, // 2 a 4 segundos
            })
        }

        return starArray
    }, [mounted])

    // No renderizar nada hasta que esté montado en el cliente
    if (!mounted) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    background:
                        'radial-gradient(ellipse at bottom, #0d1d31 0%, #000a1a 100%)',
                }}
            />
        )
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                overflow: 'hidden',
                background:
                    'radial-gradient(ellipse at bottom, #0d1d31 0%, #000a1a 100%)',
            }}
        >
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="css-star"
                    style={{
                        position: 'absolute',
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: star.opacity,
                        animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                        willChange: 'opacity',
                    }}
                />
            ))}
        </div>
    )
}
