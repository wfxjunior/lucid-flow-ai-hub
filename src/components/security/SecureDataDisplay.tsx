
import React from 'react'
import { useUserRole } from '@/hooks/useUserRole'
import { DataAccessGuard } from './DataAccessGuard'

interface SecureDataDisplayProps {
  children: React.ReactNode
  dataType: string
  recordId?: string
  classification?: 'public' | 'internal' | 'confidential' | 'restricted'
  requiredRole?: 'admin' | 'moderator' | 'user'
  fallback?: React.ReactNode
}

export function SecureDataDisplay({
  children,
  dataType,
  recordId,
  classification = 'internal',
  requiredRole = 'user',
  fallback
}: SecureDataDisplayProps) {
  const { role } = useUserRole()

  // Determine access level based on data classification
  const getRequiredRoleForClassification = () => {
    switch (classification) {
      case 'restricted':
        return 'admin'
      case 'confidential':
        return 'moderator'
      case 'internal':
        return 'user'
      case 'public':
      default:
        return 'user'
    }
  }

  const effectiveRequiredRole = getRequiredRoleForClassification()
  const finalRequiredRole = requiredRole === 'admin' ? 'admin' : 
                           requiredRole === 'moderator' ? 'moderator' : 
                           effectiveRequiredRole

  return (
    <DataAccessGuard
      requiredRole={finalRequiredRole}
      dataType={dataType}
      recordId={recordId}
    >
      {children}
    </DataAccessGuard>
  )
}

// Helper component for masking sensitive data
interface MaskedDataProps {
  value: string
  maskPattern?: 'email' | 'phone' | 'partial'
  visibleChars?: number
}

export function MaskedData({ 
  value, 
  maskPattern = 'partial', 
  visibleChars = 3 
}: MaskedDataProps) {
  const maskValue = () => {
    if (!value) return ''
    
    switch (maskPattern) {
      case 'email':
        const [local, domain] = value.split('@')
        if (local && domain) {
          const maskedLocal = local.slice(0, 2) + '*'.repeat(Math.max(0, local.length - 2))
          return `${maskedLocal}@${domain}`
        }
        return value
        
      case 'phone':
        if (value.length > 4) {
          return '*'.repeat(value.length - 4) + value.slice(-4)
        }
        return value
        
      case 'partial':
      default:
        if (value.length <= visibleChars) return value
        return value.slice(0, visibleChars) + '*'.repeat(value.length - visibleChars)
    }
  }

  return <span className="font-mono">{maskValue()}</span>
}
