import { TallerForm } from './FormularioTaller'
import { Counters } from './Counters'
import { conteoDeViernes } from '@/actions/cotadores'
import { getTalleresViernes } from '@/actions/talleres'

export default async function Page() {
    const counts = await conteoDeViernes()
    const talleres = await getTalleresViernes()
    return (
        <div id="talleres" className="tabcontent">
            <h1 className="text-left text-3xl">
                Talleres Disponibles y Registro
            </h1>
            {/* Formulario de Registro */}
            <TallerForm talleres={talleres} />

            {/* Contadores de cada taller */}
            <Counters initialCounters={counts} />
        </div>
    )
}
