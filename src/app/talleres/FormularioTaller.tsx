'use client'
import { registerTaller } from '@/actions/registrar_taller'
import { getUser, registerUser } from '@/actions/user'
import Radio from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { sessionContext } from '@/contexts/session'
import {
    TALLERES_HORARIO1,
    TALLERES_HORARIO2,
    TALLERES_HORARIO3,
    TalleresHorario1,
    TalleresHorario2,
    TalleresHorario3,
} from '@/lib/constantes'
import { use, useEffect, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { setSession as login } from '@/lib/auth'

interface FormularioTallersProps {}

export function TallerForm({}: FormularioTallersProps) {
    const { session, setSession } = use(sessionContext)!
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()
    const { pending } = useFormStatus()

    const [mode, setMode] = useState<
        'initial' | 'session' | 'login' | 'verify'
    >('initial')

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)
    const [phone, setPhone] = useState('')

    const handleInitial = () => {
        // no existe sesion, toca crear un usuario
        startTransition(async () => {
            setMode('verify')
        })
    }

    const handleVerify = (data: FormData) => {
        // esta pendiente verificar el numero para registrar demas datos
        const taller_horario1 = data.get('taller_horario1') as TalleresHorario1
        const taller_horario2 = data.get('taller_horario2') as TalleresHorario2
        const taller_horario3 = data.get('taller_horario3') as TalleresHorario3
        const code = data.get('code') as string

        startTransition(async () => {
            await registerUser({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
            }).catch(err => {
                console.log(err)
            })
            setSession(await login({ nc }))

            try {
                const request = await registerTaller({
                    nc,
                    taller_horario1,
                    taller_horario2,
                    taller_horario3,
                    apellidos: lastname,
                    email,
                    nombre: name,
                    semestre: semester,
                })
                if (request.error) {
                    if (request.error === 'Faltan Datos')
                        alert('Debe llenar todos los campos requeridos')
                    else if (request.error === 'Usuario Registrado')
                        alert(
                            'Ya estas registrado, no puedes cambiar los talleres',
                        )
                    else if (request.error === 'Taller lleno 1')
                        alert(`No hay cupo en el primer taller`)
                    else if (request.error === 'Taller lleno 2')
                        alert(`No hay cupo en el segundo taller`)
                    else if (request.error === 'Taller lleno 3')
                        alert(`No hay cupo en el tercer taller`)
                } else {
                    alert(request.message || 'registro exitoso')
                    sendCounterSignal()
                }
            } catch (error) {
                console.log(error)
                alert('has ocurrido un error. intente de nuevo.')
            }
        })
    }

    const handleLogin = () => {
        // existe usuario pero no session, requiere OTP
        startTransition(async () => {
            setMode('verify')
        })
    }

    const handleSession = async (data: FormData) => {
        // existe sesion, solo se registra talleres
        const taller_horario1 = data.get('taller_horario1') as TalleresHorario1
        const taller_horario2 = data.get('taller_horario2') as TalleresHorario2
        const taller_horario3 = data.get('taller_horario3') as TalleresHorario3

        try {
            const request = await registerTaller({
                nc,
                taller_horario1,
                taller_horario2,
                taller_horario3,
                apellidos: lastname,
                email,
                nombre: name,
                semestre: semester,
            })
            if (request.error) {
                if (request.error === 'Faltan Datos')
                    alert('Debe llenar todos los campos requeridos')
                else if (request.error === 'Usuario Registrado')
                    alert('Ya estas registrado, no puedes cambiar los talleres')
                else if (request.error === 'Taller lleno 1')
                    alert(`No hay cupo en el primer taller`)
                else if (request.error === 'Taller lleno 2')
                    alert(`No hay cupo en el segundo taller`)
                else if (request.error === 'Taller lleno 3')
                    alert(`No hay cupo en el tercer taller`)
            } else {
                alert(request.message || 'registro exitoso')
                sendCounterSignal()
            }
        } catch (error) {
            console.log(error)
            alert('has ocurrido un error. intente de nuevo.')
        }
    }

    // Handle submit form
    const handleaction = async (data: FormData) => {
        if (mode === 'initial') handleInitial()
        else if (mode === 'verify') handleVerify(data)
        else if (mode === 'login') handleLogin()
        else if (mode === 'session') await handleSession(data)
    }

    useEffect(() => {
        const executeAsync = async () => {
            if (!session) return
            const user = await getUser(session.nc)
            if (!user) return
            setNc(user.nc)
            setLastname(user.apellidos)
            setName(user.nombre)
            setEmail(user.email)
            setSemester(user.semestre)
            setMode('session')
        }
        executeAsync()
    }, [session])

    if (mode === 'verify')
        return (
            <form action={handleaction}>
                <p>
                    Para continuar con tu registro es necesario que proporciones
                    el código de verificacion que te llegará a tu teléfono{' '}
                    {phone} a travez de un mensaje de texto
                </p>
                <label htmlFor="control">Número de teléfono:</label>
                <input type="text" name="code" required disabled={pending} />
            </form>
        )
    return (
        <form action={handleaction}>
            <div>
                <h3>Horario 1: 9:00 AM - 11:00 AM</h3>
                <Radio
                    name="taller_horario1"
                    taller="Taller 1: Mestro Erick"
                    descripcion="Fundamentos de programación y desarrollo web."
                    value={TALLERES_HORARIO1.Taller_1}
                />
                <Radio
                    name="taller_horario1"
                    taller="Taller 2: Power Plataform"
                    descripcion="Estrategias de marketing digital para pymes."
                    value={TALLERES_HORARIO1.Taller_2}
                />
                <Radio
                    name="taller_horario1"
                    taller="Taller 3: Arduino"
                    descripcion="Cómo las tecnologías transforman la educación."
                    value={TALLERES_HORARIO1.Taller_3}
                />

                <h3>Horario 2: 1:00 PM - 3:00 PM</h3>
                <Radio
                    name="taller_horario2"
                    taller="Taller 1: Estructuras HTML con hojas de estilo de JavaScript"
                    descripcion="Fundamentos de programación y desarrollo web."
                    value={TALLERES_HORARIO2.Taller_4}
                />
                <Radio
                    name="taller_horario2"
                    taller="Taller 2: CiberSeguridad"
                    descripcion="Purple Team: una entrada a la cyberseguridad"
                    value={TALLERES_HORARIO2.Taller_5}
                />
                <Radio
                    name="taller_horario2"
                    taller="Taller 3: Transformación educativa"
                    descripcion="Cómo las tecnologías transforman la educación."
                    value={TALLERES_HORARIO2.Taller_6}
                />

                <h3>Horario 3: 4:00 PM - 6:00 PM</h3>
                <Radio
                    name="taller_horario3"
                    taller="Taller 1: Pendiente"
                    descripcion="Fundamentos de programación y desarrollo web."
                    value={TALLERES_HORARIO3.Taller_7}
                />
                <Radio
                    name="taller_horario3"
                    taller="Taller 2: Análisis de datos"
                    descripcion="Estrategias de marketing digital para pymes."
                    value={TALLERES_HORARIO3.Taller_8}
                />
                <Radio
                    name="taller_horario3"
                    taller="Taller 3: Pendiente"
                    descripcion="Cómo las tecnologías transforman la educación."
                    value={TALLERES_HORARIO3.Taller_9}
                />
            </div>

            <label htmlFor="control">Número de control:</label>
            <input
                type="text"
                name="control"
                required
                value={nc}
                onChange={e => {
                    const nnc = e.currentTarget.value
                    setNc(nnc)
                    if (!/\d{8}/.test(nnc)) return
                    if (mode !== 'session') return
                    startTransition(async () => {
                        const user = await getUser(nnc)
                        if (!user) return
                        setNc(user.nc)
                        setLastname(user.apellidos)
                        setName(user.nombre)
                        setEmail(user.email)
                        setSemester(user.semestre)
                        setMode('login')
                    })
                }}
                disabled={isPending}
            />

            <label htmlFor="control">Número de teléfono:</label>
            <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={e => setPhone(e.currentTarget.value)}
                disabled={isPending}
            />

            <label htmlFor="apellidos">Apellidos:</label>
            <input
                type="text"
                name="apellidos"
                required
                value={lastname}
                onChange={e => setLastname(e.currentTarget.value)}
                disabled={mode === 'session' || isPending}
            />

            <label htmlFor="nombre">Nombre (s):</label>
            <input
                type="text"
                name="nombre"
                required
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                disabled={mode === 'session' || isPending}
            />

            <label htmlFor="email">Correo institucional:</label>
            <input
                type="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                disabled={mode === 'session' || isPending}
            />

            <label htmlFor="semestre">Semestre:</label>
            <select
                name="semestre"
                required
                disabled={mode === 'session' || isPending}
                onChange={e => setSemester(parseInt(e.currentTarget.value))}
            >
                <option value={1} defaultChecked={semester === 1}>
                    Primer semestre
                </option>
                <option value={3} defaultChecked={semester === 3}>
                    Tercer semestre
                </option>
                <option value={5} defaultChecked={semester === 5}>
                    Quinto semestre
                </option>
                <option value={7} defaultChecked={semester === 7}>
                    Séptimo semestre
                </option>
            </select>

            <button type="submit" disabled={pending}>
                Registrar
            </button>
        </form>
    )
}
