
import { useState } from 'react'
import { ReactPDFService } from '@/services/reactPDFService'
import { toast } from 'sonner'

export function useFastPDFGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContractPDF = async (contract: any) => {
    setIsGenerating(true)
    try {
      await ReactPDFService.generateContractPDF(contract)
      toast.success('PDF do contrato gerado com sucesso!')
    } catch (error) {
      console.error('Erro ao gerar PDF do contrato:', error)
      toast.error('Falha ao gerar PDF do contrato')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateWorkOrderPDF = async (workOrder: any) => {
    setIsGenerating(true)
    try {
      await ReactPDFService.generateWorkOrderPDF(workOrder)
      toast.success('PDF da ordem de serviço gerado com sucesso!')
    } catch (error) {
      console.error('Erro ao gerar PDF da ordem de serviço:', error)
      toast.error('Falha ao gerar PDF da ordem de serviço')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateEstimatePDF = async (estimate: any) => {
    setIsGenerating(true)
    try {
      await ReactPDFService.generateEstimatePDF(estimate)
      toast.success('PDF do orçamento gerado com sucesso!')
    } catch (error) {
      console.error('Erro ao gerar PDF do orçamento:', error)
      toast.error('Falha ao gerar PDF do orçamento')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAnalyticsReportPDF = async (data: any) => {
    setIsGenerating(true)
    try {
      await ReactPDFService.generateAnalyticsReportPDF(data)
      toast.success('Relatório de analytics gerado com sucesso!')
    } catch (error) {
      console.error('Erro ao gerar relatório de analytics:', error)
      toast.error('Falha ao gerar relatório de analytics')
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generateContractPDF,
    generateWorkOrderPDF,
    generateEstimatePDF,
    generateAnalyticsReportPDF
  }
}
