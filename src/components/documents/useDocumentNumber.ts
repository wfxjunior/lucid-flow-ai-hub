
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
        .maybeSingle()

      if (data) {
        const autoGenerate = data[`${documentType}_auto_generate`] !== false
        setAutoGenerateNumbers(autoGenerate)
        return autoGenerate
      }
      
      // Create settings for new user
      await supabase
        .from('user_settings')
        .insert({ user_id: user.id })

      setAutoGenerateNumbers(true)
      return true
    } catch (error) {
      console.error('Error loading number settings:', error)
      return true
    }
  }, [documentType])

  const generateDocumentNumber = useCallback(async (initialData?: any) => {
    if (!autoGenerateNumbers || initialData?.number) return ''

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return ''

      // Get user settings for prefix and starting number
      const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      let prefix = 'DOC-'
      let startNumber = 1

      if (settings) {
        prefix = settings[`${documentType}_number_prefix`] || getDefaultPrefix(documentType)
        startNumber = settings[`${documentType}_number_start`] || 1
      }

      // Get the correct function name or generate manually
      const functionName = functionNameMapping[documentType]
      
      if (functionName) {
        const { data: numberData } = await supabase.rpc(functionName as any, {
          starting_number: startNumber
        })
        
        if (numberData) {
          return numberData
        }
      }
      
      // Fallback to manual generation
      const nextNumber = await getNextDocumentNumber(documentType, user.id, startNumber)
      return `${prefix}${String(nextNumber).padStart(4, '0')}`
    } catch (error) {
      console.error(`Error generating ${documentType} number:`, error)
      // Final fallback
      const timestamp = Date.now().toString().slice(-6)
      const prefix = getDefaultPrefix(documentType)
      return `${prefix}${timestamp}`
    }
  }, [documentType, autoGenerateNumbers])

  const getNextDocumentNumber = async (docType: string, userId: string, startNumber: number) => {
    const tableMap: Record<string, string> = {
      invoice: 'invoices',
      estimate: 'estimates',
      quote: 'quotes', 
      contract: 'contracts',
      workorder: 'work_orders',
      salesorder: 'sales_orders',
      proposal: 'business_proposals',
      bid: 'bids'
    }

    const tableName = tableMap[docType]
    if (!tableName) return startNumber

    try {
      const numberColumn = `${docType}_number`
      const { data } = await supabase
        .from(tableName)
        .select(numberColumn)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data && data[numberColumn]) {
        const numberMatch = data[numberColumn].match(/\d+/)
        if (numberMatch) {
          return Math.max(parseInt(numberMatch[0]) + 1, startNumber)
        }
      }
      return startNumber
    } catch (error) {
      console.error(`Error getting next ${docType} number:`, error)
      return startNumber
    }
  }

  const getDefaultPrefix = (type: string) => {
    const prefixes: Record<string, string> = {
      invoice: 'INV-',
      estimate: 'EST-',
      quote: 'QUO-',
      contract: 'CON-',
      workorder: 'WO-',
      salesorder: 'SO-',
      proposal: 'PRO-',
      bid: 'BID-'
    }
    return prefixes[type] || 'DOC-'
  }

  return {
    autoGenerateNumbers,
    setAutoGenerateNumbers,
    loadNumberSettings,
    generateDocumentNumber
  }
}
