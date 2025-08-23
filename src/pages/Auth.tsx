
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    try {
      if (mode === 'signin') {
        if (password) {
          // Sign in with password
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          if (error) throw error
        } else {
          // Sign in with magic link
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: window.location.origin
            }
          })
          if (error) throw error
          toast.success('Check your email for the login link!')
        }
      } else {
        // Sign up
        if (!password) {
          toast.error('Password is required for sign up')
          return
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        })
        if (error) throw error
        toast.success('Check your email to confirm your account!')
      }
    } catch (error: any) {
      console.error('Email auth error:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-20">
        <img 
          src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
          alt="FeatherBiz" 
          className="h-16 w-auto"
          style={{ width: '64px', height: '102px', objectFit: 'contain' }}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-normal text-gray-900 mb-8">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>
          
          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-12 border border-gray-200 hover:bg-gray-50 text-gray-700 font-normal rounded-lg mb-8 flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
          </Button>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:border-gray-300 focus:ring-0"
              required
            />
          </div>

          {(showPasswordForm || mode === 'signup') && (
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-12 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 bg-white focus:border-gray-300 focus:ring-0"
                required={mode === 'signup'}
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            disabled={loading || !email}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </form>

        {mode === 'signin' && !showPasswordForm && (
          <div className="text-center mt-6">
            <Button
              variant="link"
              onClick={() => setShowPasswordForm(true)}
              className="text-sm text-gray-500 hover:text-gray-700 p-0 h-auto font-normal"
            >
              Sign in with password instead
            </Button>
          </div>
        )}

        {/* Toggle between signin and signup */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin')
                setShowPasswordForm(false)
                setPassword('')
              }}
              className="text-sm text-gray-900 hover:text-gray-700 font-normal p-0 h-auto underline"
            >
              {mode === 'signin' ? 'Create account' : 'Sign in'}
            </Button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 text-center max-w-md">
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          By proceeding you acknowledge that you have read, understood and agree to our{' '}
          <a href="/terms-and-conditions" className="text-gray-600 underline hover:text-gray-800">
            Terms and Conditions
          </a>
          .
        </p>
        
        <div className="flex items-center justify-center space-x-8 text-xs text-gray-400">
          <span>© 2025 FeatherBiz</span>
          <a href="/privacy-policy" className="hover:text-gray-600 underline">Privacy Policy</a>
          <a href="/support" className="hover:text-gray-600 underline">Support</a>
        </div>
      </div>
    </div>
  )
}
