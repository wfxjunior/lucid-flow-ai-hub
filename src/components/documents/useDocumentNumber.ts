
import { useState, useCallback } from "react"
import { supabase } from "@/integrations/supabase/client"
import { functionNameMapping } from "./documentConfig"

export function useDocumentNumber(documentType: string) {
  const [autoGenerateNumbers, setAutoGenerateNumbers] = useState(true)

  const loadNumberSettings = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        const autoGenerate = data[`${documentType}_auto_generate`] !== false
        setAutoGenerateNumbers(autoGenerate)
        return autoGenerate
      }
      return true
    } catch (error) {
      console.error('Error loading number settings:', error)
      return true
    }
  }, [documentType])

  const generateDocumentNumber = useCallback(async (initialData?: any) => {
    if (!autoGenerateNumbers || initialData?.number) return ''

    try {
      // Get the correct function name or use fallback
      const functionName = functionNameMapping[documentType]
      
      if (functionName) {
        const { data: numberData } = await supabase.rpc(functionName as any)
        
        if (numberData) {
          return numberData
        }
      }
      
      // Fallback to simple number generation for document types without specific functions
      const timestamp = Date.now().toString().slice(-6)
      const prefix = documentType.substring(0, 3).toUpperCase()
      return `${prefix}-${timestamp}`
    } catch (error) {
      console.error(`Error generating ${documentType} number:`, error)
      // Fallback to simple number generation
      const timestamp = Date.now().toString().slice(-6)
      const prefix = documentType.substring(0, 3).toUpperCase()
      return `${prefix}-${timestamp}`
    }
  }, [documentType, autoGenerateNumbers])

  return {
    autoGenerateNumbers,
    setAutoGenerateNumbers,
    loadNumberSettings,
    generateDocumentNumber
  }
}
