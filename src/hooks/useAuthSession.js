'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export const useAuthSession = () => {
  const { data: session, status } = useSession()
  const { user, isAuthenticated, login, logout, signup } = useAuth()

  // Sync NextAuth session with AuthContext
  useEffect(() => {
    if (status === 'authenticated' && session) {
      // User is authenticated with NextAuth
      const userData = {
        id: session.user.id || session.user.email,
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
        role: 'user',
        accessToken: session.accessToken
      }

      // Update AuthContext
      login(userData.email, '', false)
    } else if (status === 'unauthenticated') {
      // User is not authenticated
      logout()
    }
  }, [session, status, login, logout])

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
