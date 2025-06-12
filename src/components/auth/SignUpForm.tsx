
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Globe } from "lucide-react"
import { ErrorAlert } from './ErrorAlert'
import { Link } from 'react-router-dom'

interface SignUpFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (password: string) => void
  loading: boolean
  errors: string[]
  selectedCountry: string
  setSelectedCountry: (country: string) => void
  onSubmit: (e: React.FormEvent) => void
  onSwitchToSignIn: () => void
}

const countries = [
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦' },
  { value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'au', label: 'Australia', flag: '🇦🇺' },
  { value: 'de', label: 'Germany', flag: '🇩🇪' },
  { value: 'fr', label: 'France', flag: '🇫🇷' },
  { value: 'es', label: 'Spain', flag: '🇪🇸' },
  { value: 'it', label: 'Italy', flag: '🇮🇹' },
  { value: 'br', label: 'Brazil', flag: '🇧🇷' },
  { value: 'mx', label: 'Mexico', flag: '🇲🇽' },
  { value: 'jp', label: 'Japan', flag: '🇯🇵' },
  { value: 'kr', label: 'South Korea', flag: '🇰🇷' },
  { value: 'cn', label: 'China', flag: '🇨🇳' },
  { value: 'in', label: 'India', flag: '🇮🇳' },
  { value: 'sg', label: 'Singapore', flag: '🇸🇬' },
  { value: 'nl', label: 'Netherlands', flag: '🇳🇱' },
  { value: 'se', label: 'Sweden', flag: '🇸🇪' },
  { value: 'no', label: 'Norway', flag: '🇳🇴' },
  { value: 'dk', label: 'Denmark', flag: '🇩🇰' },
  { value: 'fi', label: 'Finland', flag: '🇫🇮' },
  { value: 'ch', label: 'Switzerland', flag: '🇨🇭' },
  { value: 'at', label: 'Austria', flag: '🇦🇹' },
  { value: 'be', label: 'Belgium', flag: '🇧🇪' },
  { value: 'ie', label: 'Ireland', flag: '🇮🇪' },
  { value: 'nz', label: 'New Zealand', flag: '🇳🇿' },
  { value: 'za', label: 'South Africa', flag: '🇿🇦' },
  { value: 'ae', label: 'United Arab Emirates', flag: '🇦🇪' },
  { value: 'il', label: 'Israel', flag: '🇮🇱' },
  { value: 'pl', label: 'Poland', flag: '🇵🇱' },
  { value: 'cz', label: 'Czech Republic', flag: '🇨🇿' },
  { value: 'hu', label: 'Hungary', flag: '🇭🇺' },
  { value: 'ro', label: 'Romania', flag: '🇷🇴' },
  { value: 'bg', label: 'Bulgaria', flag: '🇧🇬' },
  { value: 'hr', label: 'Croatia', flag: '🇭🇷' },
  { value: 'sk', label: 'Slovakia', flag: '🇸🇰' },
  { value: 'si', label: 'Slovenia', flag: '🇸🇮' },
  { value: 'ee', label: 'Estonia', flag: '🇪🇪' },
  { value: 'lv', label: 'Latvia', flag: '🇱🇻' },
  { value: 'lt', label: 'Lithuania', flag: '🇱🇹' },
  { value: 'pt', label: 'Portugal', flag: '🇵🇹' },
  { value: 'gr', label: 'Greece', flag: '🇬🇷' },
  { value: 'cy', label: 'Cyprus', flag: '🇨🇾' },
  { value: 'mt', label: 'Malta', flag: '🇲🇹' },
  { value: 'lu', label: 'Luxembourg', flag: '🇱🇺' },
  { value: 'is', label: 'Iceland', flag: '🇮🇸' },
  { value: 'tr', label: 'Turkey', flag: '🇹🇷' },
  { value: 'ru', label: 'Russia', flag: '🇷🇺' },
  { value: 'ua', label: 'Ukraine', flag: '🇺🇦' },
  { value: 'other', label: 'Other', flag: '🌍' }
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
  selectedCountry,
  setSelectedCountry,
  onSubmit,
  onSwitchToSignIn
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted || !privacyAccepted) {
      return
    }
    onSubmit(e)
  }

  return (
    <>
      <ErrorAlert errors={errors} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-2">
          <Label htmlFor="country" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Country</span>
          </Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry} required>
            <SelectTrigger className="pl-4">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  <div className="flex items-center">
                    <span className="mr-2">{country.flag}</span>
                    {country.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-5">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline" target="_blank">
                Terms of Service
              </Link>
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="privacy" 
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="privacy" className="text-sm leading-5">
              I agree to the{' '}
              <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading || !selectedCountry || !termsAccepted || !privacyAccepted}
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
    </>
  )
}
