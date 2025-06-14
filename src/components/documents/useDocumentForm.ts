
import { useState, useEffect } from "react"
import { getDefaultCurrency } from "@/utils/currencyUtils"
import { documentTerms } from "./documentConfig"
import { useDocumentNumber } from "./useDocumentNumber"

interface DocumentFormData {
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
    tax: number
    total: number
  }>
  notes: string
  terms: string
}

export function useDocumentForm(documentType: string, initialData?: any) {
  const { autoGenerateNumbers, loadNumberSettings, generateDocumentNumber } = useDocumentNumber(documentType)
  
  const [formData, setFormData] = useState<DocumentFormData>(initialData || {
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    paymentMethod: 'card',
    currency: getDefaultCurrency().code,
    companyInfo: {
      name: '',
      logo: '',
      address: '',
      phone: '',
      email: ''
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
      tax: 0,
      total: 0
    }],
    notes: '',
    terms: documentTerms[documentType] || 'Terms and conditions apply.'
  })

  useEffect(() => {
    loadNumberSettings()
  }, [documentType, loadNumberSettings])

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        currency: initialData.currency || getDefaultCurrency().code,
        terms: initialData.terms || documentTerms[documentType] || 'Terms and conditions apply.'
      })
    } else if (autoGenerateNumbers && !formData.number) {
      generateDocumentNumber().then(number => {
        if (number) {
          setFormData(prev => ({ ...prev, number }))
        }
      })
    }
  }, [initialData, documentType, autoGenerateNumbers, generateDocumentNumber, formData.number])

  return {
    formData,
    setFormData,
    autoGenerateNumbers,
    generateDocumentNumber
  }
}
