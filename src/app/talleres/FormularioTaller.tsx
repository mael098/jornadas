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
                <Radio
                    name="taller_horario1"
                    taller="Consultas avanzadas de MySQL con PhpMyAdmin:"
                    docente="Ing. Erick Sobrevilla Reséndiz"
                    descripcion="Exploraremos cómo gestionar y analizar datos de manera eficiente utilizando consultas SQL avanzadas en un entorno intuitivo. Los participantes aprenderán a realizar consultas complejas, incluyendo combinaciones de tablas (JOINs), subconsultas, agrupaciones, y uso de funciones de MySQL para obtener información detallada y valiosa de sus datos. Además, utilizaremos las herramientas de PhpMyAdmin para optimizar y analizar el rendimiento de nuestras consultas, mejorando la eficiencia en el manejo de bases de datos de gran tamaño. ¡Ideal para quienes desean profundizar en el análisis de datos y optimización en MySQL!.
                    Requerimientos:
                    Equipo de computo
                    XAMPP"
                    value={TALLERES_HORARIO1.Taller_1}
                />
                <Radio
                    name="taller_horario1"
                    taller="Desarrollo de Software Empresarial sin Código con Power Platform:"
                    docente="Ing. Juan Carlos Hernández Marín"
                    descripcion="Este taller busca despertar el interés de los estudiantes en el desarrollo de aplicaciones empresariales, utilizando herramientas intuitivas que no requieren conocimientos de programación. A través de actividades prácticas, los participantes explorarán cómo crear soluciones de software para problemas empresariales reales, desarrollando habilidades de lógica, curiosidad y apertura al aprendizaje. Este enfoque práctico e interactivo les permitirá ver el potencial del software como herramienta de negocio, motivándolos a adentrarse en el mundo de la programación y desarrollo de soluciones digitales.
                    Requerimientos:
                    Power Platform: Acceso a la plataforma mediante cuenta institucional (necesaria para aprovechar las funcionalidades de Power Platform).
                    Conexión a Internet: Para acceder a los recursos en la nube y realizar los ejercicios.
                    Equipo de cómputo: Cada participante debe contar con su propia computadora para el desarrollo individual de la actividad."
                    value={TALLERES_HORARIO1.Taller_2}
                />
                <Radio
                    name="taller_horario1"
                    taller="Arduino:"
                    docente="Ing. Efraín Padilla Ayala"
                    descripcion="En este taller de Arduino, los participantes aprenderán los conceptos básicos de electrónica y programación mediante el uso de la plataforma Arduino. Exploraremos el funcionamiento de sensores, LEDs y motores, y realizaremos proyectos prácticos para desarrollar habilidades en el diseño de circuitos y en la escritura de código. Ideal para principiantes, el taller ofrece una introducción accesible y práctica a la creación de proyectos interactivos y al mundo de la programación física, permitiendo a los asistentes llevar sus ideas a la realidad.
                    Requerimientos:
                    Equipo de cómputo
                    Arduino IDE
                    LEDs
                    ProtoBoard"
                    value={TALLERES_HORARIO1.Taller_3}
                />

                <h3>Horario 2: 11:00 AM - 12:30 PM</h3>
                <Radio
                    name="taller_horario2"
                    taller="Estructuras HTML con hojas de estilo de JavaScript:"
                    docente="Ing. José Fernando Padrón Tristán"
                    descripcion="Aprenderemos a construir páginas web dinámicas y visualmente atractivas utilizando HTML junto con estilos definidos en JavaScript. Exploraremos cómo generar y estructurar elementos HTML, y cómo aplicar estilos y animaciones de manera programática, lo que permite una personalización más avanzada y dinámica del diseño en tiempo real. A través de ejemplos prácticos, los participantes descubrirán cómo integrar JavaScript para manipular CSS, gestionar eventos, y transformar elementos HTML para mejorar la experiencia de usuario y la interactividad de sus aplicaciones web.
                    Requerimientos:
                    Equipo de computo
                    Visual Studio Code"
                    value={TALLERES_HORARIO2.Taller_4}
                />
                <Radio
                    name="taller_horario2"
                    taller="CiberSeguridad"
                    docente="Ing. Edilberto Rodríguez Larkins"
                    descripcion="Este taller de ciberseguridad para principiantes ofrece una introducción a los conceptos y prácticas esenciales para proteger la información y navegar de manera segura en el entorno digital.  A través de actividades prácticas y simulaciones, los participantes adquirirán habilidades básicas de seguridad en línea que podrán aplicar en su vida diaria, mejorando su comprensión de la privacidad y la seguridad en internet. Ideal para quienes desean dar sus primeros pasos en ciberseguridad y proteger su información personal.
                    Equipo de cómputo
                    Virtual BOX
                    Memoria USB"
                    value={TALLERES_HORARIO2.Taller_5}
                />
                <Radio
                    name="taller_horario2"
                    taller="PENDIENTE"
                    docente="PENDIENTE"
                    descripcion="PENDIENTE"
                    value={TALLERES_HORARIO2.Taller_6}
                />

                <h3>Horario 3: 12:30 PM - 12:00 PM</h3>
                <Radio
                    name="taller_horario3"
                    taller="Estructuras HTML con hojas de estilo de JavaScript:"
                    docente="Ing. José Fernando Padrón Tristán"
                    descripcion="Aprenderemos a construir páginas web dinámicas y visualmente atractivas utilizando HTML junto con estilos definidos en JavaScript. Exploraremos cómo generar y estructurar elementos HTML, y cómo aplicar estilos y animaciones de manera programática, lo que permite una personalización más avanzada y dinámica del diseño en tiempo real. A través de ejemplos prácticos, los participantes descubrirán cómo integrar JavaScript para manipular CSS, gestionar eventos, y transformar elementos HTML para mejorar la experiencia de usuario y la interactividad de sus aplicaciones web. Requerimientos:
                    Equipo de computo
                    Visual Studio Code"
                    value={TALLERES_HORARIO3.Taller_7}
                />
                <Radio
                    name="taller_horario3"
                    taller="Análisis, diseño e implementación de estructura de datos lineales en java"
                    docente="Ing. José Antonio Castillo Gutiérrez"
                    descripcion="Exploraremos cómo construir y gestionar estructuras de datos fundamentales que optimizan el almacenamiento y acceso a la información en aplicaciones Java. Los participantes aprenderán a implementar estructuras como listas, pilas y colas, comprendiendo cómo elegir la estructura adecuada según las necesidades del programa y cómo utilizar estas estructuras para resolver problemas comunes en desarrollo de software. Mediante ejercicios prácticos, el taller proporcionará una comprensión profunda del diseño y la eficiencia de las estructuras lineales, haciendo de este un recurso esencial para quienes desean mejorar sus habilidades en programación orientada a objetos y en gestión de datos.
                    Requeriemientos:
                    Equipo de cómputo"
                    value={TALLERES_HORARIO3.Taller_8}
                />
                <Radio
                    name="taller_horario3"
                    taller="PENDIENTE"
                    docente="PENDIENTE"
                    descripcion="PENDIENTE"
                    value={TALLERES_HORARIO3.Taller_9}
                />
            </div>
            {/* <div>
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
            </div> */}

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
