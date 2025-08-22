
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface AdminEmailData {
  type: 'welcome' | 'order' | 'support' | 'notification' | 'career'
  to?: string
  data: any
}

export function useAdminEmails() {
  const [isSending, setIsSending] = useState(false)

  const sendAdminEmail = async ({ type, to, data }: AdminEmailData) => {
    setIsSending(true)
    try {
      console.log(`Sending ${type} email...`, { to, data })
      
      const { data: response, error } = await supabase.functions.invoke('send-admin-emails', {
        body: { 
          type, 
          to: to || 'juniorxavierusa@gmail.com', // Use your admin email as default
          data 
        }
      })

      if (error) {
        throw error
      }

      console.log(`${type} email sent successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error sending ${type} email:`, error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  const sendWelcomeEmail = async (userEmail: string, userName?: string) => {
    try {
      await sendAdminEmail({
        type: 'welcome',
        to: userEmail,
        data: { userName }
      })
      toast.success('Email de boas-vindas enviado!')
    } catch (error) {
      toast.error('Erro ao enviar email de boas-vindas')
      throw error
    }
  }

  const sendOrderEmail = async (customerEmail: string, orderData: any) => {
    try {
      await sendAdminEmail({
        type: 'order',
        to: customerEmail,
        data: {
          customerName: orderData.customerName,
          orderNumber: orderData.orderNumber,
          amount: orderData.amount,
          planName: orderData.planName,
          date: orderData.date
        }
      })
      toast.success('Recibo de pedido enviado!')
    } catch (error) {
      toast.error('Erro ao enviar recibo de pedido')
      throw error
    }
  }

  const sendSupportEmail = async (userEmail: string, supportData: any) => {
    try {
      await sendAdminEmail({
        type: 'support',
        to: userEmail,
        data: {
          name: supportData.name,
          message: supportData.message,
          type: supportData.type
        }
      })
      toast.success('Confirmação de suporte enviada!')
    } catch (error) {
      toast.error('Erro ao enviar confirmação de suporte')
      throw error
    }
  }

  const sendCareerEmail = async (applicantEmail: string, careerData: any) => {
    try {
      await sendAdminEmail({
        type: 'career',
        to: applicantEmail,
        data: {
          name: careerData.name,
          email: careerData.email,
          position: careerData.position
        }
      })
      toast.success('Confirmação de candidatura enviada!')
    } catch (error) {
      toast.error('Erro ao enviar confirmação de candidatura')
      throw error
    }
  }

  const sendNotificationEmail = async (userEmail: string, notificationData: any) => {
    try {
      await sendAdminEmail({
        type: 'notification',
        to: userEmail,
        data: {
          message: notificationData.message,
          title: notificationData.title
        }
      })
      toast.success('Notificação enviada!')
    } catch (error) {
      toast.error('Erro ao enviar notificação')
      throw error
    }
  }

  return {
    isSending,
    sendAdminEmail,
    sendWelcomeEmail,
    sendOrderEmail,
    sendSupportEmail,
    sendCareerEmail,
    sendNotificationEmail
  }
}
