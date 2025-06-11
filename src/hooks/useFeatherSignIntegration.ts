
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface FeatherSignToken {
  access_token: string
  token_type: string
  expires_in: number
}

interface UploadResult {
  id: string
  document_name: string
  page_count: number
}

interface InviteResult {
  status: string
  data: any[]
}

export function useFeatherSignIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const authenticate = async (): Promise<string> => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase.functions.invoke('signnow-auth')
      
      if (error) throw error
      
      const tokenData: FeatherSignToken = data
      setAccessToken(tokenData.access_token)
      
      return tokenData.access_token
    } catch (error) {
      console.error('FeatherSign authentication error:', error)
      toast.error('Failed to authenticate with FeatherSign')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const uploadDocument = async (documentContent: string, fileName: string): Promise<UploadResult> => {
    try {
      setIsLoading(true)
      
      const token = accessToken || await authenticate()
      
      const { data, error } = await supabase.functions.invoke('signnow-upload', {
        body: {
          documentContent,
          fileName,
          accessToken: token
        }
      })
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('FeatherSign upload error:', error)
      toast.error('Failed to upload document to FeatherSign')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const sendInvite = async (documentId: string, signerEmail: string, signerName?: string): Promise<InviteResult> => {
    try {
      setIsLoading(true)
      
      const token = accessToken || await authenticate()
      
      const { data, error } = await supabase.functions.invoke('signnow-invite', {
        body: {
          documentId,
          signerEmail,
          signerName,
          accessToken: token
        }
      })
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('FeatherSign invite error:', error)
      toast.error('Failed to send signature invite')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const checkStatus = async (documentId: string) => {
    try {
      const token = accessToken || await authenticate()
      
      const { data, error } = await supabase.functions.invoke('signnow-status', {
        body: {
          documentId,
          accessToken: token
        }
      })
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('FeatherSign status check error:', error)
      throw error
    }
  }

  const downloadSignedDocument = async (documentId: string) => {
    try {
      setIsLoading(true)
      
      const token = accessToken || await authenticate()
      
      const { data, error } = await supabase.functions.invoke('signnow-download', {
        body: {
          documentId,
          accessToken: token
        }
      })
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('FeatherSign download error:', error)
      toast.error('Failed to download signed document')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const uploadAndSendForSignature = async (
    documentContent: string, 
    fileName: string, 
    signerEmail: string, 
    signerName?: string
  ) => {
    try {
      setIsLoading(true)
      
      // Step 1: Upload document
      const uploadResult = await uploadDocument(documentContent, fileName)
      console.log('Document uploaded to FeatherSign:', uploadResult)
      
      // Step 2: Send for signature
      const inviteResult = await sendInvite(uploadResult.id, signerEmail, signerName)
      console.log('Signature invite sent:', inviteResult)
      
      toast.success('Document uploaded and sent for signature successfully!')
      
      return {
        documentId: uploadResult.id,
        uploadResult,
        inviteResult
      }
    } catch (error) {
      console.error('Upload and send error:', error)
      toast.error('Failed to upload and send document for signature')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    authenticate,
    uploadDocument,
    sendInvite,
    checkStatus,
    downloadSignedDocument,
    uploadAndSendForSignature
  }
}
