'use client'

import { registrarVideojuego } from '@/actions/registrar_videojuego'
import Radio from '@/components/Radio'
import { JUEGOS } from '@/lib/constantes'

interface FormularioJuegosProps {
    onRegistroExitoso: () => void
}

export function Formulario_juegos({
    onRegistroExitoso,
}: FormularioJuegosProps) {
    const handleaction = async (data: FormData) => {
        const apellidos = data.get('apellidos') as string
        const nombre = data.get('nombre') as string
        const numero_control = data.get('control') as string
        const email = data.get('email') as string
        const semestre = parseInt(data.get('semestre') as string, 10)
        const juego = data.get('juego') as string

        try {
            const request = await registrarVideojuego({
                apellidos,
                nombre,
                email,
                numero_control,
                semestre,
                videojuego: juego as keyof typeof JUEGOS,
            })
            if (request.error) {
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request.error)
            } else {
                alert(request.message)
                // Llamar a onRegistroExitoso para actualizar el conteo
                onRegistroExitoso()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            id="registroVideojuegos"
            onSubmit={e => {
                e.preventDefault()
                handleaction(new FormData(e.target as HTMLFormElement))
            }}
        >
            <h3>Elige tu juego</h3>
            <Radio
                name="juego"
                taller="Juego 1: FIFA"
                descripcion="Compite en el torneo de FIFA"
                value={JUEGOS.Juego_1}
            />
            <Radio
                name="juego"
                taller="Juego 2: Super Smash Bros"
                descripcion="Compite en Super Smash Bros"
                value={JUEGOS.Juego_2}
            />
            <Radio
                name="juego"
                taller="Juego 3: Mario Kart"
                descripcion="Compite en Mario Kart"
                value={JUEGOS.Juego_3}
            />

            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" required />
            <label htmlFor="nombre">Nombre (s):</label>
            <input type="text" id="nombre" name="nombre" required />
            <label htmlFor="control">Número de control:</label>
            <input type="number" id="control" name="control" required />
            <label htmlFor="email">Correo institucional:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="semestre">Semestre:</label>
            <select id="semestre" name="semestre" required>
                <option value="1">Primer semestre</option>
                <option value="3">Tercer semestre</option>
                <option value="5">Quinto semestre</option>
                <option value="7">Séptimo semestre</option>
            </select>

            <button type="submit">
                Registrarse en Concurso de Videojuegos
            </button>
            <p id="mensaje"></p>
        </form>
    )
}
