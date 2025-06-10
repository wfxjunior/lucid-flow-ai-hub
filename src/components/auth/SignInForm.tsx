
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
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
      
      <form onSubmit={onSubmit} className="space-y-4">
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
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
          size="lg"
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
