import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { Contador } from '@/components/Contador'
import './index.css'
import { SessionContexProvider } from '@/contexts/session'

export const metadata: Metadata = {
    title: 'Jornadas Sistemas 2024 - ITA',
    description:
        'Decima primera jornadas de sistemas del Instituto Tecnologico de Altamira',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <SessionContexProvider>
                    <>
                        {/* <!-- Encabezado con logos --> */}
                        <Header />

                        <div className="container">
                            <h1>XI JORNADAS TECNOLÓGICAS</h1>
                            <h1>INGENIERÍA EN SISTEMAS COMPUTACIONALES</h1>
                            {/* <!-- Pestañas de navegación --> */}
                            <Nav />
                            {/* <!-- Contador de tiempo y Mensaje de Evento Iniciado --> */}
                            <Contador />

                            {/* Contenido Principal de la Pagina */}
                            {children}
                        </div>
                        {/* <!-- Contenido existente... --> */}

                        {/* <!-- Pie de página --> */}
                        <Footer />
                    </>
                </SessionContexProvider>
            </body>
        </html>
    )
}
