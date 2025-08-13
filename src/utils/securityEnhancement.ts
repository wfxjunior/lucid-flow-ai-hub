// Security Enhancement Utilities
// Centralized security monitoring and validation

import { supabase } from '@/integrations/supabase/client'
import { securityEvent, secureError } from './security'

// Enhanced session validation with security monitoring
export const validateUserSession = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      securityEvent('Session validation error', { error: error.message })
      return false
    }

    if (!session?.user) {
      securityEvent('Invalid session detected', { timestamp: new Date().toISOString() })
      return false
    }

    // Additional session security checks
    const sessionAge = Date.now() - new Date(session.expires_at || 0).getTime()
    if (sessionAge < 0) {
      securityEvent('Session expired', { 
        userId: session.user.id, 
        expiresAt: session.expires_at 
      })
      return false
    }

    return true
  } catch (error) {
    secureError('Session validation failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return false
  }
}

// Enhanced input sanitization for security-critical operations
export const sanitizeSecurityInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .trim()
    .slice(0, 1000) // Limit length to prevent buffer overflow attacks
}

// Rate limiting validation with enhanced security
export const checkSecurityRateLimit = async (
  action: string, 
  maxRequests = 5, 
  windowMinutes = 15
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('enhanced_rate_limit_check', {
      client_ip: null, // Will be detected server-side
      action,
      user_context: (await supabase.auth.getUser()).data.user?.id,
      max_requests: maxRequests,
      window_minutes: windowMinutes
    })

    if (error) {
      securityEvent('Rate limit check failed', { action, error: error.message })
      return false
    }

    return data === true
  } catch (error) {
    secureError('Rate limit validation error', { 
      action, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return false
  }
}

// Security audit logging wrapper
export const auditSecurityAction = async (
  action: string,
  resourceId?: string,
  metadata?: Record<string, any>
) => {
  try {
    const user = (await supabase.auth.getUser()).data.user
    
    securityEvent('Security action performed', {
      action,
      userId: user?.id,
      resourceId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...metadata
    })

    // Log to database for audit trail
    await supabase.rpc('log_security_event', {
      p_table_name: 'security_actions',
      p_operation: action,
      p_record_id: resourceId,
      p_new_data: {
        userId: user?.id,
        action,
        metadata,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    secureError('Failed to audit security action', { 
      action, 
      resourceId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}

// Enhanced data access validation
export const validateDataAccess = async (
  tableName: string,
  recordId: string,
  operation: 'read' | 'write' | 'delete'
): Promise<boolean> => {
  try {
    const { data: hasAccess } = await supabase.rpc('validate_user_session')
    
    if (!hasAccess) {
      securityEvent('Unauthorized data access attempt', {
        tableName,
        recordId,
        operation,
        timestamp: new Date().toISOString()
      })
      return false
    }

    // Log legitimate access for audit trail
    await auditSecurityAction(`data_${operation}`, recordId, { tableName })
    
    return true
  } catch (error) {
    secureError('Data access validation failed', {
      tableName,
      recordId,
      operation,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return false
  }
}

// Security monitoring dashboard utilities
export const getSecurityMetrics = async () => {
  try {
    const { data: events } = await supabase
      .from('security_audit_log')
      .select('operation, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    const recentEvents = events?.filter(event => 
      new Date(event.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ) || []

    const suspiciousEvents = recentEvents.filter(event => 
      ['RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'INVALID_SESSION'].includes(event.operation)
    )

    return {
      totalEvents: recentEvents.length,
      suspiciousCount: suspiciousEvents.length,
      securityScore: Math.max(0, 100 - (suspiciousEvents.length * 10)),
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    secureError('Failed to get security metrics', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return {
      totalEvents: 0,
      suspiciousCount: 0,
      securityScore: 0,
      lastUpdated: new Date().toISOString()
    }
  }
}