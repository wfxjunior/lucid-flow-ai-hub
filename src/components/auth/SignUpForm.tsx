
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, Globe } from "lucide-react"
import { ErrorAlert } from './ErrorAlert'

interface SignUpFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (password: string) => void
  loading: boolean
  errors: string[]
  onSubmit: (e: React.FormEvent) => void
  onSwitchToSignIn: () => void
}

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'sg', label: 'Singapore' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'at', label: 'Austria' },
  { value: 'be', label: 'Belgium' },
  { value: 'ie', label: 'Ireland' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'za', label: 'South Africa' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'il', label: 'Israel' },
  { value: 'pl', label: 'Poland' },
  { value: 'cz', label: 'Czech Republic' },
  { value: 'hu', label: 'Hungary' },
  { value: 'ro', label: 'Romania' },
  { value: 'bg', label: 'Bulgaria' },
  { value: 'hr', label: 'Croatia' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'si', label: 'Slovenia' },
  { value: 'ee', label: 'Estonia' },
  { value: 'lv', label: 'Latvia' },
  { value: 'lt', label: 'Lithuania' },
  { value: 'pt', label: 'Portugal' },
  { value: 'gr', label: 'Greece' },
  { value: 'cy', label: 'Cyprus' },
  { value: 'mt', label: 'Malta' },
  { value: 'lu', label: 'Luxembourg' },
  { value: 'is', label: 'Iceland' },
  { value: 'tr', label: 'Turkey' },
  { value: 'ru', label: 'Russia' },
  { value: 'ua', label: 'Ukraine' },
  { value: 'other', label: 'Other' }
]

export function SignUpForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  errors,
  onSubmit,
  onSwitchToSignIn
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [country, setCountry] = useState('')

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
          <Label htmlFor="country" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Country</span>
          </Label>
          <Select value={country} onValueChange={setCountry} required>
            <SelectTrigger className="pl-4">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading || !country}
          size="lg"
        >
          {loading ? 'Processing...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?
        </p>
        <Button
          variant="link"
          onClick={onSwitchToSignIn}
          className="text-primary font-medium"
        >
          Sign in
        </Button>
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </div>
    </>
  )
}
