'use client'

import { registrarViernes } from '@/actions/registrar_viernes'
import { getUser } from '@/actions/user'
import Radio from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { TALLERES_VIERNES, TalleresViernes } from '@/lib/constantes'
import { use, useState, useTransition } from 'react'

interface FormularioViernesProps {}

export function FridayForm({}: FormularioViernesProps) {
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)

    const handleaction = async (data: FormData) => {
        const taller = data.get('taller') as TalleresViernes

        try {
            const request = await registrarViernes({
                apellidos: lastname,
                nombre: name,
                email,
                nc,
                semestre: semester,
                taller,
            })
            if (request.error) {
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request)
            } else {
                alert(request.message)
                sendCounterSignal() // Llamar a la función para actualizar los contadores
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        handleaction(formData)
    }

    return (
        <form id="registroViernes" onSubmit={handleSubmit}>
            <h3>Horario Único: 11:30 AM - 1:30 PM</h3>
            <Radio
                name="taller"
                taller="Taller 1: Desarrollo de Software Empresarial sin Código con Power Platform"
                value={TALLERES_VIERNES.Taller_1}
                docente="Ing. Juan Carlos Hernández Marín"
                descripcion="Objetivo: Motivar a los estudiantes en el desarrollo de aplicaciones empresariales de forma intuitiva y sin necesidad de programar, promoviendo su interés en el área de programación a través de la creación de herramientas de software. Durante el taller, se espera que los participantes apliquen habilidades como lógica, curiosidad y disposición para aprender sobre desarrollo de software.
                Requerimientos:
                Power Platform: Acceso a la plataforma mediante cuenta institucional (necesaria para aprovechar las funcionalidades de Power Platform).
                Conexión a Internet: Para acceder a los recursos en la nube y realizar los ejercicios.
                Equipo de cómputo: Cada participante debe contar con su propia computadora para el desarrollo individual de la actividad.
                Modalidad: Taller presencial con actividades individuales."
            />
            <Radio
                name="taller"
                taller="Taller 2:Creando mi Propio Agente"
                value={TALLERES_VIERNES.Taller_2}
                docente="Dr. Nelson Rangel Valdez"
                descripcion="Objetivo: Mostrar los componentes básicos de un agente inteligente a través de un caso de estudio simple.
                Requerimientos:
                Arduino IDE,  requiere instalar Drivers USB y board para NodeMCU-ESP32
                Python (cualquier version)
                NodeJS (cualquier version)
                Algun Editor de texto que no sea muy pesado (Sublime por ejemplo)
                Internet"
            />
            <Radio
                name="taller"
                taller="Taller 3:Toma de Decisiones Basada en Datos"
                docente="Dra. Claudia Guadalupe Gómez Santillán"
                value={TALLERES_VIERNES.Taller_3}
                descripcion="Objetivo: Mostrar cómo explotar apropiadamente los datos mediante análisis y visualizacion para dar soporte a la decisión.
                Requerimientos:
                Power BI (Software gratuito, requiere estar previamente instalado)]
                Kaggle (plataforma web requiere cuenta, preferentemente previa, pero puede ser durante el taller
                Internet necesario
                Taller por Equipos o Individual"
            />

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

                    startTransition(async () => {
                        const user = await getUser(nnc)
                        if (!user) return
                        setNc(user.nc)
                        setLastname(user.apellidos)
                        setName(user.nombre)
                        setEmail(user.email)
                        setSemester(user.semestre)
                    })
                }}
                disabled={isPending}
            />

            <label htmlFor="apellidos">Apellidos:</label>
            <input
                type="text"
                name="apellidos"
                required
                value={lastname}
                onChange={e => setLastname(e.currentTarget.value)}
                disabled={isPending}
            />

            <label htmlFor="nombre">Nombre (s):</label>
            <input
                type="text"
                name="nombre"
                required
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                disabled={isPending}
            />

            <label htmlFor="email">Correo institucional:</label>
            <input
                type="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                disabled={isPending}
            />

            <label htmlFor="semestre">Semestre:</label>
            <select
                name="semestre"
                required
                disabled={isPending}
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

            <button type="submit" disabled={isPending}>
                Registrarse en Taller
            </button>
        </form>
    )
}
