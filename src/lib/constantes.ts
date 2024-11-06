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
    'November 7, 2024 09:00:00 GMT-0600',
)
