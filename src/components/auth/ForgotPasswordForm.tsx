
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { ErrorAlert } from './ErrorAlert'

interface ForgotPasswordFormProps {
  email: string
  setEmail: (email: string) => void
  loading: boolean
  errors: string[]
  onSubmit: (e: React.FormEvent) => void
  onBackToSignIn: () => void
}

export function ForgotPasswordForm({
  email,
  setEmail,
  loading,
  errors,
  onSubmit,
  onBackToSignIn
}: ForgotPasswordFormProps) {
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
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
          size="lg"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
      
      <div className="text-center">
        <Button
          variant="link"
          onClick={onBackToSignIn}
          className="text-primary font-medium"
        >
          Back to Sign In
        </Button>
      </div>
    </>
  )
}
