'use client'

export default function page() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden rounded-lg">
            {/* Fondo decorativo con efecto de grid */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-20 blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
                {/* Encabezado decorativo */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                        <span className="text-cyan-400 text-sm font-semibold">
                            Mi Último Commit
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Despedida de las Jornadas
                    </h1>
                    <div className="h-1 w-24 bg-linear-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
                </div>

                {/* Contenido principal */}
                <article className="space-y-8 text-lg leading-relaxed">
                    <p className="text-gray-300">
                        Bueno…
                        <br />
                        si estás leyendo esto, significa que llegó ese momento
                        que uno nunca se siente listo para escribir:
                        <br />
                        <span className="text-cyan-400 font-semibold">
                            mi despedida de las jornadas.
                        </span>
                    </p>

                    <p className="text-gray-300 italic">
                        Y honestamente…
                        <br />
                        se siente raro.
                        <br />
                        Como cuando tu código funciona a la primera y sospechas
                        que algo está mal.
                        <br />
                        <span className="text-cyan-400">Así de raro.</span>
                    </p>

                    <div className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 my-8">
                        <p className="text-gray-200">
                            Entré a estas jornadas siendo casi un desconocido,
                            medio perdido, con más dudas que certezas…
                            <br />
                            pero aun así, cada jornada me enseñó algo.
                        </p>
                        <p className="text-gray-300 mt-4">
                            Me enseñó a{' '}
                            <span className="text-cyan-400">no rendirme</span>,
                            a reírme del caos, a intentar otra vez cuando todo
                            se rompía,
                            <br />a encontrarle sentido a esta carrera incluso
                            en los días donde parecía que ella no me quería a
                            mí.
                        </p>
                    </div>

                    <p className="text-gray-300">
                        Y ahora que me voy…
                        <br />
                        se siente como dejar una casa después de haber arreglado
                        cada rincón.
                        <br />
                        Una casa que me dejó recuerdos hermosos, cansancio,
                        risas, amistades y una que otra ojerita ganada con
                        dignidad.
                    </p>

                    <div className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6 my-8">
                        <p className="text-gray-200 font-semibold">
                            Esta página que ven aquí la que construí con mis
                            manos, mis teclas, mis desvelos y mis ganas
                        </p>
                        <p className="text-gray-300 mt-4">
                            no es solo una web.
                            <br />
                            Es mi despedida disfrazada de proyecto.
                            <br />
                            Es mi manera de abrazar, aunque sea digitalmente, a
                            la siguiente generación que va a tomar este camino.
                            <br />
                            Es mi forma de decir:
                            <br />
                            <span className="text-cyan-400 text-xl font-bold">
                                "Estuve aquí. Y amé estar aquí."
                            </span>
                        </p>
                    </div>

                    <p className="text-gray-300">
                        Las jornadas… son únicas.
                        <br />
                        Son ese día que llega rápido, brilla fuerte y desaparece
                        igual de rápido.
                        <br />
                        Como una estrella fugaz que parpadea un instante…
                        <br />
                        pero si la viste, si estuviste ahí,
                        <br />
                        <span className="text-cyan-400 font-semibold">
                            te marca para siempre.
                        </span>
                    </p>

                    <div className="border-l-4 border-cyan-400 pl-6 py-4 my-8 bg-cyan-400/5">
                        <p className="text-gray-200 font-semibold mb-4">
                            Y si algo quiero que recuerden es esto:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                No tienen que ser los más inteligentes, ni los
                                más veloces, ni los que entienden todo a la
                                primera.
                            </li>
                            <li>
                                <span className="text-cyan-400">
                                    Yo no lo fui.
                                </span>
                            </li>
                            <li>
                                Pero fui{' '}
                                <span className="text-cyan-400 font-semibold">
                                    constante.
                                </span>
                            </li>
                            <li>
                                <span className="text-cyan-400 font-semibold">
                                    Terco.
                                </span>
                            </li>
                            <li>
                                <span className="text-cyan-400 font-semibold">
                                    Apasionado.
                                </span>
                            </li>
                            <li>Y eso me llevó lejos.</li>
                            <li>Más lejos de lo que pensé.</li>
                        </ul>
                    </div>

                    <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-lg p-8 my-8">
                        <p className="text-xl text-gray-100 font-semibold mb-4">
                            Así que vivan estas jornadas con todo el corazón.
                        </p>
                        <p className="text-gray-200">
                            Rían, aprendan, fallen, vuelvan a intentar, sueñen
                            grande,
                            <br />y hagan que cada generación supere a la
                            anterior.
                        </p>
                    </div>

                    <p className="text-gray-300 italic">
                        Yo cierro mi capítulo aquí…
                        <br />
                        pero ustedes están a punto de escribir el suyo.
                        <br />Y créanme:{' '}
                        <span className="text-cyan-400">
                            no tienen idea de lo increíble que puede ser.
                        </span>
                    </p>

                    <div className="border-t border-cyan-500/30 pt-8 mt-12">
                        <p className=" text-blue-200 mb-6">
                            Cuídense, programen con amor, y recuerden siempre:
                        </p>
                        <div className="bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl font-bold mb-8">
                            Si yo pude… ustedes también.
                        </div>
                        <p className="text-blue-200 italic mb-8">
                            Y si no pueden… bueno, siempre existe la técnica
                            universal:
                            <br />
                            <span className="text-cyan-300 font-semibold">
                                apagar y prender otra vez.
                            </span>
                        </p>
                    </div>

                    <div className="pt-8 border-t border-cyan-500/30 text-right">
                        <p className="text-blue-200 mb-2">
                            Con todo mi corazón, mis recuerdos y mis bugs que
                            nunca aparecieron,
                        </p>
                        <p className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Iván Asdrúbal Villegas Espinosa
                        </p>
                    </div>
                </article>

                {/* Footer decorativo */}
                <div className="mt-16 text-center">
                    <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                        <span className="text-cyan-400 text-sm">
                            ❤️ Jornadas Tecnológicas 2025
                        </span>
                    </div>
                </div>
            </div>

            {/* Efecto de luz flotante */}
            <div className="fixed bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
            <div
                className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none"
                style={{ animationDelay: '2s' }}
            ></div>
        </div>
    )
}
