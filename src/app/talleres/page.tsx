import { TallerForm } from './FormularioTaller'
import { Counters } from './Counters'
import { conteoDeTalleres } from '@/actions/cotadores'

export default async function Page() {
    const counts = await conteoDeTalleres()
    return (
        <div id="talleres" className="tabcontent">
            <h1 className="text-left text-3xl">
                Talleres Disponibles y Registro
            </h1>
            {/* Formulario de Registro */}
            <TallerForm />

            {/* Contadores de cada taller */}
            <Counters initialCounters={counts} />
        </div>
    )
}
