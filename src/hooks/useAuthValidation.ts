
import { validateEmail, validatePassword, validateRequired } from '@/utils/inputValidation'

export function useAuthValidation() {
  const validateForm = (
    email: string,
    password: string,
    confirmPassword?: string,
    isSignUp = false,
    isForgotPassword = false
  ): string[] => {
    const errors: string[] = []

    // Email validation
    const emailError = validateRequired(email, 'Email')
    if (emailError) {
      errors.push(emailError)
    } else if (!validateEmail(email)) {
      errors.push('Please enter a valid email address')
    }

    // Password validation (not for forgot password)
    if (!isForgotPassword) {
      const passwordError = validateRequired(password, 'Password')
      if (passwordError) {
        errors.push(passwordError)
      } else if (isSignUp) {
        const passwordValidation = validatePassword(password)
        if (!passwordValidation.isValid) {
          errors.push(...passwordValidation.errors)
        }
      }

      // Confirm password validation (only for sign up)
      if (isSignUp && confirmPassword !== undefined) {
        if (!confirmPassword) {
          errors.push('Please confirm your password')
        } else if (password !== confirmPassword) {
          errors.push('Passwords do not match')
        }
      }
    }

    return errors
  }

  return {
    validateForm
  }
}
