// React import removed - using new JSX transform
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Send, Eye } from 'lucide-react'
import { generateInvoicePDF } from './InvoicePDFTemplate'
import { LineItem, CompanyInfo, ClientInfo } from '@/types/invoice'

interface InvoicePreviewProps {
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  title: string
  companyInfo: CompanyInfo
  clientInfo: ClientInfo
  lineItems: LineItem[]
  totals: {
    subtotal: number
    discount: number
    tax: number
    total: number
  }
  notes?: string
  status: string
  onSend?: () => void
  onMarkAsPaid?: () => void
}

export function InvoicePreview(props: InvoicePreviewProps) {
  const handleDownloadPDF = async () => {
    try {
      await generateInvoicePDF({
        invoiceNumber: props.invoiceNumber,
        invoiceDate: props.invoiceDate,
        dueDate: props.dueDate,
        title: props.title,
        companyInfo: props.companyInfo,
        clientInfo: props.clientInfo,
        lineItems: props.lineItems.map(item => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount
        })),
        totals: props.totals,
        notes: props.notes,
        status: props.status
      })
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to generate PDF:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        {props.onSend && (
          <Button onClick={props.onSend} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send to Client
          </Button>
        )}
        {props.status !== 'paid' && props.onMarkAsPaid && (
          <Button onClick={props.onMarkAsPaid} variant="secondary">
            Mark as Paid
          </Button>
        )}
      </div>

      {/* Invoice Preview */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-4 border-blue-500">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">{props.companyInfo.name}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{props.companyInfo.address}</p>
                <p>{props.companyInfo.phone}</p>
                <p>{props.companyInfo.email}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <h2 className="text-4xl font-bold text-blue-600">INVOICE</h2>
              <p className="text-lg font-semibold">#{props.invoiceNumber}</p>
              <p className="text-sm text-gray-600">Date: {props.invoiceDate}</p>
              {props.dueDate && (
                <p className="text-sm text-gray-600">Due: {props.dueDate}</p>
              )}
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Bill To</h3>
            <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-gray-900">{props.clientInfo.name}</p>
              <p className="text-sm text-gray-600">{props.clientInfo.email}</p>
              {props.clientInfo.phone && (
                <p className="text-sm text-gray-600">{props.clientInfo.phone}</p>
              )}
              {props.clientInfo.address && (
                <p className="text-sm text-gray-600">{props.clientInfo.address}</p>
              )}
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Invoice Details</h3>
            <div className="bg-slate-100 p-4 rounded-lg flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Project</p>
                <p className="font-semibold text-gray-800">{props.title}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                <p className="font-semibold text-gray-800">{props.status.toUpperCase()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Amount Due</p>
                <p className="font-semibold text-gray-800">${props.totals.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Description</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide">Rate</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {props.lineItems.map((item, index) => (
                    <tr key={index} className={index % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">{item.description}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-700">${item.rate.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80 space-y-2">
              <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">${props.totals.subtotal.toFixed(2)}</span>
              </div>
              {props.totals.discount > 0 && (
                <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                  <span className="text-gray-700">Discount:</span>
                  <span className="font-medium">-${props.totals.discount.toFixed(2)}</span>
                </div>
              )}
              {props.totals.tax > 0 && (
                <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                  <span className="text-gray-700">Tax:</span>
                  <span className="font-medium">${props.totals.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 px-4 bg-blue-600 text-white rounded-lg font-bold text-lg">
                <span>Total:</span>
                <span>${props.totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {props.notes && (
            <div className="mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-sm font-bold text-yellow-800 uppercase tracking-wide mb-2">Notes & Terms</h4>
                <p className="text-sm text-yellow-900 whitespace-pre-wrap">{props.notes}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Thank you for your business! • Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
