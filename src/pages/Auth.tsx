
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { toast } = useToast()
  const navigate = useNavigate()

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

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!email) {
      newErrors.push('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('Email must have a valid format')
    }
    
    if (!password) {
      newErrors.push('Password is required')
    } else if (password.length < 6) {
      newErrors.push('Password must be at least 6 characters')
    }
    
    if (!isLogin && password !== confirmPassword) {
      newErrors.push('Passwords do not match')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

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
    
    if (!validateForm()) {
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

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors(['Enter your email to reset password'])
      return
    }
    
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`
      })
      
      if (error) throw error
      
      toast({
        title: "Email sent",
        description: "Check your inbox to reset your password"
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img 
              src="/lovable-uploads/9c9fc115-bd20-4b1a-91a2-103ecc8ca698.png" 
              alt="FeatherBiz Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-primary">FeatherBiz</span>
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Create your free account'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-4 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-4"
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          {isLogin && (
            <div className="text-center">
              <Button
                variant="link"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-sm"
              >
                Forgot your password?
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors([])
                setPassword('')
                setConfirmPassword('')
              }}
              className="text-primary font-medium"
            >
              {isLogin ? "Create free account" : "Sign in"}
            </Button>
          </div>
          
          {!isLogin && (
            <div className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth
