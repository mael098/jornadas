'use client'
import { registerTaller } from '@/actions/registrar_taller'
import { getUser } from '@/actions/user'
import Radio from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import {
    TALLERES_HORARIO1,
    TALLERES_HORARIO2,
    TALLERES_HORARIO3,
    TalleresHorario1,
    TalleresHorario2,
    TalleresHorario3,
} from '@/lib/constantes'
import { use, useState, useTransition } from 'react'

export function TallerForm() {
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)

    // Handle submit form
    const handleaction = (data: FormData) => {
        const taller_horario1 = data.get('taller_horario1') as TalleresHorario1
        const taller_horario2 = data.get('taller_horario2') as TalleresHorario2
        const taller_horario3 = data.get('taller_horario3') as TalleresHorario3

        startTransition(async () => {
            await registerTaller({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
                taller_horario1,
                taller_horario2,
                taller_horario3,
            })
            sendCounterSignal()
        })
    }

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
