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
} from 'react'

const activeContext = createContext<{
    active: string //state
    setActive: Dispatch<SetStateAction<string>> //setState
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
            onClick={() => context?.setActive(href)}
            data-active={context?.active === href}
        >
            {children}
        </Link>
    )
}

export function Nav() {
    const [active, setActive] = useState('/')
    return (
        <activeContext.Provider value={{ active, setActive }}>
            <nav className="tabs">
                <MenuOption href="/">Página Principal</MenuOption>
                <MenuOption href="/expositores">Expositores</MenuOption>
                <MenuOption href="/talleres">Talleres Día Jueves</MenuOption>
                <MenuOption href="/talleres-viernes">
                    Talleres Día Viernes
                </MenuOption>
                <MenuOption href="/videojuegos">
                    Concurso de Videojuegos
                </MenuOption>
            </nav>
        </activeContext.Provider>
    )
}
