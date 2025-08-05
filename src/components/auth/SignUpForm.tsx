
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      <div>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name (optional)"
          className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg"
        />
      </div>

      <div>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg"
          required
        />
      </div>
      
      {referralCode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700">
            🎉 You've been referred! You'll get 20% off your first month.
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
          className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg"
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
          className="h-12 border-border/50 focus:border-primary transition-colors duration-200 rounded-lg"
          required
        />
      </div>

      <Button type="submit" className="w-full h-12 rounded-lg font-medium transition-all duration-200" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  )
}
