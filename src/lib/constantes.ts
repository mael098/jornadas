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
    TALLER: 37,
}

export const FECHA_DEL_EVENTO: number | string | Date = new Date(
    // la fecha es el 5 de noviembre de 2025 a las 8:00 am horas (CST)
    2025,
    10,
    25,
    0,
    0,
    0, // Año, Mes (0-indexado, por eso 10 = noviembre), Día, Hora, Minuto, Segundo
)
