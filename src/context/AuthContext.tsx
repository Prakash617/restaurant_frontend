'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Make sure the API_BASE_URL ends with a slash
import { API_BASE_URL } from '@/lib/api/config'
type User = {
  id: number
  username: string
  email: string
  is_staff: boolean
  is_superuser: boolean
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}api/auth/user/`, {
          credentials: 'include',  // send cookies on cross-origin requests
          headers: {
            Accept: 'application/json',
          },
        })

        console.log('Fetch user status:', res.status)

        if (!res.ok) {
          let errorMessage = `Failed to fetch user: ${res.status}`
          try {
            const errorData = await res.json()
            if (errorData.detail) errorMessage += ` - ${errorData.detail}`
          } catch {
            // ignore if no JSON body
          }
          throw new Error(errorMessage)
        }

        const data = await res.json()

        const userData: User = {
          ...data,
          role: data.is_staff ? 'admin' : 'user',
        }

        setUser(userData)
      } catch (error: any) {
        console.error('Error fetching user:', error.message || error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
