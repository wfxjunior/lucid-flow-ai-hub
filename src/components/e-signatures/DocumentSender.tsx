
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, Send } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"

interface Document {
  id: string
  title: string
  status: string
}

interface Client {
  id: string
  name: string
  email: string
}

interface DocumentSenderProps {
  documents: Document[]
  clients: Client[]
}

export function DocumentSender({ documents, clients }: DocumentSenderProps) {
  const { sendDocumentForSignature } = useBusinessData()
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedDocument, setSelectedDocument] = useState<string>("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSendDocument = async () => {
    if (!selectedDocument || !selectedClient) {
      toast.error("Please select both a document and a client")
      return
    }

    try {
      await sendDocumentForSignature(selectedDocument, selectedClient)
      setSelectedDocument("")
      setSelectedClient("")
      toast.success("Document sent for signature successfully!")
    } catch (error) {
      console.error("Error sending document:", error)
      toast.error("Failed to send document")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Send className="h-5 w-5" />
          Send Document for Signature
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Select a document and client to send for digital signature
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="document-select">Select Document</Label>
            <Select value={selectedDocument} onValueChange={setSelectedDocument}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a document" />
              </SelectTrigger>
              <SelectContent>
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex items-center gap-2 max-w-full">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{doc.title}</span>
                      <Badge variant="outline" className={`${getStatusColor(doc.status)} flex-shrink-0`}>
                        {doc.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-select">Select Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex flex-col max-w-full">
                      <span className="font-medium truncate">{client.name}</span>
                      <span className="text-sm text-muted-foreground truncate">{client.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleSendDocument} 
          disabled={!selectedDocument || !selectedClient}
          className="w-full"
        >
          <Send className="h-4 w-4 mr-2" />
          Send for Signature
        </Button>
      </CardContent>
    </Card>
  )
}
