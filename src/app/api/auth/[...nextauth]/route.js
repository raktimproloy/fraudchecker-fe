import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import config from '@/config/environment'

const handler = NextAuth({
  secret: config.nextAuth.secret,
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Send user data to your backend API
      try {
        const response = await fetch(`${config.apiUrl}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            googleId: user.id,
            name: user.name,
            email: user.email,
            profilePicture: user.image,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          // Store the access token in the session
          user.accessToken = data.accessToken
          return true
        }
        return false
      } catch (error) {
        console.error('Error during sign in:', error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/signup',
    error: '/signup',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
