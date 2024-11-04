import { FridayForm } from './FormularioViernes'
import { Counters } from './Counters'
import { conteoDeViernes } from '@/actions/cotadores'

export default async function Page() {
    const counts = await conteoDeViernes()
    return (
        <div id="viernes" className="tabcontent">
            <h1 className="text-left text-3xl">Talleres Día Viernes</h1>

            {/* Pasar cargarConteo al formulario */}
            <FridayForm />

            <Counters initialCounters={counts} />
        </div>
    )
}
