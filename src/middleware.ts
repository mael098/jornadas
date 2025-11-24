import { NextRequest, NextResponse } from 'next/server'
import { HEADERS } from './lib/constantes'

function injectPathname(request: NextRequest, response: NextResponse) {
    response.headers.set(HEADERS.PATHNAME, request.nextUrl.pathname)
    return response
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Si intenta acceder a /mi-ultimo-commit, verificar si es el estudiante especial
    if (pathname === '/mi-ultimo-commit') {
        const numeroControl = request.cookies.get(
            'numero_control_registrado',
        )?.value

        // Si es el estudiante 22820090, redirigir a /mensaje-especial
        if (numeroControl === '22820090') {
            return NextResponse.redirect(
                new URL('/mensaje-especial', request.url),
            )
        }
    }

    const next = () => injectPathname(request, NextResponse.next())
    return next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
