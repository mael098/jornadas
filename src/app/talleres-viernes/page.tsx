import { FridayForm } from './FormularioViernes'
import { Counters } from './Counters'

export default function Page() {
    return (
        <div id="viernes" className="tabcontent">
            <h1 className="text-left text-3xl">Talleres Día Viernes</h1>

            {/* Pasar cargarConteo al formulario */}
            <FridayForm />

            <Counters />
        </div>
    )
}
