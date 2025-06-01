import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Trash2 } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { User } from "@supabase/supabase-js"

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

export function InvoiceForm() {
  const { allClients, createClient, loading } = useBusinessData()
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { type: "service", description: "", quantity: 1, rate: 0, amount: 0 }
  ])
  const [user, setUser] = useState<User | null>(null)

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

  // Generate invoice number on component mount
  useEffect(() => {
    generateInvoiceNumber()
  }, [])

  // Update total amount when line items change
  useEffect(() => {
    const total = lineItems.reduce((sum, item) => sum + item.amount, 0)
    invoiceForm.setValue("total_amount", total)
    invoiceForm.setValue("line_items", lineItems)
  }, [lineItems, invoiceForm])

  // Get user for greeting
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const generateInvoiceNumber = () => {
    // Simple invoice number generation - in real app, this would come from backend
    const nextNumber = Math.floor(Math.random() * 9999) + 1
    setInvoiceNumber(`INV-${nextNumber.toString().padStart(4, '0')}`)
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { type: "service", description: "", quantity: 1, rate: 0, amount: 0 }])
  }

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index))
    }
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems]
    updated[index] = { ...updated[index], [field]: value }
    
    // Calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updated[index].amount = updated[index].quantity * updated[index].rate
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
      setLineItems([{ type: "service", description: "", quantity: 1, rate: 0, amount: 0 }])
      generateInvoiceNumber()
    } catch (error) {
      toast.error("Failed to create invoice")
    }
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

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4">
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Create Invoice</h1>
        {user && (
          <p className="text-base sm:text-lg text-blue-600 font-medium">
            Hello, {getDisplayName()}! 👋
          </p>
        )}
        <p className="text-sm sm:text-lg text-muted-foreground">
          Generate professional invoices for your clients
        </p>
      </div>

      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="space-y-2 sm:space-y-4">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <span className="text-lg sm:text-xl">Invoice Details</span>
            <div className="text-base sm:text-lg font-mono bg-muted px-2 sm:px-3 py-1 rounded text-center">
              {invoiceNumber}
            </div>
          </CardTitle>
          <CardDescription>
            Fill in the information below to create a new invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <Form {...invoiceForm}>
            <form onSubmit={invoiceForm.handleSubmit(onCreateInvoice)} className="space-y-4 sm:space-y-6">
              {/* Client Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="font-medium">{client.name}</span>
                                    <span className="text-sm text-muted-foreground sm:ml-2">
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
                <FormField
                  control={invoiceForm.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  <Card key={index} className="p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                      <div className="sm:col-span-1 lg:col-span-1">
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
                      <div className="sm:col-span-2 lg:col-span-2">
                        <Label className="text-sm">Description</Label>
                        <Input
                          className="mt-1"
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-1 lg:col-span-1">
                        <Label className="text-sm">Quantity</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="sm:col-span-1 lg:col-span-1">
                        <Label className="text-sm">Rate</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label className="text-sm">Amount</Label>
                            <Input
                              className="mt-1 bg-muted"
                              type="number"
                              step="0.01"
                              value={item.amount.toFixed(2)}
                              readOnly
                            />
                          </div>
                          {lineItems.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeLineItem(index)}
                              className="text-destructive shrink-0"
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

              {/* Total */}
              <div className="flex justify-center sm:justify-end">
                <div className="text-center sm:text-right bg-muted p-4 rounded-lg">
                  <Label className="text-lg font-semibold">Total Amount</Label>
                  <div className="text-2xl sm:text-3xl font-bold mt-1">
                    ${invoiceForm.watch("total_amount")?.toFixed(2) || "0.00"}
                  </div>
                </div>
              </div>

              {/* Description */}
              <FormField
                control={invoiceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes or terms..."
                        {...field}
                        rows={3}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  Generate Invoice
                </Button>
                <Button type="button" variant="outline" onClick={generateInvoiceNumber} className="w-full sm:w-auto">
                  New Number
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
