
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
    } catch (error: any) {
      console.error('Google sign in error:', error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    try {
      // First try to sign in
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      
      if (signInError) throw signInError
      
      toast.success('Check your email for the login link!')
    } catch (error: any) {
      console.error('Email auth error:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-16">
        <h1 className="text-2xl font-semibold text-black">FeatherBiz</h1>
      </div>

      {/* Sign in form */}
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Sign in</h2>
        </div>

        {!showEmailForm ? (
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12 border border-gray-300 hover:bg-gray-50 text-gray-700 font-normal rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <Input
                type="email"
                placeholder="Enter your work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
                onFocus={() => setShowEmailForm(true)}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailContinue} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <Input
                type="email"
                placeholder="Enter your work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
                required
                autoFocus
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              disabled={loading || !email}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        )}

        {!showEmailForm && (
          <Button 
            onClick={() => setShowEmailForm(true)}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center space-y-4">
        <p className="text-sm text-gray-500 max-w-sm">
          By proceeding you acknowledge that you have read, understood and agree to our{' '}
          <a href="#" className="text-gray-900 underline hover:no-underline">
            Terms and Conditions
          </a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 underline hover:no-underline">
            Privacy Policy
          </a>
          .
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <span>© 2025 FeatherBiz</span>
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Support</a>
        </div>
      </div>
    </div>
  )
}
