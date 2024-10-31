'use client'

import { registrarViernes } from '@/actions/registrar_viernes'
import Radio from '@/components/Radio'
import { TALLERES_VIERNES, TalleresViernes } from '@/lib/constantes'

interface FormularioViernesProps {
    onRegistroExitoso: () => void
}

export function Formulario_viernes({
    onRegistroExitoso,
}: FormularioViernesProps) {
    const handleaction = async (data: FormData) => {
        const apellidos = data.get('apellidos') as string
        const nombre = data.get('nombre') as string
        const numero_control = data.get('control') as string
        const email = data.get('email') as string
        const semestre = data.get('semestre') as string
        const taller = data.get('taller') as TalleresViernes

        try {
            const request = await registrarViernes({
                apellidos,
                nombre,
                email,
                numero_control,
                semestre: parseInt(semestre),
                taller,
            })
            if (request.error) {
                alert('Ha sucedido un error, intente de nuevo')
                console.log(request)
            } else {
                alert(request.message)
                onRegistroExitoso() // Llamar a la función para actualizar los contadores
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

            <button type="submit">Registrarse en Taller</button>
            <p id="mensaje_viernes"></p>
        </form>
    )
}
