import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { cleanupAuthState, secureSignIn, secureSignOut, logSecurityEvent } from '@/utils/authSecurity'
import { validateEmail as validateEmailUtil, checkClientRateLimit } from '@/utils/inputValidation'

type AuthMode = 'signin' | 'signup' | 'forgot-password'

export function useAuthLogic() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already authenticated, but only after component mounts
    const checkAuth = async () => {
      try {
        // Use getSession instead of getUser to avoid auth errors
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          console.log('User already authenticated, redirecting to home')
          // Use setTimeout to prevent immediate navigation issues
          setTimeout(() => {
            navigate('/')
          }, 100)
        }
      } catch (error) {
        // Silently handle auth check errors on login page
        console.log('Auth check on login page:', error.message)
      }
    }
    
    // Delay the auth check to prevent module loading issues
    const timer = setTimeout(() => {
      checkAuth()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [navigate])

  const clearErrors = () => setErrors([])
  const addError = (error: string) => setErrors(prev => [...prev, error])

  const validateEmail = (email: string) => {
    const validation = validateEmailUtil(email)
    return validation.isValid
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const getRedirectUrl = () => {
    return `${window.location.origin}/`
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

  const getLocalizedMessage = (key: string) => {
    if (selectedCountry === 'br') {
      const messages = {
        'invalid_email': 'Por favor, insira um endereço de email válido',
        'weak_password': 'A senha deve ter pelo menos 6 caracteres',
        'invalid_credentials': 'Email ou senha inválidos. Verifique suas credenciais.',
        'email_not_confirmed': 'Por favor, verifique seu email e clique no link de confirmação antes de fazer login.',
        'password_mismatch': 'As senhas não coincidem',
        'user_exists': 'Uma conta com este email já existe. Faça login em vez disso.',
        'unexpected_error': 'Ocorreu um erro inesperado. Tente novamente.',
        'signin_success': 'Login realizado com sucesso!',
        'signup_success': 'Conta criada! Verifique seu email para confirmação.',
        'reset_sent': 'Email de redefinição de senha enviado! Verifique sua caixa de entrada.'
      }
      return messages[key] || key
    }
    
    const messages = {
      'invalid_email': 'Please enter a valid email address',
      'weak_password': 'Password must be at least 6 characters long',
      'invalid_credentials': 'Invalid email or password. Please check your credentials.',
      'email_not_confirmed': 'Please check your email and click the confirmation link before signing in.',
      'password_mismatch': 'Passwords do not match',
      'user_exists': 'An account with this email already exists. Please sign in instead.',
      'unexpected_error': 'An unexpected error occurred. Please try again.',
      'signin_success': 'Successfully signed in!',
      'signup_success': 'Account created! Please check your email for confirmation.',
      'reset_sent': 'Password reset email sent! Please check your inbox.'
    }
    return messages[key] || key
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    
    if (!email.trim()) {
      addError('Email is required')
      return
    }

    if (!password.trim()) {
      addError('Password is required')
      return
    }

    setLoading(true)
    
    try {
      // Check rate limit
      if (!checkClientRateLimit('signin', 5, 300000)) { // 5 attempts per 5 minutes
        addError('Too many sign-in attempts. Please try again in a few minutes.')
        return
      }
      
      console.log('Attempting sign in with:', email)
      logSecurityEvent('signin_attempt', { email })
      
      // Use secure sign in function
      const data = await secureSignIn(email, password)

      console.log('Sign in response:', { 
        user: data?.user?.id, 
        session: !!data?.session
      })

      if (data.user) {
        console.log('Sign in successful, user:', data.user)
        logSecurityEvent('signin_success', { email })
        toast.success('Successfully signed in!')
        // secureSignIn already handles the redirect
      }
    } catch (error: any) {
      console.error('Unexpected sign in error:', error)
      addError('Unexpected error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError(getLocalizedMessage('invalid_email'))
      return
    }

    if (!validatePassword(password)) {
      addError(getLocalizedMessage('weak_password'))
      return
    }

    if (password !== confirmPassword) {
      addError(getLocalizedMessage('password_mismatch'))
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
          addError(getLocalizedMessage('user_exists'))
        } else {
          addError(error.message)
        }
      } else {
        await sendWelcomeEmail(email)
        toast.success(getLocalizedMessage('signup_success'))
        setMode('signin')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      addError(getLocalizedMessage('unexpected_error'))
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError(getLocalizedMessage('invalid_email'))
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
        toast.success(getLocalizedMessage('reset_sent'))
        setMode('signin')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      addError(getLocalizedMessage('unexpected_error'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    clearErrors()
    
    try {
      console.log('Attempting Google sign in')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getRedirectUrl()
        }
      })

      if (error) {
        console.error('Google sign in error:', error)
        addError(`Google sign in error: ${error.message}`)
      }
      // Note: For OAuth, the user will be redirected and we won't reach this point
    } catch (error: any) {
      console.error('Unexpected Google sign in error:', error)
      addError('Unexpected Google sign in error. Please try again.')
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
    selectedCountry,
    setSelectedCountry,
    handleSignIn,
    handleGoogleSignIn,
    handleSignUp,
    handleForgotPassword
  }
}
