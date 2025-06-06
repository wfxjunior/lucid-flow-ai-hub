
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Trash2, Send, FileText, Printer, Eye, DollarSign, Calendar, Clock } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { useCompanyData } from "@/hooks/useCompanyData"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { User } from "@supabase/supabase-js"
import { InvoicePreview } from "./InvoicePreview"

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
})

const lineItemSchema = z.object({
  type: z.enum(["service", "product", "hours", "discount", "expenses"]),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  rate: z.number().min(0, "Rate must be positive"),
  tax_rate: z.number().min(0).max(100),
  amount: z.number(),
})

const invoiceSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  line_items: z.array(lineItemSchema).min(1, "At least one line item is required"),
  total_amount: z.number().min(0.01, "Total amount must be greater than 0"),
})

type LineItem = z.infer<typeof lineItemSchema>
type ClientFormData = z.infer<typeof clientSchema>
type InvoiceFormData = z.infer<typeof invoiceSchema>

interface InvoiceTotals {
  subtotal: number
  discount: number
  tax: number
  total: number
  amountPaid: number
  balanceDue: number
}

export function InvoiceForm() {
  const { allClients, createClient, loading } = useBusinessData()
  const { companyProfile } = useCompanyData()
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [invoiceStatus, setInvoiceStatus] = useState<'draft' | 'sent' | 'paid' | 'overdue'>('draft')
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [totals, setTotals] = useState<InvoiceTotals>({
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    amountPaid: 0,
    balanceDue: 0
  })

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  const invoiceForm = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client_id: "",
      title: "",
      description: "",
      due_date: "",
      line_items: lineItems,
      total_amount: 0,
    },
  })

  // Initialize with pre-filled template data
  useEffect(() => {
    generateInvoiceNumber()
    initializeTemplate()
  }, [])

  const initializeTemplate = () => {
    // Pre-fill with sample data similar to the uploaded image
    const templateLineItems: LineItem[] = [
      { type: "service" as const, description: "TILE REMOVAL", quantity: 1, rate: 800, tax_rate: 0, amount: 800 },
      { type: "service" as const, description: "VINYL REMOVAL", quantity: 1, rate: 400, tax_rate: 0, amount: 400 },
      { type: "service" as const, description: "TILE INSTALLATION AND 1/4 ROUND", quantity: 1, rate: 3600, tax_rate: 0, amount: 3600 },
      { type: "service" as const, description: "CARPET INSTALLATION", quantity: 1, rate: 1650, tax_rate: 0, amount: 1650 }
    ]
    
    setLineItems(templateLineItems)
    
    // Set template invoice data
    invoiceForm.setValue("title", "Flooring Services Invoice")
    invoiceForm.setValue("description", "ESTIMATED TIME: 4-6 DAYS\nPAYMENTS: CHECK, CREDIT CARD (3%) MACHINE FEE, ZELLE\n50% BEFORE 50% AFTER FINISHED")
    
    // Set due date to 30 days from now
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)
    invoiceForm.setValue("due_date", dueDate.toISOString().split('T')[0])
  }

  // Calculate totals when line items change
  useEffect(() => {
    calculateTotals()
  }, [lineItems])

  // Update form total when totals change
  useEffect(() => {
    invoiceForm.setValue("total_amount", totals.total)
    invoiceForm.setValue("line_items", lineItems)
  }, [totals, lineItems, invoiceForm])

  // Get user for greeting
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const generateInvoiceNumber = () => {
    const nextNumber = Math.floor(Math.random() * 9999) + 1
    setInvoiceNumber(`INV-${nextNumber.toString().padStart(4, '0')}`)
  }

  const calculateTotals = () => {
    let subtotal = 0
    let discount = 0
    let tax = 0

    lineItems.forEach(item => {
      if (item.type === 'discount') {
        discount += Math.abs(item.amount)
      } else {
        subtotal += item.amount
        tax += (item.amount * item.tax_rate) / 100
      }
    })

    const total = subtotal - discount + tax
    const balanceDue = total - totals.amountPaid

    setTotals({
      subtotal,
      discount,
      tax,
      total,
      amountPaid: totals.amountPaid,
      balanceDue
    })
  }

  const addLineItem = () => {
    const newItem: LineItem = { 
      type: "service" as const, 
      description: "", 
      quantity: 1, 
      rate: 0, 
      tax_rate: 0, 
      amount: 0 
    }
    setLineItems([...lineItems, newItem])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems]
    updated[index] = { ...updated[index], [field]: value }
    
    // Calculate amount when quantity, rate, or tax changes
    if (field === 'quantity' || field === 'rate') {
      if (updated[index].type === 'discount') {
        updated[index].amount = -Math.abs(updated[index].quantity * updated[index].rate)
      } else {
        updated[index].amount = updated[index].quantity * updated[index].rate
      }
    }
    
    setLineItems(updated)
  }

  const onCreateClient = async (data: ClientFormData) => {
    try {
      const newClient = await createClient({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: 'active' as const,
      })
      invoiceForm.setValue("client_id", newClient.id)
      setIsNewClientDialogOpen(false)
      clientForm.reset()
      toast.success("Client created successfully")
    } catch (error) {
      toast.error("Failed to create client")
    }
  }

  const onCreateInvoice = async (data: InvoiceFormData) => {
    try {
      console.log("Creating invoice:", data)
      toast.success("Invoice created successfully")
      // Reset form
      invoiceForm.reset()
      setLineItems([{ type: "service" as const, description: "", quantity: 1, rate: 0, tax_rate: 0, amount: 0 }])
      generateInvoiceNumber()
      setInvoiceDate(new Date().toISOString().split('T')[0])
      setInvoiceStatus('draft')
    } catch (error) {
      toast.error("Failed to create invoice")
    }
  }

  const handlePreviewInvoice = () => {
    if (!selectedClient) {
      toast.error("Please select a client before previewing")
      return
    }
    if (lineItems.length === 0 || lineItems.every(item => !item.description)) {
      toast.error("Please add at least one line item with description")
      return
    }
    setIsPreviewDialogOpen(true)
  }

  const handleSendInvoice = () => {
    if (!selectedClient) {
      toast.error("Please select a client before sending")
      return
    }
    if (lineItems.length === 0 || lineItems.every(item => !item.description)) {
      toast.error("Please add at least one line item with description")
      return
    }
    if (!invoiceForm.watch("title")) {
      toast.error("Please add an invoice title")
      return
    }
    
    setInvoiceStatus('sent')
    toast.success(`Invoice sent to ${selectedClient.name} at ${selectedClient.email}`)
  }

  const handleMarkAsPaid = () => {
    setInvoiceStatus('paid')
    setTotals(prev => ({ ...prev, amountPaid: prev.total, balanceDue: 0 }))
    toast.success("Invoice marked as paid")
  }

  const lineItemTypes = [
    { value: "service", label: "Service" },
    { value: "product", label: "Product" },
    { value: "hours", label: "Hours" },
    { value: "discount", label: "Discount" },
    { value: "expenses", label: "Expenses" },
  ]

  const getDisplayName = () => {
    if (!user) return 'User'
    const metadata = user.user_metadata
    if (metadata?.first_name || metadata?.last_name) {
      return `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim()
    }
    return user.email?.split('@')[0] || 'User'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCompanyDisplayInfo = () => {
    if (companyProfile) {
      return {
        name: companyProfile.company_name,
        address: companyProfile.address || "123 Business St, Suite 100\nBusiness City, BC 12345",
        phone: companyProfile.phone || "(555) 123-4567",
        email: companyProfile.email || "info@company.com"
      }
    }
    
    return {
      name: "FeatherBiz",
      address: "123 Business St, Suite 100\nBusiness City, BC 12345",
      phone: "(555) 123-4567",
      email: "info@featherbiz.com"
    }
  }

  const companyInfo = getCompanyDisplayInfo()

  const selectedClient = allClients.find(client => client.id === invoiceForm.watch("client_id"))

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Invoice Builder</h1>
        {user && (
          <p className="text-base sm:text-lg text-blue-600 font-medium">
            Hello, {getDisplayName()}! 👋
          </p>
        )}
        <p className="text-sm sm:text-lg text-muted-foreground">
          Create and manage professional invoices for your clients
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Column - Invoice Form */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-lg sm:text-xl">Invoice Details</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(invoiceStatus)}>
                    {invoiceStatus.charAt(0).toUpperCase() + invoiceStatus.slice(1)}
                  </Badge>
                  <div className="text-base sm:text-lg font-mono bg-muted px-2 sm:px-3 py-1 rounded">
                    {invoiceNumber}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...invoiceForm}>
                <form onSubmit={invoiceForm.handleSubmit(onCreateInvoice)} className="space-y-6">
                  {/* Invoice Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice-date">Invoice Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="invoice-date"
                          type="date"
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <FormField
                      control={invoiceForm.control}
                      name="due_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Due Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Bill To</h3>
                    <FormField
                      control={invoiceForm.control}
                      name="client_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                  {allClients.map((client) => (
                                    <SelectItem key={client.id} value={client.id}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{client.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                          {client.email}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
                              <DialogTrigger asChild>
                                <Button type="button" variant="outline" size="icon" className="shrink-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-[95vw] max-w-md mx-auto">
                                <DialogHeader>
                                  <DialogTitle>Create New Client</DialogTitle>
                                  <DialogDescription>
                                    Add a new client to your database
                                  </DialogDescription>
                                </DialogHeader>
                                <Form {...clientForm}>
                                  <form onSubmit={clientForm.handleSubmit(onCreateClient)} className="space-y-4">
                                    <FormField
                                      control={clientForm.control}
                                      name="name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Name</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Client name" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={clientForm.control}
                                      name="email"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Email</FormLabel>
                                          <FormControl>
                                            <Input type="email" placeholder="client@example.com" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={clientForm.control}
                                      name="phone"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Phone (Optional)</FormLabel>
                                          <FormControl>
                                            <Input placeholder="+1 (555) 123-4567" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={clientForm.control}
                                      name="address"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Address (Optional)</FormLabel>
                                          <FormControl>
                                            <Textarea placeholder="Client address" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                                      <Button type="button" variant="outline" onClick={() => setIsNewClientDialogOpen(false)} className="w-full sm:w-auto">
                                        Cancel
                                      </Button>
                                      <Button type="submit" className="w-full sm:w-auto">Create Client</Button>
                                    </div>
                                  </form>
                                </Form>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Client Details Display */}
                    {selectedClient && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium">{selectedClient.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                        {selectedClient.phone && (
                          <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                        )}
                        {selectedClient.address && (
                          <p className="text-sm text-muted-foreground">{selectedClient.address}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Invoice Title */}
                  <FormField
                    control={invoiceForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Invoice title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Line Items */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <Label className="text-base font-semibold">Line Items</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addLineItem} className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>

                    {lineItems.map((item, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm">Type</Label>
                              <Select
                                value={item.type}
                                onValueChange={(value) => updateLineItem(index, 'type', value)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {lineItemTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="sm:col-span-2">
                              <Label className="text-sm">Description</Label>
                              <Input
                                className="mt-1"
                                placeholder="Item description"
                                value={item.description}
                                onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div>
                              <Label className="text-sm">Quantity</Label>
                              <Input
                                className="mt-1"
                                type="number"
                                step="0.01"
                                value={item.quantity}
                                onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Rate</Label>
                              <Input
                                className="mt-1"
                                type="number"
                                step="0.01"
                                value={item.rate}
                                onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Tax %</Label>
                              <Input
                                className="mt-1"
                                type="number"
                                step="0.01"
                                value={item.tax_rate}
                                onChange={(e) => updateLineItem(index, 'tax_rate', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Amount</Label>
                              <Input
                                className="mt-1 bg-muted"
                                type="number"
                                step="0.01"
                                value={item.amount.toFixed(2)}
                                readOnly
                              />
                            </div>
                            <div className="flex items-end">
                              {lineItems.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeLineItem(index)}
                                  className="text-destructive w-full"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Notes */}
                  <FormField
                    control={invoiceForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes & Terms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Payment terms, additional notes, or special instructions..."
                            {...field}
                            rows={4}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      <FileText className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleSendInvoice}
                      className="w-full sm:w-auto"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send to Client
                    </Button>
                    <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handlePreviewInvoice}
                          className="w-full sm:w-auto"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Invoice Preview</DialogTitle>
                          <DialogDescription>
                            Preview of {invoiceNumber} for {selectedClient?.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedClient && (
                          <InvoicePreview
                            invoiceNumber={invoiceNumber}
                            invoiceDate={invoiceDate}
                            dueDate={invoiceForm.watch("due_date")}
                            title={invoiceForm.watch("title") || "Invoice"}
                            companyInfo={companyInfo}
                            clientInfo={{
                              name: selectedClient.name,
                              email: selectedClient.email,
                              phone: selectedClient.phone,
                              address: selectedClient.address
                            }}
                            lineItems={lineItems.filter(item => item.description)}
                            totals={totals}
                            notes={invoiceForm.watch("description")}
                            status={invoiceStatus}
                            onSend={handleSendInvoice}
                            onMarkAsPaid={handleMarkAsPaid}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Invoice Summary & Preview */}
        <div className="space-y-6">
          {/* Invoice Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
                {totals.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
                {totals.amountPaid > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Amount Paid:</span>
                    <span>${totals.amountPaid.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>Balance Due:</span>
                  <span>${totals.balanceDue.toFixed(2)}</span>
                </div>
              </div>
              
              {invoiceStatus !== 'paid' && totals.balanceDue > 0 && (
                <Button 
                  onClick={handleMarkAsPaid}
                  className="w-full"
                  variant="default"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Mark as Paid
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Invoice Actions & History */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={generateInvoiceNumber}
                >
                  Generate New Number
                </Button>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Invoice History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  {invoiceStatus === 'sent' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sent:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  )}
                  {invoiceStatus === 'paid' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paid:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information with dynamic data */}
          <Card>
            <CardHeader>
              <CardTitle>From (Your Company)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="font-medium">{companyInfo.name}</div>
                <div className="text-muted-foreground whitespace-pre-line">
                  {companyInfo.address}<br />
                  {companyInfo.phone}<br />
                  {companyInfo.email}
                </div>
                {!companyProfile && (
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.location.href = '/dashboard?view=settings'}
                    >
                      Update Company Info
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
