import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useUserRole } from './useUserRole'

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

export function useSecurityMonitoring() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [templateAccessLogs, setTemplateAccessLogs] = useState<TemplateAccessLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAdmin } = useUserRole()

  // Rate limiting function for client-side operations
  const checkRateLimit = async (action: string, maxRequests = 10, windowMinutes = 60) => {
    try {
      const { data, error } = await supabase.functions.invoke('security-middleware', {
        body: {
          action,
          maxRequests,
          windowMinutes
        }
      })

      if (error) {
        console.error('Rate limit check failed:', error)
        return false
      }

      return data?.allowed === true
    } catch (error) {
      console.error('Rate limit error:', error)
      return false
    }
  }

  // Log template access
  const logTemplateAccess = async (templateId: string, accessType: 'view' | 'download' | 'copy') => {
    try {
      await supabase.rpc('log_template_access', {
        template_id_param: templateId,
        access_type_param: accessType,
        ip_address_param: null, // Will be detected server-side if needed
        user_agent_param: navigator.userAgent
      })
    } catch (error) {
      console.error('Failed to log template access:', error)
    }
  }

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
          console.error('Error fetching security events:', eventsError)
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
          console.error('Error fetching template access logs:', accessError)
        } else {
          setTemplateAccessLogs(accessLogs || [])
        }

      } catch (error) {
        console.error('Security monitoring error:', error)
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
    const suspiciousTypes = ['RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'SECURITY_FIX']
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
    loading,
    error,
    isAdmin,
    checkRateLimit,
    logTemplateAccess,
    getSecurityEventsByType,
    getRecentSuspiciousActivity,
    getTemplateAccessStats
  }
}