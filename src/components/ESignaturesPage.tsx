
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenTool, FileText, Calendar, Download, Printer } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { FeatherSignDialog } from "@/components/e-signatures/FeatherSignDialog"
import { DocumentCreationDialog } from "@/components/e-signatures/DocumentCreationDialog"
import { format } from "date-fns"

export function ESignaturesPage() {
  const { signatures, loading } = useBusinessData()
  
  const [startDate, setStartDate] = useState("2025-01-01")
  const [endDate, setEndDate] = useState("2025-12-31")
  const [showFeatherSignDialog, setShowFeatherSignDialog] = useState(false)
  const [showDocumentForm, setShowDocumentForm] = useState(false)

  // Filter signatures by date range
  const filteredSignatures = signatures?.filter(sig => {
    if (!sig.created_at) return true
    const sigDate = new Date(sig.created_at)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return sigDate >= start && sigDate <= end
  }) || []

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      return format(new Date(dateString), "MM/dd/yyyy")
    } catch {
      return ""
    }
  }

  const getDocumentNumber = (sig: any) => {
    return sig.document?.document_number || sig.document?.id?.slice(-6) || "N/A"
  }

  const getDocumentType = (sig: any) => {
    return sig.document?.type || "Document"
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          List of Signed Documents
        </h1>

        {/* Date Range Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-auto"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-auto"
            />
          </div>
          
          <div className="flex gap-2 ml-auto">
            <FeatherSignDialog 
              open={showFeatherSignDialog} 
              onOpenChange={setShowFeatherSignDialog} 
            />
            <DocumentCreationDialog 
              open={showDocumentForm} 
              onOpenChange={setShowDocumentForm} 
            />
          </div>
        </div>
      </div>

      {/* Signatures Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-100">
                  <TableHead className="font-semibold text-gray-900 px-4 py-3">Original Document</TableHead>
                  <TableHead className="font-semibold text-gray-900 px-4 py-3">Certificate</TableHead>
                  <TableHead className="font-semibold text-gray-900 px-4 py-3">Signed By You</TableHead>
                  <TableHead className="font-semibold text-gray-900 px-4 py-3">Signed By Customer</TableHead>
                  <TableHead className="font-semibold text-gray-900 px-4 py-3">Signed Document</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSignatures.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No signed documents found in the selected date range
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSignatures.map((signature) => (
                    <TableRow key={signature.id} className="hover:bg-gray-50">
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-600 font-medium">
                            {getDocumentType(signature)} {getDocumentNumber(signature)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="text-blue-600">Certificate</span>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {signature.signed_at ? formatDate(signature.signed_at) : ""}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {signature.status === 'signed' ? formatDate(signature.signed_at || signature.created_at) : ""}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {signature.status === 'signed' && (
                          <Button variant="ghost" size="sm" className="p-1">
                            <Download className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600">
          {filteredSignatures.length} documents
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print table
        </Button>
      </div>

      {/* Instructions */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">
            To e-sign a document, go to Estimates, Quotes, Bids, Contracts, Business Proposals, or Bills of Sale, create a document, and 
            click the "E-SIGN" button. After a document has been e-signed, it will be listed here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
