
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload, Building2, Settings } from "lucide-react"
import { DocumentNumberSettings } from "./DocumentNumberSettings"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface CompanyInfo {
  name: string
  logo?: string
  address: string
  phone: string
  email: string
  customDocumentTitles?: Record<string, string>
}

interface ClientInfo {
  id?: string
  name: string
  email: string
  address: string
  phone?: string
}

interface ProfessionalDocumentHeaderProps {
  documentType: string
  documentNumber: string
  documentDate: string
  dueDate: string
  status: string
  paymentMethod: string
  companyInfo: CompanyInfo
  clientInfo: ClientInfo
  onCompanyInfoChange: (info: CompanyInfo) => void
  onClientInfoChange: (info: ClientInfo) => void
  onDocumentNumberChange: (number: string) => void
  onDocumentDateChange: (date: string) => void
  onDueDateChange: (date: string) => void
  onStatusChange: (status: string) => void
  onPaymentMethodChange: (method: string) => void
  availableClients?: ClientInfo[]
  autoGenerateNumbers?: boolean
}

const statusOptions = {
  invoice: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
  estimate: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Declined', 'Expired'],
  quote: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Declined', 'Expired'],
  salesorder: ['Draft', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  workorder: ['Open', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
  proposal: ['Draft', 'Sent', 'Under Review', 'Accepted', 'Rejected'],
  bid: ['Draft', 'Submitted', 'Under Review', 'Won', 'Lost'],
  contract: ['Draft', 'Sent', 'Under Review', 'Signed', 'Active', 'Expired', 'Terminated']
}

const paymentMethods = ['Cash', 'Card', 'Check', 'Bank Transfer', 'Zelle', 'Stripe', 'PayPal', 'Other']

const fieldLabels: Record<string, Record<string, string>> = {
  invoice: { dueDate: 'Due Date', number: 'Invoice #' },
  estimate: { dueDate: 'Valid Until', number: 'Estimate #' },
  quote: { dueDate: 'Valid Until', number: 'Quote #' },
  proposal: { dueDate: 'Valid Until', number: 'Proposal #' },
  contract: { dueDate: 'End Date', number: 'Contract #' },
  workorder: { dueDate: 'Due Date', number: 'Work Order #' },
  salesorder: { dueDate: 'Delivery Date', number: 'Sales Order #' },
  bid: { dueDate: 'Submission Date', number: 'Bid #' }
}

export function ProfessionalDocumentHeader({
  documentType,
  documentNumber,
  documentDate,
  dueDate,
  status,
  paymentMethod,
  companyInfo,
  clientInfo,
  onCompanyInfoChange,
  onClientInfoChange,
  onDocumentNumberChange,
  onDocumentDateChange,
  onDueDateChange,
  onStatusChange,
  onPaymentMethodChange,
  availableClients = [],
  autoGenerateNumbers = true
}: ProfessionalDocumentHeaderProps) {
  const [isEditingClient, setIsEditingClient] = useState(false)
  const [customTitle, setCustomTitle] = useState(
    companyInfo.customDocumentTitles?.[documentType] || documentType.toUpperCase()
  )

  const labels = fieldLabels[documentType] || { dueDate: 'Due Date', number: 'Number #' }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onCompanyInfoChange({
          ...companyInfo,
          logo: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Company Section */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">From</h3>
            
            <div className="flex items-start gap-4 mb-4">
              {companyInfo.logo ? (
                <img src={companyInfo.logo} alt="Company Logo" className="w-16 h-16 object-contain" />
              ) : (
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="text-xs p-1 h-auto"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {companyInfo.logo ? 'Change' : 'Add Logo'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                value={companyInfo.name}
                onChange={(e) => onCompanyInfoChange({ ...companyInfo, name: e.target.value })}
                className="font-semibold text-gray-900 border-none p-0 shadow-none focus-visible:ring-0"
                placeholder="Company Name"
              />
              
              <Textarea
                value={companyInfo.address}
                onChange={(e) => onCompanyInfoChange({ ...companyInfo, address: e.target.value })}
                className="text-sm text-gray-600 border-none p-0 shadow-none resize-none focus-visible:ring-0"
                placeholder="Company Address"
                rows={3}
              />
              
              <Input
                value={companyInfo.phone}
                onChange={(e) => onCompanyInfoChange({ ...companyInfo, phone: e.target.value })}
                className="text-sm text-gray-600 border-none p-0 shadow-none focus-visible:ring-0"
                placeholder="Phone Number"
              />
              
              <Input
                value={companyInfo.email}
                onChange={(e) => onCompanyInfoChange({ ...companyInfo, email: e.target.value })}
                className="text-sm text-gray-600 border-none p-0 shadow-none focus-visible:ring-0"
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>

        {/* Document Title */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <Input
            value={customTitle}
            onChange={(e) => {
              setCustomTitle(e.target.value)
              const updatedTitles = { 
                ...companyInfo.customDocumentTitles, 
                [documentType]: e.target.value 
              }
              onCompanyInfoChange({ 
                ...companyInfo, 
                customDocumentTitles: updatedTitles 
              })
            }}
            className="text-3xl lg:text-4xl font-bold text-center text-primary border-none p-0 shadow-none focus-visible:ring-0 uppercase"
            placeholder={documentType.toUpperCase()}
          />
        </div>

        {/* Document Info */}
        <div className="lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{labels.number}</span>
              <div className="flex items-center gap-2">
                <Input
                  value={documentNumber}
                  onChange={(e) => onDocumentNumberChange(e.target.value)}
                  className="w-32 text-right text-sm"
                  placeholder={autoGenerateNumbers ? "Auto-generated" : "Enter number"}
                  disabled={autoGenerateNumbers}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-md">
                    <DialogHeader>
                      <DialogTitle>Number Settings</DialogTitle>
                      <DialogDescription>
                        Configure automatic number generation settings for your documents
                      </DialogDescription>
                    </DialogHeader>
                    <DocumentNumberSettings documentType={documentType} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Date</span>
              <Input
                type="date"
                value={documentDate}
                onChange={(e) => onDocumentDateChange(e.target.value)}
                className="w-32 text-sm"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{labels.dueDate}</span>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => onDueDateChange(e.target.value)}
                className="w-32 text-sm"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-32 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions[documentType as keyof typeof statusOptions]?.map((s) => (
                    <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Payment</span>
              <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
                <SelectTrigger className="w-32 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method.toLowerCase()}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <Card className="p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Bill To</h3>
          {availableClients.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingClient(!isEditingClient)}
              className="text-xs"
            >
              {isEditingClient ? 'Select Existing' : 'Enter New'}
            </Button>
          )}
        </div>
        
        {!isEditingClient && availableClients.length > 0 ? (
          <Select
            value={clientInfo.id || ''}
            onValueChange={(clientId) => {
              const client = availableClients.find(c => c.id === clientId)
              if (client) {
                onClientInfoChange(client)
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {availableClients.map((client) => (
                <SelectItem key={client.id} value={client.id!}>
                  <div className="truncate">
                    {client.name} - {client.email}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={clientInfo.name}
              onChange={(e) => onClientInfoChange({ ...clientInfo, name: e.target.value })}
              placeholder="Client Name"
              className="font-medium"
            />
            <Input
              value={clientInfo.email}
              onChange={(e) => onClientInfoChange({ ...clientInfo, email: e.target.value })}
              placeholder="Client Email"
              type="email"
            />
            <Textarea
              value={clientInfo.address}
              onChange={(e) => onClientInfoChange({ ...clientInfo, address: e.target.value })}
              placeholder="Client Address"
              rows={3}
              className="md:col-span-2"
            />
            <Input
              value={clientInfo.phone || ''}
              onChange={(e) => onClientInfoChange({ ...clientInfo, phone: e.target.value })}
              placeholder="Client Phone"
            />
          </div>
        )}
      </Card>
    </div>
  )
}
