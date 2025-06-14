
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface SendEmailParams {
  to: string
  subject: string
  content: string
  emailType?: string
  recipientName?: string
}

export function useUserEmail() {
  const [isSending, setIsSending] = useState(false)
  const [hasEmailSettings, setHasEmailSettings] = useState<boolean | null>(null)

  const checkEmailSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_email_settings')
        .select('id')
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      const hasSettings = !!data
      setHasEmailSettings(hasSettings)
      return hasSettings
    } catch (error: any) {
      console.error('Error checking email settings:', error)
      setHasEmailSettings(false)
      return false
    }
  }

  const sendEmail = async ({ to, subject, content, emailType = 'custom', recipientName }: SendEmailParams) => {
    setIsSending(true)
    try {
      // Check if user has email settings configured
      const hasSettings = await checkEmailSettings()
      if (!hasSettings) {
        toast.error('Configure suas credenciais de email primeiro nas Configurações de Email')
        return false
      }

      const { data, error } = await supabase.functions.invoke('send-user-email', {
        body: {
          to,
          subject,
          content,
          emailType,
          recipientName
        }
      })

      if (error) {
        throw error
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send email')
      }

      toast.success('Email enviado com sucesso!')
      return true
    } catch (error: any) {
      console.error('Error sending email:', error)
      toast.error('Erro ao enviar email: ' + error.message)
      return false
    } finally {
      setIsSending(false)
    }
  }

  return {
    sendEmail,
    isSending,
    hasEmailSettings,
    checkEmailSettings
  }
}
