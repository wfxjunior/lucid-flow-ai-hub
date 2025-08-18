
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
    <div className="space-y-6">
      <ErrorAlert errors={errors} />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-border rounded-lg text-sm"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Continue'}
        </Button>
      </form>
      
      <div className="text-center">
        <Button
          variant="link"
          onClick={onBackToSignIn}
          className="text-sm text-muted-foreground hover:text-foreground p-0"
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  )
}
