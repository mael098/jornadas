'use client'

import { registrarViernes } from '@/actions/registrar_viernes'
import { getTalleresViernesByUser } from '@/actions/talleres'
import { getUser } from '@/actions/user'
import { Radio } from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { Talleres } from '@prisma/client'
import { use, useState, useTransition } from 'react'

interface TallerFormProps {
    talleres: Talleres[]
}

export function TallerForm({ talleres }: TallerFormProps) {
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
                sendCounterSignal()
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
        <form
            id="registroTaller"
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
            <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-6">
                Horario Único: 11:30 AM - 1:30 PM
            </h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                                const t = await getTalleresViernesByUser(nnc)
                                if (t) {
                                    setTaller(t.taller_id)
                                    setRegistered(true)
                                } else setRegistered(false)
                            })
                        }}
                        disabled={isPending}
                        placeholder="12345678"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                    onChange={e => setSemester(parseInt(e.currentTarget.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
            </div>

            <button
                type="submit"
                disabled={isPending || registered}
                className={`w-full mt-8 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                    isPending || registered ?
                        'bg-gray-500/50 cursor-not-allowed text-gray-300'
                    :   'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105'
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
                :   'Registrarse en Taller'}
            </button>
        </form>
    )
}
