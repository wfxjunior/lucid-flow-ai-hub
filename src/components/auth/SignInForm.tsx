
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
    <>
      <ErrorAlert errors={errors} />
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg"
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
            className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-lg font-medium transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="text-center">
        <Button
          variant="link"
          onClick={onForgotPassword}
          disabled={loading}
          className="text-sm"
        >
          Forgot your password?
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?
        </p>
        <Button
          variant="link"
          onClick={onSwitchToSignUp}
          className="text-primary font-medium"
        >
          Create free account
        </Button>
      </div>
    </>
  )
}
