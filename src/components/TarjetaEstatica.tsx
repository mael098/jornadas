'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import {
    Text,
    Center,
    PerspectiveCamera,
    RenderTexture,
} from '@react-three/drei'
import * as THREE from 'three'

interface TarjetaEstaticaProps {
    usuario: {
        nombre: string
        apellidos: string
        nc: string
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
    onCapture?: (dataUrl: string) => void
}

function TarjetaTexture({
    usuario,
    taller,
    videojuego,
    tipo,
}: TarjetaEstaticaProps) {
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

    const metaLeft = (() => {
        if (tipo === 'taller' && taller)
            return `${taller.dia} • ${formatHorario(taller.horario)}`
        if (tipo === 'videojuego' && videojuego)
            return `TORNEO • ${videojuego.toUpperCase()}`
        return 'JORNADAS 2025'
    })()

    const locationRight = 'ALTAMIRA'

    return (
        <>
            <PerspectiveCamera
                makeDefault
                manual
                aspect={1}
                position={[0, 0, 2]}
            />
            <ambientLight intensity={2} />

            {/* Fondo */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[1.6, 2.25]} />
                <meshBasicMaterial color="#0b0d12" />
            </mesh>

            {/* Fila superior */}
            <Text
                position={[-0.75, 1.0, 0.01]}
                fontSize={0.035}
                color="#9aa0a6"
                anchorX="left"
                anchorY="top"
            >
                {metaLeft}
            </Text>
            <Text
                position={[0.75, 1.0, 0.01]}
                fontSize={0.035}
                color="#9aa0a6"
                anchorX="right"
                anchorY="top"
            >
                {locationRight}
            </Text>

            {/* Nombre */}
            <Text
                position={[-0.75, 0.78, 0.01]}
                fontSize={0.14}
                color="#e6e6e6"
                anchorX="left"
                anchorY="top"
                maxWidth={1.4}
            >
                {usuario.nombre}
            </Text>
            <Text
                position={[-0.75, 0.62, 0.01]}
                fontSize={0.14}
                color="#e6e6e6"
                anchorX="left"
                anchorY="top"
                maxWidth={1.4}
            >
                {usuario.apellidos}
            </Text>

            {/* Rol */}
            <Text
                position={[-0.75, 0.5, 0.01]}
                fontSize={0.045}
                color="#9aa0a6"
                anchorX="left"
                anchorY="top"
                letterSpacing={0.02}
            >
                STUDENT
            </Text>

            {/* Separador */}
            <mesh position={[0, 0.12, 0.01]}>
                <boxGeometry args={[1.2, 0.005, 0.005]} />
                <meshBasicMaterial color="#222831" />
            </mesh>

            {/* Título */}
            <Text
                position={[-0.75, 0.05, 0.01]}
                fontSize={0.065}
                color="#ffffff"
                anchorX="left"
                anchorY="top"
                maxWidth={1.4}
            >
                {tipo === 'taller' && taller ?
                    taller.nombre.toUpperCase()
                :   'JORNADAS TECNOLÓGICAS'}
            </Text>

            {/* Dirección */}
            <Text
                position={[-0.75, -0.08, 0.01]}
                fontSize={0.035}
                color="#9aa0a6"
                anchorX="left"
                anchorY="top"
                maxWidth={1.4}
            >
                INSTITUTO TECNOLÓGICO DE ALTAMIRA
            </Text>
            <Text
                position={[-0.75, -0.16, 0.01]}
                fontSize={0.032}
                color="#6b7280"
                anchorX="left"
                anchorY="top"
            >
                AV REFORMA 476
            </Text>

            {/* NC */}
            <Text
                position={[-0.75, -0.35, 0.01]}
                fontSize={0.032}
                color="#6b7280"
                anchorX="left"
                anchorY="top"
            >
                NC: {usuario.nc} • {usuario.semestre}° SEMESTRE
            </Text>
        </>
    )
}

export default function TarjetaEstatica(props: TarjetaEstaticaProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        // Esperar a que el canvas esté renderizado
        const timer = setTimeout(() => {
            if (canvasRef.current && props.onCapture) {
                try {
                    const dataUrl = canvasRef.current.toDataURL('image/png')
                    props.onCapture(dataUrl)
                } catch (error) {
                    console.error('Error capturando canvas:', error)
                }
            }
        }, 2000) // 2 segundos para asegurar que renderice

        return () => clearTimeout(timer)
    }, [props])

    return (
        <div className="w-[800px] h-[1125px] relative">
            <Canvas
                ref={canvasRef}
                dpr={2}
                camera={{
                    position: [0, 0, 2],
                    fov: 50,
                }}
                gl={{
                    preserveDrawingBuffer: true,
                    antialias: true,
                }}
            >
                <ambientLight intensity={2} />

                <mesh>
                    <boxGeometry args={[1.6, 2.25, 0.05]} />
                    <meshStandardMaterial
                        roughness={0.3}
                        metalness={0.2}
                        emissive="#001133"
                        emissiveIntensity={0.1}
                    >
                        <RenderTexture attach="map" width={1024} height={1440}>
                            <TarjetaTexture {...props} />
                        </RenderTexture>
                    </meshStandardMaterial>
                </mesh>
            </Canvas>
        </div>
    )
}
