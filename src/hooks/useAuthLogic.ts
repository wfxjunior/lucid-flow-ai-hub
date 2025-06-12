
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
    // Get current origin for redirect
    return `${window.location.origin}/app`
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
      addError('Por favor, insira um endereço de email válido')
      return
    }

    if (!validatePassword(password)) {
      addError('A senha deve ter pelo menos 6 caracteres')
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
          addError('Email ou senha inválidos. Verifique suas credenciais.')
        } else if (error.message.includes('Email not confirmed')) {
          addError('Por favor, verifique seu email e clique no link de confirmação antes de fazer login.')
        } else {
          addError(error.message)
        }
      } else {
        toast.success('Login realizado com sucesso!')
        navigate('/app')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      addError('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError('Por favor, insira um endereço de email válido')
      return
    }

    if (!validatePassword(password)) {
      addError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      addError('As senhas não coincidem')
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
          addError('Uma conta com este email já existe. Faça login em vez disso.')
        } else {
          addError(error.message)
        }
      } else {
        // Send welcome email after successful signup
        await sendWelcomeEmail(email)
        toast.success('Conta criada! Verifique seu email para confirmação.')
        setMode('signin')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      addError('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    if (!validateEmail(email)) {
      addError('Por favor, insira um endereço de email válido')
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
        toast.success('Email de redefinição de senha enviado! Verifique sua caixa de entrada.')
        setMode('signin')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      addError('Ocorreu um erro inesperado. Tente novamente.')
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
