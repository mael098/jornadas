'use client'
// CSS
import './nav.css'

import Link from 'next/link'
import {
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    ReactNode,
    useEffect,
} from 'react'

const activeContext = createContext<{
    active: string //state
    setActive: Dispatch<SetStateAction<string>> //setState
    closeMenu?: () => void
} | null>(null)

interface MenuOptionProps {
    children: ReactNode
    href: string
}
export function MenuOption({ children, href }: MenuOptionProps) {
    const context = useContext(activeContext)

    return (
        <Link
            href={href}
            onClick={() => {
                context?.setActive(href)
                context?.closeMenu?.()
            }}
            data-active={context?.active === href}
        >
            {children}
        </Link>
    )
}

export function Nav() {
    const [active, setActive] = useState('/')
    const [displayMenu, setDisplayMenu] = useState(false)

    const closeMenu = () => setDisplayMenu(false)
    const toggleMenu = () => setDisplayMenu(!displayMenu)

    // Cerrar menú al presionar Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && displayMenu) {
                closeMenu()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [displayMenu])

    // Prevenir scroll cuando el menú está abierto en móvil
    useEffect(() => {
        if (displayMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [displayMenu])

    return (
        <activeContext.Provider value={{ active, setActive, closeMenu }}>
            <div className="nav-wrapper">
                {/* Botón hamburguesa para móvil */}
                <button
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={displayMenu}
                >
                    <div
                        className={`hamburger-icon ${displayMenu ? 'open' : ''}`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Overlay oscuro cuando el menú está abierto en móvil */}
                {displayMenu && (
                    <div className="menu-overlay" onClick={closeMenu}></div>
                )}

                {/* Menú de navegación */}
                <nav className={`tabs ${displayMenu ? 'menu-open' : ''}`}>
                    <MenuOption href="/">Página Principal</MenuOption>
                    <MenuOption href="/expositores">Expositores</MenuOption>
                    {/* <MenuOption href="/talleres">Talleres Día Jueves</MenuOption> */}
                    <MenuOption href="/talleres-martes">
                        Talleres Día martes
                    </MenuOption>
                    <MenuOption href="/videojuegos">
                        Concurso de Videojuegos
                    </MenuOption>
                    <MenuOption href="/mi-tarjeta">Mi Tarjeta</MenuOption>
                    <MenuOption href="/mi-ultimo-commit">
                        Mi Último Commit
                    </MenuOption>
                    {/* <MenuOption href="/tarjeta">Tarjetas Digitales</MenuOption> */}
                    {/* <MenuOption href="/tarjeta-usuario">Mi Pase Digital</MenuOption> */}
                    {/* <MenuOption href="/tarjeta-3d">Tarjetas 3D</MenuOption> */}
                </nav>
            </div>
        </activeContext.Provider>
    )
}
