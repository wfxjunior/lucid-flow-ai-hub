
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { ErrorAlert } from './ErrorAlert'

interface SignInFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  loading: boolean
  errors: string[]
  onSubmit: (e: React.FormEvent) => void
  onForgotPassword: () => void
  onSwitchToSignUp: () => void
}

export function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  errors,
  onSubmit,
  onForgotPassword,
  onSwitchToSignUp
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6">
      <ErrorAlert errors={errors} />
      
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-lg font-normal text-sm border-border hover:bg-accent"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your work email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-border rounded-lg text-sm"
              required
            />
          </div>
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-border rounded-lg text-sm pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Continue'}
          </Button>
        </form>
      </div>
      
      <div className="text-center space-y-3">
        <Button
          variant="link"
          onClick={onForgotPassword}
          className="text-sm text-muted-foreground hover:text-foreground p-0"
        >
          Forgot your password?
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button
            variant="link"
            onClick={onSwitchToSignUp}
            className="text-foreground font-medium p-0 h-auto hover:underline"
          >
            Create free account
          </Button>
        </div>
      </div>
    </div>
  )
}
