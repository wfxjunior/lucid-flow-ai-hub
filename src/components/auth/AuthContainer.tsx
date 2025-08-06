
import React from 'react'
import { AuthLayout } from './AuthLayout'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { useAuthLogic } from '@/hooks/useAuthLogic'

export function AuthContainer() {
  const {
    mode,
    setMode,
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
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
    handleGoogleSignIn
  } = useAuthLogic()

  const getAuthContent = () => {
    switch (mode) {
      case 'signin':
        return {
          title: 'Welcome Back',
          // description removido da tela de login
          description: '',
          form: (
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              errors={errors}
              onSubmit={handleSignIn}
              onGoogleSignIn={handleGoogleSignIn}
              onForgotPassword={() => setMode('forgot-password')}
              onSwitchToSignUp={() => setMode('signup')}
            />
          )
        }
      case 'signup':
        return {
          title: 'Create Account',
          description: 'Start your free FeatherBiz trial today',
          form: <SignUpForm />
        }
      case 'forgot-password':
        return {
          title: 'Reset Password',
          description: 'Enter your email to receive reset instructions',
          form: (
            <ForgotPasswordForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              errors={errors}
              onSubmit={handleForgotPassword}
              onBackToSignIn={() => setMode('signin')}
            />
          )
        }
    }
  }

  const { title, description, form } = getAuthContent()

  return (
    <AuthLayout title={title} description={description}>
      {form}
    </AuthLayout>
  )
}

