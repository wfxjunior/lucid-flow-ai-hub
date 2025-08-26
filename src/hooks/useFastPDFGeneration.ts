
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ContractData {
  title: string
  client: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    description: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  total: number
  terms: string
  date: string
}

export function useFastPDFGeneration() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContractPDF = async (contractData: ContractData) => {
    setIsGenerating(true)
    try {
      // Simulate PDF generation - in a real app, you'd use a PDF library
      console.log('Generating PDF for contract:', contractData)
      
      toast({
        title: "PDF Generated",
        description: `Contract PDF for ${contractData.client.name} has been created`,
      })
      
      return true
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive"
      })
      return false
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAnalyticsReportPDF = async (data: any) => {
    setIsGenerating(true)
    try {
      // Simulate analytics report PDF generation
      console.log('Generating analytics report PDF:', data)
      
      toast({
        title: "PDF Generated",
        description: "Analytics report PDF has been created",
      })
      
      return true
    } catch (error) {
      console.error('Error generating analytics report PDF:', error)
      toast({
        title: "Error",
        description: "Failed to generate analytics report PDF",
        variant: "destructive"
      })
      return false
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generateContractPDF,
    generateAnalyticsReportPDF
  }
}
