'use client'
import Image from 'next/image'
import expositor2 from '@/expositores/expositor2.webp'
import expositor5 from '@/expositores/LogoSistemasSinFondo-_1_.webp'

export default function page() {
    return (
        <div id="expositores" className="tabcontent">
            <h1 className="text-3xl text-left">Expositores</h1>
            <div className="expositor">
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
            </div>
            <div className="expositor">
                <Image
                    src={expositor2}
                    width={100}
                    height={100}
                    alt="Expositor 2"
                    className="expositor-img"
                />
                <div className="expositor-info">
                    <h3>Lic. Elizabeth González Hernández</h3>
                    <h4 className="text-xl">
                        Ciberseguridad vs Seguridad de la información ¿cual es
                        tu camino?
                    </h4>
                    <p>
                        La ciberseguridad y la seguridad de la información son
                        dos disciplinas cruciales en el mundo digital actual,
                        cada una con su enfoque y objetivos específicos. La
                        ciberseguridad se centra en proteger sistemas y redes
                        contra amenazas y ataques cibernéticos, garantizando la
                        integridad y disponibilidad de la información en
                        entornos digitales. Por otro lado, la seguridad de la
                        información abarca un espectro más amplio, protegiendo
                        todos los tipos de datos, tanto digitales como físicos,
                        y asegurando su confidencialidad y uso adecuado. En un
                        contexto donde las brechas de seguridad son cada vez más
                        comunes, la comprensión de estas áreas y la elección de
                        un camino profesional en alguna de ellas es fundamental
                        para quienes deseen contribuir a un entorno seguro y
                        protegido.
                    </p>
                </div>
            </div>
        </div>
    )
}
