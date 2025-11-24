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

export const FECHA_DEL_EVENTO: number | string | Date = (() => {
    // Evento: 25 de noviembre de 2025 a las 8:30
    const fecha = new Date(2025, 10, 25, 8, 30, 0) // mes es 0-indexed, por eso 10 = noviembre
    return fecha
})()
