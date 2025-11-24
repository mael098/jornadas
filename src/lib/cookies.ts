// Utilidades para manejar cookies en el cliente

export function obtenerNumeroControl(): string | null {
    if (typeof document === 'undefined') return null

    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=')
        if (key === 'numero_control_registrado') {
            return decodeURIComponent(value)
        }
    }
    return null
}

export function limpiarNumeroControl(): void {
    if (typeof document === 'undefined') return
    document.cookie =
        'numero_control_registrado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
