export type Juegos = keyof typeof JUEGOS
export const JUEGOS = {
    Juego_1: 'KOF 2002',
    Juego_2: 'Smash',
    Juego_3: 'Minecraft',
}

export const HEADERS = {
    PATHNAME: 'pathname',
}

export const COOKIES = {
    SESSION: 'jornadas_session',
}

export const LIMITE_DE_SUSCRIPCION = {
    TALLER: 37,
}

export const FECHA_DEL_EVENTO: number | string | Date = new Date(
    // la fecha es el 25 de noviembre de 2025 a las 8:00 am horas (CST)
    // CST es UTC-6, así que 8:00 AM CST = 14:00 UTC
    2025,
    10,
    25,
    14,
    0,
    0, // Año, Mes (0-indexado, por eso 10 = noviembre), Día, Hora (UTC), Minuto, Segundo
)
