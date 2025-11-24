import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

await db.talleres.deleteMany()

// const talleres = await db.talleres.createManyAndReturn({
//     data: [
//         {
//             id: 1,
//             nombre: 'Taller "De Datos a Decisiones: Dashboards Inteligentes con Python, Shiny e IA Generativa"',
//             tallerista: 'Dra. Claudia Guadalupe Gómez Santillán',
//             descripcion: `Este taller enseñará a los participantes a construir dashboards interactivos utilizando Python y Shiny, integrando técnicas de inteligencia artificial generativa para crear visualizaciones dinámicas y análisis predictivos. Los asistentes aprenderán a transformar datos crudos en información valiosa mediante herramientas modernas de visualización, combinando el poder del análisis de datos con interfaces intuitivas. Se cubrirán aspectos desde la preparación de datos, creación de gráficos interactivos, hasta la implementación de modelos de IA generativa para enriquecer los dashboards con insights automatizados.
// Requerimientos:
//     Equipo de cómputo
//     Python instalado
//     IDE (PyCharm, VS Code o similar)
//     Internet`,
//             horario: '11:30 AM - 1:30 PM',
//         },
//         {
//             id: 2,
//             nombre: 'Taller "El secreto para respuestas precisas: RAG, una técnica para aumentar el conocimiento de las IA generativas"',
//             tallerista: 'Mtro. Manuel Paz Robles',
//             descripcion: `En este taller exploraremos la técnica de Retrieval-Augmented Generation (RAG), un método innovador que combina la recuperación de información con la generación de texto mediante IA. Los participantes aprenderán cómo RAG mejora significativamente la precisión y relevancia de las respuestas generadas por modelos de lenguaje, permitiendo que estos accedan a bases de conocimiento externas en tiempo real. A través de ejemplos prácticos, se demostrará cómo implementar RAG para crear sistemas de IA más confiables y contextuales, ideales para aplicaciones empresariales, asistentes virtuales y motores de búsqueda inteligentes.
// Requerimientos:
//     Equipo de cómputo
//     Python instalado
//     Cuenta en OpenAI o similar
//     Internet`,
//             horario: '11:30 AM - 1:30 PM',
//         },
//         {
//             id: 3,
//             nombre: 'Taller "Prompting para generación de imágenes"',
//             tallerista: 'Mtro. Cristhian Emanuel Espinosa Snowball',
//             descripcion: `Este taller se enfoca en enseñar a los participantes las mejores prácticas para crear prompts efectivos que generen imágenes de alta calidad utilizando modelos de inteligencia artificial generativa como DALL-E, Midjourney o Stable Diffusion. Los asistentes aprenderán técnicas de prompt engineering específicas para arte digital, incluyendo cómo describir estilos artísticos, composiciones, iluminación y detalles técnicos. Se explorarán estrategias para optimizar los resultados, iterar sobre los prompts y entender cómo diferentes parámetros afectan la imagen final, permitiendo a los participantes dominar el arte de la generación de imágenes mediante IA.
// Requerimientos:
//     Equipo de cómputo
//     Cuenta en plataforma de generación de imágenes (Midjourney, DALL-E, etc.)
//     Internet`,
//             horario: '11:30 AM - 1:30 PM',
//         },
//     ],
// })
// console.table(
//     talleres.map(d => ({
//         ...d,
//         nombre: d.nombre.substring(0, 40) + '...',
//         descripcion: d.descripcion.substring(0, 40) + '...',
//     })),
// )
