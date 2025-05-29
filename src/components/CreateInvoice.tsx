
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function CreateInvoice() {
  const [invoice, setInvoice] = useState({
    clientName: "",
    clientEmail: "",
    amount: "",
    description: "",
    dueDate: ""
  })

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="text-lg text-muted-foreground">
          Generate professional invoices for your clients
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Client Name</label>
              <Input
                placeholder="Enter client name"
                value={invoice.clientName}
                onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Client Email</label>
              <Input
                type="email"
                placeholder="client@example.com"
                value={invoice.clientEmail}
                onChange={(e) => setInvoice({ ...invoice, clientEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={invoice.amount}
                onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the services or products..."
              value={invoice.description}
              onChange={(e) => setInvoice({ ...invoice, description: e.target.value })}
              rows={4}
            />
          </div>

          <Button className="w-full">Generate Invoice</Button>
        </CardContent>
      </Card>
    </div>
  )
}
