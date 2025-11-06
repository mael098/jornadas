'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from '@react-three/rapier'
import {
    Text,
    Center,
    Environment,
    Lightformer,
    PerspectiveCamera,
    RenderTexture,
} from '@react-three/drei'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'

// Extender R3F con MeshLine
extend({ MeshLineGeometry, MeshLineMaterial })

// Declaración de tipos para JSX
declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any
            meshLineMaterial: any
        }
    }
}

interface Tarjeta3DSimpleProps {
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
}

// Componente para renderizar la textura de la tarjeta
function TarjetaTexture({
    usuario,
    taller,
    videojuego,
    tipo,
}: Tarjeta3DSimpleProps) {
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

    const getTipoColor = () => {
        switch (tipo) {
            case 'taller':
                return '#00ffff'
            case 'videojuego':
                return '#ff00ff'
            case 'viernes':
                return '#00ff00'
            default:
                return '#ffffff'
        }
    }

    // Contenido estilo “conferencia” inspirado en el diseño adjunto
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

            {/* Fila superior: meta izquierda / ciudad derecha */}
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

            {/* Nombre grande */}
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

            {/* Título del taller o sección */}
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

            {/* Dirección y datos secundarios */}
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

            {/* Identificador del alumno */}
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

// Componente CON física de cuerda realista usando Rapier
function TarjetaConFisica(props: Tarjeta3DSimpleProps) {
    const band = useRef<any>(null)
    const fixed = useRef<any>(null)
    const j1 = useRef<any>(null)
    const j2 = useRef<any>(null)
    const j3 = useRef<any>(null)
    const card = useRef<any>(null)

    const vec = new THREE.Vector3()
    const ang = new THREE.Vector3()
    const rot = new THREE.Vector3()
    const dir = new THREE.Vector3()

    const { width, height } = useThree(state => state.size)
    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ]),
    )
    const [dragged, drag] = useState<THREE.Vector3 | false>(false)
    const [hovered, setHovered] = useState(false)

    // Joints de física con Rapier
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0],
    ])

    useFrame(state => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(
                state.camera,
            )
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))

            // Despertar todos los RigidBodies
            ;[card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())

            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            })
        }

        if (fixed.current && band.current) {
            // Calcular curva catmull-rom para el cordón
            curve.points[0].copy(j3.current.translation())
            curve.points[1].copy(j2.current.translation())
            curve.points[2].copy(j1.current.translation())
            curve.points[3].copy(fixed.current.translation())
            // Más puntos para una línea más suave
            band.current.geometry.setPoints(curve.getPoints(64))

            // Inclinar hacia la pantalla
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({
                x: ang.x,
                y: ang.y - rot.y * 0.25,
                z: ang.z,
            })
        }
    })

    // Cambiar cursor
    useEffect(() => {
        document.body.style.cursor =
            hovered ?
                dragged ? 'grabbing'
                :   'grab'
            :   'auto'
        return () => {
            document.body.style.cursor = 'auto'
        }
    }, [hovered, dragged])

    return (
        <>
            <group position={[0, 4, 0]}>
                {/* Punto fijo de anclaje */}
                <RigidBody
                    ref={fixed}
                    angularDamping={2}
                    linearDamping={2}
                    type="fixed"
                />

                {/* Joint 1 */}
                <RigidBody
                    position={[0.5, 0, 0]}
                    ref={j1}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>

                {/* Joint 2 */}
                <RigidBody
                    position={[1, 0, 0]}
                    ref={j2}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>

                {/* Joint 3 */}
                <RigidBody
                    position={[1.5, 0, 0]}
                    ref={j3}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>

                {/* Tarjeta física */}
                <RigidBody
                    position={[2, 0, 20]}
                    ref={card}
                    angularDamping={2}
                    linearDamping={2}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[0.8, 1.05, 0.01]} />

                    {/* Cara frontal de la tarjeta */}
                    <mesh
                        onPointerOver={() => setHovered(true)}
                        onPointerOut={() => setHovered(false)}
                        onPointerUp={e => {
                            const target = e.target as HTMLElement
                            target?.releasePointerCapture(e.pointerId)
                            drag(false)
                        }}
                        onPointerDown={e => {
                            const target = e.target as HTMLElement
                            target?.setPointerCapture(e.pointerId)
                            if (card.current) {
                                drag(
                                    new THREE.Vector3()
                                        .copy(e.point)
                                        .sub(
                                            vec.copy(
                                                card.current.translation(),
                                            ),
                                        ),
                                )
                            }
                        }}
                    >
                        <boxGeometry args={[1.6, 2.25, 0.05]} />
                        <meshStandardMaterial
                            roughness={0.3}
                            metalness={0.2}
                            emissive="#001133"
                            emissiveIntensity={0.1}
                        >
                            <RenderTexture
                                attach="map"
                                // Aumenta resolución y respeta relación 1.6 x 2.25 (≈1.40625)
                                width={1024}
                                height={1440}
                            >
                                <TarjetaTexture {...props} />
                            </RenderTexture>
                        </meshStandardMaterial>
                    </mesh>

                    {/* Cara trasera */}
                    <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
                        <boxGeometry args={[1.58, 2.23, 0.02]} />
                        <meshStandardMaterial
                            color="#1a1a2e"
                            roughness={0.4}
                            metalness={0.3}
                            emissive="#000811"
                            emissiveIntensity={0.1}
                        />
                    </mesh>

                    {/* Brillo de hover */}
                    {hovered && (
                        <mesh position={[0, 0, 0.03]}>
                            <boxGeometry args={[1.65, 2.3, 0.01]} />
                            <meshBasicMaterial
                                color="#00ffff"
                                transparent
                                opacity={0.3}
                                // blendColor="#1c4d9b"
                            />
                        </mesh>
                    )}
                </RigidBody>
            </group>

            {/* Cordón renderizado con MeshLine */}
            <mesh ref={band}>
                {/* @ts-ignore - MeshLine extended types */}
                <meshLineGeometry />
                {/* @ts-ignore - MeshLine extended types */}
                <meshLineMaterial
                    transparent
                    opacity={0.6}
                    color="#000000"
                    depthTest={true}
                    resolution={[width, height]}
                    lineWidth={2}
                />
            </mesh>
        </>
    )
}

