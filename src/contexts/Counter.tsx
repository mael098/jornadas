'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react'

export const counterContext = createContext<{
    counterSignal: number
    sendCounterSignal: () => void
}>({
    counterSignal: 0,
    sendCounterSignal: () => void 0,
})

interface CounterContexProviderProps {
    children: ReactNode
}
export function CounterContexProvider({
    children,
}: CounterContexProviderProps) {
    const [counterSignal, setCounterSignal] = useState<number>(0)
    const sendCounterSignal = () => setCounterSignal(Math.random)
    return (
        <counterContext.Provider value={{ counterSignal, sendCounterSignal }}>
            {children}
        </counterContext.Provider>
    )
}
