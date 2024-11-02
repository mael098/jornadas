'use client'
// CSS
import './nav.css'

import Link from 'next/link'
import { useEffect, useState, MouseEvent, ReactElement } from 'react'
import { useRouter } from 'next/compat/router'

interface MenuOptionProps {
    children: ReactElement
    href: string
}
export function MenuOption({ children, href }: MenuOptionProps) {
    const [active, setActive] = useState(false)
    return (
        <Link href={'/'} onClick={e => setActive(true)} data-active={active}>
            {children}
        </Link>
    )
}

export function Nav() {
    const [route, setRoute] = useState('/')
    const setListener =
        (route: string) => (e: MouseEvent<HTMLAnchorElement>) => {
            setRoute(route)
        }
    return (
        <nav className="tabs">
            <Link
                onClick={setListener('/')}
                href={'/'}
                data-active={route === '/'}
            >
                Página Principal
            </Link>
            <Link
                onClick={setListener('/expositores')}
                href={'/expositores'}
                data-active={route === '/'}
            >
                Expositores
            </Link>
            <Link
                onClick={setListener('/talleres')}
                href={'/talleres'}
                data-active={route === '/'}
            >
                Talleres Día Jueves
            </Link>
            <Link
                onClick={setListener('/talleres-viernes')}
                href={'/talleres-viernes'}
                data-active={route === '/'}
            >
                Talleres Día Viernes
            </Link>
            {/* <!-- Nueva pestaña --> */}
            <Link
                onClick={setListener('/videojuegos')}
                href={'/videojuegos'}
                data-active={route === '/'}
            >
                Concurso de Videojuegos
            </Link>
            {/* <!-- Nueva pestaña --> */}
        </nav>
    )
}
