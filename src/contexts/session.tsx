'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react'

export type SessionCookie = {
    numero_control: string
}
export const sessionContext = createContext<{
    session: SessionCookie | null
    setSession: Dispatch<SetStateAction<SessionCookie | null>>
} | null>(null)

interface SessionContexProviderProps {
    children: ReactNode
}
export const SessionContexProvider = ({
    children,
}: SessionContexProviderProps) => {
    const [session, setSession] = useState<SessionCookie | null>(null)
    return (
        <sessionContext.Provider value={{ session, setSession }}>
            {children}
        </sessionContext.Provider>
    )
}
