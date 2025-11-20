'use client'
import { registerTaller } from '@/actions/registrar_taller'
import { getTalleresJuevesByUser } from '@/actions/talleres'
import { getUser } from '@/actions/user'
import { Radio } from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { Talleres } from '@prisma/client'
import { use, useState, useTransition } from 'react'
import '../talleres-viernes/formulario.css'

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
    const [taller_horario1, setTallerHorario1] = useState(0)
    const [taller_horario2, setTallerHorario2] = useState(0)
    const [taller_horario3, setTallerHorario3] = useState(0)
    const [registered, setRegistered] = useState(false)

    // Handle submit form
    const handleaction = (data: FormData) => {
        startTransition(async () => {
            const request = await registerTaller({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
                taller_horario1,
                taller_horario2,
                taller_horario3,
            })
            if (request.error) {
                if (request.error === 'Taller lleno 1')
                    return alert(
                        'El taller del horario 1 está lleno, por favor elige otro',
                    )
                if (request.error === 'Taller lleno 2')
                    return alert(
                        'El taller del horario 2 está lleno, por favor elige otro',
                    )
                if (request.error === 'Taller lleno 3')
                    return alert(
                        'El taller del horario 3 está lleno, por favor elige otro',
                    )
                if (request.error === 'Usuario Registrado')
                    return alert(
                        'Ya estás registrado, no puedes registrarte de nuevo',
                    )
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request)
            } else {
                alert('Registrado con éxito')
                sendCounterSignal() // Llamar a la función para actualizar los contadores
            }
        })
    }

    return (
        <form
            action={handleaction}
            id="registroTalleres"
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Horario 1: 9:00 AM - 10:30 AM
                    </h3>
                    {talleres_horario1.map(t => (
                        <Radio
                            key={t.id}
                            name="taller_horario1"
                            taller={t.nombre}
                            value={t.id}
                            docente={t.tallerista}
                            descripcion={t.descripcion}
                            checked={t.id === taller_horario1}
                            required
                            onChange={e =>
                                setTallerHorario1(
                                    parseInt(e.currentTarget.value),
                                )
                            }
                        />
                    ))}
                </div>

                <div>
                    <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Horario 2: 11:00 AM - 12:30 PM
                    </h3>
                    {talleres_horario2.map(t => (
                        <Radio
                            key={t.id}
                            name="taller_horario2"
                            taller={t.nombre}
                            value={t.id}
                            docente={t.tallerista}
                            descripcion={t.descripcion}
                            checked={t.id === taller_horario2}
                            required
                            onChange={e =>
                                setTallerHorario2(
                                    parseInt(e.currentTarget.value),
                                )
                            }
                        />
                    ))}
                </div>

                <div>
                    <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Horario 3: 12:30 PM - 2:00 PM
                    </h3>
                    {talleres_horario3.map(t => (
                        <Radio
                            key={t.id}
                            name="taller_horario3"
                            taller={t.nombre}
                            value={t.id}
                            docente={t.tallerista}
                            descripcion={t.descripcion}
                            checked={t.id === taller_horario3}
                            required
                            onChange={e =>
                                setTallerHorario3(
                                    parseInt(e.currentTarget.value),
                                )
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <label
                        htmlFor="control"
                        className="block text-white font-semibold mb-2"
                    >
                        Número de control:
                    </label>
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
                                const t = await getTalleresJuevesByUser(nnc)
                                if (t) {
                                    setTallerHorario1(t.taller_horario1_id)
                                    setTallerHorario2(t.taller_horario2_id)
                                    setTallerHorario3(t.taller_horario3_id)
                                    setRegistered(true)
                                } else setRegistered(false)
                            })
                        }}
                        disabled={isPending}
                        placeholder="12345678"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label
                        htmlFor="apellidos"
                        className="block text-white font-semibold mb-2"
                    >
                        Apellidos:
                    </label>
                    <input
                        type="text"
                        name="apellidos"
                        required
                        value={lastname}
                        onChange={e => setLastname(e.currentTarget.value)}
                        disabled={isPending}
                        placeholder="Apellido Paterno Materno"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-white font-semibold mb-2"
                    >
                        Nombre (s):
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                        disabled={isPending}
                        placeholder="Nombre(s)"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-white font-semibold mb-2"
                    >
                        Correo institucional:
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        disabled={isPending}
                        placeholder="correo@acapulco.tecnm.mx"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="semestre"
                    className="block text-white font-semibold mb-2"
                >
                    Semestre:
                </label>
                <select
                    name="semestre"
                    required
                    disabled={isPending}
                    value={semester}
                    onChange={e => setSemester(parseInt(e.currentTarget.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                    <option value={1}>Primer semestre</option>
                    <option value={3}>Tercer semestre</option>
                    <option value={5}>Quinto semestre</option>
                    <option value={7}>Séptimo semestre</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isPending || registered}
                className={`w-full mt-8 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                    isPending || registered ?
                        'bg-gray-500/50 cursor-not-allowed text-gray-300'
                    :   'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                }`}
            >
                {isPending ?
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Cargando...
                    </span>
                : registered ?
                    <span className="flex items-center justify-center gap-2">
                        ✓ Ya estás registrado
                    </span>
                :   'Registrar en Talleres'}
            </button>
        </form>
    )
}
