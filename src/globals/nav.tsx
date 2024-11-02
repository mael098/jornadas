import React, { createContext, ReactElement, useContext, useState } from 'react'

// 1. Crea el contexto
export const GlobalStateContext = createContext('/')

interface GlobalStateProviderProps {
    children: ReactElement
}
export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
    return (
        <GlobalStateContext.Provider value={'/'}>
            {children}
        </GlobalStateContext.Provider>
    )
}

// 3. Hook personalizado para acceder al estado global
export function useGlobalState() {
    return useContext(GlobalStateContext)
}
