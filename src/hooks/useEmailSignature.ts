
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface EmailSignatureData {
  signerEmail: string
  signerName: string
  documentTitle: string
  documentUrl?: string
  message?: string
}

export function useEmailSignature() {
  const [isSending, setIsSending] = useState(false)

  const sendSignatureEmail = async (data: EmailSignatureData) => {
    setIsSending(true)
    
    try {
      const { error } = await supabase.functions.invoke('send-signature-email', {
        body: {
          to: data.signerEmail,
          signerName: data.signerName,
          documentTitle: data.documentTitle,
          documentUrl: data.documentUrl,
          message: data.message || `Please review and sign the document: ${data.documentTitle}`
        }
      })

      if (error) throw error

      toast.success('Signature request sent successfully!')
      
    } catch (error) {
      console.error('Error sending signature email:', error)
      toast.error('Failed to send signature email')
      throw error
    } finally {
      setIsSending(false)
    }
  }

  return {
    sendSignatureEmail,
    isSending
  }
}
