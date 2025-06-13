
import { useState } from 'react'
import { PDFService, BusinessData } from '@/services/pdfService'
import { toast } from 'sonner'

export function usePDFGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)

  const businessData: BusinessData = {
    companyName: "FeatherBiz",
    companyAddress: "123 Business St, Suite 100, Business City, BC 12345",
    companyPhone: "(555) 123-4567",
    companyEmail: "info@featherbiz.com",
    companyLogo: "/lovable-uploads/f012d690-5b3d-4a3f-94fc-7d7114bb4fe5.png"
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

  return {
    isGenerating,
    generatePDF,
    generateContractPDF,
    generateWorkOrderPDF,
    generateEstimatePDF,
    generateAnalyticsReportPDF,
    businessData
  }
}
