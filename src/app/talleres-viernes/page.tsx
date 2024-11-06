import { FridayForm } from './FormularioViernes'
import { Counters } from './Counters'
import { conteoDeViernes } from '@/actions/cotadores'
import { getTalleresViernes } from '@/actions/talleres'

export default async function Page() {
    const counts = await conteoDeViernes()
    const talleres = await getTalleresViernes()
    return (
        <div id="viernes" className="tabcontent">
            <h1 className="text-left text-3xl">Talleres Día Viernes</h1>

            {/* Pasar cargarConteo al formulario */}
            <FridayForm talleres={talleres} />

            <Counters initialCounters={counts} />
        </div>
    )
}
