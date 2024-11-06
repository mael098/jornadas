import { TallerForm } from './FormularioTaller'
import { Counters } from './Counters'
import { conteoDeTalleres } from '@/actions/cotadores'
import { getTalleresJueves } from '@/actions/talleres'

export default async function Page() {
    const counts = await conteoDeTalleres()
    const talleres = await getTalleresJueves()
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
