
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Send, Clock, CheckCircle, XCircle } from "lucide-react"

interface Signature {
  id: string
  status: string
  created_at: string
  signed_at?: string
  document?: {
    title?: string
  }
  client?: {
    name?: string
  }
}

interface SignatureGridProps {
  signatures: Signature[]
}

export function SignatureGrid({ signatures }: SignatureGridProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'declined': return <XCircle className="h-4 w-4" />
      case 'sent': return <Send className="h-4 w-4" />
      case 'draft': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Signature Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {signatures.map((signature) => (
          <Card key={signature.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base sm:text-lg truncate">
                  {signature.document?.title || 'Unknown Document'}
                </CardTitle>
                <Badge className={`${getStatusColor(signature.status)} flex-shrink-0`}>
                  {getStatusIcon(signature.status)}
                  <span className="ml-1 hidden sm:inline">{signature.status}</span>
                </Badge>
              </div>
              <CardDescription className="text-sm truncate">
                Client: {signature.client?.name || 'Unknown Client'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sent:</span>
                  <span className="truncate ml-2">{new Date(signature.created_at).toLocaleDateString()}</span>
                </div>
                {signature.signed_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signed:</span>
                    <span className="truncate ml-2">{new Date(signature.signed_at).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  {signature.status === 'pending' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Remind</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
