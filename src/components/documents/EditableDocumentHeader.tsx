
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload, Building2 } from "lucide-react"

interface CompanyInfo {
  name: string
  logo?: string
  address: string
  phone: string
  email: string
}

interface ClientInfo {
  id?: string
  name: string
  email: string
  address: string
  phone?: string
}

interface DocumentHeaderProps {
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
}

const statusOptions = {
  invoice: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
  estimate: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Declined', 'Expired'],
  salesorder: ['Draft', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  workorder: ['Open', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
  proposal: ['Draft', 'Sent', 'Under Review', 'Accepted', 'Rejected'],
  bid: ['Draft', 'Submitted', 'Under Review', 'Won', 'Lost']
}

const paymentMethods = ['Cash', 'Card', 'Check', 'Bank Transfer', 'Zelle', 'Stripe', 'PayPal', 'Other']

export function EditableDocumentHeader({
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
  availableClients = []
}: DocumentHeaderProps) {
  const [isEditingClient, setIsEditingClient] = useState(false)

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
    <div className="bg-white border rounded-lg p-6 mb-6">
      {/* Company and Document Header Row */}
      <div className="flex justify-between items-start mb-8">
        {/* Company Info */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center gap-4 mb-4">
            {companyInfo.logo ? (
              <img src={companyInfo.logo} alt="Company Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {companyInfo.logo ? 'Change Logo' : 'Add Logo'}
              </Button>
            </div>
          </div>
          
          <Input
            value={companyInfo.name}
            onChange={(e) => onCompanyInfoChange({ ...companyInfo, name: e.target.value })}
            className="text-xl font-bold text-blue-600 border-none p-0 mb-2"
            placeholder="Company Name"
          />
          
          <Textarea
            value={companyInfo.address}
            onChange={(e) => onCompanyInfoChange({ ...companyInfo, address: e.target.value })}
            className="text-sm text-gray-600 border-none p-0 mb-1 resize-none"
            placeholder="Company Address"
            rows={3}
          />
          
          <Input
            value={companyInfo.phone}
            onChange={(e) => onCompanyInfoChange({ ...companyInfo, phone: e.target.value })}
            className="text-sm text-gray-600 border-none p-0 mb-1"
            placeholder="Phone Number"
          />
          
          <Input
            value={companyInfo.email}
            onChange={(e) => onCompanyInfoChange({ ...companyInfo, email: e.target.value })}
            className="text-sm text-gray-600 border-none p-0"
            placeholder="Email Address"
          />
        </div>

        {/* Document Title and Info */}
        <div className="text-right">
          <h1 className="text-4xl font-bold text-gray-700 mb-4 uppercase">{documentType}</h1>
          
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">{documentType} #</span>
              <Input
                value={documentNumber}
                onChange={(e) => onDocumentNumberChange(e.target.value)}
                className="w-32 text-right"
              />
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">Date</span>
              <Input
                type="date"
                value={documentDate}
                onChange={(e) => onDocumentDateChange(e.target.value)}
                className="w-32"
              />
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">Due Date</span>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => onDueDateChange(e.target.value)}
                className="w-32"
              />
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">Status</span>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions[documentType as keyof typeof statusOptions]?.map((s) => (
                    <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">Payment</span>
              <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
                <SelectTrigger className="w-32">
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

      {/* Client Information */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Bill To:</h3>
          {availableClients.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingClient(!isEditingClient)}
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
                  {client.name} - {client.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="space-y-2">
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
            />
            <Input
              value={clientInfo.phone || ''}
              onChange={(e) => onClientInfoChange({ ...clientInfo, phone: e.target.value })}
              placeholder="Client Phone"
            />
          </div>
        )}
      </div>
    </div>
  )
}
