
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
        invoiceDate: new Date().toLocaleDateString('en-US'),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
        title: 'Consulting Services',
        documentTitle: 'INVOICE',
        companyInfo: {
          name: 'FeatherBiz Company',
          address: '123 Business Street\nNew York, NY - 10001',
          phone: '+1 (555) 999-9999',
          email: 'contact@featherbiz.com',
          logo: '/lovable-uploads/f012d690-5b3d-4a3f-94fc-7d7114bb4fe5.png'
        },
        clientInfo: {
          name: 'Example Client Ltd',
          email: 'client@example.com',
          phone: '+1 (555) 888-8888',
          address: '456 Corporate Ave\nNew York, NY - 10002'
        },
        lineItems: [
          {
            description: 'Business Management Consulting',
            quantity: 10,
            rate: 150.00,
            amount: 1500.00
          },
          {
            description: 'Process Analysis',
            quantity: 5,
            rate: 200.00,
            amount: 1000.00
          },
          {
            description: 'Team Training',
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
        notes: `Terms and Conditions:
• Payment due within 30 days of invoice date
• 2% monthly penalty for late payments
• 10% discount for early payment
• This document requires digital signature for validation

DIGITAL SIGNATURE SPACE:
Please digitally sign this document to confirm agreement with the terms and amounts presented.`,
        status: 'pending'
      }

      await generateInvoicePDF(testInvoiceData)
      toast.success('Test PDF generated successfully!')
    } catch (error) {
      console.error('Error generating test PDF:', error)
      toast.error('Error generating test PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Test PDF Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click the button below to generate a sample PDF with space for digital signature.
        </p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">The PDF will include:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Professional header with logo</li>
            <li>• Company and client information</li>
            <li>• Detailed service items</li>
            <li>• Automatic total calculations</li>
            <li>• Dedicated signature area</li>
            <li>• Terms and conditions</li>
          </ul>
        </div>

        <Button 
          onClick={generateTestPDF}
          disabled={isGenerating}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating PDF...' : 'Generate Test PDF'}
        </Button>
      </CardContent>
    </Card>
  )
}
