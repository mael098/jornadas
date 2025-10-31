import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { Contador } from '@/components/Contador'
import { StarField } from '@/components/StarField'
import { CosmicDust } from '@/components/CosmicDust'
import { SpaceAmbient } from '@/components/SpaceAmbient'
import './index.css'

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
            <body className={`antialiased space-theme`}>
                {/* Fondo espacial completo */}
                <StarField />
                <SpaceAmbient />
                <CosmicDust />
                {/* Efecto de nebulosa */}
                <div className="nebula-effect"></div>
                {/* <!-- Encabezado con logos --> */}
                <Header />{' '}
                <main className="flex-1">
                    <div className="container">
                        <div className="text-center mb-8">
                            <h1 className="mb-4">XI JORNADAS TECNOLÓGICAS</h1>
                            <h1 className="mb-6">
                                INGENIERÍA EN SISTEMAS COMPUTACIONALES
                            </h1>
                        </div>

                        {/* <!-- Pestañas de navegación --> */}
                        <div className="mb-8">
                            <Nav />
                        </div>

                        {/* <!-- Contador de tiempo y Mensaje de Evento Iniciado --> */}
                        <div className="mb-8">
                            <Contador />
                        </div>

                        {/* Contenido Principal de la Pagina */}
                        <div className="content-area">{children}</div>
                    </div>
                </main>
                {/* <!-- Contenido existente... --> */}
                {/* <!-- Pie de página --> */}
                <Footer />
            </body>
        </html>
    )
}
