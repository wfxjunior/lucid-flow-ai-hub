
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"
import { generateInvoicePDF } from './InvoicePDFTemplate'
import { toast } from 'sonner'

export function TestPDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateTestPDF = async () => {
    setIsGenerating(true)
    try {
      const testInvoiceData = {
        invoiceNumber: 'INV-0001',
        invoiceDate: new Date().toLocaleDateString('pt-BR'),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        title: 'Serviços de Consultoria',
        documentTitle: 'INVOICE',
        companyInfo: {
          name: 'FeatherBiz Company',
          address: 'Rua das Flores, 123\nSão Paulo, SP - 01234-567',
          phone: '+55 (11) 9999-9999',
          email: 'contato@featherbiz.com',
          logo: '/lovable-uploads/f012d690-5b3d-4a3f-94fc-7d7114bb4fe5.png'
        },
        clientInfo: {
          name: 'Cliente Exemplo Ltda',
          email: 'cliente@exemplo.com',
          phone: '+55 (11) 8888-8888',
          address: 'Av. Paulista, 1000\nSão Paulo, SP - 01310-100'
        },
        lineItems: [
          {
            description: 'Consultoria em Gestão Empresarial',
            quantity: 10,
            rate: 150.00,
            amount: 1500.00
          },
          {
            description: 'Análise de Processos',
            quantity: 5,
            rate: 200.00,
            amount: 1000.00
          },
          {
            description: 'Treinamento da Equipe',
            quantity: 3,
            rate: 300.00,
            amount: 900.00
          }
        ],
        totals: {
          subtotal: 3400.00,
          discount: 340.00,
          tax: 306.00,
          total: 3366.00
        },
        notes: `Termos e Condições:
• Pagamento em até 30 dias após o vencimento
• Multa de 2% ao mês em caso de atraso
• Desconto de 10% para pagamento antecipado
• Este documento requer assinatura digital para validação

ESPAÇO PARA ASSINATURA DIGITAL:
Por favor, assine digitalmente este documento para confirmar o acordo dos termos e valores apresentados.`,
        status: 'pending'
      }

      await generateInvoicePDF(testInvoiceData)
      toast.success('PDF de teste gerado com sucesso!')
    } catch (error) {
      console.error('Erro ao gerar PDF de teste:', error)
      toast.error('Erro ao gerar PDF de teste')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Gerador de PDF Teste
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Clique no botão abaixo para gerar um PDF de exemplo com espaço para assinatura digital.
        </p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">O PDF incluirá:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Header profissional com logo</li>
            <li>• Informações da empresa e cliente</li>
            <li>• Itens de serviço detalhados</li>
            <li>• Cálculos automáticos de totais</li>
            <li>• Área dedicada para assinatura</li>
            <li>• Termos e condições</li>
          </ul>
        </div>

        <Button 
          onClick={generateTestPDF}
          disabled={isGenerating}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Gerando PDF...' : 'Gerar PDF de Teste'}
        </Button>
      </CardContent>
    </Card>
  )
}
