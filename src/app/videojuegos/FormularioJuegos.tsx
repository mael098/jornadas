'use client'

import { registrarVideojuego } from '@/actions/registrar_videojuego'
import { getVideojuegosByUser } from '@/actions/talleres'
import { getUser } from '@/actions/user'
import { Radio } from '@/components/Radio'
import { counterContext } from '@/contexts/Counter'
import { JUEGOS } from '@/lib/constantes'
import { use, useState, useTransition } from 'react'

interface FormularioJuegosProps {}

export function GamesForm({}: FormularioJuegosProps) {
    const { sendCounterSignal } = use(counterContext)
    const [isPending, startTransition] = useTransition()

    const [nc, setNc] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [semester, setSemester] = useState(1)
    const [juego, setJuego] = useState('')
    const [registered, setRegistered] = useState(false)

    const handleaction = async (data: FormData) => {
        try {
            const request = await registrarVideojuego({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
                videojuego: juego,
            })
            if (request.error) {
                if (request.error === 'Usuario Registrado')
                    return alert('Ya estás registrado en un juego')
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request.error)
            } else {
                alert('Registro exitoso')
                // Llamar a onRegistroExitoso para actualizar el conteo
                sendCounterSignal()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            id="registroVideojuegos"
            action={handleaction}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                🎮 Elige tu juego
            </h3>

            {/* Opciones de juegos */}
            <div className="space-y-3 mb-6">
                <Radio
                    name="juego"
                    taller="Juego 1: KOF 2002"
                    descripcion="Compite en el torneo de KOF 2002"
                    docente=""
                    value={JUEGOS.Juego_1}
                    required
                    onChange={e => setJuego(JUEGOS.Juego_1)}
                    checked={juego === JUEGOS.Juego_1}
                />
                <Radio
                    name="juego"
                    taller="Juego 2: Minecraft"
                    descripcion="Compite en el torneo de Minecraft"
                    docente=""
                    value={JUEGOS.Juego_2}
                    required
                    onChange={e => setJuego(JUEGOS.Juego_2)}
                    checked={juego === JUEGOS.Juego_2}
                />
                <Radio
                    name="juego"
                    taller="Juego 3: Smash"
                    descripcion="Compite en el torneo de Smash"
                    docente=""
                    value={JUEGOS.Juego_3}
                    required
                    onChange={e => setJuego(JUEGOS.Juego_3)}
                    checked={juego === JUEGOS.Juego_3}
                />
            </div>

            {/* Datos del estudiante */}
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="control"
                        className="block text-white font-medium mb-2 text-sm"
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
                                const j = await getVideojuegosByUser(nnc)
                                if (j) {
                                    setJuego(j.videojuego_seleccionado)
                                    setRegistered(true)
                                } else setRegistered(false)
                            })
                        }}
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-black outline-none
                                   focus:border-blue-400/50 focus:bg-white/10 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Ej: 20240001"
                    />
                </div>

                <div>
                    <label
                        htmlFor="apellidos"
                        className="block text-white font-medium mb-2 text-sm"
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
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-black outline-none
                                   focus:border-blue-400/50 focus:bg-white/10 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Apellido paterno y materno"
                    />
                </div>

                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-white font-medium mb-2 text-sm"
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
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-black outline-none
                                   focus:border-blue-400/50 focus:bg-white/10 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tu(s) nombre(s)"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-white font-medium mb-2 text-sm"
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
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-black outline-none
                                   focus:border-blue-400/50 focus:bg-white/10 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="tu.correo@altamira.tecnm.mx"
                    />
                </div>

                <div>
                    <label
                        htmlFor="semestre"
                        className="block text-white font-medium mb-2 text-sm"
                    >
                        Semestre:
                    </label>
                    <select
                        name="semestre"
                        required
                        disabled={isPending}
                        value={semester}
                        onChange={e =>
                            setSemester(parseInt(e.currentTarget.value))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-black outline-none
                                   focus:border-blue-400/50 focus:bg-white/10 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <option value={1} className="bg-gray-800">
                            Primer semestre
                        </option>
                        <option value={3} className="bg-gray-800">
                            Tercer semestre
                        </option>
                        <option value={5} className="bg-gray-800">
                            Quinto semestre
                        </option>
                        <option value={7} className="bg-gray-800">
                            Séptimo semestre
                        </option>
                    </select>
                </div>
            </div>

            {/* Botón de registro */}
            <button
                type="submit"
                disabled={isPending || registered}
                className="w-full mt-6 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold
                           py-3.5 px-6 rounded-xl transition-all duration-300
                           hover:from-blue-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                           active:scale-95"
            >
                {isPending ?
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5"
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
                    '✅ Ya estás registrado'
                :   '🎮 Registrarme en el torneo'}
            </button>

            {registered && (
                <p className="mt-4 text-center text-yellow-400 text-sm font-medium">
                    ⚠️ Ya tienes un juego registrado
                </p>
            )}
        </form>
    )
}
