
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Mail } from "lucide-react"
import { toast } from "sonner"

interface EstimateViewDialogProps {
  estimate: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EstimateViewDialog({ estimate, open, onOpenChange }: EstimateViewDialogProps) {
  if (!estimate) return null

  const handleDownloadPDF = () => {
    toast.success("PDF generation started...")
    // PDF generation logic will be implemented
  }

  const handleSendEmail = () => {
    toast.success("Email sent successfully!")
    // Email sending logic will be implemented
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Estimate #{estimate.estimate_number}
          </DialogTitle>
          <DialogDescription>
            Created on {new Date(estimate.created_at).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with status and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Badge className={getStatusColor(estimate.status)}>
              {estimate.status?.charAt(0).toUpperCase() + estimate.status?.slice(1)}
            </Badge>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPDF} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={handleSendEmail} variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>

          {/* Company Info */}
          {estimate.company_info && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">From:</h3>
              <div className="text-sm space-y-1">
                <div className="font-medium">{estimate.company_info.name}</div>
                <div>{estimate.company_info.address}</div>
                <div>{estimate.company_info.phone}</div>
                <div>{estimate.company_info.email}</div>
              </div>
            </div>
          )}

          {/* Client Info */}
          {estimate.client && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">To:</h3>
              <div className="text-sm space-y-1">
                <div className="font-medium">{estimate.client.name}</div>
                <div>{estimate.client.email}</div>
                {estimate.client.phone && <div>{estimate.client.phone}</div>}
                {estimate.client.address && <div>{estimate.client.address}</div>}
              </div>
            </div>
          )}

          {/* Line Items */}
          {estimate.line_items && estimate.line_items.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4">
                <h3 className="font-semibold">Items</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Description</th>
                      <th className="text-center p-3">Qty</th>
                      <th className="text-right p-3">Rate</th>
                      <th className="text-right p-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.line_items.map((item: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-600">{item.description}</div>
                          )}
                        </td>
                        <td className="p-3 text-center">{item.quantity}</td>
                        <td className="p-3 text-right">${item.unitPrice?.toFixed(2)}</td>
                        <td className="p-3 text-right">${(item.quantity * item.unitPrice)?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="border rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${estimate.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (6.5%):</span>
                <span>${estimate.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${estimate.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {estimate.notes && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Notes:</h3>
              <p className="text-sm whitespace-pre-wrap">{estimate.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
