'use client'
import { useEffect, useRef } from 'react'
import './starfield.css'

interface Star {
    x: number
    y: number
    z: number
    prevX: number
    prevY: number
}

export const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const stars: Star[] = []
        const numStars = 800
        const speed = 0.5

        // Configurar el tamaño del canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        // Inicializar estrellas
        const initStars = () => {
            stars.length = 0
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * 2000,
                    y: (Math.random() - 0.5) * 2000,
                    z: Math.random() * 1000,
                    prevX: 0,
                    prevY: 0,
                })
            }
        }

        // Animar estrellas
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 10, 30, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            stars.forEach(star => {
                star.prevX = (star.x / star.z) * 100 + centerX
                star.prevY = (star.y / star.z) * 100 + centerY

                star.z -= speed
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * 2000
                    star.y = (Math.random() - 0.5) * 2000
                    star.z = 1000
                    star.prevX = (star.x / star.z) * 100 + centerX
                    star.prevY = (star.y / star.z) * 100 + centerY
                }

                const x = (star.x / star.z) * 100 + centerX
                const y = (star.y / star.z) * 100 + centerY

                const opacity = 1 - star.z / 1000
                const size = (1 - star.z / 1000) * 2

                // Dibujar la estela de la estrella
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.lineWidth = size
                ctx.beginPath()
                ctx.moveTo(star.prevX, star.prevY)
                ctx.lineTo(x, y)
                ctx.stroke()

                // Dibujar la estrella
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fill()

                // Agregar algunas estrellas de colores
                if (Math.random() > 0.98) {
                    const colors = ['#007bff', '#00bcd4', '#ff4081', '#ffeb3b']
                    const color =
                        colors[Math.floor(Math.random() * colors.length)]
                    ctx.fillStyle = `${color}${Math.floor(opacity * 255)
                        .toString(16)
                        .padStart(2, '0')}`
                    ctx.beginPath()
                    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
                    ctx.fill()
                }
            })

            requestAnimationFrame(animate)
        }

        // Inicializar
        resizeCanvas()
        initStars()
        animate()

        // Manejar redimensionamiento
        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="star-field"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    )
}
