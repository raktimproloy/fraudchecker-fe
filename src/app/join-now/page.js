'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PublicLayout from '@/components/Layouts/PublicLayout'
import GoogleLoginButton from '@/components/Common/GoogleLoginButton'
import SuccessMessage from '@/components/Common/SuccessMessage'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const handleGoogleSuccess = (session) => {
    console.log('Google login successful:', session)
    // Show success message
    setError('')
    setSuccessMessage('Welcome! You have successfully signed up and logged in.')
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  const handleGoogleError = (error) => {
    console.error('Google login error:', error)
    setError('Failed to sign in with Google. Please try again.')
  }

  return (
    <PublicLayout>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                আমাদের কমিউনিটিতে যোগ দিন
              </h1>
              <p className="text-xl text-gray-600">
                অ্যাকাউন্ট তৈরি করে প্রতারণার অভিজ্ঞতা শেয়ার করা শুরু করুন এবং অন্যদের রক্ষা করুন।
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                    Get Started
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Sign up quickly and securely with your Google account
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By signing up, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
