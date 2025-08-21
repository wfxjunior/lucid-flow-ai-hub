
export const useAuthValidation = () => {
  const validateForm = (
    email: string, 
    password: string, 
    confirmPassword?: string, 
    isSignUp: boolean = false,
    isForgotPassword: boolean = false
  ) => {
    const newErrors: string[] = []
    
    if (!email) {
      newErrors.push('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('Email must have a valid format')
    }
    
    if (!isForgotPassword) {
      if (!password) {
        newErrors.push('Password is required')
      } else if (password.length < 8) {
        newErrors.push('Password must be at least 8 characters')
      } else if (isSignUp) {
        // Enhanced password validation for sign up
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
          newErrors.push('Password must contain uppercase, lowercase, and numbers');
        }
      }
      
      if (isSignUp && password !== confirmPassword) {
        newErrors.push('Passwords do not match')
      }
    }
    
    return newErrors
  }

  return { validateForm }
}
