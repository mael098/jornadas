import Image from 'next/image'
import Link from 'next/link'

// Estilos
import './footer.css'

// Imagenes
import githubLogo from '@/Logos/github.png'

export function Footer() {
    return (
        <footer className="bg-linear-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <h3 className="text-center text-lg md:text-xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Desarrollado por
                </h3>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-linear-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-4 border-2 border-blue-400/40 shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link
                                href="https://github.com/mael098"
                                target="_blank"
                                className="shrink-0 hover:scale-110 transition-transform"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-lg animate-pulse"></div>
                                    <Image
                                        src={githubLogo}
                                        alt="mael098"
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 relative z-10 opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </Link>
                            <div className="text-center sm:text-left flex-1">
                                <div className="flex flex-col items-center sm:items-start gap-1 mb-1">
                                    <p className="font-black text-white text-base">
                                        Iván Asdrúbal Villegas Espinosa
                                    </p>
                                    <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-xs font-bold rounded-full border border-blue-400/50 whitespace-nowrap">
                                        LEAD DEVELOPER
                                    </span>
                                </div>
                                <p className="text-white/70 text-xs mb-1">
                                    7° Semestre - Ing. en Sistemas
                                    Computacionales
                                </p>
                                <p className="text-blue-200/80 text-xs mb-2 italic">
                                    💻 Arquitectura, desarrollo full-stack y
                                    diseño de la plataforma de Jornadas 2025
                                </p>
                                <Link
                                    href="https://github.com/mael098"
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition-all"
                                >
                                    <span className="font-semibold">
                                        @mael098
                                    </span>
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <p className="text-white/50 text-xs">
                        © {new Date().getFullYear()} Jornadas TecNM - Instituto
                        Tecnológico de Acapulco
                    </p>
                </div>
            </div>
        </footer>
    )
}
