'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
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
    }
    videojuego?: string
    tipo: 'taller' | 'videojuego'
}

// Crear texture pre-renderizada para el fondo (compatible con móvil)
function createBackgroundTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(0.5, '#16213e')
    gradient.addColorStop(1, '#0f3460')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    return new THREE.CanvasTexture(canvas)
}

// Crear texture para separador (compatible con móvil)
function createSeparatorTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 16
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 256, 0)
    gradient.addColorStop(0, '#00000000')
    gradient.addColorStop(0.5, '#00ffff')
    gradient.addColorStop(1, '#00000000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 16)
    return new THREE.CanvasTexture(canvas)
}

// Componente para renderizar la textura de la tarjeta
function TarjetaTexture({
    usuario,
    taller,
    videojuego,
    tipo,
}: Tarjeta3DSimpleProps) {
    const getTipoColor = () => {
        switch (tipo) {
            case 'taller':
                return '#00ffff'
            case 'videojuego':
                return '#ff00ff'
            default:
                return '#ffffff'
        }
    }

    // Contenido estilo "conferencia" inspirado en el diseño adjunto
    const metaLeft = (() => {
        if (tipo === 'taller' && taller) return `VIERNES 26 • ${taller.horario}`
        if (tipo === 'videojuego' && videojuego)
            return `TORNEO • ${videojuego.toUpperCase()}`
        return 'JORNADAS 2025'
    })()

    const locationRight = 'ALTAMIRA'
    const [bgTexture] = useState(() => createBackgroundTexture())
    const [sepTexture] = useState(() => createSeparatorTexture())

    return (
        <>
            <PerspectiveCamera
                makeDefault
                manual
                aspect={1}
                position={[0, 0, 1.8]}
            />
            <ambientLight intensity={2.5} />
            <pointLight position={[0, 0, 2]} intensity={1} color="#00ffff" />

            {/* Fondo con gradiente decorativo - usando textura pre-renderizada */}
            <mesh position={[0, 0, -0.005]}>
                <planeGeometry args={[1.75, 2.48]} />
                <meshBasicMaterial map={bgTexture} />
            </mesh>

            {/* Elementos decorativos - círculos de fondo */}
            <mesh position={[-0.6, 0.9, -0.003]}>
                <circleGeometry args={[0.15, 32]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
            </mesh>
            <mesh position={[0.6, -0.8, -0.003]}>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color="#ff00ff" transparent opacity={0.1} />
            </mesh>

            {/* Líneas decorativas superiores */}
            <mesh position={[0, 1.05, 0.005]}>
                <boxGeometry args={[1.7, 0.003, 0.001]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
            </mesh>

            {/* Fila superior: meta izquierda / ciudad derecha */}
            <Text
                position={[-0.65, 1.08, 0.01]}
                fontSize={0.042}
                color="#00d9ff"
                anchorX="left"
                anchorY="top"
                letterSpacing={0.02}
            >
                {metaLeft}
            </Text>
            <Text
                position={[0.65, 1.08, 0.01]}
                fontSize={0.042}
                color="#ffffff"
                anchorX="right"
                anchorY="top"
                letterSpacing={0.05}
            >
                {locationRight}
            </Text>

            {/* Badge decorativo */}
            <mesh position={[-0.7, 0.85, 0.008]}>
                <boxGeometry args={[0.08, 0.08, 0.001]} />
                <meshBasicMaterial color={getTipoColor()} />
            </mesh>

            {/* Nombre grande con efecto de brillo */}
            <Text
                position={[0, 0.75, 0.01]}
                fontSize={0.19}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                maxWidth={1.6}
                letterSpacing={0.02}
                outlineWidth={0.008}
                outlineColor="#00ffff"
            >
                {usuario.nombre}
            </Text>
            <Text
                position={[0, 0.52, 0.01]}
                fontSize={0.19}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                maxWidth={1.6}
                letterSpacing={0.02}
                outlineWidth={0.008}
                outlineColor="#00ffff"
            >
                {usuario.apellidos}
            </Text>

            {/* Efecto de resplandor detrás del nombre */}
            <mesh position={[0, 0.63, 0.005]}>
                <planeGeometry args={[1.5, 0.4]} />
                <meshBasicMaterial
                    color={getTipoColor()}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Rol con fondo */}
            <mesh position={[0, 0.16, 0.008]}>
                <planeGeometry args={[0.7, 0.12]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
            </mesh>
            <Text
                position={[0, 0.16, 0.01]}
                fontSize={0.09}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.08}
            >
                STUDENT
            </Text>

            {/* Separador con gradiente - usando textura pre-renderizada */}
            <mesh position={[0, 0.0, 0.01]}>
                <boxGeometry args={[1.3, 0.015, 0.005]} />
                <meshBasicMaterial map={sepTexture} />
            </mesh>
            {/* Línea de acento superior */}
            <mesh position={[0, 0.008, 0.011]}>
                <boxGeometry args={[0.4, 0.003, 0.001]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>

            {/* Título del taller o sección con fondo */}
            <mesh position={[0, -0.22, 0.008]}>
                <planeGeometry args={[1.65, 0.28]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.3} />
            </mesh>
            <Text
                position={[0, -0.14, 0.01]}
                fontSize={0.08}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                maxWidth={1.58}
                letterSpacing={0.015}
                lineHeight={1.15}
            >
                {tipo === 'taller' && taller ?
                    taller.nombre.toUpperCase()
                :   'JORNADAS TECNOLÓGICAS'}
            </Text>

            {/* Dirección y datos secundarios */}
            <Text
                position={[0, -0.42, 0.01]}
                fontSize={0.068}
                color="#b8c5d6"
                anchorX="center"
                anchorY="top"
                maxWidth={1.6}
                letterSpacing={0.025}
            >
                INSTITUTO TECNOLÓGICO DE ALTAMIRA
            </Text>

            {/* Iconos decorativos en las esquinas inferiores */}
            <mesh position={[-0.75, -0.58, 0.009]}>
                <circleGeometry args={[0.03, 16]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>
            <mesh position={[0.75, -0.58, 0.009]}>
                <circleGeometry args={[0.03, 16]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>

            {/* Identificador del alumno con borde */}
            <mesh position={[0, -0.72, 0.008]}>
                <planeGeometry args={[1.4, 0.11]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
            </mesh>
            <mesh position={[0, -0.72, 0.009]}>
                <boxGeometry args={[1.38, 0.001, 0.001]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
            </mesh>
            <Text
                position={[0, -0.69, 0.01]}
                fontSize={0.062}
                color="#9ba8b8"
                anchorX="center"
                anchorY="top"
                letterSpacing={0.035}
            >
                NC: {usuario.nc} • {usuario.semestre}° SEMESTRE
            </Text>

            {/* Línea inferior decorativa */}
            <mesh position={[0, -1.02, 0.01]}>
                <boxGeometry args={[1.5, 0.003, 0.001]} />
                <meshBasicMaterial
                    color={getTipoColor()}
                    transparent
                    opacity={0.6}
                />
            </mesh>
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

    // Sensor de movimiento del dispositivo
    useEffect(() => {
        let lastShakeTime = 0
        const shakeThreshold = 15 // Sensibilidad del shake
        const shakeDelay = 500 // Tiempo mínimo entre shakes (ms)

        const handleDeviceMotion = (event: DeviceMotionEvent) => {
            const acceleration = event.accelerationIncludingGravity
            if (!acceleration) return

            const { x, y, z } = acceleration
            const now = Date.now()

            // Detectar movimiento brusco en cualquier eje
            const totalAcceleration =
                Math.abs(x || 0) + Math.abs(y || 0) + Math.abs(z || 0)

            if (
                totalAcceleration > shakeThreshold &&
                now - lastShakeTime > shakeDelay
            ) {
                lastShakeTime = now

                // Aplicar fuerza a la tarjeta
                if (card.current) {
                    card.current.wakeUp()
                    card.current.applyImpulse(
                        {
                            x: (Math.random() - 0.5) * 8,
                            y: Math.random() * 3,
                            z: (Math.random() - 0.5) * 4,
                        },
                        true,
                    )
                }

                // Sacudir también las articulaciones
                ;[j1, j2, j3].forEach(joint => {
                    if (joint.current) {
                        joint.current.wakeUp()
                        joint.current.applyImpulse(
                            {
                                x: (Math.random() - 0.5) * 4,
                                y: Math.random() * 2,
                                z: (Math.random() - 0.5) * 2,
                            },
                            true,
                        )
                    }
                })
            }
        }

        // Pedir permiso en iOS 13+
        const requestPermission = async () => {
            if (
                typeof DeviceMotionEvent !== 'undefined' &&
                typeof (DeviceMotionEvent as any).requestPermission ===
                    'function'
            ) {
                try {
                    const permission = await (
                        DeviceMotionEvent as any
                    ).requestPermission()
                    if (permission === 'granted') {
                        window.addEventListener(
                            'devicemotion',
                            handleDeviceMotion,
                        )
                    }
                } catch (error) {
                    console.error(
                        'Error requesting device motion permission:',
                        error,
                    )
                }
            } else {
                // Android y navegadores que no requieren permiso
                window.addEventListener('devicemotion', handleDeviceMotion)
            }
        }

        requestPermission()

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion)
        }
    }, [])

    // Joints de física con Rapier
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 2.175, 0], // Ajustado al nuevo tamaño: 3.375/2 + 0.5 = 2.175
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

    // Memoizar la textura para evitar crear una nueva en cada render
    const cardTexture = useMemo(
        () => createCardTexture(props.usuario, props.taller, props.tipo),
        [props.usuario, props.taller, props.tipo],
    )

    function createCardTexture(
        usuario: {
            nombre: string
            apellidos: string
            nc: string
            semestre: number
        },
        taller:
            | { nombre: string; tallerista: string; horario: string }
            | undefined,
        tipo: string,
    ): THREE.CanvasTexture {
        // Crear canvas con resolución adecuada para la tarjeta
        const canvas = document.createElement('canvas')
        const scale = 2 // Para mejor resolución
        canvas.width = 512 * scale
        canvas.height = 724 * scale
        const ctx = canvas.getContext('2d')!

        // Fondo con gradiente
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, '#1a1a2e')
        gradient.addColorStop(0.5, '#16213e')
        gradient.addColorStop(1, '#0f3460')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Función helper para dibujar texto centrado
        const drawCenteredText = (
            text: string,
            y: number,
            fontSize: number,
            color: string = '#ffffff',
            fontWeight: string = 'normal',
        ) => {
            ctx.font = `${fontWeight} ${fontSize}px 'Inter', sans-serif`
            ctx.fillStyle = color
            ctx.textAlign = 'center'
            ctx.textBaseline = 'top'
            ctx.fillText(text, canvas.width / 2, y)
        }

        // Meta izquierda / Ubicación derecha
        const metaLeft = (() => {
            if (tipo === 'taller' && taller)
                return `VIERNES 26 • ${taller.horario}`
            if (tipo === 'videojuego') return 'TORNEO'
            return 'JORNADAS 2025'
        })()

        ctx.font = `12px 'Inter', sans-serif`
        ctx.fillStyle = '#00d9ff'
        ctx.textAlign = 'left'
        ctx.fillText(metaLeft, 40, 40)

        ctx.font = `18px 'Inter', sans-serif`
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'right'
        ctx.fillText('ALTAMIRA', canvas.width - 40, 35)

        // Nombre (grande)
        drawCenteredText(
            usuario.nombre.toUpperCase(),
            120,
            80,
            '#ffffff',
            'bold',
        )

        // Apellidos
        drawCenteredText(
            usuario.apellidos.toUpperCase(),
            210,
            60,
            '#ffffff',
            'bold',
        )

        // STUDENT
        drawCenteredText(
            usuario.semestre ? `STUDENT` : 'GUEST',
            380,
            50,
            '#00ffff',
            'bold',
        )

        // Título del taller
        if (tipo === 'taller' && taller) {
            drawCenteredText(
                taller.nombre.toUpperCase(),
                480,
                34,
                '#ffffff',
                'normal',
            )
        } else {
            drawCenteredText(
                'JORNADAS TECNOLÓGICAS',
                480,
                34,
                '#ffffff',
                'normal',
            )
        }

        // Instituto
        drawCenteredText(
            'INSTITUTO TECNOLÓGICO DE ALTAMIRA',
            580,
            30,
            '#b8c5d6',
            'normal',
        )

        // NC y semestre
        drawCenteredText(
            `NC: ${usuario.nc} • ${usuario.semestre}° SEMESTRE`,
            680,
            40,
            '#9ba8b8',
            'normal',
        )

        return new THREE.CanvasTexture(canvas)
    }

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
                    <CuboidCollider args={[0.9, 1.18, 0.01]} />

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
                        <boxGeometry args={[1.8, 2.53, 0.05]} />
                        <meshStandardMaterial
                            roughness={0.15}
                            metalness={0.2}
                            emissive="#002244"
                            emissiveIntensity={0.08}
                            map={cardTexture}
                        />
                    </mesh>

                    {/* Cara trasera con patrón */}
                    <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
                        <boxGeometry args={[1.78, 2.51, 0.02]} />
                        <meshStandardMaterial
                            color="#1a1a2e"
                            roughness={0.3}
                            metalness={0.4}
                            emissive="#001122"
                            emissiveIntensity={0.15}
                        />
                    </mesh>
                    {/* Borde dorado en la tarjeta */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[1.82, 2.55, 0.048]} />
                        <meshStandardMaterial
                            color="#FFD700"
                            metalness={0.9}
                            roughness={0.1}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>

                    {/* Brillo de hover con efecto pulsante */}
                    {hovered && (
                        <>
                            <mesh position={[0, 0, 0.03]}>
                                <boxGeometry args={[1.86, 2.59, 0.01]} />
                                <meshBasicMaterial
                                    color="#00ffff"
                                    transparent
                                    opacity={0.4}
                                />
                            </mesh>
                            <pointLight
                                position={[0, 0, 0.5]}
                                intensity={2}
                                color="#00ffff"
                                distance={3}
                            />
                        </>
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
    const [motionPermissionGranted, setMotionPermissionGranted] =
        useState(false)
    const recoveryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Función para solicitar permiso de motion en iOS
    const requestMotionPermission = async () => {
        if (
            typeof DeviceMotionEvent !== 'undefined' &&
            typeof (DeviceMotionEvent as any).requestPermission === 'function'
        ) {
            try {
                const permission = await (
                    DeviceMotionEvent as any
                ).requestPermission()
                if (permission === 'granted') {
                    setMotionPermissionGranted(true)
                    alert(
                        '¡Perfecto! Ahora puedes agitar tu dispositivo para mover la tarjeta 📱✨',
                    )
                }
            } catch (error) {
                console.error(
                    'Error requesting device motion permission:',
                    error,
                )
            }
        } else {
            // No se requiere permiso (Android, etc)
            setMotionPermissionGranted(true)
        }
    }

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
                // Máxima nitidez para texto
                dpr={[1.5, 2.5]}
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
                    powerPreference: 'high-performance',
                }}
                onCreated={({ gl }) => {
                    // Activar filtrado anisotrópico para mejor calidad de texturas
                    const glContext = gl.getContext()
                    if (glContext) {
                        glContext.getExtension('EXT_texture_filter_anisotropic')
                    }

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

            {/* Instrucciones y botón de activación de sensor */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                {!motionPermissionGranted &&
                    typeof DeviceMotionEvent !== 'undefined' &&
                    typeof (DeviceMotionEvent as any).requestPermission ===
                        'function' && (
                        <button
                            onClick={requestMotionPermission}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors text-white font-semibold shadow-lg"
                        >
                            📱 Activar sensor de movimiento
                        </button>
                    )}
                <div className="text-center text-white/70 text-sm">
                    🎯 Arrastra la tarjeta | 📱 Agita tu teléfono | 🎮 Física
                    realista
                </div>
            </div>
        </div>
    )
}
