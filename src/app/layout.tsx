import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { Contador } from '@/components/Contador'
import { StarField } from '@/components/StarField'
import { CosmicDust } from '@/components/CosmicDust'
import { SpaceAmbient } from '@/components/SpaceAmbient'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './index.css'

export const metadata: Metadata = {
    title: 'Jornadas Sistemas 2024 - ITA',
    description:
        'Decima primera jornadas de sistemas del Instituto Tecnologico de Altamira',
    openGraph: {
        title: 'XI Jornadas Tecnológicas - ISC',
        description: 'Instituto Tecnológico de Altamira',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={`antialiased space-theme`}>
                {/* Fondo espacial completo */}
                <StarField />
                <SpaceAmbient />
                <CosmicDust />
                {/* Efecto de nebulosa */}
                <div className="nebula-effect"></div>

                {/* <!-- Encabezado con logos --> */}
                <Header />

                <main className="flex-1 flex flex-col py-6 px-4 sm:px-6 lg:px-8">
                    <div className="container">
                        {/* Títulos principales */}
                        <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
                            <h1 className="mb-2 sm:mb-3 lg:mb-4">
                                XI JORNADAS TECNOLÓGICAS
                            </h1>
                            <h1 className="mb-3 sm:mb-4 lg:mb-6">
                                INGENIERÍA EN SISTEMAS COMPUTACIONALES
                            </h1>
                        </div>

                        {/* <!-- Navegación --> */}
                        <div className="mb-4 sm:mb-6 lg:mb-8">
                            <Nav />
                        </div>

                        {/* <!-- Contador de tiempo --> */}
                        <div className="mb-4 sm:mb-6 lg:mb-8">
                            <Contador />
                        </div>

                        {/* Contenido Principal de la Pagina */}
                        <div className="content-area">
                            <SpeedInsights />
                            {children}
                        </div>
                    </div>
                </main>

                {/* <!-- Pie de página --> */}
                <Footer />
            </body>
        </html>
    )
}
