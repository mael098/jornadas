import { PrismaClient, Dia, Horario } from '@prisma/client'

const db = new PrismaClient()

await db.talleres.deleteMany()

const talleres = await db.talleres.createManyAndReturn({
    data: [
        {
            id: 1,
            nombre: 'Consultas avanzadas de MySQL con PhpMyAdmin',
            tallerista: 'Ing. Erick Sobrevilla Reséndiz',
            descripcion: `Exploraremos cómo gestionar y analizar datos de manera eficiente utilizando consultas SQL avanzadas en un entorno intuitivo. Los participantes aprenderán a realizar consultas complejas, incluyendo combinaciones de tablas (JOINs), subconsultas, agrupaciones, y uso de funciones de MySQL para obtener información detallada y valiosa de sus datos. Además, utilizaremos las herramientas de PhpMyAdmin para optimizar y analizar el rendimiento de nuestras consultas, mejorando la eficiencia en el manejo de bases de datos de gran tamaño. ¡Ideal para quienes desean profundizar en el análisis de datos y optimización en MySQL!.
Requerimientos:
    Equipo de computo
    XAMPP`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO1,
        },
        {
            id: 2,
            nombre: 'Introducción a la WEB moderna',
            tallerista: 'Iván Asdrúbal Villegas Espinosa',
            descripcion: `En este taller, exploraremos el desarrollo de aplicaciones web modernas utilizando las tecnologías más populares y eficientes del desarrollo Full-Stack. Iremos desde la creación de interfaces interactivas con React y el diseño visual ágil con Tailwind CSS, hasta la construcción de acciones de servidor robustas con Next.js y la integración de una base de datos escalable y segura utilizando Prisma y Supabase.
Requerimientos:
    Equipo de computo
    Visual Studio Code
    NodeJS`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO1,
        },
        {
            id: 3,
            nombre: 'Arduino',
            tallerista: 'Ing. Efraín Padilla Ayala',
            descripcion: `En este taller de Arduino, los participantes aprenderán los conceptos básicos de electrónica y programación mediante el uso de la plataforma Arduino. Exploraremos el funcionamiento de sensores, LEDs y motores, y realizaremos proyectos prácticos para desarrollar habilidades en el diseño de circuitos y en la escritura de código. Ideal para principiantes, el taller ofrece una introducción accesible y práctica a la creación de proyectos interactivos y al mundo de la programación física, permitiendo a los asistentes llevar sus ideas a la realidad.
Requerimientos:
    Equipo de cómputo
    Arduino IDE
    LEDs
    ProtoBoard`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO1,
        },
        {
            id: 4,
            nombre: 'Estructuras HTML con hojas de estilo de JavaScrip',
            tallerista: 'Ing. José Fernando Padrón Tristán',
            descripcion: `Aprenderemos a construir páginas web dinámicas y visualmente atractivas utilizando HTML junto con estilos definidos en JavaScript. Exploraremos cómo generar y estructurar elementos HTML, y cómo aplicar estilos y animaciones de manera programática, lo que permite una personalización más avanzada y dinámica del diseño en tiempo real. A través de ejemplos prácticos, los participantes descubrirán cómo integrar JavaScript para manipular CSS, gestionar eventos, y transformar elementos HTML para mejorar la experiencia de usuario y la interactividad de sus aplicaciones web.
Requerimientos:
    Equipo de computo
    Visual Studio Code`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO2,
        },
        {
            id: 5,
            nombre: 'CiberSeguridad',
            tallerista: 'Ing. Edilberto Rodríguez Larkins',
            descripcion: `Este taller de ciberseguridad para principiantes ofrece una introducción a los conceptos y prácticas esenciales para proteger la información y navegar de manera segura en el entorno digital. A través de actividades prácticas y simulaciones, los participantes adquirirán habilidades básicas de seguridad en línea que podrán aplicar en su vida diaria, mejorando su comprensión de la privacidad y la seguridad en internet. Ideal para quienes desean dar sus primeros pasos en ciberseguridad y proteger su información personal.
Requerimientos:
    Equipo de cómputo
    Virtual BOX
    Memoria USB`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO2,
        },
        {
            id: 6,
            nombre: 'Multiplataformas con Tecnología WEB',
            tallerista: 'Andrés Elí Maciel Muñiz',
            descripcion: `Exploraremos cómo utilizar tecnologías web modernas y herramientas populares para desarrollar aplicaciones multiplataforma, aprovechando una sola base de código. El objetivo es optimizar tiempo y recursos, construyendo soluciones que puedan ejecutarse en una amplia variedad de dispositivos y sistemas operativos, con una base sólida y reutilizable. Utilizando un solo lenguaje de programación, aprenderemos a crear aplicaciones que se adapten fácilmente al entorno web, de escritorio y móvil, maximizando la eficiencia y facilitando el mantenimiento del proyecto.
Requerimientos:
    Equipo de computo
    Visual Studio Code
    NodeJS`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO2,
        },
        {
            id: 7,
            nombre: 'Estructuras HTML con hojas de estilo de JavaScrip',
            tallerista: 'Ing. José Fernando Padrón Tristán',
            descripcion: `Aprenderemos a construir páginas web dinámicas y visualmente atractivas utilizando HTML junto con estilos definidos en JavaScript. Exploraremos cómo generar y estructurar elementos HTML, y cómo aplicar estilos y animaciones de manera programática, lo que permite una personalización más avanzada y dinámica del diseño en tiempo real. A través de ejemplos prácticos, los participantes descubrirán cómo integrar JavaScript para manipular CSS, gestionar eventos, y transformar elementos HTML para mejorar la experiencia de usuario y la interactividad de sus aplicaciones web.
Requerimientos:
    Equipo de computo
    Visual Studio Code`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO3,
        },
        {
            id: 8,
            nombre: 'Análisis, diseño e implementación de estructura de datos lineales en java',
            tallerista: 'Ing. José Antonio Castillo Gutiérrez',
            descripcion: `Exploraremos cómo construir y gestionar estructuras de datos fundamentales que optimizan el almacenamiento y acceso a la información en aplicaciones Java. Los participantes aprenderán a implementar estructuras como listas, pilas y colas, comprendiendo cómo elegir la estructura adecuada según las necesidades del programa y cómo utilizar estas estructuras para resolver problemas comunes en desarrollo de software. Mediante ejercicios prácticos, el taller proporcionará una comprensión profunda del diseño y la eficiencia de las estructuras lineales, haciendo de este un recurso esencial para quienes desean mejorar sus habilidades en programación orientada a objetos y en gestión de datos.
Requerimientos:
    Equipo de cómputo`,
            dia: Dia.JUEVES,
            horario: Horario.HORARIO3,
        },
        {
            id: 9,
            nombre: 'Consultas avanzadas de MySQL con PhpMyAdmin',
            tallerista: 'Ing. Erick Sobrevilla Reséndiz',
            descripcion: `Exploraremos cómo gestionar y analizar datos de manera eficiente utilizando consultas SQL avanzadas en un entorno intuitivo. Los participantes aprenderán a realizar consultas complejas, incluyendo combinaciones de tablas (JOINs), subconsultas, agrupaciones, y uso de funciones de MySQL para obtener información detallada y valiosa de sus datos. Además, utilizaremos las herramientas de PhpMyAdmin para optimizar y analizar el rendimiento de nuestras consultas, mejorando la eficiencia en el manejo de bases de datos de gran tamaño. ¡Ideal para quienes desean profundizar en el análisis de datos y optimización en MySQL!.
Requerimientos:
    Equipo de computo
    XAMPP`,
            dia: Dia.VIERNES,
            horario: Horario.HORARIO3,
        },
        {
            id: 10,
            nombre: 'Desarrollo de Software Empresarial sin Código con Power Platform',
            tallerista: 'Ing. Juan Carlos Hernández Marín',
            descripcion: `Objetivo: Motivar a los estudiantes en el desarrollo de aplicaciones empresariales de forma intuitiva y sin necesidad de programar, promoviendo su interés en el área de programación a través de la creación de herramientas de software. Durante el taller, se espera que los participantes apliquen habilidades como lógica, curiosidad y disposición para aprender sobre desarrollo de software.
Requerimientos:
    Power Platform: Acceso a la plataforma mediante cuenta institucional (necesaria para aprovechar las funcionalidades de Power Platform).
    Conexión a Internet: Para acceder a los recursos en la nube y realizar los ejercicios.
    Equipo de cómputo: Cada participante debe contar con su propia computadora para el desarrollo individual de la actividad.
    Modalidad: Taller presencial con actividades individuales.`,
            dia: Dia.VIERNES,
            horario: Horario.HORARIO1,
        },
        {
            id: 11,
            nombre: 'Creando mi Propio Agente',
            tallerista: 'Dr. Nelson Rangel Valdez',
            descripcion: `Objetivo: Mostrar los componentes básicos de un agente inteligente a través de un caso de estudio simple.
Requerimientos:
    Arduino IDE,  requiere instalar Drivers USB y board para NodeMCU-ESP32
    Python (cualquier version)
    NodeJS (cualquier version)
    Algun Editor de texto que no sea muy pesado (Sublime por ejemplo)
    Internet.`,
            dia: Dia.VIERNES,
            horario: Horario.HORARIO1,
        },
        {
            id: 12,
            nombre: 'Toma de Decisiones Basada en Datos',
            tallerista: 'Dra. Claudia Guadalupe Gómez Santillán',
            descripcion: `Objetivo: Mostrar cómo explotar apropiadamente los datos mediante análisis y visualizacion para dar soporte a la decisión.
Requerimientos:
    Power BI (Software gratuito, requiere estar previamente instalado)]
    Kaggle (plataforma web requiere cuenta, preferentemente previa, pero puede ser durante el taller
    Internet necesario
    Taller por Equipos o Individual.`,
            dia: Dia.VIERNES,
            horario: Horario.HORARIO1,
        },
    ],
})
console.table(
    talleres.map(d => ({
        ...d,
        nombre: d.nombre.substring(0, 40) + '...',
        descripcion: d.descripcion.substring(0, 40) + '...',
    })),
)
