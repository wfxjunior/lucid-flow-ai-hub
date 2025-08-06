
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useAdminEmails } from "@/hooks/useAdminEmails"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function SignUpForm() {
  const { sendWelcomeEmail } = useAdminEmails()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if there's a referral code in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')
    if (refCode) {
      setReferralCode(refCode)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (signUpError) {
        throw signUpError
      }

      if (data.user) {
        // Track referral if there's a referral code
        if (referralCode) {
          try {
            const { error: referralError } = await supabase.functions.invoke('track-referral', {
              body: {
                referralCode,
                userEmail: email
              }
            })
            
            if (referralError) {
              console.error('Failed to track referral:', referralError)
            }
          } catch (referralError) {
            console.error('Failed to track referral:', referralError)
          }
        }

        // Send welcome email after successful signup
        try {
          await sendWelcomeEmail(email, name || email.split('@')[0])
        } catch (welcomeError) {
          console.error('Failed to send welcome email:', welcomeError)
          // Don't fail signup if welcome email fails
        }
        
        toast.success('Account created successfully! You can now log in.')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              setLoading(true)
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/`
                  }
                })
                if (error) {
                  console.error('Google sign up error:', error)
                  setError(`Erro no cadastro com Google: ${error.message}`)
                }
              } catch (error: any) {
                console.error('Unexpected Google sign up error:', error)
                setError('Erro inesperado no cadastro com Google. Tente novamente.')
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="w-full h-12 rounded-lg font-normal text-sm border-border hover:bg-accent"
          >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name (optional)"
              className="h-12 border-border rounded-lg text-sm"
            />
          </div>

          <div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email address"
              className="h-12 border-border rounded-lg text-sm"
              required
            />
          </div>
          
          {referralCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                You've been referred! You'll get 20% off your first month.
              </p>
              <p className="text-xs text-green-600 mt-1">Referral code: {referralCode}</p>
            </div>
          )}

          <div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (minimum 6 characters)"
              className="h-12 border-border rounded-lg text-sm"
              required
            />
          </div>

          <div>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-12 border-border rounded-lg text-sm"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 rounded-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}
