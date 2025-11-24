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
    // Crear una fecha que sea exactamente 1 día y 10 horas desde ahora
    const ahora = new Date()
    const fecha = new Date(ahora.getTime() + (1 * 24 + 10) * 60 * 60 * 1000) // 1 día + 10 horas
    return fecha
})()
