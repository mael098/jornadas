export type TalleresHorario1 = keyof typeof TALLERES_HORARIO1
export const TALLERES_HORARIO1 = {
    Taller_1: 'Consultas avanzadas de MySQL con PhpMyAdmin',
    Taller_2:
        'Desarrollo de Software Empresarial sin Código con Power Platform:',
    Taller_3: 'Arduino',
}

export type TalleresHorario2 = keyof typeof TALLERES_HORARIO2
export const TALLERES_HORARIO2 = {
    Taller_4: 'Estructuras HTML con hojas de estilo de JavaScript',
    Taller_5: 'CiberSeguridad',
    Taller_6: 'PENDIENTE',
}

export type TalleresHorario3 = keyof typeof TALLERES_HORARIO3
export const TALLERES_HORARIO3 = {
    Taller_7: 'Estructuras HTML con hojas de estilo de JavaScript:',
    Taller_8:
        'Análisis, diseño e implementación de estructura de datos lineales en java',
    Taller_9: 'PENDIENTE',
}

export type TalleresViernes = keyof typeof TALLERES_VIERNES
export const TALLERES_VIERNES = {
    Taller_1:
        'Taller 1: Desarrollo de Software Empresarial sin Código con Power Platform',
    Taller_2: 'Creando mi Propio Agente',
    Taller_3: 'Toma de Decisiones Basada en Datos',
}

export type Juegos = keyof typeof JUEGOS
export const JUEGOS = {
    Juego_1: 'FIFA',
    Juego_2: 'Super Smash Bros',
    Juego_3: 'Mario Kart',
}

export const HEADERS = {
    PATHNAME: 'pathname',
}

export const COOKIES = {
    SESSION: 'jornadas_session',
}

export const LIMITE_DE_SUSCRIPCION = {
    TALLER: 36,
}

export const FECHA_DEL_EVENTO: number | string | Date = new Date(
    'November 7, 2024 09:00:00 GMT-0600',
)
