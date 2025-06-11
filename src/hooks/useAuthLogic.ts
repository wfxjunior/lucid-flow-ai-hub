import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type AuthMode = 'signin' | 'signup' | 'forgot-password'

export function useAuthLogic() {
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
    // Always use featherbiz.com for production redirects
    const currentDomain = window.location.hostname
    
    if (currentDomain === 'featherbiz.com') {
      return 'https://featherbiz.com/app'
    } else {
      // For development or other domains, use the current origin
      return `${window.location.origin}/app`
    }
  }

  const sendWelcomeEmail = async (email: string) => {
    try {
      await supabase.functions.invoke('send-welcome-email', {
        body: { email }
      })
    } catch (error) {
      console.error('Error sending welcome email:', error)
    }
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
        // Send welcome email after successful signup
        await sendWelcomeEmail(email)
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

  return {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    errors,
    handleSignIn,
    handleSignUp,
    handleForgotPassword
  }
}
