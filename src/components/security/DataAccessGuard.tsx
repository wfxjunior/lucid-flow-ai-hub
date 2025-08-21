
import { useEffect } from 'react'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthState } from '@/hooks/useAuthState'
import { securityEvent, secureError } from '@/utils/security'

interface DataAccessGuardProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'moderator' | 'user'
  dataType?: string
  recordId?: string
}

export function DataAccessGuard({ 
  children, 
  requiredRole = 'user',
  dataType,
  recordId 
}: DataAccessGuardProps) {
  const { user } = useAuthState()
  const { role, isAdmin, isModerator, loading } = useUserRole()

  useEffect(() => {
    if (!user || loading) return

    // Log data access attempt
    if (dataType) {
      securityEvent('Data access attempt', {
        userId: user.id,
        userRole: role,
        dataType,
        recordId,
        requiredRole,
        timestamp: new Date().toISOString()
      })
    }

    // Check permissions
    const hasPermission = () => {
      switch (requiredRole) {
        case 'admin':
          return isAdmin
        case 'moderator':
          return isAdmin || isModerator
        case 'user':
        default:
          return true
      }
    }

    if (!hasPermission()) {
      securityEvent('Unauthorized data access blocked', {
        userId: user.id,
        userRole: role,
        dataType,
        recordId,
        requiredRole,
        timestamp: new Date().toISOString()
      })
    }
  }, [user, role, isAdmin, isModerator, loading, dataType, recordId, requiredRole])

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const hasPermission = () => {
    switch (requiredRole) {
      case 'admin':
        return isAdmin
      case 'moderator':
        return isAdmin || isModerator
      case 'user':
      default:
        return true
    }
  }

  if (!hasPermission()) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this resource.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
