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
            <h3>Horario Único: 9:00 AM - 12:00 PM</h3>
            <Radio
                name="taller"
                taller="Taller 1: Desarrollo con React"
                value={TALLERES_VIERNES.Taller_1}
                descripcion="Aprende las bases del desarrollo con React.js"
            />
            <Radio
                name="taller"
                taller="Taller 2: Machine Learning"
                descripcion="Fundamentos de aprendizaje automático aplicado"
                value={TALLERES_VIERNES.Taller_2}
            />
            <Radio
                name="taller"
                taller="Taller 3: Diseño UX/UI"
                descripcion="Diseño de interfaces centradas en el usuario"
                value={TALLERES_VIERNES.Taller_3}
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
