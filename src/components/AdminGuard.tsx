
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthState } from '@/hooks/useAuthState'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  // TEMPORARY: Disable admin authentication for all routes during configuration
  // TODO: Re-enable admin authentication when configuration is complete
  return <>{children}</>
}
