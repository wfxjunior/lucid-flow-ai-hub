
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface DefaultFormData {
  id?: string
  number: string
  date: string
  dueDate: string
  status: string
  paymentMethod: string
  currency: string
  companyInfo: {
    name: string
    logo: string
    address: string
    phone: string
    email: string
  }
  clientInfo: {
    id: string
    name: string
    email: string
    address: string
    phone: string
  }
  lineItems: Array<{
    id: string
    name: string
    description: string
    quantity: number
    unitPrice: number
    discount: number
    tax: number
    total: number
  }>
  notes: string
  terms: string
}

export function useDocumentForm(documentType: string, initialData?: any) {
  const [autoGenerateNumbers, setAutoGenerateNumbers] = useState(true)
  
  const getDefaultFormData = (): DefaultFormData => ({
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    paymentMethod: 'card',
    currency: 'USD',
    companyInfo: {
      name: 'Your Company',
      logo: '',
      address: 'Your Address',
      phone: 'Your Phone',
      email: 'your@email.com'
    },
    clientInfo: {
      id: '',
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    lineItems: [{
      id: '1',
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 0,
      total: 0
    }],
    notes: '',
    terms: 'Payment is due within 30 days from the date of this document.'
  })

  const [formData, setFormData] = useState<DefaultFormData>(() => {
    if (initialData) {
      return {
        ...getDefaultFormData(),
        ...initialData,
        lineItems: initialData.lineItems?.map((item: any) => ({
          ...item,
          discount: item.discount || 0 // Ensure discount property exists
        })) || getDefaultFormData().lineItems
      }
    }
    return getDefaultFormData()
  })

  const generateDocumentNumber = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const functionName = `generate_${documentType}_number`
      const { data, error } = await supabase.rpc(functionName)
      
      if (error) {
        console.error(`Error generating ${documentType} number:`, error)
        return null
      }
      
      return data
    } catch (error) {
      console.error(`Error generating ${documentType} number:`, error)
      return null
    }
  }

  useEffect(() => {
    const initializeNumber = async () => {
      if (autoGenerateNumbers && !formData.number && !initialData) {
        const newNumber = await generateDocumentNumber()
        if (newNumber) {
          setFormData(prev => ({ ...prev, number: newNumber }))
        }
      }
    }
    
    initializeNumber()
  }, [documentType, autoGenerateNumbers, formData.number, initialData])

  return {
    formData,
    setFormData,
    autoGenerateNumbers,
    setAutoGenerateNumbers,
    generateDocumentNumber
  }
}
