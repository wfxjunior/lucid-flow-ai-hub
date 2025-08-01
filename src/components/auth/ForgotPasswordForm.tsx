
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-lg font-medium transition-all duration-200"
          disabled={loading}
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
