// context/UserContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { decodeToken, DecodedToken } from "@/lib/jwt"

type UserContextType = {
  user: DecodedToken | null
  setUser: (user: DecodedToken | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    console.log('[UserProvider] Token from sessionStorage:', token)
    
    if (token) {
      const decoded = decodeToken(token)
      console.log('[UserProvider] Decoded token:', decoded)
      if (decoded) setUser(decoded)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