// Componente principal con manejo de contexto WebGL
export default function Tarjeta3DSimple(props: Tarjeta3DSimpleProps) {
    const [webglLost, setWebglLost] = useState(false)
    const [recoveryAttempts, setRecoveryAttempts] = useState(0)
    const recoveryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleWebGLContextLost = useRef((event: Event) => {
        event.preventDefault()
        console.warn('WebGL context lost, attempting recovery...')
        setWebglLost(true)
        setRecoveryAttempts(prev => prev + 1)

        // Intentar recuperación automática después de 3 segundos
        recoveryTimeoutRef.current = setTimeout(() => {
            console.log('Attempting automatic WebGL context recovery...')
            setWebglLost(false)
        }, 3000)
    })

    const handleWebGLContextRestored = useRef(() => {
        console.log('WebGL context restored')
        if (recoveryTimeoutRef.current) {
            clearTimeout(recoveryTimeoutRef.current)
            recoveryTimeoutRef.current = null
        }
        setWebglLost(false)
        setRecoveryAttempts(0)
    })

    useEffect(() => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            canvas.addEventListener(
                'webglcontextlost',
                handleWebGLContextLost.current,
            )
            canvas.addEventListener(
                'webglcontextrestored',
                handleWebGLContextRestored.current,
            )

            return () => {
                canvas.removeEventListener(
                    'webglcontextlost',
                    handleWebGLContextLost.current,
                )
                canvas.removeEventListener(
                    'webglcontextrestored',
                    handleWebGLContextRestored.current,
                )
                if (recoveryTimeoutRef.current) {
                    clearTimeout(recoveryTimeoutRef.current)
                }
            }
        }
    }, [])

    // Cleanup en desmontaje del componente
    useEffect(() => {
        return () => {
            if (recoveryTimeoutRef.current) {
                clearTimeout(recoveryTimeoutRef.current)
            }
        }
    }, [])

    if (webglLost) {
        return (
            <div className="w-full h-[600px] rounded-xl overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 relative flex items-center justify-center">
                <div className="text-center text-white animate-pulse">
                    <div className="text-5xl mb-4 animate-spin">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">
                        Recuperando visualización 3D...
                    </h3>
                    <p className="text-gray-300 mb-2">
                        Restaurando el contexto WebGL
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                        Intento #{recoveryAttempts} - Recuperación automática en
                        progreso
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                console.log('Manual recovery attempt...')
                                setWebglLost(false)
                            }}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            ⚡ Intentar ahora
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                        >
                            🔄 Recargar página
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-[600px] rounded-xl overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 relative">
            <Canvas
                // Mejora nitidez en pantallas HiDPI sin exceder en móviles
                dpr={[1, 2]}
                camera={{
                    position: [0, 0, 13],
                    fov: 25,
                    near: 0.1,
                    far: 1000,
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true,
                    failIfMajorPerformanceCaveat: false,
                    powerPreference: 'default',
                }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener(
                        'webglcontextlost',
                        handleWebGLContextLost.current,
                    )
                    gl.domElement.addEventListener(
                        'webglcontextrestored',
                        handleWebGLContextRestored.current,
                    )
                }}
            >
                {/* Iluminación */}
                <ambientLight intensity={2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-5, 5, 5]} intensity={1} />

                {/* Física con gravedad y tarjeta con cuerda */}
                <Physics gravity={[0, -40, 0]} timeStep={1 / 60} interpolate>
                    <TarjetaConFisica {...props} />
                </Physics>
            </Canvas>

            {/* Instrucciones */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white/70 text-sm">
                🎯 Arrastra la tarjeta | 🎮 Física de cuerda realista con Rapier
            </div>
        </div>
    )
}
