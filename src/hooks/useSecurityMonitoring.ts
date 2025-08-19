
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useUserRole } from './useUserRole'
import { securityEvent, secureError } from '@/utils/security'
import { checkClientRateLimit } from '@/utils/inputValidation'

interface SecurityEvent {
  id: string
  user_id: string | null
  table_name: string
  operation: string
  record_id: string | null
  old_data: any
  new_data: any
  created_at: string
}

interface TemplateAccessLog {
  id: string
  template_id: string | null
  user_id: string | null
  access_type: string
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

interface SecurityMetrics {
  total_events_24h: number
  suspicious_events_24h: number
  failed_logins_1h: number
  last_updated: string
}

export function useSecurityMonitoring() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [templateAccessLogs, setTemplateAccessLogs] = useState<TemplateAccessLog[]>([])
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAdmin } = useUserRole()

  // Enhanced rate limiting function with security monitoring
  const checkRateLimit = async (action: string, maxRequests = 10, windowMinutes = 60) => {
    try {
      // Client-side rate limiting first
      if (!checkClientRateLimit(action, maxRequests, windowMinutes * 60 * 1000)) {
        return false;
      }

      const { data, error } = await supabase.functions.invoke('security-middleware', {
        body: {
          action,
          maxRequests,
          windowMinutes
        }
      })

      if (error) {
        securityEvent('Rate limit check failed', { 
          action, 
          error: error.message,
          timestamp: new Date().toISOString()
        })
        return false
      }

      // Log rate limit violations for security monitoring
      if (data?.allowed === false) {
        securityEvent('Rate limit exceeded', {
          action,
          maxRequests,
          windowMinutes,
          timestamp: new Date().toISOString()
        })
      }

      return data?.allowed === true
    } catch (error) {
      securityEvent('Rate limit system error', { 
        action, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
      return false
    }
  }

  // Enhanced template access logging with security monitoring
  const logTemplateAccess = async (templateId: string, accessType: 'view' | 'download' | 'copy') => {
    try {
      // Check rate limit for template access
      if (!checkClientRateLimit('template_access', 20, 300000)) { // 20 per 5 minutes
        securityEvent('Template access rate limited', { templateId, accessType });
        return;
      }

      await supabase.rpc('log_template_access', {
        template_id_param: templateId,
        access_type_param: accessType,
        ip_address_param: null, // Will be detected server-side if needed
        user_agent_param: navigator.userAgent
      })

      // Log for security monitoring
      securityEvent('Template accessed', {
        templateId,
        accessType,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      secureError('Failed to log template access', { 
        templateId, 
        accessType, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    }
  }

  // Fetch security metrics
  const fetchSecurityMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_security_metrics');
      
      if (error) {
        secureError('Error fetching security metrics', { error: error.message });
      } else {
        setSecurityMetrics(data);
      }
    } catch (error) {
      secureError('Security metrics fetch error', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false)
      return
    }

    const fetchSecurityData = async () => {
      try {
        setLoading(true)

        // Fetch recent security events
        const { data: events, error: eventsError } = await supabase
          .from('security_audit_log')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (eventsError) {
          secureError('Error fetching security events', { error: eventsError.message })
        } else {
          setSecurityEvents(events || [])
        }

        // Fetch recent template access logs
        const { data: accessLogs, error: accessError } = await supabase
          .from('template_access_log')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (accessError) {
          secureError('Error fetching template access logs', { error: accessError.message })
        } else {
          setTemplateAccessLogs(accessLogs || [])
        }

        // Fetch security metrics
        await fetchSecurityMetrics();

      } catch (error) {
        secureError('Security monitoring error', { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        })
        setError('Failed to load security data')
      } finally {
        setLoading(false)
      }
    }

    fetchSecurityData()

    // Set up real-time subscriptions for security events
    const securityEventsSubscription = supabase
      .channel('security_events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'security_audit_log'
        },
        (payload) => {
          setSecurityEvents(prev => [payload.new as SecurityEvent, ...prev.slice(0, 99)])
          // Refresh metrics when new events come in
          fetchSecurityMetrics();
        }
      )
      .subscribe()

    const templateAccessSubscription = supabase
      .channel('template_access')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'template_access_log'
        },
        (payload) => {
          setTemplateAccessLogs(prev => [payload.new as TemplateAccessLog, ...prev.slice(0, 99)])
        }
      )
      .subscribe()

    return () => {
      securityEventsSubscription.unsubscribe()
      templateAccessSubscription.unsubscribe()
    }
  }, [isAdmin])

  const getSecurityEventsByType = (type: string) => {
    return securityEvents.filter(event => event.operation === type)
  }

  const getRecentSuspiciousActivity = () => {
    const suspiciousTypes = ['RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'SECURITY_FIX', 'INVALID_USER_SESSION']
    return securityEvents.filter(event => suspiciousTypes.includes(event.operation))
  }

  const getTemplateAccessStats = () => {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const recentAccess = templateAccessLogs.filter(log => log.created_at > last24Hours)
    
    return {
      totalAccess: recentAccess.length,
      uniqueUsers: new Set(recentAccess.map(log => log.user_id).filter(Boolean)).size,
      viewCount: recentAccess.filter(log => log.access_type === 'view').length,
      downloadCount: recentAccess.filter(log => log.access_type === 'download').length,
      copyCount: recentAccess.filter(log => log.access_type === 'copy').length
    }
  }

  return {
    securityEvents,
    templateAccessLogs,
    securityMetrics,
    loading,
    error,
    isAdmin,
    checkRateLimit,
    logTemplateAccess,
    getSecurityEventsByType,
    getRecentSuspiciousActivity,
    getTemplateAccessStats,
    refreshMetrics: fetchSecurityMetrics
  }
}
