'use client'
import { registerTaller } from '@/actions/registrar_taller'
import { getUser } from '@/actions/user'
import { Radio } from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { Talleres } from '@prisma/client'
import { use, useState, useTransition } from 'react'

interface TallerFormProps {
    talleres: [Talleres[], Talleres[], Talleres[]]
}
export function TallerForm({
    talleres: [talleres_horario1, talleres_horario2, talleres_horario3],
}: TallerFormProps) {
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)

    // Handle submit form
    const handleaction = (data: FormData) => {
        const taller_horario1 = data.get('taller_horario1') as string
        const taller_horario2 = data.get('taller_horario2') as string
        const taller_horario3 = data.get('taller_horario3') as string

        startTransition(async () => {
            const request = await registerTaller({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
                taller_horario1: parseInt(taller_horario1),
                taller_horario2: parseInt(taller_horario2),
                taller_horario3: parseInt(taller_horario3),
            })
            if (request.error) {
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request)
            } else {
                alert(request.message)
                sendCounterSignal() // Llamar a la función para actualizar los contadores
            }
        })
    }

    return (
        <form action={handleaction}>
            <div>
                <h3>Horario 1: 9:00 AM - 10:30 AM</h3>
                {talleres_horario1.map(t => (
                    <Radio
                        key={t.id}
                        name="taller_horario1"
                        taller={t.nombre}
                        value={t.id}
                        docente={t.tallerista}
                        descripcion={t.descripcion}
                    />
                ))}

                <h3>Horario 2: 11:00 AM - 12:30 PM</h3>
                {talleres_horario2.map(t => (
                    <Radio
                        key={t.id}
                        name="taller_horario2"
                        taller={t.nombre}
                        value={t.id}
                        docente={t.tallerista}
                        descripcion={t.descripcion}
                    />
                ))}

                <h3>Horario 3: 12:30 PM - 12:00 PM</h3>
                {talleres_horario3.map(t => (
                    <Radio
                        key={t.id}
                        name="taller_horario2"
                        taller={t.nombre}
                        value={t.id}
                        docente={t.tallerista}
                        descripcion={t.descripcion}
                    />
                ))}
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
                Registrar
            </button>
        </form>
    )
}
