"use client"
import { Session, User } from 'lucia'
import React, { createContext, useContext } from 'react'

 



interface SessionProviderProps {
    user: User | null
    session: Session | null
}

const SessionContext = createContext<SessionProviderProps>(
    {} as SessionProviderProps
)

const SessionProvider = ({children, value}: { children: React.ReactNode, value: SessionProviderProps}) => {
  return (
    <SessionContext.Provider value={value}>
        {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider

export const useSession = () => {
    const sessionContext = useContext(SessionContext)

    if(!sessionContext) {
        throw new Error ("useSession must me within a SessionProvider")
    }

    return sessionContext
}