
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
import { Plus, FileText, Settings } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { useEstimateData } from "@/hooks/useEstimateData"
import { toast } from "sonner"

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
})

const estimateSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  estimate_date: z.string().min(1, "Estimate date is required"),
})

const settingsSchema = z.object({
  estimate_number_start: z.number().min(1, "Starting number must be at least 1"),
})

type ClientFormData = z.infer<typeof clientSchema>
type EstimateFormData = z.infer<typeof estimateSchema>
type SettingsFormData = z.infer<typeof settingsSchema>

export function EstimateForm() {
  const { allClients, createClient } = useBusinessData()
  const { createEstimate, userSettings, updateUserSettings, generateEstimateNumber } = useEstimateData()
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [estimateNumber, setEstimateNumber] = useState("")

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  const estimateForm = useForm<EstimateFormData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      client_id: "",
      title: "",
      description: "",
      amount: 0,
      estimate_date: new Date().toISOString().split('T')[0],
    },
  })

  const settingsForm = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      estimate_number_start: userSettings?.estimate_number_start || 1,
    },
  })

  // Update settings form when userSettings changes
  useEffect(() => {
    if (userSettings) {
      settingsForm.setValue("estimate_number_start", userSettings.estimate_number_start)
    }
  }, [userSettings, settingsForm])

  // Generate estimate number on component mount
  useEffect(() => {
    const loadEstimateNumber = async () => {
      try {
        const number = await generateEstimateNumber()
        setEstimateNumber(number)
      } catch (error) {
        console.error("Error generating estimate number:", error)
      }
    }
    loadEstimateNumber()
  }, [generateEstimateNumber])

  const onCreateClient = async (data: ClientFormData) => {
    try {
      const newClient = await createClient({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: 'active' as const,
      })
      estimateForm.setValue("client_id", newClient.id)
      setIsNewClientDialogOpen(false)
      clientForm.reset()
      toast.success("Client created successfully")
    } catch (error) {
      toast.error("Failed to create client")
    }
  }

  const onCreateEstimate = async (data: EstimateFormData) => {
    try {
      await createEstimate({
        client_id: data.client_id,
        title: data.title,
        description: data.description,
        amount: data.amount,
        estimate_date: data.estimate_date,
        status: 'draft',
        signature_status: 'pending'
      })
      toast.success("Estimate created successfully")
      estimateForm.reset()
      estimateForm.setValue("estimate_date", new Date().toISOString().split('T')[0])
      
      // Generate new estimate number
      const newNumber = await generateEstimateNumber()
      setEstimateNumber(newNumber)
    } catch (error) {
      console.error("Error creating estimate:", error)
      toast.error("Failed to create estimate")
    }
  }

  const onUpdateSettings = async (data: SettingsFormData) => {
    try {
      await updateUserSettings(data)
      setIsSettingsDialogOpen(false)
      toast.success("Settings updated successfully")
      
      // Regenerate estimate number with new starting point
      const newNumber = await generateEstimateNumber()
      setEstimateNumber(newNumber)
    } catch (error) {
      toast.error("Failed to update settings")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Create Estimate</h1>
        <p className="text-lg text-muted-foreground">
          Generate professional estimates for your clients
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Estimate Details</span>
            <div className="flex items-center gap-2">
              <div className="text-lg font-mono bg-muted px-3 py-1 rounded">
                {estimateNumber}
              </div>
              <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Estimate Settings</DialogTitle>
                    <DialogDescription>
                      Configure estimate numbering preferences
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...settingsForm}>
                    <form onSubmit={settingsForm.handleSubmit(onUpdateSettings)} className="space-y-4">
                      <FormField
                        control={settingsForm.control}
                        name="estimate_number_start"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Starting Estimate Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Update Settings</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
          <CardDescription>
            Fill in the information below to create a new estimate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...estimateForm}>
            <form onSubmit={estimateForm.handleSubmit(onCreateEstimate)} className="space-y-6">
              {/* Client Selection and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={estimateForm.control}
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
                                  {client.name} - {client.email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
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
                                <div className="flex justify-end gap-2">
                                  <Button type="button" variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit">Create Client</Button>
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
                  control={estimateForm.control}
                  name="estimate_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimate Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Estimate Title */}
              <FormField
                control={estimateForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimate Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Estimate title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={estimateForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={estimateForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Estimate description..."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Create Estimate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
