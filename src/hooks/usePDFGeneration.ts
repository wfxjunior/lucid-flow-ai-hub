
import { useState } from 'react'
import { PDFService, BusinessData } from '@/services/pdfService'
import { toast } from 'sonner'
import { useCompanyData } from './useCompanyData'

export function usePDFGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { companyProfile } = useCompanyData()

  // Convert company profile to business data format for PDFs
  const businessData: BusinessData = {
    companyName: companyProfile?.company_name || "Your Company",
    companyAddress: companyProfile?.address || "",
    companyPhone: companyProfile?.phone || "",
    companyEmail: companyProfile?.email || "",
    companyLogo: companyProfile?.logo_url || "/lovable-uploads/f012d690-5b3d-4a3f-94fc-7d7114bb4fe5.png"
  }

  const generatePDF = async (
    element: HTMLElement,
    filename?: string,
    options?: any
  ) => {
    setIsGenerating(true)
    try {
      await PDFService.generateFromElement(element, { filename, ...options })
      toast.success('PDF generated successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateContractPDF = async (contract: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateContractPDF(contract, businessData)
      toast.success('Contract PDF generated successfully!')
    } catch (error) {
      console.error('Contract PDF generation error:', error)
      toast.error('Failed to generate contract PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateWorkOrderPDF = async (workOrder: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateWorkOrderPDF(workOrder, businessData)
      toast.success('Work order PDF generated successfully!')
    } catch (error) {
      console.error('Work order PDF generation error:', error)
      toast.error('Failed to generate work order PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateEstimatePDF = async (estimate: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateEstimatePDF(estimate, businessData)
      toast.success('Estimate PDF generated successfully!')
    } catch (error) {
      console.error('Estimate PDF generation error:', error)
      toast.error('Failed to generate estimate PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAnalyticsReportPDF = async (data: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateAnalyticsReportPDF(data, businessData)
      toast.success('Analytics report PDF generated successfully!')
    } catch (error) {
      console.error('Analytics report PDF generation error:', error)
      toast.error('Failed to generate analytics report PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateReceiptPDF = async (receipt: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateReceiptPDF(receipt, businessData)
      toast.success('Receipt PDF generated successfully!')
    } catch (error) {
      console.error('Receipt PDF generation error:', error)
      toast.error('Failed to generate receipt PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateQuotePDF = async (quote: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateQuotePDF(quote, businessData)
      toast.success('Quote PDF generated successfully!')
    } catch (error) {
      console.error('Quote PDF generation error:', error)
      toast.error('Failed to generate quote PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateBidPDF = async (bid: any) => {
    setIsGenerating(true)
    try {
      await PDFService.generateBidPDF(bid, businessData)
      toast.success('Bid PDF generated successfully!')
    } catch (error) {
      console.error('Bid PDF generation error:', error)
      toast.error('Failed to generate bid PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generatePDF,
    generateContractPDF,
    generateWorkOrderPDF,
    generateEstimatePDF,
    generateQuotePDF,
    generateBidPDF,
    generateReceiptPDF,
    generateAnalyticsReportPDF,
    businessData
  }
}
