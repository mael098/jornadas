'use client'
import Image from 'next/image'
// import expositor2 from '@/expositores/expositor2.webp'
import expositor5 from '@/expositores/LogoSistemasSinFondo-_1_.webp'

export default function page() {
    return (
        <div id="expositores" className="tabcontent">
            <h1 className="text-3xl text-left">Expositores</h1>
            {/* <div className="expositor">
                <Image
                    src={expositor5}
                    width={100}
                    height={100}
                    alt="Expositor 2"
                    className="expositor-img"
                />
                <div className="expositor-info">
                    <h3>Ing. Ricardo Hernández Pópulos</h3>
                    <h4 className="text-xl">
                        Inteligencia Artificial Generativa en la Educación
                    </h4>
                    <p>
                        Esta conferencia abordará el papel revolucionario de la
                        inteligencia artificial generativa en la educación y su
                        potencial para transformar el proceso de enseñanza y
                        aprendizaje. Exploraremos cómo la IA generativa permite
                        la creación de contenido educativo adaptado a las
                        necesidades individuales de los estudiantes, desde
                        materiales personalizados hasta tutores virtuales
                        interactivos y retroalimentación automatizada en tiempo
                        real. Además, veremos cómo los docentes pueden optimizar
                        la preparación de clases, generar recursos didácticos de
                        manera más eficiente y ofrecer experiencias de
                        aprendizaje en entornos simulados para prácticas seguras
                        en campos complejos. También discutiremos los desafíos
                        éticos y prácticos que presenta esta tecnología y las
                        claves para su implementación responsable en el
                        ámbito educativo.
                    </p>
                </div>
            </div> */}
            <div className="expositor">
                {/* <Image
                    src={expositor2}
                    width={100}
                    height={100}
                    alt="Expositor 2"
                    className="expositor-img"
                /> */}
                <div className="expositor-info">
                    <h3>Victor Manuel García Gutiérrez</h3>
                    <h4 className="text-xl">
                        Conferencia "La IA no te reemplaza, te reemplaza la
                        resistencia al cambio"
                    </h4>
                    <p>
                        En esta conferencia se explorará cómo la inteligencia
                        artificial está transformando el panorama laboral y
                        profesional actual. Lejos de ser una amenaza que busca
                        reemplazar a las personas, la IA representa una
                        herramienta poderosa que puede potenciar nuestras
                        capacidades y agilizar nuestros procesos. El verdadero
                        desafío no radica en la tecnología misma, sino en
                        nuestra disposición a adaptarnos y evolucionar con ella.
                        La resistencia al cambio es el principal obstáculo que
                        enfrentan los profesionales hoy en día. Esta charla
                        busca motivar a los asistentes a abrazar la innovación,
                        desarrollar nuevas habilidades y aprovechar las
                        oportunidades que la IA ofrece para crecer tanto
                        personal como profesionalmente en la era digital.
                    </p>
                </div>
            </div>
        </div>
    )
}
