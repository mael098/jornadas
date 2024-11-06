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
        const juego = data.get('juego') as string

        try {
            const request = await registrarVideojuego({
                apellidos: lastname,
                email,
                nc,
                nombre: name,
                semestre: semester,
                videojuego: juego as keyof typeof JUEGOS,
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
        <form id="registroVideojuegos" action={handleaction}>
            <h3>Elige tu juego</h3>
            <Radio
                name="juego"
                taller="Juego 1: EA FC 24"
                descripcion="Compite en el torneo de EA FC 24"
                docente=""
                value={JUEGOS.Juego_1}
                required
                onChange={e => setJuego(JUEGOS.Juego_1)}
                checked={juego === JUEGOS.Juego_1}
            />
            <Radio
                name="juego"
                taller="Juego 2: Super Smash Bros"
                descripcion="Compite en el torneo de Super Smash Bros"
                docente=""
                value={JUEGOS.Juego_2}
                required
                onChange={e => setJuego(JUEGOS.Juego_2)}
                checked={juego === JUEGOS.Juego_2}
            />
            <Radio
                name="juego"
                taller="Juego 3: The King of Fighters"
                descripcion="Compite en el torneo de The King of Fughters"
                docente=""
                value={JUEGOS.Juego_3}
                required
                onChange={e => setJuego(JUEGOS.Juego_3)}
                checked={juego === JUEGOS.Juego_3}
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
                        const j = await getVideojuegosByUser(nnc)
                        if (j) {
                            setJuego(j.videojuego_seleccionado)
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
                value={semester}
                onChange={e => setSemester(parseInt(e.currentTarget.value))}
            >
                <option value={1}>Primer semestre</option>
                <option value={3}>Tercer semestre</option>
                <option value={5}>Quinto semestre</option>
                <option value={7}>Séptimo semestre</option>
            </select>

            <button type="submit" disabled={isPending || registered}>
                Registrar
            </button>
        </form>
    )
}
