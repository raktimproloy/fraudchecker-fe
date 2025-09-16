// Environment configuration for the frontend
const config = {
  // NextAuth Configuration
  nextAuth: {
    url: process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || 'your-nextauth-secret-key-here',
  },
  
  // Google OAuth Configuration
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id-here',
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || 'your-google-client-secret-here',
  },
  
  // Backend API URL
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
}

export default config
