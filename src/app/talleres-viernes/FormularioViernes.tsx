'use client'

import { registrarViernes } from '@/actions/registrar_viernes'
import { getTalleresViernesByUser } from '@/actions/talleres'
import { getUser } from '@/actions/user'
import { Radio } from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { Talleres } from '@prisma/client'
import { use, useState, useTransition } from 'react'

interface FormularioViernesProps {
    talleres: Talleres[]
}
export function FridayForm({ talleres }: FormularioViernesProps) {
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)
    const [taller, setTaller] = useState(0)
    const [registered, setRegistered] = useState(false)

    const handleaction = async (data: FormData) => {
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
                if (request.error === 'Taller lleno')
                    return alert('El taller seleccionado ya está lleno')
                if (request.error === 'Usuario Registrado')
                    return alert('Ya estás registrado en un taller')
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request)
            } else {
                alert('Registro exitoso')
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
            {talleres.map(t => (
                <Radio
                    key={t.id}
                    name="taller"
                    taller={t.nombre}
                    value={t.id}
                    docente={t.tallerista}
                    descripcion={t.descripcion}
                    required
                    checked={t.id === taller}
                    onChange={e => setTaller(parseInt(e.currentTarget.value))}
                />
            ))}

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
                        const t = await getTalleresViernesByUser(nnc)
                        if (t) {
                            setTaller(t.taller_id)
                            setRegistered(true)
                        } else setRegistered(false)
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

            <button type="submit" disabled={isPending || registered}>
                Registrarse en Taller
            </button>
        </form>
    )
}
