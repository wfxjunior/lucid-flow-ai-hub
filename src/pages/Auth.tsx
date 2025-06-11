
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { SignInForm } from '@/components/auth/SignInForm'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { SupabaseConfigGuide } from '@/components/auth/SupabaseConfigGuide'
import { toast } from 'sonner'

type AuthMode = 'signin' | 'signup' | 'forgot-password'

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        navigate('/app')
      }
    }
    checkAuth()
  }, [navigate])

  const clearErrors = () => setErrors([])
  const addError = (error: string) => setErrors(prev => [...prev, error])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const getRedirectUrl = () => {
    // Use custom domain if available, otherwise use current origin
    const customDomain = 'https://featherbiz.com'
    const currentOrigin = window.location.origin
    
    // Check if we're on the custom domain or development
    if (currentOrigin.includes('featherbiz.com')) {
      return `${customDomain}/app`
    }
    return `${currentOrigin}/app`
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    
    if (!validateEmail(email)) {
      addError('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      addError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          addError('Invalid email or password. Please check your credentials.')
        } else if (error.message.includes('Email not confirmed')) {
          addError('Please check your email and click the confirmation link before signing in.')
        } else {
          addError(error.message)
        }
      } else {
        toast.success('Successfully signed in!')
        navigate('/app')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      addError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      addError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      addError('Passwords do not match')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getRedirectUrl()
        }
      })

      if (error) {
        if (error.message.includes('User already registered')) {
          addError('An account with this email already exists. Please sign in instead.')
        } else {
          addError(error.message)
        }
      } else {
        toast.success('Account created! Please check your email for confirmation.')
        setMode('signin')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      addError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError('Please enter a valid email address')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getRedirectUrl()
      })

      if (error) {
        addError(error.message)
      } else {
        toast.success('Password reset email sent! Check your inbox.')
        setMode('signin')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      addError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getAuthContent = () => {
    switch (mode) {
      case 'signin':
        return {
          title: 'Welcome Back',
          description: 'Sign in to your FeatherBiz account',
          form: (
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              errors={errors}
              onSubmit={handleSignIn}
              onForgotPassword={() => setMode('forgot-password')}
              onSwitchToSignUp={() => setMode('signup')}
            />
          )
        }
      case 'signup':
        return {
          title: 'Create Account',
          description: 'Start your free FeatherBiz trial today',
          form: (
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              loading={loading}
              errors={errors}
              onSubmit={handleSignUp}
              onSwitchToSignIn={() => setMode('signin')}
            />
          )
        }
      case 'forgot-password':
        return {
          title: 'Reset Password',
          description: 'Enter your email to receive reset instructions',
          form: (
            <ForgotPasswordForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              errors={errors}
              onSubmit={handleForgotPassword}
              onBackToSignIn={() => setMode('signin')}
            />
          )
        }
    }
  }

  const { title, description, form } = getAuthContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AuthLayout title={title} description={description}>
          {form}
        </AuthLayout>
        <SupabaseConfigGuide />
      </div>
    </div>
  )
}
