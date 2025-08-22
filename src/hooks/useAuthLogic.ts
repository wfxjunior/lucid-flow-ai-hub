
import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthState } from './useAuthState'
import { useAuthValidation } from './useAuthValidation'
import { securityEvent } from '@/utils/security'
import { secureSignIn, secureSignOut } from '@/utils/authSecurity'

export function useAuthLogic() {
  const { user, session, loading } = useAuthState()
  const { validateForm } = useAuthValidation()
  
  // Form state
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot-password'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const isInitialized = !loading

  const signOut = useCallback(async () => {
    try {
      await secureSignOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      return await secureSignIn(email, password)
    } catch (error) {
      throw error
    }
  }, [])

  const handleSignIn = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(email, password, undefined, false, false)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setErrors([])
      await signIn(email, password)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      setErrors([errorMessage])
    }
  }, [email, password, validateForm, signIn])

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(email, password, confirmPassword, true, false)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setErrors([])
      securityEvent('Sign up attempt', { email })

      const redirectUrl = `${window.location.origin}/`
      
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      })

      if (error) {
        securityEvent('Sign up failed', { email, error: error.message })
        throw error
      }

      securityEvent('Sign up successful', { email })
      setErrors(['Please check your email to confirm your account'])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      setErrors([errorMessage])
    }
  }, [email, password, confirmPassword, validateForm])

  const handleForgotPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(email, '', undefined, false, true)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setErrors([])
      securityEvent('Password reset attempt', { email })

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`
      })

      if (error) {
        securityEvent('Password reset failed', { email, error: error.message })
        throw error
      }

      securityEvent('Password reset successful', { email })
      setErrors(['Please check your email for password reset instructions'])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed'
      setErrors([errorMessage])
    }
  }, [email, validateForm])

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setErrors([])
      securityEvent('Google sign in attempt')

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })

      if (error) {
        securityEvent('Google sign in failed', { error: error.message })
        throw error
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign in failed'
      setErrors([errorMessage])
    }
  }, [])

  return {
    user,
    session,
    loading,
    isInitialized,
    signIn,
    signOut,
    // Form state
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    selectedCountry,
    setSelectedCountry,
    // Handlers
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
    handleGoogleSignIn
  }
}
