
import React, { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { AuthLayout } from '@/components/auth/AuthLayout'
import { SignInForm } from '@/components/auth/SignInForm'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { useAuthValidation } from '@/hooks/useAuthValidation'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { validateForm } = useAuthValidation()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/dashboard')
      }
    }
    checkAuth()
  }, [navigate])

  const cleanupAuthState = () => {
    // Clear any existing auth state
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key)
      }
    })
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm(email, password, confirmPassword, !isLogin)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    setErrors([])

    try {
      if (isLogin) {
        // Clean up any existing state before login
        cleanupAuthState()
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        })
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password')
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please confirm your email before logging in')
          } else {
            throw new Error(error.message)
          }
        }
        
        toast({
          title: "Success",
          description: "Login successful"
        })
        
        // Force page refresh for clean state
        window.location.href = '/dashboard'
        
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        })
        
        if (error) {
          if (error.message.includes('User already registered')) {
            throw new Error('This email is already registered. Try logging in.')
          } else {
            throw new Error(error.message)
          }
        }
        
        toast({
          title: "Account created successfully!",
          description: "Check your email to confirm your account before logging in."
        })
        
        // Switch to login mode after successful signup
        setIsLogin(true)
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      setErrors([error.message])
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm(email, '', '', false, true)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    setErrors([])
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?type=recovery`
      })
      
      if (error) {
        throw error
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password"
      })
      
      setShowForgotPassword(false)
    } catch (error: any) {
      console.error('Password reset error:', error)
      setErrors([error.message])
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchMode = () => {
    setIsLogin(!isLogin)
    setErrors([])
    setPassword('')
    setConfirmPassword('')
    setShowForgotPassword(false)
  }

  const handleBackToSignIn = () => {
    setShowForgotPassword(false)
    setErrors([])
  }

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true)
    setErrors([])
  }

  if (showForgotPassword) {
    return (
      <AuthLayout 
        title="Reset Password" 
        description="Enter your email address and we'll send you a link to reset your password"
      >
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          errors={errors}
          onSubmit={handleForgotPassword}
          onBackToSignIn={handleBackToSignIn}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title={isLogin ? 'Sign In' : 'Create Account'}
      description={isLogin 
        ? 'Enter your credentials to access your account' 
        : 'Create your free account'
      }
    >
      {isLogin ? (
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          errors={errors}
          onSubmit={handleAuth}
          onForgotPassword={handleShowForgotPassword}
          onSwitchToSignUp={handleSwitchMode}
        />
      ) : (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loading}
          errors={errors}
          onSubmit={handleAuth}
          onSwitchToSignIn={handleSwitchMode}
        />
      )}
    </AuthLayout>
  )
}

export default Auth
