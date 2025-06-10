
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Settings, Upload, Download, Send, FileText } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { useEstimateData } from "@/hooks/useEstimateData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"

interface LineItem {
  type: 'service' | 'product'
  description: string
  unitPrice: number
  quantity: number
  amount: number
}

interface EstimateSettings {
  estimateNumberPrefix: string
  estimateNumberStart: number
  companyLogo?: string
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  defaultPaymentTerms: string
  defaultNotes: string
}

export function InlineEstimateEditor() {
  const { allClients, createClient } = useBusinessData()
  const { createEstimate, userSettings, updateUserSettings } = useEstimateData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  
  // Estimate data
  const [estimateNumber, setEstimateNumber] = useState("")
  const [estimateDate, setEstimateDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState("")
  const [clientId, setClientId] = useState("")
  const [title, setTitle] = useState("")
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { type: 'service', description: '', unitPrice: 0, quantity: 1, amount: 0 }
  ])
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<'draft' | 'sent' | 'approved' | 'rejected'>('draft')
  
  // Settings
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<EstimateSettings>({
    estimateNumberPrefix: "EST-",
    estimateNumberStart: 1001,
    companyName: "FeatherBiz",
    companyAddress: "123 Business St, Suite 100\nBusiness City, BC 12345",
    companyPhone: "(555) 123-4567",
    companyEmail: "info@featherbiz.com",
    defaultPaymentTerms: "Payment due within 30 days",
    defaultNotes: "Thank you for your business!"
  })

  // Load settings from database when userSettings changes
  useEffect(() => {
    if (userSettings) {
      setSettings({
        estimateNumberPrefix: userSettings.estimate_number_prefix || "EST-",
        estimateNumberStart: userSettings.estimate_number_start || 1001,
        companyName: userSettings.company_name || "FeatherBiz",
        companyAddress: userSettings.company_address || "123 Business St, Suite 100\nBusiness City, BC 12345",
        companyPhone: userSettings.company_phone || "(555) 123-4567",
        companyEmail: userSettings.company_email || "info@featherbiz.com",
        companyLogo: userSettings.company_logo || undefined,
        defaultPaymentTerms: userSettings.default_payment_terms || "Payment due within 30 days",
        defaultNotes: userSettings.default_notes || "Thank you for your business!"
      })
    }
  }, [userSettings])

  // Generate estimate number on load
  useEffect(() => {
    const generateNumber = () => {
      const timestamp = Date.now().toString().slice(-6)
      setEstimateNumber(`${settings.estimateNumberPrefix}${timestamp}`)
    }
    generateNumber()
  }, [settings.estimateNumberPrefix])

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const total = subtotal

  // Update line item amount when price or quantity changes
  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems]
    updated[index] = { ...updated[index], [field]: value }
    
    if (field === 'unitPrice' || field === 'quantity') {
      updated[index].amount = updated[index].unitPrice * updated[index].quantity
    }
    
    setLineItems(updated)
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { type: 'service', description: '', unitPrice: 0, quantity: 1, amount: 0 }])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSettings({ ...settings, companyLogo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const saveSettings = async () => {
    try {
      await updateUserSettings({
        estimate_number_prefix: settings.estimateNumberPrefix,
        estimate_number_start: settings.estimateNumberStart,
        company_name: settings.companyName,
        company_address: settings.companyAddress,
        company_phone: settings.companyPhone,
        company_email: settings.companyEmail,
        company_logo: settings.companyLogo,
        default_payment_terms: settings.defaultPaymentTerms,
        default_notes: settings.defaultNotes
      })
      toast.success("Settings saved successfully!")
      setShowSettings(false)
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error("Failed to save settings")
    }
  }

  const saveEstimate = async () => {
    if (!clientId || !title || lineItems.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await createEstimate({
        client_id: clientId,
        title,
        description: notes,
        amount: total,
        estimate_date: estimateDate,
        status: status,
        line_items: lineItems
      })
      toast.success("Estimate saved successfully!")
    } catch (error) {
      toast.error("Failed to save estimate")
    }
  }

  const handleGeneratePDF = async () => {
    const client = allClients?.find(c => c.id === clientId)
    const estimateData = {
      id: 'temp-id',
      estimate_number: estimateNumber,
      title,
      description: notes,
      amount: total,
      estimate_date: estimateDate,
      status,
      line_items: lineItems,
      client
    }
    await generateEstimatePDF(estimateData)
  }

  if (showSettings) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Estimate Settings</h2>
          <Button variant="outline" onClick={() => setShowSettings(false)}>
            Back to Estimate
          </Button>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Company Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Logo</label>
              <div className="flex items-center gap-4">
                {settings.companyLogo && (
                  <img src={settings.companyLogo} alt="Logo" className="w-16 h-16 object-contain" />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  value={settings.companyEmail}
                  onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Textarea
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={settings.companyPhone}
                onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Estimate Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number Prefix</label>
                <Input
                  value={settings.estimateNumberPrefix}
                  onChange={(e) => setSettings({ ...settings, estimateNumberPrefix: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Starting Number</label>
                <Input
                  type="number"
                  value={settings.estimateNumberStart}
                  onChange={(e) => setSettings({ ...settings, estimateNumberStart: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Default Payment Terms</label>
              <Input
                value={settings.defaultPaymentTerms}
                onChange={(e) => setSettings({ ...settings, defaultPaymentTerms: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Default Notes</label>
              <Textarea
                value={settings.defaultNotes}
                onChange={(e) => setSettings({ ...settings, defaultNotes: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={saveSettings}>Save Settings</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Estimate</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleGeneratePDF} disabled={isGenerating}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button onClick={saveEstimate}>
            <FileText className="w-4 h-4 mr-2" />
            Save Estimate
          </Button>
        </div>
      </div>

      {/* Estimate Document */}
      <Card className="bg-gray-50">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              {settings.companyLogo && (
                <img src={settings.companyLogo} alt="Company Logo" className="w-24 h-24 object-contain mb-4" />
              )}
              <h2 className="text-xl font-bold text-blue-600">{settings.companyName}</h2>
              <div className="text-sm text-gray-600 whitespace-pre-line">
                {settings.companyAddress}
              </div>
              <div className="text-sm text-gray-600">
                {settings.companyPhone} | {settings.companyEmail}
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <h1 className="text-4xl font-bold text-gray-700">ESTIMATE</h1>
              <div className="space-y-1">
                <div>
                  <span className="text-sm text-gray-600">Estimate #</span>
                  <Input
                    value={estimateNumber}
                    onChange={(e) => setEstimateNumber(e.target.value)}
                    className="w-32 text-right ml-2 inline-block"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-600">Date</span>
                  <Input
                    type="date"
                    value={estimateDate}
                    onChange={(e) => setEstimateDate(e.target.value)}
                    className="w-32 ml-2 inline-block"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-600">Due Date</span>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-32 ml-2 inline-block"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Client and Title Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bill To:</label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {allClients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status:</label>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Estimate title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium bg-white"
            />
          </div>

          {/* Line Items Table */}
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-100">
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Unit Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((item, index) => (
                  <TableRow key={index} className="bg-white">
                    <TableCell>
                      <Select
                        value={item.type}
                        onValueChange={(value: 'service' | 'product') => updateLineItem(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                        className="text-center"
                      />
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      ${item.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineItem(index)}
                        disabled={lineItems.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Button variant="outline" onClick={addLineItem} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Line Item
            </Button>
          </div>

          {/* Notes Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes:</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or terms..."
              rows={4}
              className="bg-white"
            />
          </div>

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
