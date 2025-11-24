import { FridayForm } from './FormularioViernes'
import { Counters } from './Counters'
import { conteoDeViernes } from '@/actions/cotadores'
import { getTalleresViernes } from '@/actions/talleres'
import { CounterContexProvider } from '@/contexts/Counter'

export default async function Page() {
    const counts = await conteoDeViernes()
    const talleres = await getTalleresViernes()
    return (
        <CounterContexProvider>
            <div id="viernes" className="min-h-screen p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent text-center">
                        Talleres Día Martes
                    </h1>
                    <p className="text-white/60 text-center mb-8 text-lg">
                        Elige tu taller de inteligencia artificial y análisis de
                        datos
                    </p>

                    <Counters initialCounters={counts} />

                    {/* Pasar cargarConteo al formulario */}
                    <FridayForm talleres={talleres} />
                </div>
            </div>
        </CounterContexProvider>
    )
}
