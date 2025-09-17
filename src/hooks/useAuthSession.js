'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useRef } from 'react'

export const useAuthSession = () => {
  const { data: session, status } = useSession()
  const { user, isAuthenticated, login, logout, signup } = useAuth()
  const hasSynced = useRef(false)

  // Sync NextAuth session with AuthContext (only once)
  useEffect(() => {
    if (status === 'authenticated' && session && !hasSynced.current) {
      // User is authenticated with NextAuth - just store the data locally
      const userData = {
        id: session.user.id || session.user.email,
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
        role: 'user',
        accessToken: session.accessToken
      }
      
      // Store token in localStorage for API calls
      if (session.accessToken) {
        localStorage.setItem('accessToken', session.accessToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('isAdmin', 'false')
      }
      
      hasSynced.current = true
    } else if (status === 'unauthenticated' && hasSynced.current) {
      // User is not authenticated
      logout()
      hasSynced.current = false
    }
  }, [session, status, logout])

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { redirect: false })
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      logout()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user: isAuthenticated ? user : null,
    isAuthenticated,
    isLoading: status === 'loading',
    isAdmin: user?.role === 'admin',
    handleGoogleLogin,
    handleLogout,
    session
  }
}
