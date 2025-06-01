
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEstimateData } from "@/hooks/useEstimateData"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"

interface EstimateFormProps {
  estimate?: any
  onSuccess?: () => void
  onClose?: () => void
}

export function EstimateForm({ estimate, onSuccess, onClose }: EstimateFormProps) {
  const { createEstimate } = useEstimateData()
  const { allClients, createClient } = useBusinessData()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [clientId, setClientId] = useState("")
  const [estimateDate, setEstimateDate] = useState(new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // New client form state
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [newClientName, setNewClientName] = useState("")
  const [newClientEmail, setNewClientEmail] = useState("")
  const [newClientPhone, setNewClientPhone] = useState("")
  const [newClientAddress, setNewClientAddress] = useState("")

  // Populate form if editing existing estimate
  useEffect(() => {
    if (estimate) {
      setTitle(estimate.title || "")
      setDescription(estimate.description || "")
      setAmount(estimate.amount?.toString() || "")
      setClientId(estimate.client_id || "")
      setEstimateDate(estimate.estimate_date ? new Date(estimate.estimate_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])
    }
  }, [estimate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !amount || !clientId) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    
    try {
      await createEstimate({
        title,
        description,
        amount: parseFloat(amount),
        client_id: clientId,
        estimate_date: estimateDate,
        status: 'draft'
      })
      
      toast.success(estimate ? "Estimate updated successfully!" : "Estimate created successfully!")
      
      // Reset form
      setTitle("")
      setDescription("")
      setAmount("")
      setClientId("")
      setEstimateDate(new Date().toISOString().split('T')[0])
      
      // Call success callback
      onSuccess?.()
      onClose?.()
    } catch (error) {
      console.error("Error creating estimate:", error)
      toast.error("Failed to create estimate")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateNewClient = async () => {
    if (!newClientName || !newClientEmail) {
      toast.error("Please fill in client name and email")
      return
    }

    try {
      const client = await createClient({
        name: newClientName,
        email: newClientEmail,
        phone: newClientPhone,
        address: newClientAddress,
        status: 'active'
      })
      
      setClientId(client.id)
      setShowNewClientForm(false)
      
      // Reset new client form
      setNewClientName("")
      setNewClientEmail("")
      setNewClientPhone("")
      setNewClientAddress("")
      
      toast.success("Client created successfully!")
    } catch (error) {
      console.error("Error creating client:", error)
      toast.error("Failed to create client")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{estimate ? 'Edit Estimate' : 'Create New Estimate'}</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter estimate title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="estimateDate">Estimate Date</Label>
              <Input
                id="estimateDate"
                type="date"
                value={estimateDate}
                onChange={(e) => setEstimateDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Client *</Label>
              {!showNewClientForm ? (
                <div className="space-y-2">
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClients?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} ({client.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewClientForm(true)}
                    className="w-full"
                  >
                    Add New Client
                  </Button>
                </div>
              ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">New Client</CardTitle>
                    <CardDescription className="text-xs">
                      Create a new client for this estimate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Name *"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                      />
                      <Input
                        placeholder="Email *"
                        type="email"
                        value={newClientEmail}
                        onChange={(e) => setNewClientEmail(e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Phone"
                      value={newClientPhone}
                      onChange={(e) => setNewClientPhone(e.target.value)}
                    />
                    <Input
                      placeholder="Address"
                      value={newClientAddress}
                      onChange={(e) => setNewClientAddress(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleCreateNewClient}
                        className="flex-1"
                      >
                        Create Client
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowNewClientForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter estimate description"
            rows={4}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (estimate ? "Updating..." : "Creating...") : (estimate ? "Update Estimate" : "Create Estimate")}
          </Button>
        </div>
      </form>
    </div>
  )
}
