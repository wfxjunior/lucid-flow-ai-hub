
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
      newErrors.push('E-mail é obrigatório')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('E-mail deve ter um formato válido')
    }
    
    if (!password) {
      newErrors.push('Senha é obrigatória')
    } else if (password.length < 6) {
      newErrors.push('Senha deve ter pelo menos 6 caracteres')
    }
    
    if (!isLogin && password !== confirmPassword) {
      newErrors.push('Senhas não coincidem')
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
            throw new Error('E-mail ou senha incorretos')
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Confirme seu e-mail antes de fazer login')
          } else {
            throw new Error(error.message)
          }
        }
        
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso"
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
            throw new Error('Este e-mail já está cadastrado. Tente fazer login.')
          } else {
            throw new Error(error.message)
          }
        }
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu e-mail para confirmar a conta antes de fazer login."
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
        title: "Erro",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors(['Digite seu e-mail para recuperar a senha'])
      return
    }
    
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`
      })
      
      if (error) throw error
      
      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha"
      })
    } catch (error: any) {
      toast({
        title: "Erro",
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
            {isLogin ? 'Fazer Login' : 'Criar Conta'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Entre para acessar sua conta' 
              : 'Crie sua conta gratuita'
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
                <span>E-mail</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Senha</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
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
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
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
              {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
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
                Esqueceu sua senha?
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
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
              {isLogin ? "Criar conta gratuita" : "Fazer login"}
            </Button>
          </div>
          
          {!isLogin && (
            <div className="text-center text-xs text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{' '}
              <a href="#" className="text-primary hover:underline">Termos de Uso</a>
              {' '}e{' '}
              <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth
