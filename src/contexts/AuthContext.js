'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session, status } = useSession();

  // Sync with NextAuth session
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
      };

      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(false);
      setIsLoading(false);
      
      // Store token in localStorage for API calls
      if (session.accessToken) {
        localStorage.setItem('accessToken', session.accessToken);
      }
    } else if (status === 'unauthenticated') {
      // User is not authenticated
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsLoading(false);
      
      // Clear token from localStorage
      localStorage.removeItem('accessToken');
    } else if (status === 'loading') {
      setIsLoading(true);
    }
  }, [session, status]);

  useEffect(() => {
    // Check for existing authentication on app load (fallback)
    if (status === 'unauthenticated') {
      const checkAuth = () => {
        try {
          const storedUser = localStorage.getItem('user');
          const storedAuth = localStorage.getItem('isAuthenticated');
          const storedAdmin = localStorage.getItem('isAdmin');
          const storedToken = localStorage.getItem('accessToken');
          
          if (storedUser && storedAuth === 'true' && storedToken) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            setIsAdmin(storedAdmin === 'true');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }
  }, [status]);

  const login = async (email, password, isAdminUser = false) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${isAdminUser ? 'admin/login' : 'google'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(isAdminUser ? {} : { googleId: email, name: email.split('@')[0] })
        }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.user?.user_id || data.admin?.admin_id || email,
          email: data.user?.email || data.admin?.username || email,
          name: data.user?.name || data.admin?.username || email.split('@')[0],
          avatar: data.user?.profile_picture || null,
          role: isAdminUser ? 'admin' : 'user',
          accessToken: data.accessToken
        };

        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(isAdminUser);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', isAdminUser.toString());
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  };

  const signup = async (email, password, name) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId: email,
          name: name,
          email: email,
          profilePicture: null
        }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.user?.user_id || email,
          email: data.user?.email || email,
          name: data.user?.name || name,
          avatar: data.user?.profile_picture || null,
          role: 'user',
          accessToken: data.accessToken
        };

        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(false);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'false');
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: data.error || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
