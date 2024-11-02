import { TallerForm } from './FormularioTaller'
import { Counters } from './Counters'

interface Contadores {
    taller1: number
    taller2: number
    taller3: number
    taller4: number
    taller5: number
    taller6: number
    taller7: number
    taller8: number
    taller9: number
}

export default function Page() {
    return (
        <div id="talleres" className="tabcontent">
            <h1 className="text-left text-3xl">
                Talleres Disponibles y Registro
            </h1>
            {/* Formulario de Registro */}
            <TallerForm />

            {/* Contadores de cada taller */}
            <Counters />
        </div>
    )
}
